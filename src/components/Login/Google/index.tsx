"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SigninGoogle } from "@/services/loginService";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import styles from "./Google.module.css";
import { useRouter } from "next/navigation";

const LoginGoogle = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await SigninGoogle();
      toast.success("Login successful", { position: "bottom-left" });
      router.replace("/home");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <FcGoogle size={20} />
      <span>{loading ? "Signing in..." : "Sign In with Google"}</span>
    </Button>
  );
};

export default LoginGoogle;
