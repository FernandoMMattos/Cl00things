import { describe, it, expect } from "vitest";
import { filterProducts } from "@/services/filterService";
import { IProduct } from "@/types/IProduct";

const makeProduct = (overrides: Partial<IProduct> = {}): IProduct => ({
  id: "1",
  name: "Test Shirt",
  brand: "Nike",
  color: "Black",
  price: 50,
  image: "",
  type: "body",
  bought: false,
  ...overrides,
});

describe("filterProducts", () => {
  const products: IProduct[] = [
    makeProduct({ id: "1", name: "Nike Hoodie", brand: "Nike", color: "Black", price: 80 }),
    makeProduct({ id: "2", name: "Adidas Tee", brand: "Adidas", color: "White", price: 30 }),
    makeProduct({ id: "3", name: "Puma Jacket", brand: "Puma", color: "Black", price: 120 }),
  ];

  it("returns all products when no filters are applied", () => {
    const result = filterProducts(products, "", null, null, 1000);
    expect(result).toHaveLength(3);
  });

  it("filters by search term (case-insensitive)", () => {
    const result = filterProducts(products, "hoodie", null, null, 1000);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Nike Hoodie");
  });

  it("filters by brand", () => {
    const result = filterProducts(products, "", "Adidas", null, 1000);
    expect(result).toHaveLength(1);
    expect(result[0].brand).toBe("Adidas");
  });

  it("filters by color", () => {
    const result = filterProducts(products, "", null, "Black", 1000);
    expect(result).toHaveLength(2);
  });

  it("filters by max price (inclusive)", () => {
    const result = filterProducts(products, "", null, null, 80);
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.price <= 80)).toBe(true);
  });

  it("combines multiple filters", () => {
    const result = filterProducts(products, "", "Nike", "Black", 1000);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("returns empty array when no products match", () => {
    const result = filterProducts(products, "xyz_no_match", null, null, 1000);
    expect(result).toHaveLength(0);
  });

  it("returns empty array for empty input", () => {
    const result = filterProducts([], "test", null, null, 1000);
    expect(result).toHaveLength(0);
  });
});
