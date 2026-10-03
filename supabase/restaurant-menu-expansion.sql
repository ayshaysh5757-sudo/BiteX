-- Seed the extra menu items used by the 15-item restaurant menus.
-- Run after restaurant-menu-catalog.sql and secure-order-totals.sql.

insert into public.menu_items (name, description, price, category, image_url, service_note)
select seed.name, seed.description, seed.price, seed.category, seed.image_url, seed.service_note
from (values
  ('Chicken handi', 'Creamy chicken, roasted spices, ginger and green chili', 1050, 'Main dishes', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85', 'Serves 2 / 25 min'),
  ('Butter naan', 'Tandoor-baked naan brushed with butter', 140, 'Breads', 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85', 'Fresh / 8 min'),
  ('Fresh raita', 'Cool yogurt, cucumber, mint and roasted cumin', 180, 'Sides', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min'),
  ('White Castle supreme pizza', 'Chicken, beef pepperoni, olives, peppers and cheese', 1550, 'Pizzas', 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Chicken wings', 'Crispy wings tossed in smoky house sauce', 620, 'Sides', 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85', 'Ready in / 15 min'),
  ('Chocolate brownie', 'Warm chocolate brownie with vanilla cream', 380, 'Desserts', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', 'Sweet course / 8 min'),
  ('Planet supreme pizza', 'Chicken, beef pepperoni, olives, peppers and mozzarella', 1550, 'Pizzas', 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Chicken karahi', 'Tomato, ginger, green chili and fresh coriander', 1100, 'Main dishes', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85', 'Serves 2 / 25 min'),
  ('Garlic naan', 'Tandoor naan with garlic, butter and herbs', 180, 'Breads', 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85', 'Fresh / 8 min'),
  ('Mango lassi', 'Chilled yogurt, ripe mango and cardamom', 320, 'Drinks', 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min'),
  ('Chicken tikka pizza', 'Tikka chicken, onions, peppers and mozzarella', 1450, 'Pizzas', 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Creamy pasta', 'Chicken, mushrooms, parmesan and white sauce', 820, 'Pasta', 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', 'Ready in / 18 min'),
  ('Mint lemonade', 'Fresh lemon, mint and crushed ice', 260, 'Drinks', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min'),
  ('Sausy beef wrap', 'Beef strips, lettuce, cheese and signature sauce', 620, 'Wraps', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85', 'Ready in / 12 min'),
  ('Chicken tenders', 'Crispy chicken strips with house dip', 520, 'Sides', 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=85', 'Ready in / 12 min'),
  ('Oreo shake', 'Cold milkshake, vanilla and crushed cookies', 380, 'Drinks', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min'),
  ('Pepperoni special', 'Beef pepperoni, mozzarella, herbs and tomato sauce', 1500, 'Pizzas', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Garlic bread', 'Toasted bread, garlic butter and parmesan', 420, 'Sides', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85', 'Ready in / 10 min'),
  ('Strawberry cheesecake', 'Creamy cheesecake, berry compote and biscuit crumb', 520, 'Desserts', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85', 'Sweet course / 8 min'),
  ('French toast', 'Brioche toast, berries, honey and cream', 520, 'Breakfast', 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=85', 'Fresh / 12 min'),
  ('Chicken panini', 'Grilled chicken, mozzarella, tomato and pesto', 680, 'Sandwiches', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85', 'Ready in / 12 min'),
  ('Iced latte', 'Espresso, chilled milk and cocoa finish', 360, 'Drinks', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min'),
  ('Mutton handi', 'Slow-cooked mutton, cream and roasted spices', 1750, 'Main dishes', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85', 'Serves 2 / 30 min'),
  ('Chicken biryani', 'Fragrant basmati rice, spiced chicken and raita', 520, 'Rice', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Beef steak', 'Grilled beef, roasted vegetables and pepper jus', 1450, 'Mains', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85', 'Ready in / 25 min'),
  ('Chicken club sandwich', 'Grilled chicken, egg, lettuce and toasted bread', 760, 'Sandwiches', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85', 'Ready in / 12 min'),
  ('Classic cappuccino', 'Espresso, steamed milk and soft cocoa finish', 340, 'Drinks', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min'),
  ('Seekh kebab', 'Charcoal-grilled beef kebabs with mint chutney', 760, 'BBQ', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85', 'To share / 20 min'),
  ('King beef wrap', 'Grilled beef, cheese, lettuce and king sauce', 650, 'Wraps', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85', 'Ready in / 12 min'),
  ('Crispy chicken tenders', 'Golden chicken strips with house dip', 560, 'Sides', 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=85', 'Ready in / 12 min'),
  ('King chocolate shake', 'Cold chocolate shake with whipped cream', 420, 'Drinks', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min'),
  ('House special platter', 'Chef-selected favourites with fresh sides', 850, 'Specials', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85', 'To share / 20 min'),
  ('Grilled chicken meal', 'Herb grilled chicken with vegetables and sauce', 780, 'Mains', 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85', 'Ready in / 20 min'),
  ('Loaded cheese fries', 'Crispy fries, cheese sauce and house seasoning', 480, 'Sides', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85', 'Ready in / 10 min'),
  ('House chicken wrap', 'Chicken, lettuce, cheese and signature sauce', 580, 'Wraps', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85', 'Ready in / 12 min'),
  ('Seasonal fresh salad', 'Crisp vegetables, herbs, lemon and dressing', 360, 'Sides', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min'),
  ('Chocolate dessert', 'Warm chocolate dessert with cream', 420, 'Desserts', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', 'Sweet course / 8 min'),
  ('Fresh seasonal juice', 'Chilled fruit juice prepared fresh', 280, 'Drinks', 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=85', 'Fresh / 5 min'),
  ('Chef special dessert', 'A rotating sweet finish from the kitchen', 450, 'Desserts', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85', 'Sweet course / 8 min')
) as seed(name, description, price, category, image_url, service_note)
where not exists (select 1 from public.menu_items existing where lower(existing.name) = lower(seed.name));
