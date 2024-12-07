import React, { useState, createContext, ReactNode, useContext } from 'react';

// Define the object structure for the current list
export interface CurrentListObject {
  listId: string;
  listName: string;
}

// Update context type to use the object structure
export interface CurrentListTypes {
  currentList: CurrentListObject;
  setCurrentList: React.Dispatch<React.SetStateAction<CurrentListObject>>;
}

// Create the context with an undefined initial value
const CurrentListContext = createContext<CurrentListTypes | undefined>(undefined);

// ListProvider component
interface ListProviderProps {
  children: ReactNode; // Correctly typing children
}

function CurrentListProvider({ children }: ListProviderProps) {
  // Update the state to store a CurrentListObject
  const [currentList, setCurrentList] = useState<CurrentListObject>({
    listId: "",
    listName: "",
  });

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
    throw new Error('useCurrentList must be used within a CurrentListProvider');
  }
  return context;
}

export { CurrentListProvider, useCurrentList };
