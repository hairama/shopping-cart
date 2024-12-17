import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ViewProvider } from './features/HomePage/ViewProvider.tsx'
import { AuthProvider} from "./features/Auth/AuthProvider"
//import LandingPage from './features/HomePage/LandingPage.tsx'

// src/index.ts (or index.js)
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then((registration) => {
//         console.log('Service Worker registered with scope:', registration.scope);
//       })
//       .catch((error) => {
//         console.log('Service Worker registration failed:', error);
//       });
//   });
// }

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.ready.then(registration => {
//     registration.unregister();
//   });
// }


// main.ts or main.js
document.title = import.meta.env.VITE_APP_NAME || "DefaultApp";


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ViewProvider>
        <App />
    </ViewProvider>
  </AuthProvider> 
)
