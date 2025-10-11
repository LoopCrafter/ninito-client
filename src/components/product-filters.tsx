import { useEffect, useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Slider } from "@/src/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { Badge } from "@/src/components/ui/badge";
import { ProductFilters as Filters } from "@/app/products/page";
import { cn } from "@/src/lib/utils";
import { formatPrice } from "@/src/utils";
import { Category } from "@/src/types/categories";
import { apiFetchClient } from "@/src/lib/apiFetch.client";
import { Color } from "@/src/types/product";

interface ProductFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  colors: Color[];
}

export function ProductFilters({
  filters,
  onFiltersChange,
  colors,
}: ProductFiltersProps) {
  const [tempPriceRange, setTempPriceRange] = useState(filters.priceRange);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { categories } = await apiFetchClient<{ categories: Category[] }>(
          "/categories"
        );
        setCategories(categories);
      } catch (error) {}
    };

    getCategories();
  }, []);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    console.log("Asdd", newCategories);
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
      priceRange: [0, 20000000],
      categories: [],
      inStock: false,
      colors: [],
      searchQuery: filters.searchQuery,
    };
    onFiltersChange(clearedFilters);
    setTempPriceRange([0, 20000000]);
  };

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
        <div className="flex flex-col gap-4">
          <SliderPriceRange
            value={tempPriceRange}
            onChange={handlePriceRangeChange}
            min={0}
            max={20000000}
            step={10000}
            applyPriceRange={applyPriceRange}
          />
          <CategoryFilters
            filters={filters}
            handleCategoryChange={handleCategoryChange}
            onFiltersChange={onFiltersChange}
            categories={categories}
          />
          <ColorFilters
            filters={filters}
            handleColorChange={handleColorChange}
            colors={colors}
          />
          <ClearFiltersButton onClick={clearFilters} filters={filters} />
        </div>
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
            <div className="mt-6 p-3 flex flex-col gap-3">
              <SliderPriceRange
                value={tempPriceRange}
                onChange={handlePriceRangeChange}
                min={0}
                max={2000000}
                step={10000}
                applyPriceRange={applyPriceRange}
              />
              <CategoryFilters
                filters={filters}
                handleCategoryChange={handleCategoryChange}
                onFiltersChange={onFiltersChange}
                categories={categories}
              />
              <ColorFilters
                filters={filters}
                handleColorChange={handleColorChange}
                colors={colors}
              />
              <ClearFiltersButton
                onClick={() => clearFilters()}
                filters={filters}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

type SliderPriceRangeProps = {
  min: number;
  max: number;
  step?: number;
  value: number[];
  onChange: (value: number[]) => void;
  applyPriceRange: () => void;
};
const SliderPriceRange: React.FC<SliderPriceRangeProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  applyPriceRange,
}) => {
  return (
    <div>
      <h3 className="font-semibold mb-4">محدوده قیمت</h3>
      <div className="px-2">
        <Slider
          value={value}
          onValueChange={onChange}
          max={max}
          min={min}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <span>{formatPrice(value[1])}</span>
          <span>{formatPrice(value[0])}</span>
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
  );
};

type CategoryFiltersProps = {
  filters: Filters;
  handleCategoryChange: (category: string, checked: boolean) => void;
  onFiltersChange: (filters: Filters) => void;
  categories: Category[];
};
const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  filters,
  handleCategoryChange,
  onFiltersChange,
  categories,
}) => {
  return (
    <div>
      <h3 className="font-semibold mb-4">دسته‌بندی</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-2 ">
            <Checkbox
              id={category.id}
              checked={filters.categories.includes(category.id)}
              onCheckedChange={(checked) =>
                handleCategoryChange(category.id, checked as boolean)
              }
            />
            <label
              htmlFor={category.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {category.title}
            </label>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 cursor-pointer">
        <Checkbox
          id="inStock"
          checked={filters.inStock}
          onCheckedChange={(checked) =>
            onFiltersChange({ ...filters, inStock: checked as boolean })
          }
        />
        <label
          htmlFor="inStock"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70  cursor-pointer"
        >
          فقط کالاهای موجود
        </label>
      </div>
    </div>
  );
};

type ColorFiltersProps = {
  filters: Filters;
  handleColorChange: (color: string, checked: boolean) => void;
  colors: Color[];
};

const ColorFilters: React.FC<ColorFiltersProps> = ({
  filters,
  handleColorChange,
  colors,
}) => {
  return (
    <div>
      <h3 className="font-semibold mb-4">رنگ</h3>
      <div className="grid grid-cols-2 gap-3">
        {colors.map((color) => (
          <div key={color.name} className="flex items-center gap-2">
            <button
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-all flex-shrink-0",
                filters.colors.includes(color.name)
                  ? "border-primary scale-110"
                  : "border-gray-300"
              )}
              style={{ backgroundColor: color.hex }}
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
  );
};

const ClearFiltersButton: React.FC<{
  onClick: () => void;
  filters: {
    priceRange: number[];
    categories: string[];
    inStock: boolean;
    colors: string[];
    searchQuery: string;
  };
}> = ({ onClick, filters }) => {
  return filters.categories.length > 0 ||
    filters.colors.length > 0 ||
    filters.inStock ? (
    <div className="pt-4 border-t">
      <Button variant="outline" onClick={onClick} className="w-full" size="sm">
        <X className="h-4 w-4 ml-2" />
        حذف همه فیلترها
      </Button>
    </div>
  ) : null;
};
