import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NewCourses } from "@/components/new-courses"
import { ExploreCourses } from "@/components/explore-courses"
import { AboutSection } from "@/components/about-section"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AwardsSection } from "@/components/awards"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <NewCourses />
        <ExploreCourses />
        <AwardsSection />
        <AboutSection />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
