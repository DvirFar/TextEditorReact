import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import AuthProvider from './components/auth/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider />
  </StrictMode>,
)