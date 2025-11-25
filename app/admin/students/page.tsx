import AdminStudentsTable from "@/components/admin/AdminStudentsTable";

export default function AdminStudentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Students</h1>
        <p className="text-gray-600 mt-1">Manage and view all students on the platform</p>
      </div>
      
      <AdminStudentsTable />
    </div>
  );
}
