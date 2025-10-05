import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, User, UserCircle } from "lucide-react";
import { User as UserType } from "@/types/user";
import { getInitials } from "@/lib/utils";

type UserDataProps = {
  user: UserType;
};

const UserData: React.FC<UserDataProps> = ({ user }) => {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
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
                <AvatarImage src={user?.image} />
                <AvatarFallback className="bg-gradient-to-br from-sky-400 to-rose-400 text-white text-4xl">
                  {getInitials(user?.firstName ?? "")}
                </AvatarFallback>
              </Avatar>

              {/* {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )} */}

              {/* Decorative stars */}
              <div className="absolute -top-2 -right-2 text-yellow-400">⭐</div>
              <div className="absolute -bottom-2 -left-2 text-rose-400">✨</div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-bold bg-gradient-to-l from-sky-600 to-rose-600 bg-clip-text text-transparent mb-2">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-muted-foreground flex items-center justify-center md:justify-end gap-2">
                <Mail className="w-4 h-4" />
                {user?.email}
              </p>
              <p className="text-muted-foreground flex items-center justify-center md:justify-end gap-2 mt-1">
                <Phone className="w-4 h-4" />
                {user?.phone}
              </p>
            </div>

            {/* Edit Button */}
            {/* {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-sky-400 hover:bg-sky-500 text-white"
              >
                <Edit2 className="w-4 h-4 ml-2" />
                ویرایش پروفایل
              </Button>
            )} */}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Info Cards */}
          <div className="bg-card rounded-2xl shadow-md p-6 border-2 border-sky-100 dark:border-sky-900/30 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-xl">
                <User className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="text-lg font-bold">نام و نام خانوادگی</h3>
            </div>
            <p className="text-xl">
              {user?.firstName} {user?.lastName}
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-md p-6 border-2 border-rose-100 dark:border-rose-900/30 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
                <Phone className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-lg font-bold">شماره تماس</h3>
            </div>
            <p className="text-xl">{user?.phone}</p>
          </div>

          <div className="bg-card rounded-2xl shadow-md p-6 border-2 border-sky-100 dark:border-sky-900/30 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-xl">
                <Mail className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="text-lg font-bold">ایمیل (شناسه کاربری)</h3>
            </div>
            <p className="text-xl">{user?.email}</p>
          </div>

          <div className="bg-card rounded-2xl shadow-md p-6 border-2 border-rose-100 dark:border-rose-900/30 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
                <UserCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-lg font-bold">جنسیت</h3>
            </div>
            <p className="text-xl">
              {user?.gender === "male"
                ? "مرد"
                : user?.gender === "female"
                ? "زن"
                : "ترجیح نمی‌دهم"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
