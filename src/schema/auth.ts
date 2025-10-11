import * as z from "zod";
export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "لطفاً ایمیل خود را وارد کنید" })
    .email({ message: "فرمت ایمیل واردشده معتبر نیست" }),

  password: z
    .string()
    .min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" }),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("فرمت ایمیل واردشده معتبر نیست"),
  phone: z.string().regex(/^(?:\+98|0)?9\d{9}$/, "شماره موبایل معتبر نیست"),
  gender: z.enum(["male", "female", "prefer_not_to_say"]).optional(),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
  confirmPassword: z.string().min(1, "تأیید رمز عبور الزامی است"),
});

export type SignupData = z.infer<typeof SignupSchema>;

export const VerifyCodeSchema = z
  .string()
  .regex(/^\d{6}$/, { message: "کد باید شامل ۶ رقم عددی باشد" });

export const ResetPasswordSchema = z
  .string()
  .trim()
  .min(1, { message: "لطفاً ایمیل خود را وارد کنید" })
  .email({ message: "فرمت ایمیل واردشده معتبر نیست" });

export const SetResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .regex(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ (A-Z) داشته باشد")
      .regex(/[a-z]/, "رمز عبور باید حداقل یک حرف کوچک (a-z) داشته باشد")
      .regex(/[0-9]/, "رمز عبور باید حداقل یک عدد داشته باشد")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد"
      ),
    confirmPassword: z.string().min(1, "تأیید رمز عبور الزامی است"),
    code: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "تکرار رمز عبور مطابقت ندارد",
    path: ["confirmPassword"],
  });
