-- Remove the old time-based reservation fields and function.

drop function if exists public.check_table_availability(text, integer, date, time);
alter table public.reservations drop column if exists reservation_time;
alter table public.reservations drop column if exists reservation_duration;

alter table public.reservations enable row level security;

drop policy if exists "Anyone can request a reservation" on public.reservations;
create policy "Anyone can request a reservation"
	on public.reservations for insert
	to anon, authenticated
	with check (status in ('pending', 'confirmed'));
