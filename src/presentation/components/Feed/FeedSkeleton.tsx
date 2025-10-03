import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function FeedSkeleton() {
  return (
    <div className="seccion-perfil seccion-perfil-inicio seccion-array-de-imagenes">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} height={300} />
        ))}
      </div>
    </div>
  );
}
