{/* Voice Interface */}
        {mode === 'voice' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border">
              
              {/* Header */}
              {/* <div className="p-6 text-center border-b">
                <h3 className="text-2xl font-bold text-indigo-900 mb-2">
                  Voice Chat with Daffy
                </h3>
                <p className="text-indigo-700">
                  Speak naturally and get instant numerology insights
                </p>
              </div> */}
              
              {/* ElevenLabs Widget Container */}
              <div className="p-6 flex items-center justify-center min-h-[300px] relative">
                {/* ElevenLabs Widget will be inserted here */}
                <div id="daffy-elevenlabs-agent" className="w-full max-w-md mx-auto">
                  {/* <div className="text-center text-gray-500">
                    <p className="mb-4">Loading voice interface...</p>
                    <p className="text-sm">Make sure ElevenLabs script is loaded in your HTML head:</p>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {`<script src="https://elevenlabs.io/convai-widget/index.js"></script>`}
                    </code>
                  </div> */}

                  



                  
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