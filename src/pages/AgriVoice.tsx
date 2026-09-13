import React, { useState } from 'react';
import { Mic, MicOff, Waves } from 'lucide-react';

export default function AgriVoice() {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState('');

  const toggleListen = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setResponse('');
      setTimeout(() => {
        setIsListening(false);
        setResponse("அடுத்த 8 மணி நேரத்தில் மழை பெய்ய வாய்ப்புள்ளது. நீர்ப்பாசனத்தை தாமதப்படுத்துங்கள்.\n(Rain is expected within 8 hours. Delay irrigation.)");
      }, 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[80vh] flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">AgriVoice</h2>
        <p className="text-slate-500">Ask questions in English or தமிழ்</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="relative">
          {isListening && (
            <div className="absolute -inset-8 bg-emerald-100 rounded-full animate-ping opacity-75"></div>
          )}
          <button
            onClick={toggleListen}
            className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all ${
              isListening ? 'bg-emerald-600 text-white scale-110' : 'bg-white text-emerald-600 border border-emerald-100 hover:bg-emerald-50'
            }`}
          >
            {isListening ? <Waves className="w-12 h-12 animate-pulse" /> : <Mic className="w-12 h-12" />}
          </button>
        </div>

        <div className="h-32 w-full text-center px-6">
          {isListening ? (
            <p className="text-lg font-medium text-emerald-600 animate-pulse">Listening... "Tomorrow rain varuma?"</p>
          ) : response ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="font-medium text-slate-800 text-lg whitespace-pre-line">{response}</p>
            </div>
          ) : (
            <p className="text-slate-400">Tap the microphone and ask a question.</p>
          )}
        </div>
      </div>
    </div>
  );
}
