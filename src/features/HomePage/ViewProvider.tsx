import React, { useState, createContext, ReactNode, useContext, useMemo } from 'react';

export interface CurrentViewTypes {
  currentView: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with an undefined initial value
const CurrentViewContext = createContext<CurrentViewTypes | undefined>(undefined);

// ViewProvider component
interface ViewProviderProps {
  children: ReactNode; // Correctly typing children
}

function ViewProvider({ children }: ViewProviderProps) {
  const [currentView, setCurrentView] = useState<string>('home-page');

  const value = useMemo(() => ({ currentView, setCurrentView}), [currentView, setCurrentView])
  
  return (
    <CurrentViewContext.Provider value={value}>
      {children}
    </CurrentViewContext.Provider>
  );
}

// Custom Hook to use the CurrentViewContext
function useCurrentView() {
  const context = useContext(CurrentViewContext);
  if (!context) {
    throw new Error('useCurrentView must be used within a ViewProvider');
  }
  return context;
}

export { ViewProvider, useCurrentView };