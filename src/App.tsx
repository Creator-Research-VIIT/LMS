import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CareerPaths from './components/CareerPaths';
import SkillsSection from './components/SkillsSection';
import AwardsSection from './components/AwardsSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <CareerPaths />
      <SkillsSection />
      <AwardsSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}

export default App;