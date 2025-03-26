import styles from "./Layout.module.css";
import Header from "../Header";
import Body from "../Body";
import { FilterProvider } from "@/context/filterContext";
import { Separator } from "../ui/separator";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

export default function Layout() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <FilterProvider>
      <section className={styles.section}>
        <Header setSearchTerm={setSearchTerm} />
        <Separator className={styles.separator} />
        <main className={styles.main}>
          <Body searchTerm={searchTerm} />
        </main>
      </section>
      <ToastContainer />
    </FilterProvider>
  );
}
