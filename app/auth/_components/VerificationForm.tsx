"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { verifyAction } from "@/src/lib/actions/auth";
import { Label } from "@radix-ui/react-label";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type VerificationFormProps = {
  signupEmail: string;
  hideVerification: () => void;
};

type InitialState = {
  success: boolean;
  code: FormDataEntryValue;
  errors: Record<string, string>;
  message: string;
};

const initialState: InitialState = {
  success: false,
  errors: {},
  code: "",
  message: "",
};

const VerificationForm: React.FC<VerificationFormProps> = ({
  signupEmail,
  hideVerification,
}) => {
  const router = useRouter();
  const [data, action, isPending] = useActionState(verifyAction, initialState);
  useEffect(() => {
    if (data.success) {
      toast.success(data.message);
      router.replace("/auth?tab=login");
    }
    if (data.errors.apiError) {
      toast.error(data.errors.apiError);
    }
  }, [data]);

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

      <form action={action} className="space-y-4">
        <div>
          <Label htmlFor="verify-code">کد تأیید</Label>
          <Input
            id="verify-code"
            type="text"
            name="code"
            placeholder="123456"
            maxLength={6}
            className={`mt-1 text-center text-lg tracking-widest ${
              data?.errors?.code ? "border border-red-600" : ""
            }`}
          />
          {data?.errors?.code && (
            <span className="text-red-600 text-sm mt-2 block">
              {data.errors.code}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              hideVerification();
            }}
            className="flex-1"
          >
            بازگشت
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-rose-400 hover:bg-rose-500 text-white"
            disabled={isPending}
          >
            {isPending ? "در حال تایید..." : "تأیید کد"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;
