interface ProductCardSkeletonProps {
  count?: number;
  cols?: number;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({
  count = 1,
  cols = 3,
}) => {
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="product-card group p-3 border border-gray-200 rounded-xl bg-white animate-pulse"
        >
          <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-200 h-48 w-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
