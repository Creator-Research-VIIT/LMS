"use client"

import { useState } from "react"
import { Bell, BookOpen, Calendar, CheckCircle, AlertCircle } from "lucide-react"
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "general" | "course" | "assignment" | "system"
  title: string
  description: string
  timestamp: string
  isRead: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "assignment",
    title: "New Assignment Posted",
    description: "Your instructor added Assignment 2 in Data Structures",
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    type: "course",
    title: "Course Material Updated",
    description: "New lecture slides available for Web Development",
    timestamp: "4 hours ago",
    isRead: false,
  },
  {
    id: "3",
    type: "general",
    title: "Grade Posted",
    description: "Your grade for Quiz 3 has been posted",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "4",
    type: "system",
    title: "Maintenance Scheduled",
    description: "Platform maintenance scheduled for this weekend",
    timestamp: "2 days ago",
    isRead: true,
  },
  {
    id: "5",
    type: "assignment",
    title: "Assignment Due Soon",
    description: "Assignment 1 in Algorithms is due in 2 days",
    timestamp: "3 days ago",
    isRead: false,
  },
  {
    id: "6",
    type: "course",
    title: "New Discussion Thread",
    description: "Join the discussion about React Hooks in the forum",
    timestamp: "1 week ago",
    isRead: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "course":
      return <BookOpen className="h-5 w-5 text-blue-500" />
    case "assignment":
      return <Calendar className="h-5 w-5 text-orange-500" />
    case "system":
      return <AlertCircle className="h-5 w-5 text-red-500" />
    default:
      return <Bell className="h-5 w-5 text-gray-500" />
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "courses") return notification.type === "course"
    if (activeTab === "assignments") return notification.type === "assignment"
    if (activeTab === "system") return notification.type === "system"
    return true
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col">
            <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">Notifications</h1>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {unreadCount} unread
                  </Badge>
                )}
              </div>
              <Button onClick={markAllAsRead} variant="outline" size="sm" disabled={unreadCount === 0}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark all as read
              </Button>
            </header>

            <main className="flex-1 p-4 md:p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-4">
                  {filteredNotifications.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium text-muted-foreground">No notifications</p>
                        <p className="text-sm text-muted-foreground">You're all caught up!</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {filteredNotifications.map((notification) => (
                        <Card
                          key={notification.id}
                          className={cn(
                            "cursor-pointer transition-colors hover:bg-muted/50",
                            !notification.isRead && "bg-muted/10 border-l-4 border-l-primary",
                          )}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <h3
                                    className={cn(
                                      "font-medium text-sm leading-5",
                                      !notification.isRead && "font-semibold",
                                    )}
                                  >
                                    {notification.title}
                                  </h3>
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                                    {notification.timestamp}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 leading-5">
                                  {notification.description}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {notification.type}
                                  </Badge>
                                  {!notification.isRead && <div className="h-2 w-2 bg-primary rounded-full" />}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
