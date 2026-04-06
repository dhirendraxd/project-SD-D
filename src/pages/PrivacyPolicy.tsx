import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 section-padding max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">This demo stores booking and dashboard data in Firebase Firestore for the authenticated user.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 space-y-3 text-sm text-muted-foreground">
          <p>We use Firebase Authentication for login and Firestore to store reservations, owner tables, services, and notifications.</p>
          <p>Data is scoped to the signed-in user unless explicitly shared through the app experience.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
