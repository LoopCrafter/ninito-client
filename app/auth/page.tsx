import Link from "next/link";
import Login from "./_components/Login";
import Signup from "./_components/Signup";
import { checkUser } from "@/feature/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface PageProps {
  searchParams: {
    tab?: string;
  };
}

const page = async ({ searchParams }: PageProps) => {
  const { tab: activeTab = "login" } = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  // const user = await checkUser();

  // if (user) {
  //   redirect("/");
  // }
  return (
    <section className="px-4 py-8 pt-10 min-h-screen w-screen bg-gradient-to-r from-sky-200 to-rose-200 dark:from-sky-700 dark:to-rose-700">
      <div className="max-w-md mx-auto">
        {activeTab === "login" ? <Login /> : <Signup />}

        <div className="text-center mt-6">
          {activeTab === "login" ? (
            <p className="text-muted-foreground">
              حساب کاربری ندارید؟
              <Link href="?tab=signup">
                <button className="text-rose-400 mr-1 hover:underline font-medium">
                  ثبت‌نام کنید
                </button>
              </Link>
            </p>
          ) : (
            <p className="text-muted-foreground">
              قبلاً ثبت‌نام کرده‌اید؟
              <Link href="?tab=login">
                <button className="text-rose-400 mr-1 hover:underline font-medium">
                  وارد شوید
                </button>
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
