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

const iranMobileRegex = /^(?:\+98|0)?9\d{9}$/;

const SignupSchema = z
  .object({
    firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
    lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
    email: z.string().email("فرمت ایمیل واردشده معتبر نیست"),
    phone: z.string().regex(/^(?:\+98|0)?9\d{9}$/, "شماره موبایل معتبر نیست"),
    password: z
      .string()
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .regex(/[A-Z]/, "حداقل یک حرف بزرگ نیاز است")
      .regex(/[a-z]/, "حداقل یک حرف کوچک نیاز است")
      .regex(/\d/, "حداقل یک عدد نیاز است")
      .regex(/[\W_]/, "حداقل یک کاراکتر ویژه نیاز است"),
    confirmPassword: z.string().min(1, "تأیید رمز عبور الزامی است"),
    gender: z.enum(["male", "female", "prefer_not_to_say"], {
      message: "لطفاً جنسیت را انتخاب کنید",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "رمز عبور و تأیید آن یکسان نیستند",
      });
    }
  });

export type SignupData = z.infer<typeof SignupSchema>;
export { SignupSchema };
