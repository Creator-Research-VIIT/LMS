"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../components/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BookOpen, Calendar, Home, Menu, User, X, LogOut, Bell } from "lucide-react"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/student/my-dashboard" },
  { icon: BookOpen, label: "Courses", href: "/student/courses" },
  { icon: BookOpen, label: "My Courses", href: "/student/my-courses" },
  { icon: Calendar, label: "Assignments", href: "/student/assignments" },
  { icon: Bell, label: "Notifications", href: "/student/notifications" },
  { icon: User, label: "Profile", href: "/student/profile" },
]

interface SidebarProps {
  children: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-2xl font-serif font-bold text-sidebar-foreground">EduLearn</h1>
          </div>

          {/* User info */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-sidebar-foreground">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200"
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
