import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, Star, MapPin } from "lucide-react";
import { restaurants } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import RestaurantCard from "@/components/RestaurantCard";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const cuisines = [...new Set(restaurants.map((r) => r.cuisine))];
const priceRanges = [...new Set(restaurants.map((r) => r.priceRange))];
const locations = [...new Set(restaurants.map((r) => r.location))];

const Restaurants = () => {
  const [searchParams] = useSearchParams();
  const initialLocation = searchParams.get("location") || "";
  const initialDate = searchParams.get("date") || "";
  const initialGuests = Number(searchParams.get("guests") || "2");

  const [query, setQuery] = useState(initialLocation);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(true);

  const normalizedLocation = initialLocation.trim().toLowerCase();
  const selectedGuestCount = Number.isFinite(initialGuests) && initialGuests > 0 ? initialGuests : 2;

  const toggle = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const activeFilterCount =
    selectedCuisines.length + selectedPrices.length + selectedLocations.length + (minRating > 0 ? 1 : 0);

  const clearAll = () => {
    setQuery("");
    setSelectedCuisines([]);
    setSelectedPrices([]);
    setSelectedLocations([]);
    setMinRating(0);
  };

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      if (query && !r.name.toLowerCase().includes(query.toLowerCase()) && !r.cuisine.toLowerCase().includes(query.toLowerCase()) && !r.location.toLowerCase().includes(query.toLowerCase())) return false;
      if (normalizedLocation && !r.location.toLowerCase().includes(normalizedLocation) && !r.name.toLowerCase().includes(normalizedLocation)) return false;
      if (selectedCuisines.length && !selectedCuisines.includes(r.cuisine)) return false;
      if (selectedPrices.length && !selectedPrices.includes(r.priceRange)) return false;
      if (selectedLocations.length && !selectedLocations.includes(r.location)) return false;
      if (minRating > 0 && r.rating < minRating) return false;
      if (selectedGuestCount > 0 && !r.tables.some((table) => table.available && table.seats >= selectedGuestCount)) return false;
      return true;
    });
  }, [query, normalizedLocation, selectedCuisines, selectedPrices, selectedLocations, minRating, selectedGuestCount]);

  const ratingOptions = [4.5, 4.0, 3.5];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 section-padding">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-1">
              Explore Restaurants
            </h1>
            <p className="text-muted-foreground text-sm">
              {filtered.length} restaurant{filtered.length !== 1 ? "s" : ""} found
            </p>
            {(initialLocation || initialDate || searchParams.get("guests")) && (
              <p className="text-xs text-muted-foreground mt-2">
                Search applied: {initialLocation || "any location"} · {initialDate || "any date"} · {selectedGuestCount} guest{selectedGuestCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="self-start sm:self-auto"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, cuisine, or location..."
            className="pl-10 pr-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="rounded-xl border border-border bg-card p-5 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground text-sm">Filter by</h3>
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs text-muted-foreground">
                  Clear all
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Cuisine */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Cuisine</p>
                <div className="flex flex-wrap gap-2">
                  {cuisines.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggle(selectedCuisines, c, setSelectedCuisines)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedCuisines.includes(c)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Price Range</p>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((p) => (
                    <button
                      key={p}
                      onClick={() => toggle(selectedPrices, p, setSelectedPrices)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedPrices.includes(p)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Min Rating</p>
                <div className="flex flex-wrap gap-2">
                  {ratingOptions.map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(minRating === r ? 0 : r)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                        minRating === r
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      <Star className="h-3 w-3" /> {r}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Location</p>
                <div className="flex flex-wrap gap-2">
                  {locations.map((l) => (
                    <button
                      key={l}
                      onClick={() => toggle(selectedLocations, l, setSelectedLocations)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                        selectedLocations.includes(l)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      <MapPin className="h-3 w-3" /> {l.split(",")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-2">No restaurants match your filters</p>
            <Button variant="outline" onClick={clearAll}>Clear filters</Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Restaurants;
