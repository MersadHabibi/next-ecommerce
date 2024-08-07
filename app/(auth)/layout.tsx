import { getMeAction } from "@/actions/authActions";
import Logo from "@/components/modules/Logo";
import ThemeToggle from "@/components/modules/ThemeToggle";
import { redirect } from "next/navigation";

export default async function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin }: { isLogin: boolean } = await getMeAction();

  if (isLogin) {
    redirect("/");
  }

  return (
    <div className="flex-center h-dvh ">
      <header className="border-secondary dark:border-secondary-dark fixed left-0 right-0 top-0 h-16 w-full border-b dark:bg-primary-dark">
        <div className="container flex h-full items-center justify-between">
          <Logo className="w-20 h-20" />
          <ThemeToggle />
        </div>
      </header>

      {children}
    </div>
  );
}
