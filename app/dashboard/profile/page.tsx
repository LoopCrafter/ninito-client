import { apiFetchClient } from "@/lib/apiFetch.client";
import UserData from "./_components/userData";
import { apiFetchServer } from "@/lib/apiFetch.server";
import { User } from "@/types/user";
const ProfilePage = async () => {
  const userProfile = await apiFetchServer<{ user: User }>("/users/profile");
  const userData = userProfile.user;
  return (
    <div className="py-10">
      <UserData user={userData} />
    </div>
  );
};

export default ProfilePage;
