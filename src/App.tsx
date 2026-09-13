import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CropHealth from './pages/CropHealth';
import Markets from './pages/Markets';
import AgriVoice from './pages/AgriVoice';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crop-health" element={<CropHealth />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/voice" element={<AgriVoice />} />
        <Route path="/map" element={<div className="p-4 text-center">Interactive Map Module (Coming Soon)</div>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
