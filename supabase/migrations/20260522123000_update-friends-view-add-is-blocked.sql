create or replace view public.friends
with (security_invoker = true) as
select
    friend_edges.user_id,
    users.id as friend_id,
    users.name,
    users.email,
    exists (
        select 1
        from public.reported_users
        where
            reported_users.reporter_id = friend_edges.user_id
            and reported_users.reported_user_id = users.id
    ) as is_reported,
    exists (
        select 1
        from public.blocked_users
        where
            blocked_users.blocker_id = friend_edges.user_id
            and blocked_users.blocked_user_id = users.id
    ) as is_blocked
from public.friend_edges
    join public.users on users.id = friend_edges.friend_id;

grant select on public.friends to authenticated;
