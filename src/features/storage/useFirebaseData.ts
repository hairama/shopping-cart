// useFirebaseData.ts
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';

export function useFirebaseData() {
  const [data, setData] = useState<any>(null);
 
  useEffect(() => {
    const dataRef = ref(database, 'shopping-list');

    const unsubscribe = onValue(dataRef, (snapshot) => {
        const shoppingListItemArrays = Object.entries(snapshot.val() || {})
        const shoppingListObjectArray = shoppingListItemArrays.map((item) => {
          return {
            id : item[0],
            // @ts-ignore
            name: item[1].name,
            // @ts-ignore
            status: item[1].status
          }  
        })
      setData(shoppingListObjectArray)

      })

    // Cleanup listener on unmount
    return () => {
      unsubscribe();
    };
  }, ['shoppingList']);

  return data;  // Return the fetched data
}
