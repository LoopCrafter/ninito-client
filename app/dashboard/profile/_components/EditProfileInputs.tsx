"use client";

import { CheckCircle2, Loader2 } from "lucide-react";

import { useActionState } from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { GenderSelect } from "@/app/auth/_components/GenderSelect";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { User } from "@/src/types/user";
import { getInitials } from "@/src/lib/utils";

const profileAction = async (prev: any, formData: FormData) => {
  const profile = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    gender: formData.get("gender"),
  };

  console.log("Profile Data:", profile);

  return {
    ...prev,
    success: true,
    profile,
    message: "تغییرات با موفقیت ذخیره شد ✅",
  };
};

const initialState = {
  success: false,
  errors: {},
  message: "",
  profile: {
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    image: "",
  },
  apiError: "",
};

export default function EditProfileInputs({ user }: { user: User }) {
  const [state, formAction, isPending] = useActionState(profileAction, {
    ...initialState,
    profile: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      image: user.image,
      gender: user.gender,
    },
  });

  return (
    <div className="">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <Avatar className="w-32 h-32 border-4 border-sky-200 dark:border-sky-800 shadow-lg">
            <AvatarImage src={state?.image} />
            <AvatarFallback className="bg-gradient-to-br from-sky-400 to-rose-400 text-white text-4xl">
              {getInitials(state?.firstName ?? "")}
            </AvatarFallback>
          </Avatar>
          <Button
            size="sm"
            variant="secondary"
            className="absolute bottom-0 right-0 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded-full px-2 py-1"
          >
            ویرایش
          </Button>
        </div>
        <h2 className="text-2xl font-bold mt-4 bg-gradient-to-l from-sky-600 to-rose-600 bg-clip-text text-transparent">
          ویرایش پروفایل
        </h2>
      </div>

      {/* Form */}
      <form action={formAction} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">نام</Label>
            <Input
              name="firstName"
              id="firstName"
              className="text-right"
              required
              defaultValue={state?.firstName}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">نام خانوادگی</Label>
            <Input
              name="lastName"
              id="lastName"
              className="text-right"
              required
              defaultValue={state?.lastName}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">شماره موبایل</Label>
            <Input
              name="phone"
              id="phone"
              className="text-right"
              dir="ltr"
              required
              defaultValue={state?.phone}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">جنسیت</Label>
            <GenderSelect defaultValue={state.gender} />
          </div>
        </div>

        <div className="flex gap-4 justify-end pt-4">
          <Button
            type="submit"
            className="bg-rose-400 hover:bg-rose-500 text-white rounded-xl px-4 py-2 transition"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                در حال ذخیره...
              </>
            ) : (
              "ذخیره تغییرات"
            )}
          </Button>
        </div>

        {state.success && (
          <div className="flex items-center justify-center text-green-600 font-semibold mt-4">
            <CheckCircle2 className="w-5 h-5 ml-2" />
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}
