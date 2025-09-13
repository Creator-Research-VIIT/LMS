"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedInputProps {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  className?: string
}

export function AnimatedInput({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  className,
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={cn("relative", className)}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className={cn(
          "w-full px-4 py-3 bg-input border border-border rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          "transition-all duration-300 ease-in-out",
          "placeholder-transparent peer",
          isFocused || value ? "pt-6 pb-2" : "",
        )}
        placeholder={label}
      />
      <label
        className={cn(
          "absolute left-4 text-muted-foreground transition-all duration-300 ease-in-out pointer-events-none",
          isFocused || value ? "top-2 text-xs text-primary font-medium" : "top-3 text-base",
        )}
      >
        {label}
      </label>
    </div>
  )
}
