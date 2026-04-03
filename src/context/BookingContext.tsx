import React, { createContext, useContext, useState, ReactNode } from "react";
import { Table, MenuItem, Booking, sampleBookings } from "@/data/mockData";

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

interface BookingContextType {
  booking: BookingState;
  setBooking: React.Dispatch<React.SetStateAction<BookingState>>;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (id: string) => void;
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
  const [booking, setBooking] = useState<BookingState>(initialBooking);
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);

  const addBooking = (newBooking: Booking) => {
    setBookings((prev) => [...prev, newBooking]);
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b))
    );
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
      value={{ booking, setBooking, bookings, addBooking, cancelBooking, resetBooking, addFoodItem, removeFoodItem, getTotalPrice }}
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
