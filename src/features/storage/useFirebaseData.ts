// useFirebaseData.ts
import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, get } from 'firebase/database';
import { database } from './firebase';
import { ShoppingListItem } from '../../types/ShoppingListTypes';

interface FirebaseShoppingItem {
  id: string
  name: string
  status: string
}

type FirebaseShoppingItemId = Record<string, FirebaseShoppingItem>



// Generic Hook
export function useFirebaseData<T>(path: string, transformData?: (snapshotData: any) => T) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dataRef = ref(database, path);

    const unsubscribe = onValue(dataRef, (snapshot) => {
      //console.log(`Data fetched for path: ${path}`, snapshot.val())
      if (snapshot.exists()) {
        const snapshotData = snapshot.val();
        if (transformData) {
          setData(transformData(snapshotData));
        } else {
          setData(snapshotData);
        }
      } else {
        setError('No data available');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [path, transformData]);

  return { data, loading, error };
}

// Utility Hook for User Data
export function useUserData(uid: string) {
  const userDataTable = ref(database, `users/${uid}`)
  return get(userDataTable) 
}

// Utility hook for getting a user's shared_lists
type UserLists = Record<string, string>
export function useUserLists(uid: string) {
  const transformData = useCallback((snapshotData: UserLists) => {
    return Object.entries(snapshotData || {}).map(([id, list_name]) => ({
      id,
      list_name,
    }));
  }, []);

  return useFirebaseData(`users/${uid}/shared_lists/`, transformData);
}

// Utility Hook for Shopping List
export function useShoppingList(list: string) {
  const transformData = useCallback((snapshotData: FirebaseShoppingItemId) => {
    const objArray: ShoppingListItem[] = Object.entries(snapshotData || {}).map(([id, { name, status }]) => ({
      id,
      name,
      status: status || 'on_shopping_list',
    }));
    return objArray;
  }, []);

  return useFirebaseData<ShoppingListItem[]>(`lists/${list}/items/`, transformData);
}



// Utility hook for getting shared_with data from a list
export interface FirebaseListUser {
  id: string
  email: string
  userName: string
}
type FirebaseListUserId = Record<string, FirebaseListUser>
export function useListUsers(list: string) {
  const transformData = useCallback((snapshotData: FirebaseListUserId) => {
    const userArray: FirebaseListUser[] = Object.entries(snapshotData || {}).map(([id, { email, userName }]) => ({
      id,
      email,
      userName, 
    }));
    return userArray;
  }, []);

  return useFirebaseData<FirebaseListUser[]>(`lists/${list}/shared_with`, transformData);
}