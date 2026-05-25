create table public.blocked_users (
    blocker_id uuid not null references public.users (id) on delete cascade,
    blocked_user_id uuid not null references public.users (id) on delete cascade,
    created_at timestamptz not null default now(),
    primary key (blocker_id, blocked_user_id),
    check (blocker_id <> blocked_user_id)
);

alter table public.blocked_users enable row level security;

create policy "Users can select their own blocked users" on public.blocked_users for
select to authenticated using (
        (
            select auth.uid ()
        ) = blocker_id
    );

create policy "Users can insert their own blocked users" on public.blocked_users for
insert
    to authenticated
with
    check (
        (
            select auth.uid ()
        ) = blocker_id
    );

create policy "Users can delete their own blocked users" on public.blocked_users for delete to authenticated using (
    (
        select auth.uid ()
    ) = blocker_id
);
