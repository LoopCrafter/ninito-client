import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { handleApiError } from "./errorHandler";

export async function apiFetchServer<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const cookieHeader = [
    accessToken ? `accessToken=${accessToken}` : "",
    refreshToken ? `refreshToken=${refreshToken}` : "",
  ]
    .filter(Boolean)
    .join("; ");

  const doFetch = async () =>
    fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        ...(options.headers || {}),
      },
      cache: "no-store",
    });

  try {
    let res = await doFetch();

    if (res.status === 401 && refreshToken) {
      const refreshRes = await fetch(`${baseUrl}/auth/refresh-token`, {
        method: "POST",
        headers: {
          ...(refreshToken ? { Cookie: `refreshToken=${refreshToken}` } : {}),
        },
        cache: "no-store",
      });

      if (refreshRes.ok) {
        res = await doFetch();
      } else {
        redirect("/auth?logout=true");
      }
    }

    let responseData: any = null;
    try {
      responseData = await res.json();
    } catch (_) {}

    if (!res.ok) {
      handleApiError(res, responseData);
    }

    return responseData as T;
  } catch (err) {
    throw err;
  }
}
