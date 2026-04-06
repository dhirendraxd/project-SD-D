import { FormEvent, useMemo, useState } from "react";
import { Bell, CalendarDays, Clock, Plus, Users, X } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { restaurants } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Dashboard = () => {
  const {
    bookings,
    cancelBooking,
    acceptBooking,
    ownerRestaurantId,
    ownerTablesByRestaurant,
    ownerServicesByRestaurant,
    dashboardNotifications,
    addOwnerTable,
    addOwnerService,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useBooking();
  const { user } = useAuth();

  const [tableLabel, setTableLabel] = useState("");
  const [tableSeats, setTableSeats] = useState("2");
  const [tablePrice, setTablePrice] = useState("20");
  const [tableType, setTableType] = useState("standard");

  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("10");

  const ownerBookings = bookings.filter((b) => b.restaurantId === ownerRestaurantId);
  const pendingReservations = ownerBookings.filter((b) => b.status === "pending");
  const upcoming = ownerBookings.filter((b) => b.status === "confirmed" && new Date(b.date) >= new Date());
  const past = ownerBookings.filter((b) => b.status === "cancelled" || new Date(b.date) < new Date());

  const ownerTables = ownerTablesByRestaurant[ownerRestaurantId] || [];
  const ownerServices = ownerServicesByRestaurant[ownerRestaurantId] || [];
  const ownerRestaurant = restaurants.find((restaurant) => restaurant.id === ownerRestaurantId);

  const ownerNotifications = useMemo(
    () => dashboardNotifications.filter((notification) => notification.restaurantId === ownerRestaurantId),
    [dashboardNotifications, ownerRestaurantId]
  );
  const unreadNotifications = ownerNotifications.filter((notification) => !notification.read).length;

  const statusColor = (s: string) => {
    if (s === "confirmed") return "bg-success text-success-foreground";
    if (s === "pending") return "bg-warm text-warm-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  const BookingCard = ({ booking }: { booking: (typeof bookings)[number] }) => (
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
          {booking.status === "pending" && (
            <Button
              variant="default"
              size="sm"
              className="mt-3"
              onClick={async () => {
                try {
                  await acceptBooking(booking.id);
                  toast.success("Reservation accepted");
                } catch (error) {
                  console.error(error);
                  toast.error("Could not accept reservation");
                }
              }}
            >
              Accept Reservation
            </Button>
          )}
          {booking.status !== "cancelled" && (
            <Button
              variant="outline"
              size="sm"
              className="mt-3 text-destructive"
              onClick={async () => {
                try {
                  await cancelBooking(booking.id);
                  toast.success("Reservation cancelled");
                } catch (error) {
                  console.error(error);
                  toast.error("Could not cancel booking");
                }
              }}
            >
              <X className="h-3 w-3 mr-1" /> Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const handleAddTable = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const seats = Number(tableSeats);
    const price = Number(tablePrice);

    if (!tableLabel.trim() || Number.isNaN(seats) || Number.isNaN(price) || seats < 1 || price < 0) {
      toast.error("Please provide valid table details");
      return;
    }

    try {
      await addOwnerTable(ownerRestaurantId, {
        label: tableLabel,
        seats,
        price,
        type: tableType,
      });

      setTableLabel("");
      setTableSeats("2");
      setTablePrice("20");
      setTableType("standard");
      toast.success("Table added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Could not add table");
    }
  };

  const handleAddService = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const price = Number(servicePrice);

    if (!serviceName.trim() || Number.isNaN(price) || price < 0) {
      toast.error("Please provide valid service details");
      return;
    }

    try {
      await addOwnerService(ownerRestaurantId, {
        name: serviceName,
        description: serviceDescription,
        price,
      });

      setServiceName("");
      setServiceDescription("");
      setServicePrice("10");
      toast.success("Service added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Could not add service");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 section-padding max-w-5xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Welcome, {user?.displayName || user?.email}. Manage restaurant operations and reservations.
        </p>

        <div className="rounded-xl border border-border bg-card p-4 mb-8">
          <p className="text-sm text-muted-foreground">Assigned restaurant</p>
          <p className="text-foreground font-semibold mt-1">
            {ownerRestaurant?.name || "Loading restaurant profile..."}
          </p>
        </div>

        <Tabs defaultValue="owner">
          <TabsList className="mb-6">
            <TabsTrigger value="owner">Owner Console</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingReservations.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="owner" className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" /> Reservation notifications
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    try {
                      await markAllNotificationsAsRead(ownerRestaurantId);
                    } catch (error) {
                      console.error(error);
                      toast.error("Could not update notifications");
                    }
                  }}
                  disabled={ownerNotifications.length === 0 || unreadNotifications === 0}
                >
                  Mark all as read
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {ownerRestaurant?.name} has {ownerNotifications.length} notifications, {unreadNotifications} unread.
              </p>

              {ownerNotifications.length === 0 ? (
                <p className="text-muted-foreground">No reservations yet.</p>
              ) : (
                <div className="space-y-2">
                  {ownerNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border border-border p-3 ${notification.read ? "bg-background" : "bg-primary/5"}`}
                    >
                      <p className="text-sm text-foreground">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.createdAt).toLocaleString()}
                        </span>
                        {!notification.read && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              try {
                                await markNotificationAsRead(notification.id);
                              } catch (error) {
                                console.error(error);
                                toast.error("Could not mark notification as read");
                              }
                            }}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading font-semibold text-foreground mb-4">Add table</h3>
                <form className="space-y-3" onSubmit={handleAddTable}>
                  <Input placeholder="Table label" value={tableLabel} onChange={(event) => setTableLabel(event.target.value)} />
                  <Input type="number" min={1} placeholder="Seats" value={tableSeats} onChange={(event) => setTableSeats(event.target.value)} />
                  <Input type="number" min={0} placeholder="Price" value={tablePrice} onChange={(event) => setTablePrice(event.target.value)} />
                  <Input placeholder="Type (standard, vip, group)" value={tableType} onChange={(event) => setTableType(event.target.value)} />
                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-1" /> Add Table
                  </Button>
                </form>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading font-semibold text-foreground mb-4">Add service</h3>
                <form className="space-y-3" onSubmit={handleAddService}>
                  <Input placeholder="Service name" value={serviceName} onChange={(event) => setServiceName(event.target.value)} />
                  <Textarea
                    placeholder="Service description"
                    value={serviceDescription}
                    onChange={(event) => setServiceDescription(event.target.value)}
                  />
                  <Input type="number" min={0} placeholder="Service price" value={servicePrice} onChange={(event) => setServicePrice(event.target.value)} />
                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-1" /> Add Service
                  </Button>
                </form>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading font-semibold text-foreground mb-4">Tables</h3>
                {ownerTables.length === 0 ? (
                  <p className="text-muted-foreground">No tables created yet.</p>
                ) : (
                  <div className="space-y-2">
                    {ownerTables.map((table) => (
                      <div key={table.id} className="border border-border p-3">
                        <p className="font-medium text-foreground">{table.label}</p>
                        <p className="text-sm text-muted-foreground">{table.seats} seats · {table.type} · ${table.price}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading font-semibold text-foreground mb-4">Services</h3>
                {ownerServices.length === 0 ? (
                  <p className="text-muted-foreground">No services added yet.</p>
                ) : (
                  <div className="space-y-2">
                    {ownerServices.map((service) => (
                      <div key={service.id} className="border border-border p-3">
                        <p className="font-medium text-foreground">{service.name} · ${service.price}</p>
                        <p className="text-sm text-muted-foreground">{service.description || "No description"}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingReservations.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No pending reservations</p>
            ) : (
              pendingReservations.map((b) => <BookingCard key={b.id} booking={b} />)
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcoming.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No upcoming reservations</p>
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
    </div>
  );
};

export default Dashboard;
