'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as CT from '@/utils/global-config/configTypes';

// Crea un React Context con todos elementos de la configuración (sacados de localStorage)
const ConfigContext = createContext<CT.ConfigContextType | undefined>(undefined);

export const useConfigContext = () => {
  const context = useContext(ConfigContext);
  if (!context) { throw new Error('useConfigContext debe usarse dentro de ConfigProvider'); }
  return context;
};

// Crea un componente que utiliza el React Context creado antes, para usarlo como proveedor
// Cuando se actualiza alguna variable, se guarda inmediatamente en localStorage desde aca
export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [visual, setVisual] = useState<CT.VisualMap>(CT.VisualDefault);
  const [ftu, setFtu] = useState<CT.FtuMap>(CT.FtuDefault);
  const [sound, setSound] = useState<CT.SoundMap>(CT.SoundDefault);

  // Carga la configuración almacenada en localStorage, si es que la hay
  useEffect(() => {
    const initVisual = localStorage.getItem('visual');
    const initFtu = localStorage.getItem('ftu');
    const initSound = localStorage.getItem('sound');
    setVisual(initVisual !== null ? JSON.parse(initVisual) : CT.VisualDefault);
    setFtu(initFtu !== null ? JSON.parse(initFtu) : CT.FtuDefault);
    setSound(initSound !== null ? JSON.parse(initSound) : CT.SoundDefault);
  }, []);

  function createHandleSet<Type>(key: string, setState: React.Dispatch<React.SetStateAction<Type>>) {
    return <Key extends keyof Type>(prop: Key, value: Type[Key]) => {
      setState((prev: Type) => {
        const updated = { ...prev, [prop]: value };
        localStorage.setItem(key, JSON.stringify(updated));
        return updated;
      });
    };
  }

  const handleSetVisual = createHandleSet<CT.VisualMap>('visual', setVisual);
  const handleSetFtu = createHandleSet<CT.FtuMap>('ftu', setFtu);
  const handleSetSound = createHandleSet<CT.SoundMap>('sound', setSound);

  return (
    <ConfigContext.Provider value={{
        visual,
        handleSetVisual,
        ftu,
        handleSetFtu,
        sound,
        handleSetSound,
    }}>
      {children}
    </ConfigContext.Provider>
  );
};