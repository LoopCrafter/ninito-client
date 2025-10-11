"use client";
import { useEffect, useState } from "react";
import { Search, User, Menu } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ThemeToggle } from "@/src/components/theme-toggle";
import { CartSidebar } from "@/src/components/cart-sidebar";
import Link from "next/link";
import useApp from "@/src/hooks/useApp";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/src/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useUser } from "@/src/hooks/useUser";
import { useRouter } from "next/navigation";

export function Header() {
  const { user } = useApp();
  const router = useRouter();
  const { logout } = useUser();
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const userName = getInitials(user?.firstName ?? "");

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

          <ThemeToggle />

          {user?.email ? (
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.image} />
                  <AvatarFallback className="bg-rose-300 text-white">
                    {userName}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/profile")}
                  className="cursor-pointer"
                >
                  پروفایل کاربری
                </DropdownMenuItem>
                <DropdownMenuItem>تنظیمات</DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={logout}
                    className="text-rose-600 flex-1 w-full text-right "
                  >
                    خروج
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth?tab=login">
              <Button variant="ghost" className="hidden sm:flex">
                <User className="h-4 w-4 ml-2" />
                ورود / ثبت نام
              </Button>
            </Link>
          )}

          <CartSidebar />
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
