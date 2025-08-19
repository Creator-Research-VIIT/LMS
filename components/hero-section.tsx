import { Button } from "@/components/ui/button"
import { Award, BookOpen, Play, Users } from "lucide-react"

export function HeroSection() {
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
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white animate-pulse-glow">
                <Play className="mr-2 h-5 w-5" />
                Start Learning Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
              >
                Explore Courses
              </Button>
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