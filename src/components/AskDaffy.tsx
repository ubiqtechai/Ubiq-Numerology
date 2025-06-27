import React, { useState } from 'react';
import { Mic, MessageSquare, Send, Square } from 'lucide-react';

const AskDaffy = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('chat');
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

      const text = await res.text();
      let data = {};

      try {
        data = JSON.parse(text);
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

  return (
    <section id="ask-daffy" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cosmic-indigo mb-6">
            Ask Daffy
          </h2>
          <p className="text-xl text-cosmic-indigo/70 max-w-3xl mx-auto">
            Your spiritual numerology guide is here to help
          </p>
        </div>

        {/* Simple Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
            <button
              onClick={switchMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium ${mode === 'voice' ? 'bg-gradient-to-r from-saffron to-gold text-white' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <Mic className="w-4 h-4" />
              Voice
            </button>
            <button
              onClick={switchMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium ${mode === 'chat' ? 'bg-gradient-to-r from-saffron to-gold text-white' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </button>
          </div>
        </div>

        {/* Chat Interface */}
        {mode === 'chat' && (
          <div className="max-w-4xl mx-auto">
            {/* Messages Container */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6">
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-gradient-to-r from-saffron to-gold text-white' : 'bg-gray-50 text-gray-800'} rounded-2xl px-4 py-3`}>
                      <div className="text-sm font-medium mb-1">
                        {message.type === 'assistant' ? '✨ Daffy' : 'You'}
                      </div>
                      <div className="text-sm leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-50 rounded-2xl px-4 py-3">
                      <div className="text-sm font-medium mb-1">✨ Daffy</div>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-saffron rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-saffron rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-saffron rounded-full animate-bounce delay-200"></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">typing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-100 p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about your numbers, destiny, or spiritual path..."
                    className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="bg-gradient-to-r from-saffron to-gold text-white px-6 py-3 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Voice Interface */}
        {mode === 'voice' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
              {/* Recording Animation */}
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className={`absolute inset-0 rounded-full ${isRecording ? 'bg-red-100 animate-pulse' : 'bg-gray-50'} flex items-center justify-center`}>
                  <Mic className={`w-12 h-12 ${isRecording ? 'text-red-500' : 'text-gray-400'}`} />
                </div>
              </div>

              <button
                onClick={toggleRecording}
                className={`px-8 py-3 rounded-full font-medium transition-all ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gradient-to-r from-saffron to-gold text-white hover:shadow-lg'}`}
              >
                {isRecording ? (
                  <span className="flex items-center gap-2">
                    <Square className="w-4 h-4" />
                    Stop Recording
                  </span>
                ) : (
                  'Start Speaking'
                )}
              </button>

              {isRecording && (
                <div className="mt-4 text-sm text-red-500 font-medium">
                  🔴 Recording...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AskDaffy;