
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { BrowserRouter } from "react-router";
import AuthProvider from './Components/Provider/AuthProvider.jsx';
import {
  
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
   <App />
   </AuthProvider>
    </QueryClientProvider>
 
  </BrowserRouter>
)
