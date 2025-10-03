import SearchInput from "./SearchInput";

import styles from "./Search.module.scss";
import SearchCategories from "./SearchCategories";
import { SearchCategory } from "@/infrastructure/types";

export default function SearchHeader() {
  return (
    <div className={styles.searchHeader}>
      <div className={styles.searchContainer}>
        <SearchInput />
        <SearchCategories
          selected={"usuario"}
          onChange={function (category: SearchCategory): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
}
