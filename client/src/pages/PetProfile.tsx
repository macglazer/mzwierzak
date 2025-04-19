import React from 'react';
import { useNavigate } from 'react-router-dom';

const PetProfile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => navigate(-1)} className="text-sm text-blue-600 mb-4">&larr; Profil zwierzaka</button>

      <div className="bg-white p-6 rounded-lg shadow text-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">Burek</h2>
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
            <p className="font-semibold text-gray-700">15.05.2021</p>
          </div>
          <div className="bg-purple-100 text-center py-3 rounded">
            <p className="text-xs text-gray-500">Płeć</p>
            <p className="font-semibold text-gray-700">Samiec</p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <button className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <span>Historia medyczna</span>
          <span className="text-sm text-gray-500">3 wpisy &gt;</span>
        </button>
        <button className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <span>Leki</span>
          <span className="text-sm text-gray-500">2 aktywne &gt;</span>
        </button>
        <button className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <span>Wizyty</span>
          <span className="text-sm text-gray-500">2 zaplanowane &gt;</span>
        </button>
        <button className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <span>Udostępnij historię</span>
          <span className="text-sm text-gray-500">Dla weterynarza &gt;</span>
        </button>
      </div>
    </div>
  );
};

export default PetProfile;
