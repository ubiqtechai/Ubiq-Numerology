import { useState } from 'react';
import { Star, Gift, Heart, Calendar, FileText } from 'react-feather';

const calculators = [
  {
    id: 'name-numerology',
    title: 'Name Numerology',
    description: 'Discover the vibrational energy of your name',
    icon: Star,
    color: 'from-saffron to-gold',
  },
  {
    id: 'expression-number',
    title: 'Expression Number',
    description: 'Reveal your natural talents and abilities',
    icon: Gift,
    color: 'from-lotus-pink to-saffron',
  },
  {
    id: 'soul-urge',
    title: 'Soul Urge Number',
    description: 'Understand your deepest desires and motivations',
    icon: Heart,
    color: 'from-gold to-lotus-pink',
  },
  {
    id: 'psychic-number',
    title: 'Psychic Number',
    description: 'Your spiritual connection and intuitive gifts',
    icon: Star,
    color: 'from-cosmic-indigo to-saffron',
  },
  {
    id: 'birthday-number',
    title: 'Birthday Number',
    description: 'The influence of your birth date on your destiny',
    icon: Calendar,
    color: 'from-saffron to-lotus-pink',
  },
  {
    id: 'full-report',
    title: 'Full Numerology Report',
    description: 'Complete analysis with Vedic remedies',
    icon: FileText,
    color: 'from-gold to-cosmic-indigo',
  }
];

export default function Calculators() {
  const [formData, setFormData] = useState({ name: '', birthDate: '', gender: '' });
  const [selectedCalculator, setSelectedCalculator] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedLanguage] = useState('hinglish');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('https://adarsh030905.app.n8n.cloud/webhook/numerology-calc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: formData.name,
        dob: formData.birthDate,
        gender: formData.gender,
        calculatorType: selectedCalculator,
        language: selectedLanguage
      })
    })
      .then(res => res.json())
      .then(data => {
        setResult(data);
        setShowResults(true);
      })
      .catch(err => console.error("Workflow error:", err));
  };

  const closeModal = () => {
    setSelectedCalculator(null);
    setShowResults(false);
    setResult(null);
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

        {/* Modal */}
        {selectedCalculator && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className={`rounded-3xl p-8 max-w-md w-full max-h-96 overflow-y-auto border shadow-2xl transition-all duration-500 ${
              showResults 
                ? 'bg-white border-gold/50 text-cosmic-indigo' 
                : 'glassmorphic border-gold/30 bg-white/20 backdrop-blur-md'
            }`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-cosmic-indigo">
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
                  {selectedCalculator !== 'psychic-number' && (
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
                  )}

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
                  <div className="bg-white/95 rounded-2xl p-6 border border-gold/30 shadow-inner">
                    <h4 className="text-xl font-bold text-cosmic-indigo mb-4">Your Sacred Result</h4>
                    <p className="text-cosmic-indigo/80 text-sm leading-relaxed whitespace-pre-line">
                      {result?.message}
                    </p>
                  </div>
                  <button                    
                    onClick={closeModal}
                    className="w-full bg-gradient-to-r from-cosmic-indigo to-saffron text-white py-3 rounded-full font-semibold hover:shadow-xl transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}