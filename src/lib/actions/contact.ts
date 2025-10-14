"use server";

import { contactFormSchema } from "@/src/schema/contact";
import { apiFetchServer } from "../apiFetch.server";

export const contactAction = async (prev: any, formData: FormData) => {
  const contact = {
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    subject: formData.get("subject") ?? "",
    message: formData.get("message") ?? "",
  };
  const result = contactFormSchema.safeParse(contact);
  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (!errors[field as string]) {
        errors[field as string] = issue.message;
      }
    });
    return { success: false, errors, contact, message: "" };
  }
  try {
    const res = await apiFetchServer("/contact", {
      method: "POST",
      body: JSON.stringify(contact),
    });
    console.log("res:", res);
    return {
      success: true,
      contact: {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      },
      errors: {},
      message: "پیام شما با موفقیت ارسال شد! در اسرع وقت پاسخ داده خواهد شد.",
    };
  } catch (error) {
    let errorMsg = "";
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "لطفاً بعداً دوباره تلاش کنید";
    }

    return {
      success: false,
      contact,
      errors: { email: "" },
      message: "",
      apiError: errorMsg,
    };
  }
};
