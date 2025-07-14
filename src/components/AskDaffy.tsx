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

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { type: 'user', content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    const reply = await getChatGPTReply(input);
    setMessages((prev) => [...prev, { type: 'assistant', content: reply }]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getChatGPTReply = async (message) => {
    try {
      const res = await fetch('https://adarsh1718.app.n8n.cloud/webhook/samplechat', {
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

  const getVoiceReply = async (message) => {
    try {
      const res = await fetch('https://adarsh1718.app.n8n.cloud/webhook-test/voicechat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const text = await res.text();
      let data = {};

      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('❌ Failed to parse voice JSON:', text);
      }

      return data.output || '⚠️ Sorry, I could not understand that.';
    } catch (error) {
      console.error('❌ Error contacting voice backend:', error);
      return '⚠️ Sorry, something went wrong.';
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

      const reply = await getVoiceReply(userText);
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

  // ... (UI code remains unchanged from here onward — already provided in your last code)

  return (
    // --- your entire UI code (unchanged) ---
    // Keep as-is from your existing component
    // Includes: Mode toggle, Chat/Voice UI, Messages, Microphone animations, etc.
  );
};

export default AskDaffy;
