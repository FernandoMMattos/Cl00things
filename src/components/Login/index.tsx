"use client"
import { useCallback } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import LoginGoogle from "./Google";
import styles from "./Login.module.css";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm = ({ formData, onChange, onSubmit }: LoginFormProps) => {
  const router = useRouter();

  const goToRegister = useCallback(() => router.push("/register"), [router]);
  const goToForgotPassword = useCallback(
    () => router.push("/forgot-password"),
    [router]
  );

  return (
    <section className={styles.section}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1 className={styles.title}>Welcome to Cl00things</h1>

        <Label className={styles.label} htmlFor="email">
          Email
        </Label>
        <Input
          className={styles.input}
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
          autoComplete="email"
        />

        <Label className={styles.label} htmlFor="password">
          Password
        </Label>
        <Input
          className={styles.input}
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          required
          autoComplete="current-password"
        />

        <button
          type="button"
          className={styles.forgot_password}
          onClick={goToForgotPassword}
        >
          Forgot your password?
        </button>

        <div className={styles.div}>
          <Button className={styles.btn} type="submit">
            Login
          </Button>
          <Button className={styles.btn} type="button" onClick={goToRegister}>
            Register
          </Button>
        </div>

        <Separator className={styles.separator} />
        <LoginGoogle />
      </form>
    </section>
  );
};

export default LoginForm;
