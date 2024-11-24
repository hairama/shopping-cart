import React, { useState, createContext, ReactNode, useContext } from 'react';

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
  const [currentView, setCurrentView] = useState<string>('list-mgmt-page');

  return (
    <CurrentViewContext.Provider value={{ currentView, setCurrentView }}>
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


  /*
    What is needed for global context?
    1. Log in state
    2. User info (firebase permissions)
    3. current-view 
    4. Related types?
    5. 

/ const ShoppingContext = React.createContext<ShoppingContextValues | undefined>(undefined)
  */