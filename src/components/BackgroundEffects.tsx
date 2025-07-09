import React, { useState } from 'react';
import CircularNumbers from './CircularNumbers';
import { Globe } from 'lucide-react';

const BackgroundEffects = () => {
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'hindi' : 'english');
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      

      {/* Animated Yantras and Sacred Geometry */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-15">
        <div className="w-full h-full border-2 border-saffron rounded-full animate-spin-slow"></div>
        <div className="absolute inset-4 border border-gold rounded-full animate-spin-reverse"></div>
        <div className="absolute inset-8 w-16 h-16 border border-lotus-pink transform rotate-45"></div>
      </div>

      <div className="absolute top-1/3 right-20 w-24 h-24 opacity-15">
        <div className="w-full h-full border-2 border-gold animate-pulse">
          <div className="absolute inset-2 border border-saffron transform rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 border border-lotus-pink rounded-full"></div>
        </div>
      </div>

      <div className="absolute bottom-1/4 left-1/4 w-28 h-28 opacity-15">
        <div className="w-full h-full border border-saffron rounded-full animate-spin-slow"></div>
        <div className="absolute inset-2 border border-gold transform rotate-12 animate-pulse"></div>
        <div className="absolute inset-6 border border-lotus-pink transform -rotate-12"></div>
      </div>

      {/* Circular Number Visualization with Language Support */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40">
        <CircularNumbers language={language} />
      </div>

      {/* Constellation Dots */}
      <div className="absolute top-1/5 left-1/2 w-2 h-2 bg-gold/20 rounded-full animate-pulse"></div>
      <div className="absolute top-2/5 left-1/4 w-1 h-1 bg-saffron/30 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-1/5 right-1/4 w-2 h-2 bg-lotus-pink/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-3/5 right-1/6 w-1 h-1 bg-gold/25 rounded-full animate-pulse delay-700"></div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/3 left-1/5 w-64 h-64 bg-gradient-to-r from-saffron/5 to-gold/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-lotus-pink/5 to-saffron/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-cosmic-indigo/5 to-gold/5 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
  );
};

export default BackgroundEffects;