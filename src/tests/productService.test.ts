import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/firebaseConfig", () => ({
  db: {},
  auth: {},
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  onSnapshot: vi.fn(),
  serverTimestamp: vi.fn(() => ({ seconds: 0 })),
}));

vi.mock("react-toastify", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

import { addProduct, deleteProduct } from "@/services/productService";
import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

describe("addProduct", () => {
  beforeEach(() => vi.clearAllMocks());

  it("calls addDoc with formatted product data", async () => {
    vi.mocked(addDoc).mockResolvedValue({ id: "abc123" } as never);

    await addProduct("user1", {
      name: "test shirt",
      brand: "nike",
      color: "Black",
      price: 50,
      image: "",
      type: "body",
      bought: false,
    });

    expect(addDoc).toHaveBeenCalledOnce();
    const callArgs = vi.mocked(addDoc).mock.calls[0][1] as Record<string, unknown>;
    expect(callArgs.name).toBe("Test Shirt");
    expect(callArgs.brand).toBe("Nike");
  });

  it("shows error toast when userId is missing", async () => {
    await addProduct("", {
      name: "test",
      brand: "test",
      color: "Black",
      price: 10,
      image: "",
      type: "body",
      bought: false,
    });

    expect(toast.error).toHaveBeenCalledWith("You must be logged in to add a product.");
    expect(addDoc).not.toHaveBeenCalled();
  });

  it("shows error toast when Firestore throws", async () => {
    vi.mocked(addDoc).mockRejectedValue(new Error("Firestore error"));

    await addProduct("user1", {
      name: "test",
      brand: "test",
      color: "Black",
      price: 10,
      image: "",
      type: "body",
      bought: false,
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to add product. Please try again.");
  });
});

describe("deleteProduct", () => {
  beforeEach(() => vi.clearAllMocks());

  it("calls deleteDoc with correct path", async () => {
    vi.mocked(doc).mockReturnValue({ path: "users/user1/products/prod1" } as never);
    vi.mocked(deleteDoc).mockResolvedValue(undefined);

    await deleteProduct("user1", "prod1");

    expect(deleteDoc).toHaveBeenCalledOnce();
  });
});
