import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function apiFetchServer<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("accessToken");
  const refreshTokenCookie = cookieStore.get("refreshToken");

  const accessToken = accessTokenCookie?.value;
  const refreshToken = refreshTokenCookie?.value;

  if (!accessToken) {
    redirect("/auth");
  }

  const cookieHeader = [
    accessToken ? `accessToken=${accessToken}` : "",
    refreshToken ? `refreshToken=${refreshToken}` : "",
  ]
    .filter(Boolean)
    .join("; ");

  const doFetch = async () => {
    return fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        ...(options.headers || {}),
      },
      cache: "no-store",
    });
  };

  let res = await doFetch();

  if (res.status === 401) {
    const refreshCookieHeader = refreshToken
      ? `refreshToken=${refreshToken}`
      : "";

    const refreshRes = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        ...(refreshCookieHeader ? { Cookie: refreshCookieHeader } : {}),
      },
      cache: "no-store",
    });

    const refreshSetCookies = refreshRes.headers.getSetCookie
      ? refreshRes.headers.getSetCookie()
      : [];

    console.log("refreshRes", refreshRes);
    if (refreshRes.ok) {
      res = await doFetch();
    } else {
      redirect("/auth");
    }
  }

  if (!res.ok) {
    throw new Error(`API failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
