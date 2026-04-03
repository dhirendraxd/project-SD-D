import { CalendarDays, Clock, Users, X } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { bookings, cancelBooking } = useBooking();

  const upcoming = bookings.filter((b) => b.status !== "cancelled" && new Date(b.date) >= new Date());
  const past = bookings.filter((b) => b.status === "cancelled" || new Date(b.date) < new Date());

  const statusColor = (s: string) => {
    if (s === "confirmed") return "bg-success text-success-foreground";
    if (s === "pending") return "bg-warm text-warm-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  const BookingCard = ({ booking }: { booking: typeof bookings[0] }) => (
    <div className="rounded-xl border border-border bg-card overflow-hidden card-shadow">
      <div className="flex flex-col sm:flex-row">
        <img src={booking.restaurantImage} alt={booking.restaurantName} className="sm:w-40 h-32 sm:h-auto object-cover" />
        <div className="p-4 flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-semibold text-foreground">{booking.restaurantName}</h3>
            <Badge className={statusColor(booking.status)}>{booking.status}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{booking.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{booking.time} · {booking.duration}h</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{booking.table.label}</span>
            <span className="font-semibold text-primary">${booking.totalPrice}</span>
          </div>
          {booking.foodItems.length > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              🍽️ {booking.foodItems.map((f) => `${f.item.name} ×${f.quantity}`).join(", ")}
            </p>
          )}
          {booking.status === "confirmed" && (
            <Button variant="outline" size="sm" className="mt-3 text-destructive" onClick={() => cancelBooking(booking.id)}>
              <X className="h-3 w-3 mr-1" /> Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 section-padding max-w-3xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">My Bookings</h1>
        <p className="text-muted-foreground mb-8">Manage your reservations</p>

        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcoming.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No upcoming bookings</p>
            ) : (
              upcoming.map((b) => <BookingCard key={b.id} booking={b} />)
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {past.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No past bookings</p>
            ) : (
              past.map((b) => <BookingCard key={b.id} booking={b} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
