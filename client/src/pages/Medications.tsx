import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Clock, Calendar, Search, Filter } from 'lucide-react';

const Medications: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<boolean | null>(true); // null = wszystkie, true = aktywne, false = zakończone

  // Przykładowe dane leków
  const medications = [
    { 
      id: '1', 
      name: 'Antybiotyk - Amoksycylina', 
      dosage: '1 tabletka',
      frequency: 'co 12 godzin',
      startDate: '10.03.2025',
      endDate: '17.03.2025',
      active: true,
      petId: '1',
      petName: 'Burek'
    },
    { 
      id: '2', 
      name: 'Odrobaczenie - Drontal', 
      dosage: '1 tabletka',
      frequency: 'jednorazowo',
      startDate: '15.02.2025',
      endDate: '15.02.2025',
      active: false,
      petId: '1',
      petName: 'Burek'
    },
    { 
      id: '3', 
      name: 'Krople do oczu', 
      dosage: '2 krople',
      frequency: '3 razy dziennie',
      startDate: '05.03.2025',
      endDate: '20.03.2025',
      active: true,
      petId: '1',
      petName: 'Burek'
    },
    { 
      id: '4', 
      name: 'Suplementy witaminowe', 
      dosage: '1 kapsułka',
      frequency: 'codziennie',
      startDate: '01.01.2025',
      endDate: '01.04.2025',
      active: true,
      petId: '2',
      petName: 'Mruczek'
    },
  ];

  // Filtrowanie leków
  const filteredMedications = medications.filter(med => {
    const matchesSearch = searchTerm === '' || 
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.dosage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesActiveFilter = filterActive === null || med.active === filterActive;
    
    // Zakładam, że pokazujemy tylko leki dla aktualnego zwierzaka (Burek)
    const matchesPet = med.petName === 'Burek';
    
    return matchesSearch && matchesActiveFilter && matchesPet;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button 
        onClick={() => navigate('/pets/burek')} 
        className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Profil zwierzaka
      </button>

      <h1 className="text-xl font-bold text-gray-800 mb-4">Leki</h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex items-center bg-gray-100 rounded-md p-2 mb-4">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Szukaj leków..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        <div className="flex p-1 bg-gray-100 rounded-md">
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              filterActive === true 
                ? 'bg-white shadow-sm' 
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            onClick={() => setFilterActive(true)}
          >
            Aktywne
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              filterActive === false 
                ? 'bg-white shadow-sm' 
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            onClick={() => setFilterActive(false)}
          >
            Zakończone
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              filterActive === null 
                ? 'bg-white shadow-sm' 
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            onClick={() => setFilterActive(null)}
          >
            Wszystkie
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {filteredMedications.length > 0 ? (
          filteredMedications.map(med => (
            <div 
              key={med.id} 
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/medications/${med.id}`)}
            >
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-gray-800">{med.name}</p>
                <div className={`px-2 py-1 text-xs rounded-full ${
                  med.active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {med.active ? 'Aktywny' : 'Zakończony'}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Dawkowanie: {med.dosage}, {med.frequency}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>Od: {med.startDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Do: {med.endDate}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">
            Nie znaleziono leków spełniających kryteria
          </div>
        )}
      </div>

      <button 
        onClick={() => navigate('/medications/add')}
        className="w-full flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        <span>Dodaj lek</span>
      </button>
    </div>
  );
};

export default Medications;