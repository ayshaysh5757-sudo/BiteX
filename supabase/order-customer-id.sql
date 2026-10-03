-- Run this migration in Supabase SQL Editor for existing projects.
-- Guest checkout still stores customer_id as NULL. Logged-in users get auth.uid().

create or replace function public.create_order(
  customer_name text,
  customer_email text,
  order_total numeric,
  items jsonb
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_order_id bigint;
begin
  insert into public.orders (customer_id, customer_name, customer_email, total, status)
  values (auth.uid(), customer_name, customer_email, order_total, 'pending')
  returning id into new_order_id;

  insert into public.order_items (order_id, menu_item_id, item_name, quantity, unit_price)
  select new_order_id,
    nullif(item->>'menu_item_id', '')::bigint,
    item->>'item_name',
    (item->>'quantity')::integer,
    (item->>'unit_price')::numeric
  from jsonb_array_elements(items) as item;

  return new_order_id;
end;
$$;

grant execute on function public.create_order(text, text, numeric, jsonb) to anon, authenticated;