import { restaurants } from "@/data/mockData";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeaturedRestaurants = () => {
  return (
    <section className="py-20">
      <div className="section-padding">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Top restaurants
          </h2>
          <Link to="/restaurants">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
