import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AuthPage from './pages/Authpage';
import BuyerDashboard from './pages/BuyerDashboard';
import FarmerDashboard from './pages/farmerDashboard';

// Protected Route component
const ProtectedRoute = ({ children, userType }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/auth" />;
  if (userType && user.userType !== userType) {
    return <Navigate to={`/${user.userType}-dashboard`} />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" />
        <div>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected routes */}
            <Route
              path="/buyer-dashboard"
              element={
                <ProtectedRoute userType="buyer">
                  <BuyerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farmer-dashboard"
              element={
                <ProtectedRoute userType="farmer">
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Redirect root to auth if not logged in, or to appropriate dashboard if logged in */}
            <Route
              path="/"
              element={
                localStorage.getItem('user') ? (
                  <Navigate
                    to={`/${JSON.parse(localStorage.getItem('user')).userType}-dashboard`}
                  />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;