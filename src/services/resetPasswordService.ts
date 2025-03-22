import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const sendEmailForResetPassword = async (email: string) => {
  const auth = getAuth();

  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Reset email sent to:", email);
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      console.error("Error: Email not registered");
      throw new Error("Email not registered");
    }
    console.error("Error sending reset email:", error.message);
    throw error;
  }
};
