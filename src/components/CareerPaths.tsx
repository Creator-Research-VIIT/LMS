import React from 'react';
import { Code, TrendingUp, BarChart3, Palette, Shield, Database } from 'lucide-react';

const careerPaths = [
  {
    title: 'Full Stack Developer',
    description: 'Master both front-end and back-end development',
    icon: Code,
    color: 'from-orange-400 to-red-500',
    students: '2.5M+ students'
  },
  {
    title: 'Digital Marketer',
    description: 'Learn modern marketing strategies and analytics',
    icon: TrendingUp,
    color: 'from-purple-400 to-pink-500',
    students: '1.8M+ students'
  },
  {
    title: 'Data Scientist',
    description: 'Analyze data and build predictive models',
    icon: BarChart3,
    color: 'from-blue-400 to-cyan-500',
    students: '3.2M+ students'
  },
  {
    title: 'UX/UI Designer',
    description: 'Create beautiful and functional user experiences',
    icon: Palette,
    color: 'from-green-400 to-blue-500',
    students: '1.4M+ students'
  },
  {
    title: 'Cybersecurity Expert',
    description: 'Protect systems and data from digital threats',
    icon: Shield,
    color: 'from-red-400 to-orange-500',
    students: '950K+ students'
  },
  {
    title: 'Cloud Architect',
    description: 'Design and implement cloud infrastructure',
    icon: Database,
    color: 'from-indigo-400 to-purple-500',
    students: '1.1M+ students'
  }
];

const CareerPaths: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Ready to advance your career?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the skills and real-world experience employers want with our Career Accelerators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careerPaths.map((path, index) => {
            const Icon = path.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-90`}></div>
                <div className="relative p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <Icon className="h-12 w-12" />
                    <div className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {path.students}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{path.title}</h3>
                  <p className="text-lg opacity-90 mb-6">{path.description}</p>
                  
                  <button className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 group-hover:shadow-lg">
                    Explore Path
                  </button>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerPaths;