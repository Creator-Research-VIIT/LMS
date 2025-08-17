"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, BookOpen } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-primary">EduPlatform</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="#courses" className="text-foreground hover:text-primary transition-colors font-medium">
              Courses
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Search Bar */}
         <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
  <div className="relative w-full">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
    <Input
      placeholder="Search courses..."
      className="pl-10 bg-muted/50 border-0 focus:bg-white transition-colors rounded-full"
    />
  </div>
</div>


          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Login
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white">Sign Up</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search courses..." className="pl-10" />
              </div>
              <nav className="flex flex-col space-y-2">
                <a href="#" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Home
                </a>
                <a href="#courses" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Courses
                </a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  About
                </a>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Contact
                </a>
              </nav>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="ghost" className="justify-start">
                  Login
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-white">Sign Up</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
