"use server";

import { LoginSchema } from "@/schema/auth";
import { apiFetchServer } from "../apiFetch.server";
import { User } from "@/types/user";

const loginAction = async (Prev: any, formData: FormData) => {
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = LoginSchema.safeParse(loginData);
  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (!errors[field as string]) {
        errors[field as string] = issue.message;
      }
    });
    return {
      success: false,
      errors,
      login: loginData,
    };
  }
  try {
    const res = await apiFetchServer<{ accessToken: string; user: User }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(loginData),
      }
    );
    console.log("res", res);
    return {
      success: true,
      message: "ورود موفق",
      login: loginData,
      user: res.user,
    };
  } catch (error) {
    return {
      success: false,
      message: "لطفاً بعداً دوباره تلاش کنید",
      login: loginData,
    };
  }
};

export { loginAction };
