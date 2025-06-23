import React from 'react';
import BilingualClock from './BilingualClock';
import { ArrowLeft, Clock, Globe } from 'lucide-react';

const ClockPage = () => {
  return (
    <div className="min-h-screen bg-ashram-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
          <div className="w-full h-full border-2 border-saffron rounded-full animate-spin-slow"></div>
          <div className="absolute inset-4 border border-gold rounded-full animate-spin-reverse"></div>
        </div>
        <div className="absolute bottom-20 right-20 w-24 h-24 opacity-10">
          <div className="w-full h-full border border-gold animate-pulse"></div>
        </div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-saffron/5 to-gold/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-lotus-pink/5 to-saffron/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => window.history.back()}
              className="glassmorphic p-3 rounded-full hover:bg-white/20 transition-all border border-gold/20"
            >
              <ArrowLeft className="w-6 h-6 text-cosmic-indigo" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-cosmic-indigo">
                Bilingual Clock Display
              </h1>
              <p className="text-cosmic-indigo/70 mt-2">
                Experience time in English and Hindi numerals
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="glassmorphic rounded-xl p-6 text-center border border-gold/20 bg-white/10 backdrop-blur-md">
                <div className="w-12 h-12 bg-gradient-to-r from-saffron to-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-cosmic-indigo mb-2">Real-Time Display</h3>
                <p className="text-cosmic-indigo/70 text-sm">Live analog and digital time with smooth second hand movement</p>
              </div>

              <div className="glassmorphic rounded-xl p-6 text-center border border-gold/20 bg-white/10 backdrop-blur-md">
                <div className="w-12 h-12 bg-gradient-to-r from-gold to-lotus-pink rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-cosmic-indigo mb-2">Bilingual Support</h3>
                <p className="text-cosmic-indigo/70 text-sm">Instant switching between English (1-12) and Hindi (१-१२) numerals</p>
              </div>

              <div className="glassmorphic rounded-xl p-6 text-center border border-gold/20 bg-white/10 backdrop-blur-md">
                <div className="w-12 h-12 bg-gradient-to-r from-lotus-pink to-saffron rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <h3 className="font-bold text-cosmic-indigo mb-2">Beautiful Design</h3>
                <p className="text-cosmic-indigo/70 text-sm">Elegant glassmorphic design with smooth animations and gradients</p>
              </div>
            </div>

            {/* Clock Component */}
            <div className="flex justify-center">
              <BilingualClock size={450} />
            </div>

            {/* Instructions */}
            <div className="glassmorphic rounded-2xl p-8 mt-12 border border-gold/20 bg-white/10 backdrop-blur-md">
              <h2 className="text-2xl font-bold text-cosmic-indigo mb-6 text-center">How to Use</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-cosmic-indigo mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-saffron text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    Language Toggle
                  </h3>
                  <p className="text-cosmic-indigo/70 text-sm leading-relaxed">
                    Click the language buttons at the top to switch between English and Hindi numerals. 
                    The change is instant and affects all numbers around the clock face.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-cosmic-indigo mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gold text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Real-Time Updates
                  </h3>
                  <p className="text-cosmic-indigo/70 text-sm leading-relaxed">
                    The clock updates every second with smooth hand movements. The digital display 
                    shows the exact time while the analog face provides a beautiful visual representation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClockPage;