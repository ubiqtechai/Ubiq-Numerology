import React, { useState } from 'react';
import { Mic, MessageSquare, Download, Mail, RotateCcw, Lightbulb, Square, Send } from 'lucide-react';

const AskDaffy = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('chat'); // Changed from 'voice' to 'chat' as default
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'assistant', content: 'Namaste! I am Daffy, your spiritual numerology guide. How may I illuminate your path today?' }
  ]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const switchMode = () => {
    setMode(mode === 'voice' ? 'chat' : 'voice');
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { type: 'user', content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('https://adarsh0309.app.n8n.cloud/webhook/samplechat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: input })
});

const text = await res.text(); // Always safe
let data = {};

try {
  data = JSON.parse(text); // Try to parse JSON
} catch (err) {
  console.error('❌ Failed to parse JSON:', text);
}

setTimeout(() => {
  const botMessage = {
    type: 'assistant',
    content: data.output || '⚠️ Sorry, I could not understand that.'
  };

  setMessages((prev) => [...prev, botMessage]);
  setIsTyping(false);
}, 1500);


      // Simulate typing delay
      setTimeout(() => {
        const botMessage = {
          type: 'assistant',
          content: data.output || 'Sorry, I could not understand that.'
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);

    } catch (error) {
      console.error('Webhook error:', error);
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          type: 'assistant',
          content: 'Something went wrong. Please try again later.'
        }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Function to highlight numerology keywords
  const highlightNumerologyTerms = (text) => {
    const numerologyKeywords = [
      'life path', 'soul urge', 'expression', 'destiny', 'karmic', 'master number',
      'numerology', 'vibration', 'chakra', 'spiritual', 'sacred', 'divine',
      'energy', 'universe', 'manifestation', 'awakening', 'consciousness'
    ];
    
    let highlightedText = text;
    numerologyKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="numerology-highlight">${keyword}</span>`);
    });
    
    return highlightedText;
  };

  return (
    <section id="ask-daffy" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cosmic-indigo mb-6">
            Speak to Daffy – Your Numerology Guide Awaits
          </h2>
          <p className="text-xl text-cosmic-indigo/70 max-w-3xl mx-auto">
            Connect with ancient wisdom through modern technology. Ask your questions in any language.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="glassmorphic rounded-full p-2 flex border-2 border-gold/30 shadow-xl bg-white/15 backdrop-blur-md">
              <button
                onClick={switchMode}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold cursor-pointer ${
                  mode === 'voice' ? 'bg-gradient-to-r from-saffron to-gold text-white shadow-lg' : 'text-cosmic-indigo hover:bg-white/20'
                }`}
              >
                <Mic className="w-5 h-5" />
                Voice Mode
              </button>
              <button
                onClick={switchMode}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold cursor-pointer ${
                  mode === 'chat' ? 'bg-gradient-to-r from-saffron to-gold text-white shadow-lg' : 'text-cosmic-indigo hover:bg-white/20'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                Chat Mode
              </button>
            </div>
          </div>

          {/* Chat Interface */}
          {mode === 'chat' && (
            <div className="glassmorphic rounded-3xl p-8 mb-8 border-2 border-gold/30 shadow-2xl bg-white/15 backdrop-blur-md">
              <div className="bg-white/20 rounded-2xl p-6 h-96 overflow-y-auto mb-6 border-2 border-white/20 shadow-inner backdrop-blur-sm chat-container">
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] relative ${
                        message.type === 'user'
                          ? 'user-message'
                          : 'ai-message'
                      }`}>
                        {/* Enhanced AI Response with Comprehensive Dotted Elements */}
                        {message.type === 'assistant' && (
                          <>
                            {/* Primary dotted border decoration */}
                            <div className="absolute -top-3 -left-3 -right-3 -bottom-3 rounded-2xl border-3 border-dotted border-saffron/40 pointer-events-none animate-pulse"></div>
                            
                            {/* Secondary outer dotted ring */}
                            <div className="absolute -top-4 -left-4 -right-4 -bottom-4 rounded-2xl border-2 border-dotted border-gold/25 pointer-events-none"></div>
                            
                            {/* Corner accent dots */}
                            <div className="absolute -top-3 -left-3 w-4 h-4 bg-saffron/70 rounded-full animate-pulse"></div>
                            <div className="absolute -top-3 -right-3 w-3 h-3 bg-gold/70 rounded-full animate-pulse delay-300"></div>
                            <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-saffron/60 rounded-full animate-pulse delay-600"></div>
                            <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-gold/70 rounded-full animate-pulse delay-900"></div>
                            
                            {/* Side accent dots */}
                            <div className="absolute top-1/2 -left-4 w-2 h-2 bg-gold/60 rounded-full animate-pulse delay-150 transform -translate-y-1/2"></div>
                            <div className="absolute top-1/2 -right-4 w-2 h-2 bg-saffron/60 rounded-full animate-pulse delay-450 transform -translate-y-1/2"></div>
                            
                            {/* Top and bottom accent dots */}
                            <div className="absolute -top-4 left-1/2 w-2 h-2 bg-saffron/50 rounded-full animate-pulse delay-750 transform -translate-x-1/2"></div>
                            <div className="absolute -bottom-4 left-1/2 w-2 h-2 bg-gold/50 rounded-full animate-pulse delay-1050 transform -translate-x-1/2"></div>
                            
                            {/* Inner floating dots pattern */}
                            <div className="absolute top-2 right-2 flex gap-1">
                              <div className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-pulse"></div>
                              <div className="w-1.5 h-1.5 bg-saffron/50 rounded-full animate-pulse delay-200"></div>
                              <div className="w-1.5 h-1.5 bg-gold/40 rounded-full animate-pulse delay-400"></div>
                            </div>
                            
                            {/* Bottom inner dots */}
                            <div className="absolute bottom-2 left-2 flex gap-1">
                              <div className="w-1 h-1 bg-saffron/40 rounded-full animate-pulse delay-100"></div>
                              <div className="w-1 h-1 bg-gold/40 rounded-full animate-pulse delay-300"></div>
                              <div className="w-1 h-1 bg-saffron/30 rounded-full animate-pulse delay-500"></div>
                            </div>
                            
                            {/* Mystical energy lines */}
                            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-saffron/30 to-transparent opacity-50"></div>
                            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/30 to-transparent opacity-50"></div>
                            
                            {/* Sacred geometry overlay */}
                            <div className="absolute inset-1 rounded-xl border border-dotted border-saffron/20 pointer-events-none"></div>
                            
                            {/* Spiritual aura effect */}
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-saffron/10 via-gold/10 to-saffron/10 blur-sm pointer-events-none animate-pulse"></div>
                          </>
                        )}
                        
                        <div className="message-content relative z-10">
                          {message.type === 'assistant' && (
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-saffron to-gold flex items-center justify-center shadow-lg">
                                <span className="text-white text-sm font-bold">D</span>
                              </div>
                              <span className="topic-title">✨ Daffy's Insight</span>
                            </div>
                          )}
                          
                          {message.type === 'user' && (
                            <div className="flex items-center gap-3 mb-3 flex-row-reverse">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gold to-saffron flex items-center justify-center shadow-lg">
                                <span className="text-white text-sm font-bold">Y</span>
                              </div>
                              <span className="topic-title text-saffron">🙏 Your Question</span>
                            </div>
                          )}
                          
                          <div 
                            className="message-text"
                            dangerouslySetInnerHTML={{ 
                              __html: message.type === 'assistant' 
                                ? highlightNumerologyTerms(message.content)
                                : message.content 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Animation */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[70%] relative ai-message">
                        {/* Dotted elements for typing indicator */}
                        <div className="absolute -top-3 -left-3 -right-3 -bottom-3 rounded-2xl border-3 border-dotted border-saffron/40 pointer-events-none animate-pulse"></div>
                        <div className="absolute -top-3 -left-3 w-4 h-4 bg-saffron/70 rounded-full animate-pulse"></div>
                        <div className="absolute -top-3 -right-3 w-3 h-3 bg-gold/70 rounded-full animate-pulse delay-300"></div>
                        
                        <div className="message-content relative z-10">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-saffron to-gold flex items-center justify-center shadow-lg">
                              <span className="text-white text-sm font-bold">D</span>
                            </div>
                            <span className="topic-title">✨ Daffy is typing...</span>
                          </div>
                          
                          {/* Three-dot typing animation */}
                          <div className="flex items-center gap-2 py-4">
                            <div className="typing-dots flex gap-1">
                              <div className="typing-dot w-3 h-3 bg-gradient-to-r from-saffron to-gold rounded-full animate-bounce"></div>
                              <div className="typing-dot w-3 h-3 bg-gradient-to-r from-gold to-saffron rounded-full animate-bounce delay-150"></div>
                              <div className="typing-dot w-3 h-3 bg-gradient-to-r from-saffron to-gold rounded-full animate-bounce delay-300"></div>
                            </div>
                            <span className="text-cosmic-indigo/60 text-sm ml-2">Channeling wisdom...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Daffy about your numbers, destiny, or spiritual path..."
                  className="flex-1 px-6 py-4 rounded-full bg-white/90 border-2 border-gold/40 text-cosmic-indigo placeholder-gray-500 focus:outline-none focus:border-saffron focus:bg-white focus:shadow-lg transition-all modern-input"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-saffron to-gold text-white px-8 py-4 rounded-full hover:shadow-xl transition-all font-bold transform hover:scale-105 hover:from-gold hover:to-saffron disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer modern-button"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Voice Interface */}
          {mode === 'voice' && (
            <div className="glassmorphic rounded-3xl p-8 mb-8 border-2 border-gold/30 shadow-2xl bg-white/15 backdrop-blur-md">
              <div className="text-center mb-8">
                <div className="relative w-64 h-64 mx-auto mb-6">
                  <div className={`absolute inset-0 rounded-full border-4 border-saffron/30 ${isRecording ? 'animate-ping' : ''}`}></div>
                  <div className={`absolute inset-4 rounded-full border-3 border-gold/40 ${isRecording ? 'animate-pulse' : ''}`}></div>
                  <div className={`absolute inset-8 rounded-full border-2 border-lotus-pink/50 ${isRecording ? 'animate-spin-slow' : ''}`}></div>

                  <div className="absolute inset-16 rounded-full bg-gradient-to-r from-saffron to-gold flex items-center justify-center shadow-2xl">
                    <Mic className={`w-16 h-16 text-white ${isRecording ? 'animate-pulse' : ''}`} />
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={toggleRecording}
                    className={`px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 z-20 relative cursor-pointer ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-xl'
                        : 'bg-gradient-to-r from-saffron to-gold text-white hover:shadow-xl hover:from-gold hover:to-saffron'
                    }`}
                  >
                    {isRecording ? (
                      <span className="flex items-center gap-2">
                        <Square className="w-5 h-5" />
                        Stop Recording
                      </span>
                    ) : (
                      'Start Speaking'
                    )}
                  </button>
                </div>

                {isRecording && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-red-500 font-semibold">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    Recording in progress...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="glassmorphic px-6 py-3 rounded-full text-cosmic-indigo hover:bg-white/30 transition-all border-2 border-white/20 font-semibold cursor-pointer hover:scale-105 transform">
              <Download className="w-5 h-5 inline mr-2" />
              Download Transcript
            </button>
            <button className="glassmorphic px-6 py-3 rounded-full text-cosmic-indigo hover:bg-white/30 transition-all border-2 border-white/20 font-semibold cursor-pointer hover:scale-105 transform">
              <Mail className="w-5 h-5 inline mr-2" />
              Email Reading
            </button>
            <button className="glassmorphic px-6 py-3 rounded-full text-cosmic-indigo hover:bg-white/30 transition-all border-2 border-white/20 font-semibold cursor-pointer hover:scale-105 transform">
              <RotateCcw className="w-5 h-5 inline mr-2" />
              End Session & Reflect
            </button>
          </div>

          {/* Suggested Questions Link */}
          <div className="text-center">
            <a 
              href="#suggested-questions"
              className="inline-flex items-center gap-2 text-saffron hover:text-gold transition-colors font-semibold text-lg cursor-pointer hover:scale-105 transform"
            >
              <Lightbulb className="w-5 h-5" />
              Need ideas? View Suggested Questions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskDaffy;

