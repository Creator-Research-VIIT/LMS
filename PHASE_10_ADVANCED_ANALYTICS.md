# LMS Project - Phase 10: Advanced Analytics & Reporting
**Date:** December 2025 (Planned)  
**Branch:** feature/analytics-reporting  
**Status:** 📋 Planned  
**Prerequisites:** Phases 1-9 completed

---

## 📋 Phase Overview

This phase will implement comprehensive analytics and reporting system for all user roles. It includes real-time dashboards, data visualization, automated report generation, and business intelligence features to help administrators, teachers, and students make data-driven decisions.

## 🎯 Objectives
- Build comprehensive analytics dashboard for all user roles
- Implement real-time data visualization and charts
- Create automated report generation system
- Add business intelligence and insights
- Develop predictive analytics for student success
- Implement data export and sharing capabilities
- Create custom reporting tools

---

## 🔧 Technical Implementation Plan

### **1. Database Schema Updates**

#### **Analytics-Related Models**
```prisma
model Analytics {
  id              String          @id @default(cuid())
  type            AnalyticsType
  entityId        String          // courseId, userId, etc.
  entityType      EntityType
  metric          String
  value           Float
  metadata        Json?
  recordedAt      DateTime        @default(now())
  
  @@map("analytics")
  @@index([type, entityType, recordedAt])
  @@index([entityId, metric, recordedAt])
}

model Report {
  id              String          @id @default(cuid())
  title           String
  description     String?
  type            ReportType
  createdBy       String
  parameters      Json
  generatedAt     DateTime        @default(now())
  scheduledFor    DateTime?
  status          ReportStatus
  filePath        String?
  recipientEmails String[]
  
  // Relations
  creator         User            @relation(fields: [createdBy], references: [id])
  
  @@map("reports")
}

model UserActivity {
  id              String          @id @default(cuid())
  userId          String
  activityType    ActivityType
  entityId        String?         // courseId, quizId, etc.
  entityType      EntityType?
  metadata        Json?
  sessionId       String?
  ipAddress       String?
  userAgent       String?
  timestamp       DateTime        @default(now())
  
  // Relations
  user            User            @relation(fields: [userId], references: [id])
  
  @@map("user_activities")
  @@index([userId, timestamp])
  @@index([activityType, timestamp])
}

model Dashboard {
  id              String          @id @default(cuid())
  name            String
  description     String?
  userId          String
  userRole        Role
  widgets         Json            // Widget configuration
  layout          Json            // Dashboard layout
  isDefault       Boolean         @default(false)
  isPublic        Boolean         @default(false)
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  
  // Relations
  user            User            @relation(fields: [userId], references: [id])
  
  @@map("dashboards")
}

model KPI {
  id              String          @id @default(cuid())
  name            String
  description     String?
  category        KPICategory
  formula         String          // Calculation formula
  target          Float?
  currentValue    Float?
  previousValue   Float?
  trend           TrendDirection?
  lastCalculated  DateTime?
  isActive        Boolean         @default(true)
  
  @@map("kpis")
}

enum AnalyticsType {
  COURSE_ENGAGEMENT
  USER_BEHAVIOR
  FINANCIAL
  PERFORMANCE
  SYSTEM_USAGE
}

enum EntityType {
  USER
  COURSE
  QUIZ
  PAYMENT
  ENROLLMENT
  ASSIGNMENT
}

enum ReportType {
  COURSE_PERFORMANCE
  STUDENT_PROGRESS
  REVENUE
  USER_ENGAGEMENT
  SYSTEM_HEALTH
  CUSTOM
}

enum ReportStatus {
  PENDING
  GENERATING
  COMPLETED
  FAILED
  SCHEDULED
}

enum ActivityType {
  LOGIN
  LOGOUT
  COURSE_VIEW
  COURSE_ENROLL
  QUIZ_START
  QUIZ_COMPLETE
  PAYMENT_INITIATE
  PAYMENT_COMPLETE
  CONTENT_VIEW
  DOWNLOAD
  SEARCH
  FEEDBACK_SUBMIT
}

enum KPICategory {
  ENGAGEMENT
  FINANCIAL
  OPERATIONAL
  SATISFACTION
  GROWTH
}

enum TrendDirection {
  UP
  DOWN
  STABLE
}
```

