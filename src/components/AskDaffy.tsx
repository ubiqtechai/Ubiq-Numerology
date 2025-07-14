import React, { useState, useRef, useEffect } from 'react';
import { Mic, MessageSquare, Send, Square } from 'lucide-react';

const AskDaffy = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('chat');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'assistant', content: 'Namaste! I am Daffy, your spiritual numerology guide. How may I illuminate your path today?' }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const chatWebhook = 'https://adarsh1718.app.n8n.cloud/webhook/samplechat';
  const voiceWebhook = 'https://adarsh1718.app.n8n.cloud/webhook-test/voicechat';

  const formatMessage = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => (
      <p key={index} className="mb-2">
        {
          line.split(/(\*[^*]+\*)/g).map((part, i) => {
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <strong key={i} className="font-semibold text-saffron">
                  {part.slice(1, -1)}
                </strong>
              );
            }
            return <React.Fragment key={i}>{part}</React.Fragment>;
          })
        }
      </p>
    ));
  };

  const getChatGPTReply = async (message, source = 'chat') => {
    const url = source === 'voice' ? voiceWebhook : chatWebhook;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const text = await res.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('❌ Failed to parse JSON:', text);
      }

      return data.output || '⚠️ Sorry, I could not understand that.';
    } catch (error) {
      console.error('❌ Error contacting backend:', error);
      return '⚠️ Sorry, something went wrong.';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { type: 'user', content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    const reply = await getChatGPTReply(input, 'chat');
    setMessages((prev) => [...prev, { type: 'assistant', content: reply }]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const speakText = async (text) => {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL', {
        method: 'POST',
        headers: {
          'xi-api-key': 'sk_e5874ecf5496e74a09b1096aa0832156fb1dc14f30f8372c',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ ElevenLabs TTS failed:', errorText);
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('❌ Error in TTS:', error);
    }
  };

  const handleVoiceInteraction = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('❌ SpeechRecognition not supported in this browser');
      console.error('SpeechRecognition API not available.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      console.log('🎙️ Recording started...');
      setIsRecording(true);
    };

    recognition.onresult = async (event) => {
      const userText = event.results[0][0].transcript;
      console.log('📝 You said:', userText);
      setMessages((prev) => [...prev, { type: 'user', content: userText }]);
      setIsRecording(false);
      setIsTyping(true);

      const reply = await getChatGPTReply(userText, 'voice');
      setMessages((prev) => [...prev, { type: 'assistant', content: reply }]);
      setIsTyping(false);

      await speakText(reply);
    };

    recognition.onerror = (event) => {
      console.error('❌ Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      console.log('⏹️ Recording stopped.');
      setIsRecording(false);
    };

    recognition.start();
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

        {mode === 'chat' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border">
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
                          <div className="w-2 h-2 bg-saffron rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-saffron rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-saffron rounded-full animate-bounce delay-200"></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2 font-normal">typing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about your numbers..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron font-normal"
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

        {mode === 'voice' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border">
              <div className="h-80 p-8 flex flex-col items-center justify-center">
                <div className="relative mb-8">
                  <div className={`w-32 h-32 rounded-full border-4 transition-all duration-300 ${
                    isRecording ? 'border-red-500 animate-pulse' : 'border-gray-200'
                  }`}></div>
                  <div className={`absolute inset-4 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isRecording ? 'bg-red-500 shadow-lg' : 'bg-saffron hover:bg-saffron/90'
                  }`} onClick={handleVoiceInteraction}>
                    <Mic className="w-12 h-12 text-white" />
                  </div>
                  {isRecording && (
                    <>
                      <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-20"></div>
                      <div className="absolute inset-2 rounded-full border-2 border-red-400 animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
                    </>
                  )}
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {isRecording ? 'Listening...' : 'Ready to Listen'}
                  </h3>
                  <p className="text-sm text-gray-600 font-normal">
                    {isRecording ? 'Speak clearly about your numerology questions' : 'Click the microphone to start speaking'}
                  </p>
                </div>
                {isRecording && (
                  <div className="flex items-center space-x-2 text-red-500 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-normal">Recording in progress...</span>
                  </div>
                )}
              </div>
              <div className="border-t p-4 text-center">
                <button
                  onClick={handleVoiceInteraction}
                  className={`px-8 py-3 rounded-lg font-medium transition-all ${
                    isRecording ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' : 'bg-saffron hover:bg-saffron/90 text-white shadow-md hover:shadow-lg'
                  }`}
                  disabled={isRecording}
                >
                  {isRecording ? (
                    <>
                      <Square className="w-4 h-4 inline mr-2" />
                      Recording...
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 inline mr-2" />
                      Start Speaking
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AskDaffy;