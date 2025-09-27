"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  MapPin,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CartItem, type CartItemData } from "./_components/cart-item";
import { AddressList } from "@/components/address-list";
import { AddressForm } from "@/components/address-form";
import type { SavedAddress } from "@/components/address-card";
import { useToast } from "@/hooks/useToast";
import { CheckoutStepper } from "./_components/checkout-stepper";
import { CheckoutSummary } from "./_components/checkout-summary";
import { paymentSchema } from "@/schema";
import EmptyCart from "./_components/empty-cart";
import Link from "next/link";

const shippingSchema = z.object({
  shippingMethod: z.string().min(1, "روش ارسال را انتخاب کنید"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;
type PaymentFormData = z.infer<typeof paymentSchema>;

const sampleCartItems: CartItemData[] = [
  {
    id: "1",
    name: "آغوشی نوزاد پرتقالی طرح خرگوش",
    price: 850000,
    quantity: 1,
    color: "نارنجی",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "قنداق نوزاد سفید با نقشه ستاره",
    price: 650000,
    quantity: 2,
    color: "سفید",
    image: "/placeholder.svg",
  },
];

const sampleAddresses: SavedAddress[] = [
  {
    id: "1",
    fullName: "مریم احمدی",
    phone: "09123456789",
    address: "تهران، خیابان ولیعصر، کوچه نادری، پلاک 15، واحد 3",
    postalCode: "1234567890",
    city: "تهران",
    isDefault: true,
  },
  {
    id: "2",
    fullName: "علی رضایی",
    phone: "09123456789",
    address: "تهران، خیابان انقلاب، کوچه شهید احمدی، پلاک 28، واحد 1",
    postalCode: "1234567891",
    city: "تهران",
    isDefault: false,
  },
];

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState<CartItemData[]>(sampleCartItems);
  const [savedAddresses, setSavedAddresses] =
    useState<SavedAddress[]>(sampleAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [shippingCost, setShippingCost] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const shippingForm = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });

  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "online",
    },
  });

  useEffect(() => {
    const defaultAddress = savedAddresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
    }
  }, [savedAddresses]);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleShippingChange = (method: string) => {
    const costs = {
      post: 50000,
      tipax: 80000,
      express: 120000,
    };
    setShippingCost(costs[method as keyof typeof costs] || 0);
  };

  const handleDiscountApply = (code: string) => {
    setDiscountCode(code);
  };

  const handleOrderSubmit = async (paymentData: PaymentFormData) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "سفارش با موفقیت ثبت شد",
        description: "شماره پیگیری: 1234567890",
      });
    } catch (error) {
      toast({
        title: "خطا در پردازش پرداخت",
        description: "لطفاً دوباره تلاش کنید",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card className="product-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  سبد خرید شما
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <EmptyCart />
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                      />
                    ))}

                    <div className="flex gap-3 pt-4">
                      <Link href="/products" className="flex-1">
                        <Button variant="outline" className="flex-1">
                          ادامه خرید
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        onClick={() => setCartItems([])}
                        className="flex-1"
                      >
                        خالی کردن سبد
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {cartItems.length > 0 && (
              <div className="flex justify-end">
                <Button onClick={() => setCurrentStep(2)} className="btn-hero">
                  نهایی کردن
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </Button>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card className="product-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  اطلاعات ارسال
                </CardTitle>
              </CardHeader>
              <CardContent>
                {savedAddresses.length > 0 ? (
                  <AddressList
                    addresses={savedAddresses}
                    selectedAddressId={selectedAddressId}
                    onAddressSelect={setSelectedAddressId}
                    onAddressesChange={setSavedAddresses}
                  />
                ) : (
                  <AddressForm
                    onSubmit={(newAddress) => {
                      const address: SavedAddress = {
                        ...newAddress,
                        id: Date.now().toString(),
                        isDefault: savedAddresses.length === 0,
                      } as SavedAddress;

                      setSavedAddresses([address]);
                      setSelectedAddressId(address.id);

                      toast({
                        title: "آدرس اضافه شد",
                        description: "آدرس شما با موفقیت ذخیره شد",
                      });
                    }}
                    onCancel={() => {}}
                    title="ثبت آدرس ارسال"
                  />
                )}

                {/* انتخاب روش ارسال */}
                {selectedAddressId && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <Form {...shippingForm}>
                      <form className="space-y-4">
                        <FormField
                          control={shippingForm.control}
                          name="shippingMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>روش ارسال</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  handleShippingChange(value);
                                }}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="انتخاب روش ارسال" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="post">
                                    پست پیشتاز (50,000 تومان)
                                  </SelectItem>
                                  <SelectItem value="tipax">
                                    تیپاکس (80,000 تومان)
                                  </SelectItem>
                                  <SelectItem value="express">
                                    پست سریع (120,000 تومان)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowRight className="h-4 w-4 ml-2" />
                بازگشت به سبد
              </Button>
              <Button
                onClick={() => {
                  if (!selectedAddressId) {
                    toast({
                      title: "آدرس انتخاب نشده",
                      description: "لطفاً آدرس ارسال را انتخاب کنید",
                      variant: "destructive",
                    });
                    return;
                  }

                  shippingForm.handleSubmit(() => setCurrentStep(3))();
                }}
                className="btn-hero"
                disabled={!selectedAddressId}
              >
                پرداخت
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card className="product-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  روش پرداخت
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...paymentForm}>
                  <form
                    onSubmit={paymentForm.handleSubmit(handleOrderSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={paymentForm.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>انتخاب روش پرداخت</FormLabel>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                              <div className="flex items-center space-x-2 border rounded-lg p-4">
                                <RadioGroupItem value="online" id="online" />
                                <Label
                                  htmlFor="online"
                                  className="flex-1 cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    پرداخت آنلاین
                                  </div>
                                </Label>
                              </div>

                              <div className="flex items-center space-x-2 border rounded-lg p-4">
                                <RadioGroupItem value="cash" id="cash" />
                                <Label
                                  htmlFor="cash"
                                  className="flex-1 cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <Truck className="h-4 w-4" />
                                    پرداخت در محل
                                  </div>
                                </Label>
                              </div>

                              <div className="flex items-center space-x-2 border rounded-lg p-4">
                                <RadioGroupItem
                                  value="transfer"
                                  id="transfer"
                                />
                                <Label
                                  htmlFor="transfer"
                                  className="flex-1 cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    کارت به کارت
                                  </div>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {paymentForm.watch("paymentMethod") === "online" && (
                      <div className="space-y-4 p-4 border rounded-lg bg-accent/20">
                        <h3 className="font-medium text-foreground">
                          اطلاعات کارت اعتباری
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={paymentForm.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>شماره کارت</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="1234 5678 9012 3456"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={paymentForm.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>تاریخ انقضا</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={paymentForm.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={paymentForm.control}
                            name="cardHolder"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>نام دارنده کارت</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="نام و نام خانوادگی به انگلیسی"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Security badges */}
                    <div className="flex items-center justify-center gap-4 p-4 bg-accent/20 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="h-4 w-4" />
                        پرداخت امن SSL
                      </div>
                      <div className="h-4 w-px bg-border" />
                      <div className="text-sm text-muted-foreground">
                        ضمانت بازگشت وجه
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                      >
                        <ArrowRight className="h-4 w-4 ml-2" />
                        بازگشت به نهایی کردن
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="btn-hero min-w-[160px]"
                      >
                        {isLoading ? "در حال پردازش..." : "تأیید پرداخت"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Page header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            سبد خرید و پرداخت
          </h1>
          <p className="text-muted-foreground">
            نهایی کردن سفارش شما در فروشگاه نینیتو
          </p>
        </div>

        {/* Stepper */}
        <CheckoutStepper
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step content */}
          <div className="lg:col-span-2">{renderStepContent()}</div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <CheckoutSummary
              items={cartItems}
              shippingCost={shippingCost}
              discountCode={discountCode}
              onDiscountApply={handleDiscountApply}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
