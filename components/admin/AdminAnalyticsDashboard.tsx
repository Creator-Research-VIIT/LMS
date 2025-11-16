"use client";

import {
    BookOpen,
    DollarSign,
    Loader2,
    TrendingUp,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";

interface AnalyticsStats {
  totalStudents: number;
  totalCourses: number;
  totalPayments: number;
  totalRevenue: number;
  activeUsers: number;
  totalEnrollments: number;
}

export default function AdminAnalyticsDashboard() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/analytics");
      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex justify-center items-center min-h-96">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Students",
      value: stats.totalStudents.toLocaleString(),
      icon: Users,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "+12% from last month",
    },
    {
      label: "Total Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      trend: "+5 courses this month",
    },
    {
      label: "Total Payments",
      value: stats.totalPayments.toLocaleString(),
      icon: DollarSign,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      trend: "+8% conversion rate",
    },
    {
      label: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "+15% growth",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{card.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {card.value}
              </p>
              <p className="text-xs text-gray-500">{card.trend}</p>
            </div>
          );
        })}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Users */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Active Students</span>
                <span className="text-2xl font-bold text-gray-900">
                  {stats.activeUsers.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(stats.activeUsers / stats.totalStudents) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((stats.activeUsers / stats.totalStudents) * 100)}% of total students
              </p>
            </div>
          </div>
        </div>

        {/* Enrollment Rate */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Enrollments</h3>
            <BookOpen className="w-5 h-5 text-green-600" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Total Enrollments</span>
                <span className="text-2xl font-bold text-gray-900">
                  {stats.totalEnrollments.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      (stats.totalEnrollments / (stats.totalStudents * stats.totalCourses)) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Avg: {stats.totalCourses > 0 ? (stats.totalEnrollments / stats.totalCourses).toFixed(1) : 0} per course
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Platform Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-4">
            <p className="text-gray-600 text-sm mb-2">Avg Students per Course</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalCourses > 0
                ? (stats.totalStudents / stats.totalCourses).toFixed(1)
                : "0"}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="text-gray-600 text-sm mb-2">Average Revenue per Payment</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹
              {stats.totalPayments > 0
                ? (stats.totalRevenue / stats.totalPayments).toFixed(0)
                : "0"}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="text-gray-600 text-sm mb-2">Platform Utilization</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalEnrollments > 0 ? "Active" : "Starting"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
