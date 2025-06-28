import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Globe, LogIn } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative py-20">
      <div className="flex flex-col items-center text-center space-y-8">
        <Badge variant="outline">The Future of Online Education</Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Elevate Your Learning Experience
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Discover a new way to learn with our modern, interactive learning
          management system. Access high-quality courses anytime, anywhere.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/"
            className={buttonVariants({
              size: "lg",
            })}
          >
            <Globe />
            Explore Courses
          </Link>
          <Link
            href="/login"
            className={buttonVariants({
              size: "lg",
              variant: "outline",
            })}
          >
            <LogIn />
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
