import { Timestamp } from "firebase/firestore/lite";
import React, { createContext, useContext, useState } from "react";

export interface SharedLists {
    listId: string
}

export interface SharedUsers {
    shared_user_id: string
}

export interface UserData {
    uid: string
    email: string
    first_name?: string
    created_at?: Timestamp
    shared_lists?: SharedLists[]
}

export interface ListData {
    list_id: string
    list_name: string
    owner_id: string
    shared_with: SharedUsers[]
}

// Define the type for the context
interface AuthContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
;
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider, AuthContext }