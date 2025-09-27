import { Button } from "@/components/ui/button";
import React from "react";

const EmptyCart = () => {
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground mb-4">سبد خرید شما خالی است</p>
      <Button variant="outline" onClick={() => window.history.back()}>
        بازگشت به فروشگاه
      </Button>
    </div>
  );
};

export default EmptyCart;
