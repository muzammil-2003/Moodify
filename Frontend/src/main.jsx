import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './app.routes'
import { AuthProvider } from './features/auth/auth.context'
import { SongContextProvider } from './features/Expression/song.context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  </StrictMode>,
)
