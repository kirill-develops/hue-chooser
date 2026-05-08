create table public.friendships (
    user_low uuid not null references public.users (id) on delete CASCADE,
    user_high uuid not null references public.users (id) on delete CASCADE,
    created_at timestamptz not null default now(),
    primary key (user_low, user_high)
);

alter table public.friendships enable row level security;

create policy "Users can select own friendships" on public.friendships for
select to authenticated using (
        (
            select auth.uid ()
        ) = user_low
        or (
            select auth.uid ()
        ) = user_high
    );

create policy "Users can select friend profiles" on public.users for
select to authenticated using (
        exists (
            select 1
            from public.friendships f
            where (
                    f.user_low = auth.uid ()
                    and f.user_high = users.id
                )
                or (
                    f.user_high = auth.uid ()
                    and f.user_low = users.id
                )
        )
    );