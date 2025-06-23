import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, India",
      rating: 5,
      text: "Daffy revealed patterns in my life I never noticed. The accuracy was incredible - it felt like speaking to an ancient sage who truly understood my soul's journey.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150",
      numbers: "Life Path 7, Soul Urge 3"
    },
    {
      id: 2,
      name: "Ahmed Al-Rashid",
      location: "Dubai, UAE",
      rating: 5,
      text: "I was skeptical about AI numerology, but Daffy's insights in Arabic were profound. The guidance about my business timing was spot-on - I made my best investment decision based on the lucky day calculation.",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150",
      numbers: "Expression 8, Karmic Debt 14"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      location: "London, UK",
      rating: 5,
      text: "Finding my baby's perfect name was so important to me. Daffy calculated multiple options and explained the vibrational impact of each. My daughter's name now carries such beautiful energy!",
      image: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=150",
      numbers: "Psychic Number 6, Birthday 22"
    },
    {
      id: 4,
      name: "Rajesh Patel",
      location: "Chennai, India",
      rating: 5,
      text: "The master number 11 workshop recommendations changed my meditation practice completely. Daffy understood my spiritual aspirations and guided me toward deeper awakening.",
      image: "https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=150",
      numbers: "Master Number 11, Life Path 2"
    },
    {
      id: 5,
      name: "Maria Rodriguez",
      location: "Barcelona, Spain",
      rating: 5,
      text: "I kept seeing 333 everywhere and felt lost about its meaning. Daffy not only explained the significance but also gave me practical steps to align with this powerful message. Life-changing!",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150",
      numbers: "Personal Year 3, Soul Urge 9"
    },
    {
      id: 6,
      name: "Dr. Anita Krishnan",
      location: "Bangalore, India",
      rating: 5,
      text: "As a psychologist, I was curious about numerology's accuracy. Daffy's analysis of my karmic patterns aligned perfectly with my healing journey. The remedies suggested were both practical and deeply spiritual.",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150",
      numbers: "Karmic Debt 19, Expression 5"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentSlide];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cosmic-indigo mb-6">
            Voices from Our Sacred Community
          </h2>
          <p className="text-xl text-cosmic-indigo/70 max-w-3xl mx-auto">
            Real stories from souls who found their path through Daffy's guidance
          </p>
        </div>

        {/* Single Column Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="glassmorphic rounded-3xl p-12 hover:shadow-2xl transition-all duration-500 relative group min-h-[400px] flex flex-col justify-center">
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <Quote className="w-16 h-16 text-saffron" />
              </div>

              {/* Enhanced Dotted Elements */}
              <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-3xl border-4 border-dotted border-saffron/20 pointer-events-none"></div>
              <div className="absolute top-4 left-4 w-4 h-4 bg-saffron/40 rounded-full animate-pulse"></div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-gold/40 rounded-full animate-pulse delay-200"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-lotus-pink/40 rounded-full animate-pulse delay-400"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 bg-saffron/40 rounded-full animate-pulse delay-600"></div>

              {/* Rating Stars */}
              <div className="flex justify-center gap-2 mb-8">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-gold fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl text-cosmic-indigo/80 mb-8 leading-relaxed text-center max-w-3xl mx-auto">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Numbers */}
              <div className="bg-white/15 rounded-2xl p-6 mb-8 max-w-md mx-auto">
                <p className="text-lg text-saffron font-semibold text-center mb-2">Sacred Numbers:</p>
                <p className="text-cosmic-indigo/70 text-center">{currentTestimonial.numbers}</p>
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-6">
                <div className="relative">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  {/* Enhanced Mandala Frame */}
                  <div className="absolute inset-0 rounded-full border-4 border-gold/40"></div>
                  <div className="absolute -inset-2 rounded-full border-2 border-dotted border-saffron/30"></div>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-cosmic-indigo">{currentTestimonial.name}</h4>
                  <p className="text-cosmic-indigo/60 text-lg">{currentTestimonial.location}</p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-saffron to-gold text-white rounded-full flex items-center justify-center hover:shadow-xl transition-all hover:scale-110 cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-saffron to-gold text-white rounded-full flex items-center justify-center hover:shadow-xl transition-all hover:scale-110 cursor-pointer z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all cursor-pointer ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-saffron to-gold shadow-lg scale-125'
                    : 'bg-cosmic-indigo/30 hover:bg-cosmic-indigo/50'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="h-2 bg-cosmic-indigo/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-saffron to-gold transition-all duration-500 rounded-full"
                style={{ width: `${((currentSlide + 1) / testimonials.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-center text-cosmic-indigo/60 text-sm mt-2">
              {currentSlide + 1} of {testimonials.length}
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glassmorphic rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-cosmic-indigo mb-4">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-cosmic-indigo/70 mb-6">
              Join thousands who have discovered their true path through the wisdom of numbers
            </p>
            <button className="bg-gradient-to-r from-saffron to-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all cursor-pointer hover:scale-105 transform">
              Start Your Reading Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;