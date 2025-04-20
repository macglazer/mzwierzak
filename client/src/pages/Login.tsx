import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);
    
  //   try {
  //     await login(email, password);
  //     navigate('/');
  //   } catch (err: any) {
  //     setError(err.response?.data?.message || 'Błąd logowania. Spróbuj ponownie.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!email || !password) return;

  
  //   const fakeUser = {
  //     name: email.split('@')[0],
  //     email,
  //     id: 'temp-id',
  //   };
  //   localStorage.setItem('user', JSON.stringify(fakeUser));
  //   localStorage.setItem('token', 'mock-token');
  
  //   navigate('/dashboard');
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    navigate('/dashboard');
  };

  return (
    <div className="bg-white min-h-screen p-6 flex flex-col justify-center">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">mZwierzak</h1>
        <p className="text-gray-600">Zaloguj się do swojego konta</p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type={showPassword ? "text" : "password"}
            placeholder="Hasło" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <button 
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-blue-600">
            Zapomniałeś hasła?
          </Link>
        </div>
      
        <button 
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-medium ${
            isLoading 
              ? 'bg-blue-400 text-white cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
      </form>
      
      <div className="text-center">
        <p className="text-gray-600">
          Nie masz konta? {' '}
          <Link to="/register" className="text-blue-600 font-medium">
            Zarejestruj się
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;