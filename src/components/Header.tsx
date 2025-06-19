import React, { useState } from 'react';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 glassmorphic border-b border-gold/20">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-saffron to-gold flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <span className="text-xl font-bold text-cosmic-indigo">UBIQ Numerology</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#ask-daffy" className="hover:text-saffron transition-colors">Ask Daffy</a>
          <a href="#calculators" className="hover:text-saffron transition-colors">Calculators</a>
          <a href="#courses" className="hover:text-saffron transition-colors">Courses</a>
          <a href="#workshops" className="hover:text-saffron transition-colors">Workshops</a>
          <a href="#about" className="hover:text-saffron transition-colors">About</a>
        </div>

        {/* Language Selector */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-gold/30 rounded-full px-3 py-1 text-sm focus:outline-none focus:border-gold"
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
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glassmorphic border-t border-gold/20">
          <div className="container mx-auto px-6 py-4 space-y-4">
            <a href="#ask-daffy" className="block hover:text-saffron transition-colors">Ask Daffy</a>
            <a href="#calculators" className="block hover:text-saffron transition-colors">Calculators</a>
            <a href="#courses" className="block hover:text-saffron transition-colors">Courses</a>
            <a href="#workshops" className="block hover:text-saffron transition-colors">Workshops</a>
            <a href="#about" className="block hover:text-saffron transition-colors">About</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;