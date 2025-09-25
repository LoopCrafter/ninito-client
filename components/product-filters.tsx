import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ProductFilters as Filters } from "@/app/products/page";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const categories = ["آغوشی", "قنداق", "پتو", "بالش", "تشک"];

const colors = [
  { name: "آبی پاستیلی", value: "#B3D9F2" },
  { name: "صورتی پاستیلی", value: "#F2B3D9" },
  { name: "سفید", value: "#FFFFFF" },
  { name: "کرم", value: "#F5F5DC" },
  { name: "زرد", value: "#FFEB3B" },
];

export function ProductFilters({
  filters,
  onFiltersChange,
}: ProductFiltersProps) {
  const [tempPriceRange, setTempPriceRange] = useState(filters.priceRange);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);

    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...filters.colors, color]
      : filters.colors.filter((c) => c !== color);

    onFiltersChange({ ...filters, colors: newColors });
  };

  const handlePriceRangeChange = (value: number[]) => {
    setTempPriceRange([value[0], value[1]]);
  };

  const applyPriceRange = () => {
    onFiltersChange({ ...filters, priceRange: tempPriceRange });
  };

  const clearFilters = () => {
    const clearedFilters: Filters = {
      priceRange: [0, 2000000],
      categories: [],
      inStock: false,
      colors: [],
      searchQuery: filters.searchQuery,
    };
    onFiltersChange(clearedFilters);
    setTempPriceRange([0, 2000000]);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">محدوده قیمت</h3>
        <div className="px-2">
          <Slider
            value={tempPriceRange}
            onValueChange={handlePriceRangeChange}
            max={2000000}
            min={0}
            step={50000}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground mb-4">
            <span>{formatPrice(tempPriceRange[0])}</span>
            <span>{formatPrice(tempPriceRange[1])}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={applyPriceRange}
            className="w-full"
          >
            اعمال محدوده قیمت
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">دسته‌بندی</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category}
              className="flex items-center space-x-2 space-x-reverse"
            >
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox
            id="inStock"
            checked={filters.inStock}
            onCheckedChange={(checked) =>
              onFiltersChange({ ...filters, inStock: checked as boolean })
            }
          />
          <label
            htmlFor="inStock"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            فقط کالاهای موجود
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">رنگ</h3>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((color) => (
            <div
              key={color.name}
              className="flex items-center space-x-2 space-x-reverse"
            >
              <button
                className={cn(
                  "w-6 h-6 rounded-full border-2 transition-all flex-shrink-0",
                  filters.colors.includes(color.name)
                    ? "border-primary scale-110"
                    : "border-gray-300"
                )}
                style={{ backgroundColor: color.value }}
                onClick={() =>
                  handleColorChange(
                    color.name,
                    !filters.colors.includes(color.name)
                  )
                }
                title={color.name}
              />
              <span className="text-sm">{color.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t">
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
          size="sm"
        >
          <X className="h-4 w-4 ml-2" />
          حذف همه فیلترها
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-80 bg-white rounded-xl p-6 h-fit sticky top-24 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">فیلترها</h2>
          {(filters.categories.length > 0 ||
            filters.colors.length > 0 ||
            filters.inStock) && (
            <Badge variant="secondary" className="text-xs">
              {filters.categories.length +
                filters.colors.length +
                (filters.inStock ? 1 : 0)}{" "}
              فیلتر فعال
            </Badge>
          )}
        </div>
        <FilterContent />
      </div>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg"
            >
              <Filter className="h-4 w-4 ml-2" />
              فیلترها
              {(filters.categories.length > 0 ||
                filters.colors.length > 0 ||
                filters.inStock) && (
                <Badge variant="destructive" className="mr-2 text-xs">
                  {filters.categories.length +
                    filters.colors.length +
                    (filters.inStock ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>فیلترها</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
