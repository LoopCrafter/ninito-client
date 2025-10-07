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
