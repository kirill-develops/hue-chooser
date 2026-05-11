create table public.friend_edges (
    user_id uuid not null references public.users (id) on delete cascade,
    friend_id uuid not null references public.users (id) on delete cascade,
    created_at timestamptz not null default now(),
    primary key (user_id, friend_id)
);

alter table public.friend_edges enable row level security;

create policy "Users can select their own friend edges" on public.friend_edges for
select to authenticated using (
        (
            select auth.uid ()
        ) = user_id
    );

create function private.sync_friend_edges_from_friendships()
returns trigger
security definer
set search_path = ''
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.friend_edges (user_id, friend_id, created_at)
    values
      (new.user_low, new.user_high, new.created_at),
      (new.user_high, new.user_low, new.created_at);

    return new;
  end if;

  if tg_op = 'DELETE' then
    delete from public.friend_edges
    where (user_id = old.user_low and friend_id = old.user_high)
       or (user_id = old.user_high and friend_id = old.user_low);

    return old;
  end if;

  return null;
end;
$$;

insert into
    public.friend_edges (
        user_id,
        friend_id,
        created_at
    )
select user_low, user_high, created_at
from public.friendships
union all
select user_high, user_low, created_at
from public.friendships;

create trigger sync_friend_edges_from_friendships
after insert or delete on public.friendships
for each row
execute function private.sync_friend_edges_from_friendships();