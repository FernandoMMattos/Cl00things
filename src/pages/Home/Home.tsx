import Body from "@/components/Body";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import styles from "./Home.module.css";


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className={styles.section}>
      <Header setSearchTerm={setSearchTerm} />
      <Separator className={styles.separator} />
      <main className={styles.main}>
        <Body searchTerm={searchTerm} />
      </main>
    </section>
  );
};

export default Home;
