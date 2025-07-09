// ✅ Updated with user info extraction
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MessageSquare, Send, Square } from 'lucide-react';

const ELEVENLABS_API_KEY = "sk_159b13112039dee218fa2b58e6c520486d6269fda17577f5";
const VOICE_ID = "SrBurvmnTnB3CW6txUgO";

const speakWithElevenLabs = async (text: string) => {
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      }
    );

    if (!response.ok) throw new Error(`ElevenLabs TTS failed: ${response.status}`);
    const audioBlob = await response.blob();
    new Audio(URL.createObjectURL(audioBlob)).play();
  } catch (error) {
    console.error("🔊 TTS Error:", error);
  }
};

const transcribeAudioWithElevenLabs = async (audioBlob: Blob) => {
  const formData = new FormData();
  formData.append('file', new File([audioBlob], 'voice.wav', { type: 'audio/wav' }));
  formData.append('model_id', 'scribe_v1');

  const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
    method: "POST",
    headers: { "xi-api-key": ELEVENLABS_API_KEY },
    body: formData,
  });

  if (!response.ok) throw new Error(`STT failed: ${response.status}`);
  const json = await response.json();
  return json.text;
};

const extractUserInfo = (text: string) => {
  const nameMatch = text.match(/my name is (\w+\s?\w*)/i);
  const dobMatch = text.match(/(?:\bdob\b|born on|date of birth is)\s*(\d{1,2}-\d{1,2}-\d{4})/i);
  return {
    fullName: nameMatch ? nameMatch[1] : null,
    dob: dobMatch ? dobMatch[1] : null,
  };
};

const getAIResponse = async (userText: string, userInfo: any) => {
  if (!userInfo.fullName || !userInfo.dob) {
    return "Please tell me your name and date of birth to proceed with numerology.";
  }

  const res = await fetch("/api/numerology", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: userInfo.fullName,
      dob: userInfo.dob,
      calculatorType: "full-report",
    }),
  });
  const data = await res.json();

  const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are Daffy, a warm and spiritual numerology guide." },
        {
          role: "user",
          content: `User: ${userInfo.fullName}, DOB: ${userInfo.dob}. Result:
Expression Number: ${data.expressionNumber.number} - ${data.expressionNumber.message}
Soul Urge Number: ${data.soulUrgeNumber.number} - ${data.soulUrgeNumber.message}
Name Numerology: ${data.nameNumerology.number} - ${data.nameNumerology.message}
Psychic Number: ${data.psychicNumber.number} - ${data.psychicNumber.message}
Birthday Number: ${data.birthdayNumber.number} - ${data.birthdayNumber.message}
Explain like a spiritual guide.`,
        },
      ],
    }),
  });

  const gptJson = await gptRes.json();
  return gptJson.choices[0].message.content;
};

export default function AskDaffy() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([{ type: 'assistant', content: 'Namaste! I am Daffy, your spiritual numerology guide. How may I illuminate your path today?' }]);
  const [userInfo, setUserInfo] = useState({ fullName: '', dob: '' });
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollTo(0, messagesEndRef.current.scrollHeight);
  }, [messages, isTyping]);

  const processUserInput = async (text: string) => {
    setMessages(prev => [...prev, { type: 'user', content: text }]);
    setIsTyping(true);

    const extracted = extractUserInfo(text);
    setUserInfo(prev => ({
      fullName: extracted.fullName || prev.fullName,
      dob: extracted.dob || prev.dob,
    }));

    try {
      const aiResponse = await getAIResponse(text, {
        fullName: extracted.fullName || userInfo.fullName,
        dob: extracted.dob || userInfo.dob,
      });
      await speakWithElevenLabs(aiResponse);
      setMessages(prev => [...prev, { type: 'assistant', content: aiResponse }]);
    } catch {
      setMessages(prev => [...prev, { type: 'assistant', content: 'Something went wrong. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    await processUserInput(input);
    setInput('');
  };

  const toggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      mediaRecorderRef.current?.stop();
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(chunks, { type: 'audio/webm' });
      const userText = await transcribeAudioWithElevenLabs(audioBlob);
      await processUserInput(userText);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  return (
    <section id="ask-daffy" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-cosmic-indigo mb-4">Ask Daffy</h2>
          <p className="text-lg text-cosmic-indigo/70">Your spiritual numerology guide is here to help</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md">
            <button onClick={() => setMode('chat')} className={`px-6 py-2 rounded-full transition-all ${mode === 'chat' ? 'bg-saffron text-white shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}><MessageSquare className="w-4 h-4 inline mr-2" /> Chat</button>
            <button onClick={() => setMode('voice')} className={`px-6 py-2 rounded-full transition-all ${mode === 'voice' ? 'bg-saffron text-white shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}><Mic className="w-4 h-4 inline mr-2" /> Voice</button>
          </div>
        </div>

        {/* Chat UI */}
        {mode === 'chat' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border">
              <div ref={messagesEndRef} className="h-80 overflow-y-auto p-4 space-y-3 scroll-smooth">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${m.type === 'user' ? 'bg-saffron text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <div className="text-sm leading-relaxed font-normal">{m.content}</div>
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
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
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

        {/* Voice UI */}
        {mode === 'voice' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border">
              <div className="h-80 p-8 flex flex-col items-center justify-center">
                <div className="relative mb-8">
                  <div className={`w-32 h-32 rounded-full border-4 ${isRecording ? 'border-red-500 animate-pulse' : 'border-gray-200'}`}></div>
                  <div className={`absolute inset-4 rounded-full flex items-center justify-center cursor-pointer ${isRecording ? 'bg-red-500 shadow-lg' : 'bg-saffron hover:bg-saffron/90'}`} onClick={toggleRecording}>
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{isRecording ? 'Listening...' : 'Ready to Listen'}</h3>
                  <p className="text-sm text-gray-600 font-normal">{isRecording ? 'Speak clearly about your numerology questions' : 'Click the microphone to start speaking'}</p>
                </div>
              </div>
              <div className="border-t p-4 text-center">
                <button onClick={toggleRecording} className={`px-8 py-3 rounded-lg font-medium ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' : 'bg-saffron hover:bg-saffron/90 text-white shadow-md hover:shadow-lg'}`}>
                  {isRecording ? <><Square className="w-4 h-4 inline mr-2" /> Stop Recording</> : <><Mic className="w-4 h-4 inline mr-2" /> Start Speaking</>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
