import { useCallback, useEffect, useState } from "react";
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

const NewClothingCard = ({ onClose }: { onClose: () => void }) => {
  const user = useUserID();
  const { formData, handleChange, handleSelectChange, resetForm } =
    useProductForm(user);
  const { image, handleImageUpload, handleImageUrlChange, saveImage } =
    useProductImage(user, Number(formData.id), formData.image);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkIfMobile = () =>
      setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

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
      await saveImage();
      await addProduct(user, { ...formData, image });
      toast.success("Product added successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to add product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={handleClose} className={styles.div}>
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
                    {[
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
                    ].map((color) => (
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
                  value={formData.price}
                  onChange={handleChange}
                  className={styles.input}
                />

                <Label htmlFor="image" className={styles.label}>
                  Image
                </Label>
                {isMobile ? (
                  <>
                    <Input
                      id="image"
                      name="image"
                      onChange={handleImageUpload}
                      accept="image/*"
                      type="file"
                      className={styles.input}
                    />
                  </>
                ) : (
                  <Input
                    id="image"
                    name="image"
                    value={image}
                    placeholder="Enter image URL"
                    onChange={handleImageUrlChange}
                    type="text"
                    className={styles.input}
                  />
                )}
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
                    <SelectItem value="head" className={styles.select_item}>
                      Head
                    </SelectItem>
                    <SelectItem value="body" className={styles.select_item}>
                      Body
                    </SelectItem>
                    <SelectItem value="legs" className={styles.select_item}>
                      Legs
                    </SelectItem>
                    <SelectItem value="feet" className={styles.select_item}>
                      Feet
                    </SelectItem>
                    <SelectItem
                      value="accessory"
                      className={styles.select_item}
                    >
                      Accessory
                    </SelectItem>
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
    </div>
  );
};

export default NewClothingCard;
