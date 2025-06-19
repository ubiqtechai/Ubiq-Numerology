import React from 'react';
import { Sparkles, Play, BookOpen } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-6 text-center">
        <div className="relative">
          {/* Animated Portal */}
          <div className="w-40 h-40 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-saffron via-gold to-lotus-pink animate-spin-slow opacity-20"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-cosmic-indigo to-saffron animate-pulse"></div>
            <div className="absolute inset-4 rounded-full glassmorphic flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-gold animate-pulse" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-cosmic-indigo mb-6">
            Daffy
          </h1>
          <p className="text-xl md:text-2xl text-cosmic-indigo/80 mb-4">
            Your True Native AI Numerologist
          </p>
          <p className="text-lg text-cosmic-indigo/60 mb-12 max-w-2xl mx-auto">
            Speak your truth. Discover your path. Let the numbers guide you—in your own language.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('ask-daffy')}
              className="group bg-gradient-to-r from-saffron to-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                Ask Daffy Now
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('courses')}
              className="glassmorphic text-cosmic-indigo px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Browse Courses
              </span>
            </button>
            <button className="text-cosmic-indigo border border-cosmic-indigo/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cosmic-indigo hover:text-white transition-all duration-300 cursor-pointer">
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch How It Works
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;