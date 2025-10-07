"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useApp from "@/hooks/useApp";
import { loginAction } from "@/lib/actions/auth";
import { User } from "@/types/user";
import { Eye, EyeOff, Mail, Smartphone } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { success } from "zod";

type LoginState = {
  success: boolean;
  message: string;
  user?: User;
  errors?: string[];
  login?: {
    email: string;
    password: string;
  };
};
const initialState: any = {
  success: false,
  message: "",
  user: undefined,
  errors: [],
  login: {
    email: "",
    password: "",
  },
};
const Login = () => {
  const [data, action, isPending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setUser } = useApp();
  useEffect(() => {
    if (data.user) {
      setUser(data.user);
      router.replace("/");
    }
  }, [data]);

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
                  type="password"
                  name="password"
                  defaultValue={String(data.login?.password ?? "")}
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
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                {data.errors?.password && (
                  <span className="text-red-600 text-sm mt-2 block">
                    {data.errors.password}
                  </span>
                )}
              </div>
            </div>

            <div className="text-left">
              <button
                type="button"
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
      </Tabs>
    </div>
  );
};

export default Login;
