import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export const SignInUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const SigninGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const { user } = result;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      firstName: user.displayName?.split(" ")[0] ?? "User",
      createdAt: new Date().toISOString(),
    });
  }
};

export const SignOutUser = async () => {
  return signOut(auth);
};
