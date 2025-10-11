import { z } from "zod";

export const editProfileSchema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  phone: z.string().regex(/^(?:\+98|0)?9\d{9}$/, "شماره موبایل معتبر نیست"),
  gender: z.enum(["male", "female", "prefer_not_to_say"]).optional(),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "فایل معتبر نیست")
    .optional(),
});
