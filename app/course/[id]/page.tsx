import CourseViewer from "@/components/CourseViewer";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  
  return <CourseViewer courseId={id} />;
}