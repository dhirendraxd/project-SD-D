import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 section-padding max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Help Center</h1>
          <p className="text-muted-foreground">Contact support for booking, dashboard, and restaurant management help.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 space-y-3">
          <p className="text-sm text-muted-foreground">Email: support@tablebook.example</p>
          <p className="text-sm text-muted-foreground">Hours: Mon-Fri, 9am-6pm</p>
          <p className="text-sm text-muted-foreground">For restaurant owner issues, use the Admin Panel link in the footer.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Support;