### **2. Analytics Service Implementation**

#### **Core Analytics Service**
```typescript
// lib/analytics.ts
export class AnalyticsService {
  private static instance: AnalyticsService;

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  async recordEvent(
    type: AnalyticsType,
    entityId: string,
    entityType: EntityType,
    metric: string,
    value: number,
    metadata?: Record<string, any>
  ) {
    try {
      await prisma.analytics.create({
        data: {
          type,
          entityId,
          entityType,
          metric,
          value,
          metadata: metadata || {}
        }
      });
    } catch (error) {
      console.error('Failed to record analytics event:', error);
    }
  }

  async recordUserActivity(
    userId: string,
    activityType: ActivityType,
    entityId?: string,
    entityType?: EntityType,
    metadata?: Record<string, any>,
    request?: NextRequest
  ) {
    try {
      await prisma.userActivity.create({
        data: {
          userId,
          activityType,
          entityId,
          entityType,
          metadata: metadata || {},
          sessionId: request?.cookies.get('session-id')?.value,
          ipAddress: request?.ip || request?.headers.get('x-forwarded-for'),
          userAgent: request?.headers.get('user-agent')
        }
      });
    } catch (error) {
      console.error('Failed to record user activity:', error);
    }
  }

  async getCourseAnalytics(courseId: string, timeRange: string = '30d') {
    const startDate = this.getStartDate(timeRange);
    
    const [
      enrollments,
      completions,
      averageProgress,
      quizScores,
      engagement,
      revenue
    ] = await Promise.all([
      this.getEnrollmentStats(courseId, startDate),
      this.getCompletionStats(courseId, startDate),
      this.getAverageProgress(courseId),
      this.getQuizStats(courseId, startDate),
      this.getEngagementStats(courseId, startDate),
      this.getRevenueStats(courseId, startDate)
    ]);

    return {
      enrollments,
      completions,
      averageProgress,
      quizScores,
      engagement,
      revenue,
      timeRange
    };
  }

  async getUserAnalytics(userId: string, timeRange: string = '30d') {
    const startDate = this.getStartDate(timeRange);
    
    const [
      learningProgress,
      timeSpent,
      coursesCompleted,
      quizPerformance,
      activityPattern,
      achievements
    ] = await Promise.all([
      this.getUserProgress(userId),
      this.getUserTimeSpent(userId, startDate),
      this.getUserCompletions(userId, startDate),
      this.getUserQuizPerformance(userId, startDate),
      this.getUserActivityPattern(userId, startDate),
      this.getUserAchievements(userId, startDate)
    ]);

    return {
      learningProgress,
      timeSpent,
      coursesCompleted,
      quizPerformance,
      activityPattern,
      achievements,
      timeRange
    };
  }

  async getSystemAnalytics(timeRange: string = '30d') {
    const startDate = this.getStartDate(timeRange);
    
    const [
      userGrowth,
      courseGrowth,
      revenue,
      engagement,
      performance,
      satisfaction
    ] = await Promise.all([
      this.getUserGrowthStats(startDate),
      this.getCourseGrowthStats(startDate),
      this.getSystemRevenueStats(startDate),
      this.getSystemEngagementStats(startDate),
      this.getSystemPerformanceStats(startDate),
      this.getSatisfactionStats(startDate)
    ]);

    return {
      userGrowth,
      courseGrowth,
      revenue,
      engagement,
      performance,
      satisfaction,
      timeRange
    };
  }

  private async getEnrollmentStats(courseId: string, startDate: Date) {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        courseId,
        enrolledAt: { gte: startDate }
      },
      include: {
        student: { select: { id: true, name: true, email: true } }
      },
      orderBy: { enrolledAt: 'desc' }
    });

    const dailyEnrollments = await this.groupByDay(
      enrollments,
      'enrolledAt',
      startDate
    );

    return {
      total: enrollments.length,
      daily: dailyEnrollments,
      recent: enrollments.slice(0, 10)
    };
  }

  private async getCompletionStats(courseId: string, startDate: Date) {
    const completions = await prisma.progress.findMany({
      where: {
        courseId,
        completed: true,
        updatedAt: { gte: startDate }
      },
      include: {
        student: { select: { id: true, name: true, email: true } }
      }
    });

    const completionRate = await this.calculateCompletionRate(courseId);

    return {
      total: completions.length,
      rate: completionRate,
      recent: completions.slice(0, 10)
    };
  }

  private async calculateCompletionRate(courseId: string): Promise<number> {
    const [totalEnrollments, completions] = await Promise.all([
      prisma.enrollment.count({ where: { courseId } }),
      prisma.progress.count({ where: { courseId, completed: true } })
    ]);

    return totalEnrollments > 0 ? (completions / totalEnrollments) * 100 : 0;
  }

  private getStartDate(timeRange: string): Date {
    const now = new Date();
    const ranges = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365
    };
    
    const days = ranges[timeRange] || 30;
    return new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
  }

  private async groupByDay(
    data: any[],
    dateField: string,
    startDate: Date
  ): Promise<{ date: string; count: number }[]> {
    const grouped = new Map<string, number>();
    
    // Initialize all days with 0
    const current = new Date(startDate);
    const now = new Date();
    
    while (current <= now) {
      const dateStr = current.toISOString().split('T')[0];
      grouped.set(dateStr, 0);
      current.setDate(current.getDate() + 1);
    }

    // Count actual data
    data.forEach(item => {
      const date = new Date(item[dateField]).toISOString().split('T')[0];
      grouped.set(date, (grouped.get(date) || 0) + 1);
    });

    return Array.from(grouped.entries()).map(([date, count]) => ({
      date,
      count
    }));
  }
}
```

