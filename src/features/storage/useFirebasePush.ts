// useFirebasePush.ts
import { ref, push } from 'firebase/database';
import { database } from './firebase'

//export function useFirebasePush(path: string, data: any) {
export function useFirebasePush(path: string, data: any) {
  const pushData = async () => {
   
    const dataRef = ref(database, path)
    // const db = getDatabase();
    // const dataRef = ref(db, path);

    try {
      await push(dataRef, data);
      // console.log('Data pushed successfully');
      const newRef = await push(dataRef, data)
      //console.log(newRef.key)
      return newRef.key
      
    } catch (error) {
      console.error('Error pushing data: ', error);
    }
  };

  return pushData;
}
