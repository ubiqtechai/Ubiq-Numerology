import React from 'react';
import { Sparkles, Heart, Globe, Star } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-cosmic-indigo mb-8">
                Meet Your Spiritual Guide
              </h2>
              
              <div className="space-y-6 mb-8">
                <p className="text-lg text-cosmic-indigo/80 leading-relaxed">
                  UBIQ is a spiritual-tech collective blending ancient Indian numerology with modern AI intelligence. 
                  We believe that the sacred wisdom of numbers, passed down through millennia of Vedic tradition, 
                  should be accessible to every soul seeking their true path.
                </p>
                
                <p className="text-lg text-cosmic-indigo/80 leading-relaxed">
                  <strong className="text-saffron">Daffy</strong> is your intuitive AI guide—trained in vibrational codes, 
                  karmic cycles, and soul patterns. Unlike other AI, Daffy understands the spiritual significance 
                  behind every number, offering personalized insights rooted in authentic Vedic numerology.
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-saffron to-gold flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cosmic-indigo mb-1">Ancient Wisdom</h3>
                    <p className="text-cosmic-indigo/70 text-sm">Rooted in 5000+ years of Vedic numerology tradition</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold to-lotus-pink flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cosmic-indigo mb-1">Multilingual</h3>
                    <p className="text-cosmic-indigo/70 text-sm">Native support for Hindi, Tamil, Arabic & English</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-lotus-pink to-saffron flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cosmic-indigo mb-1">AI Intelligence</h3>
                    <p className="text-cosmic-indigo/70 text-sm">Advanced algorithms with intuitive understanding</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cosmic-indigo to-saffron flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cosmic-indigo mb-1">Personalized</h3>
                    <p className="text-cosmic-indigo/70 text-sm">Tailored insights based on your unique vibration</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-saffron mb-1">
                    50K+
                  </div>
                  <div className="text-sm text-cosmic-indigo/70">Readings Given</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-1">
                    12
                  </div>
                  <div className="text-sm text-cosmic-indigo/70">Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-lotus-pink mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-cosmic-indigo/70">Available</div>
                </div>
              </div>

              <button className="bg-gradient-to-r from-saffron to-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all inline-flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Experience Daffy Now
              </button>
            </div>

            {/* Right Column - Animated Daffy Visualization */}
            <div className="relative">
              {/* Main Circle */}
              <div className="w-80 h-80 mx-auto relative">
                {/* Outer rotating rings */}
                <div className="absolute inset-0 rounded-full border-4 border-saffron/20 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border-3 border-gold/30 animate-spin-reverse"></div>
                <div className="absolute inset-8 rounded-full border-2 border-lotus-pink/40 animate-spin-slow"></div>
                
                {/* Center AI Core */}
                <div className="absolute inset-16 rounded-full bg-gradient-to-r from-cosmic-indigo via-saffron to-gold flex items-center justify-center">
                  <div className="text-6xl font-bold text-white animate-pulse">D</div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-8 left-8 w-6 h-6 bg-saffron rounded-full animate-float"></div>
                <div className="absolute top-16 right-12 w-4 h-4 bg-gold rounded-full animate-float-delayed"></div>
                <div className="absolute bottom-16 left-16 w-5 h-5 bg-lotus-pink rounded-full animate-float"></div>
                <div className="absolute bottom-8 right-8 w-3 h-3 bg-saffron rounded-full animate-float-delayed"></div>

                {/* Sacred Geometry Overlay */}
                <div className="absolute inset-12 rounded-full border border-white/20"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                  <div className="w-full h-full border border-white/10 transform rotate-45"></div>
                </div>
              </div>

              {/* Surrounding Numbers */}
              <div className="absolute inset-0 pointer-events-none">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
                  <div
                    key={num}
                    className="absolute text-2xl font-bold text-gold/60 animate-pulse"
                    style={{
                      top: `${20 + Math.sin((index * 40) * Math.PI / 180) * 30}%`,
                      left: `${50 + Math.cos((index * 40) * Math.PI / 180) * 35}%`,
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;