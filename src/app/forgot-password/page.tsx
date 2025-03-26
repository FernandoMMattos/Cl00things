"use client";
import styles from "./forgotPassword.module.css";
import { useState } from "react";
import { sendEmailForResetPassword } from "@/services/resetPasswordService";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@/components/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleReset = async () => {
    if (!email.trim()) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      await sendEmailForResetPassword(email);
      setSuccess("Password reset email sent. Check your inbox.");
      setTimeout(() => router.replace("/login"), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Cl00things</h1>
      <Label className={styles.label}>Forgot your password?</Label>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        className={styles.input}
      />
      <div className={styles.div}>
        <Button onClick={handleReset} className={styles.btn} disabled={loading}>
          {loading ? "Sending..." : "Send Email"}
        </Button>
        <Button
          onClick={() => router.replace("/login")}
          className={styles.btn}
          disabled={loading}
        >
          Back
        </Button>
      </div>

      {error && (
        <p className={styles.error} aria-live="polite">
          {error}
        </p>
      )}
      {success && (
        <p className={styles.success} aria-live="polite">
          {success}
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
