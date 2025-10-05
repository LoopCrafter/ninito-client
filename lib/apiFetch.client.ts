export async function apiFetchClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });
  console.log("++++", res);
  if (!res.ok) throw new Error(`${res.statusText}`);
  return res.json() as Promise<T>;
}
