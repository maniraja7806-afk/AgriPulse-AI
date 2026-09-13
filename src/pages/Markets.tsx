import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, MapPin, Search } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { day: 'Mon', price: 26 },
  { day: 'Tue', price: 28 },
  { day: 'Wed', price: 29 },
  { day: 'Thu', price: 27 },
  { day: 'Fri', price: 30 },
  { day: 'Sat', price: 32 },
];

export default function Markets() {
  const [markets, setMarkets] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/market')
      .then(r => r.json())
      .then(setMarkets)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Market Intelligence</h2>
          <p className="text-sm text-slate-500">Live prices and AI trend predictions</p>
        </div>
        
        <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search crop or market..." 
            className="bg-transparent border-none outline-none text-sm w-48"
          />
        </div>
      </div>

      {/* Best Market AI Feature */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-1 shadow-lg">
        <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold text-lg">AI "Best Market to Sell"</h3>
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">AI ESTIMATE</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Market A (Coimbatore)</p>
              <p className="text-2xl font-bold text-white mb-1">₹32<span className="text-sm text-slate-400 font-normal">/kg</span></p>
              <p className="text-sm text-slate-400">- ₹3/kg transport</p>
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-sm font-medium text-emerald-400">Net: ₹29/kg</p>
              </div>
            </div>
            
            <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">RECOMMENDED</div>
              <p className="text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">Market B (Erode)</p>
              <p className="text-2xl font-bold text-white mb-1">₹35<span className="text-sm text-emerald-200/60 font-normal">/kg</span></p>
              <p className="text-sm text-emerald-200/80">- ₹4/kg transport</p>
              <div className="mt-3 pt-3 border-t border-emerald-500/20">
                <p className="text-sm font-bold text-emerald-400">Net: ₹31/kg</p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-slate-300 text-sm leading-relaxed">
                "Market B provides the higher estimated net return despite slightly higher transportation costs. Demand is surging locally."
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {markets.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{item.crop}</h3>
                <p className="text-sm text-slate-500">Current average price</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-slate-900">₹{item.current}/kg</p>
                <div className={`flex items-center justify-end gap-1 text-sm font-medium ${item.trend === 'Increasing' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {item.trend === 'Increasing' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {item.trend}
                </div>
              </div>
            </div>

            <div className="h-32 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id={`colorPrice${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={item.trend === 'Increasing' ? '#10b981' : '#f43f5e'} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={item.trend === 'Increasing' ? '#10b981' : '#f43f5e'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip />
                  <Area type="monotone" dataKey="price" stroke={item.trend === 'Increasing' ? '#10b981' : '#f43f5e'} fillOpacity={1} fill={`url(#colorPrice${idx})`} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nearby Markets</h4>
              {item.nearby.map((m: any, i: number) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{m.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">₹{m.price}/kg</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
