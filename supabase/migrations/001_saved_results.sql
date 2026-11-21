-- Stage 2: saved_results table with RLS
-- Run in Supabase SQL Editor after creating the project

create table if not exists public.saved_results (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  answers     jsonb not null,
  red_count   int  not null default 0,
  yellow_count int not null default 0,
  green_count int  not null default 0,
  created_at  timestamptz not null default now()
);

-- Enable RLS — mọi bảng Supabase PHẢI bật RLS
alter table public.saved_results enable row level security;

-- Users can only read/write their own rows
create policy "Users manage own results"
  on public.saved_results
  for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Index for listing results per user
create index if not exists saved_results_user_id_idx
  on public.saved_results (user_id, created_at desc);
