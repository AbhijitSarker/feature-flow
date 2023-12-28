import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './routes/Routes';
import './index.css';
import AuthProvider from './providers/AuthProvider';

import {
  RouterProvider,
} from "react-router-dom";


import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

    </AuthProvider>

  </React.StrictMode>,
)
