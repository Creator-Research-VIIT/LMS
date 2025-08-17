import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, TrendingUp, Camera, Music, Globe, Cpu, Heart } from "lucide-react"

const categories = [
  {
    icon: Code,
    title: "Programming",
    courses: 45,
    color: "bg-blue-500",
    description: "Web development, mobile apps, and software engineering",
  },
  {
    icon: Palette,
    title: "Design",
    courses: 32,
    color: "bg-purple-500",
    description: "UI/UX, graphic design, and creative arts",
  },
  {
    icon: TrendingUp,
    title: "Business",
    courses: 28,
    color: "bg-green-500",
    description: "Marketing, entrepreneurship, and management",
  },
  {
    icon: Camera,
    title: "Photography",
    courses: 18,
    color: "bg-pink-500",
    description: "Digital photography and photo editing",
  },
  {
    icon: Music,
    title: "Music",
    courses: 22,
    color: "bg-yellow-500",
    description: "Music production and instrument lessons",
  },
  {
    icon: Globe,
    title: "Languages",
    courses: 35,
    color: "bg-indigo-500",
    description: "Learn new languages and improve communication",
  },
  {
    icon: Cpu,
    title: "Technology",
    courses: 41,
    color: "bg-red-500",
    description: "AI, machine learning, and emerging tech",
  },
  {
    icon: Heart,
    title: "Health & Fitness",
    courses: 15,
    color: "bg-orange-500",
    description: "Wellness, nutrition, and fitness training",
  },
]

export function ExploreCourses() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Explore More Courses</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive catalog of courses across various categories and find your passion
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.title}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in-up border-0 shadow-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${category.color} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
                  <p className="text-primary font-medium">{category.courses} courses available</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
