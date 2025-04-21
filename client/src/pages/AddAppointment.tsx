import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AddAppointment: React.FC = () => {
  const navigate = useNavigate();
  
  const [appointmentData, setAppointmentData] = useState({
    petId: '1', // Domyślnie Burek
    date: '',
    time: '',
    description: '',
    clinic: '',
    notes: ''
  });

  // Przykładowa lista zwierząt
  const pets = [
    { id: '1', name: 'Burek (Pies, Labrador)' },
    { id: '2', name: 'Mruczek (Kot, Europejski)' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tutaj kod do wysłania danych do API
    console.log('Dodawanie wizyty:', appointmentData);
    
    // Przekierowanie po dodaniu
    navigate('/appointments');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Powrót
      </button>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">Dodaj wizytę</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zwierzak</label>
            <select
              name="petId"
              value={appointmentData.petId}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {pets.map(pet => (
                <option key={pet.id} value={pet.id}>{pet.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input
                type="date"
                name="date"
                value={appointmentData.date}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Godzina</label>
              <input
                type="time"
                name="time"
                value={appointmentData.time}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cel wizyty</label>
            <input
              type="text"
              name="description"
              value={appointmentData.description}
              onChange={handleChange}
              required
              placeholder="Np. Szczepienie, Kontrola, Badanie"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Klinika/Gabinet</label>
            <input
              type="text"
              name="clinic"
              value={appointmentData.clinic}
              onChange={handleChange}
              placeholder="Np. Klinika Weterynaryjna ABC"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dodatkowe notatki</label>
            <textarea
              name="notes"
              value={appointmentData.notes}
              onChange={handleChange}
              placeholder="Np. Pamiętać o książeczce szczepień, nie karmić przed wizytą..."
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Zapisz wizytę
        </button>
      </form>
    </div>
  );
};

export default AddAppointment;