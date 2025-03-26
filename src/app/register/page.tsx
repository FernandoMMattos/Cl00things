"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/registerService";
import RegisterForm from "@/components/Register";

interface FormDataType {
  email: string;
  password: string;
  confirmPassword: string;
  fname: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    confirmPassword: "",
    fname: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.fname
    ) {
      toast.error("All fields are required!", { position: "bottom-left" });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", { position: "bottom-left" });
      return false;
    }
    return true;
  };

  // 🔹 Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await registerUser(
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.fname
      );
      toast.success("User created successfully!", { position: "bottom-left" });
      router.replace("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, { position: "bottom-left" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RegisterForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        onNavigateToLogin={() => router.replace("/")}
      />
      <ToastContainer />
    </>
  );
};

export default RegisterPage;
