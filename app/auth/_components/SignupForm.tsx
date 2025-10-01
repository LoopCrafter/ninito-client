"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { User, Mail, Phone, Upload, Check } from "lucide-react";
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

const signupSchema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("فرمت ایمیل صحیح نیست"),
  phone: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود"),
  gender: z.enum(["male", "female", "prefer_not_to_say"]).optional(),
});

const verifySchema = z.object({
  code: z.string().length(6, "کد باید ۶ رقم باشد"),
});

type SignupForm = z.infer<typeof signupSchema>;
type VerifyForm = z.infer<typeof verifySchema>;

export function SignUpForm() {
  const [showVerification, setShowVerification] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const verifyForm = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema),
  });

  const onSignup = (data: SignupForm) => {
    setSignupEmail(data.email);
    setShowVerification(true);
    toast("کد تأیید به ایمیل شما ارسال شد");
    console.log("Signup data:", data);
    console.log("Profile image:", profileImage);
  };

  const onVerify = (data: VerifyForm) => {
    toast("حساب کاربری شما با موفقیت ایجاد شد");
    console.log("Verification code:", data.code, "for:", signupEmail);
    setShowVerification(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (showVerification) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            تأیید حساب کاربری
          </h2>
          <p className="text-muted-foreground">
            کد تأیید به ایمیل <span className="font-medium">{signupEmail}</span>{" "}
            ارسال شد
          </p>
        </div>

        <form
          onSubmit={verifyForm.handleSubmit(onVerify)}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="verify-code">کد تأیید</Label>
            <Input
              id="verify-code"
              type="text"
              placeholder="123456"
              maxLength={6}
              {...verifyForm.register("code")}
              className="mt-1 text-center text-lg tracking-widest"
            />
            {verifyForm.formState.errors.code && (
              <p className="text-sm text-destructive mt-1">
                {verifyForm.formState.errors.code.message}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowVerification(false);
                verifyForm.reset();
              }}
              className="flex-1"
            >
              بازگشت
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-rose-400 hover:bg-rose-500 text-white"
              disabled={verifyForm.formState.isSubmitting}
            >
              {verifyForm.formState.isSubmitting
                ? "در حال تأیید..."
                : "تأیید کد"}
            </Button>
          </div>
        </form>
      </motion.div>
    );
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
