"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import useApp from "@/src/hooks/useApp";
import { User } from "@/src/types/user";
import { Eye, EyeOff, Mail, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { ForgotPasswordForm } from "./ForgotPassword";
import { toast } from "sonner";
import { LoginSchema } from "@/src/schema/auth";
import { apiFetchClient } from "@/src/lib/apiFetch.client";

type LoginState = {
  success: boolean;
  message?: string;
  user?: User;
  errors?: Record<string, string>;
  login: {
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
  };
};

const initialState: LoginState = {
  success: false,
  message: "",
  user: undefined,
  errors: {},
  login: {
    email: "",
    password: "",
  },
};

const loginAction = async (Prev: any, formData: FormData) => {
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = LoginSchema.safeParse(loginData);
  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (!errors[field as string]) {
        errors[field as string] = issue.message;
      }
    });
    return {
      success: false,
      errors,
      login: loginData,
    };
  }
  try {
    const data = await apiFetchClient<{
      accessToken: string;
      refreshToken: string;
      user: User;
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });

    if (!data?.user) {
      return {
        success: false,
        message: "لطفاً بعداً دوباره تلاش کنید",
        login: loginData,
      };
    }
    return {
      success: true,
      message: "ورود موفق",
      login: loginData,
      user: data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: "لطفاً بعداً دوباره تلاش کنید",
      login: loginData,
    };
  }
};
const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [data, action, isPending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const { setUser } = useApp();
  useEffect(() => {
    if (data.user) {
      setUser(data.user);
      toast.success("شما با موفقیت وارد شدید");
      router.replace("/");
    }
  }, [data]);

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
          <form action={action} className="space-y-4">
            <div>
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={String(data.login?.email ?? "")}
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
              <Label htmlFor="password">رمز عبور</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  defaultValue={String(data.login?.password ?? "")}
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور خود را وارد کنید"
                  className={`pl-10 text-right ltr ${
                    data.errors?.password ? "border border-red-600" : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {!showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {data.errors?.password && (
                <span className="text-red-600 text-sm mt-2 block">
                  {data.errors.password}
                </span>
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
              disabled={isPending}
            >
              {isPending ? "در حال ورود..." : "ورود"}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="otp" className="space-y-4 mt-6">
          {!otpSent ? (
            <form className="space-y-4">
              <div>
                <Label htmlFor="otp-email">ایمیل</Label>
                <Input
                  id="otp-email"
                  type="email"
                  placeholder="your@email.com"
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-sky-400 hover:bg-sky-500 text-white"
              >
                ارسال کد
              </Button>
            </form>
          ) : (
            <form className="space-y-4">
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
                  className="mt-1 text-center text-lg tracking-widest"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOtpSent(false);
                  }}
                  className="flex-1"
                >
                  بازگشت
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white"
                >
                  تأیید کد
                </Button>
              </div>
            </form>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
