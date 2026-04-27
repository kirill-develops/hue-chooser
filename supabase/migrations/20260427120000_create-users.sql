create table public.users (
    id uuid primary key references auth.users (id) on delete cascade,
    name text not null,
    email text not null unique
);

alter table public.users enable row level security;

create policy "Users can select own profile" on public.users for
select to authenticated using (
        (
            select auth.uid ()
        ) = id
    );

create policy "Users can insert own profile" on public.users for
insert
    to authenticated
with
    check (
        (
            select auth.uid ()
        ) = id
    );

create policy "Users can update own profile" on public.users for
update to authenticated using (
    (
        select auth.uid ()
    ) = id
)
with
    check (
        (
            select auth.uid ()
        ) = id
    );