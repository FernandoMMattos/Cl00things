"use client";
import styles from "./Home.module.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FilterProvider } from "@/context/filterContext";
import AppSidebar from "@/components/Sidebar";
import Layout from "@/components/Layout/Layout";

const Home = () => {
  return (
    <FilterProvider>
      <SidebarProvider>
        <div className={styles.layout_container}>
          <AppSidebar isSidebarOpen={true} />
          <main className={styles.main_content}>
            <Layout />
          </main>
        </div>
      </SidebarProvider>
    </FilterProvider>
  );
};

export default Home;
