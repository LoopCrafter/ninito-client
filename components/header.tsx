"use client";
import { useState } from "react";
import { Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartSidebar } from "@/components/cart-sidebar";
import Link from "next/link";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-rose-400 tracking-tighter">
            نی نی تو
          </h1>
        </Link>

        <div className="hidden md:flex flex-1 max-w-sm mx-8">
          <div className="relative w-full">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجو در محصولات..."
              className="pl-4 pr-10 rounded-full focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-4 w-4" />
          </Button>
          {/* Theme Toggle */}
          <ThemeToggle />
          {/* Login Button */}
          <Button variant="ghost" className="hidden sm:flex">
            <User className="h-4 w-4 ml-2" />
            ورود / ثبت نام
          </Button>

          <CartSidebar />
          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {isSearchOpen && (
        <div className="md:hidden border-t px-4 py-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجو در محصولات..."
              className="pl-4 pr-10 rounded-full"
            />
          </div>
        </div>
      )}
    </header>
  );
}
