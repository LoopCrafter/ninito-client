import Link from "next/link";
import React, { useEffect } from "react";
import { LoginForm } from "./_components/LoginForm";
import { SignUpForm } from "./_components/SignupForm";
import useApp from "@/hooks/useApp";
import { useRouter } from "next/navigation";

interface PageProps {
  searchParams: {
    tab?: string;
  };
}

const page = async ({ searchParams }: PageProps) => {
  const { tab: activeTab = "login" } = await searchParams;

  return (
    <section className="px-4 py-8 pt-10 min-h-screen w-screen bg-gradient-to-r from-sky-200 to-rose-200 dark:from-sky-700 dark:to-rose-700">
      <div className="max-w-md mx-auto">
        {activeTab === "login" ? <LoginForm /> : <SignUpForm />}

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
