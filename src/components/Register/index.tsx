"use client"
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import styles from "./Register.module.css";

interface RegisterFormProps {
  formData: {
    fname: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  onNavigateToLogin: () => void;
}

const RegisterForm = ({
  formData,
  onChange,
  onSubmit,
  loading = false,
  onNavigateToLogin,
}: RegisterFormProps) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Card className={styles.card}>
        <CardTitle className={styles.card_title}>
          Register your account
        </CardTitle>

        <Label htmlFor="fname" className={styles.label}>
          Name
        </Label>
        <Input
          id="fname"
          name="fname"
          value={formData.fname}
          onChange={onChange}
          required
          className={styles.input}
        />

        <Label htmlFor="email" className={styles.label}>
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          className={styles.input}
          required
        />

        <Label htmlFor="password" className={styles.label}>
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={onChange}
          className={styles.input}
          required
        />

        <Label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={onChange}
          className={styles.input}
          required
        />

        <Button type="submit" disabled={loading} className={styles.btn}>
          {loading ? "Registering..." : "Register"}
        </Button>

        <p className={styles.p}>
          Already have an account?
          <span onClick={onNavigateToLogin} className={styles.span}>
            Sign In
          </span>
        </p>
      </Card>
    </form>
  );
};

export default RegisterForm;
