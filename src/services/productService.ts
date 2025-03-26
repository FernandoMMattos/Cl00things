import { IProduct } from "@/types/IProduct";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const addProduct = async (userId: string, newProduct: IProduct) => {
  if (!userId || !newProduct.id) {
    console.error("Error: Missing userId or product ID.");
    return;
  }

  try {
    const formattedProduct = {
      ...newProduct,
      id: newProduct.id?.toString() || "1",
      name: capitalizeFirstLetter(newProduct.name),
      brand: capitalizeFirstLetter(newProduct.brand),
      color: newProduct.color,
      image: newProduct.image,
    };

    const productId = String(newProduct.id);
    const productRef = doc(db, `users/${userId}/products`, productId);
    await setDoc(productRef, formattedProduct);
  } catch (error) {
    console.error("❌ Error adding product:", error);
  }
};

const updateProduct = async (
  userId: string,
  productId: string,
  updatedProduct: Partial<IProduct>
) => {
  try {
    if (typeof userId !== "string" || typeof productId !== "string") {
      console.log("Invalid userId or productId:", userId, productId);
      return;
    }

    const productRef = doc(db, "users", userId, "products", productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      console.log(`Error: Product with ID ${productId} does not exist.`);
      return;
    }

    const validFields = [
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
        ([key, value]) => validFields.includes(key) && value !== undefined
      )
    );

    if (Object.keys(filteredProduct).length === 0) {
      console.warn("No valid fields to update.");
      return;
    }

    await updateDoc(productRef, filteredProduct);
    console.log("Product updated successfully");
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

const deleteProduct = async (userId: string, productId: number) => {
  try {
    const productRef = doc(
      db,
      `users/${userId}/products`,
      productId.toString()
    );
    await deleteDoc(productRef);
    console.log("Product deleted successfully");
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
      const data = doc.data() as Omit<IProduct, "id">;
      return { id: doc.id, ...data };
    });

    setProducts(products);
  });

  return unsubscribe;
};

const getColors = async (userId?: string): Promise<string[]> => {
  if (!userId) {
    console.error("Error fetching colors: userId is undefined");
    return [];
  }

  try {
    const productsCollection = collection(db, `users/${userId}/products`);
    const productsSnapshot = await getDocs(productsCollection);

    const colorSet = new Set<string>();
    productsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.color) colorSet.add(data.color);
    });

    return Array.from(colorSet);
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
};

const getBrands = async (userId?: string): Promise<string[]> => {
  if (!userId) {
    console.error("Error fetching brands: userId is undefined");
    return [];
  }

  try {
    const productsCollection = collection(db, `users/${userId}/products`);
    const productsSnapshot = await getDocs(productsCollection);

    const brandSet = new Set<string>();
    productsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.brand) brandSet.add(data.brand);
    });

    return Array.from(brandSet);
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getBrands,
  getColors,
};
