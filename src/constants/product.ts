import { IProduct } from "@/types/IProduct";

export const PRODUCT_COLORS: IProduct["color"][] = [
  "Black",
  "Blue",
  "Red",
  "Purple",
  "Pink",
  "Gray",
  "White",
  "Yellow",
  "Brown",
  "Silver",
  "Green",
  "Orange",
  "Magenta",
  "Gold",
];

export const PRODUCT_TYPES: { value: IProduct["type"]; label: string }[] = [
  { value: "head", label: "Head" },
  { value: "body", label: "Body" },
  { value: "legs", label: "Legs" },
  { value: "feet", label: "Feet" },
  { value: "accessory", label: "Accessory" },
];
