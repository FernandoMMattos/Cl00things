import { useState } from "react";
import { deleteProduct, updateProduct } from "@/services/productService";
import useProductImage from "@/hooks/useImageProduct";
import { IProduct } from "@/types/IProduct";
import useUserID from "@/hooks/useUserID";

const useProductEdit = (product: IProduct, onClose: () => void) => {
  const { userId } = useUserID();
  const [updatedProduct, setUpdatedProduct] = useState<IProduct>({ ...product });
  const [bought, setBought] = useState(product.bought);

  const { image, handleImageUrlChange } =
    useProductImage(userId, product.image);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    await updateProduct(userId, updatedProduct.id, { ...updatedProduct, image });
    onClose();
  };

  const handleDelete = async () => {
    await deleteProduct(userId, product.id);
  };

  const handleToggleBought = () => {
    setBought((prev) => !prev);
    setUpdatedProduct((prev) => ({ ...prev, bought: !prev.bought }));
  };

  return {
    updatedProduct,
    setUpdatedProduct,
    bought,
    image,
    handleChange,
    handleSave,
    handleDelete,
    handleToggleBought,
    handleImageUrlChange,
  };
};

export default useProductEdit;
