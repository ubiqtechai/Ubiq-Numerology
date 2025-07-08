// ✅ Complete Updated AskDaffy Component (Voice Agent Integrated)
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MessageSquare, Send, Square } from 'lucide-react';

// ✅ ElevenLabs API Configuration (Updated for Agent)
const ELEVENLABS_API_KEY = "sk_0aff5e9b6828f01e4efae5d28b2624603b925bfba0197c9c";
const ELEVENLABS_AGENT_ID = "agent_01jz4yvvsge4z9p8zn156k996n";

// ✅ Updated Voice Function for Agent
const speakWithElevenLabs = async (text: string) => {
  try {
    const response = await fetch("https://api.elevenlabs.io/v1/conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        agent_id: ELEVENLABS_AGENT_ID,
        voice_id: ELEVENLABS_AGENT_ID,
        model_id: "eleven_multilingual_v2",
        text,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) throw new Error(`Agent TTS failed: ${response.status}`);

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("🔊 TTS Error:", error);
    throw error;
  }
};

// ✅ Speech-to-Text using ElevenLabs
const transcribeAudioWithElevenLabs = async (audioBlob: Blob) => {
  const formData = new FormData();
  const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });
  formData.append('file', audioFile);
  formData.append('model_id', 'scribe_v1');

  try {
    const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) throw new Error(`STT failed: ${response.status}`);
    const { text } = await response.json();
    return text;
  } catch (error) {
    console.error("🎤 STT Error:", error);
    throw error;
  }
};

const getAIResponse = async (userText: string) => {
  if (userText.toLowerCase().includes("numerology")) {
    return "In numerology, your life path number reveals your destiny. Calculate it by adding your birth date digits.";
  } else if (userText.toLowerCase().includes("hello")) {
    return "Namaste! I am Daffy, your spiritual guide. How may I help you today?";
  } else {
    return "I'm sorry, I didn't understand. Could you please rephrase your question?";
  }
};

// ✅ AskDaffy Component
const AskDaffy = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: 'Namaste! I am Daffy, your spiritual numerology guide. How may I illuminate your path today?',
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

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        setIsTyping(true);
        try {
          const userText = await transcribeAudioWithElevenLabs(audioBlob);
          setMessages(prev => [...prev, { type: 'user', content: userText }]);
          const aiResponse = await getAIResponse(userText);
          await speakWithElevenLabs(aiResponse);
          setMessages(prev => [...prev, { type: 'assistant', content: aiResponse }]);
        } catch (error) {
          setMessages(prev => [...prev, {
            type: 'assistant',
            content: "Sorry, I encountered an error. Please try again."
          }]);
        } finally {
          setIsTyping(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      alert("Please allow microphone access to use voice features.");
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(input);
      await speakWithElevenLabs(aiResponse);
      setMessages(prev => [...prev, { type: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: "Something went wrong. Please try again."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {/* Mode Toggle */}
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => setMode('chat')} className={`px-4 py-2 rounded ${mode === 'chat' ? 'bg-saffron text-white' : 'bg-gray-200'}`}>
          <MessageSquare className="inline w-4 h-4 mr-2" /> Chat
        </button>
        <button onClick={() => setMode('voice')} className={`px-4 py-2 rounded ${mode === 'voice' ? 'bg-saffron text-white' : 'bg-gray-200'}`}>
          <Mic className="inline w-4 h-4 mr-2" /> Voice
        </button>
      </div>

      {/* Message History */}
      <div className="bg-white border rounded p-4 h-80 overflow-y-auto" ref={messagesEndRef}>
        {messages.map((m, i) => (
          <div key={i} className={`my-2 ${m.type === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block px-4 py-2 rounded-lg ${m.type === 'user' ? 'bg-saffron text-white' : 'bg-gray-100 text-black'}`}>{m.content}</div>
          </div>
        ))}
        {isTyping && <div className="text-left text-sm text-gray-500">Daffy is typing...</div>}
      </div>

      {/* Input Section */}
      {mode === 'chat' && (
        <div className="flex mt-4 gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your numbers..."
            className="flex-1 border px-3 py-2 rounded"
          />
          <button onClick={handleSend} disabled={!input.trim()} className="bg-saffron text-white px-4 py-2 rounded">
            <Send className="inline w-4 h-4" />
          </button>
        </div>
      )}

      {mode === 'voice' && (
        <div className="text-center mt-4">
          <button onClick={toggleRecording} className={`px-6 py-3 rounded-full font-medium ${isRecording ? 'bg-red-500 text-white' : 'bg-saffron text-white'}`}>
            {isRecording ? <><Square className="inline w-4 h-4 mr-2" /> Stop</> : <><Mic className="inline w-4 h-4 mr-2" /> Speak</>}
          </button>
        </div>
      )}
    </div>
  );
};

export default AskDaffy;
