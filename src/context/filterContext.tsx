import { IProduct } from "@/types/IProduct";
import { createContext, useContext, useState, useCallback } from "react";

type FilterContextType = {
  selectedBrand: string | null;
  selectedColor: string | null;
  selectedPrice: number;
  setSelectedBrand: (brand: string | null) => void;
  setSelectedColor: (color: string | null) => void;
  setSelectedPrice: (price: number) => void;
  filterProducts: (products: IProduct[]) => IProduct[];
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({
  children,
  initialPrice = 5000,
}: {
  children: React.ReactNode;
  initialPrice?: number;
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(initialPrice);

  const filterProducts = useCallback(
    (products: IProduct[]): IProduct[] => {
      return products.filter((product) => {
        const matchesFilter = (value: string | null, productValue: string) =>
          !value || value === productValue;

        return (
          matchesFilter(selectedBrand, product.brand) &&
          matchesFilter(selectedColor, product.color) &&
          product.price <= selectedPrice
        );
      });
    },
    [selectedBrand, selectedColor, selectedPrice]
  );

  return (
    <FilterContext.Provider
      value={{
        selectedBrand,
        selectedColor,
        selectedPrice,
        setSelectedBrand,
        setSelectedColor,
        setSelectedPrice,
        filterProducts,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
