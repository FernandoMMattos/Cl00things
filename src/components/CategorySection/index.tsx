import React from "react";
import Slider from "react-slick";
import ProductCard from "../ProductCard";
import { IProduct } from "@/types/IProduct";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./CategorySection.module.css";
import { useIsMobile } from "@/hooks/useIsMobile";

interface CategorySectionProps {
  title: string;
  products: IProduct[];
  setEditingProduct: (product: IProduct | null) => void;
}

// eslint-disable-next-line react/display-name
const CategorySection: React.FC<CategorySectionProps> = React.memo(
  ({ title, products, setEditingProduct }) => {
    const hasProducts = products.length > 0;
    const isMobile = useIsMobile();

    const showCards = () => {
      return isMobile ? 1 : 4;
    };

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: Math.min(showCards(), products.length),
      slidesToScroll: 1,
      arrows: true,
    };

    return (
      <div className={styles.category_section}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.carousel_container}>
          {hasProducts ? (
            <Slider {...settings}>
              {products.map((product) => (
                <div key={product.id} className={styles.product_slide}>
                  <ProductCard
                    product={product}
                    setEditingProduct={setEditingProduct}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p className={styles.p}>No products added in this section.</p>
          )}
        </div>
      </div>
    );
  }
);

export default CategorySection;
