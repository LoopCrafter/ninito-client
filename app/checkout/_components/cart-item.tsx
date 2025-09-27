import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface CartItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
}

interface CartItemProps {
  item: CartItemData;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    onQuantityChange(item.id, newQuantity);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    // انیمیشن برای حذف
    setTimeout(() => {
      onRemove(item.id);
    }, 150);
  };

  const totalPrice = item.price * item.quantity;

  return (
    <Card
      className={`product-card transition-all duration-300 ${
        isRemoving ? "opacity-0 scale-95" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* تصویر محصول */}
          <div className="relative flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg border border-border"
            />
          </div>

          {/* اطلاعات محصول */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground mb-1 line-clamp-2">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              رنگ: {item.color}
            </p>
            <p className="text-sm font-medium text-primary">
              {item.price.toLocaleString()} تومان
            </p>
          </div>

          {/* کنترل تعداد */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="w-8 text-center font-medium text-foreground">
              {item.quantity}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* قیمت کل و حذف */}
          <div className="flex flex-col items-end gap-2">
            <p className="font-semibold text-foreground">
              {totalPrice.toLocaleString()} تومان
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
