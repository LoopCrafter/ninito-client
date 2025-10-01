import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifySchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import { User, Mail, Phone, Upload, Check } from "lucide-react";
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
  const verifyForm = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema),
  });

  const onVerify = (data: VerifyForm) => {
    toast("حساب کاربری شما با موفقیت ایجاد شد");
    console.log("Verification code:", data.code, "for:", signupEmail);
    hideVerification();
  };

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
    </motion.div>
  );
};

export default VerificationForm;
