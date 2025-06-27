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
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-cosmic-indigo mb-4">
            Ask Daffy
          </h2>
          <p className="text-lg text-cosmic-indigo/70">
            Your spiritual numerology guide is here to help
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setMode('chat')}
              className={`px-6 py-2 rounded-full transition-all ${mode === 'chat' ? 'bg-saffron text-white shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Chat
            </button>
            <button
              onClick={() => setMode('voice')}
              className={`px-6 py-2 rounded-full transition-all ${mode === 'voice' ? 'bg-saffron text-white shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <Mic className="w-4 h-4 inline mr-2" />
              Voice
            </button>
          </div>
        </div>

        {/* Chat Interface */}
        {mode === 'chat' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border">
              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-3">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-saffron text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="text-xs opacity-75 mb-1">
                        {message.type === 'assistant' ? 'Daffy' : 'You'}
                      </div>
                      <div className="text-sm">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                      <div className="text-xs opacity-75 mb-1">Daffy</div>
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-saffron rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-saffron rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-saffron rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">typing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about your numbers..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="bg-saffron text-white px-4 py-2 rounded-lg hover:bg-saffron/90 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="max-w-sm mx-auto">
            <div className="bg-white rounded-xl shadow-lg border p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center">
                <Mic className={`w-8 h-8 ${isRecording ? 'text-red-500' : 'text-gray-400'}`} />
              </div>
              
              <button
                onClick={toggleRecording}
                className={`px-6 py-3 rounded-lg font-medium ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-saffron hover:bg-saffron/90 text-white'
                }`}
              >
                {isRecording ? (
                  <>
                    <Square className="w-4 h-4 inline mr-2" />
                    Stop Recording
                  </>
                ) : (
                  'Start Speaking'
                )}
              </button>

              {isRecording && (
                <div className="mt-4 text-sm text-red-500">
                  🔴 Recording in progress...
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