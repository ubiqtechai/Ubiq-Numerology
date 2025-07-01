import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

const SuggestedQuestions = () => {
  const questions = [
    {
      id: 1,
      question: "What is my karmic debt number?",
      description: "Understand past-life patterns affecting your current journey",
      icon: "🔮",
      category: "Karmic"
    },
    {
      id: 2,
      question: "Why do I keep seeing 11:11?",
      description: "Decode the spiritual significance of repeating numbers",
      icon: "👁️",
      category: "Signs"
    },
    {
      id: 3,
      question: "Which number rules my business energy?",
      description: "Find the perfect numerical vibration for success",
      icon: "💼",
      category: "Business"
    },
    {
      id: 4,
      question: "What's my lucky day this month?",
      description: "Discover optimal timing for important decisions",
      icon: "🗓️",
      category: "Timing"
    },
    {
      id: 5,
      question: "How do I align with my destiny?",
      description: "Steps to live in harmony with your life path",
      icon: "✨",
      category: "Destiny"
    },
    {
      id: 6,
      question: "What's the best name vibration for my baby?",
      description: "Choose a name that supports your child's highest potential",
      icon: "👶",
      category: "Names"
    }
  ];

  const handleQuestionClick = (question) => {
    // Scroll to Ask Daffy section and pre-fill the question
    const askDaffySection = document.getElementById('ask-daffy');
    if (askDaffySection) {
      askDaffySection.scrollIntoView({ behavior: 'auto' });
      // Here you would typically set the question in the chat input
      console.log('Setting question:', question);
    }
  };

  return (
    <section id="suggested-questions" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cosmic-indigo mb-6">
            Not Sure What to Ask?
          </h2>
          <p className="text-xl text-cosmic-indigo/70 max-w-3xl mx-auto">
            Explore these popular questions to unlock the mysteries of your numbers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleQuestionClick(item.question)}
              className="glassmorphic rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105"
            >
              {/* Glowing Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-saffron/20 via-gold/20 to-lotus-pink/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Icon and Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{item.icon}</div>
                  <span className="text-xs bg-gradient-to-r from-saffron to-gold text-white px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Question */}
                <h3 className="text-lg font-bold text-cosmic-indigo mb-3 group-hover:text-saffron transition-colors">
                  "{item.question}"
                </h3>

                {/* Description */}
                <p className="text-cosmic-indigo/70 text-sm mb-4">
                  {item.description}
                </p>

                {/* Click to Ask Button */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-saffron font-semibold group-hover:text-gold transition-colors">
                    Click to ask →
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-saffron to-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Sparkle Effects */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              </div>
              <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                <Sparkles className="w-3 h-3 text-saffron animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-cosmic-indigo/70 mb-6">
            Have a different question? Daffy is here to guide you.
          </p>
          <button 
            onClick={() => handleQuestionClick('')}
            className="bg-gradient-to-r from-saffron to-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all inline-flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Ask Daffy Anything
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuggestedQuestions;