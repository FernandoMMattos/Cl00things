import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useUserID = () => {
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserID(user ? user.uid : "");
    });

    return () => unsubscribe();
  }, []);

  return userID;
};

export default useUserID;
