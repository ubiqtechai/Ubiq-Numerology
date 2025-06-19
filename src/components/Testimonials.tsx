import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glassmorphic rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 relative group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <Quote className="w-8 h-8 text-saffron" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-cosmic-indigo/80 mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Numbers */}
              <div className="bg-white/10 rounded-lg p-3 mb-6">
                <p className="text-sm text-saffron font-semibold">Sacred Numbers:</p>
                <p className="text-sm text-cosmic-indigo/70">{testimonial.numbers}</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {/* Mandala Frame */}
                  <div className="absolute inset-0 rounded-full border-2 border-gold/30"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-cosmic-indigo">{testimonial.name}</h4>
                  <p className="text-sm text-cosmic-indigo/60">{testimonial.location}</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-30 transition-opacity">
                <div className="w-16 h-16 border border-saffron/20 rounded-full"></div>
              </div>
            </div>
          ))}
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
            <button className="bg-gradient-to-r from-saffron to-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all">
              Start Your Reading Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;