import { UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 w-fit">
              <UtensilsCrossed className="h-5 w-5" />
              <span className="font-heading text-lg font-bold">TableBook</span>
            </Link>
            <p className="text-primary-foreground/60 text-sm">
              The easiest way to book tables and pre-order food at premium restaurants.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <div className="space-y-2 text-sm text-primary-foreground/60">
              <Link to="/restaurants" className="block hover:text-primary-foreground transition-colors">Restaurants</Link>
              <Link to="/dashboard" className="block hover:text-primary-foreground transition-colors">Dashboard</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <div className="space-y-2 text-sm text-primary-foreground/60">
              <Link to="/support" className="block hover:text-primary-foreground transition-colors">Help Center</Link>
              <Link to="/privacy-policy" className="block hover:text-primary-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="block hover:text-primary-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">For Restaurants</h4>
            <div className="space-y-2 text-sm text-primary-foreground/60">
              <Link to="/admin" className="block hover:text-primary-foreground transition-colors">Admin Panel</Link>
              <Link to="/partner-with-us" className="block hover:text-primary-foreground transition-colors">Partner With Us</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} TableBook. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
