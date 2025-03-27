import { useState, useCallback } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import ProductCardEdit from "./ProductCardEdit";
import { IProduct } from "@/types/IProduct";
import styles from "./ProductCard.module.css";

const BoughtStatus = ({ bought }: { bought: boolean }) => (
  <div className={styles.p}>
    <strong>{bought ? "Bought" : "Not Bought"}</strong>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      height={20}
      width={20}
    >
      <path
        fill={bought ? "#2ab120" : "#ca1c1c"}
        d={
          bought
            ? "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
            : "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        }
      />
    </svg>
  </div>
);

const ProductCard = ({
  product,
  setEditingProduct,
}: {
  product: IProduct;
  setEditingProduct: (product: IProduct | null) => void;
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleEdit = useCallback(() => {
    setEditingProduct(product);
  }, [product, setEditingProduct]);

  const handleClose = useCallback(() => {
    setIsActive(false);
    setTimeout(() => setEditingProduct(null), 300);
  }, [setEditingProduct]);

  return (
    <>
      {isActive ? (
        <ProductCardEdit product={product} onClose={handleClose} />
      ) : (
        <Card className={styles.card}>
          <img src={product.image} alt={product.name} className={styles.img} />
          <CardContent>
            <CardTitle className={styles.card_title}>{product.name}</CardTitle>
            <h3 className={styles.h3}>{product.brand}</h3>
            <h3 className={styles.h3}>€{product.price}</h3>
            <BoughtStatus bought={product.bought} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleEdit}
              className={styles.btn}
            >
              Edit
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default ProductCard;
