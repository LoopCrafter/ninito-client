"use server";

import { LoginSchema, SignupSchema, VerifyCodeSchema } from "@/schema/auth";
import { apiFetchServer } from "../apiFetch.server";
import { User } from "@/types/user";
import { redirect } from "next/navigation";
import { success } from "zod";

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
    gender: (formData.get("gender") ?? "") as string,
    password: (formData.get("password") ?? "") as string,
    confirmPassword: (formData.get("confirmPassword") ?? "") as string,
  };

  const result = SignupSchema.safeParse(signupData);
  const errors: Record<string, string> = {};

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path?.[0] || "form";
      errors[field as string] = issue.message;
    });
  }

  if (signupData.password !== signupData.confirmPassword) {
    errors["confirmPassword"] = "رمزها برابر نیستند";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, signup: signupData };
  }

  try {
    const res = await apiFetchServer("/auth/signup", {
      method: "POST",
      body: JSON.stringify(signupData),
    });
  } catch (error) {
    let errorMsg = "";
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "لطفاً بعداً دوباره تلاش کنید";
    }

    return {
      success: false,
      errors: { apiError: errorMsg },
      signup: signupData,
    };
  }

  return {
    success: true,
  };
};

const verifyAction = async (prev: any, formData: FormData) => {
  const code = formData.get("code") ?? "";
  const result = VerifyCodeSchema.safeParse(code ?? "");
  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = "code";
      if (!errors[field as string]) {
        errors[field as string] = issue.message;
      }
    });

    return {
      errors,
      success: false,
    };
  }

  try {
    await apiFetchServer("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
    return {
      success: true,
      code,
      errors: {},
      message: " حساب کاربری شما با موفقیت تایید شد",
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
      code,
      errors: { apiError: errorMsg, code: "" },
    };
  }
};
export { loginAction, signupAction, verifyAction };
