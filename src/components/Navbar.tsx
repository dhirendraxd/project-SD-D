import { Link, useLocation } from "react-router-dom";
import { UtensilsCrossed, User, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out");
    } catch (error) {
      console.error(error);
      toast.error("Could not sign out. Try again.");
    }
  };

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
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </Link>
          {user ? (
            <Button variant={isHome ? "secondary" : "default"} size="sm" onClick={handleLogout}>
              <User className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          ) : (
            <Link to="/login">
              <Button variant={isHome ? "secondary" : "default"} size="sm">
                <User className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
