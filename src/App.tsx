import React, { useState } from 'react';
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
import ClockPage from './components/ClockPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'clock'>('home');

  // Check if we should show the clock page based on URL hash
  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#clock') {
        setCurrentPage('clock');
      } else {
        setCurrentPage('home');
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'clock') {
    return <ClockPage />;
  }

  return (
    <div className="min-h-screen bg-ashram-white text-cosmic-indigo relative overflow-x-hidden">
      <BackgroundEffects />
      <Header />
      <Hero />
      <AskDaffy />
      <Calculators />
      <Courses />
      <Workshops />
      <SuggestedQuestions />
      <About />
      <Testimonials />
      <Footer />
      
      {/* Clock Page Link */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="#clock"
          className="bg-gradient-to-r from-saffron to-gold text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center gap-2"
          title="View Bilingual Clock"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12,6 12,12 16,14"></polyline>
          </svg>
          <span className="hidden sm:inline font-semibold">Clock</span>
        </a>
      </div>
    </div>
  );
}

export default App;