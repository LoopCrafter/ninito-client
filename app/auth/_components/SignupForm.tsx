"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { signupSchema } from "@/schema/user";
import VerificationForm from "./VerificationForm";

type SignupForm = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const [showVerification, setShowVerification] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSignup = (data: SignupForm) => {
    setSignupEmail(data.email);
    setShowVerification(true);
    toast("کد تأیید به ایمیل شما ارسال شد");
    console.log("Signup data:", data);
  };

  const hideVerification = () => {
    setShowVerification(false);
  };

  if (showVerification) {
    <VerificationForm
      signupEmail={signupEmail}
      hideVerification={hideVerification}
    />;
  }

  return (
    <div className="space-y-6 bg-white shadow-md p-5 rounded-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          ایجاد حساب کاربری
        </h2>
        <p className="text-muted-foreground">
          برای شروع خرید اطلاعات خود را وارد کنید
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={signupForm.handleSubmit(onSignup)}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">نام</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="علی"
              {...signupForm.register("firstName")}
              className="mt-1"
            />
            {signupForm.formState.errors.firstName && (
              <p className="text-sm text-destructive mt-1">
                {signupForm.formState.errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">نام خانوادگی</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="احمدی"
              {...signupForm.register("lastName")}
              className="mt-1"
            />
            {signupForm.formState.errors.lastName && (
              <p className="text-sm text-destructive mt-1">
                {signupForm.formState.errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="signup-email">ایمیل</Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="your@email.com"
            {...signupForm.register("email")}
            className="mt-1"
          />
          {signupForm.formState.errors.email && (
            <p className="text-sm text-destructive mt-1">
              {signupForm.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">شماره موبایل</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="09123456789"
            {...signupForm.register("phone")}
            className="mt-1"
          />
          {signupForm.formState.errors.phone && (
            <p className="text-sm text-destructive mt-1">
              {signupForm.formState.errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password">رمز عبور</Label>
          <Input
            id="password"
            type="password"
            placeholder="حداقل ۸ کاراکتر"
            {...signupForm.register("password")}
            className="mt-1"
          />
          {signupForm.formState.errors.password && (
            <p className="text-sm text-destructive mt-1">
              {signupForm.formState.errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">تأیید رمز عبور</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="رمز عبور را تکرار کنید"
            {...signupForm.register("confirmPassword")}
            className="mt-1"
          />
          {signupForm.formState.errors.confirmPassword && (
            <p className="text-sm text-destructive mt-1">
              {signupForm.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="gender">جنسیت (اختیاری)</Label>
          <Select
            onValueChange={(value) =>
              signupForm.setValue("gender", value as any)
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">مرد</SelectItem>
              <SelectItem value="female">زن</SelectItem>
              <SelectItem value="prefer_not_to_say">ترجیح نمی‌دهم</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full bg-sky-400 hover:bg-sky-500 text-white"
          disabled={signupForm.formState.isSubmitting}
        >
          {signupForm.formState.isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
        </Button>
      </motion.form>
    </div>
  );
}
