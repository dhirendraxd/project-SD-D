import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PartnerWithUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 section-padding max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Partner With Us</h1>
          <p className="text-muted-foreground">Join TableBook as a restaurant partner and manage reservations from your dashboard.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 space-y-3 text-sm text-muted-foreground">
          <p>Restaurant partners get an assigned restaurant profile, dashboard access, and Firestore-backed reservation management.</p>
          <p>To onboard a restaurant owner, sign in with Google and open the Admin Panel.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PartnerWithUs;
