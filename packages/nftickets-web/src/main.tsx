import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ScannerPage from './pages/ScannerPage.tsx'
import QRTestPage from './pages/QRTestPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/scanner',
    element: <ScannerPage />
  },
  {
    path: '/test-qr',
    element: <QRTestPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
