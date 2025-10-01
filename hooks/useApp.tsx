import { AppContext } from "@/providers/context-provider";
import { use, useContext } from "react";

const useApp = () => {
  const context = use(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export default useApp;
