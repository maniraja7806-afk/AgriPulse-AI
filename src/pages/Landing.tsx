import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Leaf, Activity, CloudSun, LineChart } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-emerald-200">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">AgriPulse <span className="text-emerald-600">AI</span></span>
          </div>
          <div className="flex gap-4">
            <Link to="/dashboard" className="px-6 py-2.5 rounded-lg font-bold text-slate-600 hover:text-slate-900 transition-colors">
              Login
            </Link>
            <Link to="/dashboard" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95">
              Start Farming
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm mb-6 border border-emerald-200">
              Smart India Hackathon 2026 🚀
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
              Know Your Farm.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Predict the Risk.<br/>
              </span>
              Grow Smarter.
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              An AI-powered farming decision platform that combines crop health, weather, irrigation, disease risk, and market intelligence in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard" className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg text-center transition-all shadow-xl shadow-slate-900/10">
                Open Dashboard
              </Link>
              <button className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-700 rounded-xl font-bold text-lg text-center transition-all">
                View Architecture
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 grid gap-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-slate-900">What should I do today?</h3>
                  <p className="text-sm text-slate-500">AI Daily Action Plan</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <CloudSun className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-start p-4 bg-blue-50 rounded-2xl text-blue-900">
                  <Activity className="w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold">Delay Irrigation</h4>
                    <p className="text-sm opacity-80 leading-relaxed">Heavy rain expected in the next 12 hours. Soil moisture is currently adequate for Tomato (Flowering stage).</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 bg-emerald-50 rounded-2xl text-emerald-900">
                  <LineChart className="w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold">Market Opportunity</h4>
                    <p className="text-sm opacity-80 leading-relaxed">Erode market price is up 12% today (₹35/kg). Consider harvesting mature crop.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
