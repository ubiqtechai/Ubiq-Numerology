...

// ✅ FINAL FUNCTION: AskDaffy
export default function AskDaffy() {
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
  const [userInfo, setUserInfo] = useState({ fullName: '', dob: '' });
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollTo(0, messagesEndRef.current.scrollHeight);
  }, [messages, isTyping]);

  // ✅ Inject ElevenLabs Agent only in Voice Mode
  useEffect(() => {
    if (mode === 'voice') {
      const container = document.getElementById('daffy-elevenlabs-agent');
      if (container && !container.querySelector('elevenlabs-convai')) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
        script.async = true;
        script.onload = () => {
          const widget = document.createElement("elevenlabs-convai");
          widget.setAttribute("agent-id", "agent_01jz4yvvsge4z9p8zn156k996n");
          widget.style.width = "100%";
          widget.style.minHeight = "180px";
          widget.style.borderRadius = "8px";
          container.appendChild(widget);
        };
        document.body.appendChild(script);
      }
    }
  }, [mode]);

  const processUserInput = async (text: string) => {
    setMessages((prev) => [...prev, { type: 'user', content: text }]);
    setIsTyping(true);

    const extracted = extractUserInfo(text);
    setUserInfo((prev) => ({
      fullName: extracted.fullName || prev.fullName,
      dob: extracted.dob || prev.dob,
    }));

    try {
      const aiResponse = await getAIResponse(text, {
        fullName: extracted.fullName || userInfo.fullName,
        dob: extracted.dob || userInfo.dob,
      });
      await speakWithElevenLabs(aiResponse);
      setMessages((prev) => [...prev, { type: 'assistant', content: aiResponse }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { type: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setIsTyping(false);
    }
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

      // Commented out STT removed to prevent error
      console.warn("STT is disabled. Replace this call if needed.");
      // const userText = await transcribeAudioWithElevenLabs(audioBlob);
      // await processUserInput(userText);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    await processUserInput(input);
    setInput('');
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

        {/* ✅ Chat Interface (No ElevenLabs here!) */}
        {mode === 'chat' && (
          <div className="max-w-3xl mx-auto">
            {/* Your same chat code — safe to keep */}
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
                      <span className="text-xs text-gray-500 ml-2 font-normal">typing...</span>
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

        {/* ✅ Voice Interface (with ElevenLabs agent) */}
        {mode === 'voice' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border">
              <div className="p-8 flex flex-col items-center justify-center">
                {/* ElevenLabs Agent Widget mounts HERE only */}
                <div id="daffy-elevenlabs-agent" className="w-full max-w-md mb-6"></div>

                {/* Mic UI Stays the same */}
                <div className="relative mb-8">
                  <div className={`w-32 h-32 rounded-full border-4 ${isRecording ? 'border-red-500 animate-pulse' : 'border-gray-200'}`}></div>
                  <div className={`absolute inset-4 rounded-full flex items-center justify-center cursor-pointer ${isRecording ? 'bg-red-500 shadow-lg' : 'bg-saffron hover:bg-saffron/90'}`} onClick={toggleRecording}>
                    <Mic className="w-12 h-12 text-white" />
                  </div>
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