"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().email("فرمت ایمیل صحیح نیست"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    setResetEmail(data.email);
    setEmailSent(true);
    toast("لینک بازیابی رمز عبور به ایمیل شما ارسال شد");
    console.log("Send reset link to:", data.email);
  };

  if (emailSent) {
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
            ایمیل ارسال شد
          </h2>
          <p className="text-muted-foreground">
            لینک بازیابی رمز عبور به ایمیل{" "}
            <span className="font-medium">{resetEmail}</span> ارسال شد
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            لطفاً ایمیل خود را بررسی کنید و روی لینک کلیک کنید
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setEmailSent(false);
              form.reset();
            }}
            className="flex-1"
          >
            ارسال مجدد
          </Button>
          <Button
            onClick={onBack}
            className="flex-1 bg-sky-400 hover:bg-sky-500 text-white"
          >
            بازگشت به ورود
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-white shadow-md rounded-xl  p-3 py-5"
    >
      <div className="text-center ">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          فراموشی رمز عبور
        </h2>
        <p className="text-muted-foreground">
          ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال شود
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="reset-email">ایمیل</Label>
          <Input
            id="reset-email"
            type="email"
            placeholder="your@email.com"
            {...form.register("email")}
            className="mt-1"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-sky-400 hover:bg-sky-500 text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "در حال ارسال..." : "ارسال لینک"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
