import { IProduct } from "@/types/IProduct";

const filterProducts = (
  products: IProduct[],
  searchTerm: string,
  selectedBrand: string | null,
  selectedColor: string | null,
  selectedPrice: number
): IProduct[] => {
  return products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    const matchesColor = !selectedColor || product.color === selectedColor;
    const matchesPrice = product.price <= selectedPrice;

    return matchesSearch && matchesBrand && matchesColor && matchesPrice;
  });
};

export { filterProducts };
