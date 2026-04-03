import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { Restaurant } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="group block rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 bg-card"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          loading="lazy"
          width={640}
          height={512}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {restaurant.priceRange}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
          {restaurant.name}
        </h3>
        <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
          <MapPin className="h-3.5 w-3.5" />
          <span>{restaurant.location}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-warm text-warm" />
            <span className="font-semibold text-sm text-foreground">{restaurant.rating}</span>
            <span className="text-muted-foreground text-xs">({restaurant.reviewCount})</span>
          </div>
          <span className="text-xs text-muted-foreground">{restaurant.cuisine}</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
