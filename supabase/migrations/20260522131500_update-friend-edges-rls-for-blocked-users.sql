create or replace function private.has_blocked_me(blocker_id uuid)
returns boolean
security definer
set search_path = ''
stable
language sql
as $$
  select exists (
    select 1
    from public.blocked_users
    where
      blocked_users.blocker_id = $1
      and blocked_users.blocked_user_id = auth.uid()
  );
$$;

revoke all on function private.has_blocked_me (uuid) from public;

grant usage on schema private to authenticated;

grant
execute on function private.has_blocked_me (uuid) to authenticated;

drop policy if exists "Users can select their own friend edges" on public.friend_edges;

create policy "Users can select their own friend edges" on public.friend_edges for
select to authenticated using (
        (
            select auth.uid ()
        ) = user_id
        and not private.has_blocked_me (friend_id)
    );