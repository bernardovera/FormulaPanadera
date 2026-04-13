import { create } from 'zustand';

type EtapaLevado = {
  nombre: string;
  horas: number;
  mins: number;
  temp: number;
  tipo: string;
};

type CoccionData = {
  temp: number;
  tiempo: number;
  tempInterna: number;
  ovenType: string;
  vapor: boolean;
  notas: string;
  nombre: string;
};

type TimerStore = {
  levadoEtapa: EtapaLevado | null;
  coccionData: CoccionData | null;
  setLevadoEtapa: (etapa: EtapaLevado) => void;
  setCoccionData: (data: CoccionData) => void;
};

export const useTimerStore = create<TimerStore>((set) => ({
  levadoEtapa: null,
  coccionData: null,
  setLevadoEtapa: (etapa) => set({ levadoEtapa: etapa }),
  setCoccionData: (data) => set({ coccionData: data }),
}));