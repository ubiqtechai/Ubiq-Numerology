import React, { useState, useRef, useEffect } from 'react';
import { Mic, MessageSquare, Send, Square } from 'lucide-react';

const AskDaffy = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('chat');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'assistant', content: 'Namaste! I am Daffy, your spiritual numerology guide. How may I illuminate your path today?' }
  ]);

  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      mediaRecorderRef.current?.stop();
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = []; // Fixed: Removed TypeScript annotation
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          console.log("STT disabled or skipped – audio recorded.");
          // TODO: Implement speech-to-text processing here
        };

        mediaRecorder.start();
        setIsRecording(true);
      }).catch((error) => {
        console.error('Error accessing microphone:', error);
      });
    }
  };

  // Load ElevenLabs widget when voice mode is selected
  useEffect(() => {
    if (mode === 'voice') {
      const container = document.getElementById("daffy-elevenlabs-agent");
      
      if (container && !widgetLoaded) {
        const loadWidget = () => {
          // Clear any existing content
          container.innerHTML = '';
          
          // Create the widget using innerHTML instead of createElement
          // This ensures proper custom element registration and stays contained
          container.innerHTML = `
            <elevenlabs-convai 
              agent-id="agent_01k045tk0ee71by88pp55ar28v"
              style="width: 100%; height: 500px; max-width: 420px; margin: 0 auto; display: block; position: relative;">
            </elevenlabs-convai>
          `;
          
          setWidgetLoaded(true);
        };

        // Check if custom element is defined
        const checkForCustomElement = () => {
          if (window.customElements && window.customElements.get('elevenlabs-convai')) {
            // Custom element is registered, load the widget
            loadWidget();
          } else {
            // Check if script is loaded and wait for custom element registration
            const scripts = document.querySelectorAll('script[src*="elevenlabs"]');
            if (scripts.length > 0) {
              // Script exists, wait for custom element to be defined
              setTimeout(checkForCustomElement, 200);
            } else {
              // Script not found, try again
              setTimeout(checkForCustomElement, 100);
            }
          }
        };

        checkForCustomElement();
      }
    } else {
      // Reset widget loaded state when switching away from voice mode
      setWidgetLoaded(false);
    }
  }, [mode, widgetLoaded]);

  // Function to format text with bold for asterisks
  const formatMessage = (text) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <strong key={index} className="font-semibold text-orange-500">
            {part.slice(1, -1)}
          </strong>
        );
      }
      return part;
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { type: 'user', content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('https://adarsh1718.app.n8n.cloud/webhook/samplechat', {
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
          <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
            Ask Daffy
          </h2>
          <p className="text-lg text-indigo-700">
            Your spiritual numerology guide is here to help
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setMode('chat')}
              className={`px-6 py-2 rounded-full transition-all ${mode === 'chat' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Chat
            </button>
            <button
              onClick={() => setMode('voice')}
              className={`px-6 py-2 rounded-full transition-all ${mode === 'voice' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
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
              <div
                ref={messagesEndRef}
                className="h-96 overflow-y-auto p-4 space-y-3 scroll-smooth"
              >
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="text-sm leading-relaxed font-normal">
                        {formatMessage(message.content)}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-200"></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2 font-normal">typing...</span>
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
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 font-normal"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border">
              {/* Header */}
              <div className="p-8 text-center border-b">
                <h3 className="text-2xl font-bold text-indigo-900 mb-2">
                  Voice Chat with Daffy
                </h3>
                <p className="text-indigo-700">
                  Speak naturally and get instant numerology insights
                </p>
              </div>
              
              {/* ElevenLabs Widget Container */}
              <div className="p-8 flex items-center justify-center min-h-[384px] relative">
                {/* ElevenLabs Widget will be inserted here */}
                <div id="daffy-elevenlabs-agent" className="w-full max-w-md mx-auto">
                  <div className="text-center text-gray-500">
                    <p className="mb-4">Loading voice interface...</p>
                    <p className="text-sm">Make sure ElevenLabs script is loaded in your HTML head:</p>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {`<script src="https://elevenlabs.io/convai-widget/index.js"></script>`}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AskDaffy;