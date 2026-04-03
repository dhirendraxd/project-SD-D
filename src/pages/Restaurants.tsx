import { restaurants } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import RestaurantCard from "@/components/RestaurantCard";
import Footer from "@/components/Footer";

const Restaurants = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 section-padding">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
          Explore Restaurants
        </h1>
        <p className="text-muted-foreground mb-8">Find and book the perfect table for any occasion</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Restaurants;
