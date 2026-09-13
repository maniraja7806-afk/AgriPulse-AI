import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import TopBar from '../components/TopBar';
import DemoPanel from '../components/DemoPanel';

export default function MainLayout() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Desktop Sidebar / Mobile Bottom Nav */}
      <Navigation />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 relative">
          <Outlet />
        </main>
      </div>

      <DemoPanel />
    </div>
  );
}
