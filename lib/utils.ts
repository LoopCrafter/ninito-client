import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (fullName?: string) => {
  if (!fullName) return "";
  const names = fullName.trim().split(" ");
  const initials = names.map((name) => name[0].toUpperCase());
  return initials.slice(0, 2).join(""); // faghat 2 ta aval
};

export const getRandomColor = () => {
  const colors = [
    "#F87171",
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
