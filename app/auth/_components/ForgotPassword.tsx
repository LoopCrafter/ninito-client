"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import ForgetPasswordResetInfo from "./ForgetPasswordResetInfo";
import { resetPasswordAction } from "@/src/lib/actions/auth";
import { toast } from "sonner";

interface ForgotPasswordFormProps {
  onBack: () => void;
}

type InitialState = {
  success: boolean;
  errors: Record<string, string>;
  email: string;
  message: string;
};

const initialState: InitialState = {
  success: false,
  errors: {},
  email: "",
  message: "",
};

export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [data, action, isPending] = useActionState(
    resetPasswordAction,
    initialState
  );

  useEffect(() => {
    if (data.errors?.apiError) {
      toast.error(data.errors.apiError);
    }
    if (data?.success) {
      setEmailSent(true);
    }
  }, [data]);

  if (emailSent) {
    return (
      <ForgetPasswordResetInfo resetEmail={data?.email ?? ""} onBack={onBack} />
    );
  }

  return (
    <div className="space-y-6 bg-white shadow-md rounded-xl  p-3 py-5">
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

      <form action={action} className="space-y-4">
        <div>
          <Label htmlFor="reset-email">ایمیل</Label>
          <Input
            id="reset-email"
            type="email"
            name="email"
            placeholder="your@email.com"
            defaultValue={data.email}
            className={`mt-1 ${data?.errors.email ? "border-red-600" : ""}`}
          />
          {data?.errors.email && (
            <span className="text-red-600 text-sm mt-2 block">
              {data?.errors.email}
            </span>
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
            disabled={isPending}
            className="flex-1 bg-sky-400 hover:bg-sky-500 text-white"
          >
            {isPending ? "در حال ارسال..." : "ارسال لینک "}
          </Button>
        </div>
      </form>
    </div>
  );
}
