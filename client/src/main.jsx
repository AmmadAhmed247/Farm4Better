import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';


// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Auth & Notifications
import { AuthProvider } from './context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';

// Layout & Pages
import Layout from "./layouts/mainLayout.jsx"
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Marketplace from './pages/marketPlace.jsx';
import Contact from './pages/contact.jsx';
import FarmerDashboard from './pages/farmerDashboard.jsx';
import BuyerDashboard from './pages/BuyerDashboard.jsx';

import NotFound from './pages/Notfound.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import BecomeFarmer from './pages/becomeFarmer.jsx';
import AuthPage from './pages/Authpage.jsx';
// Create React Query client
const queryClient = new QueryClient();

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // This layout wraps all nested pages
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/marketplace", element: <Marketplace /> },
      { path: "/contact", element: <Contact /> },
      { path: "/farmer-dashboard", element: <FarmerDashboard /> },
      { path: "/buyer-dashboard", element: <BuyerDashboard /> },

      { path: "/become-farmer", element: <BecomeFarmer /> },
      { path: "/auth", element: <AuthPage /> },
      { path: "*", element: <NotFound /> },
      { path: "/product/:id", element: <ProductDetail /> },
    ],
  },
]);

// App wrapper component to provide auth context
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  );
};

// Render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
