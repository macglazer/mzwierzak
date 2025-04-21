import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar, MapPin, Search } from 'lucide-react';

const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUpcoming, setFilterUpcoming] = useState<boolean | null>(true); // null = wszystkie, true = nadchodzące, false = przeszłe

  // Przykładowe dane wizyt
  const appointments = [
    { 
      id: '1', 
      date: '10.04.2025',
      time: '12:00',
      description: 'Kontrola po leczeniu',
      clinic: 'Klinika Weterynaryjna "Zdrowy Pupil"',
      upcoming: true,
      petId: '1',
      petName: 'Burek'
    },
    { 
      id: '2', 
      date: '01.07.2025',
      time: '15:30',
      description: 'Szczepienie przypominające',
      clinic: 'Klinika Weterynaryjna "Zdrowy Pupil"',
      upcoming: true,
      petId: '1',
      petName: 'Burek'
    },
    { 
      id: '3', 
      date: '03.02.2025',
      time: '10:15',
      description: 'Badanie krwi',
      clinic: 'Gabinet weterynaryjny "Pod Łapką"',
      upcoming: false,
      petId: '1',
      petName: 'Burek'
    },
    { 
      id: '4', 
      date: '15.03.2025',
      time: '14:00',
      description: 'Kontrola oczu',
      clinic: 'Centrum Weterynaryjne "PetCare"',
      upcoming: false,
      petId: '2',
      petName: 'Mruczek'
    },
  ];

  // Filtrowanie wizyt
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = searchTerm === '' || 
      apt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.clinic.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUpcomingFilter = filterUpcoming === null || apt.upcoming === filterUpcoming;
    
    // Zakładam, że pokazujemy tylko wizyty dla aktualnego zwierzaka (Burek)
    const matchesPet = apt.petName === 'Burek';
    
    return matchesSearch && matchesUpcomingFilter && matchesPet;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button 
        onClick={() => navigate('/pets/burek')} 
        className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Profil zwierzaka
      </button>

      <h1 className="text-xl font-bold text-gray-800 mb-4">Wizyty</h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex items-center bg-gray-100 rounded-md p-2 mb-4">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Szukaj wizyt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        <div className="flex p-1 bg-gray-100 rounded-md">
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              filterUpcoming === true 
                ? 'bg-white shadow-sm' 
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            onClick={() => setFilterUpcoming(true)}
          >
            Nadchodzące
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              filterUpcoming === false 
                ? 'bg-white shadow-sm' 
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            onClick={() => setFilterUpcoming(false)}
          >
            Przeszłe
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              filterUpcoming === null 
                ? 'bg-white shadow-sm' 
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            onClick={() => setFilterUpcoming(null)}
          >
            Wszystkie
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(apt => (
            <div 
              key={apt.id} 
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/appointments/${apt.id}`)}
            >
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-gray-800">{apt.description}</p>
                <div className={`px-2 py-1 text-xs rounded-full ${
                  apt.upcoming 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {apt.upcoming ? 'Nadchodząca' : 'Przeszła'}
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                <span>{apt.date}, {apt.time}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{apt.clinic}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">
            Nie znaleziono wizyt spełniających kryteria
          </div>
        )}
      </div>

      <button 
        onClick={() => navigate('/appointments/add')}
        className="w-full flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        <span>Dodaj wizytę</span>
      </button>
    </div>
  );
};

export default Appointments;