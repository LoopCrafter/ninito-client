"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { resetPasswordSchema } from "@/schema/user";
import { apiFetchClient } from "@/lib/apiFetch.client";
import { useParams } from "next/navigation";

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const { code } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    setIsLoading(true);
    try {
      const response = await apiFetchClient(`/auth/reset-password/${code}`, {
        method: "POST",
        body: JSON.stringify({ password: data.password }),
      });
      setIsSuccess(true);
      toast("رمز عبور شما با موفقیت تغییر یافت");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error: ", error);
        toast.error(error.message);
      } else {
        toast.error("خطای غیرمنتظره ای رخ داده است. لطفا مجددا تلاش کنید!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <section className=" bg-gradient-to-r from-sky-200 to-rose-200 dark:from-sky-700 dark:to-rose-700 min-h-[85vh]">
        <div className="container mx-auto px-4 py-8 pt-24">
          <motion.div className="max-w-md mx-auto">
            <div className="bg-card rounded-xl p-6 shadow-md">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    رمز عبور تغییر یافت
                  </h2>
                  <p className="text-muted-foreground">
                    رمز عبور شما با موفقیت تغییر یافت. اکنون می‌توانید با رمز
                    عبور جدید وارد شوید
                  </p>
                </div>
                <Link href="/auth?tab=login">
                  <Button className="w-full bg-sky-400 hover:bg-sky-500 text-white">
                    رفتن به صفحه ورود
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className=" bg-gradient-to-r from-sky-200 to-rose-200 dark:from-sky-700 dark:to-rose-700 min-h-[85vh]">
      <div className="container mx-auto px-4 py-8 pt-24">
        ≈
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-card rounded-xl p-6 shadow-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                تعیین رمز عبور جدید
              </h2>
              <p className="text-muted-foreground">
                رمز عبور جدید خود را وارد کنید
              </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="password">رمز عبور جدید</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور جدید خود را وارد کنید"
                    {...form.register("password")}
                    className="pl-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">تکرار رمز عبور</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="رمز عبور را مجدداً وارد کنید"
                    {...form.register("confirmPassword")}
                    className="pl-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-rose-400 hover:bg-rose-500 text-white"
                disabled={isLoading}
              >
                {isLoading ? "در حال ذخیره..." : "ذخیره رمز عبور"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
