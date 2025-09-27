import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { SavedAddress } from "./address-card";

const addressSchema = z.object({
  fullName: z.string().min(2, "نام و نام خانوادگی الزامی است"),
  phone: z
    .string()
    .regex(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شده و 11 رقم باشد"),
  address: z.string().min(10, "آدرس کامل الزامی است"),
  postalCode: z.string().regex(/^\d{10}$/, "کد پستی باید 10 رقم باشد"),
  city: z.string().min(2, "نام شهر الزامی است"),
  isDefault: z.boolean().optional(),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  initialData?: SavedAddress;
  onSubmit: (data: SavedAddress | Omit<SavedAddress, "id">) => void;
  onCancel: () => void;
  title: string;
  isEditing?: boolean;
}

export function AddressForm({
  initialData,
  onSubmit,
  onCancel,
  title,
  isEditing = false,
}: AddressFormProps) {
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
      fullName: "",
      phone: "",
      address: "",
      postalCode: "",
      city: "",
      isDefault: false,
    },
  });

  const handleSubmit = (data: AddressFormData) => {
    if (isEditing && initialData) {
      onSubmit({
        ...initialData,
        ...data,
      });
    } else {
      const addressData: Omit<SavedAddress, "id"> = {
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        postalCode: data.postalCode,
        city: data.city,
        isDefault: data.isDefault || false,
      };
      onSubmit(addressData);
    }
  };

  return (
    <Card className="product-card">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام و نام خانوادگی</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="نام کامل خود را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره تلفن</FormLabel>
                    <FormControl>
                      <Input placeholder="09xxxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شهر</FormLabel>
                    <FormControl>
                      <Input placeholder="نام شهر" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>کد پستی</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>آدرس کامل</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="آدرس کامل شامل خیابان، کوچه، پلاک و واحد"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>تنظیم به عنوان آدرس پیش‌فرض</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                <ArrowRight className="h-4 w-4 ml-2" />
                لغو
              </Button>
              <Button type="submit" className="flex-1 btn-hero">
                <Save className="h-4 w-4 ml-2" />
                {isEditing ? "ذخیره تغییرات" : "ذخیره آدرس"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
