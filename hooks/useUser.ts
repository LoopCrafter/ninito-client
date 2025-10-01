import { apiFetchClient } from "@/lib/apiFetch.client";
import React from "react";
import useApp from "./useApp";
import { redirect } from "next/navigation";

export const useUser = () => {
  const { user, setUser } = useApp();
  const logout = async () => {
    try {
      await apiFetchClient("/auth/logout", { method: "POST" });
      setUser(null);
      redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  return { logout };
};
