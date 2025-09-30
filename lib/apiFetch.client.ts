export function getClientCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));

  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

export async function apiFetchClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getClientCookie("accessToken");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error(`API failed: ${res.status}`);
  return res.json() as Promise<T>;
}
