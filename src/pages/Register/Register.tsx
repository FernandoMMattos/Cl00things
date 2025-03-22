import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/services/registerService";
import RegisterForm from "@/components/Register";

interface FormDataType {
  email: string;
  password: string;
  confirmPassword: string;
  fname: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    confirmPassword: "",
    fname: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Handles all input changes dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 🔹 Validates form fields before submission
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
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, { position: "bottom-left" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      onNavigateToLogin={() => navigate("/login")}
    />
  );
};

export default RegisterPage;
