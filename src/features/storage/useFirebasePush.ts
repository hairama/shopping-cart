// useFirebasePush.ts
import { ref, push } from 'firebase/database';
import { database } from './firebase'

//export function useFirebasePush(path: string, data: any) {
export function useFirebasePush(path: string, data: any) {
  const pushData = async () => {
   
    const dataRef = ref(database, path)

    try {
      //await push(dataRef, data);
      const newRef = await push(dataRef, data)
      return newRef.key
      
    } catch (error) {
      console.error('Error pushing data: ', error);
    }
  };

  return pushData;
}
