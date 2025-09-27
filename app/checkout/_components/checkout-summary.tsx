import { useState } from "react";
import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { CartItemData } from "./cart-item";
import { useToast } from "@/hooks/useToast";

interface CheckoutSummaryProps {
  items: CartItemData[];
  shippingCost?: number;
  discountCode?: string;
  onDiscountApply?: (code: string) => void;
}

export function CheckoutSummary({
  items,
  shippingCost = 0,
  discountCode: appliedDiscountCode,
  onDiscountApply,
}: CheckoutSummaryProps) {
  const [discountCode, setDiscountCode] = useState("");
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const { toast } = useToast();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = appliedDiscountCode ? Math.floor(subtotal * 0.1) : 0; // 10% discount example
  const total = subtotal + shippingCost - discountAmount;

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;

    setIsApplyingDiscount(true);

    // شبیه‌سازی بررسی کد تخفیف
    setTimeout(() => {
      if (discountCode.toLowerCase() === "ninito10") {
        onDiscountApply?.(discountCode);
        toast({
          title: "کد تخفیف اعمال شد",
          description: "10% تخفیف به سفارش شما اعمال شد",
        });
        setDiscountCode("");
      } else {
        toast({
          title: "کد تخفیف نامعتبر",
          description: "لطفاً کد تخفیف صحیح وارد کنید",
          variant: "destructive",
        });
      }
      setIsApplyingDiscount(false);
    }, 1000);
  };

  return (
    <Card className="product-card sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">خلاصه سفارش</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* لیست محصولات */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-sm"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground line-clamp-1">
                  {item.name}
                </p>
                <p className="text-muted-foreground">
                  {item.quantity} × {item.price.toLocaleString()} تومان
                </p>
              </div>
              <p className="font-medium text-foreground">
                {(item.price * item.quantity).toLocaleString()} تومان
              </p>
            </div>
          ))}
        </div>

        <Separator />

        {/* کد تخفیف */}
        {!appliedDiscountCode && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="کد تخفیف"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleApplyDiscount}
                disabled={isApplyingDiscount || !discountCode.trim()}
              >
                <Tag className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* نمایش تخفیف اعمال شده */}
        {appliedDiscountCode && (
          <div className="bg-accent/50 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary font-medium">
                کد تخفیف: {appliedDiscountCode}
              </span>
              <span className="text-primary">
                -{discountAmount.toLocaleString()} تومان
              </span>
            </div>
          </div>
        )}

        <Separator />

        {/* محاسبات */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">جمع کل محصولات:</span>
            <span className="text-foreground">
              {subtotal.toLocaleString()} تومان
            </span>
          </div>

          {shippingCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">هزینه ارسال:</span>
              <span className="text-foreground">
                {shippingCost.toLocaleString()} تومان
              </span>
            </div>
          )}

          {discountAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">تخفیف:</span>
              <span className="text-primary">
                -{discountAmount.toLocaleString()} تومان
              </span>
            </div>
          )}
        </div>

        <Separator />

        {/* مجموع نهایی */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-foreground">
            مجموع نهایی:
          </span>
          <span className="text-xl font-bold text-primary">
            {total.toLocaleString()} تومان
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
