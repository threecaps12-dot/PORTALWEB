import { notFound } from "next/navigation";
import CoursePlayer from "@/components/academia/CoursePlayer";
import { COURSES, getCourse } from "@/lib/academiaDemo";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export default function CursoPage({ params }: { params: { slug: string } }) {
  const course = getCourse(params.slug);
  if (!course) notFound();
  return <CoursePlayer course={course} />;
}
