"use client";

import { User as UserType } from "@/src/types/user";
import { useState } from "react";
import EditProfile from "./EditProfile";
import UserProfileView from "./UserProfileView";
import { useRouter } from "next/navigation";

type UserDataProps = {
  user: UserType;
};

const UserData: React.FC<UserDataProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const handleGoBack = () => {
    setIsEditing(false);
    router.refresh();
  };
  return (
    <div className="">
      {isEditing ? (
        <EditProfile user={user} goBack={handleGoBack} />
      ) : (
        <UserProfileView user={user} />
      )}

      {!isEditing && (
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-4 py-2 transition"
          >
            ویرایش پروفایل
          </button>
        </div>
      )}
    </div>
  );
};

export default UserData;
