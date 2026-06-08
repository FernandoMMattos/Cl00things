import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignOutUser } from "@/services/loginService";
import getUserName from "@/services/userService";
import { getBrands, getColors } from "@/services/productService";
import useUserID from "@/hooks/useUserID";

const useFilterData = () => {
  const router = useRouter();
  const { userId } = useUserID();
  const [userName, setUserName] = useState<string>("Guest");
  const [colors, setColors] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) return;
    getUserName(userId)
      .then((name) => setUserName(name || "Guest"))
      .catch((error) => console.error("Error fetching user name:", error));
  }, [userId]);

  const fetchFilters = useCallback(async () => {
    if (!userId) return;
    try {
      const [fetchedColors, fetchedBrands] = await Promise.all([
        getColors(userId),
        getBrands(userId),
      ]);
      setColors((prev) => (prev.length ? prev : ["None", ...fetchedColors]));
      setBrands((prev) => (prev.length ? prev : ["None", ...fetchedBrands]));
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const handleSignOut = () => {
    SignOutUser();
    router.replace("/");
  };

  return { userId, userName, colors, brands, handleSignOut };
};

export default useFilterData;
