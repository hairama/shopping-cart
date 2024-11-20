import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'; 

const appSettings = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://shopping-cart-af0da-default-rtdb.firebaseio.com/",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

console.log('Database URL:', import.meta.env.VITE_FIREBASE_DATABASE_URL);
console.log('authDomain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);


const app = initializeApp(appSettings)
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
