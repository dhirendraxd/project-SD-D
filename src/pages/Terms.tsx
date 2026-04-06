import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 section-padding max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">These terms describe use of the TableBook demo app and its Firebase-backed features.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 space-y-3 text-sm text-muted-foreground">
          <p>Reservations may be accepted or cancelled by the restaurant owner account assigned to a restaurant.</p>
          <p>Users should keep their Firebase account secure and use the app in compliance with applicable laws.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
