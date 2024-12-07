import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ViewProvider } from './features/HomePage/ViewProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <ViewProvider>
      <App />
    </ViewProvider>
)
