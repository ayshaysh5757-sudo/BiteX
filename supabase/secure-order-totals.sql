-- Replace the client-trusting order RPC with server-side price calculation.
-- Run after schema.sql and order-details.sql.

alter table public.orders add column if not exists customer_phone text;
drop policy if exists "Customers can create orders" on public.orders;
drop policy if exists "Guests can create orders" on public.orders;
drop policy if exists "Customers can create their own orders" on public.orders;
drop policy if exists "Customers can create order items" on public.order_items;
drop policy if exists "Customers can create items for their own orders" on public.order_items;
revoke insert on public.orders, public.order_items from anon, authenticated;

drop function if exists public.create_order(text, text, numeric, jsonb);
drop function if exists public.create_order(text, text, numeric, jsonb, text, text, timestamptz, text, text, text);

create or replace function public.create_order(
  customer_name text,
  customer_email text,
  order_total numeric,
  items jsonb,
  order_restaurant_slug text default 'samundri-food-house',
  order_type_value text default 'preorder',
  scheduled_at_value timestamptz default null,
  delivery_address_value text default null,
  payment_method_value text default 'cash',
  payment_reference_value text default null,
  customer_phone_value text default null
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_order_id bigint;
  item jsonb;
  found_item_id bigint;
  trusted_price numeric;
  item_quantity integer;
  calculated_total numeric := 0;
  calculated_payment_status text := case when payment_method_value = 'bank' then 'verification_pending' when payment_method_value = 'online' then 'unavailable' else 'pending' end;
begin
  if jsonb_typeof(items) <> 'array' or jsonb_array_length(items) = 0 then
    raise exception 'Order must contain at least one item';
  end if;

  for item in select value from jsonb_array_elements(items) loop
    item_quantity := greatest(1, coalesce((item->>'quantity')::integer, 1));

    select menu.id, menu.price into found_item_id, trusted_price
    from public.menu_items as menu
    where menu.is_available = true
      and (menu.id = nullif(item->>'menu_item_id', '')::bigint or menu.name = item->>'item_name')
    order by (menu.id = nullif(item->>'menu_item_id', '')::bigint) desc
    limit 1;

    if found_item_id is null then
      raise exception 'Menu item is unavailable: %', item->>'item_name';
    end if;

    calculated_total := calculated_total + (trusted_price * item_quantity);
  end loop;

  insert into public.orders (customer_id, customer_name, customer_email, customer_phone, total, status, restaurant_slug, order_type, scheduled_at, delivery_address, payment_method, payment_reference, payment_status)
  values (auth.uid(), customer_name, customer_email, customer_phone_value, calculated_total, 'pending', order_restaurant_slug, order_type_value, scheduled_at_value, delivery_address_value, payment_method_value, payment_reference_value, calculated_payment_status)
  returning id into new_order_id;

  for item in select value from jsonb_array_elements(items) loop
    item_quantity := greatest(1, coalesce((item->>'quantity')::integer, 1));
    select menu.id, menu.price into found_item_id, trusted_price
    from public.menu_items as menu
    where menu.is_available = true
      and (menu.id = nullif(item->>'menu_item_id', '')::bigint or menu.name = item->>'item_name')
    order by (menu.id = nullif(item->>'menu_item_id', '')::bigint) desc
    limit 1;

    insert into public.order_items (order_id, menu_item_id, item_name, quantity, unit_price)
    values (new_order_id, found_item_id, item->>'item_name', item_quantity, trusted_price);
  end loop;

  return new_order_id;
end;
$$;

revoke all on function public.create_order(text, text, numeric, jsonb, text, text, timestamptz, text, text, text, text) from public;
grant execute on function public.create_order(text, text, numeric, jsonb, text, text, timestamptz, text, text, text, text) to anon, authenticated;
