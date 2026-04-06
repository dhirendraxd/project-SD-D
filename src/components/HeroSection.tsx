import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, CalendarDays, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location.trim()) params.set("location", location.trim());
    if (date.trim()) params.set("date", date.trim());
    if (guests.trim()) params.set("guests", guests.trim());

    navigate(`/restaurants?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Luxury hotel" className="w-full h-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      <div className="relative section-padding w-full pt-24 pb-16">
        <div className="max-w-2xl animate-slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight tracking-tight mb-4">
            Book the best tables in beautiful restaurants
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 font-body max-w-xl">
            Discover top dining spots, reserve your table, and pre-order your meal for a seamless experience.
          </p>
        </div>

        <div className="mt-8 bg-background/95 backdrop-blur-sm border border-border rounded-none p-5 md:p-6 max-w-4xl animate-fade-in">
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-5">Start your search</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location"
                className="pl-10 h-11 text-base"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="mm/dd/yyyy"
                className="pl-10 h-11 text-base"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                min="1"
                max="20"
                placeholder="Guests"
                className="pl-10 h-11 text-base"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch} className="w-full h-11 text-base rounded-none">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
