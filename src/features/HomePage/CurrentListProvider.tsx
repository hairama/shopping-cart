import React, { useState, createContext, ReactNode, useContext } from 'react';

export interface CurrentListTypes {
  currentList: string;
  setCurrentList: React.Dispatch<React.SetStateAction<string>>;
}

// // Create the context with an undefined initial value
const CurrentListContext = createContext<CurrentListTypes | undefined>(undefined);

// ListProvider component
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

// Custom Hook to use the CurrentListContext
function useCurrentList() {
  const context = useContext(CurrentListContext);
  if (!context) {
    throw new Error('useCurrentList must be used within a ListProvider');
  }
  return context;
}

export { CurrentListProvider, useCurrentList };