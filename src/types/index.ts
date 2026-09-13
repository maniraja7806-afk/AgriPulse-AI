export type AppLanguage = 'en' | 'ta';
export type SimulationEvent = 'NONE' | 'HEAVY_RAIN' | 'DISEASE_OUTBREAK' | 'HEAT_WAVE' | 'WATER_SHORTAGE' | 'MARKET_SPIKE';

export interface FarmState {
  crop: string;
  stage: string;
  area: number; // acres
  location: string;
}

export interface WeatherState {
  temp: number;
  humidity: number;
  rainProb: number;
  wind: number;
  summary: string;
}

export interface DiseaseRiskState {
  level: 'Low' | 'Medium' | 'High';
  percentage: number;
  diseaseName: string;
}

export interface AppState {
  language: AppLanguage;
  simulation: SimulationEvent;
  farm: FarmState;
  weather: WeatherState;
  diseaseRisk: DiseaseRiskState;
}
