import { AboutSection } from "@/components/about-section"
import { AwardsSection } from "@/components/awards"
import { ContactSection } from "@/components/contact-section"
import { ExploreCourses } from "@/components/explore-courses"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NewCourses } from "@/components/new-courses"
import { Testimonials } from "@/components/testimonials"

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
