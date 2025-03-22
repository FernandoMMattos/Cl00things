import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SigninGoogle } from "@/services/loginService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc"; // Using react-icons for Google logo
import styles from "./Google.module.css";

const LoginGoogle = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await SigninGoogle();
      toast.success("Login successful", { position: "bottom-left" });
      navigate("/home");
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        position: "bottom-left",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} className={styles.btn} disabled={loading}>
      <FcGoogle size={20} /> {/* Google icon */}
      <span>{loading ? "Signing in..." : "Sign In with Google"}</span>
    </Button>
  );
};

export default LoginGoogle;
