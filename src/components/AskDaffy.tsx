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
        const chunks = [];
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

  useEffect(() => {
    if (mode === 'voice') {
      const container = document.getElementById("daffy-elevenlabs-agent");

      if (container && !widgetLoaded) {
        const loadWidget = () => {
          container.innerHTML = '';
          container.innerHTML = `
            <elevenlabs-convai 
              agent-id="agent_01k045tk0ee71by88pp55ar28v"
              style="width: 100%; height: 400px; max-width: 420px; margin: 0 auto; display: block; position: relative;">
            </elevenlabs-convai>
          `;
          setWidgetLoaded(true);
        };

        const checkForCustomElement = () => {
          if (window.customElements && window.customElements.get('elevenlabs-convai')) {
            loadWidget();
          } else {
            const scripts = document.querySelectorAll('script[src*="elevenlabs"]');
            if (scripts.length > 0) {
              setTimeout(checkForCustomElement, 200);
            } else {
              setTimeout(checkForCustomElement, 100);
            }
          }
        };

        checkForCustomElement();
      }

      // Apply custom styles for voice overlay
      const applyVoiceStyles = () => {
        const checkWidget = setInterval(() => {
          const widget = document.getElementById('daffy-elevenlabs-agent');
          if (widget) {
            const style = document.createElement('style');
            style.id = 'daffy-voice-overlay-styles';
            style.textContent = `
              #daffy-elevenlabs-agent {
                position: relative !important;
                z-index: 1 !important;
              }
              
              .daffy-voice-overlay {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: rgba(255, 255, 255, 0.95) !important;
                z-index: 999 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                backdrop-filter: blur(5px) !important;
                border-radius: 12px !important;
              }
              
              .daffy-voice-content {
                text-align: center !important;
                padding: 20px !important;
                border-radius: 12px !important;
                background: white !important;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
                border: 1px solid #e5e7eb !important;
                max-width: 350px !important;
                width: 90% !important;
                position: relative !important;
              }
              
              .daffy-voice-avatar {
                width: 80px !important;
                height: 80px !important;
                background: linear-gradient(135deg, #f59e0b, #d97706) !important;
                border-radius: 50% !important;
                margin: 0 auto 16px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3) !important;
              }
              
              .daffy-voice-title {
                font-size: 18px !important;
                font-weight: 500 !important;
                color: #6b7280 !important;
                margin-bottom: 16px !important;
              }
              
              .daffy-voice-subtitle {
                color: #6b7280 !important;
                margin-bottom: 12px !important;
                font-size: 14px !important;
              }
              
              .daffy-voice-code {
                background: #f3f4f6 !important;
                padding: 8px 12px !important;
                border-radius: 6px !important;
                font-family: monospace !important;
                font-size: 11px !important;
                color: #374151 !important;
                border: 1px solid #e5e7eb !important;
              }
              
              .daffy-close-overlay {
                position: absolute !important;
                top: 10px !important;
                right: 10px !important;
                background: #f3f4f6 !important;
                border: none !important;
                border-radius: 50% !important;
                width: 28px !important;
                height: 28px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                cursor: pointer !important;
                color: #6b7280 !important;
                transition: all 0.2s !important;
                font-size: 16px !important;
                font-weight: bold !important;
              }
              
              .daffy-close-overlay:hover {
                background: #e5e7eb !important;
                color: #374151 !important;
              }
            `;
            
            // Remove existing styles first
            const existingStyles = document.getElementById('daffy-voice-overlay-styles');
            if (existingStyles) {
              existingStyles.remove();
            }
            
            document.head.appendChild(style);
            clearInterval(checkWidget);
          }
        }, 100);
      };

      applyVoiceStyles();
    } else {
      setWidgetLoaded(false);
      // Remove styles when switching away from voice mode
      const existingStyles = document.getElementById('daffy-voice-overlay-styles');
      if (existingStyles) {
        existingStyles.remove();
      }
    }
  }, [mode, widgetLoaded]);

  const createVoiceOverlay = () => {
    const widget = document.getElementById('daffy-elevenlabs-agent');
    if (widget) {
      // Remove existing overlay if any
      const existingOverlay = widget.querySelector('.daffy-voice-overlay');
      if (existingOverlay) {
        existingOverlay.remove();
      }

      const overlay = document.createElement('div');
      overlay.className = 'daffy-voice-overlay';
      overlay.innerHTML = `
        <div class="daffy-voice-content">
          <button class="daffy-close-overlay">×</button>
          <div class="daffy-voice-avatar">
            <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 616 0v6a3 3 0 01-3 3z"/>
            </svg>
          </div>
          <div class="daffy-voice-title">Loading voice interface...</div>
          <div class="daffy-voice-subtitle">Make sure ElevenLabs script is loaded in your HTML head:</div>
          <div class="daffy-voice-code">
            <code>&lt;script src="https://elevenlabs.io/convai-widget/index.js"&gt;&lt;/script&gt;</code>
          </div>
        </div>
      `;
      
      // Add click handler to close button
      overlay.querySelector('.daffy-close-overlay').addEventListener('click', () => {
        overlay.remove();
      });
      
      widget.appendChild(overlay);
    }
  };

  const handleVoiceModeClick = () => {
    setMode('voice');
    // Show overlay after a brief delay to ensure widget container is ready
    setTimeout(() => {
      createVoiceOverlay();
    }, 500);
  };

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
              onClick={handleVoiceModeClick}
              className={`px-6 py-2 rounded-full transition-all ${mode === 'voice' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <Mic className="w-4 h-4 inline mr-2" />
              Voice
            </button>
          </div>
        </div>

        {mode === 'chat' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border">
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

              {/* Input with Styled Mic */}
              <div className="border-t p-4">
                <div className="flex space-x-2 items-center">
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
                    onClick={toggleRecording}
                    type="button"
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                      isRecording 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-gradient-to-br from-orange-400 to-orange-600 text-white hover:opacity-90'
                    }`}
                    title={isRecording ? 'Stop Recording' : 'Start Recording'}
                  >
                    <Mic className="w-5 h-5" />
                  </button>

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

        {mode === 'voice' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border">
              <div className="p-6 flex items-center justify-center min-h-[300px] relative">
                <div id="daffy-elevenlabs-agent" className="w-full max-w-md mx-auto">
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <svg 
                        className="w-8 h-8 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 616 0v6a3 3 0 01-3 3z" 
                        />
                      </svg>
                    </div>
                    <p className="mb-4">Loading voice interface...</p>
                    
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