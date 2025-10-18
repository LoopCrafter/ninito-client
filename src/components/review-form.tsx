"use client";
import { useState } from "react";
import { Star, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import useApp from "../hooks/useApp";
import Link from "next/link";
import { apiFetchClient } from "../lib/apiFetch.client";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const reviewSchema = z.object({
  rating: z.number().min(1, "لطفاً امتیاز خود را انتخاب کنید").max(5),
  title: z
    .string()
    .min(5, "عنوان باید حداقل 5 کاراکتر باشد")
    .max(100, "عنوان نباید بیشتر از 100 کاراکتر باشد"),
  comment: z
    .string()
    .min(10, "نظر شما باید حداقل 10 کاراکتر باشد")
    .max(500, "نظر شما نباید بیشتر از 500 کاراکتر باشد"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export function ReviewForm() {
  const { user } = useApp();
  const { id } = useParams();
  const router = useRouter();
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      title: "",
    },
  });

  const selectedRating = form.watch("rating");

  const onSubmit = async (data: ReviewFormData) => {
    try {
      const newComment = {
        rating: data.rating,
        text: data.comment,
        title: data.title,
      };
      const response = await apiFetchClient(`/products/${id}/reviews`, {
        method: "POST",
        body: JSON.stringify(newComment),
      });
      toast("نظر شما با موفقیت ثبت شد و پس از بررسی منتشر خواهد شد.");
      console.log("Submitted review:", id, data, response);
      form.reset();
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>ثبت نظر</CardTitle>
          <CardDescription>
            برای ثبت نظر ابتدا باید وارد حساب کاربری خود شوید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 py-8">
            <User className="h-16 w-16 text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              برای ثبت نظر و امتیازدهی به این محصول، لطفاً وارد حساب کاربری خود
              شوید
            </p>
            <div className="flex gap-3">
              <Link href={`/auth?tab=login&redirect=/products/${id}`}>
                <Button>ورود به حساب کاربری</Button>
              </Link>
              <Link href="/auth?tab=signup">
                <Button variant="outline">ثبت نام</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ثبت نظر</CardTitle>
        <CardDescription>
          نظر شما در بهبود کیفیت محصولات ما بسیار مؤثر است
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>امتیاز شما</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => field.onChange(star)}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-8 w-8 transition-colors ${
                              star <= (hoveredRating || selectedRating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 hover:text-yellow-200"
                            }`}
                          />
                        </button>
                      ))}
                      {selectedRating > 0 && (
                        <span className="mr-3 text-sm text-muted-foreground">
                          {selectedRating === 1 && "خیلی بد"}
                          {selectedRating === 2 && "بد"}
                          {selectedRating === 3 && "متوسط"}
                          {selectedRating === 4 && "خوب"}
                          {selectedRating === 5 && "عالی"}
                        </span>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان نظر</FormLabel>
                  <FormControl>
                    <input
                      placeholder="خلاصه‌ای از نظر شما..."
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>متن نظر</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="نظر خود را در مورد این محصول بنویسید..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <FormMessage />
                    <span>{field.value?.length || 0}/500</span>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "در حال ارسال..." : "ثبت نظر"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
