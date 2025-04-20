import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, FileText, Syringe, Stethoscope, ArrowLeft, Calendar } from 'lucide-react';

const MedicalHistory: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Przykładowe dane historii medycznej
  const medicalRecords = [
    { 
      id: '1', 
      type: 'vaccination', 
      date: '15.03.2025', 
      description: 'Szczepienie przeciw wściekliźnie', 
      doctor: 'dr Kowalski', 
      pet: 'Burek' 
    },
    { 
      id: '2', 
      type: 'examination', 
      date: '10.01.2025', 
      description: 'Badanie krwi', 
      doctor: 'dr Nowak', 
      pet: 'Burek' 
    },
    { 
      id: '3', 
      type: 'treatment', 
      date: '05.12.2024', 
      description: 'Usunięcie kleszcza', 
      doctor: 'dr Kowalski', 
      pet: 'Mruczek' 
    },
    { 
      id: '4', 
      type: 'surgery', 
      date: '20.11.2024', 
      description: 'Zabieg sterylizacji', 
      doctor: 'dr Wiśniewska', 
      pet: 'Mruczek' 
    },
  ];

  // Filtrowanie rekordów
  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = searchTerm === '' || 
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPet = selectedPet === 'all' || record.pet === selectedPet;
    const matchesType = selectedType === 'all' || record.type === selectedType;
    
    return matchesSearch && matchesPet && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'vaccination':
        return <Syringe className="w-5 h-5 text-blue-500" />;
      case 'examination':
        return <Stethoscope className="w-5 h-5 text-purple-500" />;
      case 'surgery':
        return <FileText className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-green-500" />;
    }
  };

  const getTypeName = (type: string) => {
    switch(type) {
      case 'vaccination':
        return 'Szczepienie';
      case 'examination':
        return 'Badanie';
      case 'treatment':
        return 'Leczenie';
      case 'surgery':
        return 'Operacja';
      default:
        return 'Zabieg';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button 
        // onClick={() => navigate(-1)} 
        onClick={() => navigate('/dashboard')}

        className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Powrót
      </button>

      <h1 className="text-xl font-bold text-gray-800 mb-4">Historia medyczna</h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex items-center bg-gray-100 rounded-md p-2 mb-4">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Szukaj w historii medycznej..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value)}
            className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Wszystkie zwierzaki</option>
            <option value="Burek">Burek (Pies)</option>
            <option value="Mruczek">Mruczek (Kot)</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Wszystkie typy</option>
            <option value="vaccination">Szczepienia</option>
            <option value="examination">Badania</option>
            <option value="treatment">Leczenie</option>
            <option value="surgery">Operacje</option>
          </select>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {filteredRecords.map(record => (
          <div 
            key={record.id} 
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/history/${record.id}`)}
          >
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center">
                {getTypeIcon(record.type)}
                <p className="font-medium ml-2 text-gray-800">
                  {getTypeName(record.type)}
                </p>
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                <p className="text-sm">{record.date}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{record.description}</p>
            <div className="flex justify-between text-xs">
              <p className="text-gray-500">{record.doctor}</p>
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                {record.pet}
              </span>
            </div>
          </div>
        ))}

        {filteredRecords.length === 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">
            Nie znaleziono wpisów spełniających kryteria wyszukiwania
          </div>
        )}
      </div>

      <button 
        onClick={() => navigate('/history/add')}
        className="w-full flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        <span>Dodaj wpis</span>
      </button>
    </div>
  );
};

export default MedicalHistory;