### **3. Real-Time Dashboard API**

#### **Analytics API Endpoints**
```typescript
// app/api/analytics/dashboard/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AnalyticsService } from '@/lib/analytics';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get('timeRange') || '30d';
    const type = searchParams.get('type') || 'overview';

    const analytics = AnalyticsService.getInstance();
    let data;

    switch (session.user.role) {
      case 'ADMIN':
        data = await analytics.getSystemAnalytics(timeRange);
        break;
      case 'TEACHER':
        if (type === 'course') {
          const courseId = searchParams.get('courseId');
          if (!courseId) {
            return NextResponse.json({ error: 'Course ID required' }, { status: 400 });
          }
          data = await analytics.getCourseAnalytics(courseId, timeRange);
        } else {
          data = await analytics.getTeacherAnalytics(session.user.id, timeRange);
        }
        break;
      case 'STUDENT':
        data = await analytics.getUserAnalytics(session.user.id, timeRange);
        break;
      default:
        return NextResponse.json({ error: 'Invalid role' }, { status: 403 });
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Analytics dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
```

#### **Real-Time Updates Endpoint**
```typescript
// app/api/analytics/realtime/route.ts
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Set up Server-Sent Events
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(async () => {
        try {
          const realtimeData = await getRealTimeMetrics(session.user.role, session.user.id);
          const data = `data: ${JSON.stringify(realtimeData)}\n\n`;
          controller.enqueue(encoder.encode(data));
        } catch (error) {
          console.error('Real-time analytics error:', error);
        }
      }, 5000); // Update every 5 seconds

      // Clean up on client disconnect
      req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

async function getRealTimeMetrics(role: string, userId: string) {
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

  switch (role) {
    case 'ADMIN':
      return {
        activeUsers: await getActiveUsersCount(fiveMinutesAgo),
        newEnrollments: await getNewEnrollmentsCount(fiveMinutesAgo),
        ongoingQuizzes: await getOngoingQuizzesCount(),
        systemLoad: await getSystemLoadMetrics()
      };
    case 'TEACHER':
      return {
        activeStudents: await getActiveStudentsForTeacher(userId, fiveMinutesAgo),
        newEnrollments: await getNewEnrollmentsForTeacher(userId, fiveMinutesAgo),
        quizCompletions: await getQuizCompletionsForTeacher(userId, fiveMinutesAgo)
      };
    case 'STUDENT':
      return {
        currentProgress: await getCurrentProgress(userId),
        timeSpentToday: await getTimeSpentToday(userId),
        streakDays: await getStreakDays(userId)
      };
    default:
      return {};
  }
}
```

