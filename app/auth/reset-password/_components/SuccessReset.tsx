import { Button } from "@/src/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const SuccessReset = () => {
  return (
    <section className=" bg-gradient-to-r from-sky-200 to-rose-200 dark:from-sky-700 dark:to-rose-700 min-h-[85vh]">
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-xl p-6 shadow-md">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  رمز عبور تغییر یافت
                </h2>
                <p className="text-muted-foreground">
                  رمز عبور شما با موفقیت تغییر یافت. اکنون می‌توانید با رمز عبور
                  جدید وارد شوید
                </p>
              </div>
              <Link href="/auth?tab=login">
                <Button className="w-full bg-sky-400 hover:bg-sky-500 text-white">
                  رفتن به صفحه ورود
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessReset;
