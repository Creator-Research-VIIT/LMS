import React, { useState } from 'react';
import { Star, Users, Clock } from 'lucide-react';

const categories = [
  'Web Development',
  'Data Science',
  'Mobile Development',
  'Design',
  'Marketing',
  'Business',
  'IT & Software',
  'Photography'
];

const courses = [
  {
    title: 'The Complete Web Developer Course 2024',
    instructor: 'John Smith',
    rating: 4.8,
    students: '45,230',
    duration: '42 hours',
    price: '$89',
    originalPrice: '$199',
    image: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg',
    bestseller: true
  },
  {
    title: 'Python for Data Science and Machine Learning',
    instructor: 'Sarah Johnson',
    rating: 4.9,
    students: '38,750',
    duration: '35 hours',
    price: '$94',
    originalPrice: '$179',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg',
    bestseller: true
  },
  {
    title: 'UI/UX Design Complete Course',
    instructor: 'Mike Davis',
    rating: 4.7,
    students: '22,140',
    duration: '28 hours',
    price: '$79',
    originalPrice: '$149',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    bestseller: false
  },
  {
    title: 'Digital Marketing Masterclass',
    instructor: 'Emma Wilson',
    rating: 4.8,
    students: '51,360',
    duration: '38 hours',
    price: '$84',
    originalPrice: '$169',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
    bestseller: true
  }
];

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Web Development');

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            All the skills you need in one place
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From critical skills to technical topics, LearnHub supports your professional development.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {course.bestseller && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded">
                    Bestseller
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{course.instructor}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <span className="text-orange-500 font-bold text-sm mr-1">{course.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(course.rating) ? 'text-orange-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs">({course.students})</span>
                </div>

                <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">{course.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200">
            Show all courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;