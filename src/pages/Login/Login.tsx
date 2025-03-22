import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignInUser } from "@/services/loginService";
import { FirebaseError } from "firebase/app";
import LoginForm from "@/components/Login";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await SignInUser(email, password);
      console.log("User logged in");
      navigate("/home");
      toast.success("User logged in", { position: "bottom-left" });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error("Firebase Error:", error.code, error.message);
        toast.error(error.message, { position: "bottom-left" });
      } else {
        console.error("Unexpected Error:", error);
        toast.error("An unexpected error occurred.", {
          position: "bottom-left",
        });
      }
    }
  };

  return (
    <div>
      <LoginForm
        formData={{ email, password }}
        onSubmit={handleSubmit}
        onChange={(e) => {
          const { name, value } = e.target;
          if (name === "email") setEmail(value);
          if (name === "password") setPassword(value);
        }}
      />
    </div>
  );
};

export default LoginPage;
