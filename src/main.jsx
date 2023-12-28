import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './routes/Routes';
import './index.css';
import AuthProvider from './context/AuthProvider';

import {
  RouterProvider,
} from "react-router-dom";


import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { FeatureProvider } from './context/FeatureProvider';

// Create a client
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <FeatureProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </FeatureProvider>
    </AuthProvider>

  </React.StrictMode>,
)
