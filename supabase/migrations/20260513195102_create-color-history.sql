create table public.color_history (
    id uuid primary key default extensions.gen_random_uuid (),
    user_id uuid not null references public.users (id) on delete cascade,
    color text not null check (
        color ~ '^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$'
    ),
    created_at timestamptz not null default now()
);

create index color_history_user_id_created_at_idx on public.color_history (user_id, created_at desc);

alter table public.color_history enable row level security;

create policy "Users can select their own and friends' color history" on public.color_history for
select to authenticated using (
        (
            select auth.uid ()
        ) = user_id
        or exists (
            select 1
            from public.friend_edges
            where
                friend_edges.user_id = (
                    select auth.uid ()
                )
                and friend_edges.friend_id = color_history.user_id
        )
    );

create policy "Users can insert their own color history" on public.color_history for
insert
    to authenticated
with
    check (
        (
            select auth.uid ()
        ) = user_id
    );

create policy "Users can delete their own color history" on public.color_history for delete to authenticated using (
    (
        select auth.uid ()
    ) = user_id
);