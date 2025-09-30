import { cookies } from "next/headers";

export async function apiFetchServer<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });
  if (res.status === 401 || res.status === 403) {
    throw new Error("Unauthorized or forbidden");
  }
  if (!res.ok) throw new Error(`API failed: ${res.status}`);
  return res.json() as Promise<T>;
}
