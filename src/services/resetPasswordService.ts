import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export const sendEmailForResetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "auth/user-not-found"
    ) {
      throw new Error("Email not registered");
    }
    throw error;
  }
};
