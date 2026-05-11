create or replace function public.add_friend(friend_id uuid)
returns text
security definer
set search_path = ''
language plpgsql
as $$
declare
    current_user_id uuid := (select auth.uid());
    friend_name text;
    low_id uuid;
    high_id uuid;
begin
    if current_user_id is null then
        raise exception 'You must be authenticated to add a friend';
    end if;

    if friend_id is null then
        raise exception 'friend id is required';
    end if;

    if current_user_id = friend_id then
        raise exception 'You cannot add yourself as a friend';
    end if;

    if not exists (
        select 1
        from public.users u
        where u.id = friend_id
    ) then
        raise exception 'Friend user does not exist';
    end if;

    select u.name
    into friend_name
    from public.users u
    where u.id = friend_id;

    low_id := least(current_user_id, friend_id);
    high_id := greatest(current_user_id, friend_id);

    if exists (
        select 1
        from public.friendships f
        where f.user_low = low_id
          and f.user_high = high_id
    ) then
        raise exception 'You are already friends';
    end if;

    insert into public.friendships (user_low, user_high)
    values (low_id, high_id);

    return friend_name;
end;
$$;

revoke all on function public.add_friend (uuid) from public;

grant execute on function public.add_friend (uuid) to authenticated;
