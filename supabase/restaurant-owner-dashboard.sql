-- Run after schema.sql and order-history-dashboard.sql in the Supabase SQL Editor.
-- Assign an auth user to one or more restaurant slugs in restaurant_owners.

create table if not exists public.restaurant_owners (
  user_id uuid not null references auth.users(id) on delete cascade,
  restaurant_slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, restaurant_slug)
);

create index if not exists restaurant_owners_slug_idx
  on public.restaurant_owners (restaurant_slug, user_id);

alter table public.restaurant_owners enable row level security;

drop policy if exists "Owners can read their restaurant assignments" on public.restaurant_owners;
create policy "Owners can read their restaurant assignments"
  on public.restaurant_owners for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Admins can manage restaurant assignments" on public.restaurant_owners;
create policy "Admins can manage restaurant assignments"
  on public.restaurant_owners for all
  to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

drop policy if exists "Restaurant owners can read their orders" on public.orders;
create policy "Restaurant owners can read their orders"
  on public.orders for select
  to authenticated
  using (
    exists (
      select 1 from public.restaurant_owners
      where restaurant_owners.user_id = auth.uid()
        and restaurant_owners.restaurant_slug = orders.restaurant_slug
    )
  );

drop policy if exists "Restaurant owners can update their order status" on public.orders;
create policy "Restaurant owners can update their order status"
  on public.orders for update
  to authenticated
  using (
    exists (
      select 1 from public.restaurant_owners
      where restaurant_owners.user_id = auth.uid()
        and restaurant_owners.restaurant_slug = orders.restaurant_slug
    )
  )
  with check (
    exists (
      select 1 from public.restaurant_owners
      where restaurant_owners.user_id = auth.uid()
        and restaurant_owners.restaurant_slug = orders.restaurant_slug
    )
  );

drop policy if exists "Restaurant owners can read their order items" on public.order_items;
create policy "Restaurant owners can read their order items"
  on public.order_items for select
  to authenticated
  using (
    exists (
      select 1
      from public.orders
      join public.restaurant_owners
        on restaurant_owners.restaurant_slug = orders.restaurant_slug
      where orders.id = order_items.order_id
        and restaurant_owners.user_id = auth.uid()
    )
  );

drop policy if exists "Restaurant owners can read their reservations" on public.reservations;
create policy "Restaurant owners can read their reservations"
  on public.reservations for select
  to authenticated
  using (
    exists (
      select 1 from public.restaurant_owners
      where restaurant_owners.user_id = auth.uid()
        and restaurant_owners.restaurant_slug = reservations.restaurant_slug
    )
  );

drop policy if exists "Restaurant owners can update their reservation status" on public.reservations;
create policy "Restaurant owners can update their reservation status"
  on public.reservations for update
  to authenticated
  using (
    exists (
      select 1 from public.restaurant_owners
      where restaurant_owners.user_id = auth.uid()
        and restaurant_owners.restaurant_slug = reservations.restaurant_slug
    )
  )
  with check (
    exists (
      select 1 from public.restaurant_owners
      where restaurant_owners.user_id = auth.uid()
        and restaurant_owners.restaurant_slug = reservations.restaurant_slug
    )
  );

drop policy if exists "Restaurant owners can read their event enquiries" on public.event_bookings;
create policy "Restaurant owners can read their event enquiries"
  on public.event_bookings for select
  to authenticated
  using (
    exists (
      select 1 from public.restaurant_owners
      where restaurant_owners.user_id = auth.uid()
        and restaurant_owners.restaurant_slug = event_bookings.restaurant_slug
    )
  );

-- Dashboard actions only change status, never customer/order/reservation data.
revoke update on public.orders from authenticated;
revoke update on public.reservations from authenticated;
grant select, update(status) on public.orders to authenticated;
grant select, update(status) on public.reservations to authenticated;
grant select on public.order_items, public.event_bookings, public.restaurant_owners to authenticated;
grant insert, update, delete on public.restaurant_owners to authenticated;

-- Assign an owner from an admin SQL session after creating their Auth user:
-- insert into public.restaurant_owners (user_id, restaurant_slug)
-- values ('AUTH-USER-UUID', 'food-street-533');
