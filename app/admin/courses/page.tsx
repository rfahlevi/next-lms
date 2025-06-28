import { buttonVariants } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import Link from "next/link";

const CoursePage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Link
          href="/admin/courses/create"
          className={buttonVariants({
            size: "sm",
          })}
        >
          <SquarePlus />
          Create Course
        </Link>
      </div>

      <div>
        <h1>Here you will see all the courses</h1>
      </div>
    </>
  );
};

export default CoursePage;
