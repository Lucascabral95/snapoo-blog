import SearchInput from "./SearchInput";
import SearchCategories from "./SearchCategories";

import styles from "./Search.module.scss";

export default function SearchHeader() {
  return (
    <div className={styles.searchHeader}>
      <div className={styles.searchContainer}>
        <SearchInput />
        <SearchCategories />
      </div>
    </div>
  );
}
