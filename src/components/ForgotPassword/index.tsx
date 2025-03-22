import styles from "./forgotPassword.module.css";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { sendEmailForResetPassword } from "@/services/resetPasswordService";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

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
      setTimeout(() => navigate("/login"), 2000);
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
      />

      <Button onClick={handleReset} className={styles.btn} disabled={loading}>
        {loading ? "Sending..." : "Send Email"}
      </Button>
      <Button
        onClick={() => navigate("/login")}
        className={styles.btn}
        disabled={loading}
      >
        Back
      </Button>

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
