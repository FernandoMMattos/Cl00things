import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";

const useUserID = () => {
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : "");
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { userId, loading };
};

export default useUserID;
