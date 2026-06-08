import { IProduct } from "@/types/IProduct";
import { useState, useCallback } from "react";

type ProductFormData = Omit<IProduct, "id">;

const initialFormData: ProductFormData = {
  name: "",
  brand: "",
  color: "",
  price: 0,
  image: "",
  type: "",
  bought: false,
};

const useProductForm = () => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) || 0 : value,
    }));
  };

  const handleSelectChange = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  return {
    formData,
    handleChange,
    handleSelectChange,
    resetForm,
  };
};

export default useProductForm;
