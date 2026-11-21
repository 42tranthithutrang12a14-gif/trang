-- Track sent reminder emails to avoid duplicates
create table if not exists public.reminder_log (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  result_id    uuid not null references public.saved_results(id) on delete cascade,
  rule_code    text not null,
  due_date     date not null,
  sent_at      timestamptz not null default now(),

  unique (user_id, rule_code, due_date)
);

alter table public.reminder_log enable row level security;

create policy "Users read own reminders" on public.reminder_log
  for select using (auth.uid() = user_id);

create policy "Service role full access" on public.reminder_log
  for all using (auth.role() = 'service_role');

-- Email preferences per user
create table if not exists public.user_email_prefs (
  user_id        uuid primary key references auth.users(id) on delete cascade,
  reminders_on   boolean not null default true,
  remind_days    int not null default 7,
  updated_at     timestamptz not null default now()
);

alter table public.user_email_prefs enable row level security;

create policy "Users manage own prefs" on public.user_email_prefs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
