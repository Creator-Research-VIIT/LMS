"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Menu, Search, X, User, LogOut } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const courseCategories = [
    { label: "Learn AI", href: "/courses?category=ai" },
    { label: "Launch a new career", href: "/courses?category=career" },
    { label: "Prepare for a certification", href: "/courses?category=certification" },
    { label: "Practice with Role Play", href: "/courses?category=roleplay" },
    { label: "Development", href: "/courses?category=development" },
    { label: "Business", href: "/courses?category=business" },
    { label: "Finance & Accounting", href: "/courses?category=finance" },
    { label: "IT & Software", href: "/courses?category=it" },
    { label: "Office Productivity", href: "/courses?category=office" },
    { label: "Personal Development", href: "/courses?category=personal" },
    { label: "Design", href: "/courses?category=design" },
    { label: "Marketing", href: "/courses?category=marketing" },
    { label: "Lifestyle", href: "/courses?category=lifestyle" },
    { label: "Photography & Video", href: "/courses?category=photography" },
    { label: "Health & Fitness", href: "/courses?category=health" },
    { label: "Music", href: "/courses?category=music" },
    { label: "Teaching & Academics", href: "/courses?category=teaching" }
  ];
  
const router = useRouter();
const [searchQuery, setSearchQuery] = useState("")
const { data: session, status } = useSession()

  const handleClick = () => {
    router.push("/login"); // navigates to /login
  };

  const handlesign = () => {
    // alert("hello")
    router.push("/signup");
  }

  const handleDashboard = () => {
    const role = (session?.user as any)?.role;
    if (role === 'ADMIN') {
      router.push('/admin');
    } else if (role === 'TEACHER') {
      router.push('/teacher');
    } else if (role === 'STUDENT') {
      router.push('/student');
    } else if ((session?.user as any)?.instituteId) {
      router.push('/institute');
    }
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/courses');
    }
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer flex-shrink-0" onClick={() => router.push('/')}>
            <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-sm">
              <Image 
                src="/creator-research-logo.svg" 
                alt="Creator Research Logo" 
                width={50} 
                height={50}
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-heading font-bold text-lg text-primary leading-tight">SkillUP!!</span>
              <span className="text-xs text-gray-500 font-medium">Creator Research</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 flex-1 px-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors font-medium text-sm whitespace-nowrap">
              Home
            </a>
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1 py-2 text-sm">
                Explore
                <ChevronDown className="h-4 w-4" />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-3">
                    <div className="text-sm font-semibold text-gray-700 mb-3">Explore by Goal</div>
                    {courseCategories.slice(0, 4).map((cat) => (
                      <a
                        key={cat.label}
                        href={cat.href}
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary rounded transition-colors"
                      >
                        {cat.label}
                      </a>
                    ))}
                    <div className="border-t my-3"></div>
                    <div className="grid grid-cols-2 gap-1">
                      {courseCategories.slice(4).map((cat) => (
                        <a
                          key={cat.label}
                          href={cat.href}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary rounded transition-colors"
                        >
                          {cat.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a href="/courses" className="text-foreground hover:text-primary transition-colors font-medium text-sm whitespace-nowrap">
              All Courses
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium text-sm whitespace-nowrap">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium text-sm whitespace-nowrap">
              Contact
            </a>
            <a href="/charity" className="text-foreground hover:text-primary transition-colors font-medium text-sm whitespace-nowrap px-3 py-1 rounded-md hover:bg-blue-50">
              Charity
            </a>
          </nav>

          {/* Search Bar */}
         <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
  <form onSubmit={handleSearch} className="relative w-full">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
    <Input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search courses..."
      className="pl-10 bg-muted/50 border-0 focus:bg-white transition-colors rounded-full"
    />
  </form>
</div>


          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {status === "loading" ? (
              <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-[150px] truncate">{session.user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">{session.user.name}</span>
                      <span className="text-xs text-gray-500">{session.user.email}</span>
                      <span className="text-xs text-blue-600 mt-1">
                        {(session.user as any).role}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDashboard}>
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => handleClick()}>
                  Login
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => handlesign()}>Sign Up</Button>
              </>
            )}
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
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..." 
                  className="pl-10" 
                />
              </form>
              <nav className="flex flex-col space-y-2">
                <a href="/" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Home
                </a>
                <details className="py-2">
                  <summary className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer flex items-center gap-1">
                    Explore
                    <ChevronDown className="h-4 w-4" />
                  </summary>
                  <div className="mt-2 ml-4 flex flex-col space-y-1 border-l-2 border-gray-200 pl-3">
                    {courseCategories.map((cat) => (
                      <a
                        key={cat.label}
                        href={cat.href}
                        className="text-sm text-gray-700 hover:text-primary transition-colors"
                      >
                        {cat.label}
                      </a>
                    ))}
                  </div>
                </details>
                <a href="/courses" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  All Courses
                </a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  About
                </a>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Contact
                </a>
                <a href="/charity" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                  Charity
                </a>
              </nav>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {status === "loading" ? (
                  <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                ) : session?.user ? (
                  <>
                    <div className="px-3 py-2 border-b">
                      <div className="font-semibold text-sm">{session.user.name}</div>
                      <div className="text-xs text-gray-500">{session.user.email}</div>
                      <div className="text-xs text-blue-600 mt-1">{(session.user as any).role}</div>
                    </div>
                    <Button variant="ghost" className="justify-start" onClick={handleDashboard}>
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                    <Button variant="ghost" className="justify-start text-red-600" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="justify-start" onClick={() => handleClick()}>
                      Login
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => handlesign()}>Sign Up</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
