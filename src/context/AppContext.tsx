import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, SimulationEvent, AppLanguage } from '../types';

interface AppContextType extends AppState {
  setLanguage: (lang: AppLanguage) => void;
  simulateEvent: (event: SimulationEvent) => void;
}

const defaultState: AppState = {
  language: 'en',
  simulation: 'NONE',
  farm: {
    crop: 'Tomato',
    stage: 'Flowering',
    area: 2,
    location: 'Coimbatore, Tamil Nadu'
  },
  weather: {
    temp: 28,
    humidity: 65,
    rainProb: 12,
    wind: 14,
    summary: 'Partly Cloudy'
  },
  diseaseRisk: {
    level: 'Low',
    percentage: 15,
    diseaseName: 'Tomato Leaf Blight'
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  const setLanguage = (language: AppLanguage) => {
    setState(prev => ({ ...prev, language }));
  };

  const simulateEvent = (event: SimulationEvent) => {
    let newState = { ...state, simulation: event };
    
    switch (event) {
      case 'HEAVY_RAIN':
        newState.weather = { temp: 24, humidity: 92, rainProb: 98, wind: 22, summary: 'Heavy Rain Expected' };
        newState.diseaseRisk = { level: 'Medium', percentage: 55, diseaseName: 'Fungal Infection' };
        break;
      case 'DISEASE_OUTBREAK':
        newState.diseaseRisk = { level: 'High', percentage: 88, diseaseName: 'Early Blight' };
        break;
      case 'HEAT_WAVE':
        newState.weather = { temp: 42, humidity: 20, rainProb: 0, wind: 8, summary: 'Severe Heat Wave' };
        break;
      case 'WATER_SHORTAGE':
        newState.weather = { temp: 34, humidity: 40, rainProb: 2, wind: 10, summary: 'Dry Conditions' };
        break;
      case 'NONE':
        newState = { ...newState, weather: defaultState.weather, diseaseRisk: defaultState.diseaseRisk };
        break;
    }
    
    setState(newState);
  };

  return (
    <AppContext.Provider value={{ ...state, setLanguage, simulateEvent }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
