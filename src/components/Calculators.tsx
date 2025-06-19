import React, { useState } from 'react';
import { Calculator, Star, Heart, Calendar, Gift, FileText } from 'lucide-react';

const Calculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: ''
  });

  const calculators = [
    {
      id: 'name',
      title: 'Name Numerology',
      description: 'Discover the vibrational energy of your name',
      icon: Star,
      color: 'from-saffron to-gold'
    },
    {
      id: 'expression',
      title: 'Expression Number',
      description: 'Reveal your natural talents and abilities',
      icon: Gift,
      color: 'from-lotus-pink to-saffron'
    },
    {
      id: 'soul-urge',
      title: 'Soul Urge Number',
      description: 'Understand your deepest desires and motivations',
      icon: Heart,
      color: 'from-gold to-lotus-pink'
    },
    {
      id: 'psychic',
      title: 'Psychic Number',
      description: 'Your spiritual connection and intuitive gifts',
      icon: Star,
      color: 'from-cosmic-indigo to-saffron'
    },
    {
      id: 'birthday',
      title: 'Birthday Number',
      description: 'The influence of your birth date on your destiny',
      icon: Calendar,
      color: 'from-saffron to-lotus-pink'
    },
    {
      id: 'full-report',
      title: 'Full Numerology Report',
      description: 'Complete analysis with Vedic remedies',
      icon: FileText,
      color: 'from-gold to-cosmic-indigo'
    }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const closeModal = () => {
    setSelectedCalculator(null);
    setShowResults(false);
    setFormData({ name: '', birthDate: '', gender: '' });
  };

  return (
    <section id="calculators" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cosmic-indigo mb-6">
            Decode Your Numbers with Daffy
          </h2>
          <p className="text-xl text-cosmic-indigo/70 max-w-3xl mx-auto">
            Ancient Vedic numerology meets modern AI intelligence. Calculate your sacred numbers instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <div
                key={calc.id}
                className="glassmorphic rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gold/20 bg-white/15 backdrop-blur-md"
                onClick={() => setSelectedCalculator(calc.id)}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${calc.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-cosmic-indigo mb-3">{calc.title}</h3>
                <p className="text-cosmic-indigo/70 mb-6">{calc.description}</p>
                <button className="w-full bg-gradient-to-r from-saffron to-gold text-white py-4 rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105 hover:from-gold hover:to-saffron z-10 relative">
                  Calculate Now
                </button>
              </div>
            );
          })}
        </div>

        {/* Calculator Modal/Form */}
        {selectedCalculator && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className={`rounded-3xl p-8 max-w-md w-full max-h-96 overflow-y-auto border shadow-2xl transition-all duration-500 ${
              showResults 
                ? 'bg-white border-gold/50 text-cosmic-indigo' 
                : 'glassmorphic border-gold/30 bg-white/20 backdrop-blur-md'
            }`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-2xl font-bold ${showResults ? 'text-cosmic-indigo' : 'text-cosmic-indigo'}`}>
                  {calculators.find(c => c.id === selectedCalculator)?.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center font-bold transition-colors z-20"
                >
                  ×
                </button>
              </div>

              {!showResults ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-cosmic-indigo font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 rounded-full bg-white/20 border-2 border-gold/40 text-cosmic-indigo placeholder-cosmic-indigo/60 focus:outline-none focus:border-gold focus:bg-white/30 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-cosmic-indigo font-semibold mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="w-full px-4 py-3 rounded-full bg-white/20 border-2 border-gold/40 text-cosmic-indigo focus:outline-none focus:border-gold focus:bg-white/30 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-cosmic-indigo font-semibold mb-2">Gender</label>
                    <select 
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-4 py-3 rounded-full bg-white/20 border-2 border-gold/40 text-cosmic-indigo focus:outline-none focus:border-gold focus:bg-white/30 transition-all"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-saffron to-gold text-white py-4 rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105 hover:from-gold hover:to-saffron z-10 relative"
                  >
                    Calculate & Get Results
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Results Display with White Background */}
                  <div className="bg-white/95 rounded-2xl p-6 border border-gold/30 shadow-inner">
                    <h4 className="text-xl font-bold text-cosmic-indigo mb-4">Your Sacred Numbers</h4>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-gradient-to-r from-saffron/10 to-gold/10 rounded-xl">
                        <div className="text-3xl font-bold text-saffron mb-2">7</div>
                        <div className="text-sm text-cosmic-indigo/70">Life Path</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-r from-lotus-pink/10 to-saffron/10 rounded-xl">
                        <div className="text-3xl font-bold text-lotus-pink mb-2">3</div>
                        <div className="text-sm text-cosmic-indigo/70">Expression</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-cosmic-indigo mb-2">Your Spiritual Path</h5>
                        <p className="text-cosmic-indigo/80 text-sm leading-relaxed">
                          As a Life Path 7, you are a natural seeker of truth and wisdom. Your soul yearns for deep understanding and spiritual connection. This number indicates a strong intuitive nature and the ability to see beyond the material world.
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-cosmic-indigo mb-2">Sacred Recommendations</h5>
                        <ul className="text-cosmic-indigo/80 text-sm space-y-1">
                          <li>• Meditate daily during sunrise or sunset</li>
                          <li>• Wear amethyst or clear quartz for clarity</li>
                          <li>• Chant "Om Gam Ganapataye Namaha" 108 times</li>
                          <li>• Practice introspection and journaling</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={closeModal}
                    className="w-full bg-gradient-to-r from-cosmic-indigo to-saffron text-white py-3 rounded-full font-semibold hover:shadow-xl transition-all"
                  >
                    Get Full Detailed Report
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Calculators;