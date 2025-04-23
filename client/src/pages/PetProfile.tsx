import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

const PetProfile: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => navigate('/dashboard')} className="flex items-center text-sm text-blue-600 mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" /> Profil zwierzaka
      </button>
      
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
          <img 
                  src="/images/panPluto.jpg" 
                  alt="Burek" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback do szarego placeholdera jeśli obrazek się nie załaduje
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.classList.add('bg-gray-200');
            }}
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Pluto</h2>
        <p className="text-sm text-gray-500">Pies, Labrador, 4 lata</p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-100 text-center py-3 rounded">
            <p className="text-xs text-gray-500">Waga</p>
            <p className="font-semibold text-gray-700">25 kg</p>
          </div>
          <div className="bg-green-100 text-center py-3 rounded">
            <p className="text-xs text-gray-500">Chip</p>
            <p className="font-semibold text-gray-700">123456789</p>
          </div>
          <div className="bg-yellow-100 text-center py-3 rounded">
            <p className="text-xs text-gray-500">Data urodzenia</p>
            <p className="font-semibold text-gray-700">15.05.2012</p>
          </div>
          <div className="bg-purple-100 text-center py-3 rounded">
            <p className="text-xs text-gray-500">Płeć</p>
            <p className="font-semibold text-gray-700">Samiec</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <button 
          onClick={() => navigate('/history')}
          className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow"
        >
          <span>Historia medyczna</span>
          <span className="text-sm text-gray-500">3 wpisy &gt;</span>
        </button>
        <button 
          onClick={() => navigate('/medications')}
          className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow"
        >
          <span>Leki</span>
          <span className="text-sm text-gray-500">2 aktywne &gt;</span>
        </button>
        <button 
          onClick={() => navigate('/appointments')}
          className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow"
        >
          <span>Wizyty</span>
          <span className="text-sm text-gray-500">2 zaplanowane &gt;</span>
        </button>
        <button 
          onClick={() => navigate('/share')}
          className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow"
        >
          <span>Udostępnij historię</span>
          <span className="text-sm text-gray-500">Dla weterynarza &gt;</span>
        </button>
      </div>
      <Footer/>
    </div>
  );
};

export default PetProfile;