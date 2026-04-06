import { useParams, useNavigate } from "react-router-dom";
import { CalendarDays, Clock, Users, UtensilsCrossed, Check } from "lucide-react";
import { restaurants } from "@/data/mockData";
import { useBooking } from "@/context/BookingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BookingSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { booking, addBooking, resetBooking, getTotalPrice } = useBooking();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant || !booking.table) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No booking in progress</p>
          <Button onClick={() => navigate("/restaurants")}>Browse Restaurants</Button>
        </div>
      </div>
    );
  }

  const handleConfirm = async () => {
    const newBooking = {
      id: `b${Date.now()}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantImage: restaurant.image,
      date: booking.date,
      time: booking.time,
      duration: booking.duration,
      guests: booking.table!.seats,
      table: booking.table!,
      foodItems: booking.foodOrders,
      totalPrice: getTotalPrice(),
      status: "pending" as const,
    };

    try {
      await addBooking(newBooking);
      resetBooking();
      toast.success("Booking request submitted! Waiting for restaurant approval.");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Could not save booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 section-padding max-w-2xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Review Your Booking</h1>
        <p className="text-muted-foreground mb-8">Please review the details before confirming</p>

        <div className="space-y-6">
          {/* Restaurant */}
          <div className="rounded-xl border border-border overflow-hidden bg-card">
            <img src={restaurant.image} alt={restaurant.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="font-heading text-xl font-semibold text-foreground">{restaurant.name}</h2>
              <p className="text-muted-foreground text-sm">{restaurant.location}</p>
            </div>
          </div>

          {/* Details */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold text-foreground">{booking.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time & Duration</p>
                <p className="font-semibold text-foreground">{booking.time} · {booking.duration} hr(s)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Table</p>
                <p className="font-semibold text-foreground">{booking.table.label}</p>
              </div>
            </div>
          </div>

          {/* Food Orders */}
          {booking.foodOrders.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4 text-primary" /> Pre-Ordered Food
              </h3>
              <div className="space-y-3">
                {booking.foodOrders.map((order) => (
                  <div key={order.item.id} className="flex items-center justify-between">
                    <span className="text-foreground">
                      {order.item.name} × {order.quantity}
                    </span>
                    <span className="font-semibold text-foreground">${order.item.price * order.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="rounded-xl border-2 border-primary bg-primary/5 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Table reservation</p>
                <p className="font-semibold text-foreground">${booking.table.price}</p>
              </div>
              {booking.foodOrders.length > 0 && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Food pre-order</p>
                  <p className="font-semibold text-foreground">
                    ${booking.foodOrders.reduce((s, o) => s + o.item.price * o.quantity, 0)}
                  </p>
                </div>
              )}
            </div>
            <div className="border-t border-primary/20 mt-4 pt-4 flex items-center justify-between">
              <span className="text-lg font-heading font-bold text-foreground">Total</span>
              <span className="text-2xl font-heading font-bold text-primary">${getTotalPrice()}</span>
            </div>
          </div>

          <Button onClick={handleConfirm} size="lg" className="w-full">
            <Check className="h-4 w-4 mr-2" /> Confirm Booking
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingSummary;
