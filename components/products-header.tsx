import { useState } from "react";
import { Search, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { SortOption, ViewMode } from "@/app/products/page";

interface ProductsHeaderProps {
  viewMode: ViewMode;
  sortBy: SortOption;
  onViewModeChange: (mode: ViewMode) => void;
  onSortChange: (sort: SortOption) => void;
  totalProducts: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const sortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "popular", label: "محبوب‌ترین" },
  { value: "price-low", label: "ارزان‌ترین" },
  { value: "price-high", label: "گران‌ترین" },
  { value: "rating", label: "پرامتیازترین" },
];

export function ProductsHeader({
  viewMode,
  sortBy,
  onViewModeChange,
  onSortChange,
  totalProducts,
  searchQuery,
  onSearchChange,
}: ProductsHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="space-y-4 mb-8">
      {/* Controls Bar */}
      <div className="flex items-center justify-between bg-card p-4 rounded-xl card-shadow">
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <Select
              value={sortBy}
              onValueChange={(value) => onSortChange(value as SortOption)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "px-3 py-2 rounded-md transition-all",
              viewMode === "grid"
                ? "bg-selected shadow-sm"
                : "hover:bg-selected/50"
            )}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            className={cn(
              "px-3 py-2 rounded-md transition-all",
              viewMode === "list"
                ? "bg-selected shadow-sm"
                : "hover:bg-selected/50"
            )}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجو در محصولات..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-4 pr-10 rounded-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
