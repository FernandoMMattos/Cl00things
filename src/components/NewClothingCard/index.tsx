import { useCallback, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { addProduct } from "@/services/productService";
import useProductForm from "@/hooks/useProductForm";
import useUserID from "@/hooks/useUserID";
import styles from "./NewClothingCard.module.css";
import useProductImage from "@/hooks/useImageProduct";
import { toast } from "react-toastify";
import { PRODUCT_COLORS, PRODUCT_TYPES } from "@/constants/product";

const NewClothingCard = ({ onClose }: { onClose: () => void }) => {
  const { userId: user } = useUserID();
  const { formData, handleChange, handleSelectChange, resetForm } =
    useProductForm();
  const { image, handleImageUrlChange } = useProductImage(user, "");
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const handleSave = async () => {
    if (
      !formData.name ||
      !formData.brand ||
      !formData.color ||
      !formData.type ||
      !formData.price
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await addProduct(user, { ...formData, image });
      toast.success("Product added successfully!");
      handleClose();
    } catch {
      toast.error("Failed to add product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card onClick={(e) => e.stopPropagation()} className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.card_title}>
          Register New Clothing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name" className={styles.label}>
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
              />

              <Label htmlFor="brand" className={styles.label}>
                Brand
              </Label>
              <Input
                id="brand"
                name="brand"
                placeholder="Brand Name"
                value={formData.brand}
                onChange={handleChange}
                className={styles.input}
              />

              <Label htmlFor="color" className={styles.label}>
                Color
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange("color", value)}
              >
                <SelectTrigger className={styles.select_trigger}>
                  <SelectValue
                    placeholder="Color"
                    className={styles.select_value}
                  />
                </SelectTrigger>
                <SelectContent className={styles.select_content}>
                  {PRODUCT_COLORS.map((color) => (
                    <SelectItem
                      key={color}
                      value={color}
                      id={color}
                      className={styles.select_item}
                    >
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label htmlFor="price" className={styles.label}>
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="How much does it cost?"
                value={formData.price || ""}
                onChange={handleChange}
                className={styles.input}
              />

              <Label htmlFor="image" className={styles.label}>
                Image URL
              </Label>
              <Input
                id="image"
                name="image"
                value={image}
                placeholder="Enter image URL"
                onChange={handleImageUrlChange}
                type="text"
                className={styles.input}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type" className={styles.label}>
                Type of clothing
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className={styles.select_trigger}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className={styles.select_content}>
                  {PRODUCT_TYPES.map(({ value, label }) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className={styles.select_item}
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className={styles.card_footer}>
        <Button
          variant="destructive"
          onClick={handleClose}
          disabled={loading}
          className={styles.btn_cancel}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={handleSave}
          className={styles.btn}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewClothingCard;
