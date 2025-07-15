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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      (messagesEndRef.current as HTMLDivElement).scrollTop = (messagesEndRef.current as HTMLDivElement).scrollHeight;
    }
  }, [messages, isTyping]);
  

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      mediaRecorderRef.current?.stop();
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          console.log("STT disabled or skipped – audio recorded.");
          // TODO: STT logic
        };

        mediaRecorder.start();
        setIsRecording(true);
      }).catch((error) => {
        console.error('Error accessing microphone:', error);
      });
    }
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
      let data: any = {};

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (text: string) => {
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
              onClick={() => setMode('voice')}
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

              {/* Input field with embedded mic */}
              <div className="border-t p-4">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about your numbers..."
                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 font-normal"
                    disabled={isTyping}
                  />
                  <button
                    onClick={toggleRecording}
                    type="button"
                    className={`absolute right-12 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
                      isRecording
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'text-orange-500 hover:text-orange-600'
                    }`}
                    title={isRecording ? 'Stop Recording' : 'Start Recording'}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="ml-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Voice mode container preserved */}
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
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" 
                        />
                      </svg>
                    </div>

                    
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {'<script src="https://elevenlabs.io/convai-widget/index.js"></script>'}
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
