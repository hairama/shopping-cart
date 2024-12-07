// useFirebaseRemove.ts
import { ref, remove } from 'firebase/database';
import { database } from './firebase';

export function useFirebaseRemove(path: string) {
  const removeData = async () => {
    const dataRef = ref(database, path);
    
    try {
      await remove(dataRef);  // Update data in Firebase
    console.log('Data removed successfully');
    } catch (error) {
      console.error('Error removing data: ', error);
    }
  };

  return removeData;
}