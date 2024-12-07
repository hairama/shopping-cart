// useFirebaseUpdate.ts
import { ref, update } from 'firebase/database';
import { database } from './firebase';
import { ShoppingListItem } from '../../types/ShoppingListTypes';

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

export function batchUpdateStatus(listId: string, itemsToUpdate: ShoppingListItem[], newStatus: string) {
  const updates: Record<string, any> = {};
  
  itemsToUpdate.forEach(item => {
    updates[`lists/${listId}/items/${item.id}/status`] = newStatus;
  });

  return update(ref(database), updates)
    .then(() => console.log('Batch update successful'))
    .catch(error => console.error('Batch update failed', error));
}

