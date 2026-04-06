import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Table, MenuItem, Booking, sampleBookings, restaurants } from "@/data/mockData";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

interface FoodOrder {
  item: MenuItem;
  quantity: number;
}

interface BookingState {
  restaurantId: string;
  table: Table | null;
  date: string;
  time: string;
  duration: number;
  guests: number;
  foodOrders: FoodOrder[];
  step: number;
}

export interface OwnerService {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface DashboardNotification {
  id: string;
  bookingId: string;
  restaurantId: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface BookingContextType {
  booking: BookingState;
  setBooking: React.Dispatch<React.SetStateAction<BookingState>>;
  bookings: Booking[];
  ownerRestaurantId: string;
  ownerTablesByRestaurant: Record<string, Table[]>;
  ownerServicesByRestaurant: Record<string, OwnerService[]>;
  dashboardNotifications: DashboardNotification[];
  addBooking: (booking: Booking) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
  acceptBooking: (id: string) => Promise<void>;
  addOwnerTable: (
    restaurantId: string,
    table: Omit<Table, "id" | "available"> & { available?: boolean }
  ) => Promise<void>;
  addOwnerService: (restaurantId: string, service: Omit<OwnerService, "id">) => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: (restaurantId: string) => Promise<void>;
  resetBooking: () => void;
  addFoodItem: (item: MenuItem) => void;
  removeFoodItem: (itemId: string) => void;
  getTotalPrice: () => number;
}

const initialBooking: BookingState = {
  restaurantId: "",
  table: null,
  date: "",
  time: "",
  duration: 1,
  guests: 2,
  foodOrders: [],
  step: 1,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [booking, setBooking] = useState<BookingState>(initialBooking);
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  const [ownerRestaurantId, setOwnerRestaurantId] = useState<string>(restaurants[0]?.id || "");
  const [ownerTablesByRestaurant, setOwnerTablesByRestaurant] = useState<Record<string, Table[]>>(
    () =>
      restaurants.reduce((acc, restaurant) => {
        acc[restaurant.id] = [...restaurant.tables];
        return acc;
      }, {} as Record<string, Table[]>)
  );
  const [ownerServicesByRestaurant, setOwnerServicesByRestaurant] = useState<Record<string, OwnerService[]>>(
    () =>
      restaurants.reduce((acc, restaurant) => {
        acc[restaurant.id] = [];
        return acc;
      }, {} as Record<string, OwnerService[]>)
  );
  const [dashboardNotifications, setDashboardNotifications] = useState<DashboardNotification[]>([]);

  const resolveRestaurantIdForOwner = (uid: string) => {
    if (!restaurants.length) return "";
    let hash = 0;
    for (let i = 0; i < uid.length; i += 1) {
      hash = (hash << 5) - hash + uid.charCodeAt(i);
      hash |= 0;
    }
    const index = Math.abs(hash) % restaurants.length;
    return restaurants[index].id;
  };

  useEffect(() => {
    if (!user) {
      setOwnerRestaurantId(restaurants[0]?.id || "");
      return;
    }

    const syncOwnerRestaurant = async () => {
      const profileRef = doc(db, "users", user.uid, "settings", "profile");
      const profileSnapshot = await getDoc(profileRef);

      if (profileSnapshot.exists()) {
        const data = profileSnapshot.data() as { restaurantId?: string };
        if (data.restaurantId) {
          setOwnerRestaurantId(data.restaurantId);
          return;
        }
      }

      const assignedRestaurantId = resolveRestaurantIdForOwner(user.uid);
      await setDoc(profileRef, { restaurantId: assignedRestaurantId }, { merge: true });
      setOwnerRestaurantId(assignedRestaurantId);
    };

    syncOwnerRestaurant().catch((error) => {
      console.error("Failed to sync owner restaurant profile", error);
    });
  }, [user]);

  useEffect(() => {
    if (!user) {
      setBookings(sampleBookings);
      return;
    }

    const bookingsRef = collection(db, "users", user.uid, "bookings");
    const unsubscribe = onSnapshot(bookingsRef, (snapshot) => {
      const syncedBookings = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data() as Omit<Booking, "id">;
        return {
          id: docSnapshot.id,
          ...data,
        };
      });
      setBookings(syncedBookings);
    });

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user) {
      setOwnerTablesByRestaurant(
        restaurants.reduce((acc, restaurant) => {
          acc[restaurant.id] = [...restaurant.tables];
          return acc;
        }, {} as Record<string, Table[]>)
      );
      return;
    }

