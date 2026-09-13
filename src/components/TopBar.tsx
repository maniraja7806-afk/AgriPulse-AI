import React from 'react';
import { Bell, User, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function TopBar() {
  const { language, setLanguage, farm } = useAppContext();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="md:hidden w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
          <span className="text-sm">AP</span>
        </div>
        <div className="hidden md:flex flex-col">
          <h1 className="text-xl font-bold text-slate-800">
            {language === 'ta' ? 'கண்ணோட்டம்' : 'Overview'}
          </h1>
          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mt-0.5">
            <MapPin className="w-3 h-3" />
            {language === 'ta' ? 'கோயம்புத்தூர், தமிழ்நாடு' : farm.location}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Switch */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              language === 'en' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('ta')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              language === 'ta' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'
            }`}
          >
            தமிழ்
          </button>
        </div>

        <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-100"></span>
        </button>
        
        <button className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 hover:bg-emerald-200 transition-colors border border-emerald-200">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
