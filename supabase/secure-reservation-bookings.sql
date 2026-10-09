-- Run after table-reservations.sql for existing projects.

alter table public.reservations add column if not exists customer_phone text;
alter table public.reservations add column if not exists customer_id uuid references auth.users(id) on delete set null;

drop function if exists public.is_table_available(text, integer, date);

drop policy if exists "Anyone can request a reservation" on public.reservations;
revoke insert on public.reservations from anon, authenticated;
drop policy if exists "Customers can read their own reservations" on public.reservations;
create policy "Customers can read their own reservations"
  on public.reservations for select
  to authenticated
  using (customer_id = auth.uid());
drop policy if exists "Customers can cancel their own reservations" on public.reservations;
create policy "Customers can cancel their own reservations"
  on public.reservations for update
  to authenticated
  using (customer_id = auth.uid() and status in ('pending', 'confirmed'))
  with check (customer_id = auth.uid() and status = 'cancelled');
grant select, update(status) on public.reservations to authenticated;

create or replace function public.create_reservation(
  p_name text,
  p_email text,
  p_customer_phone text,
  p_restaurant_slug text,
  p_table_number integer,
  p_reservation_date date,
  p_guests integer
)
returns bigint
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  new_reservation_id bigint;
begin
  if coalesce(btrim(p_name), '') = '' or coalesce(btrim(p_email), '') = '' then
    raise exception 'Name and email are required';
  end if;
  if p_customer_phone is null or p_customer_phone !~ '^\+?[0-9\s()\-]{7,20}$' then
    raise exception 'A valid contact number is required';
  end if;
  if p_restaurant_slug is null or btrim(p_restaurant_slug) = '' then
    raise exception 'A restaurant is required';
  end if;
  if p_table_number not between 1 and 5 or p_guests not between 1 and 20 then
    raise exception 'Invalid table or guest count';
  end if;
  if p_reservation_date is null or p_reservation_date < current_date then
    raise exception 'Choose a current or future reservation date';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(
      p_restaurant_slug || ':' || p_table_number::text || ':' || p_reservation_date::text,
      0
    )
  );

  if exists (
    select 1
    from public.reservations
    where restaurant_slug = p_restaurant_slug
      and table_number = p_table_number
      and reservation_date = p_reservation_date
      and status in ('pending', 'confirmed')
  ) then
    return null;
  end if;

  insert into public.reservations (name, email, customer_phone, customer_id, restaurant_slug, table_number, reservation_date, guests, status)
  values (btrim(p_name), btrim(p_email), btrim(p_customer_phone), auth.uid(), p_restaurant_slug, p_table_number, p_reservation_date, p_guests, 'confirmed')
  returning id into new_reservation_id;

  return new_reservation_id;
end;
$$;

revoke all on function public.create_reservation(text, text, text, text, integer, date, integer) from public;
grant execute on function public.create_reservation(text, text, text, text, integer, date, integer) to anon, authenticated;

notify pgrst, 'reload schema';