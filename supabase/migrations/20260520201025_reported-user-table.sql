create table public.reported_users (
    reporter_id uuid not null references public.users (id) on delete cascade,
    reported_user_id uuid not null references public.users (id) on delete cascade,
    created_at timestamptz not null default now(),
    primary key (reporter_id, reported_user_id),
    check (reporter_id <> reported_user_id)
);

alter table public.reported_users enable row level security;

create policy "Users can select their own reported users" on public.reported_users for
select to authenticated using (
        (
            select auth.uid ()
        ) = reporter_id
    );

create policy "Users can insert their own reported users" on public.reported_users for
insert
    to authenticated
with
    check (
        (
            select auth.uid ()
        ) = reporter_id
    );

create policy "Users can delete their own reported users" on public.reported_users for delete to authenticated using (
    (
        select auth.uid ()
    ) = reporter_id
);
