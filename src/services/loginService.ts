import { auth } from "@/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const SignInUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const SigninGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export const SignOutUser = async () => {
  return signOut(auth);
};
