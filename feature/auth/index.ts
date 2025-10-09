import { apiFetchServer } from "@/lib/apiFetch.server";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

export const checkUser = async () => {
  try {
    const userData = await apiFetchServer<{ user: User }>("/auth/check-user");
    return userData.user;
  } catch (error) {
    throw error;
  }
};
