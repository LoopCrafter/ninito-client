import { Button } from "@/src/components/ui/button";
import { Check } from "lucide-react";

type ForgetPasswordResetInfoProps = {
  resetEmail: string;
  onBack: () => void;
};
const ForgetPasswordResetInfo: React.FC<ForgetPasswordResetInfoProps> = ({
  resetEmail,
  onBack,
}) => {
  return (
    <div className="space-y-6 p-5 bg-muted rounded-lg">
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
          onClick={onBack}
          className="flex-1 bg-sky-400 hover:bg-sky-500 text-white"
        >
          بازگشت به ورود
        </Button>
      </div>
    </div>
  );
};

export default ForgetPasswordResetInfo;
