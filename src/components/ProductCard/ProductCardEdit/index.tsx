import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Button from "@/components/Button";
import useProductEdit from "@/hooks/useProductEdit";
import styles from "./ProductCardEdit.module.css";
import { IProduct } from "@/types/IProduct";

const ProductCardEdit = ({
  product,
  onClose,
}: {
  product: IProduct;
  onClose: () => void;
}) => {
  const {
    updatedProduct,
    bought,
    image,
    handleChange,
    setUpdatedProduct,
    handleSave,
    handleDelete,
    handleToggleBought,
    handleImageUpload,
    handleImageUrlChange,
    useIsMobile,
  } = useProductEdit(product, onClose);

  const isMobile = useIsMobile();

  return (
    <Card onClick={(e) => e.stopPropagation()} className={styles.card}>
      <CardHeader className={styles.card_header}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          onClick={() => {
            handleDelete();
            onClose();
          }}
          className={styles.icon}
        >
          <path
            fill="black"
            d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
          />
        </svg>
        <CardTitle className={styles.card_title}>Edit Product</CardTitle>
        <img
          src="/assets/xmark-solid.svg"
          onClick={onClose}
          className={styles.icon}
        />
      </CardHeader>
      <CardContent className={styles.card_content}>
        <img src={image || "/placeholder-image.png"} className={styles.img} />

        <div className={styles.field}>
          <Label className={styles.label}>Name</Label>
          <Input
            name="name"
            value={updatedProduct?.name ?? ""}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <Label className={styles.label}>Brand</Label>
          <Input
            name="brand"
            value={updatedProduct?.brand ?? ""}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <Label className={styles.label}>Color</Label>
          <Select
            value={updatedProduct?.color ?? ""}
            onValueChange={(color) =>
              setUpdatedProduct((prev) => ({
                ...prev,
                color: color as IProduct["color"],
              }))
            }
          >
            <SelectTrigger className={styles.select_trigger}>
              <SelectValue
                placeholder={updatedProduct?.color || "Select a color"}
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
                  className={styles.select_item}
                >
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={styles.field}>
          <Label className={styles.label}>Price</Label>
          <Input
            name="price"
            type="number"
            value={updatedProduct?.price ?? 0}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        {isMobile ? (
          <div className={styles.field}>
            <Label htmlFor="image" className={styles.label}>
              Image
            </Label>
            <Input
              id="image"
              name="image"
              onChange={handleImageUpload}
              accept="image/*"
              type="file"
              className={styles.input}
            />
          </div>
        ) : (
          <div className={styles.field}>
            <Label className={styles.label}>Image URL</Label>
            <Input
              name="image"
              value={image ?? ""}
              onChange={handleImageUrlChange}
              placeholder="Enter image URL"
              type="text"
              className={styles.input}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className={styles.card_footer}>
        <div className={styles.div}>
          <Label className={styles.label}>Purchase?</Label>
          <Checkbox
            onClick={handleToggleBought}
            checked={bought}
            className={styles.checkbox}
          />
        </div>
        <Button onClick={handleSave}>Save</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCardEdit;
