import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { getInitials } from "@/src/lib/utils";
import Image from "next/image";

type User = {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  image?: string;
};

export default function UserProfileView({ user }: { user: User }) {
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-l from-sky-600 to-rose-600 bg-clip-text text-transparent">
        پروفایل کاربر
      </h2>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-4 border-sky-200 dark:border-sky-800 shadow-lg">
            <AvatarImage src={user?.image} />
            <AvatarFallback className="bg-gradient-to-br from-sky-400 to-rose-400 text-white text-4xl">
              {getInitials(user?.firstName ?? "")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-500">{user.phone}</p>
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">نام</span>
            <span>{user.firstName}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">نام خانوادگی</span>
            <span>{user.lastName}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">شماره موبایل</span>
            <span dir="ltr">{user.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">جنسیت</span>
            <span>{user.gender === "male" ? "مرد" : "زن"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
