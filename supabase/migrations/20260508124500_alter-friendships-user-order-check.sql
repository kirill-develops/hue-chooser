alter table public.friendships
add constraint friendships_user_low_lt_user_high
check (user_low < user_high);
