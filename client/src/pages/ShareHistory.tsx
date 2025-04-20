import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';

const ShareHistory: React.FC = () => {
  const navigate = useNavigate();
  const [accessTime, setAccessTime] = useState('30 minut');
  const [selectedPet, setSelectedPet] = useState('Burek (Pies, Labrador)');
  const [accessScope, setAccessScope] = useState({
    history: true,
    medications: true,
    documents: true
  });

  // Generujemy unikalny token dostępu (w praktyce byłby generowany przez backend)
  const accessToken = "pet-access-" + Math.random().toString(36).substring(2, 10);
  
  // Dane, które będą zakodowane w QR
  const qrData = JSON.stringify({
    petId: selectedPet.split(' ')[0],
    scope: Object.keys(accessScope).filter(key => accessScope[key as keyof typeof accessScope]),
    expiry: accessTime,
    token: accessToken
  });

  const handleScopeChange = (scopeKey: keyof typeof accessScope) => {
    setAccessScope({
      ...accessScope,
      [scopeKey]: !accessScope[scopeKey]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4">
        <span className="mr-1">&larr;</span> Udostępnij historię
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="p-4 bg-white mx-auto mb-4 rounded-lg w-48 h-48 flex items-center justify-center shadow-sm">
          <QRCode value={qrData} size={150} />
        </div>
        
        <p className="text-gray-600 text-sm mb-2">
          Ten kod QR umożliwia dostęp do historii medycznej zwierzaka
        </p>
        <p className="text-gray-900 font-medium text-xs mb-6">Ważny przez: {accessTime}</p>

        <div className="text-left space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wybierz zwierzaka:</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedPet}
              onChange={(e) => setSelectedPet(e.target.value)}
            >
              <option>Burek (Pies, Labrador)</option>
              <option>Mruczek (Kot, Europejski)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zakres dostępu:</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={accessScope.history}
                  onChange={() => handleScopeChange('history')}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                /> 
                Historia medyczna
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={accessScope.medications}
                  onChange={() => handleScopeChange('medications')}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                /> 
                Leki
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={accessScope.documents}
                  onChange={() => handleScopeChange('documents')}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                /> 
                Dokumenty medyczne
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Czas dostępu:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={accessTime}
              onChange={(e) => setAccessTime(e.target.value)}
            >
              <option>30 minut</option>
              <option>1 godzina</option>
              <option>3 godziny</option>
              <option>24 godziny</option>
            </select>
          </div>

          <button className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Odśwież kod QR
          </button>
          <button className="w-full mt-2 py-3 text-blue-600 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Udostępnij link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareHistory;