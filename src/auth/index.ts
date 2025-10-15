import { apiFetchServer } from "@/src/lib/apiFetch.server";
import { User } from "@/src/types/user";
import { cookies } from "next/headers";

export async function checkUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return null;

    const { user } = await apiFetchServer<{ user: User }>("/auth/check-user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-store",
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}
