"use server";

import { LoginSchema, SignupSchema } from "@/schema/auth";
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

const signupAction = async (Prev: any, formData: FormData) => {
  const signupData = {
    firstName: (formData.get("firstName") ?? "") as string,
    lastName: (formData.get("lastName") ?? "") as string,
    email: (formData.get("email") ?? "") as string,
    phone: (formData.get("phone") ?? "") as string,
    password: (formData.get("password") ?? "") as string,
    confirmPassword: (formData.get("confirmPassword") ?? "") as string,
    gender: (formData.get("gender") ?? "") as string,
  };
  console.log("++++", signupData);
  const result = SignupSchema.safeParse(signupData);
  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path?.[0] || "form"; // اگر path نداشت، بندازش در "form"
      errors[field as string] = issue.message;
    });

    return {
      success: false,
      errors,
      signup: signupData,
    };
  }
  return {};
};
export { loginAction, signupAction };
