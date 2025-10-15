"use client";

import { useUser } from "@/src/hooks/useUser";

const Logout = () => {
  const { logout } = useUser();
  return (
    <button
      onClick={() => logout()}
      className="text-red-600 block w-full text-right"
    >
      خروج
    </button>
  );
};

export default Logout;
