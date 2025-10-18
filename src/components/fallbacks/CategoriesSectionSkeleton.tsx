export function CategoriesSectionSkeleton() {
  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="container mx-auto px-4 animate-pulse">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="h-8 w-64 mx-auto bg-pink-200 rounded mb-4" />
          <div className="h-4 w-80 mx-auto bg-gray-200 rounded" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white shadow-lg overflow-hidden"
            >
              {/* Image skeleton */}
              <div className="relative w-full aspect-square sm:aspect-[4/3] bg-gray-200" />

              {/* Text skeleton */}
              <div className="p-4 text-center">
                <div className="h-5 w-32 mx-auto bg-gray-200 rounded mb-3" />
                <div className="h-3 w-48 mx-auto bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
