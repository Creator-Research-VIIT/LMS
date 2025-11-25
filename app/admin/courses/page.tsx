import AdminCoursesTable from "@/components/admin/AdminCoursesTable";

export default function AdminCoursesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <p className="text-gray-600 mt-1">Manage and view all courses on the platform</p>
      </div>
      
      <AdminCoursesTable />
    </div>
  );
}
