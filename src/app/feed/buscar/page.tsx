import { Suspense } from "react";
import BuscarContent from "./BuscarContent";
import SearchSkeleton from "@/presentation/components/Search/SearchSkeleton";
import styles from "@/presentation/components/Search/Search.module.scss";

export default function BuscarPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.page}>
          <SearchSkeleton />
        </div>
      }
    >
      <BuscarContent />
    </Suspense>
  );
}
