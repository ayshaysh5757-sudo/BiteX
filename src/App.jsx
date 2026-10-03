import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Bell, CalendarDays, ChefHat, ChevronDown, ClipboardList, Clock3, Heart, LayoutDashboard, LogOut, MapPin, Search, Settings, ShoppingBag, Star } from 'lucide-react'
import './App.css'
import './homepage-theme.css'
import { supabase } from './lib/supabase'


const restaurantMenuAdditions = {
  'food-street-533': [
    { name: 'Chicken handi', description: 'Creamy chicken, roasted spices, ginger and green chili', price: 1050, category: 'Main dishes', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85', serviceNote: 'Serves 2 / 25 min' },
    { name: 'Butter naan', description: 'Tandoor-baked naan brushed with butter', price: 140, category: 'Breads', image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 8 min' },
    { name: 'Fresh raita', description: 'Cool yogurt, cucumber, mint and roasted cumin', price: 180, category: 'Sides', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  ],
  'whites-castle-pizza': [
    { name: 'White Castle supreme pizza', description: 'Chicken, beef pepperoni, olives, peppers and cheese', price: 1550, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Chicken wings', description: 'Crispy wings tossed in smoky house sauce', price: 620, category: 'Sides', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 15 min' },
    { name: 'Chocolate brownie', description: 'Warm chocolate brownie with vanilla cream', price: 380, category: 'Desserts', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', serviceNote: 'Sweet course / 8 min' },
  ],
  'pizza-planet': [
    { name: 'Planet supreme pizza', description: 'Chicken, beef pepperoni, olives, peppers and mozzarella', price: 1550, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Chicken wings', description: 'Crispy wings, smoky glaze and herbs', price: 650, category: 'Sides', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 15 min' },
    { name: 'Chocolate brownie', description: 'Warm brownie with chocolate sauce', price: 400, category: 'Desserts', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', serviceNote: 'Sweet course / 8 min' },
  ],
  'wali-baba-rooftop': [
    { name: 'Chicken karahi', description: 'Tomato, ginger, green chili and fresh coriander', price: 1100, category: 'Main dishes', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85', serviceNote: 'Serves 2 / 25 min' },
    { name: 'Garlic naan', description: 'Tandoor naan with garlic, butter and herbs', price: 180, category: 'Breads', image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 8 min' },
    { name: 'Mango lassi', description: 'Chilled yogurt, ripe mango and cardamom', price: 320, category: 'Drinks', image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  ],
  'silver-stone-pizza': [
    { name: 'Chicken tikka pizza', description: 'Tikka chicken, onions, peppers and mozzarella', price: 1450, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Creamy pasta', description: 'Chicken, mushrooms, parmesan and white sauce', price: 820, category: 'Pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 18 min' },
    { name: 'Mint lemonade', description: 'Fresh lemon, mint and crushed ice', price: 260, category: 'Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  ],
  'mr-sausy': [
    { name: 'Sausy beef wrap', description: 'Beef strips, lettuce, cheese and signature sauce', price: 620, category: 'Wraps', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 12 min' },
    { name: 'Chicken tenders', description: 'Crispy chicken strips with house dip', price: 520, category: 'Sides', image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 12 min' },
    { name: 'Oreo shake', description: 'Cold milkshake, vanilla and crushed cookies', price: 380, category: 'Drinks', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  ],
  'slice-of-heaven': [
    { name: 'Pepperoni special', description: 'Beef pepperoni, mozzarella, herbs and tomato sauce', price: 1500, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Garlic bread', description: 'Toasted bread, garlic butter and parmesan', price: 420, category: 'Sides', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 10 min' },
    { name: 'Strawberry cheesecake', description: 'Creamy cheesecake, berry compote and biscuit crumb', price: 520, category: 'Desserts', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85', serviceNote: 'Sweet course / 8 min' },
  ],
  'roadside-cafe': [
    { name: 'French toast', description: 'Brioche toast, berries, honey and cream', price: 520, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 12 min' },
    { name: 'Chicken panini', description: 'Grilled chicken, mozzarella, tomato and pesto', price: 680, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 12 min' },
    { name: 'Iced latte', description: 'Espresso, chilled milk and a smooth cocoa finish', price: 360, category: 'Drinks', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  ],
  kanwal: [
    { name: 'Mutton karahi', description: 'Tender mutton, tomato, ginger and green chili', price: 1450, category: 'Main dishes', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85', serviceNote: 'Serves 2 / 30 min' },
    { name: 'Chicken biryani', description: 'Fragrant basmati rice, spiced chicken and raita', price: 520, category: 'Rice', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Mango lassi', description: 'Chilled yogurt, mango and cardamom', price: 300, category: 'Drinks', image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  ],
  'fork-and-knives': [
    { name: 'Beef steak', description: 'Grilled beef, roasted vegetables and pepper jus', price: 1450, category: 'Mains', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 25 min' },
    { name: 'Chicken club sandwich', description: 'Grilled chicken, egg, lettuce and toasted bread', price: 760, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 12 min' },
    { name: 'Classic cappuccino', description: 'Espresso, steamed milk and soft cocoa finish', price: 340, category: 'Drinks', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  ],
  'samundri-dastarkhwan': [
    { name: 'Chicken karahi', description: 'Wok-tossed chicken, tomato, ginger and green chili', price: 980, category: 'Main dishes', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85', serviceNote: 'Serves 2 / 25 min' },
    { name: 'Seekh kebab', description: 'Charcoal-grilled beef kebabs with mint chutney', price: 760, category: 'BBQ', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85', serviceNote: 'To share / 20 min' },
    { name: 'Tandoori naan basket', description: 'Fresh naan, butter and mint chutney', price: 220, category: 'Breads', image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 8 min' },
  ],
  'mr-king': [
    { name: 'King beef wrap', description: 'Grilled beef, cheese, lettuce and king sauce', price: 650, category: 'Wraps', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 12 min' },
    { name: 'Crispy chicken tenders', description: 'Golden chicken strips with house dip', price: 560, category: 'Sides', image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 12 min' },
    { name: 'King chocolate shake', description: 'Cold chocolate shake with whipped cream', price: 420, category: 'Drinks', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  ],
}

const restaurantMenuFinalAdditions = {
  'food-street-533': [
    { name: 'Beef pulao', description: 'Fragrant rice, tender beef, fried onions and raita', price: 680, category: 'Rice', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Chicken tikka', description: 'Charcoal chicken, lemon and mint chutney', price: 820, category: 'BBQ', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85', serviceNote: 'To share / 20 min' },
    { name: 'Beef seekh kebab', description: 'Spiced beef kebabs with naan and chutney', price: 760, category: 'BBQ', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85', serviceNote: 'To share / 20 min' },
    { name: 'Aloo paratha', description: 'Stuffed potato paratha with yogurt and pickle', price: 260, category: 'Breads', image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 12 min' },
    { name: 'Chicken chow mein', description: 'Noodles, chicken, vegetables and soy sauce', price: 620, category: 'Main dishes', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 15 min' },
    { name: 'Kheer', description: 'Traditional rice pudding with cardamom and pistachio', price: 260, category: 'Desserts', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85', serviceNote: 'Sweet course / 8 min' },
    { name: 'Gulab jamun', description: 'Warm syrup-soaked dumplings with pistachio', price: 220, category: 'Desserts', image: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=900', serviceNote: 'Sweet course / 8 min' },
    { name: 'Masala chai', description: 'Strong tea, milk, cardamom and warming spices', price: 180, category: 'Drinks', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  ],
  'whites-castle-pizza': [
    { name: 'Cheese lovers pizza', description: 'Mozzarella, cheddar, parmesan and herbs', price: 1350, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'BBQ chicken pizza', description: 'BBQ chicken, onion, peppers and smoked cheese', price: 1450, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Chicken pasta', description: 'Chicken, mushrooms, parmesan and white sauce', price: 820, category: 'Pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 18 min' },
    { name: 'Chicken shawarma', description: 'Garlic sauce, pickles, lettuce and warm pita', price: 480, category: 'Wraps', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 12 min' },
    { name: 'Mozzarella sticks', description: 'Crispy cheese sticks with marinara dip', price: 520, category: 'Sides', image: 'https://images.unsplash.com/photo-1548340748-6d2b7d7da280?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 10 min' },
    { name: 'Chicken burger meal', description: 'Crispy burger, fries and a cold drink', price: 920, category: 'Burgers', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 15 min' },
    { name: 'Vanilla shake', description: 'Cold vanilla milkshake with whipped cream', price: 380, category: 'Drinks', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
    { name: 'Chicken nuggets', description: 'Golden chicken bites with two house dips', price: 480, category: 'Sides', image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 10 min' },
  ],
  'pizza-planet': [
    { name: 'Cheese burst pizza', description: 'Mozzarella, cheddar, parmesan and cheese-filled crust', price: 1650, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 22 min' },
    { name: 'Chicken fajita pizza', description: 'Fajita chicken, onion, capsicum and smoky sauce', price: 1400, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Chicken wings', description: 'Crispy wings with hot or smoky glaze', price: 680, category: 'Sides', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 15 min' },
    { name: 'Alfredo pasta', description: 'Creamy pasta, chicken, mushrooms and parmesan', price: 850, category: 'Pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 18 min' },
    { name: 'Garlic bread', description: 'Toasted bread, garlic butter and herbs', price: 420, category: 'Sides', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 10 min' },
    { name: 'Chicken wrap', description: 'Grilled chicken, lettuce, cheese and sauce', price: 580, category: 'Wraps', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 12 min' },
    { name: 'Oreo shake', description: 'Cold milkshake with vanilla and crushed cookies', price: 420, category: 'Drinks', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
    { name: 'Lava cake', description: 'Warm chocolate cake with molten centre', price: 480, category: 'Desserts', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', serviceNote: 'Sweet course / 10 min' },
  ],
  'wali-baba-rooftop': [
    { name: 'Mutton handi', description: 'Slow-cooked mutton, cream and roasted spices', price: 1750, category: 'Main dishes', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85', serviceNote: 'Serves 2 / 30 min' },
    { name: 'Chicken tikka', description: 'Yogurt-marinated chicken, lemon and chutney', price: 850, category: 'BBQ', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85', serviceNote: 'To share / 20 min' },
    { name: 'Beef seekh kebab', description: 'Charcoal-grilled beef kebab with mint chutney', price: 820, category: 'BBQ', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85', serviceNote: 'To share / 20 min' },
    { name: 'Butter naan basket', description: 'Fresh tandoor naan with butter and sesame', price: 220, category: 'Breads', image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 8 min' },
    { name: 'Chicken pulao', description: 'Sella rice, spiced chicken, fried onions and raita', price: 620, category: 'Rice', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Fresh green salad', description: 'Cucumber, tomato, onion, lemon and herbs', price: 260, category: 'Sides', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
    { name: 'Mango lassi', description: 'Chilled yogurt, ripe mango and cardamom', price: 320, category: 'Drinks', image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
    { name: 'Shahi tukray', description: 'Sweet bread pudding, cream, cardamom and nuts', price: 380, category: 'Desserts', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85', serviceNote: 'Sweet course / 8 min' },
  ],
}

const sharedMenuExpansion = [
  { name: 'House special platter', description: 'Chef-selected favourites with fresh sides', price: 850, category: 'Specials', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85', serviceNote: 'To share / 20 min' },
  { name: 'Grilled chicken meal', description: 'Herb grilled chicken with vegetables and sauce', price: 780, category: 'Mains', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
  { name: 'Loaded cheese fries', description: 'Crispy fries, cheese sauce and house seasoning', price: 480, category: 'Sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 10 min' },
  { name: 'House chicken wrap', description: 'Chicken, lettuce, cheese and signature sauce', price: 580, category: 'Wraps', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 12 min' },
  { name: 'Seasonal fresh salad', description: 'Crisp vegetables, herbs, lemon and dressing', price: 360, category: 'Sides', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  { name: 'Chocolate dessert', description: 'Warm chocolate dessert with cream', price: 420, category: 'Desserts', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', serviceNote: 'Sweet course / 8 min' },
  { name: 'Fresh seasonal juice', description: 'Chilled fruit juice prepared fresh', price: 280, category: 'Drinks', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  { name: 'Chef special dessert', description: 'A rotating sweet finish from the kitchen', price: 450, category: 'Desserts', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85', serviceNote: 'Sweet course / 8 min' },
]

const defaultHubPhone = '+92 300 0000000'
const exactDishImageMap = {
  'chicken karahi': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85',
  'mutton karahi': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
  'food street chicken karahi': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85',
  'wali baba mutton karahi': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
  'kanwal chicken karahi': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85',
  'dastarkhwan mutton karahi': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
  'chicken handi': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85',
  'mutton handi': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
  'seekh kebab platter': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85',
  'beef seekh kebab': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85',
  'chicken biryani': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85',
  'beef pulao': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85',
  'special mutton pulao': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85',
  'gulab jamun': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85',
  'kheer': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85',
  'classic beef burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85',
  'samundri zinger burger': 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85',
  'chicken shawarma': 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85',
  'loaded fries': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85',
  'samundri special fish': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85',
  'samundri special pizza': 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85',
  'lemon olive oil cake': 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=85',
  'sea salt panna cotta': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85',
  'classic lemonade': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85',
  'fresh mint lemonade': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85',
  'mango lassi': 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=85',
  'butter naan': 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85',
  'garlic naan': 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85',
  'tandoori naan basket': 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85',
  'fresh raita': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85',
  'fresh green salad': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85',
}
const dishImageOverrides = [
  { matches: /mutton karahi|mutton handi|mutton pulao|beef seekh|beef.*kebab|beef.*wrap|beef.*burger|beef.*pulao/, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85' },
  { matches: /chicken karahi|chicken handi|chicken tikka|bbq chicken|grilled chicken|chicken meal|chicken.*biryani|chicken.*pulao/, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85' },
  { matches: /pizza|pepperoni|fajita|cheese burst|special pizza|castle special|heavenly cheese/, image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85' },
  { matches: /pasta|chow mein|alfredo|creamy mushroom|creamy chicken/, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85' },
  { matches: /burger|zinger|smash|king signature|club sandwich|shawarma|wrap|roll|sandwich/, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85' },
  { matches: /fries|loaded.*fries|garlic bread|mozzarella sticks|nuggets|tenders|wings|loaded cheese/, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85' },
  { matches: /biryani|pulao|rice|pilaf/, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85' },
  { matches: /kheer|gulab|kulfi|cake|brownie|dessert|cheesecake|lava|shahi tukray|falooda/, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85' },
  { matches: /lassi|shake|lemonade|chai|tea|juice|latte|cappuccino|coffee/, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85' },
  { matches: /fish|grilled fish|seafood/, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85' },
  { matches: /seekh|kebab|tikka|bbq|charcoal/, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85' },
  { matches: /naan|paratha|bread/, image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85' },
]
const getMenuImageForItem = (item) => {
  const rawName = (item?.name || '').trim().toLowerCase()
  const exactMatch = exactDishImageMap[rawName]
  const override = dishImageOverrides.find(({ matches }) => matches.test(rawName))
  const normalizedFallback = item?.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85'
  return { image: exactMatch || override?.image || normalizedFallback, imageCredit: override?.credit, imageCreditUrl: override?.creditUrl }
}
const whatsappNumber = (phone) => phone.replace(/\D/g, '')
const setLocationHash = (hash) => { window.location.hash = hash }
const getStoredHistory = () => {
  try {
    const value = window.localStorage.getItem('samundri_activity_history')
    return value ? JSON.parse(value) : []
  } catch {
    return []
  }
}
const getStoredAccountProfile = (email) => {
  try {
    const value = window.sessionStorage.getItem('samundri_pending_profile')
    const profile = value ? JSON.parse(value) : null
    if (email && profile?.email?.toLowerCase() !== email.toLowerCase()) return null
    return profile
  } catch {
    return null
  }
}
const isAuthRateLimited = (error) => error?.status === 429 || /rate.?limit|too many requests|over_email_send_rate_limit/i.test(`${error?.code || ''} ${error?.message || ''}`)
const getAuthErrorMessage = (error) => {
  const details = `${error?.code || ''} ${error?.message || ''}`
  if (isAuthRateLimited(error)) {
    return 'Account creation is temporarily unavailable. Please wait a minute, then try again.'
  }
  if (error?.code === 'email_not_confirmed') {
    return 'Your account exists, but its email is not confirmed yet. Confirm it before signing in.'
  }
  if (/invalid.*credentials|credentials.*invalid/i.test(details)) {
    return 'Email or password does not match. Check your details or reset your password.'
  }
  return error?.message || 'We could not complete that request. Please try again.'
}
const getNotificationPreferences = (userId) => {
  const key = `samundri_notification_preferences:${userId || 'guest'}`
  try {
    const stored = window.localStorage.getItem(key)
    return stored ? { orders: true, reservations: true, events: true, ...JSON.parse(stored) } : { orders: true, reservations: true, events: true }
  } catch {
    return { orders: true, reservations: true, events: true }
  }
}

const menuItems = [
  { name: 'Samundri special fish', description: 'Grilled fish, garlic butter, lemon, herbs', price: 1450, category: 'Fish specials', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85' },
  { name: 'Samundri special pizza', description: 'Mozzarella, chicken, peppers, house herbs', price: 1350, category: 'Popular favorites', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85' },
  { name: 'Classic beef burger', description: 'Grilled patty, cheddar, lettuce, house sauce', price: 650, category: 'Popular favorites', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85' },
  { name: 'Samundri zinger burger', description: 'Crispy chicken, cheese, lettuce, spicy mayo', price: 600, category: 'Popular favorites', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85' },
  { name: 'Chicken shawarma', description: 'Garlic sauce, pickles, lettuce, warm pita', price: 450, category: 'Popular favorites', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85' },
  { name: 'Crispy chicken roll', description: 'Spiced chicken, cheese, herbs, house sauce', price: 400, category: 'Popular favorites', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85' },
  { name: 'Loaded fries', description: 'Crispy fries, cheese, jalapeno, garlic sauce', price: 350, category: 'Small plates', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85' },
  { name: 'Lemon olive oil cake', description: 'Citrus curd, mascarpone, almond crumb', price: 400, category: 'Sweet things', image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=85' },
  { name: 'Sea salt panna cotta', description: 'Vanilla, strawberry, toasted oat crumble', price: 450, category: 'Sweet things', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85' },
]

const restaurants = [
  { slug: 'food-street-533', name: 'Food Street 533', brand: 'FOOD STREET 533', logoMark: 'F5', cuisine: 'Desi / BBQ', rating: '4.8', reviews: '521', status: 'Open now', area: 'Main Bazaar, Samundri', phone: '+92 300 533 0533', email: 'hello@foodstreet533.pk', hours: '11am - 11pm', accent: '#d56b3f', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=88', tag: 'Most loved' },
  { slug: 'whites-castle-pizza', name: 'Whites Castle Pizza Samundari', brand: 'WHITES CASTLE', logoMark: 'WC', cuisine: 'Pizza / Fast food', rating: '4.6', reviews: '318', status: 'Open now', area: 'Samundri, Punjab', phone: '+92 301 225 5522', email: 'orders@whitescastle.pk', hours: '12pm - 1am', accent: '#c98a35', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=88', tag: 'Crowd favourite' },
  { slug: 'pizza-planet', name: 'Pizza Planet', brand: 'PIZZA PLANET', logoMark: 'PP', cuisine: 'Pizza / Drinks', rating: '4.5', reviews: '204', status: 'Open now', area: 'Samundri Road', phone: '+92 302 777 4242', email: 'hello@pizzaplanet.pk', hours: '1pm - 12am', accent: '#4f8a78', image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=88', tag: 'Quick bites' },
  { slug: 'wali-baba-rooftop', name: 'Wali Baba Restaurant and Rooftop', brand: 'WALI BABA', logoMark: 'WB', cuisine: 'Pakistani / BBQ', rating: '4.7', reviews: '176', status: 'Open now', area: 'Samundri, Punjab', phone: '+92 303 884 9090', email: 'bookings@walibaba.pk', hours: '5pm - 12am', accent: '#aa5b38', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=88', tag: 'Rooftop dining' },
  { slug: 'silver-stone-pizza', name: 'Silver Stone Pizza', brand: 'SILVER STONE', logoMark: 'SS', cuisine: 'Pizza / Fast food', rating: '4.6', reviews: '142', status: 'Open now', area: 'Main Road, Samundri', phone: '+92 304 555 0188', email: 'hello@silverstonepizza.pk', hours: '12pm - 12am', accent: '#8b6f47', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=88', tag: 'Stone baked' },
  { slug: 'mr-sausy', name: 'Mr. Sausy', brand: 'MR. SAUSY', logoMark: 'MS', cuisine: 'Burgers / Fast food', rating: '4.5', reviews: '118', status: 'Open now', area: 'College Road, Samundri', phone: '+92 305 222 0199', email: 'orders@mrsausy.pk', hours: '1pm - 1am', accent: '#b55443', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=88', tag: 'Saucy favourites' },
  { slug: 'slice-of-heaven', name: 'Slice of Heaven', brand: 'SLICE OF HEAVEN', logoMark: 'SH', cuisine: 'Pizza / Desserts', rating: '4.7', reviews: '165', status: 'Open now', area: 'Faisal Market, Samundri', phone: '+92 306 333 0277', email: 'hello@sliceofheaven.pk', hours: '12pm - 12am', accent: '#c27652', image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=90', tag: 'Sweet slices' },
  { slug: 'roadside-cafe', name: 'Roadside Cafe', brand: 'ROADSIDE CAFE', logoMark: 'RC', cuisine: 'Cafe / Breakfast', rating: '4.4', reviews: '96', status: 'Open now', area: 'Canal Road, Samundri', phone: '+92 307 444 0311', email: 'hello@roadsidecafe.pk', hours: '8am - 11pm', accent: '#55766a', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=88', tag: 'All day cafe' },
  { slug: 'kanwal', name: 'Kanwal', brand: 'KANWAL', logoMark: 'K', cuisine: 'Pakistani / Desi', rating: '4.8', reviews: '149', status: 'Open now', area: 'Clock Tower Road, Samundri', phone: '+92 308 555 0412', email: 'hello@kanwal.pk', hours: '12pm - 11pm', accent: '#b97842', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=88', tag: 'Home-style flavours' },
  { slug: 'fork-and-knives', name: 'Fork and Knives', brand: 'FORK AND KNIVES', logoMark: 'FK', cuisine: 'Continental / Cafe', rating: '4.6', reviews: '132', status: 'Open now', area: 'College Road, Samundri', phone: '+92 309 444 0521', email: 'hello@forkandknives.pk', hours: '11am - 11pm', accent: '#7a9271', image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=88', tag: 'Modern comfort food' },
  { slug: 'samundri-dastarkhwan', name: 'Samundri Dastarkhwan', brand: 'SAMUNDRI DASTARKHWAN', logoMark: 'SD', cuisine: 'Punjabi / BBQ', rating: '4.7', reviews: '187', status: 'Open now', area: 'Jhang Road, Samundri', phone: '+92 300 777 0630', email: 'hello@samundridastarkhwan.pk', hours: '12pm - 12am', accent: '#9b603b', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=88', tag: 'Family feasts' },
  { slug: 'mr-king', name: 'Mr King', brand: 'MR KING', logoMark: 'MK', cuisine: 'Burgers / Fast food', rating: '4.7', reviews: '126', status: 'Open now', area: 'Main Road, Samundri', phone: '+92 310 666 0717', email: 'orders@mrking.pk', hours: '12pm - 1am', accent: '#c58a3c', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=88', tag: 'King-sized cravings' },
]

const restaurantPageImages = {
  'food-street-533': { story: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=90', event: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=90', reservation: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=90' },
  'whites-castle-pizza': { story: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1400&q=90', event: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=1400&q=90', reservation: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1400&q=90' },
  'pizza-planet': { story: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1400&q=90', event: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&w=1400&q=90', reservation: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1400&q=90' },
  'wali-baba-rooftop': { story: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=90', event: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=90', reservation: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=90' },
  'silver-stone-pizza': { story: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=90', event: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1400&q=90', reservation: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=90' },
  'mr-sausy': { story: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=90', event: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=90', reservation: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=90' },
  'slice-of-heaven': { story: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=1400&q=90', event: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=90', reservation: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=1400&q=90' },
  'roadside-cafe': { story: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=90', event: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=90', reservation: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=90' },
  kanwal: { story: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90', event: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=90', reservation: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90' },
  'fork-and-knives': { story: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=90', event: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=90', reservation: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=90' },
  'samundri-dastarkhwan': { story: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1400&q=90', event: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=90', reservation: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=90' },
  'mr-king': { story: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=90', event: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=90', reservation: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=90' },
}

const restaurantStories = {
  'food-street-533': { kicker: 'Bazaar-side gatherings', headline: 'The heart of', emphasis: 'the food street.', intro: 'A lively stop for karahi at the centre of the table, smoky BBQ to pass around, and the familiar rhythm of a meal shared with everyone.', quote: 'Come for the sizzle; stay for one more round around the table.', values: [['01', 'Karahi, centre stage', 'Built around generous, bubbling favourites made for sharing.'], ['02', 'Smoke and spice', 'BBQ flavours bring a little theatre to every gathering.'], ['03', 'Room for everyone', 'A relaxed meeting point for family meals and bazaar breaks.']] },
  'whites-castle-pizza': { kicker: 'A castle for cravings', headline: 'Big slices,', emphasis: 'bright nights.', intro: 'A playful pizza stop where loaded crusts, familiar fast-food favourites and easy-going energy turn an ordinary evening into a group order.', quote: 'Pick your slice, pull up a chair, and let the table decide the rest.', values: [['01', 'Pizza first', 'A menu led by shareable pies and lively toppings.'], ['02', 'Easy choices', 'Comfort-food favourites make ordering with friends simple.'], ['03', 'Stay a little', 'A casual setting for quick catch-ups that run longer.']] },
  'pizza-planet': { kicker: 'A launchpad for pizza nights', headline: 'Good food,', emphasis: 'out of orbit.', intro: 'Pizza Planet gives the classic pizza night a cosmic little twist: familiar slices, cool drinks and a relaxed landing spot for friends.', quote: 'One more slice is always a good reason to extend the evening.', values: [['01', 'Orbiting the oven', 'Pizza stays at the centre of every visit.'], ['02', 'A little variety', "Pasta and drinks round out the crew's order."], ['03', 'Made to share', 'A laid-back stop for small groups and easy nights.']] },
  'wali-baba-rooftop': { kicker: 'Evenings above the street', headline: 'A table with', emphasis: 'a little elevation.', intro: 'Wali Baba pairs Pakistani grills and slow-evening comfort with the change of pace that comes from dining on a rooftop.', quote: 'As the evening cools, let the grill and the conversation take their time.', values: [['01', 'Rooftop mood', 'An open-air setting gives dinner a different point of view.'], ['02', 'Charcoal character', 'BBQ brings the smoke, warmth and aroma to the table.'], ['03', 'Long evenings', 'A natural fit for dinners that deserve an unhurried pace.']] },
  'silver-stone-pizza': { kicker: 'From the stone to the table', headline: 'A little crisp,', emphasis: 'a lot of comfort.', intro: 'Silver Stone is built around the pleasure of a well-baked pizza: crisp edges, familiar toppings and simple sides for sharing.', quote: 'Break the crust, pass a slice, and make an evening of it.', values: [['01', 'Stone-baked spirit', 'The pizza-led menu puts the crust in the spotlight.'], ['02', 'Comfort on the side', 'Pasta and garlic bread make room for every appetite.'], ['03', 'Made for passing', 'Easygoing food for a table that likes to share.']] },
  'mr-sausy': { kicker: 'Sauce with an attitude', headline: 'Messy hands,', emphasis: 'happy cravings.', intro: 'Mr. Sausy leans into bold burger-shop fun: stacked bites, punchy sauces and no need to make a fast-food night too serious.', quote: 'Grab extra napkins. The best bites rarely stay neat.', values: [['01', 'Sauce is the signature', 'Big, savoury flavours lead every wrap and burger.'], ['02', 'Crunch welcome', 'Crispy sides bring a satisfying contrast to the menu.'], ['03', 'No-fuss fun', 'A quick, casual stop for cravings that arrive loud.']] },
  'slice-of-heaven': { kicker: 'A sweeter kind of pizza stop', headline: 'Save room', emphasis: 'for the last slice.', intro: 'Slice of Heaven brings pizza-night comfort together with a dessert-minded finish, so the sweet course feels like part of the plan.', quote: 'The perfect ending might be another slice, this time with strawberries.', values: [['01', 'Savoury to sweet', 'Pizza and desserts share the spotlight here.'], ['02', 'A softer finish', 'Cheesecake makes a lovely counterpoint to a savoury slice.'], ['03', 'Treat-yourself mood', 'For casual celebrations and little everyday rewards.']] },
  'roadside-cafe': { kicker: 'A pause along the way', headline: 'Slow mornings,', emphasis: 'easy afternoons.', intro: 'Roadside Cafe is shaped around the small rituals of cafe life: a relaxed breakfast, something warm to sip, and nowhere else to rush.', quote: 'Take the window seat, order another coffee, and let the day catch up.', values: [['01', 'Breakfast beginnings', 'A gentle start, from French toast to a proper first cup.'], ['02', 'Cafe comfort', 'Paninis and coffee make an easy midday pairing.'], ['03', 'A place to pause', 'A casual stop for catching up or taking a breather.']] },
  kanwal: { kicker: 'The comfort of a familiar table', headline: 'Old favourites,', emphasis: 'made for sharing.', intro: 'Kanwal celebrates the generous side of Pakistani home-style cooking: karahi at the centre, rice on the side and something cool to pour.', quote: 'The best meal is the one where everyone reaches for the same dish.', values: [['01', 'Home-style heart', 'Comforting Pakistani favourites shape the table.'], ['02', 'Pass it around', 'Karahi and biryani are natural centrepieces for sharing.'], ['03', 'A sweet pause', 'A chilled lassi brings a gentle finish to the spice.']] },
  'fork-and-knives': { kicker: 'A modern comfort-food table', headline: 'A familiar fork,', emphasis: 'a fresh point of view.', intro: 'Fork and Knives brings cafe ease to a more varied plate, moving from grilled mains to sandwiches and coffee without losing its relaxed feel.', quote: 'Come curious; there is always another comfortable favourite to try.', values: [['01', 'More than one mood', 'A varied menu makes room for different kinds of cravings.'], ['02', 'Cafe pace', 'Coffee and sandwiches keep the visit relaxed.'], ['03', 'Comfort, rethought', 'Familiar dishes meet a clean, contemporary feel.']] },
  'samundri-dastarkhwan': { kicker: 'A spread meant to be shared', headline: 'Gather close,', emphasis: 'the dastarkhwan is ready.', intro: 'Samundri Dastarkhwan takes its cue from the shared spread: karahi, charcoal kebabs and fresh naan placed within everyone\'s reach.', quote: 'Make space in the middle of the table; the best parts are passed around.', values: [['01', 'A shared spread', 'The menu is imagined around dishes placed in the centre.'], ['02', 'From the grill', 'Charcoal kebabs add smoky depth to the gathering.'], ['03', 'Fresh from the tandoor', 'Naan completes the familiar, generous rhythm of the meal.']] },
  'mr-king': { kicker: 'Big appetite territory', headline: 'Bring your', emphasis: 'king-size craving.', intro: 'Mr King is all about bold, satisfying fast-food favourites: beef wraps, crispy sides and cool shakes for a proper treat-yourself stop.', quote: 'No small plans. Just a good burger-shop meal and a shake to finish.', values: [['01', 'Big, bold bites', 'Hearty wraps bring the main-event energy.'], ['02', 'Crunch on the side', 'Golden tenders keep the order generous.'], ['03', 'Shake it up', 'A chocolate shake gives the feast its final flourish.']] },
}

const restaurantMenus = {
  'food-street-533': [
    { name: 'Food Street chicken karahi', description: 'Tomato, ginger, green chili, fresh coriander', price: 850, category: 'Main dishes', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85', serviceNote: 'Serves 2 / 25 min' },
    { name: 'Seekh kebab platter', description: 'Smoky beef kebabs, naan, mint chutney', price: 720, category: 'BBQ', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85', serviceNote: 'To share / 20 min' },
    { name: 'Chicken biryani', description: 'Basmati rice, spiced chicken, raita', price: 480, category: 'Rice', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Gulab jamun', description: 'Warm syrup-soaked dumplings, pistachio', price: 220, category: 'Desserts', image: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=900', serviceNote: 'Sweet course / 8 min' },
  ],
  'whites-castle-pizza': [
    { name: 'Castle special pizza', description: 'Chicken, olives, peppers, mozzarella, herbs', price: 1450, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Chicken fajita pizza', description: 'Fajita chicken, onion, capsicum, smoky sauce', price: 1250, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Zinger burger', description: 'Crispy chicken, cheese, lettuce, spicy mayo', price: 650, category: 'Burgers', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 15 min' },
    { name: 'Loaded castle fries', description: 'Crispy fries, cheese sauce, jalapeno, chicken', price: 520, category: 'Sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 10 min' },
  ],
  'pizza-planet': [
    { name: 'Planet pepperoni', description: 'Pepperoni, mozzarella, tomato, oregano', price: 1350, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Creamy pasta', description: 'Chicken, mushrooms, parmesan, white sauce', price: 780, category: 'Pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 18 min' },
    { name: 'BBQ chicken pizza', description: 'BBQ chicken, onion, peppers, smoked cheese', price: 1450, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Mint lemonade', description: 'Fresh lemon, mint, crushed ice', price: 260, category: 'Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  ],
  'wali-baba-rooftop': [
    { name: 'Wali Baba mutton karahi', description: 'Tender mutton, tomato, ginger, green chili', price: 1650, category: 'Main dishes', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85', serviceNote: 'Serves 2 / 30 min' },
    { name: 'Charcoal BBQ platter', description: 'Malai boti, seekh kebab, chicken tikka', price: 1850, category: 'BBQ', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85', serviceNote: 'To share / 25 min' },
    { name: 'Rooftop chicken handi', description: 'Creamy chicken, roasted spices, naan', price: 1250, category: 'Main dishes', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85', serviceNote: 'Serves 2 / 25 min' },
    { name: 'Kashmiri chai', description: 'Pink tea, cardamom, crushed pistachio', price: 280, category: 'Drinks', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 8 min' },
  ],
  'silver-stone-pizza': [
    { name: 'Silver stone special', description: 'Chicken, olives, peppers, mozzarella, stone-baked crust', price: 1550, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Smoky fajita pizza', description: 'Fajita chicken, onion, capsicum, smoky sauce', price: 1350, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Garlic cheese bread', description: 'Baked bread, garlic butter, herbs, mozzarella', price: 480, category: 'Sides', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 10 min' },
    { name: 'Chocolate lava cake', description: 'Warm chocolate cake, vanilla cream, cocoa dust', price: 420, category: 'Desserts', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', serviceNote: 'Sweet course / 10 min' },
  ],
  'mr-sausy': [
    { name: 'Mr. Sausy smash burger', description: 'Double beef patty, cheddar, pickles, signature sauce', price: 780, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 15 min' },
    { name: 'Crispy chicken burger', description: 'Crunchy chicken, lettuce, cheese, spicy mayo', price: 680, category: 'Burgers', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 15 min' },
    { name: 'Loaded sauce fries', description: 'Crispy fries, cheese sauce, jalapeno, house drizzle', price: 430, category: 'Sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 10 min' },
    { name: 'Classic lemonade', description: 'Fresh lemon, mint, crushed ice', price: 240, category: 'Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  ],
  'slice-of-heaven': [
    { name: 'Heavenly cheese pizza', description: 'Mozzarella, parmesan, herbs, tomato sauce', price: 1450, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Garden fresh slice', description: 'Peppers, olives, onion, mushrooms, mozzarella', price: 1250, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Creamy pasta', description: 'Chicken, mushrooms, parmesan, white sauce', price: 820, category: 'Pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 18 min' },
    { name: 'Heavenly brownie', description: 'Warm chocolate brownie, vanilla ice cream, nuts', price: 450, category: 'Desserts', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', serviceNote: 'Sweet course / 10 min' },
  ],
  'roadside-cafe': [
    { name: 'Roadside breakfast plate', description: 'Eggs, toast, hash browns, grilled tomato', price: 650, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 15 min' },
    { name: 'Cafe club sandwich', description: 'Chicken, egg, lettuce, tomato, toasted bread', price: 720, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 12 min' },
    { name: 'Creamy chicken pasta', description: 'Chicken, mushrooms, parmesan, white sauce', price: 780, category: 'Pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 18 min' },
    { name: 'Cappuccino', description: 'Espresso, steamed milk, soft cocoa finish', price: 320, category: 'Drinks', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  ],
  kanwal: [
    { name: 'Kanwal chicken karahi', description: 'Wok-tossed chicken, tomato, ginger, green chili', price: 980, category: 'Main dishes', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85', serviceNote: 'Serves 2 / 25 min' },
    { name: 'Daal makhani', description: 'Slow-cooked black lentils, butter, cream, coriander', price: 520, category: 'Main dishes', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85', serviceNote: 'Serves 1 / 18 min' },
    { name: 'Tandoori naan basket', description: 'Fresh naan, sesame, butter and mint chutney', price: 220, category: 'Breads', image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 8 min' },
    { name: 'Kheer brulee', description: 'Cardamom rice pudding, caramel crust, pistachio', price: 320, category: 'Desserts', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85', serviceNote: 'Sweet course / 8 min' },
  ],
  'fork-and-knives': [
    { name: 'Herb grilled chicken', description: 'Chicken breast, roasted vegetables, pepper jus', price: 1150, category: 'Mains', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 22 min' },
    { name: 'Creamy mushroom pasta', description: 'Fettuccine, mushrooms, parmesan, garlic cream', price: 890, category: 'Pasta', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 18 min' },
    { name: 'Crispy fish and chips', description: 'Battered fish, fries, tartare sauce, lemon', price: 980, category: 'Mains', image: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Lotus biscoff cheesecake', description: 'Baked cheesecake, biscuit crumb, caramel', price: 480, category: 'Desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85', serviceNote: 'Sweet course / 8 min' },
  ],
  'samundri-dastarkhwan': [
    { name: 'Dastarkhwan mutton karahi', description: 'Tender mutton, ripe tomatoes, ginger and chilies', price: 1750, category: 'Main dishes', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85', serviceNote: 'Serves 2 / 30 min' },
    { name: 'Charcoal chicken tikka', description: 'Yogurt-marinated chicken, lemon, green chutney', price: 920, category: 'BBQ', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85', serviceNote: 'To share / 22 min' },
    { name: 'Special mutton pulao', description: 'Sella rice, tender mutton, fried onions, raita', price: 780, category: 'Rice', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 20 min' },
    { name: 'Kulfi falooda', description: 'Saffron kulfi, vermicelli, basil seeds, rose syrup', price: 420, category: 'Desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85', serviceNote: 'Sweet course / 8 min' },
  ],
  'mr-king': [
    { name: 'Mr King signature burger', description: 'Double beef patty, cheddar, pickles, king sauce', price: 850, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 15 min' },
    { name: 'Crispy king chicken', description: 'Crunchy chicken, cheese, lettuce, spicy mayo', price: 720, category: 'Burgers', image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 15 min' },
    { name: 'King loaded fries', description: 'Crispy fries, cheese sauce, jalapeno, beef strips', price: 560, category: 'Sides', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85', serviceNote: 'Ready in / 10 min' },
    { name: 'Fresh mint lemonade', description: 'Fresh lemon, mint, crushed ice', price: 280, category: 'Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85', serviceNote: 'Fresh / 5 min' },
  ],
}

function Header({ page, setPage, setHomeResetToken, setRestaurantSearchQuery, cart, isMenuOpen, setIsMenuOpen, restaurant, accountReady }) {
  const navigate = (nextPage) => { if (nextPage === 'restaurant-details' || nextPage === 'restaurants') setRestaurantSearchQuery(''); window.location.hash = nextPage === 'home' ? '' : nextPage === 'restaurants' ? 'restaurants' : nextPage === 'history' && restaurant ? `history/${restaurant.slug}` : restaurant && !['login', 'signup', 'history', 'admin'].includes(nextPage) ? `${nextPage}/${restaurant.slug}` : nextPage; if (nextPage === 'home') setHomeResetToken((current) => current + 1); setPage(nextPage); setIsMenuOpen(false); window.scrollTo(0, 0) }
  return <header className="site-header">
    <button className="wordmark" type="button" onClick={() => navigate('home')}>
      <span className="brand-lockup">
        <i className={`brand-symbol ${restaurant ? '' : 'home-brand-symbol'}`}>{restaurant ? restaurant.logoMark : <><ChefHat aria-hidden="true" size={20} /><span>BX</span></>}</i>
        <span className="brand-text"><b>{restaurant ? restaurant.brand : <>Bite<span className="wordmark-accent">X</span></>}</b><small>{restaurant ? restaurant.cuisine : 'FOOD HUB'}</small></span>
      </span>
    </button>
    <button className="menu-toggle" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}><span>Menu</span><b>{isMenuOpen ? 'x' : '+'}</b></button>
    <nav className={isMenuOpen ? 'is-open' : ''}>
      <button className={page === 'home' ? 'current' : ''} type="button" onClick={() => navigate('home')}>Home</button>
      <button className={`restaurant-nav-button ${page === 'restaurants' ? 'current' : ''}`} type="button" onClick={() => navigate('restaurants')}>Restaurants</button>
      {!restaurant && <button className={`restaurant-details-nav-button ${page === 'restaurant-details' ? 'current' : ''}`} type="button" onClick={() => navigate('restaurant-details')}>Restaurant Details</button>}
      {restaurant && <>
        <button className={`restaurant-page-nav-button ${page === 'menu' ? 'current' : ''}`} type="button" onClick={() => navigate('menu')}>Menu</button>
        <button className={`restaurant-page-nav-button ${page === 'reserve' ? 'current' : ''}`} type="button" onClick={() => navigate('reserve')}>Reserve a Table</button>
        <button className={`restaurant-page-nav-button ${page === 'story' ? 'current' : ''}`} type="button" onClick={() => navigate('story')}>Our Story</button>
      </>}
      <button className={`account-button ${page === 'history' ? 'current' : ''}`} type="button" onClick={() => navigate('history')}>Dashboard</button>
      {!accountReady && <button className="account-button" type="button" onClick={() => navigate('signup')}>Login / Sign up</button>}
      <button className="search-action" type="button" onClick={() => navigate('restaurants')} aria-label="Search restaurants"><Search aria-hidden="true" size={16} /></button>
      <button className="cart-button" type="button" onClick={() => navigate('order')} aria-label={`Open order, ${cart.length} items`}>
        <span className="cart-icon"><ShoppingBag aria-hidden="true" size={17} /></span>
        <span className="cart-button-label">My Order</span>
        <span className="cart-count">{cart.length}</span>
      </button>
    </nav>
  </header>
}

function MenuPage({ setCart, restaurant }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [items, setItems] = useState(menuItems)
  useEffect(() => {
    let isMounted = true
    if (restaurant) {
      return () => { isMounted = false }
    }
    if (!supabase) return undefined
    supabase.from('menu_items').select('*').order('created_at', { ascending: true }).then(({ data, error }) => {
      if (isMounted && !error && data?.length) {
        const uniqueItems = [...new Map(data.map((item) => [item.name, { ...item, image: item.image_url, serviceNote: item.service_note }])).values()]
        setItems(uniqueItems)
      }
    })
    return () => { isMounted = false }
  }, [restaurant])
    const menuItemsForPage = restaurant ? [...(restaurantMenus[restaurant.slug] || items), ...(restaurantMenuAdditions[restaurant.slug] || []), ...(restaurantMenuFinalAdditions[restaurant.slug] || sharedMenuExpansion)] : items;
  const uniqueItems = [...new Map(menuItemsForPage.map((item) => [item.name.trim().toLowerCase(), item])).values()].map((item) => ({ ...item, ...getMenuImageForItem(item) }))
  const availableCategories = ['All', ...new Set(uniqueItems.map((item) => item.category))]
  const selectedCategory = availableCategories.includes(activeCategory) ? activeCategory : 'All'
  const visibleItems = selectedCategory === 'All' ? uniqueItems : uniqueItems.filter((item) => item.category === selectedCategory)
  return (
    <section className="menu-page page-shell">
      <div className="page-intro">
        <p className="eyebrow">{restaurant ? `${restaurant.name} / Signature menu` : 'Samundri Food Hub / A table worth sharing'}</p>
        <h1>{restaurant ? <>{restaurant.name}<br /><em>signature menu.</em></> : <>Taste Samundri,<br /><em>one plate at a time.</em></>}</h1>
        <p>{restaurant ? `A considered selection of the dishes that make ${restaurant.name} worth returning to.` : 'Discover local favourites, chef-led plates, and sweet finishes made for unhurried evenings.'}</p>
      </div>
      <div className="category-tabs" role="tablist" aria-label="Menu categories">
        {availableCategories.map((category) => {
          const count = category === 'All' ? uniqueItems.length : uniqueItems.filter((item) => item.category === category).length
          return <button key={category} type="button" role="tab" aria-selected={selectedCategory === category} className={selectedCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}><span>{category}</span><span className="category-count" aria-hidden="true">{count}</span></button>
        })}
      </div>
      <div className="menu-grid">
        {visibleItems.map((item) => (
          <article className="menu-card" key={item.id || item.name}>
            <div className="dish-image">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  const fallback = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85'
                  if (event.currentTarget.src !== fallback) {
                    event.currentTarget.src = fallback
                  }
                }}
              />
              {item.imageCredit && <a className="dish-photo-credit" href={item.imageCreditUrl} target="_blank" rel="noreferrer">{item.imageCredit}</a>}
            </div>
            <div className="dish-info">
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <small>{item.serviceNote || (item.category === 'Fish specials' ? 'Fresh catch / 20 min' : item.category === 'Mains' ? 'Serves 1 / 20 min' : item.category === 'Small plates' ? 'To share / 10 min' : item.category === 'Popular favorites' ? 'Ready in / 15 min' : 'Sweet course / 10 min')}</small>
                <strong>Rs. {item.price}</strong>
              </div>
              <button type="button" className="add-button" onClick={() => setCart((currentCart) => [...currentCart, item])} aria-label={`Add ${item.name} to selection`}>+</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function RestaurantCard({ restaurant, onOpenMenu, showLocation = false, showDetails = false, actionLabel = 'Explore menu' }) {
  return <article className="restaurant-card"><div className="restaurant-image"><img src={restaurant.image} alt={`${restaurant.name} dining space`} loading="lazy" decoding="async" /><span className="restaurant-tag">{restaurant.tag}</span><span className="open-pill">{restaurant.status}</span></div><div className="restaurant-card-body"><div><p className="restaurant-cuisine">{restaurant.cuisine}</p><h3>{restaurant.name}</h3>{showDetails ? <div className="restaurant-contact-details"><span>{restaurant.area}</span><span>{restaurant.hours}</span><a href={`tel:${restaurant.phone.replace(/[^\d+]/g, '')}`}>{restaurant.phone}</a><a href={`mailto:${restaurant.email}`}>{restaurant.email}</a></div> : showLocation && <p className="restaurant-meta">{restaurant.area}</p>}</div><div className="restaurant-rating"><strong>{restaurant.rating}</strong><span><Star aria-hidden="true" size={12} fill="currentColor" /></span><small>({restaurant.reviews})</small></div></div><button className="restaurant-link" type="button" onClick={() => onOpenMenu(restaurant)}>{actionLabel} <span><ArrowUpRight aria-hidden="true" size={16} /></span></button></article>
}

function OrderPage({ cart, setCart, restaurant, setHistory, setPage, user }) {
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [orderType, setOrderType] = useState('preorder')
  const confirmationRef = useRef(null)
  const total = cart.reduce((sum, item) => sum + Number(item.price), 0)
  const restaurantName = restaurant?.name || 'Samundri Food House'
  const isOrderConfirmed = status === 'success' || status === 'demo'
  const addMoreItems = () => {
    const nextPage = restaurant ? 'menu' : 'restaurants'
    window.location.hash = restaurant ? `menu/${restaurant.slug}` : 'restaurants'
    setPage(nextPage)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (!isOrderConfirmed) return
    confirmationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    confirmationRef.current?.focus({ preventScroll: true })
  }, [isOrderConfirmed])

  const submitOrder = async (event) => {
    event.preventDefault()
    if (!cart.length) return
    const formData = new FormData(event.currentTarget)
    const customerPhone = (formData.get('customer_phone') || '').toString().trim()
    setErrorMessage('')
    if (!/^\+?[0-9\s\-()]{7,20}$/.test(customerPhone)) { setStatus('phone-required'); return }
    if (orderType === 'preorder' && (!formData.get('scheduled_date') || !formData.get('scheduled_time'))) { setStatus('timing-required'); return }
    if (orderType === 'delivery' && !formData.get('delivery_address')) { setStatus('address-required'); return }
    if (paymentMethod === 'online') { setStatus('payment-unavailable'); return }
    if (paymentMethod === 'bank' && !formData.get('payment_reference')) { setStatus('reference-required'); return }
    const orderRecord = {
      id: Date.now(),
      type: 'order',
      restaurantSlug: restaurant?.slug || 'samundri-food-house',
      restaurantName,
      restaurantImage: restaurant?.image || '',
      date: new Date().toISOString(),
      time: orderType === 'preorder' ? `${formData.get('scheduled_time')}` : 'ASAP',
      customerPhone,
      total,
      status: 'pending',
      items: cart.map((item) => ({ name: item.name, image: item.image, quantity: 1, price: Number(item.price) })),
    }
    if (!supabase) {
      const nextHistory = [orderRecord, ...getStoredHistory()].slice(0, 30)
      window.localStorage.setItem('samundri_activity_history', JSON.stringify(nextHistory))
      setHistory(nextHistory)
      setStatus('demo')
      setCart([])
      event.currentTarget.reset()
      return
    }
    setStatus('saving')
    const scheduledValue = orderType === 'preorder'
      ? new Date(`${formData.get('scheduled_date')}T${formData.get('scheduled_time')}`).toISOString()
      : null
    const orderArguments = {
      customer_name: formData.get('name'),
      customer_email: formData.get('email'),
      customer_phone_value: customerPhone,
      order_total: total,
      items: orderRecord.items.map((item) => ({ item_name: item.name, quantity: item.quantity })),
      order_restaurant_slug: restaurant?.slug || 'samundri-food-house',
      order_type_value: orderType,
      scheduled_at_value: scheduledValue,
      delivery_address_value: formData.get('delivery_address') || null,
      payment_method_value: paymentMethod,
      payment_reference_value: formData.get('payment_reference') || null,
    }
    const legacyOrderArguments = { ...orderArguments }
    delete legacyOrderArguments.customer_phone_value
    let { data: orderId, error } = await supabase.rpc('create_order', orderArguments)
    const missingOrderFunction = error?.code === 'PGRST202' || /could not find the function.*create_order.*schema cache/i.test(error?.message || '')
    if (missingOrderFunction) {
      const legacyOrderResult = await supabase.rpc('create_order', legacyOrderArguments)
      orderId = legacyOrderResult.data
      error = legacyOrderResult.error
    }
    if (error) { setStatus('error'); setErrorMessage(error.message); return }
    orderRecord.id = orderId
    const nextHistory = [orderRecord, ...getStoredHistory()].slice(0, 30)
    window.localStorage.setItem('samundri_activity_history', JSON.stringify(nextHistory))
    setHistory(nextHistory)
    setStatus('success')
    setCart([])
    event.currentTarget.reset()
  }

  return <section className="order-page page-shell">
    <div className="page-intro"><p className="eyebrow">{restaurantName} / Your order</p><h1>A beautiful meal,<br /><em>well arranged.</em></h1><p>Review your selection, choose how you would like to receive it, and leave the rest to {restaurantName}.</p></div>
    {!cart.length && !isOrderConfirmed ? <div className="empty-order order-confirmation"><h2>Your selection is waiting.</h2><p>Explore the menu and choose something made for your table.</p></div> : isOrderConfirmed ? <div className="empty-order order-confirmation" ref={confirmationRef} tabIndex={-1} aria-live="polite"><p className="eyebrow">{status === 'demo' ? 'Order request saved' : 'Order placed'}</p><h2>Thank you.<br /><em>Your order is with the restaurant.</em></h2><p>{status === 'demo' ? 'Your order request is saved on this device. The restaurant will confirm it before preparation.' : `${restaurantName} has received your order request. They will confirm it before preparation begins.`} {supabase && !user && 'Sign in to sync this order to your dashboard across devices.'}</p></div> : <div className="order-layout">
      <div className="order-summary"><p className="eyebrow">{restaurantName} bill</p>{cart.map((item, index) => <div className="order-item" key={`${item.name}-${index}`}><div className="order-item-details"><img src={item.image} alt="" loading="lazy" decoding="async" /><div><strong>{item.name}</strong><span>{item.description}</span></div></div><div className="order-item-actions"><b>Rs. {item.price}</b><button className="remove-order-item" type="button" onClick={() => setCart((currentCart) => currentCart.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove ${item.name} from order`}>Remove</button></div></div>)}<button className="order-add-more" type="button" onClick={addMoreItems}><ArrowUpRight aria-hidden="true" size={15} />Add more from menu</button><div className="order-total"><span>Total</span><strong>Rs. {total}</strong></div><small className="billing-note">Taxes and delivery charges are confirmed by the restaurant before payment.</small></div>
      <form className="order-form" onSubmit={submitOrder}>
        <p className="eyebrow">Customer details</p>
        <div className="order-type-picker"><span className="form-label">How would you like to receive it?</span><div className="order-type-options"><label className={orderType === 'preorder' ? 'selected' : ''}><input type="radio" name="order_type" value="preorder" checked={orderType === 'preorder'} onChange={(event) => setOrderType(event.target.value)} /><span><strong>Pre-order</strong><small>Choose date and timing</small></span></label><label className={orderType === 'delivery' ? 'selected' : ''}><input type="radio" name="order_type" value="delivery" checked={orderType === 'delivery'} onChange={(event) => setOrderType(event.target.value)} /><span><strong>Delivery</strong><small>Restaurant handles delivery</small></span></label></div></div>
        {orderType === 'preorder' && <div className="form-row"><label>Date<input name="scheduled_date" required type="date" /></label><label>Timing<input name="scheduled_time" required type="time" /></label></div>}
        {orderType === 'delivery' && <label>Delivery address<textarea name="delivery_address" required rows="2" placeholder="Enter your delivery address" /></label>}
        <label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@example.com" /></label>
        <label>Contact number<input name="customer_phone" required type="tel" placeholder="+92 300 1234567" /></label>
        <label>Payment method<select name="payment_method" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}><option value="cash">Cash on delivery</option><option value="bank">Bank transfer</option><option value="online">Online card payment (coming soon)</option></select></label>
        {paymentMethod === 'bank' && <label>Transfer reference<input name="payment_reference" required placeholder="Enter bank transfer reference" /></label>}
        <small className="payment-note">Cash orders are accepted now. Bank transfers remain pending until the restaurant verifies the reference. Online card payments will be enabled after a payment gateway is connected.</small>
        <button className="primary-button" type="submit" disabled={status === 'saving' || status === 'payment-unavailable'}>{status === 'saving' ? 'Sending...' : 'Confirm order'} <span>-&gt;</span></button>
        {status === 'demo' && <small className="form-success">{orderType === 'preorder' ? 'Pre-order request created with your selected timing.' : 'Delivery request created for restaurant confirmation.'} Payment status: {paymentMethod === 'bank' ? 'verification pending' : 'cash on delivery'}.</small>}
        {status === 'timing-required' && <small className="form-error">Please choose the pre-order date and timing.</small>}{status === 'address-required' && <small className="form-error">Please enter your delivery address.</small>}{status === 'phone-required' && <small className="form-error">Please enter a valid contact number so the restaurant can reach you.</small>}{status === 'payment-unavailable' && <small className="form-error">Online card payment is not connected yet. Choose Cash on delivery or Bank transfer.</small>}{status === 'reference-required' && <small className="form-error">Enter the bank transfer reference before submitting.</small>}{status === 'error' && <small className="form-error">{errorMessage || 'We could not place your order. Please try again.'}</small>}
      </form>
    </div>}
  </section>
}

function HomePage({ onExploreRestaurants }) {
  const [query, setQuery] = useState('')
  const [accountNotice] = useState(() => window.sessionStorage.getItem('samundri_account_notice') || '')
  useEffect(() => {
    const notice = window.sessionStorage.getItem('samundri_account_notice')
    if (!notice) return
    window.sessionStorage.removeItem('samundri_account_notice')
  }, [])
  /*
  return <>{accountNotice && <p className="account-welcome" role="status">{accountNotice}</p>}<section className="hero-section"><div className="hero-copy"><p className="eyebrow">Samundri Food Hub / Discover locally</p><h1>Find your<br /><em>favorite restaurants.</em></h1><p className="hero-intro">The best of Samundri, brought together. Discover restaurants, browse menus, reserve a table, and make every meal count.</p><div className="hero-search"><span>âŒ•</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search restaurants, dishes or cuisines" aria-label="Search restaurants" /><button type="button" onClick={() => document.querySelector('.restaurant-discovery')?.scrollIntoView({ behavior: 'smooth' })}>Search</button></div><div className="hero-actions"><button className="primary-button" type="button" onClick={() => document.querySelector('.restaurant-discovery')?.scrollIntoView({ behavior: 'smooth' })}>Explore restaurants <span>â†—</span></button><button className="ghost-button" type="button" onClick={() => goTo('events')}>Plan an event <span>â†—</span></button></div></div><div className="hero-image" role="img" aria-label="A beautifully plated meal at a Samundri restaurant"><div className="hero-floating-card"><span className="floating-kicker">Featured tonight</span><strong>Food Street 533</strong><small><b>4.8 â˜…</b> Â· Popular in Samundri</small></div></div></section><section className="trust-strip"><span><b>01</b> Local favourites</span><span><b>02</b> Curated menus</span><span><b>03</b> Easy reservations</span><span><b>04</b> One food community</span></section><section className="restaurant-discovery"><div className="section-heading"><div><p className="eyebrow">Eat around Samundri</p><h2>Good places,<br /><em>close to home.</em></h2></div><p className="heading-note">Explore the restaurants locals keep coming back to, all in one place.</p></div><div className="discovery-toolbar"><div className="mini-filters"><button className={filterMode === 'all' ? 'active' : ''} type="button" onClick={() => setFilterMode('all')}>All restaurants</button><button className={filterMode === 'open' ? 'active' : ''} type="button" onClick={() => setFilterMode('open')}>Open now</button><button className={filterMode === 'top' ? 'active' : ''} type="button" onClick={() => setFilterMode('top')}>Top rated</button></div><span>{filteredRestaurants.length} places</span></div><div className="restaurant-grid">{filteredRestaurants.length ? filteredRestaurants.map((restaurant) => <RestaurantCard key={restaurant.name} restaurant={restaurant} onOpenMenu={onOpenRestaurant} />) : <div className="no-results"><strong>No places found.</strong><span>Try another search or filter.</span></div>}</div></section><section className="home-teaser"><div><p className="eyebrow">The Samundri table</p><h2>Come hungry,<br /><em>leave glowing.</em></h2></div><button className="text-link" type="button" onClick={() => goTo('reserve')}>Reserve a table <span>â†—</span></button></section><section className="story-section"><div className="story-image" role="img" aria-label="A chef plating a fresh dish in the Samundri Food Hub kitchen" /><div className="story-copy"><p className="eyebrow">Our local food story</p><h2>Made with care,<br /><em>shared with soul.</em></h2><p>Samundri Food Hub makes it easier to discover the flavors, people, and places that make our town worth gathering in.</p><button className="text-link story-cta" type="button" onClick={() => goTo('story')}>Our story <span>â†—</span></button></div></section></>
*/

  const revealDiscovery = () => {
    const searchQuery = query.trim()
    setQuery('')
    onExploreRestaurants(searchQuery)
  }

  return (
    <>
      {accountNotice && <p className="account-welcome" role="status">{accountNotice}</p>}
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">BITEX / DISCOVER LOCAL RESTAURANTS</p>
          <h1>Find your<br /><em>next favourite.</em></h1>
          <p className="hero-intro">Discover local restaurants and the dishes worth coming back for.</p>
          <div className="hero-search">
            <span className="search-icon"><Search aria-hidden="true" size={18} /></span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search restaurants, cuisines or locations..." aria-label="Search restaurants" />
            <button type="button" onClick={revealDiscovery}>Search</button>
          </div>
          <ul className="hero-features">
            <li><span className="feature-icon"><ShoppingBag aria-hidden="true" size={17} /></span><span>Top Rated Restaurants</span></li>
            <li><span className="feature-icon"><CalendarDays aria-hidden="true" size={17} /></span><span>Safe &amp; Easy Booking</span></li>
            <li><span className="feature-icon"><Star aria-hidden="true" size={17} /></span><span>Multiple Payment Options</span></li>
          </ul>
          <button className="primary-button" type="button" onClick={revealDiscovery}>Explore Restaurants <span><ArrowUpRight aria-hidden="true" size={18} /></span></button>
        </div>
        <div className="hero-image" role="img" aria-label="A beautifully plated meal at a Samundri restaurant">
          <div className="featured-badge">Real Flavours<br />Local Restaurants</div>
        </div>
      </section>
      <section className="home-trust-strip">
        <div className="trust-item"><span className="trust-icon"><ShoppingBag aria-hidden="true" size={22} /></span><div><strong>Local Favourites</strong><small>Discover the best spots near you.</small></div></div>
        <div className="trust-item"><span className="trust-icon"><MapPin aria-hidden="true" size={22} /></span><div><strong>Curated Menus</strong><small>Explore real dishes and reviews.</small></div></div>
        <div className="trust-item"><span className="trust-icon"><Star aria-hidden="true" size={22} /></span><div><strong>Easy Reservations</strong><small>Book your table in just a few taps.</small></div></div>
        <div className="trust-item"><span className="trust-icon"><Heart aria-hidden="true" size={22} /></span><div><strong>Support Local</strong><small>Eat local. Support local.</small></div></div>
      </section>
    </>
  )
 }

function RestaurantsPage({ initialQuery, onOpenRestaurant, onOpenRestaurantDetails, showDetails = false }) {
  const [query, setQuery] = useState('')
  const [activeQuery, setActiveQuery] = useState(initialQuery)
  const [filterMode, setFilterMode] = useState('all')
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = `${restaurant.name} ${restaurant.cuisine} ${restaurant.area}`.toLowerCase().includes(activeQuery.toLowerCase())
    const matchesFilter = filterMode === 'open' ? restaurant.status === 'Open now' : filterMode === 'top' ? Number(restaurant.rating) >= 4.7 : true
    return matchesSearch && matchesFilter
  })

  return (
    <section className={`restaurants-page page-shell${showDetails ? ' restaurant-details-page' : ''}`}>
      {!showDetails && <section className="restaurant-name-directory" aria-labelledby="restaurant-directory-title">
        <div>
          <p className="eyebrow">Complete directory</p>
          <h2 id="restaurant-directory-title">{filteredRestaurants.length} places<br /><em>worth knowing.</em></h2>
        </div>
        <ol>
          {filteredRestaurants.map((restaurant) => (
            <li key={restaurant.slug}>
              <button type="button" aria-label={`Open ${restaurant.name} details`} onClick={() => onOpenRestaurantDetails(restaurant)}>
                <img className="restaurant-directory-image" src={restaurant.image} alt="" loading="lazy" decoding="async" />
                <span>{restaurant.name}</span>
              </button>
            </li>
          ))}
        </ol>
      </section>}
      {showDetails && <section className="restaurant-discovery">
        <div className="discovery-toolbar">
          <label className="restaurant-page-search">
            <span aria-hidden="true"><Search size={18} /></span>
            <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setActiveQuery(event.target.value) }} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); setActiveQuery(query.trim()); setQuery('') } }} placeholder="Search name, cuisine or area" aria-label="Search restaurants by name, cuisine or area" />
          </label>
          <div className="mini-filters" aria-label="Filter restaurants">
            {[['all', 'all restaurants'], ['open', 'open now'], ['top', 'top rated']].map(([mode, label]) => (
              <button key={mode} className={filterMode === mode ? 'active' : ''} type="button" aria-pressed={filterMode === mode} onClick={() => { setFilterMode(mode); if (mode === 'all') { setQuery(''); setActiveQuery('') } }}>{label}</button>
            ))}
          </div>
          <span aria-live="polite">{filteredRestaurants.length} places</span>
        </div>
        <div className="restaurant-grid">
          {filteredRestaurants.length ? filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.name} restaurant={restaurant} onOpenMenu={onOpenRestaurant} showDetails={showDetails} />
          )) : <div className="no-results"><strong>No restaurants found.</strong><span>Try another dish, area or cuisine.</span></div>}
        </div>
      </section>}
    </section>
  )
}

function StoryPage({ restaurant }) {
  const restaurantName = restaurant?.name || 'Samundri Food House'
  const storyImage = restaurantPageImages[restaurant?.slug]?.story || restaurant?.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=90'
  const story = restaurant ? restaurantStories[restaurant.slug] : {
    kicker: 'A shared table, many stories',
    headline: 'Local kitchens,',
    emphasis: 'one Samundri.',
    intro: 'Samundri Food Hub brings the town\'s independent food places into one easy-to-explore table, connecting familiar favourites with the people who make them.',
    quote: 'Every good neighbourhood has a place, a plate, and a story worth passing around.',
    values: [['01', 'Local by nature', 'A guide to the food places that give Samundri its character.'], ['02', 'Many ways to gather', 'From quick bites to long dinners, find a table for the moment.'], ['03', 'Stories worth sharing', 'Meet the neighbourhood through its kitchens and menus.']],
  }
  return <section className="story-page page-shell" style={{ '--story-background-image': `url('${storyImage}')` }}><div className="page-intro"><p className="eyebrow">{story.kicker}</p><h1>{restaurant ? <>{story.headline}<br /><em>{story.emphasis}</em></> : <>{restaurantName}<br /><em>our shared table.</em></>}</h1><p>{story.intro}</p></div><div className="story-premium-showcase"><div className="story-showcase-image" role="img" aria-label={`A dining space that reflects ${restaurantName}`} style={{ backgroundImage: `linear-gradient(180deg, rgba(13, 10, 9, 0.08), rgba(13, 10, 9, 0.42)), url('${storyImage}')` }} /><div className="story-showcase-copy"><p className="eyebrow">{story.kicker}</p><h2>{story.headline}<br /><em>{story.emphasis}</em></h2><p>{story.intro}</p><div className="story-quote">&quot;{story.quote}&quot;</div></div></div><div className="values-grid">{story.values.map(([number, title, description]) => <div key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></div>)}</div></section>
}

function ReservationPage({ restaurant, setHistory, user }) {
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [reservationDraft] = useState(() => {
    try { return JSON.parse(window.sessionStorage.getItem('samundri_reservation_draft') || 'null') } catch { return null }
  })
  const [selectedTable, setSelectedTable] = useState(() => reservationDraft?.tableNumber ? String(reservationDraft.tableNumber) : '')
  const [selectedDate, setSelectedDate] = useState(() => reservationDraft?.date ? reservationDraft.date.slice(0, 10) : '')
  const [reservedTables, setReservedTables] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem('samundri_reserved_tables') || '[]') } catch { return [] }
  })

  const restaurantName = restaurant?.name || 'Samundri Food House'
  const [minReservationDate] = useState(() => {
    const currentDate = new Date()
    return new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
  })
  const reservationImage = restaurantPageImages[restaurant?.slug]?.reservation || restaurant?.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=90'
  const tableKey = `${restaurant?.slug || 'samundri-food-house'}:${selectedDate}:${selectedTable}`
  const isTableReserved = Boolean(selectedDate && selectedTable && reservedTables.includes(tableKey))
  const isEditingCurrent = Boolean(reservationDraft?.id && reservationDraft.restaurantSlug === (restaurant?.slug || 'samundri-food-house'))

  const rememberReservation = () => {
    setReservedTables((current) => {
      const next = [...new Set([...current, tableKey])]
      window.localStorage.setItem('samundri_reserved_tables', JSON.stringify(next))
      return next
    })
  }

  const saveReservationHistory = (reservationRecord) => {
    const currentHistory = getStoredHistory()
    const nextHistory = reservationRecord.editingId
      ? currentHistory.map((entry) => entry.id === reservationRecord.editingId ? { ...reservationRecord, id: entry.id } : entry)
      : [reservationRecord, ...currentHistory].slice(0, 30)
    window.localStorage.setItem('samundri_activity_history', JSON.stringify(nextHistory))
    setHistory(nextHistory)
  }

  const submitReservation = async (event) => {
    event.preventDefault()
    if (!selectedTable) { setStatus('table-required'); return }
    if (!selectedDate) { setStatus('date-required'); return }
    if (!supabase && isTableReserved && !isEditingCurrent) { setStatus('pending'); return }

    const formData = new FormData(event.currentTarget)
    const customerPhone = (formData.get('customer_phone') || '').toString().trim()
    if (!/^\+?[0-9\s\-()]{7,20}$/.test(customerPhone)) { setStatus('phone-required'); return }

    const reservationRecord = {
      id: Date.now(),
      type: 'reservation',
      restaurantSlug: restaurant?.slug || 'samundri-food-house',
      restaurantName,
      restaurantImage: restaurant?.image || '',
      date: `${selectedDate}T12:00:00.000Z`,
      time: formData.get('time') || 'Any time',
      customerPhone,
      name: formData.get('name'),
      email: formData.get('email'),
      tableNumber: Number(selectedTable),
      guests: Number(formData.get('guests') || 2),
      status: 'confirmed',
      editingId: reservationDraft?.id || null,
    }

    if (!supabase) {
      rememberReservation()
      saveReservationHistory(reservationRecord)
      window.sessionStorage.removeItem('samundri_reservation_draft')
      setStatus('success')
      event.currentTarget.reset()
      return
    }

    setStatus('saving')
    const reservationResult = await supabase.rpc('create_reservation', {
      p_name: formData.get('name'),
      p_email: formData.get('email'),
      p_customer_phone: customerPhone,
      p_restaurant_slug: restaurant?.slug || 'samundri-food-house',
      p_table_number: Number(selectedTable),
      p_reservation_date: selectedDate,
      p_guests: Number(formData.get('guests')),
    })
    let reservationId = reservationResult.data
    let error = reservationResult.error

    const missingReservationFunction = error?.code === 'PGRST202' || /could not find the function.*create_reservation.*schema cache/i.test(error?.message || '')
    if (missingReservationFunction) {
      const { data: tableAvailable, error: availabilityError } = await supabase.rpc('is_table_available', {
        p_restaurant_slug: restaurant?.slug || 'samundri-food-house',
        p_table_number: Number(selectedTable),
        p_reservation_date: selectedDate,
      })

      if (availabilityError) {
        setStatus('error')
        setErrorMessage('Supabase setup is incomplete. Run supabase/secure-reservation-bookings.sql in the SQL Editor, then reload the schema cache.')
        return
      }
      if (!tableAvailable) { setStatus('pending'); return }

      const reservationPayload = {
        name: formData.get('name'),
        email: formData.get('email'),
        customer_phone: customerPhone,
        customer_id: user?.id || null,
        restaurant_slug: restaurant?.slug || 'samundri-food-house',
        table_number: Number(selectedTable),
        reservation_date: selectedDate,
        guests: Number(formData.get('guests')),
        status: 'confirmed',
      }
      let { error: insertError } = await supabase.from('reservations').insert(reservationPayload)
      if (insertError && /customer_phone|customer_id|column .*customer_(phone|id)/i.test(insertError.message)) {
        const legacyReservationPayload = { ...reservationPayload }
        if (/customer_phone|column .*customer_phone/i.test(insertError.message)) delete legacyReservationPayload.customer_phone
        if (/customer_id|column .*customer_id/i.test(insertError.message)) delete legacyReservationPayload.customer_id
        const { error: legacyInsertError } = await supabase.from('reservations').insert(legacyReservationPayload)
        insertError = legacyInsertError
      }
      if (insertError) {
        setStatus('error')
        setErrorMessage(insertError.message)
        return
      }
      reservationId = Date.now()
      error = null
    }

    if (error) {
      setStatus('error')
      setErrorMessage(missingReservationFunction
        ? 'Supabase setup is incomplete. Run supabase/secure-reservation-bookings.sql in the SQL Editor, then reload the schema cache.'
        : error.message)
      return
    }
    if (!reservationId) { setStatus('pending'); return }

    reservationRecord.id = reservationId
    setStatus('success')
    saveReservationHistory(reservationRecord)
    window.sessionStorage.removeItem('samundri_reservation_draft')
    event.currentTarget.reset()
  }

  return (
    <section className="reserve-page page-shell">
      <div className="page-intro">
        <p className="eyebrow">{restaurantName} / Table booking</p>
        <h1>There is always<br /><em>a seat for you.</em></h1>
        <p>Choose one of {restaurantName}&apos;s five tables and request your reservation.</p>
      </div>
      <div className="reservation-layout">
        <div className="reservation-image" role="img" aria-label={`${restaurantName} dining room`} style={{ backgroundImage: `linear-gradient(180deg, rgba(13, 10, 9, 0.08), rgba(13, 10, 9, 0.32)), url('${reservationImage}')` }} />
        <form className="reservation-form" onSubmit={submitReservation}>
          <p className="eyebrow">Reserve at {restaurantName}</p>
          <div className="table-picker">
            <span className="form-label">Choose a table</span>
            <div className="table-grid">
              {[1, 2, 3, 4, 5].map((table) => (
                <button
                  key={table}
                  type="button"
                  className={selectedTable === String(table) ? 'selected' : ''}
                  onClick={() => setSelectedTable(String(table))}
                >
                  <strong>Table {table}</strong>
                  <small>{table === 5 ? 'Window' : table === 1 ? 'Chef view' : 'Available'}</small>
                </button>
              ))}
            </div>
          </div>

          <label>Name<input name="name" required type="text" defaultValue={reservationDraft?.name || ''} placeholder="Your name" /></label>
          <label>Email<input name="email" required type="email" defaultValue={reservationDraft?.email || ''} placeholder="you@example.com" /></label>
          <label>Contact number<input name="customer_phone" required type="tel" defaultValue={reservationDraft?.customerPhone || ''} placeholder="+92 300 1234567" /></label>

          <div className="form-row">
            <label>Date<input name="date" required type="date" min={minReservationDate} value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} /></label>
            <label>Time<input name="time" type="time" /></label>
            <label>Guests<select name="guests" defaultValue="2"><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5+ guests</option></select></label>
          </div>

          <button className="primary-button" type="submit" disabled={status === 'saving'}>
            {status === 'saving' ? 'Checking...' : 'Book this table'} <span>-&gt;</span>
          </button>

          {status === 'success' && <small className="form-success">Confirmed: Table {selectedTable} is booked at {restaurantName}.{supabase && !user && ' Sign in to sync this booking to your dashboard across devices.'}</small>}
          {status === 'pending' && <small className="form-error">Status: pending. Table {selectedTable} is already reserved for this date and is not free.</small>}
          {status === 'table-required' && <small className="form-error">Please choose one of the five tables first.</small>}
          {status === 'date-required' && <small className="form-error">Please choose a reservation date first.</small>}
          {status === 'phone-required' && <small className="form-error">Please enter a valid contact number so the restaurant can reach you.</small>}
          {status === 'error' && <small className="form-error">{errorMessage || 'We could not save that request. Please try again.'}</small>}
          {status === 'idle' && <small>Selected table: {selectedTable || 'none'} · We will check availability.</small>}
        </form>
      </div>
    </section>
  )
}

function EventsPage({ restaurant, setHistory, user }) {
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [eventDraft] = useState(() => {
    try { return JSON.parse(window.sessionStorage.getItem('samundri_event_draft') || 'null') } catch { return null }
  })
  const restaurantName = restaurant?.name || 'Samundri Food House'
  const eventImage = restaurantPageImages[restaurant?.slug]?.event || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=90'
  useEffect(() => {
    const imagePanel = document.querySelector('.event-image')
    if (imagePanel) imagePanel.style.backgroundImage = `url('${eventImage}')`
    if (eventDraft) {
      const form = document.querySelector('.event-enquiry-form')
      if (form) {
        form.elements.customer_name.value = eventDraft.name || ''
        form.elements.customer_email.value = eventDraft.email || ''
        form.elements.event_type.value = eventDraft.eventType || ''
        form.elements.event_date.value = eventDraft.date?.slice(0, 10) || ''
        form.elements.guest_count.value = eventDraft.guests || ''
        form.elements.requirements.value = eventDraft.requirements || ''
      }
    }
  }, [eventDraft, eventImage])
  const submitEvent = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setErrorMessage('')
    setStatus('saving')
    const eventRecord = {
      id: Date.now(),
      type: 'event',
      restaurantSlug: restaurant?.slug || 'samundri-food-house',
      restaurantName,
      date: `${formData.get('event_date')}T12:00:00.000Z`,
      eventType: formData.get('event_type'),
      name: formData.get('customer_name'),
      email: formData.get('customer_email'),
      guests: Number(formData.get('guest_count')),
      requirements: formData.get('requirements'),
      status: 'enquiry_sent',
      editingId: eventDraft?.id || null,
    }
    const saveEventHistory = () => {
      const currentHistory = getStoredHistory()
      const nextHistory = eventRecord.editingId
        ? currentHistory.map((entry) => entry.id === eventRecord.editingId ? { ...eventRecord, id: entry.id } : entry)
        : [eventRecord, ...currentHistory].slice(0, 30)
      window.localStorage.setItem('samundri_activity_history', JSON.stringify(nextHistory))
      setHistory(nextHistory)
    }
    if (!supabase) { saveEventHistory(); window.sessionStorage.removeItem('samundri_event_draft'); setStatus('enquiry_sent'); form.reset(); return }
    const eventPayload = { restaurant_slug: restaurant?.slug || 'samundri-food-house', customer_id: user?.id || null, customer_name: formData.get('customer_name'), customer_email: formData.get('customer_email'), event_type: formData.get('event_type'), event_date: formData.get('event_date'), guest_count: Number(formData.get('guest_count')), requirements: formData.get('requirements'), status: 'enquiry_sent' }
    const eventInsert = supabase.from('event_bookings').insert(eventPayload)
    const { data: savedEvent, error } = user?.id ? await eventInsert.select('id').single() : await eventInsert
    if (error) { setStatus('error'); setErrorMessage(error.message); return }
    if (savedEvent?.id) eventRecord.id = savedEvent.id
    saveEventHistory()
    window.sessionStorage.removeItem('samundri_event_draft')
    setStatus('enquiry_sent')
    form.reset()
  }
  return <section className="events-page page-shell"><div className="page-intro"><p className="eyebrow">{restaurantName} / Private events</p><h1>Made for<br /><em>good company.</em></h1><p>Send an event enquiry to {restaurantName}. The restaurant will review your details and reply with a quote.</p></div><div className="event-feature"><div className="event-image" role="img" aria-label={`A long table prepared at ${restaurantName}`} /><div className="event-copy"><p className="eyebrow">Private dining enquiry</p><h2>Your table,<br /><em>your evening.</em></h2><p>Groups of 8 to 28 guests can request a tailored menu, thoughtful drinks, and private attention.</p><form className="event-enquiry-form" onSubmit={submitEvent}><label>Name<input name="customer_name" required placeholder="Your name" /></label><label>Email<input name="customer_email" required type="email" placeholder="you@example.com" /></label><label>Event type<select name="event_type" required defaultValue=""><option value="" disabled>Select event type</option><option>Birthday</option><option>Family gathering</option><option>Work dinner</option><option>Engagement</option><option>Other</option></select></label><div className="form-row"><label>Date<input name="event_date" required type="date" /></label><label>Guests<input name="guest_count" required min="8" max="28" type="number" placeholder="8-28" /></label></div><label>Requirements<textarea name="requirements" required rows="3" placeholder="Tell the restaurant about your event, menu or seating needs." /></label><button className="primary-button" type="submit" disabled={status === 'saving'}>{status === 'saving' ? 'Sending...' : 'Send enquiry'} <span>-&gt;</span></button>{status === 'enquiry_sent' && <small className="form-success">Status: enquiry_sent. {restaurantName} will reply with a quote.</small>}{status === 'error' && <small className="form-error">We could not save the enquiry. {errorMessage}</small>}</form></div></div><div className="event-options"><div><span>01</span><h3>Celebrations</h3><p>Birthdays, anniversaries, and the moments worth gathering for.</p></div><div><span>02</span><h3>Work dinners</h3><p>A relaxed setting for ideas, introductions, and a meal people remember.</p></div><div><span>03</span><h3>Full buyout</h3><p>Make the whole room yours for an evening of generous hospitality.</p></div></div></section>
}

function ContactPage({ restaurant, setPage }) {
  const restaurantName = restaurant?.name || 'Samundri Food House'
  const navigate = (nextPage) => { window.location.hash = restaurant ? `${nextPage}/${restaurant.slug}` : nextPage; setPage(nextPage); window.scrollTo(0, 0) }
  return <section className="contact-page page-shell"><div className="page-intro"><p className="eyebrow">Contact {restaurantName}</p><h1>Come by<br /><em>for a good meal.</em></h1><p>{restaurantName} is ready to welcome you with a warm table and memorable flavours.</p></div><div className="contact-layout"><div className="contact-map" role="img" aria-label={`Illustrated map showing ${restaurantName}`} /><div className="contact-details"><div><p className="eyebrow">Address</p><h3>{restaurantName}<br />{restaurant?.area || 'Samundri, Pakistan'}</h3><a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurantName}, ${restaurant?.area || 'Samundri, Pakistan'}`)}`} target="_blank" rel="noreferrer">Get directions <span>-&gt;</span></a></div><div><p className="eyebrow">Opening hours</p><p>{restaurant?.hours || 'Tuesday - Sunday / 5 - 10pm'}<br />Monday / Closed</p></div><div><p className="eyebrow">Contact</p><p>{restaurant?.phone || defaultHubPhone}</p><p>{restaurant?.email || 'hello@samundrifoodhouse.pk'}</p><a className="whatsapp-link" href={`https://wa.me/${whatsappNumber(restaurant?.phone || defaultHubPhone)}?text=${encodeURIComponent(`Hello ${restaurant?.name || 'Samundri Food House'}, I would like to ask about a table or order.`)}`} target="_blank" rel="noreferrer">WhatsApp us <span><ArrowUpRight aria-hidden="true" size={14} /></span></a><button className="footer-cta" type="button" onClick={() => navigate('reserve')}>Book a table <span>-&gt;</span></button></div></div></div></section>
}

function AdminPage() {
  const [session, setSession] = useState(null)
  const [adminCheck, setAdminCheck] = useState(null)
  const [reservations, setReservations] = useState([])
  const [events, setEvents] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => { if (!supabase) return undefined; supabase.auth.getSession().then(({ data }) => setSession(data.session)); const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession)); return () => listener.subscription.unsubscribe() }, [])
  useEffect(() => {
    if (!supabase || !session) return
    supabase.from('admin_users').select('user_id').eq('user_id', session.user.id).maybeSingle().then(({ data, error }) => {
      if (error) setMessage(error.message)
      setAdminCheck({ userId: session.user.id, isAdmin: Boolean(data) })
    })
  }, [session])
  const isAdmin = adminCheck?.userId === session?.user.id && adminCheck.isAdmin
  useEffect(() => { if (!supabase || !isAdmin) return; supabase.from('reservations').select('*').order('created_at', { ascending: false }).then(({ data, error }) => { if (error) setMessage(error.message); else setReservations(data || []) }) }, [isAdmin])
  useEffect(() => { if (!supabase || !isAdmin) return; supabase.from('event_bookings').select('*').order('created_at', { ascending: false }).then(({ data, error }) => { if (error) setMessage(error.message); else setEvents(data || []) }) }, [isAdmin])
  const signIn = async (event) => { event.preventDefault(); const { error } = await supabase.auth.signInWithPassword({ email, password }); setMessage(error ? error.message : '') }
  const updateStatus = async (id, status) => { const { error } = await supabase.from('reservations').update({ status }).eq('id', id); if (error) setMessage(error.message); else setReservations((current) => current.map((item) => item.id === id ? { ...item, status } : item)) }
  const removeReservation = async (id) => { if (!window.confirm('Delete this reservation?')) return; const { error } = await supabase.from('reservations').delete().eq('id', id); if (error) setMessage(error.message); else setReservations((current) => current.filter((item) => item.id !== id)) }
  const updateEvent = async (id, updates) => { const { error } = await supabase.from('event_bookings').update(updates).eq('id', id); if (error) setMessage(error.message); else setEvents((current) => current.map((item) => item.id === id ? { ...item, ...updates } : item)) }
  if (!supabase) return <section className="admin-page page-shell"><div className="page-intro"><p className="eyebrow">Staff area</p><h1>Supabase is<br /><em>not configured.</em></h1><p>Add Supabase credentials to use the reservation dashboard.</p></div></section>
  if (!session) return <section className="admin-page page-shell"><div className="admin-login"><p className="eyebrow">White Castle staff</p><h1>Manage<br /><em>reservations.</em></h1><form onSubmit={signIn}><label>Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label><button className="primary-button" type="submit">Sign in <span>-&gt;</span></button>{message && <small className="form-error">{message}</small>}</form></div></section>
  if (!isAdmin) return <section className="admin-page page-shell"><div className="page-intro"><p className="eyebrow">Staff area</p><h1>Admin access<br /><em>required.</em></h1><p>This account is not on the admin access list.</p><button className="text-link" type="button" onClick={() => supabase.auth.signOut()}>Sign out <span>-&gt;</span></button></div></section>
  return <section className="admin-page page-shell"><div className="admin-heading"><div><p className="eyebrow">Staff area</p><h1>Reservation<br /><em>book.</em></h1></div><button className="text-link" type="button" onClick={() => supabase.auth.signOut()}>Sign out <span>-&gt;</span></button></div>{message && <p className="form-error">{message}</p>}<div className="reservation-list">{reservations.length === 0 && <p>No reservations found.</p>}{reservations.map((item) => <article className="reservation-row" key={item.id}><div><strong>{item.name}</strong><span>{item.email}</span></div><div><strong>{item.reservation_date}</strong><span>{item.guests} guests</span></div><select value={item.status} onChange={(event) => updateStatus(item.id, event.target.value)}><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option></select><button className="delete-button" type="button" onClick={() => removeReservation(item.id)}>Delete</button></article>)}</div><div className="staff-events"><div className="admin-heading"><div><p className="eyebrow">Private dining</p><h2>Event enquiries</h2></div><span className="status-badge">{events.length} total</span></div>{events.length === 0 && <p>No event enquiries found.</p>}{events.map((item) => <article className="event-admin-row" key={item.id}><div><strong>{item.event_type}</strong><span>{item.customer_name} Â· {item.customer_email}</span><span>{item.event_date} Â· {item.guest_count} guests Â· {item.restaurant_slug}</span><small>{item.requirements}</small></div><div className="event-admin-actions"><label>Quote<input type="number" min="0" defaultValue={item.quote_amount || ''} onBlur={(event) => updateEvent(item.id, { quote_amount: event.target.value ? Number(event.target.value) : null, status: event.target.value ? 'quoted' : item.status })} placeholder="Rs." /></label><select value={item.status} onChange={(event) => updateEvent(item.id, { status: event.target.value })}><option value="enquiry_sent">Enquiry sent</option><option value="quoted">Quoted</option><option value="accepted">Accepted</option><option value="rejected_by_restaurant">Rejected</option><option value="expired">Expired</option></select></div></article>)}</div></section>
}

function AdminOrdersPanel() {
  const [session, setSession] = useState(null)
  const [adminCheck, setAdminCheck] = useState(null)
  const [orders, setOrders] = useState([])
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (!supabase) return undefined
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])
  useEffect(() => {
    if (!supabase || !session) return
    supabase.from('admin_users').select('user_id').eq('user_id', session.user.id).maybeSingle().then(({ data }) => setAdminCheck({ userId: session.user.id, isAdmin: Boolean(data) }))
  }, [session])
  const isAdmin = adminCheck?.userId === session?.user.id && adminCheck.isAdmin
  useEffect(() => {
    if (!supabase || !isAdmin) return
    supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false }).then(({ data, error }) => {
      if (error) setMessage(error.message)
      else setOrders(data || [])
    })
  }, [isAdmin])
  const updateOrder = async (id, status) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', id)
    if (error) setMessage(error.message)
    else setOrders((current) => current.map((order) => order.id === id ? { ...order, status } : order))
  }
  if (!session || !isAdmin) return null
  return <section className="admin-orders page-shell">
    <div className="admin-heading"><div><p className="eyebrow">Staff area / Orders</p><h2>Order<br /><em>dashboard.</em></h2></div><span className="status-badge">{orders.length} orders</span></div>
    {message && <p className="form-error">{message}</p>}
    <div className="admin-order-list">{orders.length ? orders.map((order) => <article className="admin-order-row" key={order.id}>
      <div><strong>Order #{order.id}</strong><span>{order.customer_name} / {order.customer_email}</span><span>{order.customer_phone || 'No phone'} / {order.restaurant_slug}</span></div>
      <div><strong>Rs. {Number(order.total).toLocaleString()}</strong><span>{new Date(order.created_at).toLocaleString()}</span><span>{order.order_type === 'delivery' ? order.delivery_address : order.scheduled_at ? new Date(order.scheduled_at).toLocaleString() : 'ASAP'}</span></div>
      <div className="admin-order-items">{(order.order_items || []).map((item) => <span key={item.id}>{item.quantity} x {item.item_name}</span>)}</div>
      <select aria-label={`Order ${order.id} status`} value={order.status} onChange={(event) => updateOrder(order.id, event.target.value)}><option value="pending">Pending</option><option value="accepted">Accepted</option><option value="preparing">Preparing</option><option value="ready">Ready</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select>
    </article>) : <div className="no-results"><strong>No orders yet.</strong></div>}</div>
  </section>
}

function RestaurantOwnerDashboard() {
  const [session, setSession] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [assignmentUserId, setAssignmentUserId] = useState(null)
  const [selectedSlug, setSelectedSlug] = useState('')
  const [orders, setOrders] = useState([])
  const [reservations, setReservations] = useState([])
  const [events, setEvents] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loadedSlug, setLoadedSlug] = useState('')
  useEffect(() => {
    if (!supabase) return undefined
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])
  useEffect(() => {
    if (!supabase || !session) return
    let isMounted = true
    supabase.from('restaurant_owners').select('restaurant_slug').eq('user_id', session.user.id).then(({ data, error }) => {
      if (!isMounted) return
      if (error) setMessage(error.message)
      else {
        setAssignments(data || [])
        setMessage('')
      }
      setAssignmentUserId(session.user.id)
    })
    return () => { isMounted = false }
  }, [session])
  const visibleAssignments = assignmentUserId === session?.user.id ? assignments : []
  const assignmentsLoading = Boolean(session && assignmentUserId !== session.user.id)
  const activeSlug = selectedSlug || visibleAssignments[0]?.restaurant_slug || ''
  const activeRestaurant = restaurants.find((place) => place.slug === activeSlug)
  const isLoading = Boolean(activeSlug && loadedSlug !== activeSlug)
  useEffect(() => {
    if (!supabase || !session || !activeSlug) return
    let isMounted = true
    Promise.all([
      supabase.from('orders').select('*, order_items(*)').eq('restaurant_slug', activeSlug).order('created_at', { ascending: false }),
      supabase.from('reservations').select('*').eq('restaurant_slug', activeSlug).order('created_at', { ascending: false }),
      supabase.from('event_bookings').select('*').eq('restaurant_slug', activeSlug).order('created_at', { ascending: false }),
    ]).then(([ordersResult, reservationsResult, eventsResult]) => {
      if (!isMounted) return
      const failed = [ordersResult, reservationsResult, eventsResult].find((result) => result.error)
      if (failed) setMessage(failed.error.message)
      else {
        setOrders(ordersResult.data || [])
        setReservations(reservationsResult.data || [])
        setEvents(eventsResult.data || [])
        setMessage('')
      }
      setLoadedSlug(activeSlug)
    })
    return () => { isMounted = false }
  }, [activeSlug, session])
  const signIn = async (event) => {
    event.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
  }
  const updateStatus = async (table, id, status) => {
    const { error } = await supabase.from(table).update({ status }).eq('id', id)
    if (error) setMessage(error.message)
    else if (table === 'orders') setOrders((current) => current.map((item) => item.id === id ? { ...item, status } : item))
    else setReservations((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  }
  if (!supabase) return <section className="owner-page page-shell"><div className="page-intro"><p className="eyebrow">Restaurant partner</p><h1>Owner dashboard<br /><em>needs Supabase.</em></h1><p>Connect Supabase to sign in and manage your restaurant.</p></div></section>
  if (!session) return <section className="owner-page page-shell"><div className="admin-login"><p className="eyebrow">Restaurant partner</p><h1>Welcome<br /><em>back.</em></h1><p>Sign in with the account assigned to your restaurant.</p><form onSubmit={signIn}><label>Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label><button className="primary-button" type="submit">Sign in <span>-&gt;</span></button>{message && <small className="form-error">{message}</small>}</form></div></section>
  if (assignmentsLoading) return <section className="owner-page page-shell"><div className="page-intro"><p className="eyebrow">Restaurant partner</p><h1>Loading your<br /><em>restaurant.</em></h1><p>Checking your assigned restaurant access.</p></div></section>
  if (!visibleAssignments.length) return <section className="owner-page page-shell"><div className="page-intro"><p className="eyebrow">Restaurant partner</p><h1>No restaurant<br /><em>assigned yet.</em></h1><p>{message || 'Ask the BiteX administrator to assign your account to a restaurant.'}</p><button className="text-link" type="button" onClick={() => supabase.auth.signOut()}>Sign out <span>-&gt;</span></button></div></section>
  return <section className="owner-page page-shell">
    <div className="owner-heading"><div><p className="eyebrow">BiteX / Restaurant partner</p><h1>{activeRestaurant?.name || activeSlug}<br /><em>dashboard.</em></h1><p>Manage your incoming orders, table bookings and event enquiries.</p></div><div className="owner-heading-actions">{visibleAssignments.length > 1 && <label>Restaurant<select value={activeSlug} onChange={(event) => setSelectedSlug(event.target.value)}>{visibleAssignments.map((item) => <option key={item.restaurant_slug} value={item.restaurant_slug}>{restaurants.find((place) => place.slug === item.restaurant_slug)?.name || item.restaurant_slug}</option>)}</select></label>}<button className="text-link" type="button" onClick={() => supabase.auth.signOut()}>Sign out <span>-&gt;</span></button></div></div>
    {message && <p className="form-error">{message}</p>}
    <div className="owner-stats"><article><span>Orders</span><strong>{orders.length}</strong></article><article><span>Needs attention</span><strong>{orders.filter((item) => item.status === 'pending').length}</strong></article><article><span>Reservations</span><strong>{reservations.length}</strong></article><article><span>Event enquiries</span><strong>{events.length}</strong></article></div>
    <section className="owner-section"><div className="owner-section-heading"><div><p className="eyebrow">KITCHEN</p><h2>Recent orders</h2></div><span>{orders.length} total</span></div>{isLoading ? <p>Loading restaurant activity...</p> : orders.length ? <div className="owner-order-list">{orders.map((order) => <article className="owner-order-row" key={order.id}><div><strong>Order #{order.id} · {order.customer_name}</strong><span>{order.customer_phone || order.customer_email} · {new Date(order.created_at).toLocaleString()}</span><span>{(order.order_items || []).map((item) => `${item.quantity} x ${item.item_name}`).join(', ') || 'Item details unavailable'}</span></div><strong>Rs. {Number(order.total).toLocaleString()}</strong><select aria-label={`Order ${order.id} status`} value={order.status} onChange={(event) => updateStatus('orders', order.id, event.target.value)}><option value="pending">Pending</option><option value="accepted">Accepted</option><option value="preparing">Preparing</option><option value="ready">Ready</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></article>)}</div> : <p>No orders for this restaurant yet.</p>}</section>
    <div className="owner-secondary-grid"><section className="owner-section"><div className="owner-section-heading"><div><p className="eyebrow">GUESTS</p><h2>Reservations</h2></div><span>{reservations.length} total</span></div>{reservations.length ? reservations.map((item) => <article className="owner-compact-row" key={item.id}><div><strong>{item.name}</strong><span>{item.reservation_date} · Table {item.table_number} · {item.guests} guests</span></div><select aria-label={`Reservation ${item.id} status`} value={item.status} onChange={(event) => updateStatus('reservations', item.id, event.target.value)}><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option></select></article>) : <p>No reservations yet.</p>}</section><section className="owner-section"><div className="owner-section-heading"><div><p className="eyebrow">PRIVATE DINING</p><h2>Event enquiries</h2></div><span>{events.length} total</span></div>{events.length ? events.map((item) => <article className="owner-compact-row" key={item.id}><div><strong>{item.event_type} · {item.customer_name}</strong><span>{item.event_date} · {item.guest_count} guests · {item.status}</span></div></article>) : <p>No event enquiries yet.</p>}</section></div>
  </section>
}

function LoginPage({ setPage, recoveryMode, onRecoveryComplete, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [canResendConfirmation, setCanResendConfirmation] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [authCooldown, setAuthCooldown] = useState(0)
  useEffect(() => {
    if (!resendCooldown) return undefined
    const timeout = window.setTimeout(() => setResendCooldown((current) => Math.max(0, current - 1)), 1000)
    return () => window.clearTimeout(timeout)
  }, [resendCooldown])
  useEffect(() => {
    if (!authCooldown) return undefined
    const timeout = window.setTimeout(() => setAuthCooldown((current) => Math.max(0, current - 1)), 1000)
    return () => window.clearTimeout(timeout)
  }, [authCooldown])
  const showAuthError = (error) => {
    setStatus('error')
    setMessage(getAuthErrorMessage(error))
    if (isAuthRateLimited(error)) setAuthCooldown(60)
  }
  const navigateDashboard = (notice) => {
    window.sessionStorage.setItem('samundri_account_notice', notice)
    setPage('history')
    window.location.hash = 'history'
    window.scrollTo(0, 0)
  }
  const completeSignIn = (signedInUser, notice) => {
    const storedProfile = getStoredAccountProfile(signedInUser?.email || email)
    const profile = {
      name: signedInUser?.user_metadata?.name || signedInUser?.user_metadata?.full_name || storedProfile?.name || name.trim() || signedInUser?.email?.split('@')[0] || email.split('@')[0],
      email: signedInUser?.email || email,
    }
    window.sessionStorage.setItem('samundri_pending_profile', JSON.stringify(profile))
    setStatus('success')
    setMessage(notice)
    navigateDashboard(notice)
  }
  const resendConfirmation = async () => {
    if (resendCooldown || authCooldown) return
    if (!email.trim()) {
      setStatus('error')
      setMessage('Enter your email address first.')
      return
    }
    setStatus('saving')
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
        options: { emailRedirectTo: window.location.origin },
      })
      if (error) showAuthError(error)
      else {
        setStatus('success')
        setMessage('Confirmation email sent. Open its link, then return here to sign in.')
      }
      if (!error) setResendCooldown(60)
    } catch (error) {
      showAuthError(error)
    }
  }
  const requestPasswordReset = async (event) => {
    event.preventDefault()
    if (!email.trim()) {
      setStatus('error')
      setMessage('Enter your account email address first.')
      return
    }
    if (!supabase) {
      setStatus('error')
      setMessage('Password reset is unavailable in demo mode.')
      return
    }
    setStatus('saving')
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin })
      if (error) showAuthError(error)
      else {
        setStatus('success')
        setMessage('If an account uses this email, a password reset link has been sent.')
      }
    } catch (error) {
      showAuthError(error)
    }
  }
  const updatePassword = async (event) => {
    event.preventDefault()
    if (!supabase) return
    setStatus('saving')
    try {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) {
        showAuthError(error)
        return
      }
      onRecoveryComplete?.()
      completeSignIn(data.user, 'Password updated. You are signed in.')
    } catch (error) {
      showAuthError(error)
    }
  }
  const submit = async (event) => {
    event.preventDefault()
    if (!supabase) {
      const profile = { name: name || email.split('@')[0], email }
      const notice = 'Demo account ready. Welcome to Samundri Food Hub.'
      setStatus('success')
      setMessage(notice)
      window.sessionStorage.setItem('samundri_pending_profile', JSON.stringify(profile))
      window.sessionStorage.setItem('samundri_account_ready', 'true')
      navigateDashboard(notice)
      return
    }
    setStatus('saving')
    try {
      const result = mode === 'login'
        ? await supabase.auth.signInWithPassword({ email: email.trim(), password })
        : await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { name: name.trim() },
            emailRedirectTo: window.location.origin,
          },
        })
      const duplicateAccount = mode === 'signup' && (
        result.error?.code === 'user_already_exists' ||
        /already (registered|exists)/i.test(result.error?.message || '') ||
        (!result.error && !result.data?.session && result.data?.user?.identities?.length === 0)
      )
      if (duplicateAccount) {
        setCanResendConfirmation(false)
        setStatus('error')
        setMessage('This email already has an account. A different password cannot create a second account for the same email. Use a new email address.')
        return
      }
      if (result.error) {
        if (result.error.code === 'email_not_confirmed') {
          setCanResendConfirmation(true)
        }
        showAuthError(result.error)
        return
      }
      if (mode === 'signup' && !result.data?.session) {
        window.sessionStorage.setItem('samundri_pending_profile', JSON.stringify({ name: name.trim(), email: email.trim() }))
        setCanResendConfirmation(false)
        setStatus('success')
        setMessage('Your account was created, but this project still requires email confirmation. Turn off Confirm email in Supabase to go straight to your dashboard.')
        return
      }
      completeSignIn(result.data?.user, mode === 'login' ? 'You are signed in.' : 'Account created. Welcome to your dashboard.')
    } catch (error) {
      showAuthError(error)
    }
  }
  if (recoveryMode) return <section className="account-page page-shell"><div className="account-panel"><p className="eyebrow">Samundri Food Hub / Account</p><h1>Choose a<br /><em>new password.</em></h1><p>Set a new password for your account.</p><form className="account-form" onSubmit={updatePassword}><label>New password<input value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required minLength="6" type="password" autoComplete="new-password" placeholder="At least 6 characters" /></label><button className="primary-button" type="submit" disabled={status === 'saving'}>{status === 'saving' ? 'Saving...' : 'Update password'} <span>-&gt;</span></button>{message && <small className={status === 'error' ? 'form-error' : 'form-success'}>{message}</small>}</form></div></section>
  return <section className="account-page page-shell"><div className="account-panel"><p className="eyebrow">Samundri Food Hub / Account</p><h1>{mode === 'login' ? <>Welcome<br /><em>back.</em></> : mode === 'signup' ? <>Join the<br /><em>table.</em></> : <>Reset your<br /><em>password.</em></>}</h1><p>{mode === 'login' ? 'Sign in to keep your orders, reservations and event enquiries together.' : mode === 'signup' ? 'Create a customer account for faster checkout and booking history.' : 'We will email you a secure link to reset your password.'}</p><form className="account-form" onSubmit={mode === 'reset' ? requestPasswordReset : submit}>{mode === 'signup' && <label>Name<input value={name} onChange={(event) => setName(event.target.value)} required maxLength="80" autoComplete="name" placeholder="Your name" /></label>}<label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} required type="email" autoComplete="email" placeholder="you@example.com" /></label>{mode !== 'reset' && <label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} required minLength="6" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="At least 6 characters" /></label>}<button className="primary-button" type="submit" disabled={status === 'saving' || authCooldown > 0}>{status === 'saving' ? 'Working...' : authCooldown ? `Wait ${authCooldown}s` : mode === 'login' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link'} <span>-&gt;</span></button>{message && <small className={status === 'error' ? 'form-error' : 'form-success'}>{message}</small>}</form>{mode === 'login' && <button className="account-switch" type="button" onClick={() => { setMode('reset'); setMessage(''); setCanResendConfirmation(false) }}>Forgot password?</button>}{canResendConfirmation && <button className="account-switch" type="button" onClick={resendConfirmation} disabled={status === 'saving' || resendCooldown > 0 || authCooldown > 0}>{authCooldown ? `Wait ${authCooldown}s` : resendCooldown ? `Resend email in ${resendCooldown}s` : 'Resend confirmation email'}</button>}{mode === 'login' && <button className="account-switch" type="button" onClick={() => { setMode('signup'); setMessage(''); setCanResendConfirmation(false) }}>Need an account? Create one</button>}{mode === 'signup' && <button className="account-switch" type="button" onClick={() => { setMode('login'); setMessage(''); setCanResendConfirmation(false) }}>Already have an account? Sign in</button>}{mode === 'reset' && <button className="account-switch" type="button" onClick={() => { setMode('login'); setMessage('') }}>Back to sign in</button>}</div></section>
}

function HistoryPage({ history = [], restaurant, user, setCart, setHistory, setPage }) {
  const [activeSection, setActiveSection] = useState('overview')
  const [spendBreakdownOpen, setSpendBreakdownOpen] = useState(false)
  const [accountOrders, setAccountOrders] = useState([])
  const [accountReservations, setAccountReservations] = useState([])
  const [accountEvents, setAccountEvents] = useState([])
  const [loadedUserId, setLoadedUserId] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [profileName, setProfileName] = useState(() => user?.user_metadata?.name || getStoredAccountProfile(user?.email)?.name || user?.email?.split('@')[0] || '')
  const [profilePhone, setProfilePhone] = useState(() => user?.user_metadata?.phone || getStoredAccountProfile(user?.email)?.phone || '')
  const [profileMessage, setProfileMessage] = useState('')
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [notificationPreferences, setNotificationPreferences] = useState(() => getNotificationPreferences(user?.id))
  const isLoading = Boolean(user && loadedUserId !== user.id)
  useEffect(() => {
    if (!supabase || !user) return undefined
    let isMounted = true
    supabase.from('orders').select('*, order_items(*)').eq('customer_id', user.id).order('created_at', { ascending: false }).then(({ data, error }) => {
      if (!isMounted) return
      if (error) setLoadError(error.message)
      else {
        setLoadError('')
        setAccountOrders((data || []).map((order) => {
          const place = restaurants.find((item) => item.slug === order.restaurant_slug)
          return {
            id: order.id,
            type: 'order',
            restaurantSlug: order.restaurant_slug,
            restaurantName: place?.name || order.restaurant_slug,
            restaurantImage: place?.image || '',
            date: order.created_at,
            time: order.scheduled_at ? new Date(order.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : order.order_type === 'delivery' ? 'Delivery' : 'ASAP',
            customerPhone: order.customer_phone,
            total: Number(order.total),
            status: order.status,
            items: (order.order_items || []).map((item) => ({ name: item.item_name, quantity: item.quantity, price: Number(item.unit_price) })),
          }
        }))
      }
      setLoadedUserId(user.id)
    })
    return () => { isMounted = false }
  }, [user])
  useEffect(() => {
    if (!supabase || !user) return undefined
    let isMounted = true
    supabase.from('reservations').select('*').eq('customer_id', user.id).order('created_at', { ascending: false }).then(({ data, error }) => {
      if (!isMounted) return
      if (error) {
        setLoadError(error.message)
        return
      }
      setAccountReservations((data || []).map((reservation) => {
        const place = restaurants.find((item) => item.slug === reservation.restaurant_slug)
        return {
          id: reservation.id,
          type: 'reservation',
          restaurantSlug: reservation.restaurant_slug,
          restaurantName: place?.name || reservation.restaurant_slug,
          restaurantImage: place?.image || '',
          date: `${reservation.reservation_date}T12:00:00.000Z`,
          time: 'Any time',
          customerPhone: reservation.customer_phone || '',
          name: reservation.name,
          email: reservation.email,
          tableNumber: reservation.table_number,
          guests: Number(reservation.guests),
          status: reservation.status,
        }
      }))
    })
    return () => { isMounted = false }
  }, [user])
  useEffect(() => {
    if (!supabase || !user) return undefined
    let isMounted = true
    supabase.from('event_bookings').select('*').eq('customer_id', user.id).order('created_at', { ascending: false }).then(({ data, error }) => {
      if (!isMounted) return
      if (error) {
        setLoadError(error.message)
        return
      }
      setAccountEvents((data || []).map((event) => {
        const place = restaurants.find((item) => item.slug === event.restaurant_slug)
        return {
          id: event.id,
          type: 'event',
          restaurantSlug: event.restaurant_slug,
          restaurantName: place?.name || event.restaurant_slug,
          restaurantImage: place?.image || '',
          date: `${event.event_date}T12:00:00.000Z`,
          eventType: event.event_type,
          name: event.customer_name,
          email: event.customer_email,
          guests: Number(event.guest_count),
          requirements: event.requirements,
          status: event.status,
        }
      }))
    })
    return () => { isMounted = false }
  }, [user])
  const visibleAccountOrders = user ? accountOrders : []
  const visibleAccountActivity = [...visibleAccountOrders, ...(user ? accountReservations : []), ...(user ? accountEvents : [])]
  const mergedHistory = [...visibleAccountActivity, ...history.filter((entry) => !visibleAccountActivity.some((activity) => activity.type === entry.type && String(activity.id) === String(entry.id)))]
  const orders = mergedHistory.filter((entry) => entry.type === 'order' && (!restaurant || entry.restaurantSlug === restaurant.slug))
  const reservations = mergedHistory.filter((entry) => entry.type === 'reservation' && (!restaurant || entry.restaurantSlug === restaurant.slug))
  const events = mergedHistory.filter((entry) => entry.type === 'event' && (!restaurant || entry.restaurantSlug === restaurant.slug))
  const upcomingReservations = reservations.filter((entry) => new Date(entry.date) >= new Date(new Date().setHours(0, 0, 0, 0)))
  const activeOrders = orders.filter((entry) => !['completed', 'cancelled'].includes(entry.status))
  const totalSpent = orders.reduce((total, entry) => total + Number(entry.total || 0), 0)
  const spendingByRestaurant = orders.reduce((groups, entry) => {
    const key = entry.restaurantSlug || entry.restaurantName
    const group = groups[key] || { name: entry.restaurantName || key, total: 0, orders: [] }
    group.total += Number(entry.total || 0)
    group.orders.push(entry)
    groups[key] = group
    return groups
  }, {})
  const storedProfile = getStoredAccountProfile(user?.email)
  const displayName = user?.user_metadata?.name || storedProfile?.name || user?.email?.split('@')[0] || 'BiteX'
  const displayEmail = user?.email || storedProfile?.email || 'Your BiteX account'
  const initials = displayName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  const navItems = [
    ['overview', 'Overview', LayoutDashboard],
    ['orders', 'My orders', ClipboardList],
    ['reservations', 'Reservations', CalendarDays],
    ['events', 'Events', CalendarDays],
    ['saved', 'Saved places', Heart],
    ['notifications', 'Notifications', Bell],
    ['settings', 'Settings', Settings],
  ]
  const navigate = (nextPage) => { setLocationHash(nextPage); setPage(nextPage); window.scrollTo(0, 0) }
  const orderAgain = (entry) => {
    if (!entry.items?.length) return
    const cartItems = entry.items.flatMap((item) => Array.from({ length: Math.max(1, Math.floor(Number(item.quantity) || 1)) }, () => ({
      name: item.name,
      description: item.description || '',
      image: item.image || entry.restaurantImage || '',
      price: Number(item.price) || 0,
      category: item.category || 'Previous order',
    })))
    const restaurantSlug = entry.restaurantSlug || ''
    setCart(cartItems)
    setLocationHash(restaurantSlug ? `order/${restaurantSlug}` : 'order')
    setPage('order')
    window.scrollTo(0, 0)
  }
  const removeHistoryEntry = (entry) => {
    if (!window.confirm(`Delete this ${entry.type === 'event' ? 'event enquiry' : 'reservation'}?`)) return
    const nextHistory = getStoredHistory().filter((item) => String(item.id) !== String(entry.id))
    window.localStorage.setItem('samundri_activity_history', JSON.stringify(nextHistory))
    setHistory(nextHistory)
  }
  const repeatReservation = (entry) => {
    window.sessionStorage.setItem('samundri_reservation_draft', JSON.stringify({ ...entry, id: null }))
    navigate('reserve')
  }
  const changeReservation = (entry) => {
    window.sessionStorage.setItem('samundri_reservation_draft', JSON.stringify(entry))
    navigate('reserve')
  }
  const repeatEvent = (entry) => {
    window.sessionStorage.setItem('samundri_event_draft', JSON.stringify({ ...entry, id: null }))
    navigate('events')
  }
  const changeEvent = (entry) => {
    window.sessionStorage.setItem('samundri_event_draft', JSON.stringify(entry))
    navigate('events')
  }
  const saveProfile = async (event) => {
    event.preventDefault()
    setIsSavingProfile(true)
    setProfileMessage('')
    const profile = { ...(storedProfile || {}), name: profileName.trim(), email: displayEmail, phone: profilePhone.trim() }
    if (user && supabase) {
      const { error } = await supabase.auth.updateUser({ data: { name: profile.name, phone: profile.phone } })
      if (error) {
        setProfileMessage(error.message)
        setIsSavingProfile(false)
        return
      }
    }
    window.sessionStorage.setItem('samundri_pending_profile', JSON.stringify(profile))
    setProfileMessage('Profile saved.')
    setIsSavingProfile(false)
  }
  const updateNotificationPreference = (preference, enabled) => {
    const nextPreferences = { ...notificationPreferences, [preference]: enabled }
    setNotificationPreferences(nextPreferences)
    window.localStorage.setItem(`samundri_notification_preferences:${user?.id || 'guest'}`, JSON.stringify(nextPreferences))
  }
  const orderList = (items) => items.length ? <div className="dashboard-order-list">{items.map((entry) => {
    const firstItem = entry.items?.[0]
    const orderImage = firstItem?.image || entry.restaurantImage
    return <details className="dashboard-order-entry" key={`${entry.id}-${entry.restaurantSlug}`}>
      <summary className="dashboard-order-row" aria-label={`Order from ${entry.restaurantName}, ${entry.items?.length || 0} items`}>
        {orderImage ? <img className="dashboard-order-image" src={orderImage} alt="" /> : <span className="dashboard-order-image dashboard-order-placeholder"><ShoppingBag size={18} /></span>}
        <div className="dashboard-order-description"><small className="dashboard-activity-label">Order from {entry.restaurantName}</small><strong>{entry.restaurantName}</strong><span>{entry.items?.length ? `${entry.items.length} ${entry.items.length === 1 ? 'item' : 'items'}` : 'Order details unavailable'}</span><small>#{entry.id} · {new Date(entry.date).toLocaleDateString()} · {entry.time || 'Any time'}</small></div>
        <strong className="dashboard-order-total">Rs. {Number(entry.total).toLocaleString()}</strong>
        <span className={`dashboard-status status-${entry.status}`}>{entry.status}</span>
        <ChevronDown className="dashboard-order-expand" size={17} aria-hidden="true" />
      </summary>
      <div className="dashboard-order-items">
        {entry.items?.length ? entry.items.map((item, index) => {
          const quantity = Number(item.quantity) || 1
          const itemTotal = (Number(item.price) || 0) * quantity
          return <div className="dashboard-order-item" key={`${item.name}-${index}`}><span><b>{quantity} x</b>{item.name}</span><strong>Rs. {itemTotal.toLocaleString()}</strong></div>
        }) : <p>Item details unavailable for this order.</p>}
      </div>
      {entry.items?.length > 0 && <div className="dashboard-order-actions"><button type="button" onClick={() => orderAgain(entry)}>Order again <ArrowUpRight aria-hidden="true" size={14} /></button></div>}
    </details>
  })}</div> : <div className="dashboard-empty"><ShoppingBag size={24} /><strong>No orders yet</strong><span>Your completed and current orders will appear here.</span><button type="button" onClick={() => navigate('restaurants')}>Explore restaurants <ArrowUpRight size={15} /></button></div>
  const reservationList = (items) => items.length ? <div className="dashboard-reservation-list">{items.map((entry) => <article className="dashboard-reservation-row" key={`${entry.id}-${entry.restaurantSlug}`}><span className="dashboard-calendar-icon"><CalendarDays size={19} /></span><div><small className="dashboard-activity-label">Reservation at {entry.restaurantName}</small><strong>{entry.restaurantName}</strong><span>{new Date(entry.date).toLocaleDateString()} · {entry.time || 'Any time'}</span><small>Table {entry.tableNumber} · {entry.guests} guests</small><div className="dashboard-entry-actions"><button type="button" onClick={() => repeatReservation(entry)}>Book again</button><button type="button" onClick={() => changeReservation(entry)}>Change</button><button type="button" onClick={() => removeHistoryEntry(entry)}>Delete</button></div></div><span className="dashboard-status">{entry.status}</span></article>)}</div> : <div className="dashboard-empty dashboard-empty-compact"><CalendarDays size={22} /><strong>No reservations yet</strong><span>Your upcoming table bookings will appear here.</span><button type="button" onClick={() => navigate('reserve')}>Book a table <ArrowUpRight size={15} /></button></div>
  const eventList = (items) => items.length ? <div className="dashboard-reservation-list">{items.map((entry) => <article className="dashboard-reservation-row" key={`${entry.id}-${entry.restaurantSlug}`}><span className="dashboard-calendar-icon"><CalendarDays size={19} /></span><div><small className="dashboard-activity-label">Event enquiry at {entry.restaurantName}</small><strong>{entry.eventType}</strong><span>{new Date(entry.date).toLocaleDateString()} · {entry.guests} guests</span><small>{entry.name} · {entry.requirements}</small><div className="dashboard-entry-actions"><button type="button" onClick={() => repeatEvent(entry)}>Book again</button><button type="button" onClick={() => changeEvent(entry)}>Change</button><button type="button" onClick={() => removeHistoryEntry(entry)}>Delete</button></div></div><span className="dashboard-status">{entry.status}</span></article>)}</div> : <div className="dashboard-empty dashboard-empty-compact"><CalendarDays size={22} /><strong>No event enquiries yet</strong><span>Your private dining requests will appear here.</span><button type="button" onClick={() => navigate('events')}>Plan an event <ArrowUpRight size={15} /></button></div>

  return <section className="customer-dashboard">
    <aside className="dashboard-sidebar">
      <div className="dashboard-profile"><span className="dashboard-avatar" aria-label={`${displayName} logo`} title={`${displayName} logo`}>{initials}</span><span><strong>{displayName}</strong><small>{displayEmail}</small></span></div>
      <p className="dashboard-nav-label">YOUR ACCOUNT</p>
      <nav className="dashboard-nav" aria-label="Dashboard sections">{navItems.map(([section, label, Icon]) => <button key={section} type="button" className={activeSection === section ? 'active' : ''} onClick={() => setActiveSection(section)}><Icon size={17} aria-hidden="true" /><span>{label}</span>{section === 'orders' && orders.length > 0 && <small>{orders.length}</small>}</button>)}</nav>
      <div className="dashboard-sidebar-footer"><span>Good food, close to home.</span>{user && <button type="button" onClick={() => supabase?.auth.signOut()}><LogOut size={16} /> Sign out</button>}</div>
    </aside>
    <div className="dashboard-content">
      <header className="dashboard-page-header"><div><p className="dashboard-date">BiteX / CUSTOMER DASHBOARD</p><h1>{activeSection === 'overview' ? <>Welcome back, <em>{displayName}.</em></> : navItems.find(([section]) => section === activeSection)?.[1]}</h1><p>{activeSection === 'overview' ? 'Here is what is happening with your food and bookings.' : `Your ${navItems.find(([section]) => section === activeSection)?.[1].toLowerCase()} at a glance.`}</p></div><span className="dashboard-header-avatar" aria-label={`${displayName} logo`} title={`${displayName} logo`}>{initials}</span></header>
      {!user && <div className="dashboard-signin-prompt"><span>Sign in to sync your order history across devices.</span><button type="button" onClick={() => navigate('login')}>Sign in / Create account <ArrowUpRight size={15} /></button></div>}
      {loadError && <p className="form-error">Could not load account orders: {loadError}</p>}
      {activeSection === 'overview' && <>
        <div className="dashboard-stats">
          <article><span className="dashboard-stat-icon"><ShoppingBag size={18} /></span><small>Total orders</small><strong>{orders.length}</strong><span>Since joining BiteX</span></article>
          <article><span className="dashboard-stat-icon"><Clock3 size={18} /></span><small>In progress</small><strong>{activeOrders.length}</strong><span>Being prepared or confirmed</span></article>
          <article><span className="dashboard-stat-icon"><CalendarDays size={18} /></span><small>Reservations</small><strong>{reservations.length}</strong><span>{upcomingReservations.length} upcoming</span></article>
          <article className="dashboard-spent-stat"><button className="dashboard-spent-trigger" type="button" aria-expanded={spendBreakdownOpen} aria-controls="dashboard-spend-breakdown" onClick={() => setSpendBreakdownOpen((open) => !open)}><span className="dashboard-stat-icon"><span className="currency-mark">Rs</span></span><small>Total spent</small><strong>Rs. {totalSpent.toLocaleString()}</strong><span className="dashboard-spent-hint">{spendBreakdownOpen ? 'Hide breakdown' : 'Click to view breakdown'}</span></button></article>
        </div>
        {spendBreakdownOpen && <section className="dashboard-panel dashboard-spent-breakdown" id="dashboard-spend-breakdown"><div className="dashboard-panel-heading"><div><p className="dashboard-date">SPENDING BREAKDOWN</p><h2>Your orders by restaurant</h2></div><strong>Rs. {totalSpent.toLocaleString()}</strong></div>{Object.entries(spendingByRestaurant).map(([key, group]) => <div className="dashboard-spent-group" key={key}><div className="dashboard-spent-group-heading"><strong>{group.name}</strong><b>Rs. {group.total.toLocaleString()}</b></div>{group.orders.map((entry) => <div className="dashboard-spent-order" key={`${entry.id}-${entry.restaurantSlug}`}><span>Order #{entry.id}<small>{new Date(entry.date).toLocaleDateString()} · {entry.status || 'status unavailable'}</small></span><strong>Rs. {Number(entry.total || 0).toLocaleString()}</strong></div>)}</div>)}{!orders.length && <p className="dashboard-muted">No orders to break down yet.</p>}</section>}
        <div className="dashboard-columns">
          <section className="dashboard-panel"><div className="dashboard-panel-heading"><div><p className="dashboard-date">YOUR ACTIVITY</p><h2>Recent orders</h2></div><button type="button" onClick={() => setActiveSection('orders')}>View all <ArrowUpRight size={15} /></button></div>{isLoading ? <p className="dashboard-loading">Loading order history...</p> : orderList(orders.slice(0, 4))}</section>
          <section className="dashboard-panel dashboard-upcoming"><div className="dashboard-panel-heading"><div><p className="dashboard-date">COMING UP</p><h2>Reservations</h2></div><button type="button" onClick={() => setActiveSection('reservations')}>View all <ArrowUpRight size={15} /></button></div>{reservationList(upcomingReservations.slice(0, 3))}</section>
        </div>
      </>}
      {activeSection === 'orders' && <section className="dashboard-panel dashboard-full-panel"><div className="dashboard-panel-heading"><div><p className="dashboard-date">ORDER HISTORY</p><h2>All orders</h2></div><span>{orders.length} total</span></div>{isLoading ? <p className="dashboard-loading">Loading order history...</p> : orderList(orders)}</section>}
      {activeSection === 'reservations' && <section className="dashboard-panel dashboard-full-panel"><div className="dashboard-panel-heading"><div><p className="dashboard-date">TABLE BOOKINGS</p><h2>All reservations</h2></div><button type="button" onClick={() => navigate('reserve')}>Book a table <ArrowUpRight size={15} /></button></div>{reservationList(reservations)}</section>}
      {activeSection === 'events' && <section className="dashboard-panel dashboard-full-panel"><div className="dashboard-panel-heading"><div><p className="dashboard-date">PRIVATE DINING</p><h2>Event enquiries</h2></div><button type="button" onClick={() => navigate('events')}>Plan an event <ArrowUpRight size={15} /></button></div>{eventList(events)}</section>}
      {activeSection === 'saved' && <section className="dashboard-panel dashboard-empty dashboard-full-panel"><Heart size={24} /><strong>No saved places yet</strong><span>Save restaurants you love and find them here next time.</span><button type="button" onClick={() => navigate('restaurants')}>Explore restaurants <ArrowUpRight size={15} /></button></section>}
      {activeSection === 'notifications' && <section className="dashboard-panel dashboard-notifications-page dashboard-full-panel"><p className="dashboard-date">PREFERENCES</p><h2>Notifications</h2><p className="dashboard-notification-intro">Choose which updates you want to receive.</p><div className="dashboard-notification-settings"><label><span><strong>Order updates</strong><small>Updates about orders and delivery progress</small></span><input type="checkbox" checked={notificationPreferences.orders} onChange={(event) => updateNotificationPreference('orders', event.target.checked)} /></label><label><span><strong>Reservation updates</strong><small>Changes to your table bookings</small></span><input type="checkbox" checked={notificationPreferences.reservations} onChange={(event) => updateNotificationPreference('reservations', event.target.checked)} /></label><label><span><strong>Event updates</strong><small>Replies about your private dining enquiries</small></span><input type="checkbox" checked={notificationPreferences.events} onChange={(event) => updateNotificationPreference('events', event.target.checked)} /></label></div></section>}
      {activeSection === 'settings' && <section className="dashboard-panel dashboard-settings"><form className="dashboard-profile-form" onSubmit={saveProfile}><p className="dashboard-date">ACCOUNT DETAILS</p><h2>Profile</h2><label>Name<input value={profileName} onChange={(event) => setProfileName(event.target.value)} required maxLength="80" /></label><label>Email<input value={displayEmail} type="email" readOnly /></label><label>Phone number<input value={profilePhone} onChange={(event) => setProfilePhone(event.target.value)} type="tel" placeholder="+92 300 1234567" /></label><button className="dashboard-save-button" type="submit" disabled={isSavingProfile}>{isSavingProfile ? 'Saving...' : 'Save changes'}</button>{profileMessage && <small className={profileMessage === 'Profile saved.' ? 'form-success' : 'form-error'} role="status">{profileMessage}</small>}</form><div className="dashboard-notification-settings"><p className="dashboard-date">PREFERENCES</p><h2>Notifications</h2><label><span><strong>Order updates</strong><small>Updates about orders and delivery progress</small></span><input type="checkbox" checked={notificationPreferences.orders} onChange={(event) => updateNotificationPreference('orders', event.target.checked)} /></label><label><span><strong>Reservation updates</strong><small>Changes to your table bookings</small></span><input type="checkbox" checked={notificationPreferences.reservations} onChange={(event) => updateNotificationPreference('reservations', event.target.checked)} /></label><label><span><strong>Event updates</strong><small>Replies about your private dining enquiries</small></span><input type="checkbox" checked={notificationPreferences.events} onChange={(event) => updateNotificationPreference('events', event.target.checked)} /></label></div></section>}
    </div>
  </section>
}

function Footer({ setPage, restaurant, page }) {
  const navigate = (nextPage) => { window.location.hash = restaurant ? `${nextPage}/${restaurant.slug}` : nextPage; setPage(nextPage); window.scrollTo(0, 0) }
  if (page === 'restaurant-details' || page === 'home' || page === 'history') return <footer className="site-footer bitex-footer">
    <div className="bitex-footer-brand">
      <span className="brand-lockup bitex-footer-lockup">
        <i className="brand-symbol home-brand-symbol"><ChefHat aria-hidden="true" size={20} /><span>BX</span></i>
        <span className="brand-text"><b>Bite<span className="wordmark-accent">X</span></b><small>FOOD HUB</small></span>
      </span>
      <p><strong>Discover &amp; explore</strong><span>Samundri restaurants, all in one place.</span></p>
    </div>
    <div className="bitex-footer-contact">
      <p className="footer-label">Contact BiteX</p>
      <a href={`tel:+${whatsappNumber(defaultHubPhone)}`}>{defaultHubPhone}</a>
      <a href="mailto:hello@samundrifoodhouse.pk">hello@samundri<wbr />foodhouse<wbr />.pk</a>
    </div>
    <div className="bitex-footer-hours">
      <Clock3 aria-hidden="true" size={20} />
      <div><p className="footer-label">Platform hours</p><strong>Open 24 hours</strong></div>
    </div>
  </footer>
    return <footer className={`site-footer${page === 'menu' || page === 'order' || page === 'reserve' || page === 'story' || page === 'history' ? ' menu-footer' : ''}`}>
      <div className="footer-brand">
        <span className="brand-lockup footer-brand-lockup">
          <i className="brand-symbol footer-symbol">{restaurant?.logoMark || 'SH'}</i>
          <span className="brand-text">
            <b className="footer-mark">{restaurant?.brand || 'SAMUNDRI'}</b>
            <small className="footer-submark">{restaurant ? restaurant.cuisine : 'FOOD HOUSE'}</small>
          </span>
        </span>
        <p>{restaurant ? `${restaurant.name}, ${restaurant.area}.` : 'Good food, warm evenings,'}<br />and a table for everyone.</p>
      </div>
      <div className="footer-column"><p className="footer-label">Explore</p>{page !== 'home' && <button type="button" onClick={() => navigate('menu')}>Our menu</button>}<button type="button" onClick={() => navigate('story')}>Our story</button><button type="button" onClick={() => navigate('events')}>Private dining</button></div>
      <div className="footer-column"><p className="footer-label">Visit us</p><span>{restaurant?.name || 'Samundri Food House'}</span><span>{restaurant?.area || 'Samundri, Pakistan'}</span>{restaurant && <a className="directions-link" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${restaurant.name}, ${restaurant.area}`)}`} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" size={15} />Get directions</a>}<span>{restaurant?.hours || 'Tue - Sun / 5 - 10pm'}</span></div>
      <div className="footer-column"><p className="footer-label">Contact</p><a href={`tel:${(restaurant?.phone || defaultHubPhone).replace(/[^\d+]/g, '')}`}>{restaurant?.phone || defaultHubPhone}</a><a href={`mailto:${restaurant?.email || 'hello@samundrifoodhouse.pk'}`}>{restaurant?.email || 'hello@samundrifoodhouse.pk'}</a><a className="whatsapp-link" href={`https://wa.me/${whatsappNumber(restaurant?.phone || defaultHubPhone)}?text=${encodeURIComponent(`Hello ${restaurant?.name || 'Samundri Food House'}, I would like to ask about a table or order.`)}`} target="_blank" rel="noreferrer">WhatsApp us <span><ArrowUpRight aria-hidden="true" size={14} /></span></a>{page !== 'home' && <button className="footer-cta" type="button" onClick={() => navigate('reserve')}>Book a table <span>-&gt;</span></button>}</div>
      <div className="footer-bottom"><span>{restaurant?.name || 'Samundri Food House'}</span><span>{restaurant ? restaurant.status : 'Local flavor, shared moments.'}</span><span>{restaurant?.phone || 'Instagram / Contact'}</span></div>
    </footer>
}

function App() {
  const getRoute = () => {
    const [page, restaurantSlug] = window.location.hash.replace('#', '').split('/')
    const requestedPage = page || 'home'
    return { page: requestedPage, restaurantSlug: restaurantSlug || '' }
  }
  const initialHash = window.location.hash.slice(1)
  const isAuthCallback = /(?:^|&)(access_token|error|type)=/.test(initialHash) || new URLSearchParams(window.location.search).has('code')
  const initialRoute = isAuthCallback ? { page: 'login', restaurantSlug: '' } : getRoute()
  const [page, setPage] = useState(initialRoute.page)
  const [restaurantSlug, setRestaurantSlug] = useState(initialRoute.restaurantSlug)
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(/(?:^|&)type=recovery(?:&|$)/.test(initialHash))
  const [homeResetToken, setHomeResetToken] = useState(0)
  const [restaurantSearchQuery, setRestaurantSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  const [history, setHistory] = useState(() => getStoredHistory())
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const handleHash = () => {
      const route = getRoute()
      setPage(route.page)
      setRestaurantSlug(route.restaurantSlug)
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])
  useEffect(() => {
    if (!supabase) return undefined
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null))
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      if (event === 'PASSWORD_RECOVERY') {
        setIsPasswordRecovery(true)
        setPage('login')
      } else if (event === 'SIGNED_IN' && isAuthCallback) {
        setPage('history')
        const callbackUrl = new URL(window.location.href)
        callbackUrl.searchParams.delete('code')
        callbackUrl.hash = ''
        window.history.replaceState(null, '', `${callbackUrl.pathname}${callbackUrl.search}`)
      }
    })
    return () => listener.subscription.unsubscribe()
  }, [isAuthCallback])
  const cartTotal = cart.reduce((total, item) => total + item.price, 0)
  const navigateToOrder = () => { window.location.hash = restaurantSlug ? `order/${restaurantSlug}` : 'order'; setPage('order'); window.scrollTo(0, 0) }
  const openRestaurantMenu = (restaurant) => { window.location.hash = `menu/${restaurant.slug}`; setPage('menu'); setRestaurantSlug(restaurant.slug); window.scrollTo(0, 0) }
  const openRestaurants = (query = '') => { setRestaurantSearchQuery(query); window.location.hash = 'restaurants'; setPage('restaurants'); window.scrollTo(0, 0) }
  const openRestaurantDetails = (restaurant) => { setRestaurantSlug(''); setRestaurantSearchQuery(restaurant.name); window.location.hash = 'restaurant-details'; setPage('restaurant-details'); setIsMenuOpen(false); window.scrollTo(0, 0) }
  const selectedRestaurant = ['home', 'restaurants', 'restaurant-details'].includes(page) ? undefined : restaurants.find((restaurant) => restaurant.slug === restaurantSlug)
  const accountReady = Boolean(user) || (!supabase && window.sessionStorage.getItem('samundri_account_ready') === 'true')
  const pages = {
    home: <HomePage key={homeResetToken} onExploreRestaurants={openRestaurants} />,
    restaurants: <RestaurantsPage key="restaurants" initialQuery={restaurantSearchQuery} onOpenRestaurant={openRestaurantMenu} onOpenRestaurantDetails={openRestaurantDetails} />,
    'restaurant-details': <RestaurantsPage key={`restaurant-details-${restaurantSearchQuery}`} initialQuery={restaurantSearchQuery} onOpenRestaurant={openRestaurantMenu} onOpenRestaurantDetails={openRestaurantDetails} showDetails />,
    menu: <MenuPage setCart={setCart} restaurant={selectedRestaurant} />,
    order: <OrderPage cart={cart} setCart={setCart} restaurant={selectedRestaurant} setHistory={setHistory} setPage={setPage} user={user} />,
    history: <HistoryPage key={user?.id || 'guest'} history={history} restaurant={selectedRestaurant} user={user} setCart={setCart} setHistory={setHistory} setPage={setPage} />,
    story: <StoryPage restaurant={selectedRestaurant} />,
    reserve: <ReservationPage restaurant={selectedRestaurant} setHistory={setHistory} user={user} />,
    events: <EventsPage restaurant={selectedRestaurant} setHistory={setHistory} user={user} />,
    contact: <ContactPage restaurant={selectedRestaurant} setPage={setPage} />,
    login: <LoginPage key="login" setPage={setPage} recoveryMode={isPasswordRecovery} onRecoveryComplete={() => setIsPasswordRecovery(false)} />,
    owner: <RestaurantOwnerDashboard />,
    admin: <><AdminPage /><AdminOrdersPanel /></>,
  }
  if (page === 'admin') delete pages.admin
  if (page === 'signup') pages.signup = <LoginPage key="signup" setPage={setPage} initialMode="signup" />
  const contactPhone = selectedRestaurant?.phone || defaultHubPhone
  const showContactFooter = Boolean(selectedRestaurant) || page === 'restaurant-details' || page === 'home' || page === 'menu' || page === 'order' || page === 'reserve' || page === 'history'
  useEffect(() => { document.title = selectedRestaurant ? `${selectedRestaurant.name} | BiteX` : 'BiteX | Local restaurants and memorable meals' }, [selectedRestaurant])
  return (
    <main id="app-theme" style={{ '--restaurant-accent': selectedRestaurant?.accent || '#db633d' }}>
      <Header page={page} setPage={setPage} setHomeResetToken={setHomeResetToken} setRestaurantSearchQuery={setRestaurantSearchQuery} cart={cart} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} restaurant={selectedRestaurant} accountReady={accountReady} />
      {pages[page] || pages.home}
      {cart.length > 0 && <aside className="cart-toast"><div className="cart-summary"><span className="cart-label">Order in progress</span><span><b>{cart.length}</b> {cart.length === 1 ? 'dish' : 'dishes'} ready</span></div><strong>Rs. {cartTotal}</strong><div className="cart-actions"><button type="button" className="view-bag-button" onClick={navigateToOrder}>Review order</button><button type="button" className="clear-bag-button" onClick={() => setCart([])}>Clear</button></div></aside>}
      {selectedRestaurant && <a className="whatsapp-float" href={`https://wa.me/${whatsappNumber(contactPhone)}?text=${encodeURIComponent(`Hello ${selectedRestaurant.name}, I would like to ask about a table or order.`)}`} target="_blank" rel="noreferrer" aria-label={`Chat with ${selectedRestaurant.name} on WhatsApp`}>WhatsApp <span><ArrowUpRight aria-hidden="true" size={14} /></span></a>}
      {showContactFooter && <Footer setPage={setPage} restaurant={selectedRestaurant} page={page} />}
    </main>
  )
}
export default App

