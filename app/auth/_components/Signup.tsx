"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signupAction } from "@/lib/actions/auth";
import { useActionState, useEffect, useState } from "react";
import { GenderSelect } from "./GenderSelect";
import { toast } from "sonner";
import VerificationForm from "./VerificationForm";
import { useRouter } from "next/navigation";

type InitialState = {
  success: boolean;
  errors: Record<string, string>;
  message?: string;
  signup: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    gender: string;
    apiError: string;
  };
};

const initialState: InitialState = {
  success: false,
  message: "",
  errors: {},
  signup: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    apiError: "",
  },
};

const Signup = () => {
  const [data, action, isPending] = useActionState(signupAction, initialState);
  const [showVerification, setShowVerification] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (data.errors?.apiError) {
      toast.error(data.errors.apiError);
    }
    if (data?.success) {
      setShowVerification(true);
    }
  }, [data]);

  const hideVerification = () => {
    setShowVerification(false);
    router.refresh();
  };
  if (showVerification) {
    return (
      <VerificationForm
        signupEmail={data.signup?.email ?? ""}
        hideVerification={hideVerification}
      />
    );
  }

  return (
    <div className="space-y-6 bg-muted shadow-md p-5 rounded-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          ایجاد حساب کاربری
        </h2>
        <p className="text-muted-foreground">
          برای شروع خرید اطلاعات خود را وارد کنید
        </p>
      </div>

      <form action={action} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">نام</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              defaultValue={String(data.signup?.firstName ?? "")}
              placeholder="علی"
              className={`mt-1 ${
                data.errors?.firstName ? "border border-red-600" : ""
              }`}
            />
            {data.errors?.firstName && (
              <span className="text-red-600 text-sm mt-2 block">
                {data.errors.firstName}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">نام خانوادگی</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              defaultValue={String(data.signup?.lastName ?? "")}
              placeholder="احمدی"
              className={`mt-1 ${
                data.errors?.lastName ? "border border-red-600" : ""
              }`}
            />
            {data.errors?.lastName && (
              <span className="text-red-600 text-sm mt-2 block">
                {data.errors.lastName}
              </span>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="signup-email">ایمیل</Label>
          <Input
            id="signup-email"
            type="email"
            name="email"
            defaultValue={String(data.signup?.email ?? "")}
            placeholder="your@email.com"
            className={`mt-1 ${
              data.errors?.email ? "border border-red-600" : ""
            }`}
          />
          {data.errors?.email && (
            <span className="text-red-600 text-sm mt-2 block">
              {data.errors.email}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="phone">شماره موبایل</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={String(data.signup?.phone ?? "")}
            placeholder="09123456789"
            className={`mt-1 ${
              data.errors?.phone ? "border border-red-600" : ""
            }`}
          />
          {data.errors?.phone && (
            <span className="text-red-600 text-sm mt-2 block">
              {data.errors.phone}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="password">رمز عبور</Label>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={String(data.signup?.password ?? "")}
            placeholder="حداقل ۸ کاراکتر"
            className={`mt-1 ${
              data.errors?.password ? "border border-red-600" : ""
            }`}
          />
          {data.errors?.password && (
            <span className="text-red-600 text-sm mt-2 block">
              {data.errors.password}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">تأیید رمز عبور</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            defaultValue={String(data.signup?.confirmPassword ?? "")}
            placeholder="رمز عبور را تکرار کنید"
            className={`mt-1 ${
              data.errors?.confirmPassword ? "border border-red-600" : ""
            }`}
          />
          {data.errors?.confirmPassword && (
            <span className="text-red-600 text-sm mt-2 block">
              {data.errors.confirmPassword}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="gender">جنسیت (اختیاری)</Label>
          <GenderSelect
            defaultValue={data.signup?.gender ?? ""}
            error={data.errors?.gender}
          />
          {data.errors?.gender && (
            <span className="text-red-600 text-sm mt-2 block">
              {data.errors.gender}
            </span>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-sky-400 hover:bg-sky-500 text-white"
        >
          {isPending ? "در حال ثبت نام..." : "ثبت‌ نام"}
        </Button>
        {data.errors?.apiError && (
          <span className="text-red-600 text-sm mt-2 block">
            {data.errors?.apiError}
          </span>
        )}
      </form>
    </div>
  );
};

export default Signup;
