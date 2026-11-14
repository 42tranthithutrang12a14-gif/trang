-- Stripe subscription records
create table if not exists public.subscriptions (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid not null unique references auth.users(id) on delete cascade,
  stripe_customer_id      text unique,
  stripe_subscription_id  text unique,
  plan                    text not null default 'free' check (plan in ('free', 'pro')),
  status                  text not null default 'active'
                            check (status in ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  current_period_end      timestamptz,
  cancel_at_period_end    boolean not null default false,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "Users read own subscription" on public.subscriptions
  for select using (auth.uid() = user_id);

create policy "Service role full access" on public.subscriptions
  for all using (auth.role() = 'service_role');

-- Referral codes (Stage 6)
create table if not exists public.referral_codes (
  code          text primary key,
  partner_name  text not null,
  partner_email text not null,
  discount_pct  int  not null default 0 check (discount_pct between 0 and 100),
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

alter table public.referral_codes enable row level security;

create policy "Anyone can read active codes" on public.referral_codes
  for select using (is_active = true);

create policy "Service role full access referral_codes" on public.referral_codes
  for all using (auth.role() = 'service_role');

-- Referral usage log
create table if not exists public.referral_uses (
  id         uuid primary key default gen_random_uuid(),
  code       text not null references public.referral_codes(code),
  user_id    uuid not null references auth.users(id) on delete cascade,
  used_at    timestamptz not null default now(),
  plan       text not null default 'pro',
  unique (user_id)
);

alter table public.referral_uses enable row level security;

create policy "Users read own referral use" on public.referral_uses
  for select using (auth.uid() = user_id);

create policy "Service role full access referral_uses" on public.referral_uses
  for all using (auth.role() = 'service_role');
