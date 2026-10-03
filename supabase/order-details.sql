-- Run this migration in Supabase SQL Editor for existing projects.
-- Stores the selected restaurant, fulfilment choice, timing, address and payment state.

alter table public.orders add column if not exists restaurant_slug text not null default 'samundri-food-house';
alter table public.orders add column if not exists customer_phone text;
alter table public.orders add column if not exists order_type text not null default 'preorder' check (order_type in ('preorder', 'delivery'));
alter table public.orders add column if not exists scheduled_at timestamptz;
alter table public.orders add column if not exists delivery_address text;
alter table public.orders add column if not exists payment_method text not null default 'cash' check (payment_method in ('cash', 'bank', 'online'));
alter table public.orders add column if not exists payment_reference text;
alter table public.orders add column if not exists payment_status text not null default 'pending' check (payment_status in ('pending', 'verification_pending', 'paid', 'unavailable'));

create index if not exists orders_restaurant_status_idx on public.orders (restaurant_slug, status);

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
  payment_reference_value text default null
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_order_id bigint;
  calculated_payment_status text := case when payment_method_value = 'bank' then 'verification_pending' when payment_method_value = 'online' then 'unavailable' else 'pending' end;
begin
  insert into public.orders (customer_id, customer_name, customer_email, total, status, restaurant_slug, order_type, scheduled_at, delivery_address, payment_method, payment_reference, payment_status)
  values (auth.uid(), customer_name, customer_email, order_total, 'pending', order_restaurant_slug, order_type_value, scheduled_at_value, delivery_address_value, payment_method_value, payment_reference_value, calculated_payment_status)
  returning id into new_order_id;

  insert into public.order_items (order_id, menu_item_id, item_name, quantity, unit_price)
  select new_order_id, nullif(item->>'menu_item_id', '')::bigint, item->>'item_name', (item->>'quantity')::integer, (item->>'unit_price')::numeric
  from jsonb_array_elements(items) as item;

  return new_order_id;
end;
$$;

grant execute on function public.create_order(text, text, numeric, jsonb, text, text, timestamptz, text, text, text) to anon, authenticated;
