
import React, { createContext, useContext, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { AuthContext, UserData } from "../Auth/AuthProvider"
import { ShoppingListItem } from "../../types/ShoppingListTypes";


// Define the type for the context
interface ItemContextType {
  
}

const [shoppingListInDb, setShoppingListInDb] = useState<ShoppingListItem[]>([])

// Create the context with a default value
//const ShoppingContext = createContext<AuthContextType | undefined>(undefined);


// Custom hook for using the AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider }