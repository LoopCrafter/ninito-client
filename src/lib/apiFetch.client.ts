import { handleApiError } from "./errorHandler";

export async function apiFetchClient<T>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
    ...options,
    headers: isFormData
      ? options.headers
      : {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
    credentials: "include",
  });
  let data: any = null;
  if (res.status === 401 && retry) {
    try {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!refreshRes.ok) throw new Error("Failed to refresh token");

      data = await refreshRes.json();

      document.cookie = `accessToken=${data.accessToken}; path=/; secure; samesite=strict`;

      const newHeaders: HeadersInit = {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(options.headers || {}),
        Authorization: `Bearer ${data.accessToken}`,
      };

      const retryRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
        {
          ...options,
          headers: newHeaders,
          credentials: "include",
        }
      );

      if (!retryRes.ok) throw new Error(await retryRes.text());

      const contentType = retryRes.headers.get("content-type");
      return contentType && contentType.includes("application/json")
        ? retryRes.json()
        : (retryRes.text() as T);
    } catch (err) {
      console.error("Session expired");
      window.location.href = "/login";
      throw err;
    }
  }

  if (!res.ok) handleApiError(res, data);

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    return res.text() as T;
  }
}
