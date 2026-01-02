import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { UserProvider } from '@/context/userContext'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider defaultTheme="dark" storageKey="inext-ui-theme">
        <App />
      </ThemeProvider>
    </UserProvider>
  </StrictMode>,
)
