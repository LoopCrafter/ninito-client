import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface CheckoutStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const steps: Step[] = [
  {
    id: 1,
    title: "سبد خرید",
    description: "بررسی محصولات",
  },
  {
    id: 2,
    title: "نهایی کردن",
    description: "آدرس و ارسال",
  },
  {
    id: 3,
    title: "پرداخت",
    description: "تکمیل سفارش",
  },
];

export function CheckoutStepper({
  currentStep,
  onStepClick,
}: CheckoutStepperProps) {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative">
        {/* خط اتصال */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden sm:block" />

        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex flex-col items-center relative z-10"
          >
            {/* دایره مرحله */}
            <button
              onClick={() => onStepClick(step.id)}
              className={cn(
                "w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 smooth-transition",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                step.id < currentStep
                  ? "bg-primary border-primary text-primary-foreground"
                  : step.id === currentStep
                  ? "bg-background border-primary text-primary"
                  : "bg-background border-border text-muted-foreground"
              )}
              disabled={step.id > currentStep}
            >
              {step.id < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </button>

            {/* عنوان و توضیحات */}
            <div className="text-center">
              <h3
                className={cn(
                  "text-sm font-medium mb-1",
                  step.id <= currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
