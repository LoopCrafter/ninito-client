"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Camera, Mail, Phone, User, UserCircle, X } from "lucide-react";
import { User as UserType } from "@/src/types/user";
import { getInitials } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import EditProfileInputs from "./EditProfileInputs";
import { motion, AnimatePresence } from "framer-motion";
import UserProfileView from "./UserProfileView";

type UserDataProps = {
  user: UserType;
};

const UserData: React.FC<UserDataProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(user.image || "");
  const [userData, setUserData] = useState<UserType>(user);

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

  return (
    <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-lg p-6 md:p-8">
      {isEditing ? (
        <EditProfileInputs user={user} />
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
