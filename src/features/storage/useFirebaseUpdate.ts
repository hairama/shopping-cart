// useFirebaseUpdate.ts
import { ref, update } from 'firebase/database';
import { database } from './firebase';

export function useFirebaseUpdate(path: string, data: any) {
  const updateData = async () => {
    const dataRef = ref(database, path);
    
    try {
      await update(dataRef, data);  // Update data in Firebase
    //   console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data: ', error);
    }
  };

  return updateData;
}
