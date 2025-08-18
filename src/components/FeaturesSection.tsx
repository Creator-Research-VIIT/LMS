import React from 'react';
import { BookOpen, Target, TrendingUp, Users, Clock, AlignCenterVertical as Certificate } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: "Hands-on Learning",
    description: "Learn by doing with interactive exercises, coding challenges, and real-world projects that build practical skills."
  },
  {
    icon: Target,
    title: "Personalized Path",
    description: "AI-powered recommendations create a learning journey tailored to your goals, experience level, and interests."
  },
  {
    icon: Certificate,
    title: "Industry Certifications",
    description: "Earn certificates recognized by top employers and advance your career with credentials that matter."
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry professionals and thought leaders who bring real-world experience to every lesson."
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Study at your own pace with lifetime access to courses and the ability to learn anywhere, anytime."
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Track your progress, build your portfolio, and connect with opportunities that accelerate your career."
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Learning focused on your goals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience a learning platform designed to help you achieve your professional objectives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                  <Icon className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center mt-16">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to start your learning journey?
          </h3>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join millions of learners who are advancing their careers with our expert-led courses
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-purple-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg">
            Explore Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;