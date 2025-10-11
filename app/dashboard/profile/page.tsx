import { apiFetchClient } from "@/src/lib/apiFetch.client";
import UserData from "./_components/userData";
import { apiFetchServer } from "@/src/lib/apiFetch.server";
import { User } from "@/src/types/user";
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
