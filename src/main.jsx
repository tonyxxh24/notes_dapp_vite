import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NotesProvider } from './contexts/NotesContext';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  // </StrictMode>,
)
