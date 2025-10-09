"use server";

import {
  LoginSchema,
  ResetPasswordSchema,
  SignupSchema,
  VerifyCodeSchema,
  SetResetPasswordSchema,
} from "@/schema/auth";
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

const resetPasswordAction = async (prev: any, formData: FormData) => {
  const email = (formData.get("email") as string) ?? "";
  const result = ResetPasswordSchema.safeParse(email);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = "email";
      if (!errors[field as string]) {
        errors[field as string] = issue.message;
      }
    });

    return {
      success: false,
      errors,
      email,
    };
  }

  try {
    const res = await apiFetchServer("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    return {
      success: true,
      email,
      errors: {},
      message: "لینک بازیابی رمز عبور به ایمیل شما ارسال شد",
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
      email,
      errors: { apiError: errorMsg, email: "" },
      message: "",
    };
  }
};

const setResetPasswordAction = async (prev: any, formData: FormData) => {
  const reset = {
    password: formData.get("password") ?? "",
    confirmPassword: formData.get("confirmPassword") ?? "",
    code: formData.get("code") ?? "",
  };

  const result = SetResetPasswordSchema.safeParse(reset);
  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (!errors[field as string]) {
        errors[field as string] = issue.message;
      }
    });
    console.log("++++", errors);
    return {
      errors,
      success: false,
      reset,
      message: "",
    };
  }

  try {
    const res = await apiFetchServer(`/auth/reset-password/${reset.code}`, {
      method: "POST",
      body: JSON.stringify({ password: reset.password }),
    });

    return {
      success: true,
      reset,
      errors: {},
      message: "رمز عبور با موفقیت تغییر یافت!",
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
      reset,
      errors: { apiError: errorMsg, email: "" },
      message: "",
    };
  }
};
export {
  loginAction,
  signupAction,
  verifyAction,
  resetPasswordAction,
  setResetPasswordAction,
};
