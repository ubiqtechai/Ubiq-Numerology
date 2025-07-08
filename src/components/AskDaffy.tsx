import React, { useState, useRef, useEffect } from 'react';
import { Mic, MessageSquare, Send, Square } from 'lucide-react';

// ✅ ElevenLabs Agent Setup
const ELEVENLABS_API_KEY = "sk_0aff5e9b6828f01e4efae5d28b2624603b925bfba0197c9c";
const ELEVENLABS_AGENT_ID = "agent_01jz4yvvsge4z9p8zn156k996n";

// ✅ Agent Voice Output
const speakWithElevenLabs = async (text: string) => {
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/agents/${ELEVENLABS_AGENT_ID}/speech`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) throw new Error(`TTS failed: ${response.status}`);

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    new Audio(audioUrl).play();
  } catch (error) {
    console.error("TTS Error:", error);
  }
};

// ✅ Audio Transcription
const transcribeAudioWithElevenLabs = async (audioBlob: Blob) => {
  const formData = new FormData();
  formData.append("file", new File([audioBlob], "audio.wav", { type: "audio/wav" }));
  formData.append("model_id", "scribe_v1");

  try {
    const res = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: { "xi-api-key": ELEVENLABS_API_KEY },
      body: formData,
    });

    if (!res.ok) throw new Error(`STT failed: ${res.status}`);
    const { text } = await res.json();
    return text;
  } catch (err) {
    console.error("STT Error:", err);
    throw err;
  }
};

// 🧠 Simple Mock AI Response
const getAIResponse = async (userText: string) => {
  if (userText.toLowerCase().includes("numerology")) {
    return "In numerology, your life path number reveals your destiny. Calculate it by adding your birth date digits.";
  } else if (userText.toLowerCase().includes("hello")) {
    return "Namaste! I am Daffy, your spiritual guide. How may I help you today?";
  }
  return "I'm sorry, I didn't understand. Could you please rephrase your question?";
};

// 🧘 AskDaffy UI Component
const AskDaffy = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([{ type: 'assistant', content: 'Namaste! I am Daffy, your spiritual numerology guide. How may I illuminate your path today?' }]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      mediaRecorderRef.current?.stop();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        setIsTyping(true);
        try {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          const userText = await transcribeAudioWithElevenLabs(audioBlob);
          setMessages((prev) => [...prev, { type: 'user', content: userText }]);
          const reply = await getAIResponse(userText);
          await speakWithElevenLabs(reply);
          setMessages((prev) => [...prev, { type: 'assistant', content: reply }]);
        } catch {
          setMessages((prev) => [...prev, { type: 'assistant', content: 'Something went wrong. Please try again.' }]);
        } finally {
          setIsTyping(false);
        }
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      alert("Microphone access denied.");
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { type: 'user', content: input }]);
    setInput('');
    setIsTyping(true);

    try {
      const reply = await getAIResponse(input);
      await speakWithElevenLabs(reply);
      setMessages((prev) => [...prev, { type: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { type: 'assistant', content: 'Something went wrong. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {/* Toggle */}
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => setMode('chat')} className={`px-4 py-2 rounded ${mode === 'chat' ? 'bg-saffron text-white' : 'bg-gray-200'}`}>
          <MessageSquare className="inline w-4 h-4 mr-2" /> Chat
        </button>
        <button onClick={() => setMode('voice')} className={`px-4 py-2 rounded ${mode === 'voice' ? 'bg-saffron text-white' : 'bg-gray-200'}`}>
          <Mic className="inline w-4 h-4 mr-2" /> Voice
        </button>
      </div>

      {/* Messages */}
      <div className="bg-white border rounded p-4 h-80 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`my-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block px-4 py-2 rounded-lg ${msg.type === 'user' ? 'bg-saffron text-white' : 'bg-gray-100 text-black'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-sm text-gray-500">Daffy is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      {mode === 'chat' && (
        <div className="flex mt-4 gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your numbers..." className="flex-1 border px-3 py-2 rounded" />
          <button onClick={handleSend} disabled={!input.trim()} className="bg-saffron text-white px-4 py-2 rounded">
            <Send className="inline w-4 h-4" />
          </button>
        </div>
      )}

      {/* Voice Button */}
      {mode === 'voice' && (
        <div className="text-center mt-4">
          <button onClick={toggleRecording} className={`px-6 py-3 rounded-full font-medium ${isRecording ? 'bg-red-500' : 'bg-saffron'} text-white`}>
            {isRecording ? <><Square className="inline w-4 h-4 mr-2" /> Stop</> : <><Mic className="inline w-4 h-4 mr-2" /> Speak</>}
          </button>
        </div>
      )}
    </div>
  );
};

export default AskDaffy;
