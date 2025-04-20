import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ChevronDown } from 'lucide-react';

// Przykładowe dane historii medycznej
const medicalHistoryRecords = [
  { 
    id: '1', 
    type: 'vaccination', 
    date: '15.03.2025', 
    description: 'Szczepienie przeciw wściekliźnie', 
    pet: 'Burek' 
  },
  { 
    id: '2', 
    type: 'examination', 
    date: '10.01.2025', 
    description: 'Badanie krwi', 
    pet: 'Burek' 
  },
  { 
    id: '3', 
    type: 'treatment', 
    date: '05.12.2024', 
    description: 'Usunięcie kleszcza', 
    pet: 'Burek' 
  },
  { 
    id: '4', 
    type: 'treatment', 
    date: '18.03.2025', 
    description: 'Leczenie alergii skórnej', 
    pet: 'Mruczek' 
  },
];

const ShareHistory: React.FC = () => {
  const navigate = useNavigate();
  const [accessTime, setAccessTime] = useState('30 minut');
  const [selectedPet, setSelectedPet] = useState('Burek (Pies, Labrador)');
  const [sharingMode, setSharingMode] = useState<'all' | 'selected'>('all');
  const [showRecordSelector, setShowRecordSelector] = useState(false);
  
  // Stan dla checkboxów zakresu dostępu
  const [accessScope, setAccessScope] = useState({
    history: true,
    medications: true,
    documents: true
  });

  // Stan dla wyboru konkretnych wpisów
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);

  // Filtrowane wpisy dla wybranego zwierzaka
  const filteredRecords = medicalHistoryRecords.filter(
    record => record.pet === selectedPet.split(' ')[0]
  );

  const handleScopeChange = (scopeKey: keyof typeof accessScope) => {
    setAccessScope({
      ...accessScope,
      [scopeKey]: !accessScope[scopeKey]
    });
  };

  const handleRecordSelection = (recordId: string) => {
    if (selectedRecords.includes(recordId)) {
      setSelectedRecords(selectedRecords.filter(id => id !== recordId));
    } else {
      setSelectedRecords([...selectedRecords, recordId]);
    }
  };

  const toggleRecordSelector = () => {
    setShowRecordSelector(!showRecordSelector);
    // Jeśli otwieramy selektor, zmień tryb na wybór konkretnych wpisów
    if (!showRecordSelector) {
      setSharingMode('selected');
    }
  };

  // Funkcja zwracająca typ wpisu po polsku
  const getRecordTypeName = (type: string) => {
    switch(type) {
      case 'vaccination': return 'Szczepienie';
      case 'examination': return 'Badanie';
      case 'treatment': return 'Leczenie';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Udostępnij historię
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          {/* Poprawiony kod QR wykorzystujący obraz zamiast ikony */}
          <div className="bg-white p-4 border border-gray-200 rounded-lg w-48 h-48 flex items-center justify-center shadow-sm mb-4">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=mZwierzak:pet=Burek,access=30min,id=12345"
              alt="Kod QR" 
              className="w-40 h-40"
            />
          </div>
          
          <p className="text-gray-600 text-sm mb-2 text-center">
            Ten kod QR umożliwia dostęp do historii medycznej zwierzaka
          </p>
          <p className="text-gray-900 font-medium text-xs">Ważny przez: {accessTime}</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wybierz zwierzaka:</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedPet}
              onChange={(e) => {
                setSelectedPet(e.target.value);
                // Resetuj wybrane wpisy przy zmianie zwierzaka
                setSelectedRecords([]);
              }}
            >
              <option value="Burek (Pies, Labrador)">Burek (Pies, Labrador)</option>
              <option value="Mruczek (Kot, Europejski)">Mruczek (Kot, Europejski)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Co chcesz udostępnić?</label>
            <div className="flex p-1 bg-gray-100 rounded-md mb-2">
              <button
                className={`flex-1 py-2 rounded-md text-sm font-medium ${
                  sharingMode === 'all' 
                    ? 'bg-white shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-200'
                }`}
                onClick={() => setSharingMode('all')}
              >
                Cała historia
              </button>
              <button
                className={`flex-1 py-2 rounded-md text-sm font-medium ${
                  sharingMode === 'selected' 
                    ? 'bg-white shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-200'
                }`}
                onClick={() => {
                  setSharingMode('selected');
                  setShowRecordSelector(true);
                }}
              >
                Wybrane wpisy
              </button>
            </div>

            {sharingMode === 'all' ? (
              <div className="space-y-2">
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
            ) : (
              <div>
                <div 
                  className="flex justify-between items-center p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={toggleRecordSelector}
                >
                  <span className="text-sm text-gray-600">
                    {selectedRecords.length === 0 
                      ? 'Wybierz konkretne wpisy do udostępnienia' 
                      : `Wybrano ${selectedRecords.length} ${
                          selectedRecords.length === 1 ? 'wpis' : 
                          selectedRecords.length < 5 ? 'wpisy' : 'wpisów'
                        }`
                    }
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showRecordSelector ? 'transform rotate-180' : ''}`} />
                </div>
                
                {showRecordSelector && (
                  <div className="mt-2 border border-gray-200 rounded-md p-2 max-h-48 overflow-y-auto">
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map(record => (
                        <div 
                          key={record.id}
                          className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                          onClick={() => handleRecordSelection(record.id)}
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-2 ${
                            selectedRecords.includes(record.id) 
                              ? 'bg-blue-600 border-blue-600' 
                              : 'border-gray-300'
                          }`}>
                            {selectedRecords.includes(record.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{getRecordTypeName(record.type)}: {record.description}</p>
                            <p className="text-xs text-gray-500">{record.date}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-sm text-gray-500 py-2">Brak wpisów dla wybranego zwierzaka</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Czas dostępu:</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={accessTime}
              onChange={(e) => setAccessTime(e.target.value)}
            >
              <option value="30 minut">30 minut</option>
              <option value="1 godzina">1 godzina</option>
              <option value="4 godziny">4 godziny</option>
              <option value="24 godziny">24 godziny</option>
            </select>
          </div>

          <button className="w-full p-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Odśwież kod QR
          </button>
          <button className="w-full p-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Udostępnij link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareHistory;