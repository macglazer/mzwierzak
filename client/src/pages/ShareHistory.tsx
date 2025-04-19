import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShareHistory: React.FC = () => {
  const navigate = useNavigate();
  const [accessTime, setAccessTime] = useState('30 minut');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => navigate(-1)} className="text-sm text-blue-600 mb-4">&larr; Udostępnij historię</button>

      <div className="bg-white p-6 rounded-lg shadow text-center">
        <div className="w-32 h-32 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <span className="text-4xl">🔵</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Ten kod QR umożliwia dostęp do historii medycznej zwierzaka
        </p>
        <p className="text-gray-500 text-xs mb-6">Ważny przez: {accessTime}</p>

        <div className="text-left space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wybierz zwierzaka:</label>
            <select className="w-full border-gray-300 rounded-md" defaultValue="Burek (Pies, Labrador)">
              <option>Burek (Pies, Labrador)</option>
              <option>Mruczek (Kot, Europejski)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zakres dostępu:</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" checked readOnly className="mr-2" /> Historia medyczna
              </label>
              <label className="flex items-center">
                <input type="checkbox" checked readOnly className="mr-2" /> Leki
              </label>
              <label className="flex items-center">
                <input type="checkbox" checked readOnly className="mr-2" /> Dokumenty medyczne
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Czas dostępu:</label>
            <select
              className="w-full border-gray-300 rounded-md"
              value={accessTime}
              onChange={(e) => setAccessTime(e.target.value)}
            >
              <option>30 minut</option>
              <option>1 godzina</option>
              <option>3 godziny</option>
            </select>
          </div>

          <button className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-medium">Odśwież kod QR</button>
          <button className="w-full mt-2 py-3 text-blue-600 font-medium">Udostępnij link</button>
        </div>
      </div>
    </div>
  );
};

export default ShareHistory;
