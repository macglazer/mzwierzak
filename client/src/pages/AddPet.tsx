import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

const AddPet: React.FC = () => {
  const navigate = useNavigate();
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    gender: '',
    weight: '',
    chipId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPetData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tu dodamy wysyłanie danych do API
    console.log('Dodawanie zwierzaka:', petData);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4">
        <span className="mr-1">&larr;</span> Powrót
      </button>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Dodaj zwierzaka</h2>

        <div className="mb-6 flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
            <Camera className="w-8 h-8 text-gray-500" />
          </div>
          <button type="button" className="text-blue-600 text-sm">Dodaj zdjęcie</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imię</label>
            <input
              type="text"
              name="name"
              value={petData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Np. Burek"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gatunek</label>
            <select
              name="species"
              value={petData.species}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Wybierz gatunek</option>
              <option value="dog">Pies</option>
              <option value="cat">Kot</option>
              <option value="other">Inny</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rasa</label>
            <input
              type="text"
              name="breed"
              value={petData.breed}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Np. Labrador"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data urodzenia</label>
              <input
                type="date"
                name="birthDate"
                value={petData.birthDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Płeć</label>
              <select
                name="gender"
                value={petData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Wybierz płeć</option>
                <option value="male">Samiec</option>
                <option value="female">Samica</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Waga (kg)</label>
            <input
              type="number"
              name="weight"
              value={petData.weight}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Np. 25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Numer chipa (opcjonalnie)</label>
            <input
              type="text"
              name="chipId"
              value={petData.chipId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Np. 123456789"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Dodaj zwierzaka
        </button>
      </form>
    </div>
  );
};

export default AddPet;