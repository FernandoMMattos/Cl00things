import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FilterProvider } from "@/context/filterContext";
import styles from "./Layout.module.css";
import AppSidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <FilterProvider>
        <div className={styles.layout_container}>
          <AppSidebar isSidebarOpen={true} />
          <main className={styles.main_content}>{children}</main>
        </div>
      </FilterProvider>
    </SidebarProvider>
  );
}
