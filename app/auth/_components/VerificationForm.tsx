"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetchClient } from "@/lib/apiFetch.client";
import { verifySchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type VerifyForm = z.infer<typeof verifySchema>;
type VerificationFormProps = {
  signupEmail: string;
  hideVerification: () => void;
};

const VerificationForm: React.FC<VerificationFormProps> = ({
  signupEmail,
  hideVerification,
}) => {
  const router = useRouter();
  const verifyForm = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema),
  });

  const onVerify = async (data: VerifyForm) => {
    try {
      const res = apiFetchClient("/auth/verify-email", {
        method: "POSt",
        body: JSON.stringify(data),
      });
      toast("حساب کاربری شما با موفقیت ایجاد شد");
      console.log("Verification code:", data.code, "for:", signupEmail);
      hideVerification();
      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error: ", error);
        toast.error(error.message);
      } else {
        toast.error("خطای غیرمنتظره ای رخ داده است. لطفا مجددا تلاش کنید!");
      }
    }
  };

  return (
    <div className="space-y-6 p-5 bg-white">
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

      <form onSubmit={verifyForm.handleSubmit(onVerify)} className="space-y-4">
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
              hideVerification();
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
            {verifyForm.formState.isSubmitting ? "در حال تأیید..." : "تأیید کد"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;
