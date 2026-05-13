create table public.invite_codes (
    user_id uuid not null references public.users (id) on delete cascade,
    code uuid not null default extensions.gen_random_uuid (),
    created_at timestamptz not null default now(),
    primary key (user_id)
);

create unique index invite_codes_code_idx on public.invite_codes (code);

alter table public.invite_codes enable row level security;

create policy "Users can select their own invite code" on public.invite_codes for
select to authenticated using (
        (
            select auth.uid ()
        ) = user_id
    );

create function private.create_invite_code_for_user()
returns trigger
security definer
set search_path = ''
language plpgsql
as $$
begin
  insert into public.invite_codes (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

insert into
    public.invite_codes (user_id)
select id
from public.users on conflict (user_id) do nothing;

create trigger create_invite_code_for_user
after insert on public.users
for each row
execute function private.create_invite_code_for_user();

drop function public.add_friend (uuid);

create function public.add_friend(code_id uuid)
returns text
security definer
set search_path = ''
language plpgsql
as $$
declare
  current_user_id uuid := (select auth.uid());
  friend_id uuid;
  sorted_user_low uuid;
  sorted_user_high uuid;
  friend_name text;
begin
  if current_user_id is null then
    raise exception 'You must be authenticated to add a friend.';
  end if;

  if code_id is null then
    raise exception 'Invite code is required.';
  end if;

  select invite_codes.user_id into friend_id
from public.invite_codes
where
    invite_codes.code = code_id;

if friend_id is null then raise exception 'Invite code does not exist.';

end if;

if current_user_id = friend_id then raise exception 'You cannot add yourself as a friend.';

end if;

select users.name into friend_name
from public.users as users
where
    users.id = friend_id;

if friend_name is null then raise exception 'Friend user does not exist.';

end if;

sorted_user_low := least(current_user_id, friend_id);

sorted_user_high := greatest(current_user_id, friend_id);

if exists (
    select 1
    from public.friendships
    where
        user_low = sorted_user_low
        and user_high = sorted_user_high
) then raise exception 'You are already friends.';
end if;

insert into
    public.friendships (user_low, user_high)
values (
        sorted_user_low,
        sorted_user_high
    );
return friend_name;
end;
$$;

revoke all on function public.add_friend (uuid) from public;

grant execute on function public.add_friend (uuid) to authenticated;