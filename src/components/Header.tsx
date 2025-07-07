import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <>
      {/* Top Header with Logo */}
      <header className="fixed top-0 w-full z-50 glassmorphic border-b border-gold/20">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-saffron to-gold flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-cosmic-indigo">UBIQ Numerology</span>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden cursor-pointer hover:scale-110 transition-transform"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glassmorphic border-t border-gold/20">
            <div className="container mx-auto px-6 py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('ask-daffy')} 
                className="block w-full text-left hover:text-saffron transition-colors cursor-pointer py-2"
              >
                Ask Daffy
              </button>
              <button 
                onClick={() => scrollToSection('calculators')} 
                className="block w-full text-left hover:text-saffron transition-colors cursor-pointer py-2"
              >
                Calculators
              </button>
              <button 
                onClick={() => scrollToSection('courses')} 
                className="block w-full text-left hover:text-saffron transition-colors cursor-pointer py-2"
              >
                Courses
              </button>
              <button 
                onClick={() => scrollToSection('workshops')} 
                className="block w-full text-left hover:text-saffron transition-colors cursor-pointer py-2"
              >
                Workshops
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-left hover:text-saffron transition-colors cursor-pointer py-2"
              >
                About
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 glassmorphic border-t border-gold/20 bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-6 py-3">
          <div className="hidden md:flex items-center justify-center space-x-12">
            <button 
              onClick={() => scrollToSection('ask-daffy')} 
              className="text-cosmic-indigo hover:text-saffron transition-colors cursor-pointer py-2 px-4 rounded-lg hover:bg-saffron/10"
            >
              Ask Daffy
            </button>
            <button 
              onClick={() => scrollToSection('calculators')} 
              className="text-cosmic-indigo hover:text-saffron transition-colors cursor-pointer py-2 px-4 rounded-lg hover:bg-saffron/10"
            >
              Calculators
            </button>
            <button 
              onClick={() => scrollToSection('courses')} 
              className="text-cosmic-indigo hover:text-saffron transition-colors cursor-pointer py-2 px-4 rounded-lg hover:bg-saffron/10"
            >
              Courses
            </button>
            <button 
              onClick={() => scrollToSection('workshops')} 
              className="text-cosmic-indigo hover:text-saffron transition-colors cursor-pointer py-2 px-4 rounded-lg hover:bg-saffron/10"
            >
              Workshops
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-cosmic-indigo hover:text-saffron transition-colors cursor-pointer py-2 px-4 rounded-lg hover:bg-saffron/10"
            >
              About
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;