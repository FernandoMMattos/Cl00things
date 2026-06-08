"use client";
export const dynamic = "force-dynamic";
import styles from "./Home.module.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FilterProvider } from "@/context/filterContext";
import AppSidebar from "@/components/Sidebar";
import Layout from "@/components/Layout/Layout";
import AuthGuard from "@/components/AuthGuard";

const Home = () => {
  return (
    <AuthGuard>
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
    </AuthGuard>
  );
};

export default Home;
