export function CMSPageSkeleton() {
  return (
    <section className="prose prose-sm sm:prose lg:prose-lg mx-auto px-20 py-10 text-gray-800 leading-relaxed">
      <div className="bg-white rounded-lg shadow-md p-10 pb-20 min-h-[80vh] animate-pulse">
        {/* Title Placeholder */}
        <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-10" />

        {/* Paragraphs Placeholder */}
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-11/12" />
              <div className="h-4 bg-gray-200 rounded w-10/12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
