drop policy if exists "Users can select their own and friends' color history" on public.color_history;

create policy "Users can select their own and friends' color history" on public.color_history for
select to authenticated using (
        (
            select auth.uid ()
        ) = user_id
        or (
            exists (
                select 1
                from public.friend_edges
                where
                    friend_edges.user_id = (
                        select auth.uid ()
                    )
                    and friend_edges.friend_id = color_history.user_id
            )
            and not exists (
                select 1
                from public.blocked_users
                where
                    blocked_users.blocker_id = (
                        select auth.uid ()
                    )
                    and blocked_users.blocked_user_id = color_history.user_id
            )
        )
    );
