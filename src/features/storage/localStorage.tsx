// utils/storage.ts
export const saveEmailToStorage = (email: string) => {
    localStorage.setItem('userEmail', email);
  };
  
  export const getEmailFromStorage = (): string | null => {
    return localStorage.getItem('userEmail');
  };
  
  export const removeEmailFromStorage = () => {
    localStorage.removeItem('userEmail');
  };
  