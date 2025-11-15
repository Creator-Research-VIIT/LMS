"use client"

import { Button } from "@/components/ui/button"
import { Award, BookOpen, Play, Users, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const router = useRouter()

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

  const handleStartLearning = () => {
    router.push('/courses')
  }
  return (
    <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Learn, Grow, and <span className="text-primary">Succeed</span> with Expert-Led Courses
            </h1>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              Join thousands of learners worldwide and unlock your potential with our comprehensive online courses
              taught by industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white animate-pulse-glow" onClick={handleStartLearning}>
                <Play className="mr-2 h-5 w-5" />
                Start Learning Today
              </Button>
              <div className="relative group">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent flex items-center gap-1"
                >
                  Explore Courses
                  <ChevronDown className="h-4 w-4" />
                </Button>
                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
            </div>
            <div className="flex items-center gap-8 mt-12">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <p className="font-semibold text-2xl text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full mb-2">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
                <p className="font-semibold text-2xl text-foreground">200+</p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-2">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <p className="font-semibold text-2xl text-foreground">95%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>
          <div className="animate-fade-in-up">
  <div className="relative">
    <div className="relative rounded-2xl shadow-2xl overflow-hidden">
      {/* Animated Image */}
      <img 
        src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg"
        alt="Online Learning"
        className="w-full h-80 object-cover rounded-2xl shadow-lg animate-float"
      />

      {/* Progress Badge */}
      <div className="absolute bottom-4 left-4 bg-purple-600 text-white p-4 rounded-lg shadow-lg">
        <div className="text-sm font-semibold">Course Progress</div>
        <div className="text-2xl font-bold">87%</div>
      </div>

      {/* Play Badge */}
      <div className="absolute top-5 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
        <Play className="h-6 w-6" />
      </div>
    </div>

    {/* Floating elements */}
    <div className="absolute top-1/4 -left-8 bg-blue-500 text-white p-3 rounded-lg shadow-lg animate-bounce">
      <div className="text-sm font-semibold">AI-Powered</div>
    </div>

    <div className="absolute bottom-1/4 -right-8 bg-orange-500 text-white p-3 rounded-lg shadow-lg animate-pulse">
      <div className="text-sm font-semibold">Certificate</div>
    </div>
  </div>
</div>

        </div>
      </div>
    </section>
  )
}