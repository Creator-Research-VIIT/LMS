"use client"

import type React from "react"

import { useState } from "react"
import { AnimatedInput } from "@/components/animated-input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-secondary flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-2xl shadow-2xl p-8 animate-fade-in text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-2xl font-serif font-bold text-card-foreground mb-4">Check Your Email</h1>

          <p className="text-muted-foreground mb-8">
            We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the
            instructions.
          </p>

          <Link href="/login">
            <Button className="w-full mb-4">Back to Sign In</Button>
          </Link>

          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or{" "}
            <button onClick={() => setIsSubmitted(false)} className="text-primary hover:text-primary/80 font-medium">
              try again
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-secondary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-2xl p-8 animate-slide-up">
        <Link
          href="/login"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sign In
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-card-foreground mb-2">Forgot Password?</h1>
          <p className="text-muted-foreground">No worries! Enter your email and we'll send you a reset link.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatedInput label="Email Address" type="email" value={email} onChange={setEmail} required />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-lg font-medium bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
