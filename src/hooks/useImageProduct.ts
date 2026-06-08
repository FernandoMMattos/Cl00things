import { useState } from "react";

const useProductImage = (_userId: string, initialImage: string) => {
  const [image, setImage] = useState(initialImage);

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  };

  return { image, handleImageUrlChange };
};

export default useProductImage;
