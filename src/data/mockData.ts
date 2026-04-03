import restaurant1 from "@/assets/restaurant-1.jpg";
import restaurant2 from "@/assets/restaurant-2.jpg";
import restaurant3 from "@/assets/restaurant-3.jpg";
import restaurant4 from "@/assets/restaurant-4.jpg";
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
