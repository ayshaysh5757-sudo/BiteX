-- Run this after schema.sql to add the latest White Castle menu updates.

delete from public.menu_items
where name in ('East Coast oysters', 'Crab toast', 'Garlic butter prawns', 'Maine lobster roll', 'Grilled whole branzino', 'Crispy fish & chips');

insert into public.menu_items (name, description, price, category, image_url, service_note)
select 'White Castle garlic fish', 'Grilled fish, garlic butter, lemon, herbs', 24, 'Fish specials', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85', 'Fresh catch / 20 min'
where not exists (select 1 from public.menu_items where name = 'White Castle garlic fish');

insert into public.menu_items (name, description, price, category, image_url, service_note)
select 'White Castle special pizza', 'Mozzarella, seafood, peppers, house herbs', 18, 'Popular favorites', 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'
where not exists (select 1 from public.menu_items where name = 'White Castle special pizza');

insert into public.menu_items (name, description, price, category, image_url, service_note)
select 'Classic beef burger', 'Grilled patty, cheddar, lettuce, castle sauce', 12, 'Popular favorites', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'
where not exists (select 1 from public.menu_items where name = 'Classic beef burger');

insert into public.menu_items (name, description, price, category, image_url, service_note)
select 'White Castle zinger burger', 'Crispy chicken, cheese, lettuce, spicy mayo', 11, 'Popular favorites', 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'
where not exists (select 1 from public.menu_items where name = 'White Castle zinger burger');

insert into public.menu_items (name, description, price, category, image_url, service_note)
select 'Chicken shawarma', 'Garlic sauce, pickles, lettuce, warm pita', 9, 'Popular favorites', 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'
where not exists (select 1 from public.menu_items where name = 'Chicken shawarma');

insert into public.menu_items (name, description, price, category, image_url, service_note)
select 'Crispy chicken roll', 'Spiced chicken, cheese, herbs, house sauce', 8, 'Popular favorites', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'
where not exists (select 1 from public.menu_items where name = 'Crispy chicken roll');

insert into public.menu_items (name, description, price, category, image_url, service_note)
select 'Samundri chicken biryani', 'Basmati rice, tender chicken, saffron, raita', 14, 'Popular favorites', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'
where not exists (select 1 from public.menu_items where name = 'Samundri chicken biryani');

update public.menu_items
set image_url = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85'
where name = 'Samundri chicken biryani';

insert into public.menu_items (name, description, price, category, image_url, service_note)
select 'Loaded castle fries', 'Crispy fries, cheese, jalapeno, garlic sauce', 7, 'Small plates', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85', 'Ready in / 10 min'
where not exists (select 1 from public.menu_items where name = 'Loaded castle fries');

update public.menu_items
set category = 'Small plates'
where name = 'Loaded castle fries';
