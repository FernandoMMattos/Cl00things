import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
import useFilterData from "@/hooks/useFilterData";

const AppSidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const isMobile = useIsMobile();
  const { userName, colors, brands, handleSignOut } = useFilterData();
  const {
    setSelectedBrand,
    setSelectedColor,
    selectedPrice,
    selectedBrand,
    selectedColor,
    setSelectedPrice,
  } = useFilter();

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
                <SelectValue />
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
        <button onClick={handleSignOut} className={styles.sidebar_menu_btn}>
          Sign out
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
