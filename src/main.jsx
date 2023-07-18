import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Invoice from './components/InvoiceGenerate/Invoice.jsx'
import Home from './pages/Home/Home/Home.jsx'
import Main from './Layout/Main.jsx'
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'invoice/:id',
        element: <Invoice></Invoice>
      }
    ]

  },
 
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className='w-[90%] mx-auto'>
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>

  </React.StrictMode>,
)
