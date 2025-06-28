import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, ChartPie, Gamepad2, Users } from "lucide-react";
import { ReactNode } from "react";

interface featureProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const features: featureProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of carefully curated courses designed by industry exprerts.",
    icon: <Book className="text-rose-500 size-10" />,
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assignment to enhance your learning experience.",
    icon: <Gamepad2 className="text-rose-500 size-10" />,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress and achievements with detailed analytics personalized dashboard",
    icon: <ChartPie className="text-rose-500 size-10" />,
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and instructors to collaborate and share knowledge.",
    icon: <Users className="text-rose-500 size-10" />,
  },
];

export default function Features() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mb-4">
              <CardTitle>{feature.icon}</CardTitle>
            </div>
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
