import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">mZwierzak</h1>
        <button className="text-2xl font-bold text-gray-600">&#9776;</button>
      </header>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Twoje zwierzaki</h2>
        <div className="space-y-2">
          <div onClick={() => navigate('/pets/burek')} className="bg-white p-4 rounded-lg shadow cursor-pointer">
            <p className="text-gray-800 font-semibold">Burek</p>
            <p className="text-sm text-gray-500">Pies, Labrador, 4 lata</p>
          </div>
          <div onClick={() => navigate('/pets/mruczek')} className="bg-white p-4 rounded-lg shadow cursor-pointer">
            <p className="text-gray-800 font-semibold">Mruczek</p>
            <p className="text-sm text-gray-500">Kot, Europejski, 2 lata</p>
          </div>
          <button className="w-full text-blue-600 border border-dashed border-blue-400 py-2 rounded-lg hover:bg-blue-50 mt-2">
            + Dodaj zwierzaka
          </button>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Nadchodzące wydarzenia</h2>
        <div className="space-y-2">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-blue-600 font-medium">Szczepienie - Burek</p>
            <p className="text-sm text-gray-500">10.04.2025, 12:00</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-red-500 font-medium">Lek: Antybiotyk - Burek</p>
            <p className="text-sm text-gray-500">Dzisiaj, 20:00</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4">
        <button onClick={() => navigate('/scan')} className="flex flex-col items-center justify-center bg-blue-100 text-blue-700 py-4 rounded-lg shadow">
          <span className="text-lg font-semibold">📷</span>
          <span className="text-sm">Skanuj dokument</span>
        </button>
        <button onClick={() => navigate('/share')} className="flex flex-col items-center justify-center bg-green-100 text-green-700 py-4 rounded-lg shadow">
          <span className="text-lg font-semibold">� QR</span>
          <span className="text-sm">Udostępnij</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-purple-100 text-purple-700 py-4 rounded-lg shadow">
          <span className="text-lg font-semibold">📄</span>
          <span className="text-sm">Historia</span>
        </button>
      </section>
    </div>
  );
};

export default Dashboard;