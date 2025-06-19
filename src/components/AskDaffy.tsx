import React, { useState } from 'react';
import { Mic, MessageSquare, Download, Mail, RotateCcw, Lightbulb, Square } from 'lucide-react';

const AskDaffy = () => {
  const [mode, setMode] = useState('voice'); // 'voice' or 'chat'
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'assistant', content: 'Namaste! I am Daffy, your spiritual numerology guide. How may I illuminate your path today?' }
  ]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const switchMode = () => {
    setMode(mode === 'voice' ? 'chat' : 'voice');
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
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold ${
                  mode === 'voice' 
                    ? 'bg-gradient-to-r from-saffron to-gold text-white shadow-lg' 
                    : 'text-cosmic-indigo hover:bg-white/20'
                }`}
              >
                <Mic className="w-5 h-5" />
                Voice Mode
              </button>
              <button
                onClick={switchMode}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold ${
                  mode === 'chat' 
                    ? 'bg-gradient-to-r from-saffron to-gold text-white shadow-lg' 
                    : 'text-cosmic-indigo hover:bg-white/20'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                Chat Mode
              </button>
            </div>
          </div>

          {/* Voice Interface */}
          {mode === 'voice' && (
            <div className="glassmorphic rounded-3xl p-8 mb-8 border-2 border-gold/30 shadow-2xl bg-white/15 backdrop-blur-md">
              {/* Voice Visualization */}
              <div className="text-center mb-8">
                <div className="relative w-64 h-64 mx-auto mb-6">
                  {/* Outer Rings */}
                  <div className={`absolute inset-0 rounded-full border-4 border-saffron/30 ${isRecording ? 'animate-ping' : ''}`}></div>
                  <div className={`absolute inset-4 rounded-full border-3 border-gold/40 ${isRecording ? 'animate-pulse' : ''}`}></div>
                  <div className={`absolute inset-8 rounded-full border-2 border-lotus-pink/50 ${isRecording ? 'animate-spin-slow' : ''}`}></div>
                  
                  {/* Center Circle */}
                  <div className="absolute inset-16 rounded-full bg-gradient-to-r from-saffron to-gold flex items-center justify-center shadow-2xl">
                    <Mic className={`w-16 h-16 text-white ${isRecording ? 'animate-pulse' : ''}`} />
                  </div>
                  
                  {/* Waveform Bars */}
                  {isRecording && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 bg-saffron rounded-full animate-pulse"
                          style={{
                            height: `${Math.random() * 40 + 10}px`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recording Controls */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={toggleRecording}
                    className={`px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 z-20 relative ${
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

                {/* Recording Status Indicator */}
                {isRecording && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-red-500 font-semibold">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    Recording in progress...
                  </div>
                )}
              </div>

              {/* Transcript Panel */}
              <div className="bg-white/15 rounded-2xl p-6 max-h-64 overflow-y-auto border-2 border-white/20 shadow-inner backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-cosmic-indigo mb-4">Live Transcript</h3>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-md ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-saffron to-gold text-white' 
                          : 'bg-white/25 text-cosmic-indigo border border-white/20'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat Interface */}
          {mode === 'chat' && (
            <div className="glassmorphic rounded-3xl p-8 mb-8 border-2 border-gold/30 shadow-2xl bg-white/15 backdrop-blur-md">
              <div className="bg-white/15 rounded-2xl p-6 h-96 overflow-y-auto mb-6 border-2 border-white/20 shadow-inner backdrop-blur-sm">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-saffron to-gold text-white' 
                          : 'bg-white/25 text-cosmic-indigo border border-white/20'
                      }`}>
                        <p>{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Ask Daffy about your numbers, destiny, or spiritual path..."
                  className="flex-1 px-6 py-4 rounded-full bg-white/20 border-2 border-gold/40 text-cosmic-indigo placeholder-cosmic-indigo/60 focus:outline-none focus:border-gold focus:bg-white/30 shadow-inner transition-all"
                />
                <button className="bg-gradient-to-r from-saffron to-gold text-white px-8 py-4 rounded-full hover:shadow-xl transition-all font-bold transform hover:scale-105 hover:from-gold hover:to-saffron">
                  Send
                </button>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="glassmorphic px-6 py-3 rounded-full text-cosmic-indigo hover:bg-white/30 transition-all border-2 border-white/20 font-semibold">
              <Download className="w-5 h-5 inline mr-2" />
              Download Transcript
            </button>
            <button className="glassmorphic px-6 py-3 rounded-full text-cosmic-indigo hover:bg-white/30 transition-all border-2 border-white/20 font-semibold">
              <Mail className="w-5 h-5 inline mr-2" />
              Email Reading
            </button>
            <button className="glassmorphic px-6 py-3 rounded-full text-cosmic-indigo hover:bg-white/30 transition-all border-2 border-white/20 font-semibold">
              <RotateCcw className="w-5 h-5 inline mr-2" />
              End Session & Reflect
            </button>
          </div>

          {/* Suggested Questions Link */}
          <div className="text-center">
            <a 
              href="#suggested-questions"
              className="inline-flex items-center gap-2 text-saffron hover:text-gold transition-colors font-semibold text-lg"
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