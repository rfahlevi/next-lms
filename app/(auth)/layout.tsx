import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/Logo.svg";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col min-h-svh items-center justify-center">
      <Link
        href="/"
        className={buttonVariants({
          className: "absolute top-2 left-2",
          variant: "ghost",
          size: "sm",
        })}
      >
        <ArrowLeftIcon />
        Back
      </Link>
      <div className="w-full max-w-sm flex flex-col gap-6">
        <Link
          href="/"
          className="flex items-center self-center gap-2 font-bold text-xl"
        >
          <Image src={Logo} width={36} height={36} alt="Logo" />
          PrimeLMS.
        </Link>
        {children}
        <div className="text-balance text-sm text-center text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <span className="hover:text-primary hover:underline cursor-pointer">
            Terms and Service
          </span>{" "}
          and{" "}
          <span className="hover:text-primary hover:underline cursor-pointer">
            Privacy Policy
          </span>
          .
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
