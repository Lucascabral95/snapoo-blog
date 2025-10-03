import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UserProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton circle width={80} height={80} />
        <div className="flex-1">
          <Skeleton width={200} height={24} />
          <Skeleton width={300} height={16} className="mt-2" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} height={200} />
        ))}
      </div>
    </div>
  );
}
