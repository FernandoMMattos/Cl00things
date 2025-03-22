export type IProduct = {
  id: string;
  name: string;
  brand: string;
  color:
    | "Blue"
    | "Red"
    | "Black"
    | "Purple"
    | "Pink"
    | "Gray"
    | "White"
    | "Yellow"
    | "Brown"
    | "Silver"
    | "Green"
    | "Orange"
    | "Magenta"
    | "Gold"
    | "";
  price: number;
  image: string;
  type: "head" | "body" | "legs" | "feet" | "accessory" | "not_created";
  bought: boolean;
};
