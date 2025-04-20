import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, FileText, Syringe, Stethoscope } from 'lucide-react';

const MedicalHistory: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Przykładowe dane
  const medicalRecords = [
    { id: 1, type: 'vaccination', date: '15.03.2025', description: 'Szczepienie przeciw wściekliźnie', doctor: 'dr Kowalski', pet: 'Burek' },
    { id: 2, type: 'examination', date: '10.01.2025', description: 'Badanie krwi', doctor: 'dr Nowak', pet: 'Burek' },
    { id: 3, type: 'treatment', date: '05.12.2024', description: 'Usunięcie kleszcza', doctor: 'dr Kowalski', pet: 'Mruczek' },
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
        return <Syringe className="w-4 h-4 text-blue-500" />;
      case 'examination':
        return <Stethoscope className="w-4 h-4 text-purple-500" />;
      default:
        return <FileText className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4">
        <span className="mr-1">&larr;</span> Historia medyczna
      </button>

      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
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
            className="flex-1 p-2 text-sm border border-gray-300 rounded-md"
          >
            <option value="all">Wszystkie zwierzaki</option>
            <option value="Burek">Burek (Pies)</option>
            <option value="Mruczek">Mruczek (Kot)</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="flex-1 p-2 text-sm border border-gray-300 rounded-md"
          >
            <option value="all">Wszystkie typy</option>
            <option value="vaccination">Szczepienia</option>
            <option value="examination">Badania</option>
            <option value="treatment">Zabiegi</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredRecords.map(record => (
          <div key={record.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center">
                {getTypeIcon(record.type)}
                <p className="font-medium ml-2">
                  {record.type === 'vaccination' ? 'Szczepienie' : 
                   record.type === 'examination' ? 'Badanie' : 'Zabieg'}
                </p>
              </div>
              <p className="text-sm text-gray-500">{record.date}</p>
            </div>
            <p className="text-sm mb-2">{record.description}</p>
            <div className="flex justify-between text-xs text-gray-500">
              <p>{record.doctor}</p>
              <p>{record.pet}</p>
            </div>
          </div>
        ))}

        {filteredRecords.length === 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">
            Nie znaleziono wpisów spełniających kryteria wyszukiwania
          </div>
        )}

        <button className="w-full flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          <span>Dodaj wpis</span>
        </button>
      </div>
    </div>
  );
};

export default MedicalHistory;