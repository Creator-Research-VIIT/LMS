"use client"

import { useAuth } from "./components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/student/dashboard")
    }
  }, [user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-secondary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-2xl p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-card-foreground mb-2">EduLearn</h1>
          <p className="text-muted-foreground">Your gateway to knowledge and growth</p>
        </div>

        <div className="space-y-4">
          <Link href="/login" className="block">
            <Button className="w-full py-3 text-lg font-medium bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
              Sign In
            </Button>
          </Link>

          <Link href="/signup" className="block">
            <Button
              variant="outline"
              className="w-full py-3 text-lg font-medium border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
            >
              Create Account
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">Demo credentials: student@example.com / password</p>
        </div>
      </div>
    </div>
  )
}
