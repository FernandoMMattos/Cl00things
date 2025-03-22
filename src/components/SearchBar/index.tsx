import { Input } from "../ui/input";
import styles from "./SearchBar.module.css";
import { useCallback, useState } from "react";

interface SearchBarProps {
  setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value);
      setTimeout(() => setSearchTerm(value), 300);
    },
    [setSearchTerm]
  );

  return (
    <div className={styles.searchBar}>
      <Input
        id="search"
        placeholder="SEARCH"
        value={searchValue}
        onChange={handleSearch}
        className={styles.input}
      />
    </div>
  );
};

export default SearchBar;
