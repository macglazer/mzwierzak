import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Importuj strony
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PetProfile from './pages/PetProfile';
import ShareHistory from './pages/ShareHistory';
import ScanDocument from './pages/ScanDocument';

// Komponent chronionej ścieżki
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
  <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/pets/:id" element={<PetProfile />} />
      <Route path="/scan" element={<ScanDocument />} />
      <Route path="/share" element={<ShareHistory />} />
      <Route path="*" element={<Login />} /> {/* lub <Navigate to="/login" /> jeśli masz zaimportowane */}
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="max-w-md mx-auto">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;