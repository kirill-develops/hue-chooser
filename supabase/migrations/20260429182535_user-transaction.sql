-- Example: Update salary_log when salary is updated
create schema private;

create function private.insert_new_user()
returns trigger
security definer
set search_path = ''
language plpgsql
as $$
begin
  insert into public.users(id, name, email)
  values (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email);
  return NEW;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function private.insert_new_user();