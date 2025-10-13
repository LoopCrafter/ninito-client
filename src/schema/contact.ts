import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "نام و نام خانوادگی الزامی است"),
  email: z.string().min(1, "ایمیل الزامی است").email("ایمیل معتبر نیست"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{10,11}$/.test(val), "شماره تلفن معتبر نیست"),
  subject: z
    .string()
    .min(1, "موضوع پیام الزامی است")
    .refine(
      (val) =>
        [
          "product-question",
          "order-support",
          "complaint",
          "suggestion",
          "collaboration",
          "other",
        ].includes(val),
      "موضوع انتخاب شده نامعتبر است"
    ),
  message: z
    .string()
    .min(1, "متن پیام الزامی است")
    .max(1000, "متن پیام نمی‌تواند بیش از 1000 کاراکتر باشد"),
});
