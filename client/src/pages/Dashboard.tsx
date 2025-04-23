import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, QrCode, FileText, Menu, Plus, Calendar, Clock, Bell, X, Settings, LogOut } from 'lucide-react';
import Footer from '../components/Footer';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);

  const user = {
    name: "Maciej Glazer",
    email: "maciej.glazer@example.com"
  };

  const getInitials = (name: string) => {
    return name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 relative flex flex-col">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">petWallet</h1>
        <div className="flex items-center space-x-3">
          <div className="relative cursor-pointer">
            <Bell
              className="w-6 h-6 text-gray-600"
              onClick={() => setNotificationCount(0)}
            />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </div>
          <div
            className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {getInitials(user.name)}
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-lg z-10 transition-transform transform-gpu">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
                {getInitials(user.name)}
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <button className="flex items-center text-gray-700 hover:text-blue-600 w-full">
                  <Settings className="w-5 h-5 mr-3" />
                  Ustawienia
                </button>
              </li>
              <li>
                <button
                  className="flex items-center text-gray-700 hover:text-blue-600 w-full"
                  onClick={() => navigate('/login')}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Wyloguj
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Twoje zwierzaki</h2>
        <div className="space-y-2">
          <div onClick={() => navigate('/pets/burek')} className="bg-white p-4 rounded-lg shadow flex items-center cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
              <img
                src="/images/panPluto.jpg"
                alt="Burek"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.classList.add('bg-blue-100');
                }}
              />
            </div>
            <div>
              <p className="text-gray-800 font-semibold">Pluto</p>
              <p className="text-sm text-gray-500">Pies, Wyzeł, 10 lat</p>
            </div>
          </div>
          <div onClick={() => navigate('/pets/mruczek')} className="bg-white p-4 rounded-lg shadow flex items-center cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
              <img
                src="/images/melon.png"
                alt="Mruczek"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.classList.add('bg-orange-100');
                }}
              />
            </div>
            <div>
              <p className="text-gray-800 font-semibold">Melon</p>
              <p className="text-sm text-gray-500">Kot, Europejski, 2 lata</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/pets/add')}
            className="w-full flex items-center justify-center text-blue-600 border border-dashed border-blue-400 p-3 rounded-lg hover:bg-blue-50 transition-colors mt-2"
          >
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

      <section className="grid grid-cols-3 gap-4 mb-10">
        <button onClick={() => navigate('/scan')} className="flex flex-col items-center justify-center bg-blue-100 text-blue-700 p-4 rounded-lg shadow hover:shadow-md hover:bg-blue-200 transition-all">
          <Camera className="w-6 h-6 mb-1" />
          <span className="text-sm">Skanuj</span>
        </button>
        <button onClick={() => navigate('/share')} className="flex flex-col items-center justify-center bg-green-100 text-green-700 p-4 rounded-lg shadow hover:shadow-md hover:bg-green-200 transition-all">
          <QrCode className="w-6 h-6 mb-1" />
          <span className="text-sm">Udostępnij</span>
        </button>
        <button onClick={() => navigate('/history')} className="flex flex-col items-center justify-center bg-purple-100 text-purple-700 p-4 rounded-lg shadow hover:shadow-md hover:bg-purple-200 transition-all">
          <FileText className="w-6 h-6 mb-1" />
          <span className="text-sm">Historia</span>
        </button>
      </section>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-0" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Dashboard;
