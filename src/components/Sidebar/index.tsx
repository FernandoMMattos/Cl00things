import { SignOutUser } from "@/services/loginService";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useUserID from "@/hooks/useUserID";
import getUserName from "@/services/userService";
import { getBrands, getColors } from "@/services/productService";
import { useFilter } from "@/context/filterContext";
import styles from "./Sidebar.module.css";
import { Separator } from "../ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "../ui/sidebar";
import { useIsMobile } from "@/hooks/useIsMobile";

const AppSidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const navigate = useNavigate();
  const user = useUserID();
  const isMobile = useIsMobile();
  const {
    setSelectedBrand,
    setSelectedColor,
    selectedPrice,
    selectedBrand,
    selectedColor,
    setSelectedPrice,
  } = useFilter();
  const [userName, setUserName] = useState<string>("Guest");
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

  const SignOut = () => {
    SignOutUser();
    navigate("/");
  };

  return (
    <Sidebar
      className={`${styles.sidebar} ${
        isMobile && isSidebarOpen ? styles.mobileOpen : ""
      }`}
    >
      <SidebarHeader className={styles.header}>
        <span className={styles.span}>Hello {userName}</span>
        <Separator className={styles.separator} />
      </SidebarHeader>

      <SidebarContent className={`${styles.bg} ${styles.group}`}>
        <SidebarGroup>
          <label className={styles.span}>Filters:</label>
          <label className={styles.span}>Brand</label>
          <SidebarGroupContent>
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

            <label className={styles.span}>Color</label>
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

            <label className={styles.span}>Price</label>
            <Slider
              defaultValue={[selectedPrice]}
              max={10000}
              step={10}
              onValueChange={(value) => setSelectedPrice(value[0])}
              className={styles.slider}
            />
            <span className={styles.span}>{selectedPrice}</span>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={styles.bg}>
        <button onClick={SignOut} className={styles.sidebar_menu_btn}>
          Sign out
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