### **4. Report Generation System**

#### **Report Generator Service**
```typescript
// lib/report-generator.ts
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import { createCanvas } from 'canvas';
import Chart from 'chart.js/auto';

export class ReportGenerator {
  async generateReport(
    type: ReportType,
    parameters: any,
    format: 'PDF' | 'EXCEL' | 'CSV' = 'PDF'
  ): Promise<Buffer> {
    const data = await this.fetchReportData(type, parameters);
    
    switch (format) {
      case 'PDF':
        return this.generatePDFReport(type, data, parameters);
      case 'EXCEL':
        return this.generateExcelReport(type, data, parameters);
      case 'CSV':
        return this.generateCSVReport(type, data, parameters);
      default:
        throw new Error('Unsupported format');
    }
  }

  private async generatePDFReport(
    type: ReportType,
    data: any,
    parameters: any
  ): Promise<Buffer> {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));
    
    return new Promise((resolve) => {
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      // Header
      doc.fontSize(20).text('LMS Analytics Report', 50, 50);
      doc.fontSize(12).text(`Report Type: ${type}`, 50, 80);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 50, 100);
      
      // Add line
      doc.moveTo(50, 130).lineTo(550, 130).stroke();

      let yPosition = 150;

      switch (type) {
        case 'COURSE_PERFORMANCE':
          yPosition = this.addCoursePerformanceSection(doc, data, yPosition);
          break;
        case 'STUDENT_PROGRESS':
          yPosition = this.addStudentProgressSection(doc, data, yPosition);
          break;
        case 'REVENUE':
          yPosition = this.addRevenueSection(doc, data, yPosition);
          break;
        default:
          doc.text('Report content not implemented', 50, yPosition);
      }

      // Add charts if available
      if (data.charts) {
        yPosition += 50;
        doc.text('Charts and Visualizations', 50, yPosition);
        yPosition += 30;
        
        for (const chartData of data.charts) {
          const chartBuffer = await this.generateChart(chartData);
          doc.image(chartBuffer, 50, yPosition, { width: 500 });
          yPosition += 300;
        }
      }

      doc.end();
    });
  }

  private async generateExcelReport(
    type: ReportType,
    data: any,
    parameters: any
  ): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Analytics Report');

    // Header
    worksheet.addRow(['LMS Analytics Report']);
    worksheet.addRow([`Report Type: ${type}`]);
    worksheet.addRow([`Generated: ${new Date().toLocaleString()}`]);
    worksheet.addRow([]);

    switch (type) {
      case 'COURSE_PERFORMANCE':
        this.addCoursePerformanceToExcel(worksheet, data);
        break;
      case 'STUDENT_PROGRESS':
        this.addStudentProgressToExcel(worksheet, data);
        break;
      case 'REVENUE':
        this.addRevenueToExcel(worksheet, data);
        break;
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  private async generateChart(chartData: any): Promise<Buffer> {
    const canvas = createCanvas(800, 400);
    const ctx = canvas.getContext('2d');

    const chart = new Chart(ctx as any, {
      type: chartData.type,
      data: chartData.data,
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: chartData.title
          }
        }
      }
    });

    return canvas.toBuffer('image/png');
  }

  private async fetchReportData(type: ReportType, parameters: any) {
    const analytics = AnalyticsService.getInstance();
    
    switch (type) {
      case 'COURSE_PERFORMANCE':
        return analytics.getCourseAnalytics(parameters.courseId, parameters.timeRange);
      case 'STUDENT_PROGRESS':
        return analytics.getUserAnalytics(parameters.userId, parameters.timeRange);
      case 'REVENUE':
        return analytics.getRevenueAnalytics(parameters.timeRange);
      default:
        throw new Error('Unsupported report type');
    }
  }
}
```

### **5. Frontend Dashboard Components**

