-- Rule review status overrides
-- Admins write here; evaluate() merges with JSON content at query time.

create table if not exists public.rule_reviews (
  id            uuid primary key default gen_random_uuid(),
  rule_code     text not null,
  rule_type     text not null check (rule_type in ('obligation', 'risk')),
  status        text not null check (status in ('draft', 'in_review', 'reviewed', 'published')),
  reviewer_note text not null default '',
  reviewed_at   timestamptz not null default now(),
  reviewed_by   text not null default '',

  unique (rule_code, rule_type)
);

-- Only service role (backend) can write; anon/authenticated can read published entries.
alter table public.rule_reviews enable row level security;

create policy "Anyone can read published rules" on public.rule_reviews
  for select using (status = 'published');

create policy "Service role has full access" on public.rule_reviews
  for all using (auth.role() = 'service_role');
