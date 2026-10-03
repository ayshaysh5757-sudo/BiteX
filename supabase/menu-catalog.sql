-- Seed the frontend restaurant catalog into Supabase.
-- Run after schema.sql so secure-order-totals.sql can verify every ordered item.

insert into public.menu_items (name, description, price, category, image_url, service_note)
select seed.name, seed.description, seed.price, seed.category, seed.image_url, seed.service_note
from (values
  ('Samundri special fish', 'Grilled fish, garlic butter, lemon, herbs', 1450, 'Fish specials', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85', 'Fresh catch / 20 min'),
  ('Samundri special pizza', 'Mozzarella, chicken, peppers, house herbs', 1350, 'Popular favorites', 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Classic beef burger', 'Grilled patty, cheddar, lettuce, house sauce', 650, 'Popular favorites', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'),
  ('Samundri zinger burger', 'Crispy chicken, cheese, lettuce, spicy mayo', 600, 'Popular favorites', 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'),
  ('Chicken shawarma', 'Garlic sauce, pickles, lettuce, warm pita', 450, 'Popular favorites', 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'),
  ('Crispy chicken roll', 'Spiced chicken, cheese, herbs, house sauce', 400, 'Popular favorites', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'),
  ('Loaded fries', 'Crispy fries, cheese, jalapeno, garlic sauce', 350, 'Small plates', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85', 'Ready in / 10 min'),
  ('Lemon olive oil cake', 'Citrus curd, mascarpone, almond crumb', 400, 'Sweet things', 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=85', 'Sweet course / 10 min'),
  ('Sea salt panna cotta', 'Vanilla, strawberry, toasted oat crumble', 450, 'Sweet things', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85', 'Sweet course / 10 min'),
  ('Food Street chicken karahi', 'Tomato, ginger, green chili, fresh coriander', 850, 'Main dishes', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85', 'Serves 2 / 25 min'),
  ('Seekh kebab platter', 'Smoky beef kebabs, naan, mint chutney', 720, 'BBQ', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85', 'To share / 20 min'),
  ('Chicken biryani', 'Basmati rice, spiced chicken, raita', 480, 'Rice', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Gulab jamun', 'Warm syrup-soaked dumplings, pistachio', 220, 'Desserts', 'https://images.unsplash.com/photo-1605196560546-7f7b3b2b2b5e?auto=format&fit=crop&w=900&q=85', 'Sweet course / 8 min'),
  ('Castle special pizza', 'Chicken, olives, peppers, mozzarella, herbs', 1450, 'Pizzas', 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Chicken fajita pizza', 'Fajita chicken, onion, capsicum, smoky sauce', 1250, 'Pizzas', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Zinger burger', 'Crispy chicken, cheese, lettuce, spicy mayo', 650, 'Burgers', 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'),
  ('Loaded castle fries', 'Crispy fries, cheese sauce, jalapeno, chicken', 520, 'Sides', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85', 'Ready in / 10 min'),
  ('Planet pepperoni', 'Pepperoni, mozzarella, tomato, oregano', 1350, 'Pizzas', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Creamy pasta', 'Chicken, mushrooms, parmesan, white sauce', 780, 'Pasta', 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', 'Ready in / 18 min'),
  ('BBQ chicken pizza', 'BBQ chicken, onion, peppers, smoked cheese', 1450, 'Pizzas', 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Mint lemonade', 'Fresh lemon, mint, crushed ice', 260, 'Drinks', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min'),
  ('Wali Baba mutton karahi', 'Tender mutton, tomato, ginger, green chili', 1650, 'Main dishes', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85', 'Serves 2 / 30 min'),
  ('Charcoal BBQ platter', 'Malai boti, seekh kebab, chicken tikka', 1850, 'BBQ', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85', 'To share / 25 min'),
  ('Rooftop chicken handi', 'Creamy chicken, roasted spices, naan', 1250, 'Main dishes', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85', 'Serves 2 / 25 min'),
  ('Kashmiri chai', 'Pink tea, cardamom, crushed pistachio', 280, 'Drinks', 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=85', 'Fresh / 8 min'),
  ('Silver stone special', 'Chicken, olives, peppers, mozzarella, stone-baked crust', 1550, 'Pizzas', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Smoky fajita pizza', 'Fajita chicken, onion, capsicum, smoky sauce', 1350, 'Pizzas', 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Garlic cheese bread', 'Baked bread, garlic butter, herbs, mozzarella', 480, 'Sides', 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=900&q=85', 'Ready in / 10 min'),
  ('Chocolate lava cake', 'Warm chocolate cake, vanilla cream, cocoa dust', 420, 'Desserts', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', 'Sweet course / 10 min'),
  ('Mr. Sausy smash burger', 'Double beef patty, cheddar, pickles, signature sauce', 780, 'Burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'),
  ('Crispy chicken burger', 'Crunchy chicken, lettuce, cheese, spicy mayo', 680, 'Burgers', 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'),
  ('Loaded sauce fries', 'Crispy fries, cheese sauce, jalapeno, house drizzle', 430, 'Sides', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85', 'Ready in / 10 min'),
  ('Classic lemonade', 'Fresh lemon, mint, crushed ice', 240, 'Drinks', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min'),
  ('Heavenly cheese pizza', 'Mozzarella, parmesan, herbs, tomato sauce', 1450, 'Pizzas', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Garden fresh slice', 'Peppers, olives, onion, mushrooms, mozzarella', 1250, 'Pizzas', 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Creamy pasta', 'Chicken, mushrooms, parmesan, white sauce', 820, 'Pasta', 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', 'Ready in / 18 min'),
  ('Heavenly brownie', 'Warm chocolate brownie, vanilla ice cream, nuts', 450, 'Desserts', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', 'Sweet course / 10 min'),
  ('Roadside breakfast plate', 'Eggs, toast, hash browns, grilled tomato', 650, 'Breakfast', 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=85', 'Fresh / 15 min'),
  ('Cafe club sandwich', 'Chicken, egg, lettuce, tomato, toasted bread', 720, 'Sandwiches', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85', 'Ready in / 12 min'),
  ('Creamy chicken pasta', 'Chicken, mushrooms, parmesan, white sauce', 780, 'Pasta', 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', 'Ready in / 18 min'),
  ('Cappuccino', 'Espresso, steamed milk, soft cocoa finish', 320, 'Drinks', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min')
) as seed(name, description, price, category, image_url, service_note)
where not exists (select 1 from public.menu_items existing where lower(existing.name) = lower(seed.name));
