import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, QrCode, FileText, Menu, Plus, Calendar, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">mZwierzak</h1>
        <button className="p-2 rounded hover:bg-gray-100">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </header>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Twoje zwierzaki</h2>
        <div className="space-y-2">
          <div onClick={() => navigate('/pets/burek')} className="bg-white p-4 rounded-lg shadow flex items-center cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-full mr-3"></div>
            <div>
              <p className="text-gray-800 font-semibold">Burek</p>
              <p className="text-sm text-gray-500">Pies, Labrador, 4 lata</p>
            </div>
          </div>
          <div onClick={() => navigate('/pets/mruczek')} className="bg-white p-4 rounded-lg shadow flex items-center cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-orange-100 rounded-full mr-3"></div>
            <div>
              <p className="text-gray-800 font-semibold">Mruczek</p>
              <p className="text-sm text-gray-500">Kot, Europejski, 2 lata</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center text-blue-600 border border-dashed border-blue-400 p-3 rounded-lg hover:bg-blue-50 transition-colors mt-2">
            <Plus className="w-5 h-5 mr-1" />
            <span>Dodaj zwierzaka</span>
          </button>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Nadchodzące wydarzenia</h2>
        <div className="space-y-2">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-blue-600 mr-2" />
              <div>
                <p className="text-gray-800 font-medium">Szczepienie - Burek</p>
                <p className="text-sm text-gray-500">10.04.2025, 12:00</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-red-500 mr-2" />
              <div>
                <p className="text-gray-800 font-medium">Lek: Antybiotyk - Burek</p>
                <p className="text-sm text-gray-500">Dzisiaj, 20:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4">
        <button 
          onClick={() => navigate('/scan')} 
          className="flex flex-col items-center justify-center bg-blue-100 text-blue-700 p-4 rounded-lg shadow hover:shadow-md hover:bg-blue-200 transition-all"
        >
          <Camera className="w-6 h-6 mb-1" />
          <span className="text-sm">Skanuj</span>
        </button>
        <button 
          onClick={() => navigate('/share')} 
          className="flex flex-col items-center justify-center bg-green-100 text-green-700 p-4 rounded-lg shadow hover:shadow-md hover:bg-green-200 transition-all"
        >
          <QrCode className="w-6 h-6 mb-1" />
          <span className="text-sm">Udostępnij</span>
        </button>
        <button 
          onClick={() => navigate('/history')}
          className="flex flex-col items-center justify-center bg-purple-100 text-purple-700 p-4 rounded-lg shadow hover:shadow-md hover:bg-purple-200 transition-all"
        >
          <FileText className="w-6 h-6 mb-1" />
          <span className="text-sm">Historia</span>
        </button>
      </section>
    </div>
  );
};

export default Dashboard;