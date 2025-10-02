import { profileSchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Camera, Edit2, Mail, Phone, User, UserCircle } from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User as UserType } from "@/types/user";

type UserDataProps = {
  user: UserType;
};

type ProfileFormData = z.infer<typeof profileSchema>;
const UserData: React.FC<UserDataProps> = ({ user }) => {
  const [userData, setUserData] = useState(user);
  const [profileImage, setProfileImage] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: user,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    setUserData({
      ...userData,
      ...data,
      image: profileImage || userData.image,
    });
    setIsEditing(false);
    toast.success("اطلاعات با موفقیت به‌روزرسانی شد");
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Decorative clouds */}
        <div className="absolute top-20 left-10 w-20 h-10 bg-sky-200/30 dark:bg-sky-800/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-10 w-16 h-8 bg-rose-200/30 dark:bg-rose-800/20 rounded-full blur-xl animate-pulse" />

        {/* Profile Header */}
        <div className="relative bg-card rounded-3xl shadow-lg p-8 mb-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-400/20 to-rose-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-rose-400/20 to-sky-400/20 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-sky-200 dark:border-sky-800 shadow-lg">
                <AvatarImage src={profileImage || userData.image} />
                <AvatarFallback className="bg-gradient-to-br from-sky-400 to-rose-400 text-white text-4xl">
                  {userData.firstName[0]}
                  {userData.lastName[0]}
                </AvatarFallback>
              </Avatar>

              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}

              {/* Decorative stars */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-2 -right-2 text-yellow-400"
              >
                ⭐
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -bottom-2 -left-2 text-rose-400"
              >
                ✨
              </motion.div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-bold bg-gradient-to-l from-sky-600 to-rose-600 bg-clip-text text-transparent mb-2">
                {userData.firstName} {userData.lastName}
              </h1>
              <p className="text-muted-foreground flex items-center justify-center md:justify-end gap-2">
                <Mail className="w-4 h-4" />
                {userData.email}
              </p>
              <p className="text-muted-foreground flex items-center justify-center md:justify-end gap-2 mt-1">
                <Phone className="w-4 h-4" />
                {userData.mobile}
              </p>
            </div>

            {/* Edit Button */}
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-sky-400 hover:bg-sky-500 text-white"
              >
                <Edit2 className="w-4 h-4 ml-2" />
                ویرایش پروفایل
              </Button>
            )}
          </div>
        </div>

        {/* Profile Details */}
        {!isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Info Cards */}
            <div className="bg-card rounded-2xl shadow-md p-6 border-2 border-sky-100 dark:border-sky-900/30 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-xl">
                  <User className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                </div>
                <h3 className="text-lg font-bold">نام و نام خانوادگی</h3>
              </div>
              <p className="text-xl">
                {userData.firstName} {userData.lastName}
              </p>
            </div>

            <div className="bg-card rounded-2xl shadow-md p-6 border-2 border-rose-100 dark:border-rose-900/30 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
                  <Phone className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="text-lg font-bold">شماره تماس</h3>
              </div>
              <p className="text-xl">{userData.mobile}</p>
            </div>

            <div className="bg-card rounded-2xl shadow-md p-6 border-2 border-sky-100 dark:border-sky-900/30 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-xl">
                  <Mail className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                </div>
                <h3 className="text-lg font-bold">ایمیل (شناسه کاربری)</h3>
              </div>
              <p className="text-xl">{userData.email}</p>
              <p className="text-sm text-muted-foreground mt-2">
                برای تغییر ایمیل به صفحه ورود مراجعه کنید
              </p>
            </div>

            <div className="bg-card rounded-2xl shadow-md p-6 border-2 border-rose-100 dark:border-rose-900/30 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
                  <UserCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="text-lg font-bold">جنسیت</h3>
              </div>
              <p className="text-xl">
                {userData.gender === "male"
                  ? "مرد"
                  : userData.gender === "female"
                  ? "زن"
                  : "ترجیح نمی‌دهم"}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl shadow-lg p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-l from-sky-600 to-rose-600 bg-clip-text text-transparent">
              ویرایش اطلاعات
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">نام</Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    className="text-right"
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
                    {...register("lastName")}
                    className="text-right"
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
                    {...register("phone")}
                    className="text-right"
                    dir="ltr"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">جنسیت</Label>
                  <Select
                    defaultValue={userData.gender}
                    onValueChange={(value) => setValue("gender", value)}
                  >
                    <SelectTrigger>
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
                  onClick={() => setIsEditing(false)}
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  className="bg-rose-400 hover:bg-rose-500 text-white"
                >
                  ذخیره تغییرات
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default UserData;
