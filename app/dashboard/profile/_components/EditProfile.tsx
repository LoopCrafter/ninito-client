import z from "zod";
import { motion } from "framer-motion";
import { useUser } from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import { profileSchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ProfileFormData = z.infer<typeof profileSchema>;

const EditProfile = ({}) => {
  const { user } = useUser();

  const [profileImage, setProfileImage] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: user ?? {},
  });

  const onSubmit = (data: ProfileFormData) => {
    // setUserData({
    //   ...userData,
    //   ...data,
    //   image: profileImage || userData.image,
    // });
    // setIsEditing(false);
    // toast.success("اطلاعات با موفقیت به‌روزرسانی شد");
  };

  return (
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
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">جنسیت</Label>
            <Select
              defaultValue={user?.gender}
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
            //onClick={() => setIsEditing(false)}
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
  );
};

export default EditProfile;
