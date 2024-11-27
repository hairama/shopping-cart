import React, { useState, createContext, ReactNode, useContext } from 'react';

export interface CurrentViewTypes {
  currentList: string;
  setCurrentList: React.Dispatch<React.SetStateAction<string>>;
}

// // Create the context with an undefined initial value
const CurrentListContext = createContext<CurrentViewTypes | undefined>(undefined);

// ViewProvider component
interface ListProviderProps {
  children: ReactNode; // Correctly typing children
}

function CurrentListProvider({ children }: ListProviderProps) {
  const [currentList, setCurrentList] = useState<string>("");

  return (
    <CurrentListContext.Provider value={{ currentList, setCurrentList }}>
      {children}
    </CurrentListContext.Provider>
  );
}

// Custom Hook to use the CurrentViewContext
function useCurrentList() {
  const context = useContext(CurrentListContext);
  if (!context) {
    throw new Error('useCurrentView must be used within a ViewProvider');
  }
  return context;
}

export { CurrentListProvider, useCurrentList };


  /*
    What is needed for global context?
    1. Log in state
    2. User info (firebase permissions)
    3. current-view 
    4. Related types?
    5. 

/ const ShoppingContext = React.createContext<ShoppingContextValues | undefined>(undefined)
  */