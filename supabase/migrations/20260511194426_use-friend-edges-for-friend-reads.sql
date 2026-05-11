drop policy if exists "Users can select own friendships" on public.friendships;

drop policy if exists "Users can select friend profiles" on public.users;

create policy "Users can select friend profiles" on public.users for
select to authenticated using (
        exists (
            select 1
            from public.friend_edges
            where
                friend_edges.user_id = (
                    select auth.uid ()
                )
                and friend_edges.friend_id = users.id
        )
    );