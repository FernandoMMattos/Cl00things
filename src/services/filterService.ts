import { IProduct } from "@/types/IProduct";

const filterByName = (products: IProduct[], searchTerm: string): IProduct[] => {
  if (!searchTerm) return products;
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );
};

const filterByBrand = (products: IProduct[], brand: string): IProduct[] => {
  return products.filter((product) =>
    product.brand.toLowerCase().includes(brand.toLowerCase())
  );
};

const filterByColor = (products: IProduct[], color: string): IProduct[] => {
  return products.filter((product) =>
    product.color.toLowerCase().includes(color.toLowerCase())
  );
};

const filterByPrice = (
  products: IProduct[],
  min: number,
  max: number
): IProduct[] => {
  return products.filter(
    (product) => Number(product.price) >= min && Number(product.price) <= max
  );
};

const filterByType = (
  products: IProduct[],
  type: IProduct["type"]
): IProduct[] => {
  return products.filter((product) => product.type === type);
};

const filterProducts = (
  products: IProduct[],
  searchTerm: string,
  selectedBrand: string | null,
  selectedColor: string | null,
  selectedPrice: number
) => {
  return products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => !selectedBrand || product.brand === selectedBrand)
    .filter((product) => !selectedColor || product.color === selectedColor)
    .filter((product) => Number(product.price) <= selectedPrice);
};

export {
  filterByName,
  filterByBrand,
  filterByColor,
  filterByPrice,
  filterByType,
  filterProducts,
};
