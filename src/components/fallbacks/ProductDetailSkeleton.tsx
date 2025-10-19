export function ProductDetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16 animate-pulse">
      {/* ✅ بخش گالری تصاویر */}
      <div className="space-y-4">
        {/* تصویر اصلی */}
        <div className="relative bg-muted rounded-lg overflow-hidden">
          <div className="w-full h-[60vh] bg-muted" />
          <div className="absolute top-4 left-4 h-8 w-8 bg-background/60 rounded-md" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 bg-background/60 rounded-md" />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 bg-background/60 rounded-md" />
          <div className="absolute bottom-4 right-4 h-6 w-20 bg-background/60 rounded" />
        </div>

        {/* تصاویر بندانگشتی */}
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded-lg" />
          ))}
        </div>
      </div>

      {/* ✅ بخش جزئیات محصول */}
      <div className="space-y-6">
        {/* عنوان */}
        <div className="space-y-2">
          <div className="h-8 w-2/3 bg-muted rounded" />
          <div className="h-4 w-1/3 bg-muted rounded" />
        </div>

        {/* امتیاز */}
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-5 w-5 bg-muted rounded" />
          ))}
          <div className="h-4 w-8 bg-muted rounded" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>

        {/* قیمت */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-24 bg-muted rounded" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>

        {/* رنگ‌ها */}
        <div className="space-y-3">
          <div className="h-5 w-20 bg-muted rounded" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-12 h-12 bg-muted rounded-full" />
            ))}
          </div>
        </div>

        {/* سایز */}
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-8 h-8 bg-muted rounded" />
          ))}
        </div>

        {/* توضیحات */}
        <div className="space-y-2">
          <div className="h-5 w-28 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
          <div className="h-4 w-4/6 bg-muted rounded" />
        </div>

        {/* دکمه خرید */}
        <div className="h-12 w-full bg-muted rounded-lg" />
      </div>
    </div>
  );
}
