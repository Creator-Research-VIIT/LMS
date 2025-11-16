import AdminPaymentsTable from "@/components/admin/AdminPaymentsTable";

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600 mt-1">View and manage all payments</p>
      </div>
      
      <AdminPaymentsTable />
    </div>
  );
}
