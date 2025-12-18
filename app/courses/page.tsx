import { Suspense } from "react";
import CoursesPageClient from "./courses-client";

export default function CoursesPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      }>
        <CoursesPageClient />
      </Suspense>
    </div>
  );
}