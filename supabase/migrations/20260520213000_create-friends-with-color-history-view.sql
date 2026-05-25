create view public.friends
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
    ) as is_reported
from public.friend_edges
    join public.users on users.id = friend_edges.friend_id;

grant select on public.friends to authenticated;