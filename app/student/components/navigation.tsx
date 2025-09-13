"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  userType?: "student" | "admin" | null
}

export function Navigation({ userType = null }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">LearnHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {userType === "student" && (
              <>
                <Link
                  href="/student/dashboard"
                  className={cn(
                    "text-gray-600 hover:text-blue-600 transition-colors",
                    isActive("/student/dashboard") && "text-blue-600 font-medium",
                  )}
                >
                  Dashboard
                </Link>
                <Link
                  href="/student/courses"
                  className={cn(
                    "text-gray-600 hover:text-blue-600 transition-colors",
                    isActive("/student/courses") && "text-blue-600 font-medium",
                  )}
                >
                  My Courses
                </Link>
                <Link
                  href="/courses"
                  className={cn(
                    "text-gray-600 hover:text-blue-600 transition-colors",
                    isActive("/courses") && "text-blue-600 font-medium",
                  )}
                >
                  Browse
                </Link>
              </>
            )}

            {userType === "admin" && (
              <>
                <Link
                  href="/admin/dashboard"
                  className={cn(
                    "text-gray-600 hover:text-blue-600 transition-colors",
                    isActive("/admin/dashboard") && "text-blue-600 font-medium",
                  )}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/courses"
                  className={cn(
                    "text-gray-600 hover:text-blue-600 transition-colors",
                    isActive("/admin/courses") && "text-blue-600 font-medium",
                  )}
                >
                  Courses
                </Link>
                <Link
                  href="/admin/users"
                  className={cn(
                    "text-gray-600 hover:text-blue-600 transition-colors",
                    isActive("/admin/users") && "text-blue-600 font-medium",
                  )}
                >
                  Users
                </Link>
                <Link
                  href="/admin/analytics"
                  className={cn(
                    "text-gray-600 hover:text-blue-600 transition-colors",
                    isActive("/admin/analytics") && "text-blue-600 font-medium",
                  )}
                >
                  Analytics
                </Link>
              </>
            )}

            {!userType && (
              <>
                <Link href="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Courses
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </>
            )}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!userType && (
              <>
                <Link href="/student/login">
                  <Button variant="outline">Student Login</Button>
                </Link>
                <Link href="/admin/login">
                  <Button>Admin Login</Button>
                </Link>
              </>
            )}

            {userType && (
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  Profile
                </Button>
                <Button variant="ghost" size="sm">
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {userType === "student" && (
                <>
                  <Link href="/student/dashboard" className="text-gray-600 hover:text-blue-600">
                    Dashboard
                  </Link>
                  <Link href="/student/courses" className="text-gray-600 hover:text-blue-600">
                    My Courses
                  </Link>
                  <Link href="/courses" className="text-gray-600 hover:text-blue-600">
                    Browse
                  </Link>
                </>
              )}

              {userType === "admin" && (
                <>
                  <Link href="/admin/dashboard" className="text-gray-600 hover:text-blue-600">
                    Dashboard
                  </Link>
                  <Link href="/admin/courses" className="text-gray-600 hover:text-blue-600">
                    Courses
                  </Link>
                  <Link href="/admin/users" className="text-gray-600 hover:text-blue-600">
                    Users
                  </Link>
                  <Link href="/admin/analytics" className="text-gray-600 hover:text-blue-600">
                    Analytics
                  </Link>
                </>
              )}

              {!userType && (
                <>
                  <Link href="/courses" className="text-gray-600 hover:text-blue-600">
                    Courses
                  </Link>
                  <Link href="/about" className="text-gray-600 hover:text-blue-600">
                    About
                  </Link>
                  <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                    Contact
                  </Link>
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Link href="/student/login">
                      <Button variant="outline" className="w-full bg-transparent">
                        Student Login
                      </Button>
                    </Link>
                    <Link href="/admin/login">
                      <Button className="w-full">Admin Login</Button>
                    </Link>
                  </div>
                </>
              )}

              {userType && (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    Profile
                  </Button>
                  <Button variant="ghost" size="sm">
                    Logout
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}