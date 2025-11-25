import AdminAnalyticsDashboard from "@/components/admin/AdminAnalyticsDashboard";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">View platform analytics and insights</p>
      </div>
      
      <AdminAnalyticsDashboard />
    </div>
  );
}
