-- Remove referral tables (replaced by manual payment flow)
DROP TABLE IF EXISTS referral_uses;
DROP TABLE IF EXISTS referral_codes;

-- Partners (kế toán / pháp lý / đối tác nhận yêu cầu hỗ trợ)
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  notes text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages partners" ON partners
  USING (true) WITH CHECK (true);

-- Payment requests (VietQR manual confirmation)
CREATE TABLE IF NOT EXISTS payment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount integer NOT NULL,
  transfer_note text NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_note text,
  reviewed_by text,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE payment_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own payment requests" ON payment_requests
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own payment requests" ON payment_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Service role manages payment requests" ON payment_requests
  USING (true) WITH CHECK (true);

-- Help requests ("Cần người làm giúp")
CREATE TABLE IF NOT EXISTS help_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  contact_name text NOT NULL,
  contact_phone text NOT NULL,
  contact_email text,
  notes text,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'assigned', 'completed')),
  partner_id uuid REFERENCES partners(id) ON DELETE SET NULL,
  commission_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  assigned_at timestamptz,
  completed_at timestamptz
);

ALTER TABLE help_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own help requests" ON help_requests
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can submit help requests" ON help_requests
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role manages help requests" ON help_requests
  USING (true) WITH CHECK (true);
