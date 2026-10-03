-- Seed restaurant-specific frontend menus so secure-order-totals.sql can validate them.
-- Run this after menu-catalog.sql and secure-order-totals.sql.

insert into public.menu_items (name, description, price, category, image_url, service_note)
select seed.name, seed.description, seed.price, seed.category, seed.image_url, seed.service_note
from (values
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
  ('Heavenly brownie', 'Warm chocolate brownie, vanilla ice cream, nuts', 450, 'Desserts', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', 'Sweet course / 10 min'),
  ('Roadside breakfast plate', 'Eggs, toast, hash browns, grilled tomato', 650, 'Breakfast', 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=85', 'Fresh / 15 min'),
  ('Cafe club sandwich', 'Chicken, egg, lettuce, tomato, toasted bread', 720, 'Sandwiches', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85', 'Ready in / 12 min'),
  ('Creamy chicken pasta', 'Chicken, mushrooms, parmesan, white sauce', 780, 'Pasta', 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', 'Ready in / 18 min'),
  ('Cappuccino', 'Espresso, steamed milk, soft cocoa finish', 320, 'Drinks', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min'),
  ('Kanwal chicken karahi', 'Wok-tossed chicken, tomato, ginger, green chili', 980, 'Main dishes', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85', 'Serves 2 / 25 min'),
  ('Daal makhani', 'Slow-cooked black lentils, butter, cream, coriander', 520, 'Main dishes', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85', 'Serves 1 / 18 min'),
  ('Tandoori naan basket', 'Fresh naan, sesame, butter and mint chutney', 220, 'Breads', 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85', 'Fresh / 8 min'),
  ('Kheer brulee', 'Cardamom rice pudding, caramel crust, pistachio', 320, 'Desserts', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85', 'Sweet course / 8 min'),
  ('Herb grilled chicken', 'Chicken breast, roasted vegetables, pepper jus', 1150, 'Mains', 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85', 'Ready in / 22 min'),
  ('Creamy mushroom pasta', 'Fettuccine, mushrooms, parmesan, garlic cream', 890, 'Pasta', 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', 'Ready in / 18 min'),
  ('Crispy fish and chips', 'Battered fish, fries, tartare sauce, lemon', 980, 'Mains', 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Lotus biscoff cheesecake', 'Baked cheesecake, biscuit crumb, caramel', 480, 'Desserts', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85', 'Sweet course / 8 min'),
  ('Dastarkhwan mutton karahi', 'Tender mutton, ripe tomatoes, ginger and chilies', 1750, 'Main dishes', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85', 'Serves 2 / 30 min'),
  ('Charcoal chicken tikka', 'Yogurt-marinated chicken, lemon, green chutney', 920, 'BBQ', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85', 'To share / 22 min'),
  ('Special mutton pulao', 'Sella rice, tender mutton, fried onions, raita', 780, 'Rice', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Kulfi falooda', 'Saffron kulfi, vermicelli, basil seeds, rose syrup', 420, 'Desserts', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85', 'Sweet course / 8 min'),
  ('Mr King signature burger', 'Double beef patty, cheddar, pickles, king sauce', 850, 'Burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'),
  ('Crispy king chicken', 'Crunchy chicken, cheese, lettuce, spicy mayo', 720, 'Burgers', 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'),
  ('King loaded fries', 'Crispy fries, cheese sauce, jalapeno, beef strips', 560, 'Sides', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85', 'Ready in / 10 min'),
  ('Fresh mint lemonade', 'Fresh lemon, mint, crushed ice', 280, 'Drinks', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min')
) as seed(name, description, price, category, image_url, service_note)
where not exists (select 1 from public.menu_items existing where lower(existing.name) = lower(seed.name));
