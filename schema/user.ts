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
