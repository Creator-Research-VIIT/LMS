"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../components/auth-context"
import { useRouter } from "next/navigation"
import { AnimatedInput } from "../components/animated-input"
import { LoadingSpinner } from "../components/loading-spinner"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password)
    if (success) {
      router.push("/student/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-secondary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-2xl p-8 animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-card-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue your learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatedInput label="Email Address" type="email" value={email} onChange={setEmail} required />

          <AnimatedInput label="Password" type="password" value={password} onChange={setPassword} required />

          {error && (
            <div className="text-destructive text-sm text-center bg-destructive/10 p-3 rounded-lg">{error}</div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-lg font-medium bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? <LoadingSpinner /> : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/student/forgot-password"
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
          >
            Forgot your password?
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Don't have an account?{" "}
            <Link
              href="/student/signup"
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
