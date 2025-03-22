import { useEffect, useState, useMemo } from "react";
import { getProducts } from "@/services/productService";
import { filterProducts } from "@/services/filterService";
import { IProduct } from "@/types/IProduct";
import useUserID from "@/hooks/useUserID";
import { useFilter } from "@/context/filterContext";
import CategorySection from "../CategorySection";
import BackgroundBlur from "../BackgroundBlur";
import ProductCardEdit from "../ProductCard/ProductCardEdit";
import styles from "./Body.module.css";

const validTypes = ["head", "body", "legs", "feet", "accessory"] as const;

const Body = ({ searchTerm }: { searchTerm: string }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const user = useUserID();
  const { selectedBrand, selectedColor, selectedPrice } = useFilter();
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = getProducts(user, (newProducts) => {
      setProducts((prev) =>
        JSON.stringify(prev) === JSON.stringify(newProducts)
          ? prev
          : newProducts
      );
    });
    return () => unsubscribe?.();
  }, [user]);

  const categorizedProducts = useMemo(() => {
    const filteredProducts = filterProducts(
      products,
      searchTerm,
      selectedBrand,
      selectedColor,
      selectedPrice
    );

    return validTypes.map((type) => ({
      title: type.charAt(0).toUpperCase() + type.slice(1),
      products: filteredProducts.filter(
        (product) => product.type.toLowerCase() === type
      ),
    }));
  }, [products, searchTerm, selectedBrand, selectedColor, selectedPrice]);

  return (
    <section className={styles.cards_section}>
      {categorizedProducts.map((category) => (
        <CategorySection
          key={category.title}
          title={category.title}
          products={category.products}
          setEditingProduct={setEditingProduct}
        />
      ))}

      {editingProduct && (
        <>
          <BackgroundBlur
            active={true}
            onClick={() => setEditingProduct(null)}
            blurFor="editProduct"
          />
          <ProductCardEdit
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
          />
        </>
      )}
    </section>
  );
};

export default Body;
