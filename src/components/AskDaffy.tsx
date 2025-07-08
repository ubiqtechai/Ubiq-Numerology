import React, { useState, useRef, useEffect } from 'react';
import { Mic, MessageSquare, Send, Square } from 'lucide-react';

const speakWithElevenLabs = async (text: string) => {
  const apiKey = "YOUR_ELEVENLABS_API_KEY"; // Replace this in production with secure storage
  const voiceId = "YOUR_AGENT_ID"; // Replace with your ElevenLabs agent ID

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      console.error("❌ ElevenLabs TTS failed:", await response.text());
      return;
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("🔊 TTS Error:", error);
  }
};

const AskDaffy = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('chat');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content:
        'Namaste! I am Daffy, your spiritual numerology guide. How may I illuminate your path today?',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const toggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      mediaRecorderRef.current?.stop();
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: Blob[] = [];
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice.webm');

      setIsTyping(true);

      try {
        const response = await fetch('https://adarsh0309.app.n8n.cloud/webhook/voicechat', {
          method: 'POST',
          body: formData,
        });

        const arrayBuffer = await response.arrayBuffer();
        const audioUrl = URL.createObjectURL(new Blob([arrayBuffer], { type: 'audio/mpeg' }));
        const audio = new Audio(audioUrl);
        audio.play();
      } catch (err) {
        console.error('🎤 Voice chat error:', err);
        alert('Something went wrong. Please try again.');
      } finally {
        setIsTyping(false);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
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
        body: JSON.stringify({ message: input }),
      });

      const text = await res.text();
      let data = { output: '⚠️ Sorry, I could not understand that.' };

      if (text && text.trim()) {
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error('❌ Failed to parse JSON:', text);
          data.output = '⚠️ Sorry, I received an invalid response. Please try again.';
        }
      } else {
        console.error('❌ Empty response received from webhook');
        data.output = '⚠️ Sorry, I received an empty response. Please try again.';
      }

      setTimeout(() => {
        const botMessage = {
          type: 'assistant',
          content: data.output || '⚠️ Sorry, I could not understand that.',
        };

        setMessages((prev) => [...prev, botMessage]);
        speakWithElevenLabs(botMessage.content); // 🗣️ Speak the reply
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Webhook error:', error);
      setTimeout(() => {
        const botMessage = {
          type: 'assistant',
          content: 'Something went wrong. Please try again later.',
        };
        setMessages((prev) => [...prev, botMessage]);
        speakWithElevenLabs(botMessage.content);
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

  const formatMessage = (msg: string) => msg;

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
              <div className="h-80 p-8 flex flex-col items-center justify-center">
                <div className="relative mb-8">
                  <div className={`w-32 h-32 rounded-full border-4 transition-all duration-300 ${
                    isRecording
                      ? 'border-red-500 animate-pulse'
                      : 'border-gray-200'
                  }`}></div>

                  <div className={`absolute inset-4 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isRecording
                      ? 'bg-red-500 shadow-lg'
                      : 'bg-saffron hover:bg-saffron/90'
                  }`} onClick={toggleRecording}>
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
                    {isRecording
                      ? 'Speak clearly about your numerology questions'
                      : 'Click the microphone to start speaking'}
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
                  onClick={toggleRecording}
                  className={`px-8 py-3 rounded-lg font-medium transition-all ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                      : 'bg-saffron hover:bg-saffron/90 text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <Square className="w-4 h-4 inline mr-2" />
                      Stop Recording
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
