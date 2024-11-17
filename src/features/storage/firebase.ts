// firebase.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase config (use your actual Firebase config here)
const appSettings = {
  databaseURL: 'https://realtime-database-69249-default-rtdb.firebaseio.com/'
};

// Initialize Firebase (Only once)
const app = initializeApp(appSettings);
const database = getDatabase(app);

// Export the database instance for use in other parts of the app
export { database };
