"use client";

import { AboutSection } from "@/components/about-section";
import { AwardsSection } from "@/components/awards";
import { ContactSection } from "@/components/contact-section";
import { ExploreCourses } from "@/components/explore-courses";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { NewCourses } from "@/components/new-courses";
import { Testimonials } from "@/components/testimonials";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (session?.user) {
      const role = (session.user as any).role;
      console.log('🏠 Home page - authenticated user with role:', role);
      
      // Redirect authenticated users to their dashboard
      if (role === "ADMIN") {
        console.log('🔄 Redirecting to admin dashboard');
        router.replace("/admin");
      } else if (role === "TEACHER") {
        console.log('🔄 Redirecting to teacher dashboard');
        router.replace("/teacher");
      } else if (role === "STUDENT") {
        console.log('🔄 Redirecting to student dashboard');
        router.replace("/student");
      } else {
        console.log('⚠️ No role found for authenticated user');
      }
    }
  }, [session, status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, show loading while redirecting
  if (session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Role: {(session.user as any).role || 'Unknown'}</p>
        </div>
      </div>
    );
  }

  // Show marketing landing page for unauthenticated users
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
