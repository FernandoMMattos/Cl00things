import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import NewClothingCard from "../NewClothingCard";
import BackgroundBlur from "../BackgroundBlur";
import styles from "./Header.module.css";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import Overlay from "../Overlay";

const Header = ({
  setSearchTerm,
}: {
  setSearchTerm: (value: string) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [isModalOpen]);

  return (
    <>
      {isMobile ? (
        <header className={styles.header}>
          <h1 className={styles.title}>Cl00things</h1>
          <div className={styles.div}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={styles.icon}
              onClick={() => setIsSearching((prev) => !prev)}
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              onClick={() => setIsModalOpen(true)}
              className={styles.icon}
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className={styles.icon}
            >
              <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
            </svg>
          </div>
        </header>
      ) : (
        <header className={styles.header}>
          <SearchBar setSearchTerm={setSearchTerm} />
          <h1 className={styles.title}>Cl00things</h1>
          <Button onClick={() => setIsModalOpen(true)} className={styles.btn}>
            Add clothing
          </Button>
        </header>
      )}

      {isModalOpen && (
        <>
          <BackgroundBlur
            active={isModalOpen}
            onClick={() => setIsModalOpen(false)}
            blurFor="addClothing"
          />
          <NewClothingCard onClose={() => setIsModalOpen(false)} />
        </>
      )}

      {isSearching && <SearchBar setSearchTerm={setSearchTerm} />}

      {isMobile && isSidebarOpen && (
        <Overlay
          isSidebarOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
