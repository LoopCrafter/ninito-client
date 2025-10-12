import { apiFetchClient } from "@/src/lib/apiFetch.client";

import useApp from "./useApp";
import { useRouter } from "next/navigation";

export const useUser = () => {
  const router = useRouter();
  const { user, setUser } = useApp();
  const logout = async () => {
    try {
      await apiFetchClient("/auth/logout", { method: "POST" });
      setUser(null);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  return { logout, user };
};
