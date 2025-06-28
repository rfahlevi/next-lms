import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;
export const courseCategories = [
  "Development",
  "Business",
  "Finance",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  fileKey: z.string().min(1, { message: "File is required" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be a positive number" }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 hour" })
    .max(500, {
      message: "Duration must be at most 500 hours",
    }),
  level: z.enum(courseLevels),
  category: z.enum(courseCategories, {
    required_error: "Category is required",
  }),
  smallDescription: z
    .string()
    .min(1, {
      message: "Small description is required",
    })
    .max(200, { message: "Small description must be at most 100 characters" }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
  status: z.enum(courseStatus, {
    required_error: "Status is required",
  }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
