-- Run this migration in the Supabase SQL Editor.
-- Links checkout orders to the signed-in customer and scopes history reads.

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Customers can create orders" on public.orders;
drop policy if exists "Guests can create orders" on public.orders;
drop policy if exists "Customers can create their own orders" on public.orders;
revoke insert on public.orders from anon, authenticated;

drop policy if exists "Customers can read own orders" on public.orders;
create policy "Customers can read own orders"
  on public.orders for select
  to authenticated
  using (customer_id = auth.uid());

drop policy if exists "Customers can create order items" on public.order_items;
drop policy if exists "Customers can create items for their own orders" on public.order_items;
revoke insert on public.order_items from anon, authenticated;

drop policy if exists "Customers can read own order items" on public.order_items;
create policy "Customers can read own order items"
  on public.order_items for select
  to authenticated
  using (
    exists (
      select 1
      from public.orders
      where orders.id = order_items.order_id
        and orders.customer_id = auth.uid()
    )
  );

grant select on public.orders, public.order_items to authenticated;