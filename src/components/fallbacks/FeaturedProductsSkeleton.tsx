export function FeaturedProductsSkeleton() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 animate-pulse">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded mb-3" />
            <div className="h-4 w-72 bg-gray-100 rounded" />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-md bg-gray-200" />
            <div className="h-10 w-10 rounded-md bg-gray-200" />
          </div>
        </div>

        {/* Fake Swiper Slides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              {/* Image placeholder */}
              <div className="aspect-square bg-gray-200" />

              {/* Text placeholders */}
              <div className="p-4">
                <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-24 bg-gray-100 rounded mb-3" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
