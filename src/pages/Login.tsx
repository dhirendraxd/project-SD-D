import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Chrome } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in successfully");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 section-padding">
        <div className="max-w-md mx-auto border border-border bg-card p-8">
          <h1 className="text-2xl font-heading font-bold text-foreground">Sign In</h1>
          <p className="text-muted-foreground mt-2 mb-6">
            Continue with Google to manage your dashboard.
          </p>

          <Button className="w-full" onClick={handleGoogleLogin}>
            <Chrome className="h-4 w-4 mr-2" />
            Continue with Google
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
