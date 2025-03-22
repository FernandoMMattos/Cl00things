import { useCallback, useEffect, useState } from "react";
import styles from "./Overlay.module.css";
import getUserName from "@/services/userService";
import useUserID from "@/hooks/useUserID";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFilter } from "@/context/filterContext";
import { getBrands, getColors } from "@/services/productService";
import { Slider } from "../ui/slider";
import { SignOutUser } from "@/services/loginService";
import { useNavigate } from "react-router-dom";

const Overlay = ({
  isSidebarOpen,
  closeSidebar,
}: {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("Guest");
  const user = useUserID();
  const {
    setSelectedBrand,
    setSelectedColor,
    selectedPrice,
    selectedBrand,
    selectedColor,
    setSelectedPrice,
  } = useFilter();
  const [colors, setColors] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserName = async () => {
      if (!user) return;
      try {
        const name = await getUserName(user);
        setUserName(name || "Guest");
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };
    fetchUserName();
  }, [user]);

  const SignOut = () => {
    SignOutUser();
    navigate("/");
  };

  const fetchFilters = useCallback(async () => {
    if (!user) return;
    try {
      const [fetchedColors, fetchedBrands] = await Promise.all([
        getColors(user),
        getBrands(user),
      ]);
      setColors((prev) => (prev.length ? prev : ["None", ...fetchedColors]));
      setBrands((prev) => (prev.length ? prev : ["None", ...fetchedBrands]));
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  return (
    <div className={`${styles.overlay} ${isSidebarOpen ? styles.show : ""}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Hello {userName}</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          className={styles.icon}
          onClick={closeSidebar}
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </div>

      <div className={styles.main}>
        <Separator className={styles.separator} />
        <span className={styles.span}>Filters:</span>
        <label className={styles.label}>Brand</label>
        <Select
          value={selectedBrand ?? "None"}
          onValueChange={(value) =>
            setSelectedBrand(value === "None" ? null : value)
          }
        >
          <SelectTrigger className={styles.select_trigger}>
            <SelectValue placeholder="Filter by brand" />
          </SelectTrigger>
          <SelectContent className={styles.select_content}>
            {brands.map((brand) => (
              <SelectItem
                value={brand}
                key={brand}
                className={styles.select_item}
              >
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label className={styles.label}>Color</label>
        <Select
          value={selectedColor ?? "None"}
          onValueChange={(value) =>
            setSelectedColor(value === "None" ? null : value)
          }
        >
          <SelectTrigger className={styles.select_trigger}>
            <SelectValue placeholder="Filter by color" />
          </SelectTrigger>
          <SelectContent className={styles.select_content}>
            {colors.map((color) => (
              <SelectItem
                value={color}
                key={color}
                className={styles.select_item}
              >
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label className={styles.label}>Price</label>
        <Slider
          defaultValue={[selectedPrice]}
          max={10000}
          step={10}
          onValueChange={(value) => setSelectedPrice(value[0])}
          className={styles.slider}
        />
        <span className={styles.span}>{selectedPrice}</span>
      </div>

      <div>
        <button onClick={SignOut} className={styles.logout}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Overlay;
