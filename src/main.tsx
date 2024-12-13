import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ViewProvider } from './features/HomePage/ViewProvider.tsx'
//import LandingPage from './features/HomePage/LandingPage.tsx'

createRoot(document.getElementById('root')!).render(
    <ViewProvider>
      <App />
    </ViewProvider>
)
