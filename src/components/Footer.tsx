import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, ChevronDown } from 'lucide-react';

const Footer = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How accurate is AI numerology compared to human numerologists?",
      answer: "Daffy combines ancient Vedic numerology wisdom with advanced AI, ensuring consistent, precise calculations every time. While human experts bring intuition and nuance, Daffy offers 24/7 access to authentic numerological insights derived from thousands of traditional texts."
    },
    {
      id: 2,
      question: "Can I get readings in my native language?",
      answer: "Absolutely! Daffy supports both English and Hindi fluently—understanding cultural nuances to deliver interpretations that resonate deeply in each language."
    },
    {
      id: 3,
      question: "What's the difference between various number calculations?",
      answer: "Each number reveals a unique aspect of your life: Expression shows your talents, Soul Urge uncovers inner desires, Psychic/Birthday indicates natural gifts, and Name Numerology highlights your energy vibration. Our Courses section delves deeper into how they all work together."
    },
    {
      id: 4,
      question: "Are the remedies and mantras authentic?",
      answer: "Yes—they’re all drawn from authentic Vedic traditions. We use verified Sanskrit mantras, gemstone recommendations, color therapy, and other time-tested spiritual practices to support your path."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <footer className="bg-cosmic-indigo text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-saffron rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-gold rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-lotus-pink rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="glassmorphic rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform ${
                      openFAQ === faq.id ? 'transform rotate-180' : ''
                    }`} 
                  />
                </button>
                {openFAQ === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                {/* <span className="text-white font-bold text-xl">U</span> */}
                <span className="text-white font-bold text-lg">
                  <img
                    src="https://ubiqtech.ai/ubiq-logo.svg"
                    alt="U"
                    className="w-10 h-10 object-contain"
                    
                  />
                </span>
              </div>
              <span className="text-xl font-bold">UBIQ Numerology</span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Your digital ashram for authentic numerological wisdom, 
              where ancient Vedic knowledge meets modern AI intelligence.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#ask-daffy" className="text-white/70 hover:text-saffron transition-colors">Ask Daffy</a></li>
              <li><a href="#calculators" className="text-white/70 hover:text-saffron transition-colors">Calculators</a></li>
              <li><a href="#courses" className="text-white/70 hover:text-saffron transition-colors">Courses</a></li>
              <li><a href="#workshops" className="text-white/70 hover:text-saffron transition-colors">Live Workshops</a></li>
              <li><a href="#about" className="text-white/70 hover:text-saffron transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-saffron transition-colors">Personal Numerology</a></li>
              <li><a href="#" className="text-white/70 hover:text-saffron transition-colors">Business Name Analysis</a></li>
              <li><a href="#" className="text-white/70 hover:text-saffron transition-colors">Compatibility Reading</a></li>
              <li><a href="#" className="text-white/70 hover:text-saffron transition-colors">Karmic Debt Analysis</a></li>
              <li><a href="#" className="text-white/70 hover:text-saffron transition-colors">Master Number Guidance</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-saffron" />
                <span className="text-white/70">hello@ubiq-numerology.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-saffron" />
                <span className="text-white/70">+91 99999 88888</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-saffron" />
                <span className="text-white/70">Mumbai, India</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Sacred Insights Newsletter</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-saffron"
                />
                <button className="bg-gradient-to-r from-saffron to-gold px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/60 text-sm">
            © 2025 UBIQ Numerology AI. All rights reserved. Made with 🙏 for spiritual seekers worldwide.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-saffron transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-saffron transition-colors">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-saffron transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;