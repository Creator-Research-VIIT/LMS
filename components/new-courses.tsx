import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"

const newCourses = [
  {
    id: 1,
    title: "Advanced React Development",
    instructor: "Sarah Johnson",
    image: "/react-course-thumbnail.png",
    duration: "12 weeks",
    students: 1250,
    rating: 4.9,
    price: "$99",
    badge: "New",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Michael Chen",
    image: "/ml-course-thumbnail.png",
    duration: "16 weeks",
    students: 890,
    rating: 4.8,
    price: "$149",
    badge: "Popular",
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    instructor: "Emma Rodriguez",
    image: "/digital-marketing-course-thumbnail.png",
    duration: "8 weeks",
    students: 2100,
    rating: 4.7,
    price: "$79",
    badge: "Trending",
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    instructor: "Alex Thompson",
    image: "/placeholder-zogft.png",
    duration: "10 weeks",
    students: 1680,
    rating: 4.9,
    price: "$119",
    badge: "New",
  },
]

export function NewCourses() {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">All the Skills you need in one Place </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our latest courses designed by industry experts to help you stay ahead in your career
          </p>
        </div>

      <div className="overflow-hidden relative">
  <div className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6">
    {newCourses.map((course, index) => (
      <Card
        key={course.id}
        className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] 
                   group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 
                   animate-fade-in-up border-0 shadow-md snap-center"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-2xl">
            <img
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <Badge
              className={`absolute top-3 left-3 ${
                course.badge === "New"
                  ? "bg-accent text-accent-foreground"
                  : course.badge === "Popular"
                  ? "bg-secondary text-white"
                  : "bg-primary text-white"
              }`}
            >
              {course.badge}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-muted-foreground mb-4">by {course.instructor}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {course.students}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-accent fill-current mr-1" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <span className="font-heading font-bold text-lg text-primary">
              {course.price}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white">
            View Details
          </Button>
        </CardFooter>
      </Card>
    ))}
  </div>
</div>


        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  )
}
