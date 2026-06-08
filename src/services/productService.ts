import { IProduct } from "@/types/IProduct";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  addDoc,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";

const capitalizeWords = (text: string) =>
  text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const getDistinctFieldValues = async (
  userId: string | undefined,
  field: keyof IProduct
): Promise<string[]> => {
  if (!userId) return [];
  try {
    const snapshot = await getDocs(collection(db, `users/${userId}/products`));
    const valueSet = new Set<string>();
    snapshot.docs.forEach((doc) => {
      const value = doc.data()[field];
      if (value) valueSet.add(value as string);
    });
    return Array.from(valueSet);
  } catch (error) {
    console.error(`Error fetching ${field}s:`, error);
    return [];
  }
};

const addProduct = async (userId: string, product: Omit<IProduct, "id">) => {
  if (!userId) {
    toast.error("You must be logged in to add a product.");
    return;
  }

  try {
    await addDoc(collection(db, `users/${userId}/products`), {
      ...product,
      name: capitalizeWords(product.name),
      brand: capitalizeWords(product.brand),
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    toast.error("Failed to add product. Please try again.");
    console.error("Error adding product:", error);
  }
};

const updateProduct = async (
  userId: string,
  productId: string,
  updatedProduct: Partial<IProduct>
) => {
  if (!userId || !productId) {
    console.error("updateProduct: missing userId or productId");
    return;
  }

  try {
    const productRef = doc(db, "users", userId, "products", productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      console.error(`updateProduct: product ${productId} does not exist`);
      return;
    }

    const validFields: (keyof IProduct)[] = [
      "name",
      "brand",
      "color",
      "price",
      "image",
      "type",
      "bought",
    ];
    const filteredProduct: Partial<IProduct> = Object.fromEntries(
      Object.entries(updatedProduct).filter(
        ([key, value]) =>
          validFields.includes(key as keyof IProduct) && value !== undefined
      )
    );

    if (Object.keys(filteredProduct).length === 0) {
      console.warn("updateProduct: no valid fields to update");
      return;
    }

    await updateDoc(productRef, filteredProduct);
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

const deleteProduct = async (userId: string, productId: string) => {
  try {
    const productRef = doc(db, `users/${userId}/products`, productId);
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

const getProducts = (
  userId: string,
  setProducts: (products: IProduct[]) => void
) => {
  if (!userId) return;

  const productsRef = collection(db, `users/${userId}/products`);

  const unsubscribe = onSnapshot(productsRef, (snapshot) => {
    const products: IProduct[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name ?? "",
        brand: data.brand ?? "",
        color: data.color ?? "",
        price: Number(data.price) || 0,
        image: data.image ?? "",
        type: data.type ?? "",
        bought: data.bought ?? false,
      } as IProduct;
    });
    setProducts(products);
  });

  return unsubscribe;
};

const getColors = (userId?: string) =>
  getDistinctFieldValues(userId, "color");

const getBrands = (userId?: string) =>
  getDistinctFieldValues(userId, "brand");

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getBrands,
  getColors,
};
