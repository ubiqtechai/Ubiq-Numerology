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
    </div>
  );
}

export default App;