import restaurant1 from "@/assets/restaurant-1.jpg";
import restaurant2 from "@/assets/restaurant-2.jpg";
import restaurant3 from "@/assets/restaurant-3.jpg";
import restaurant4 from "@/assets/restaurant-4.jpg";
import restaurant5 from "@/assets/restaurant-5.jpg";
import restaurant6 from "@/assets/restaurant-6.jpg";
import restaurant7 from "@/assets/restaurant-7.jpg";
import restaurant8 from "@/assets/restaurant-8.jpg";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food4 from "@/assets/food-4.jpg";

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  cuisine: string;
  description: string;
  image: string;
  tables: Table[];
  menu: MenuItem[];
}

export interface Table {
  id: string;
  type: string;
  seats: number;
  price: number;
  available: boolean;
  label: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  prepTime?: number;
}

export interface Booking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  date: string;
  time: string;
  duration: number;
  guests: number;
  table: Table;
  foodItems: { item: MenuItem; quantity: number }[];
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Grand Terrace",
    location: "Downtown, New York",
    rating: 4.8,
    reviewCount: 324,
    priceRange: "$$$",
    cuisine: "Fine Dining",
    description: "An exquisite fine dining experience with panoramic city views. Our award-winning chef crafts each dish with locally sourced ingredients and artistic presentation.",
    image: restaurant1,
    tables: [
      { id: "t1", type: "standard", seats: 2, price: 25, available: true, label: "Window Table for 2" },
      { id: "t2", type: "standard", seats: 4, price: 40, available: true, label: "Center Table for 4" },
      { id: "t3", type: "vip", seats: 4, price: 75, available: true, label: "VIP Booth for 4" },
      { id: "t4", type: "vip", seats: 6, price: 120, available: false, label: "Private Room for 6" },
      { id: "t5", type: "standard", seats: 2, price: 25, available: true, label: "Terrace Table for 2" },
      { id: "t6", type: "group", seats: 8, price: 150, available: true, label: "Group Table for 8" },
    ],
    menu: [
      { id: "m1", name: "Wagyu Steak", description: "A5 grade wagyu with truffle butter and seasonal vegetables", price: 85, image: food1, category: "Main", popular: true, prepTime: 25 },
      { id: "m2", name: "Lobster Linguine", description: "Fresh Maine lobster with house-made pasta and saffron cream", price: 62, image: food2, category: "Main", popular: true, prepTime: 20 },
      { id: "m3", name: "Chocolate Soufflé", description: "Dark Belgian chocolate with vanilla bean ice cream", price: 24, image: food3, category: "Dessert", prepTime: 15 },
      { id: "m4", name: "Caesar Salad", description: "Romaine hearts, aged parmesan, anchovy dressing, garlic croutons", price: 18, image: food4, category: "Starter", prepTime: 10 },
    ],
  },
  {
    id: "2",
    name: "Sky Lounge",
    location: "Midtown, Manhattan",
    rating: 4.6,
    reviewCount: 218,
    priceRange: "$$$$",
    cuisine: "Modern European",
    description: "Rooftop dining with breathtaking skyline views. Contemporary European cuisine paired with an extensive wine selection.",
    image: restaurant2,
    tables: [
      { id: "t7", type: "standard", seats: 2, price: 35, available: true, label: "Skyline Table for 2" },
      { id: "t8", type: "standard", seats: 4, price: 55, available: true, label: "Lounge Table for 4" },
      { id: "t9", type: "vip", seats: 4, price: 100, available: true, label: "VIP Corner for 4" },
    ],
    menu: [
      { id: "m5", name: "Pan-Seared Duck", description: "Duck breast with cherry reduction and roasted root vegetables", price: 48, image: food1, category: "Main", popular: true, prepTime: 22 },
      { id: "m6", name: "Seafood Risotto", description: "Arborio rice with mixed seafood and white wine", price: 42, image: food2, category: "Main", prepTime: 18 },
      { id: "m7", name: "Tiramisu", description: "Classic Italian dessert with espresso and mascarpone", price: 16, image: food3, category: "Dessert", prepTime: 5 },
      { id: "m8", name: "Bruschetta", description: "Heirloom tomatoes, fresh basil, balsamic glaze", price: 14, image: food4, category: "Starter", prepTime: 8 },
    ],
  },
  {
    id: "3",
    name: "Oceana Beach Club",
    location: "Santa Monica, CA",
    rating: 4.9,
    reviewCount: 456,
    priceRange: "$$$",
    cuisine: "Seafood",
    description: "Beachfront dining at its finest. Fresh catches prepared with Mediterranean influences and served with ocean views.",
    image: restaurant3,
    tables: [
      { id: "t10", type: "standard", seats: 2, price: 30, available: true, label: "Beach View for 2" },
      { id: "t11", type: "standard", seats: 4, price: 50, available: true, label: "Deck Table for 4" },
      { id: "t12", type: "vip", seats: 6, price: 130, available: true, label: "Cabana for 6" },
    ],
    menu: [
      { id: "m9", name: "Grilled Sea Bass", description: "Mediterranean herbs, lemon butter, grilled vegetables", price: 52, image: food1, category: "Main", popular: true, prepTime: 20 },
      { id: "m10", name: "Shrimp Scampi", description: "Garlic butter shrimp with angel hair pasta", price: 38, image: food2, category: "Main", prepTime: 15 },
      { id: "m11", name: "Key Lime Pie", description: "Tangy lime custard with graham cracker crust", price: 14, image: food3, category: "Dessert", prepTime: 5 },
      { id: "m12", name: "Ceviche", description: "Fresh fish, citrus, avocado, cilantro, tortilla chips", price: 16, image: food4, category: "Starter", popular: true, prepTime: 10 },
    ],
  },
  {
    id: "4",
    name: "La Trattoria",
    location: "Little Italy, NYC",
    rating: 4.7,
    reviewCount: 189,
    priceRange: "$$",
    cuisine: "Italian",
    description: "Authentic Italian cuisine in a cozy brick-walled setting. Family recipes passed down through generations.",
    image: restaurant4,
    tables: [
      { id: "t13", type: "standard", seats: 2, price: 15, available: true, label: "Cozy Table for 2" },
      { id: "t14", type: "standard", seats: 4, price: 25, available: true, label: "Family Table for 4" },
      { id: "t15", type: "group", seats: 8, price: 60, available: true, label: "Party Table for 8" },
    ],
    menu: [
      { id: "m13", name: "Osso Buco", description: "Braised veal shanks with gremolata and risotto Milanese", price: 38, image: food1, category: "Main", popular: true, prepTime: 30 },
      { id: "m14", name: "Spaghetti Carbonara", description: "Guanciale, pecorino, egg yolk, black pepper", price: 22, image: food2, category: "Main", prepTime: 12 },
      { id: "m15", name: "Panna Cotta", description: "Vanilla bean custard with berry compote", price: 12, image: food3, category: "Dessert", prepTime: 5 },
      { id: "m16", name: "Caprese Salad", description: "Buffalo mozzarella, heirloom tomatoes, fresh basil", price: 14, image: food4, category: "Starter", prepTime: 5 },
    ],
  },
  {
    id: "5",
    name: "Sakura Omakase",
    location: "West Village, NYC",
    rating: 4.9,
    reviewCount: 287,
    priceRange: "$$$$",
    cuisine: "Japanese",
    description: "An intimate omakase experience led by Chef Tanaka. Each course is a masterpiece of seasonal Japanese ingredients.",
    image: restaurant5,
    tables: [
      { id: "t16", type: "standard", seats: 2, price: 50, available: true, label: "Sushi Counter for 2" },
      { id: "t17", type: "vip", seats: 4, price: 120, available: true, label: "Private Tatami for 4" },
      { id: "t18", type: "standard", seats: 2, price: 40, available: false, label: "Garden View for 2" },
    ],
    menu: [
      { id: "m17", name: "Omakase Set", description: "12-course chef's selection of the finest seasonal sushi", price: 150, image: food1, category: "Main", popular: true, prepTime: 60 },
      { id: "m18", name: "Wagyu Tataki", description: "Seared A5 wagyu with ponzu and truffle", price: 45, image: food2, category: "Starter", popular: true, prepTime: 12 },
      { id: "m19", name: "Matcha Mochi", description: "House-made mochi with ceremonial grade matcha", price: 16, image: food3, category: "Dessert", prepTime: 5 },
      { id: "m20", name: "Edamame Trio", description: "Three preparations: truffle salt, spicy garlic, classic sea salt", price: 12, image: food4, category: "Starter", prepTime: 5 },
    ],
  },
  {
    id: "6",
    name: "Le Petit Jardin",
    location: "Upper East Side, NYC",
    rating: 4.5,
    reviewCount: 163,
    priceRange: "$$$",
    cuisine: "French",
    description: "Classic French bistro charm with a modern twist. Garden patio dining with an award-winning wine cellar.",
    image: restaurant6,
    tables: [
      { id: "t19", type: "standard", seats: 2, price: 30, available: true, label: "Patio Table for 2" },
      { id: "t20", type: "standard", seats: 4, price: 45, available: true, label: "Garden Table for 4" },
      { id: "t21", type: "vip", seats: 6, price: 100, available: true, label: "Wine Room for 6" },
    ],
    menu: [
      { id: "m21", name: "Duck Confit", description: "Slow-cooked duck leg with lentils du Puy and red wine jus", price: 42, image: food1, category: "Main", popular: true, prepTime: 25 },
      { id: "m22", name: "Bouillabaisse", description: "Provençal fish stew with saffron rouille and gruyère toast", price: 38, image: food2, category: "Main", prepTime: 20 },
      { id: "m23", name: "Crème Brûlée", description: "Madagascar vanilla custard with caramelized sugar", price: 14, image: food3, category: "Dessert", prepTime: 5 },
      { id: "m24", name: "French Onion Soup", description: "Caramelized onion broth with gruyère crouton", price: 16, image: food4, category: "Starter", popular: true, prepTime: 10 },
    ],
  },
  {
    id: "7",
    name: "Casa del Sol",
    location: "Miami Beach, FL",
    rating: 4.4,
    reviewCount: 342,
    priceRange: "$$",
    cuisine: "Mexican",
    description: "Vibrant Mexican flavors in a lively beachside setting. From street tacos to elevated mole, every dish celebrates tradition.",
    image: restaurant7,
    tables: [
      { id: "t22", type: "standard", seats: 2, price: 15, available: true, label: "Bar Table for 2" },
      { id: "t23", type: "standard", seats: 4, price: 25, available: true, label: "Fiesta Table for 4" },
      { id: "t24", type: "group", seats: 10, price: 70, available: true, label: "Party Table for 10" },
      { id: "t25", type: "standard", seats: 4, price: 30, available: true, label: "Patio Table for 4" },
    ],
    menu: [
      { id: "m25", name: "Birria Tacos", description: "Slow-braised beef tacos with consommé for dipping", price: 18, image: food1, category: "Main", popular: true, prepTime: 12 },
      { id: "m26", name: "Mole Enchiladas", description: "Chicken enchiladas with house-made oaxacan mole negro", price: 22, image: food2, category: "Main", prepTime: 15 },
      { id: "m27", name: "Churros", description: "Cinnamon sugar churros with chocolate and cajeta dipping sauces", price: 10, image: food3, category: "Dessert", prepTime: 8 },
      { id: "m28", name: "Guacamole Tableside", description: "Fresh avocado, serrano, lime, prepared at your table", price: 14, image: food4, category: "Starter", popular: true, prepTime: 5 },
    ],
  },
  {
    id: "8",
    name: "Maharaja Palace",
    location: "Midtown, Manhattan",
    rating: 4.6,
    reviewCount: 198,
    priceRange: "$$$",
    cuisine: "Indian",
    description: "Royal Indian dining with recipes from the palaces of Rajasthan. Tandoor specialties and aromatic curries in an opulent setting.",
    image: restaurant8,
    tables: [
      { id: "t26", type: "standard", seats: 2, price: 20, available: true, label: "Alcove Table for 2" },
      { id: "t27", type: "standard", seats: 4, price: 35, available: true, label: "Main Hall for 4" },
      { id: "t28", type: "vip", seats: 6, price: 85, available: true, label: "Maharaja Room for 6" },
      { id: "t29", type: "group", seats: 12, price: 140, available: true, label: "Banquet for 12" },
    ],
    menu: [
      { id: "m29", name: "Lamb Rogan Josh", description: "Slow-cooked Kashmiri lamb in aromatic spices and yogurt", price: 28, image: food1, category: "Main", popular: true, prepTime: 20 },
      { id: "m30", name: "Butter Chicken", description: "Tandoori chicken in creamy tomato-cashew sauce with naan", price: 24, image: food2, category: "Main", popular: true, prepTime: 15 },
      { id: "m31", name: "Gulab Jamun", description: "Rose-scented milk dumplings in cardamom syrup", price: 10, image: food3, category: "Dessert", prepTime: 5 },
      { id: "m32", name: "Samosa Chaat", description: "Crispy samosas topped with chutneys, yogurt, and pomegranate", price: 12, image: food4, category: "Starter", prepTime: 8 },
    ],
  },
];

export const sampleBookings: Booking[] = [
  {
    id: "b1",
    restaurantId: "1",
    restaurantName: "The Grand Terrace",
    restaurantImage: restaurant1,
    date: "2026-04-10",
    time: "19:00",
    duration: 2,
    guests: 2,
    table: { id: "t1", type: "standard", seats: 2, price: 25, available: true, label: "Window Table for 2" },
    foodItems: [
      { item: { id: "m1", name: "Wagyu Steak", description: "", price: 85, image: food1, category: "Main" }, quantity: 1 },
      { item: { id: "m4", name: "Caesar Salad", description: "", price: 18, image: food4, category: "Starter" }, quantity: 2 },
    ],
    totalPrice: 146,
    status: "confirmed",
  },
  {
    id: "b2",
    restaurantId: "3",
    restaurantName: "Oceana Beach Club",
    restaurantImage: restaurant3,
    date: "2026-03-28",
    time: "20:00",
    duration: 1.5,
    guests: 4,
    table: { id: "t11", type: "standard", seats: 4, price: 50, available: true, label: "Deck Table for 4" },
    foodItems: [],
    totalPrice: 50,
    status: "confirmed",
  },
];
