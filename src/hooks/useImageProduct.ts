import { updateProduct } from "@/services/productService";
import { useState } from "react";

const useProductImage = (
  userId: string,
  productId: number,
  initialImage: string
) => {
  const [image, setImage] = useState(initialImage);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        setImage(reader.result.toString());
      }
    };

    reader.onerror = (error) =>
      console.error("Error converting image to Base64:", error);
  };

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value.toString());
  };

  const saveImage = async () => {
    if (image.trim()) {
      await updateProduct(userId, productId.toString(), { image });
    }
  };

  return { image, handleImageUpload, handleImageUrlChange, saveImage };
};

export default useProductImage;
