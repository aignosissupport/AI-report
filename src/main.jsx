import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { AppProvider } from './components/aignosisintegration/AppContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <AppProvider>
    <App />
    </AppProvider>
    </HelmetProvider>
  </StrictMode>,
)