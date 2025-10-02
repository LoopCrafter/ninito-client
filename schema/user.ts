import z from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
    lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
    email: z.string().email("فرمت ایمیل صحیح نیست"),
    phone: z
      .string()
      .regex(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود"),
    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    confirmPassword: z.string(),
    gender: z.enum(["male", "female", "prefer_not_to_say"]).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تأیید آن مطابقت ندارند",
    path: ["confirmPassword"],
  });

export const verifySchema = z.object({
  code: z.string().length(6, "کد باید ۶ رقم باشد"),
});

export const resetPasswordSchema = z
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "تکرار رمز عبور مطابقت ندارد",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  gender: z.string().optional(),
});
