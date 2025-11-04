import { Suspense } from "react";
import CourseEnrolledClient from "./enrolled-client";

interface CourseEnrolledPageProps {
  readonly params: Promise<{ id: string }>
}

export default async function CourseEnrolledPage({ params }: CourseEnrolledPageProps) {
  const { id } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      }>
        <CourseEnrolledClient params={{ id }} />
      </Suspense>
    </div>
  );
}