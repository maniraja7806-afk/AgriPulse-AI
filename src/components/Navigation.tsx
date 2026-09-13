import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Leaf, LineChart, Mic, Map } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navigation() {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Crop Health', path: '/crop-health', icon: Leaf },
    { name: 'Markets', path: '/markets', icon: LineChart },
    { name: 'AgriVoice', path: '/voice', icon: Mic },
    { name: 'Map', path: '/map', icon: Map },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-2 py-2 flex justify-around items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all",
                isActive 
                  ? "text-emerald-700 bg-emerald-50 font-medium" 
                  : "text-slate-500 hover:text-emerald-600 hover:bg-slate-50"
              )
            }
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] leading-tight text-center">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-full p-4 z-10">
        <div className="flex items-center gap-3 px-2 mb-8 mt-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
            <Leaf className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-600">
            AgriPulse AI
          </span>
        </div>
        
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
                  isActive 
                    ? "text-emerald-800 bg-emerald-50 font-medium border border-emerald-100" 
                    : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50"
                )
              }
            >
              <item.icon className={cn("w-5 h-5", "transition-colors")} />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>
        
        <div className="mt-auto p-4 bg-emerald-900 rounded-2xl text-emerald-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-800 rounded-full blur-2xl opacity-50"></div>
          <h4 className="font-semibold text-sm mb-1">Need help?</h4>
          <p className="text-xs text-emerald-200/80 mb-3">Ask AgriVoice or contact Agri Officer.</p>
          <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-xs font-medium transition-colors">
            Contact Support
          </button>
        </div>
      </nav>
    </>
  );
}
