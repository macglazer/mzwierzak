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
import AddPet from './pages/AddPet';
import MedicalHistory from './pages/MedicalHistory';

// Komponent chronionej ścieżki
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  

  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }
  
  return true ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Publiczne ścieżki */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Przekierowanie z głównej strony na /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Chronione ścieżki */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/pets/:id" element={
        <ProtectedRoute>
          <PetProfile />
        </ProtectedRoute>
      } />
      
      <Route path="/pets/add" element={
        <ProtectedRoute>
          <AddPet />
        </ProtectedRoute>
      } />
      
      <Route path="/scan" element={
        <ProtectedRoute>
          <ScanDocument />
        </ProtectedRoute>
      } />
      
      <Route path="/share" element={
        <ProtectedRoute>
          <ShareHistory />
        </ProtectedRoute>
      } />
      
      <Route path="/history" element={
        <ProtectedRoute>
          <MedicalHistory />
        </ProtectedRoute>
      } />
      
      {/* Domyślne przekierowanie dla nieznanych ścieżek */}
      <Route path="*" element={<Navigate to="/login" replace />} />
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