import { IProduct } from "@/types/IProduct";
import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const useProductForm = (userID: string | null) => {
  const [formData, setFormData] = useState<IProduct>({
    id: "0",
    name: "",
    brand: "",
    color: "",
    price: 0,
    image: "",
    type: "not_created",
    bought: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchLastProductId = async () => {
    if (!userID) return "1";

    try {
      const productsRef = collection(db, `users/${userID}/products`);
      const q = query(productsRef, orderBy("id", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const lastProduct = querySnapshot.docs[0].data();
        return (Number(lastProduct.id) + 1).toString();
      }
      return "1";
    } catch (error) {
      console.error("Error fetching last product ID:", error);
      return "1";
    }
  };

  useEffect(() => {
    const initializeForm = async () => {
      const newId = (await fetchLastProductId()) ?? 1;
      setFormData((prevData) => ({ ...prevData, id: newId }));
    };
    initializeForm();
  }, [userID, fetchLastProductId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? Number(value) || 0 : value,
    }));
  };

  const handleSelectChange = (field: keyof IProduct, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const resetForm = async () => {
    const newId = (await fetchLastProductId()) ?? 1;
    setFormData({
      id: newId,
      name: "",
      brand: "",
      color: "",
      price: 0,
      image: "",
      type: "not_created",
      bought: false,
    });
  };

  return {
    formData,
    handleChange,
    handleSelectChange,
    resetForm,
  };
};

export default useProductForm;
