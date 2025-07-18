import React, { useState } from 'react';
import { Star, Heart, Calendar, Gift, FileText, X } from 'lucide-react';

const Calculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: ''
  });

  const calculators = [
    { id: 'name', title: 'Name Numerology', description: 'Discover the vibrational energy of your name', icon: Star, color: 'from-saffron to-gold' },
    { id: 'expression', title: 'Expression Number', description: 'Reveal your natural talents and abilities', icon: Gift, color: 'from-lotus-pink to-saffron' },
    { id: 'soul-urge', title: 'Soul Urge Number', description: 'Understand your deepest desires and motivations', icon: Heart, color: 'from-gold to-lotus-pink' },
    { id: 'psychic', title: 'Psychic Number', description: 'Your personality and how others perceive you', icon: Star, color: 'from-cosmic-indigo to-saffron' },
    { id: 'birthday', title: 'Birthday Number', description: 'The influence of your birth date on your destiny', icon: Calendar, color: 'from-saffron to-lotus-pink' },
    { id: 'full-report', title: 'Full Numerology Report', description: 'Complete analysis with Vedic remedies', icon: FileText, color: 'from-gold to-cosmic-indigo' }
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("🟡 Form submitted with data:", formData);
    setIsLoading(true);

    try {
      console.log("📡 Sending POST request to webhook...");
      const response = await fetch('https://adarsh0309.app.n8n.cloud/webhook/numerology-calc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          dob: formData.birthDate,
          gender: formData.gender,
          calculatorType: selectedCalculator,
          language: 'hinglish',
          message: 'After doing calculations based on rules, give the result in its relevant variable name like soulUrgeNumber, expressionNumber, etc., along with a meaningful message. Return both as a response to the webhook.'
        })
      });

      console.log("✅ Response received from webhook");
      const raw = await response.json();
      console.log("📥 Raw response from webhook:", raw);

      const parsedData = typeof raw.output === 'string' ? JSON.parse(raw.output) : raw.output;
      console.log("📦 Parsed data used for result:", parsedData);

      if (selectedCalculator === 'full-report') {
        console.log("📊 Full report selected. Setting full data.");
        setResult(parsedData);
      } else {
        const singleResult = parsedData;
        console.log("🔢 Extracted single result:", singleResult);

        if (!singleResult?.number || !singleResult?.message) {
          console.warn("⚠️ Could not find expected fields: number or message.");
        }

        setResult(singleResult);
      }

      setShowResults(true);
    } catch (error) {
      console.error("🚨 Error while calling webhook:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const closeModal = () => {
    setSelectedCalculator(null);
    setShowResults(false);
    setResult(null);
    setIsLoading(false);
    setFormData({ name: '', birthDate: '', gender: '' });
  };

  return (
    <section id="calculators" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cosmic-indigo mb-6">Decode Your Numbers with Daffy</h2>
          <p className="text-xl text-cosmic-indigo/70 max-w-3xl mx-auto">Ancient Vedic numerology meets modern AI intelligence. Calculate your sacred numbers instantly.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <div key={calc.id} className="glassmorphic rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gold/20 bg-white/15 backdrop-blur-md" onClick={() => setSelectedCalculator(calc.id)}>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${calc.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-cosmic-indigo mb-3">{calc.title}</h3>
                <p className="text-cosmic-indigo/70 mb-6">{calc.description}</p>
                <button className="w-full bg-gradient-to-r from-saffron to-gold text-white py-4 rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105 hover:from-gold hover:to-saffron z-10 relative">Calculate Now</button>
              </div>
            );
          })}
        </div>

        {selectedCalculator && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className={`rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-500 ${
              showResults 
                ? 'bg-white border-gold/50 text-cosmic-indigo' 
                : 'bg-white border-2 border-gold/30'
            }`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-cosmic-indigo">{calculators.find(c => c.id === selectedCalculator)?.title}</h3>
                <button onClick={closeModal} className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center font-bold transition-colors z-20">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!showResults ? (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-cosmic-indigo font-semibold mb-3 text-lg">Full Name</label>
                    <input type="text" placeholder="Enter your full name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className="w-full px-6 py-4 rounded-full bg-gray-100 border-2 border-gold/40 text-cosmic-indigo placeholder-gray-500 focus:outline-none focus:border-saffron focus:bg-white focus:shadow-lg transition-all text-lg" required />
                  </div>

                  <div>
                    <label className="block text-cosmic-indigo font-semibold mb-3 text-lg">Date of Birth</label>
                    <input type="date" value={formData.birthDate} onChange={(e) => handleInputChange('birthDate', e.target.value)} className="w-full px-6 py-4 rounded-full bg-gray-100 border-2 border-gold/40 text-cosmic-indigo focus:outline-none focus:border-saffron focus:bg-white focus:shadow-lg transition-all text-lg" required />
                  </div>

                  <div>
                    <label className="block text-cosmic-indigo font-semibold mb-3 text-lg">Gender</label>
                    <select value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)} className="w-full px-6 py-4 rounded-full bg-gray-100 border-2 border-gold/40 text-cosmic-indigo focus:outline-none focus:border-saffron focus:bg-white focus:shadow-lg transition-all text-lg appearance-none cursor-pointer" required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-saffron to-gold text-white py-4 rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105 hover:from-gold hover:to-saffron z-10 relative text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Calculating...
                      </div>
                    ) : (
                      'Calculate & Get Results'
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  <h4 className="text-2xl font-bold text-cosmic-indigo">{calculators.find(c => c.id === selectedCalculator)?.title} Result</h4>

                  {selectedCalculator === 'full-report' ? (
                    <div className="grid gap-4 text-left">
                      {Object.entries(result).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-4 rounded-xl shadow">
                          <h5 className="font-bold text-saffron capitalize">{key.replace(/([A-Z])/g, ' $1')}</h5>
                          <p className="text-lg font-bold text-cosmic-indigo">{value.number}</p>
                          <p className="text-cosmic-indigo/80 text-sm">{value.message}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {result?.number && <div className="text-6xl font-bold text-saffron mb-4">{result.number}</div>}
                      {result?.message && <p className="text-cosmic-indigo/80 text-lg leading-relaxed">{result.message}</p>}
                    </>
                  )}

                  <button onClick={closeModal} className="mt-8 bg-gradient-to-r from-saffron to-gold text-white py-3 px-8 rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105 text-lg">
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
};

export default Calculators;