#### **Analytics Dashboard**
```tsx
// components/analytics/analytics-dashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { LineChart, BarChart, PieChart, AreaChart } from '@/components/ui/charts';
import { MetricCard } from '@/components/analytics/metric-card';
import { RealtimeMetrics } from '@/components/analytics/realtime-metrics';

interface AnalyticsDashboardProps {
  userRole: 'ADMIN' | 'TEACHER' | 'STUDENT';
  userId?: string;
}

export function AnalyticsDashboard({ userRole, userId }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState('30d');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics/dashboard?timeRange=${timeRange}`);
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchAnalytics();
    setRefreshing(false);
  };

  const downloadReport = async (format: 'PDF' | 'EXCEL') => {
    try {
      const response = await fetch('/api/analytics/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: getReportType(userRole),
          format,
          timeRange,
          parameters: { userId }
        })
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-report.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download report:', error);
    }
  };

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            onClick={refreshData}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Button
            variant="outline"
            onClick={() => downloadReport('PDF')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>

          <Button
            variant="outline"
            onClick={() => downloadReport('EXCEL')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <RealtimeMetrics userRole={userRole} />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderKeyMetrics(userRole, data)}
      </div>

      {/* Charts and Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          {userRole === 'ADMIN' && <TabsTrigger value="revenue">Revenue</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderOverviewCharts(userRole, data)}
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderEngagementCharts(userRole, data)}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderPerformanceCharts(userRole, data)}
          </div>
        </TabsContent>

        {userRole === 'ADMIN' && (
          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderRevenueCharts(data)}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

function renderKeyMetrics(userRole: string, data: any) {
  switch (userRole) {
    case 'ADMIN':
      return [
        <MetricCard
          key="users"
          title="Total Users"
          value={data.userGrowth.total}
          change={data.userGrowth.change}
          trend={data.userGrowth.trend}
        />,
        <MetricCard
          key="courses"
          title="Total Courses"
          value={data.courseGrowth.total}
          change={data.courseGrowth.change}
          trend={data.courseGrowth.trend}
        />,
        <MetricCard
          key="revenue"
          title="Total Revenue"
          value={`$${data.revenue.total.toLocaleString()}`}
          change={data.revenue.change}
          trend={data.revenue.trend}
        />,
        <MetricCard
          key="satisfaction"
          title="Satisfaction Score"
          value={`${data.satisfaction.score}/5.0`}
          change={data.satisfaction.change}
          trend={data.satisfaction.trend}
        />
      ];
    case 'TEACHER':
      return [
        <MetricCard
          key="students"
          title="Total Students"
          value={data.students.total}
          change={data.students.change}
          trend={data.students.trend}
        />,
        <MetricCard
          key="courses"
          title="Active Courses"
          value={data.courses.active}
          change={data.courses.change}
          trend={data.courses.trend}
        />,
        <MetricCard
          key="completion"
          title="Completion Rate"
          value={`${data.completion.rate}%`}
          change={data.completion.change}
          trend={data.completion.trend}
        />,
        <MetricCard
          key="rating"
          title="Average Rating"
          value={`${data.rating.average}/5.0`}
          change={data.rating.change}
          trend={data.rating.trend}
        />
      ];
    case 'STUDENT':
      return [
        <MetricCard
          key="enrolled"
          title="Enrolled Courses"
          value={data.enrolled.total}
          change={data.enrolled.change}
          trend={data.enrolled.trend}
        />,
        <MetricCard
          key="completed"
          title="Completed Courses"
          value={data.completed.total}
          change={data.completed.change}
          trend={data.completed.trend}
        />,
        <MetricCard
          key="time"
          title="Time Spent"
          value={`${data.timeSpent.hours}h`}
          change={data.timeSpent.change}
          trend={data.timeSpent.trend}
        />,
        <MetricCard
          key="streak"
          title="Learning Streak"
          value={`${data.streak.days} days`}
          change={data.streak.change}
          trend={data.streak.trend}
        />
      ];
    default:
      return [];
  }
}

function renderOverviewCharts(userRole: string, data: any) {
  // Implementation for different chart types based on user role
  return [];
}

function renderEngagementCharts(userRole: string, data: any) {
  // Implementation for engagement charts
  return [];
}

function renderPerformanceCharts(userRole: string, data: any) {
  // Implementation for performance charts
  return [];
}

function renderRevenueCharts(data: any) {
  // Implementation for revenue charts (admin only)
  return [];
}

function getReportType(userRole: string) {
  switch (userRole) {
    case 'ADMIN':
      return 'SYSTEM_OVERVIEW';
    case 'TEACHER':
      return 'COURSE_PERFORMANCE';
    case 'STUDENT':
      return 'STUDENT_PROGRESS';
    default:
      return 'CUSTOM';
  }
}
```

---

## 📊 Key Features to Deliver

### ✅ **Real-Time Analytics**
- [ ] Live dashboard updates via WebSocket/SSE
- [ ] Real-time user activity tracking
- [ ] System performance monitoring
- [ ] Instant metric calculations
- [ ] Live notification system

### ✅ **Data Visualization**
- [ ] Interactive charts and graphs (Chart.js/D3.js)
- [ ] Customizable dashboard widgets
- [ ] Heat maps and timeline views
- [ ] Comparative analysis tools
- [ ] Trend visualization

### ✅ **Report Generation**
- [ ] Automated PDF report generation
- [ ] Excel spreadsheet exports
- [ ] CSV data exports
- [ ] Scheduled report delivery
- [ ] Custom report builder

### ✅ **Business Intelligence**
- [ ] Predictive analytics for student success
- [ ] Course recommendation engine
- [ ] Revenue forecasting
- [ ] Churn prediction
- [ ] Performance benchmarking

### ✅ **Role-Based Analytics**
- [ ] Admin system-wide analytics
- [ ] Teacher course performance metrics
- [ ] Student learning progress tracking
- [ ] Customizable KPI dashboards
- [ ] Cross-role comparison tools

---

## 🧪 Testing Strategy

### **Analytics Testing**
```javascript
// tests/analytics.test.js
describe('Analytics System', () => {
  test('should record analytics events correctly', async () => {
    const analytics = AnalyticsService.getInstance();
    
    await analytics.recordEvent(
      'COURSE_ENGAGEMENT',
      'course-123',
      'COURSE',
      'view_count',
      1
    );

    const events = await prisma.analytics.findMany({
      where: {
        entityId: 'course-123',
        metric: 'view_count'
      }
    });

    expect(events).toHaveLength(1);
    expect(events[0].value).toBe(1);
  });

  test('should calculate completion rate correctly', async () => {
    // Create test data
    await createTestEnrollments();
    await createTestCompletions();

    const analytics = AnalyticsService.getInstance();
    const courseAnalytics = await analytics.getCourseAnalytics('course-123');

    expect(courseAnalytics.completions.rate).toBe(60); // 3 out of 5 completed
  });

  test('should generate PDF report successfully', async () => {
    const reportGenerator = new ReportGenerator();
    const buffer = await reportGenerator.generateReport(
      'COURSE_PERFORMANCE',
      { courseId: 'course-123', timeRange: '30d' },
      'PDF'
    );

    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });
});
```

---

## 📚 Documentation Requirements

### **Analytics Guide**
- Dashboard navigation and features
- Metric definitions and calculations
- Report generation and scheduling
- Data interpretation guidelines

### **API Documentation**
- Analytics endpoint specifications
- Real-time data streaming
- Report generation API
- Custom widget development

---

## 📈 Success Metrics

### **Performance Targets**
- Dashboard load time < 2 seconds
- Real-time update latency < 1 second
- Report generation time < 30 seconds
- 99.9% data accuracy

### **User Adoption**
- 80%+ daily active dashboard users
- 50%+ regular report downloads
- 90%+ user satisfaction with analytics
- 70%+ custom dashboard creation

---

**Phase 10 Status: 📋 PLANNED**  
**Estimated Duration:** 4-5 weeks  
**Prerequisites:** Complete Phases 1-9  
**Next Phase:** Phase 11 - Mobile Application Development