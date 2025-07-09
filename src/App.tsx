import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AskDaffy from './components/AskDaffy';
import Calculators from './components/Calculators';
import Courses from './components/Courses';
import Workshops from './components/Workshops';
import SuggestedQuestions from './components/SuggestedQuestions';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';

function App() {
  const [isVoiceMode, setIsVoiceMode] = React.useState(false);

  // Listen for voice mode changes
  React.useEffect(() => {
    const handleVoiceModeChange = (event) => {
      setIsVoiceMode(event.detail.isVoiceMode);
    };

    window.addEventListener('voiceModeChange', handleVoiceModeChange);
    return () => window.removeEventListener('voiceModeChange', handleVoiceModeChange);
  }, []);
  return (
    <div className="min-h-screen bg-ashram-white text-cosmic-indigo relative overflow-x-hidden">
      <BackgroundEffects />
      <Header />
      
      {/* Main Content - Hidden when voice mode is active */}
      <div className={`transition-all duration-500 ${isVoiceMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Hero />
        <AskDaffy />
        <Calculators />
        <Courses />
        <Workshops />
        <SuggestedQuestions />
        <About />
        <Testimonials />
        <Footer />
      </div>
      
      {/* Voice Mode Overlay - Full screen when active */}
      {isVoiceMode && (
        <div className="fixed inset-0 bg-ashram-white z-40 pt-20 animate-fade-in">
          <div className="container mx-auto px-6 h-full flex items-center justify-center">
            <div className="w-full max-w-4xl">
              <div 
                id="daffy-elevenlabs-fullscreen" 
                className="w-full h-[80vh] bg-white rounded-xl shadow-2xl border flex items-center justify-center"
              >
                {/* ElevenLabs widget will be injected here */}
                <div className="text-center p-12">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-saffron to-gold flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <Mic className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-cosmic-indigo mb-4">
                    Connecting to Daffy...
                  </h3>
                  <p className="text-lg text-cosmic-indigo/70">
                    Your spiritual numerology guide is preparing to listen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;