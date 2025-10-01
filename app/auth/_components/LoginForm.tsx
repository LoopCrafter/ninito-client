"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ForgotPasswordForm } from "./ForgotPassword";
import { apiFetch } from "@/lib/apiClient";
import { apiFetchClient } from "@/lib/apiFetch.client";
import useApp from "@/hooks/useApp";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

const emailLoginSchema = z.object({
  email: z.string().email("فرمت ایمیل صحیح نیست"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

const otpLoginSchema = z.object({
  email: z.string().email("فرمت ایمیل صحیح نیست"),
});

const otpVerifySchema = z.object({
  code: z.string().length(6, "کد باید ۶ رقم باشد"),
});

type EmailLoginForm = z.infer<typeof emailLoginSchema>;
type OtpLoginForm = z.infer<typeof otpLoginSchema>;
type OtpVerifyForm = z.infer<typeof otpVerifySchema>;
type LoginFormProps = {};
export function LoginForm({}: LoginFormProps) {
  const { setUser } = useApp();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");

  const emailForm = useForm<EmailLoginForm>({
    resolver: zodResolver(emailLoginSchema),
  });

  const otpForm = useForm<OtpLoginForm>({
    resolver: zodResolver(otpLoginSchema),
  });

  const otpVerifyForm = useForm<OtpVerifyForm>({
    resolver: zodResolver(otpVerifySchema),
  });

  const onEmailLogin = async (data: EmailLoginForm) => {
    try {
      const res = await apiFetchClient<{ accessToken: string; user: User }>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      toast("با موفقیت وارد شدید");
      setUser(res.user);
      router.replace("/");
    } catch (error) {
      toast.error("رمز عبور یا ایمیل اشتباه است");
    }
  };

  const onSendOtp = (data: OtpLoginForm) => {
    setOtpEmail(data.email);
    setOtpSent(true);
    toast("کد تأیید به ایمیل شما ارسال شد");
    console.log("Send OTP to:", data.email);
  };

  const onVerifyOtp = (data: OtpVerifyForm) => {
    toast("با موفقیت وارد شدید");
    console.log("Verify OTP:", data.code, "for:", otpEmail);
    setOtpSent(false);
  };

  if (showForgotPassword) {
    return <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">خوش آمدید</h2>
        <p className="text-muted-foreground">
          برای ادامه وارد حساب کاربری خود شوید
        </p>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            ایمیل
          </TabsTrigger>
          <TabsTrigger value="otp" className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            کد یکبارمصرف
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4 mt-6">
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={emailForm.handleSubmit(onEmailLogin)}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...emailForm.register("email")}
                className="mt-1"
              />
              {emailForm.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {emailForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">رمز عبور</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور خود را وارد کنید"
                  {...emailForm.register("password")}
                  className="pl-10 text-right ltr"
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
              {emailForm.formState.errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {emailForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="text-left">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-primary hover:underline"
              >
                فراموشی رمز عبور؟
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-sky-400 hover:bg-sky-500 text-white"
              disabled={emailForm.formState.isSubmitting}
            >
              {emailForm.formState.isSubmitting ? "در حال ورود..." : "ورود"}
            </Button>
          </motion.form>
        </TabsContent>

        <TabsContent value="otp" className="space-y-4 mt-6">
          {!otpSent ? (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={otpForm.handleSubmit(onSendOtp)}
              className="space-y-4 bg-muted p-4 rounded-xl"
            >
              <div>
                <Label htmlFor="otp-email">ایمیل</Label>
                <Input
                  id="otp-email"
                  type="email"
                  placeholder="your@email.com"
                  {...otpForm.register("email")}
                  className="mt-1"
                />
                {otpForm.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {otpForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-sky-400 hover:bg-sky-500 text-white"
                disabled={otpForm.formState.isSubmitting}
              >
                {otpForm.formState.isSubmitting
                  ? "در حال ارسال..."
                  : "ارسال کد"}
              </Button>
            </motion.form>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={otpVerifyForm.handleSubmit(onVerifyOtp)}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <p className="text-muted-foreground">
                  کد تأیید به ایمیل{" "}
                  <span className="font-medium">{otpEmail}</span> ارسال شد
                </p>
              </div>

              <div>
                <Label htmlFor="otp-code">کد تأیید</Label>
                <Input
                  id="otp-code"
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  {...otpVerifyForm.register("code")}
                  className="mt-1 text-center text-lg tracking-widest"
                />
                {otpVerifyForm.formState.errors.code && (
                  <p className="text-sm text-destructive mt-1">
                    {otpVerifyForm.formState.errors.code.message}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOtpSent(false);
                    otpVerifyForm.reset();
                  }}
                  className="flex-1"
                >
                  بازگشت
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white"
                  disabled={otpVerifyForm.formState.isSubmitting}
                >
                  {otpVerifyForm.formState.isSubmitting
                    ? "در حال تأیید..."
                    : "تأیید کد"}
                </Button>
              </div>
            </motion.form>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
