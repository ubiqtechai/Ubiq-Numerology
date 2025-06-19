import React from 'react';
import { BookOpen, Clock, Star, Award, Play } from 'lucide-react';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'Life Path 101 – Discover Your Dharma',
      description: 'Foundational course exploring your life purpose through sacred numerology',
      duration: '6 weeks',
      level: 'Beginner',
      rating: 4.9,
      students: 2847,
      price: '$89',
      image: 'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=400',
      lessons: 24,
      certificate: true
    },
    {
      id: 2,
      title: 'Numerology & Relationships – Karmic Connections',
      description: 'Understand compatibility and karmic bonds through numerical analysis',
      duration: '4 weeks',
      level: 'Intermediate',
      rating: 4.8,
      students: 1653,
      price: '$127',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      lessons: 18,
      certificate: true
    },
    {
      id: 3,
      title: 'Personal Year Cycles – Timing Your Destiny',
      description: 'Master the art of timing with personal year, month, and day cycles',
      duration: '5 weeks',
      level: 'Intermediate',
      rating: 4.9,
      students: 1289,
      price: '$156',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      lessons: 20,
      certificate: true
    },
    {
      id: 4,
      title: 'Advanced Vibrational Codes – Mastery & Intuition',
      description: 'Deep dive into master numbers, karmic debt, and spiritual codes',
      duration: '8 weeks',
      level: 'Advanced',
      rating: 5.0,
      students: 847,
      price: '$247',
      image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400',
      lessons: 32,
      certificate: true
    }
  ];

  return (
    <section id="courses" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-cosmic-indigo mb-6">
            Learn the Sacred Science of Numbers
          </h2>
          <p className="text-lg text-cosmic-indigo/70 max-w-2xl mx-auto">
            Transform your understanding with comprehensive courses designed by master numerologists
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {courses.map((course) => (
            <div key={course.id} className="glassmorphic rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group scale-90">
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-indigo/60 to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-to-r from-saffron to-gold text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {course.level}
                  </span>
                </div>
                <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </button>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-cosmic-indigo mb-2">{course.title}</h3>
                <p className="text-cosmic-indigo/70 mb-3 text-sm">{course.description}</p>

                <div className="flex items-center gap-3 mb-3 text-xs text-cosmic-indigo/60">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {course.lessons} lessons
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-gold fill-current" />
                    {course.rating}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-saffron">{course.price}</span>
                  <span className="text-xs text-cosmic-indigo/60">{course.students} students</span>
                </div>

                {/* Progress Chakra Wheel */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-saffron to-gold flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-xs text-cosmic-indigo/70">Progress Tracking</span>
                  </div>
                  {course.certificate && (
                    <div className="flex items-center gap-1 text-xs text-cosmic-indigo/70">
                      <Award className="w-3 h-3" />
                      Certificate
                    </div>
                  )}
                </div>

                <button className="w-full bg-gradient-to-r from-saffron to-gold text-white py-2 rounded-full font-semibold hover:shadow-xl transition-all text-sm">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;