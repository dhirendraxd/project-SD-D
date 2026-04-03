import { Link, useLocation } from "react-router-dom";
import { UtensilsCrossed, User, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHome ? "bg-transparent" : "bg-background/95 backdrop-blur-md border-b border-border"}`}>
      <div className="section-padding flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <UtensilsCrossed className={`h-6 w-6 ${isHome ? "text-primary-foreground" : "text-primary"}`} />
          <span className={`font-heading text-xl font-bold ${isHome ? "text-primary-foreground" : "text-foreground"}`}>
            TableBook
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button variant={isHome ? "ghost" : "outline"} size="sm" className={isHome ? "text-primary-foreground hover:bg-primary-foreground/10" : ""}>
              <CalendarDays className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">My Bookings</span>
            </Button>
          </Link>
          <Button variant={isHome ? "secondary" : "default"} size="sm">
            <User className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Sign In</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
