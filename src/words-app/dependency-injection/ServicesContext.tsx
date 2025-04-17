import React, { createContext, useContext } from 'react';
import { IAudioManager } from '../../sound/IAudioManager';
import { IAppProducer } from "../app-data/store/IAppProducer.ts";
import { IAppDataInitializer } from "../app-data/store/IAppDataInitializer.ts";
import { INavigationManager } from "../navigation/INavigationManager.tsx";

export type Services = {
  audioManager: IAudioManager;
  appProducer: IAppProducer;
  appDataInitializer: IAppDataInitializer;
  navigationManager: INavigationManager;
};

const ServicesContext = createContext<Services | null>(null);

export const ServicesProvider = ({
                                   services,
                                   children,
                                 }: {
  services: Services;
  children: React.ReactNode;
}) => (
  <ServicesContext.Provider value={services}>
    {children}
  </ServicesContext.Provider>
);

export const useServices = (): Services => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};
