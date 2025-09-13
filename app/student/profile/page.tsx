"use client"

import { useState } from "react"
import { Sidebar, SidebarContent, SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Calendar, BookOpen, Settings, Bell, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock user data - in a real app, this would come from your auth context or API
const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  role: "Student",
  enrollmentDate: "2023-09-01",
  avatar: "/student-avatar.png",
  stats: {
    totalCourses: 8,
    completedCourses: 3,
    assignmentsSubmitted: 24,
    overallProgress: 65,
  },
  settings: {
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
  },
}

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const { toast } = useToast()

  const handleEditProfile = () => {
    setUser((prev) => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
    }))
    setIsEditDialogOpen(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    })
  }

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match.",
        variant: "destructive",
      })
      return
    }
    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setIsPasswordDialogOpen(false)
    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    })
  }

  const handleNotificationToggle = (setting: keyof typeof user.settings) => {
    setUser((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [setting]: !prev.settings[setting],
      },
    }))
    toast({
      title: "Settings Updated",
      description: `${setting.replace(/([A-Z])/g, " $1").toLowerCase()} ${!user.settings[setting] ? "enabled" : "disabled"}.`,
    })
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            {/* Sidebar content would go here */}
            <div className="p-4">
              <h2 className="text-lg font-semibold">Student Portal</h2>
            </div>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">My Profile</h1>
            </div>

            {/* Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="text-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                    <Badge variant="secondary" className="mt-2">
                      {user.role}
                    </Badge>
                  </div>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <User className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleEditProfile}>Save Changes</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-muted-foreground">{user.name}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center space-x-3">
                    <Badge className="h-4 w-4" />
                    <div>
                      <p className="text-sm font-medium">Role</p>
                      <p className="text-sm text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Enrollment Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(user.enrollmentDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Learning Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Courses Enrolled</span>
                    <Badge variant="outline">{user.stats.totalCourses}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Courses Completed</span>
                    <Badge variant="outline">{user.stats.completedCourses}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Assignments Submitted</span>
                    <Badge variant="outline">{user.stats.assignmentsSubmitted}</Badge>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">{user.stats.overallProgress}%</span>
                    </div>
                    <Progress value={user.stats.overallProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Settings */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Security</h3>
                      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Lock className="mr-2 h-4 w-4" />
                            Change Password
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="current-password">Current Password</Label>
                              <Input
                                id="current-password"
                                type="password"
                                value={passwordForm.currentPassword}
                                onChange={(e) =>
                                  setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="new-password">New Password</Label>
                              <Input
                                id="new-password"
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="confirm-password">Confirm New Password</Label>
                              <Input
                                id="confirm-password"
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) =>
                                  setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                                }
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleChangePassword}>Change Password</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Bell className="h-4 w-4" />
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                          </div>
                          <Switch
                            id="email-notifications"
                            checked={user.settings.emailNotifications}
                            onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Bell className="h-4 w-4" />
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                          </div>
                          <Switch
                            id="push-notifications"
                            checked={user.settings.pushNotifications}
                            onCheckedChange={() => handleNotificationToggle("pushNotifications")}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <Label htmlFor="weekly-digest">Weekly Digest</Label>
                          </div>
                          <Switch
                            id="weekly-digest"
                            checked={user.settings.weeklyDigest}
                            onCheckedChange={() => handleNotificationToggle("weeklyDigest")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
