import { apiFetchClient } from "@/src/lib/apiFetch.client";
import UserData from "./_components/userData";
import { apiFetchServer } from "@/src/lib/apiFetch.server";
import { User } from "@/src/types/user";
import { redirect } from "next/navigation";
const ProfilePage = async () => {
  const userProfile = await apiFetchServer<{ user: User }>("/users/profile");
  const userData = userProfile?.user;
  console.log("userData:", userProfile);
  if (!userData) {
    //redirect("/auth?tab=login&redirect=/dashboard/profile");
  }
  return <div className="py-10">{/* <UserData user={userData} /> */}</div>;
};

export default ProfilePage;
