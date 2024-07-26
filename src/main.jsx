import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { QueryClient } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';



// const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
