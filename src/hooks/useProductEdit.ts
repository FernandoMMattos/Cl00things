import { useState } from "react";
import { deleteProduct, updateProduct } from "@/services/productService";
import useProductImage from "@/hooks/useImageProduct";
import { IProduct } from "@/types/IProduct";
import useUserID from "@/hooks/useUserID";
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

const useProductEdit = (product: IProduct, onClose: () => void) => {
  const user = useUserID();
  const [updatedProduct, setUpdatedProduct] = useState<IProduct>({
    ...product,
  });
  const [bought, setBought] = useState(product.bought);

  const { image, handleImageUpload, handleImageUrlChange, saveImage } =
    useProductImage(user, Number(product.id), product.image);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    await saveImage();
    await updateProduct(user, updatedProduct.id, { ...updatedProduct, image });
    onClose();
  };

  const handleDelete = async () => {
    await deleteProduct(user, Number(product.id));
  };

  const handleToggleBought = () => {
    setBought((prev) => !prev);
    setUpdatedProduct((prev) => ({ ...prev, bought: !prev.bought }));
  };

  const useIsMobile = () => {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
      undefined
    );

    React.useEffect(() => {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      const onChange = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      };
      mql.addEventListener("change", onChange);
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      return () => mql.removeEventListener("change", onChange);
    }, []);

    return !!isMobile;
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
    handleImageUpload,
    handleImageUrlChange,
    useIsMobile,
  };
};

export default useProductEdit;
