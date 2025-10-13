import { contactFormSchema } from "@/src/schema/contact";

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

  return { success: true, contact, message: "", errors: {} };
};
