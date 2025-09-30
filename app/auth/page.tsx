import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { LoginForm } from "./_components/LoginForm";
import { SignUpForm } from "./_components/SignupForm";

interface PageProps {
  searchParams: {
    tab?: string;
  };
}

const page = async ({ searchParams }: PageProps) => {
  const { tab: activeTab = "login" } = await searchParams;

  return (
    <main className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-md mx-auto">
        {activeTab === "login" ? <LoginForm /> : <SignUpForm />}

        <div className="text-center mt-6">
          {activeTab === "login" ? (
            <p className="text-muted-foreground">
              حساب کاربری ندارید؟
              <Link href="?tab=signup">
                <button className="text-primary hover:underline font-medium">
                  ثبت‌نام کنید
                </button>
              </Link>
            </p>
          ) : (
            <p className="text-muted-foreground">
              قبلاً ثبت‌نام کرده‌اید؟
              <Link href="?tab=login">
                <button className="text-primary hover:underline font-medium">
                  وارد شوید
                </button>
              </Link>
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default page;
