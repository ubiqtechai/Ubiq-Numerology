import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

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
    <header className="fixed top-0 w-full z-50 glassmorphic border-b border-gold/20">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-saffron to-gold flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <span className="text-xl font-bold text-cosmic-indigo">UBIQ Numerology</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('ask-daffy')} 
            className="hover:text-saffron transition-colors cursor-pointer"
          >
            Ask Daffy
          </button>
          <button 
            onClick={() => scrollToSection('calculators')} 
            className="hover:text-saffron transition-colors cursor-pointer"
          >
            Calculators
          </button>
          <button 
            onClick={() => scrollToSection('courses')} 
            className="hover:text-saffron transition-colors cursor-pointer"
          >
            Courses
          </button>
          <button 
            onClick={() => scrollToSection('workshops')} 
            className="hover:text-saffron transition-colors cursor-pointer"
          >
            Workshops
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="hover:text-saffron transition-colors cursor-pointer"
          >
            About
          </button>
        </div>

        {/* Language Selector */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-gold/30 rounded-full px-3 py-1 text-sm focus:outline-none focus:border-gold cursor-pointer"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
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
  );
};

export default Header;