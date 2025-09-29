"use client";
import { useEffect, useState } from "react";
import { X, Minus, Plus, ShoppingBag, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import useBasket from "@/hooks/useBasket";
import useAddToBasket from "@/hooks/useAddToBasket";
import { getFinalPrice } from "@/utils";
import EmptyCart from "./empty-cart";

export function CartSidebar() {
  const [mounted, setMounted] = useState(false);
  const { incrementQuantity, decrementQuantity, removeItem } = useAddToBasket();
  const { basket } = useBasket();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const getTotalPrice = () => {
    return basket.reduce((total, item) => {
      const finalPrice = getFinalPrice(item.product, item.variant);
      return total + finalPrice * item.quantity;
    }, 0);
  };

  const itemCount = basket.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingBag className="h-4 w-4 ml-2" />
          سبد خرید
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-rose-400">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader dir="ltr">
          <SheetTitle className="text-right">سبد خرید شما</SheetTitle>
        </SheetHeader>

        {basket.length > 0 ? (
          <div className="mt-6 p-2">
            {basket.map((item) => (
              <div
                key={item.variant.id}
                className="flex items-center gap-4 border-b py-4"
              >
                <img
                  src={item.product.thumbnailUrl}
                  alt={item.product.title}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex flex-col flex-1 gap-2">
                  <h3 className="font-medium text-sm">{item.product.title}</h3>
                  <div className="flex justify-start items-center">
                    <p className="text-xs text-muted-foreground w-1/2">
                      رنگ: {item.variant.color.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      سایز: {item.variant.size}
                    </p>
                  </div>
                  <div className="flex justify-between items-center flex-1">
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-sm">
                        {formatPrice(
                          getFinalPrice(item.product, item.variant) *
                            item.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex">
                      <div className="flex items-center gap-2">
                        {item.quantity > 1 ? (
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              decrementQuantity(
                                item.product.id,
                                item.variant.id
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              removeItem(item.product.id, item.variant.id)
                            }
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        )}
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            incrementQuantity(item.product.id, item.variant.id)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>مجموع:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <Button className="w-full btn-hero">تکمیل خرید</Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                ادامه خرید
              </Button>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </SheetContent>
    </Sheet>
  );
}
