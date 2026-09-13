import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CloudRain, Droplets, Bug, Sprout, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Markdown from 'react-markdown';

export default function Dashboard() {
  const { farm, weather, diseaseRisk, simulation } = useAppContext();
  const [aiPlan, setAiPlan] = useState('');
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);

  useEffect(() => {
    fetchPlan();
  }, [farm, weather, diseaseRisk]);

  const fetchPlan = async () => {
    setIsLoadingPlan(true);
    try {
      const res = await fetch('/api/ai/daily-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: farm.crop,
          stage: farm.stage,
          weather,
          diseaseRisk: diseaseRisk.level
        })
      });
      const data = await res.json();
      setAiPlan(data.plan);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingPlan(false);
    }
  };

  // Calculate generic score based on state
  let score = 82;
  if (simulation === 'HEAVY_RAIN') score = 65;
  if (simulation === 'DISEASE_OUTBREAK') score = 55;
  if (simulation === 'HEAT_WAVE') score = 40;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Status Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Farm Score */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
          <div className="w-20 h-20 mb-3">
            <CircularProgressbar 
              value={score} 
              text={`${score}`} 
              styles={buildStyles({
                textSize: '28px',
                pathColor: score > 70 ? '#10b981' : score > 50 ? '#f59e0b' : '#ef4444',
                textColor: '#0f172a',
                trailColor: '#f1f5f9'
              })} 
            />
          </div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Farm Health</h3>
        </div>

        {/* Weather */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-5 rounded-3xl text-white shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <CloudRain className="w-6 h-6 opacity-80" />
            <span className="text-xs font-bold px-2 py-1 bg-white/20 rounded-full">{weather.summary}</span>
          </div>
          <div>
            <p className="text-3xl font-black">{weather.temp}°C</p>
            <p className="text-blue-100 text-sm font-medium">Rain Prob: {weather.rainProb}%</p>
          </div>
        </div>

        {/* Disease Risk */}
        <div className={`p-5 rounded-3xl shadow-sm flex flex-col justify-between ${
          diseaseRisk.level === 'High' ? 'bg-rose-50 border border-rose-200 text-rose-900' :
          diseaseRisk.level === 'Medium' ? 'bg-amber-50 border border-amber-200 text-amber-900' :
          'bg-emerald-50 border border-emerald-200 text-emerald-900'
        }`}>
          <div className="flex justify-between items-start">
            <Bug className="w-6 h-6 opacity-70" />
            <span className="text-2xl font-black">{diseaseRisk.percentage}%</span>
          </div>
          <div>
            <h3 className="text-sm font-bold opacity-90">{diseaseRisk.diseaseName}</h3>
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">{diseaseRisk.level} Risk</p>
          </div>
        </div>

        {/* Crop Stage */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <Sprout className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{farm.crop}</h3>
            <p className="text-sm font-medium text-slate-500">{farm.stage} Stage</p>
          </div>
        </div>
      </div>

      {/* KILLER FEATURE: WHAT SHOULD I DO TODAY? */}
      <div className="bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-800">
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              What Should I Do Today?
            </h2>
            <p className="text-slate-400 text-sm">AI Daily Action Plan</p>
          </div>
          <button 
            onClick={fetchPlan}
            disabled={isLoadingPlan}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoadingPlan ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {isLoadingPlan ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="text-slate-400 font-medium">AI is generating your customized plan...</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-emerald max-w-none prose-p:leading-relaxed prose-headings:text-white">
              <Markdown>{aiPlan || 'Failed to generate plan. Please try again.'}</Markdown>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
