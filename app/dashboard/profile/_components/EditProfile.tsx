"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { User, genderType } from "@/src/types/user";
import { getInitials } from "@/src/lib/utils";
import { useForm } from "react-hook-form";
import { EditProfileSchema, EditProfileType } from "@/src/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiFetchClient } from "@/src/lib/apiFetch.client";
import useApp from "@/src/hooks/useApp";

const EditProfile = ({ user, goBack }: { user: User; goBack: () => void }) => {
  const { setUser } = useApp();
  const [profileImage, setProfileImage] = useState<string>("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditProfileType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      gender: user.gender,
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: EditProfileType) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("phone", data.phone);
      formData.append("gender", data.gender as genderType);

      if (profileFile) {
        formData.append("image", profileFile);
      }

      setIsLoading(true);
      const res = await apiFetchClient<{ user: User }>("/users/profile", {
        method: "PATCH",
        body: formData,
      });
      setUser(res.user);
      goBack();
    } catch (err) {
      console.error("❌ Upload error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <Avatar className="w-32 h-32 border-4 border-sky-200 dark:border-sky-800 shadow-lg">
            <AvatarImage
              src={profileImage || user.userImage}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-sky-400 to-rose-400 text-white text-4xl">
              {getInitials(user?.firstName ?? "")}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 bg-rose-400 hover:bg-rose-500 text-white text-xs rounded-full px-2 py-1">
            <Label htmlFor="image" className="cursor-pointer">
              ویرایش
            </Label>
            <Input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className="text-right hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-4 bg-gradient-to-l from-sky-600 to-rose-600 bg-clip-text text-transparent">
          ویرایش پروفایل
        </h2>
      </div>

      {/* Form */}

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">نام</Label>
            <Input
              id="firstName"
              className={`text-right ${
                errors.firstName ? "border border-red-600" : ""
              }`}
              required
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">نام خانوادگی</Label>
            <Input
              id="lastName"
              required
              className={`text-right ${
                errors.lastName ? "border border-red-600" : ""
              }`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">شماره موبایل</Label>
            <Input
              id="phone"
              dir="ltr"
              required
              className={`text-right ${
                errors.phone ? "border border-red-600" : ""
              }`}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">جنسیت</Label>
            <Select
              defaultValue={user.gender}
              onValueChange={(value: genderType) => setValue("gender", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">مرد</SelectItem>
                <SelectItem value="female">زن</SelectItem>
                <SelectItem value="other">ترجیح نمی‌دهم</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => goBack()}
            className=" rounded-xl px-4 py-2 transition"
          >
            انصراف
          </Button>
          <Button
            type="submit"
            className="bg-rose-400 hover:bg-rose-500 text-white rounded-xl px-4 py-2 transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                در حال ذخیره...
              </>
            ) : (
              "ذخیره تغییرات"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
