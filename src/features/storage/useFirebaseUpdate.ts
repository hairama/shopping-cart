// useFirebaseUpdate.ts
import { ref, update, get } from 'firebase/database';
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

// Hook to clean up shared lists for all users when a list is deleted.
export function useCleanupSharedList() {
  /**
   * Updates or removes the listID from all users' shared_lists.
   * @param listID The ID of the list to be removed or updated.
   * @param newListName (Optional) New name for the list. If null, the list will be removed.
   */
  async function cleanupSharedList(listID: string, newListName?: string) {
    try {
      // Step 1: Get the user IDs from `/lists/listID/shared_with/userIDs`
      const sharedWithRef = ref(database, `/lists/${listID}/shared_with/`);
      const sharedWithSnapshot = await get(sharedWithRef);
      if (!sharedWithSnapshot.exists()) {
        throw new Error(`No users found in /lists/${listID}/shared_with/`);
      }

      const userIDs: Record<string, boolean> = sharedWithSnapshot.val();

      // Step 2: Create updates object to remove or update the listID for each user
      const updates: Record<string, any> = {};
      Object.keys(userIDs).forEach((uid) => {
        const listPath = `/users/${uid}/shared_lists/${listID}`;
        if (newListName) {
          updates[listPath] = newListName; // Update the list name
        } else {
          updates[listPath] = null; // Remove the list
        }
      });

      // Step 3: Perform the update in Firebase
      await update(ref(database), updates);

      console.log(
        newListName
          ? `List ${listID} updated for all users`
          : `List ${listID} removed from all users' shared_lists`
      );
    } catch (error) {
      console.error("Error cleaning up shared lists:", error);
    }
  }

  return cleanupSharedList;
}


