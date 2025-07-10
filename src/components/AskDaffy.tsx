import React, { useState, useRef, useEffect } from 'react';
import { Mic, MessageSquare, Send } from 'lucide-react';

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
        const chunks: Blob[] = [];
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          console.log("STT disabled or skipped – audio recorded.");
        };

        mediaRecorder.start();
        setIsRecording(true);
      });
    }
  };

  // Load ElevenLabs widget when voice mode is selected
  useEffect(() => {
    if (mode === 'voice') {
      const container = document.getElementById("daffy-elevenlabs-agent");
      if (container && !container.querySelector("elevenlabs-convai")) {
        const loadWidget = () => {
          const widget = document.createElement("elevenlabs-convai");
          widget.setAttribute("agent-id", "agent_01jz4yvvsge4z9p8zn156k996n");
          widget.style.width = "100%";
          widget.style.maxWidth = "420px";
          widget.style.height = "350px";
          widget.style.position = "static";
          widget.style.margin = "0 auto";
          widget.style.borderRadius = "12px";
          widget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
          container.appendChild(widget);
          setWidgetLoaded(true);
        };

        const waitForElevenLabs = () => {
          if (typeof window !== 'undefined' && window.customElements && window.customElements.get('elevenlabs-convai')) {
            loadWidget();
          } else if (document.querySelector('script[src*="elevenlabs"]')) {
            setTimeout(waitForElevenLabs, 100);
          } else {
            setTimeout(waitForElevenLabs, 200);
          }
        };

        waitForElevenLabs();
      }
    }
  }, [mode]);

  // Function to format text with bold for asterisks
  const formatMessage = (text) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <strong key={index} className="font-semibold text-saffron">
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

    let data = {};
    try {
      const res = await fetch('https://adarsh1718.app.n8n.cloud/webhook/samplechat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const text = await res.text();

      if (text.trim()) {
        data = JSON.parse(text);
      } else {
        console.warn("⚠️ Empty response from webhook");
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: 'Something went wrong. Please try again later.',
          },
        ]);
        setIsTyping(false);
        return;
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
              <div
                ref={messagesEndRef}
                className="h-80 overflow-y-auto p-4 space-y-3 scroll-smooth"
              >
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-saffron text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="text-sm leading-relaxed font-normal" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
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
                          <div className="w-2 h-2 bg-saffron rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-saffron rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-saffron rounded-full animate-bounce delay-200"></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2 font-normal" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>typing...</span>
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
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron font-normal"
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
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
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border">
              {/* ElevenLabs Widget Container */}
              <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-cosmic-indigo mb-2">
                    Voice Chat with Daffy
                  </h3>
                  <p className="text-cosmic-indigo/70">
                    Speak naturally and get instant numerology insights
                  </p>
                </div>

              
                {/* ElevenLabs Widget will be inserted here */}
                <div id="daffy-elevenlabs-agent" 
                  className="w-full flex justify-center items-center">
                  style={{ minHeight: '300px', backgroundColor: 'transparent' }}
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