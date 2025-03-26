import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { auth, db } from "../firebaseConfig";

export const registerUser = async (
  email: string,
  password: string,
  confirmPassword: string,
  fname: string
): Promise<void> => {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      firstName: fname,
      createdAt: new Date().toISOString(),
    });

    console.log("User created:", user);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error("Firebase Error:", error.code, error.message);
      throw new Error(error.message);
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};
