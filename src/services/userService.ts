import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const getUserName = async (userId: string): Promise<string | null> => {
  if (!userId) {
    console.error("getUserName: No userId provided");
    return null;
  }

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.warn(`getUserName: User ${userId} not found in Firestore`);
      return null;
    }

    const userData = userSnap.data();

    return userData?.firstName ?? null;
  } catch (error) {
    console.error("getUserName: Error fetching user name:", error);
    return null;
  }
};

export default getUserName;
