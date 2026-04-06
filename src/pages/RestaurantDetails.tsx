import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Users, Plus, Minus, ChefHat } from "lucide-react";
import { restaurants } from "@/data/mockData";
import { useBooking } from "@/context/BookingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { booking, setBooking, addFoodItem, removeFoodItem } = useBooking();
  const restaurant = restaurants.find((r) => r.id === id);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(1);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Restaurant not found</p>
      </div>
    );
  }

  const timeSlots = ["12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

  const handleSelectTable = (table: typeof restaurant.tables[0]) => {
    if (!table.available) return;
    setBooking((prev) => ({
      ...prev,
      restaurantId: restaurant.id,
      table: prev.table?.id === table.id ? null : table,
    }));
  };

  const handleProceed = () => {
    if (!booking.table) {
      toast.error("Please select a table");
      return;
    }
    if (!selectedDate || !selectedTime) {
      toast.error("Please select date and time");
      return;
    }
    setBooking((prev) => ({
      ...prev,
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration,
      step: 5,
    }));
    navigate(`/booking/${restaurant.id}`);
  };

  const foodOrderCount = (itemId: string) =>
    booking.foodOrders.find((o) => o.item.id === itemId)?.quantity || 0;

  const categories = [...new Set(restaurant.menu.map((m) => m.category))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Banner */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute bottom-6 left-0 right-0 section-padding">
          <Badge className="mb-2 bg-primary text-primary-foreground">{restaurant.cuisine}</Badge>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">{restaurant.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-primary-foreground/80 text-sm">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{restaurant.location}</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-warm text-warm" />{restaurant.rating} ({restaurant.reviewCount} reviews)</span>
            <span>{restaurant.priceRange}</span>
          </div>
        </div>
      </div>

      <div className="section-padding py-10">
        <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-7 mb-10">{restaurant.description}</p>

        {/* Date & Time */}
        <div className="mb-10 rounded-none border border-border bg-card p-5 md:p-6">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" /> Select Date & Time
          </h2>
          <p className="text-sm text-muted-foreground mb-5">Pick one date, one time, and how long you want the table for.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date</label>
              <Input
                type="date"
                className="h-11 text-base rounded-none"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Time</label>
              <select
                className="w-full h-11 border border-input bg-background px-3 text-base text-foreground rounded-none"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select time</option>
                {timeSlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
              <select
                className="w-full h-11 border border-input bg-background px-3 text-base text-foreground rounded-none"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(Number(e.target.value))}
              >
              <option value={1}>1 hour</option>
              <option value={1.5}>1.5 hours</option>
              <option value={2}>2 hours</option>
              <option value={3}>3 hours</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">Available times are shown in a simple selector to keep booking fast.</div>
        </div>

        {/* Tables */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" /> Choose Your Table
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurant.tables.map((table) => (
              <button
                key={table.id}
                disabled={!table.available}
                onClick={() => handleSelectTable(table)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  booking.table?.id === table.id
                    ? "border-primary bg-primary/5 card-shadow"
                    : table.available
                    ? "border-border hover:border-primary/50 bg-card"
                    : "border-border bg-muted opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">{table.label}</span>
                  {table.type === "vip" && <Badge variant="secondary" className="text-xs">VIP</Badge>}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{table.seats} seats</span>
                  <span className="font-semibold text-primary">${table.price}</span>
                </div>
                {!table.available && <span className="text-xs text-destructive mt-1 block">Unavailable</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="mb-10">
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" /> Pre-Order Food
            <span className="text-sm font-body font-normal text-muted-foreground">(Optional)</span>
          </h2>
          {categories.map((cat) => (
            <div key={cat} className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">{cat}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurant.menu
                  .filter((m) => m.category === cat)
                  .map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-border bg-card hover:card-shadow transition-all">
                      <img src={item.image} alt={item.name} loading="lazy" width={512} height={512} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{item.name}</h4>
                          {item.popular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                        </div>
                        <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold text-primary">${item.price}</span>
                          {item.prepTime && <span className="text-xs text-muted-foreground">{item.prepTime} min</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {foodOrderCount(item.id) > 0 && (
                          <>
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => removeFoodItem(item.id)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-semibold text-sm w-4 text-center">{foodOrderCount(item.id)}</span>
                          </>
                        )}
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => addFoodItem(item)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proceed */}
        <div className="sticky bottom-4 bg-card border border-border rounded-none p-4 card-shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="text-sm md:text-base text-muted-foreground">
              {booking.table ? booking.table.label : "No table selected"}
              {booking.foodOrders.length > 0 && ` + ${booking.foodOrders.length} food item(s)`}
            </span>
            <p className="text-xl md:text-2xl font-heading font-bold text-foreground">
              Total: <span className="text-primary">${booking.table ? (booking.table.price + booking.foodOrders.reduce((s, o) => s + o.item.price * o.quantity, 0)) : 0}</span>
            </p>
          </div>
          <Button onClick={handleProceed} size="lg" className="rounded-none h-11 px-6">
            Review & Book
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RestaurantDetails;
