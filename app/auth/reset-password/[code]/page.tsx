"use client";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import SuccessReset from "../_components/SuccessReset";
import { setResetPasswordAction } from "@/lib/actions/auth";
import { toast } from "sonner";

type InitialState = {
  success: boolean;
  errors: Record<string, string>;
  reset: {
    password: string;
    confirmPassword: string;
    code: string;
  };
  message: string;
};

const initialState: InitialState = {
  success: false,
  errors: {},
  reset: {
    password: "",
    confirmPassword: "",
    code: "",
  },
  message: "",
};

export default function ResetPassword() {
  const { code } = useParams();
  const [data, action, isPending] = useActionState(
    setResetPasswordAction,
    initialState
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data.success) {
      toast.success(data.message);
      setIsSuccess(true);
    }
    if (data.errors?.apiError) {
      toast.error(data.errors.apiError);
    }
  }, [data]);

  if (isSuccess) {
    return <SuccessReset />;
  }

  return (
    <section className=" bg-gradient-to-r from-sky-200 to-rose-200 dark:from-sky-700 dark:to-rose-700 min-h-[85vh]">
      <div className="container mx-auto px-4 py-8 pt-24">
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

            <form action={action} className="space-y-4">
              <div>
                <input type="hidden" value={code} name="code" />
                <Label htmlFor="password">رمز عبور جدید</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    defaultValue={(data?.reset?.password ?? "") as string}
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور جدید خود را وارد کنید"
                    className={`pl-10 ltr text-right ${
                      data?.errors?.password ? "border-red-600" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {!!data?.errors?.password && (
                  <span className="text-sm text-red-600">
                    {data?.errors?.password}
                  </span>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">تکرار رمز عبور</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    defaultValue={
                      (data?.reset?.confirmPassword ?? "") as string
                    }
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="رمز عبور را مجدداً وارد کنید"
                    className={`pl-10 ltr text-right ${
                      data?.errors?.confirmPassword ? "border-red-600" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {!!data?.errors?.confirmPassword && (
                  <span className="text-sm text-red-600">
                    {data?.errors?.confirmPassword}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-rose-400 hover:bg-rose-500 text-white"
                disabled={isPending}
              >
                {isPending ? "در حال ذخیره..." : "ذخیره رمز عبور"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
