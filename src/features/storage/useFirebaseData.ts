// useFirebaseData.ts
import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, get } from 'firebase/database';
import { database } from './firebase';
// import { UserData } from '../Auth/AuthProvider'
import { ShoppingListItem, FirebaseShoppingItem } from '../../types/ShoppingListTypes';


type SnapshotData = Record<string, FirebaseShoppingItem>

// Generic Hook
export function useFirebaseData<T>(path: string, transformData?: (snapshotData: any) => T) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dataRef = ref(database, path);

    const unsubscribe = onValue(dataRef, (snapshot) => {
      console.log(`Data fetched for path: ${path}`, snapshot.val())
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
  
  //return useFirebaseData<UserData>(`users/${uid}`);
}

// Utility Hook for Shopping List

export function useShoppingList() {
  const transformData = useCallback((snapshotData: SnapshotData) => {
    return Object.entries(snapshotData || {}).map(([id, item]) => ({
      id,
      //@ts-ignore
      name: item.name,
      //@ts-ignore
      status: item.status || 'on_shopping_list',
    }));
  }, []);

  return useFirebaseData<ShoppingListItem[]>('shopping-list', transformData);
}





// // useFirebaseData.ts
// import { useState, useEffect } from 'react';
// import { ref, onValue } from 'firebase/database';
// import { database } from './firebase';



// export function useFirebaseData() {
//   const [data, setData] = useState<any>(null);
 
//   useEffect(() => {
//     const dataRef = ref(database, 'shopping-list');

//     const unsubscribe = onValue(dataRef, (snapshot) => {
//         const shoppingListItemArrays = Object.entries(snapshot.val() || {})
//         const shoppingListObjectArray = shoppingListItemArrays.map((item) => {
//           return {
//             id : item[0],
//             // @ts-ignore
//             name: item[1].name,
//             // @ts-ignore
//             status: item[1].status || 'on_shopping_list'
//           }  
//         })
//       setData(shoppingListObjectArray)

//       })

//     // Cleanup listener on unmount
//     return () => {
//       unsubscribe();
//     };
//   }, ['shoppingList']);

//   return data;  // Return the fetched data
// }
