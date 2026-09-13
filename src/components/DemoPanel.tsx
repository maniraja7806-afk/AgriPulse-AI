import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, CloudRain, ThermometerSun, Droplets, LineChart, BugOff, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SimulationEvent } from '../types';

export default function DemoPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { simulation, simulateEvent } = useAppContext();

  const events: { id: SimulationEvent; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'NONE', label: 'Normal (Reset)', icon: Settings, color: 'text-slate-600' },
    { id: 'HEAVY_RAIN', label: 'Heavy Rain', icon: CloudRain, color: 'text-blue-500' },
    { id: 'HEAT_WAVE', label: 'Heat Wave', icon: ThermometerSun, color: 'text-rose-500' },
    { id: 'WATER_SHORTAGE', label: 'Water Shortage', icon: Droplets, color: 'text-amber-500' },
    { id: 'DISEASE_OUTBREAK', label: 'Disease Outbreak', icon: BugOff, color: 'text-purple-500' },
    { id: 'MARKET_SPIKE', label: 'Market Spike', icon: LineChart, color: 'text-emerald-500' },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 bg-slate-900 text-white p-3 rounded-full shadow-xl shadow-slate-900/20 hover:scale-105 transition-transform flex items-center gap-2 group"
      >
        <Settings className="w-6 h-6 animate-spin-slow" style={{ animationDuration: '4s' }} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-bold pr-1">
          SIMULATE EVENT
        </span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden"
            >
              <div className="bg-slate-900 px-5 py-4 flex items-center justify-between">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-400" />
                  HACKATHON DEMO MODE
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-5">
                <p className="text-sm text-slate-600 mb-4 font-medium">
                  Select an event to simulate real-time AI adaptations across the platform.
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {events.map((evt) => (
                    <button
                      key={evt.id}
                      onClick={() => {
                        simulateEvent(evt.id);
                        setIsOpen(false);
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        simulation === evt.id 
                          ? 'border-slate-900 bg-slate-50 shadow-inner' 
                          : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <evt.icon className={`w-8 h-8 mb-2 ${evt.color}`} />
                      <span className="text-xs font-bold text-slate-700 text-center leading-tight">
                        {evt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
