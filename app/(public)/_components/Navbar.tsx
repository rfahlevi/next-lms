"use client";

import Logo from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { LogIn } from "lucide-react";
import Link from "next/link";
import UserDropdown from "./UserDropdown";

interface navigationItemsProps {
  name: string;
  href: string;
}

const navigationItems: navigationItemsProps[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Courses",
    href: "/courses",
  },
  {
    name: "Dashboard",
    href: "/admin",
  },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky z-50 top-0 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className="container min-h-16 flex items-center mx-auto px-4 md:px-6 lg:px-8">
        <Logo classname="mr-4" />
        {/* Desktop Navbar */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {isPending ? null : session ? (
              <UserDropdown
                name={
                  session?.user?.name && session?.user?.name.length > 0
                    ? session?.user?.name
                    : session?.user?.email
                }
                email={session?.user?.email}
                image={session?.user?.image ?? ""}
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  <LogIn />
                  Sign In
                </Link>
                <Link href="/login" className={buttonVariants()}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
