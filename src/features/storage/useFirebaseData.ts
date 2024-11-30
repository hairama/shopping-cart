// useFirebaseData.ts
import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, get } from 'firebase/database';
import { database } from './firebase';
import { ShoppingListItem } from '../../types/ShoppingListTypes';

interface FirebaseShoppingItem {
  name: string
  status: string
}

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
export function useShoppingList(list: string) {
  let objArray = []
  const transformData = useCallback((snapshotData: SnapshotData) => {
    //console.log("Snapshot data:", JSON.stringify(snapshotData, null, 2));
   //console.log(`Object entries returns: ${Object.entries(snapshotData)}`)
    let objEntries = Object.entries(snapshotData || {})
    
    for (let i = 0; i < objEntries.length; i++) {
      let currentItem = objEntries[i]
      let currentItemID = currentItem[0]
      let currentItemName = currentItem[1].name
      let currentItemStatus = currentItem[1].status
      // console.log(` current item ${currentItem}
      //   currentItemID ${currentItemID}
      //     currentItemValue ${currentItemName}
      //     currentItemStatus ${currentItemStatus}`)
      const newItem:ShoppingListItem = {
        id: currentItemID,
        name: currentItemName,
        status: currentItemStatus || 'on_shopping_list'
      }
      objArray.push(newItem)
    
    }
    console.log(objArray) 
    return objArray
    // let objArray = objEntries.map((stuff) => {
      
    // }))
    // return Object.entries(snapshotData || {}).map(([id, item]) => ({
    //   id,
    //   name: item.name,
    //   status: item.status || 'on_shopping_list', // Default status if none provided
    // }));
  }, []);
  
  return useFirebaseData<ShoppingListItem[]>(`lists/${list}/items/`, transformData);
}


type UserLists = Record<string, string>

export function useUserLists(uid: string) {
  const transformData = useCallback((snapshotData: UserLists) => {
    return Object.entries(snapshotData || {}).map(([id, list_name]) => ({
      id,
      list_name,
      // //@ts-ignore
    }));
  }, []);

  return useFirebaseData(`users/${uid}/shared_lists/`, transformData);
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
