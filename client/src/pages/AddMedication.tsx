import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AddMedication: React.FC = () => {
  const navigate = useNavigate();

  const [medicationData, setMedicationData] = useState({
    petId: '1',
    name: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  const pets = [
    { id: '1', name: 'Burek (Pies, Labrador)' },
    { id: '2', name: 'Mruczek (Kot, Europejski)' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMedicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wyślij dane do API tutaj
    console.log('Dodano lek:', medicationData);
    navigate('/medications');
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
        <h1 className="text-xl font-semibold text-gray-800 mb-6">Dodaj lek</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zwierzak</label>
            <select
              name="petId"
              value={medicationData.petId}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {pets.map(pet => (
                <option key={pet.id} value={pet.id}>{pet.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa leku</label>
            <input
              type="text"
              name="name"
              value={medicationData.name}
              onChange={handleChange}
              required
              placeholder="Np. Antybiotyk - Amoksycylina"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dawkowanie</label>
            <input
              type="text"
              name="dosage"
              value={medicationData.dosage}
              onChange={handleChange}
              placeholder="Np. 1 tabletka"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Częstotliwość</label>
            <input
              type="text"
              name="frequency"
              value={medicationData.frequency}
              onChange={handleChange}
              placeholder="Np. co 12 godzin, codziennie, jednorazowo"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data rozpoczęcia</label>
              <input
                type="date"
                name="startDate"
                value={medicationData.startDate}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data zakończenia</label>
              <input
                type="date"
                name="endDate"
                value={medicationData.endDate}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dodatkowe notatki</label>
            <textarea
              name="notes"
              value={medicationData.notes}
              onChange={handleChange}
              placeholder="Np. Podawać z jedzeniem, nie stosować z innymi lekami..."
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Zapisz lek
        </button>
      </form>
    </div>
  );
};

export default AddMedication;
