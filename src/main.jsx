import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Invoice from './components/InvoiceGenerate/Invoice.jsx'
const queryClient = new QueryClient()

const router= createBrowserRouter([
  {
    path:'/',
    element:<App></App>,
    
  },
  {
    path:'invoice/:id',
    element:<Invoice></Invoice>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        
      </RouterProvider>
    </QueryClientProvider>

  </React.StrictMode>,
)