    const tablesRef = collection(db, "users", user.uid, "ownerTables");
    const unsubscribe = onSnapshot(tablesRef, (snapshot) => {
      const grouped = restaurants.reduce((acc, restaurant) => {
        acc[restaurant.id] = [];
        return acc;
      }, {} as Record<string, Table[]>);

      snapshot.docs.forEach((docSnapshot) => {
        const data = docSnapshot.data() as Table & { restaurantId: string };
        const restaurantId = data.restaurantId;
        if (!grouped[restaurantId]) grouped[restaurantId] = [];
        grouped[restaurantId].push({
          id: docSnapshot.id,
          label: data.label,
          seats: data.seats,
          price: data.price,
          type: data.type,
          available: data.available,
        });
      });

      setOwnerTablesByRestaurant(grouped);
    });

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user) {
      setOwnerServicesByRestaurant(
        restaurants.reduce((acc, restaurant) => {
          acc[restaurant.id] = [];
          return acc;
        }, {} as Record<string, OwnerService[]>)
      );
      return;
    }

    const servicesRef = collection(db, "users", user.uid, "ownerServices");
    const unsubscribe = onSnapshot(servicesRef, (snapshot) => {
      const grouped = restaurants.reduce((acc, restaurant) => {
        acc[restaurant.id] = [];
        return acc;
      }, {} as Record<string, OwnerService[]>);

      snapshot.docs.forEach((docSnapshot) => {
        const data = docSnapshot.data() as OwnerService & { restaurantId: string };
        const restaurantId = data.restaurantId;
        if (!grouped[restaurantId]) grouped[restaurantId] = [];
        grouped[restaurantId].push({
          id: docSnapshot.id,
          name: data.name,
          description: data.description,
          price: data.price,
        });
      });

      setOwnerServicesByRestaurant(grouped);
    });

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user) {
      setDashboardNotifications([]);
      return;
    }

    const notificationsRef = query(
      collection(db, "users", user.uid, "notifications"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
      const items = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data() as Omit<DashboardNotification, "id">;
        return {
          id: docSnapshot.id,
          ...data,
        };
      });
      setDashboardNotifications(items);
    });

    return unsubscribe;
  }, [user]);

  const addBooking = async (newBooking: Booking) => {
    if (!user) {
      const localBooking = { ...newBooking, id: `local-${Date.now()}` };
      setBookings((prev) => [...prev, localBooking]);
      setDashboardNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          bookingId: localBooking.id,
          restaurantId: localBooking.restaurantId,
          message: `${localBooking.restaurantName}: New reservation for ${localBooking.table.label} on ${localBooking.date} at ${localBooking.time}`,
          createdAt: new Date().toISOString(),
          read: false,
        },
        ...prev,
      ]);
      return;
    }

    const bookingsRef = collection(db, "users", user.uid, "bookings");
    const notificationsRef = collection(db, "users", user.uid, "notifications");

    const { id, ...bookingPayload } = newBooking;
    const bookingDoc = await addDoc(bookingsRef, bookingPayload);

    await addDoc(notificationsRef, {
      bookingId: bookingDoc.id,
      restaurantId: newBooking.restaurantId,
      message: `${newBooking.restaurantName}: New reservation for ${newBooking.table.label} on ${newBooking.date} at ${newBooking.time}`,
      createdAt: new Date().toISOString(),
      read: false,
    });
  };

  const cancelBooking = async (id: string) => {
    if (!user) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b))
      );
      return;
    }

    await updateDoc(doc(db, "users", user.uid, "bookings", id), {
      status: "cancelled",
    });
  };

  const acceptBooking = async (id: string) => {
    if (!user) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "confirmed" as const } : b))
      );
      return;
    }

    await updateDoc(doc(db, "users", user.uid, "bookings", id), {
      status: "confirmed",
    });
  };

  const addOwnerTable = async (
    restaurantId: string,
    table: Omit<Table, "id" | "available"> & { available?: boolean }
  ) => {
    if (!user) {
      const newTable: Table = {
        ...table,
        id: `owner-table-${Date.now()}`,
        available: table.available ?? true,
      };

      setOwnerTablesByRestaurant((prev) => ({
        ...prev,
        [restaurantId]: [...(prev[restaurantId] || []), newTable],
      }));
      return;
    }

    await addDoc(collection(db, "users", user.uid, "ownerTables"), {
      restaurantId,
      ...table,
      available: table.available ?? true,
    });
  };

  const addOwnerService = async (restaurantId: string, service: Omit<OwnerService, "id">) => {
    if (!user) {
      const newService: OwnerService = {
        ...service,
        id: `owner-service-${Date.now()}`,
      };

      setOwnerServicesByRestaurant((prev) => ({
        ...prev,
        [restaurantId]: [...(prev[restaurantId] || []), newService],
      }));
      return;
    }

    await addDoc(collection(db, "users", user.uid, "ownerServices"), {
      restaurantId,
      ...service,
    });
  };

  const markNotificationAsRead = async (id: string) => {
    if (!user) {
      setDashboardNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
      return;
    }

    await updateDoc(doc(db, "users", user.uid, "notifications", id), {
      read: true,
    });
  };

  const markAllNotificationsAsRead = async (restaurantId: string) => {
    if (!user) {
      setDashboardNotifications((prev) =>
        prev.map((notification) =>
          notification.restaurantId === restaurantId ? { ...notification, read: true } : notification
        )
      );
      return;
    }

    const batch = writeBatch(db);
    dashboardNotifications
      .filter((notification) => notification.restaurantId === restaurantId && !notification.read)
      .forEach((notification) => {
        const notificationRef = doc(db, "users", user.uid, "notifications", notification.id);
        batch.update(notificationRef, { read: true });
      });

    await batch.commit();
  };

  const resetBooking = () => setBooking(initialBooking);

  const addFoodItem = (item: MenuItem) => {
    setBooking((prev) => {
      const existing = prev.foodOrders.find((o) => o.item.id === item.id);
      if (existing) {
        return {
          ...prev,
          foodOrders: prev.foodOrders.map((o) =>
            o.item.id === item.id ? { ...o, quantity: o.quantity + 1 } : o
          ),
        };
      }
      return { ...prev, foodOrders: [...prev.foodOrders, { item, quantity: 1 }] };
    });
  };

  const removeFoodItem = (itemId: string) => {
    setBooking((prev) => {
      const existing = prev.foodOrders.find((o) => o.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return {
          ...prev,
          foodOrders: prev.foodOrders.map((o) =>
            o.item.id === itemId ? { ...o, quantity: o.quantity - 1 } : o
          ),
        };
      }
      return { ...prev, foodOrders: prev.foodOrders.filter((o) => o.item.id !== itemId) };
    });
  };

  const getTotalPrice = () => {
    const tablePrice = booking.table?.price || 0;
    const foodPrice = booking.foodOrders.reduce((sum, o) => sum + o.item.price * o.quantity, 0);
    return tablePrice + foodPrice;
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setBooking,
        bookings,
        ownerRestaurantId,
        ownerTablesByRestaurant,
        ownerServicesByRestaurant,
        dashboardNotifications,
        addBooking,
        cancelBooking,
        acceptBooking,
        addOwnerTable,
        addOwnerService,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        resetBooking,
        addFoodItem,
        removeFoodItem,
        getTotalPrice,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
};
