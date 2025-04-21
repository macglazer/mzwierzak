import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, QrCode, Upload, X } from 'lucide-react';

interface PetData {
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  gender: string;
  weight: string;
  chipId: string;
  contactName: string;
  contactPhone: string;
  contactAddress: string;
  notes: string;
}

const AddPet: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [petImage, setPetImage] = useState<string | null>(null);
  const [showQrOptions, setShowQrOptions] = useState<boolean>(false);
  
  const [petData, setPetData] = useState<PetData>({
    name: '',
    species: 'dog', // Domyślnie pies
    breed: '',
    birthDate: '',
    gender: '',
    weight: '',
    chipId: '',
    contactName: '',
    contactPhone: '',
    contactAddress: '',
    notes: ''
  });

  // Dane, które mają być uwzględnione w kodzie QR
  const [qrOptions, setQrOptions] = useState({
    includeOwnerInfo: true,
    includeContactPhone: true,
    includeContactAddress: false,
    includeChipId: true,
    includeNotes: false,
    requirePin: true,
    pin: '1234' // Domyślny PIN
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPetData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQrOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, type, value } = e.target;
    setQrOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPetImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleQrOptions = () => {
    setShowQrOptions(!showQrOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Tutaj byłoby wysłanie danych do API
    console.log('Dodawanie zwierzaka:', petData);
    console.log('Opcje kodu QR:', qrOptions);
    
    // Przekierowanie po dodaniu zwierzaka
    navigate('/dashboard');
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
        <h1 className="text-xl font-semibold text-gray-800 mb-6">Dodaj zwierzaka</h1>

        {/* Sekcja zdjęcia */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative">
            {petImage ? (
              <div className="relative">
                <img 
                  src={petImage} 
                  alt="Zdjęcie zwierzaka" 
                  className="w-24 h-24 object-cover rounded-full mb-3" 
                />
                <button 
                  type="button" 
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button 
            type="button" 
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-1" />
            {petImage ? 'Zmień zdjęcie' : 'Dodaj zdjęcie'}
          </button>
        </div>

        {/* Podstawowe dane zwierzaka */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imię*</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Gatunek*</label>
            <select
              name="species"
              value={petData.species}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Waga (kg)</label>
              <input
                type="number"
                name="weight"
                value={petData.weight}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Np. 25"
                min="0"
                step="0.1"
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

          {/* Dane kontaktowe właściciela */}
          <div className="border-t pt-4 mt-4">
            <h2 className="text-md font-medium text-gray-800 mb-3">Dane kontaktowe</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Imię i nazwisko właściciela</label>
              <input
                type="text"
                name="contactName"
                value={petData.contactName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Np. Jan Kowalski"
              />
            </div>
            
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon kontaktowy</label>
              <input
                type="tel"
                name="contactPhone"
                value={petData.contactPhone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Np. 123 456 789"
              />
            </div>
            
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Adres (opcjonalnie)</label>
              <input
                type="text"
                name="contactAddress"
                value={petData.contactAddress}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Np. ul. Przykładowa 1, 00-000 Warszawa"
              />
            </div>
          </div>

          {/* Dodatkowe notatki */}
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Dodatkowe informacje (opcjonalnie)</label>
            <textarea
              name="notes"
              value={petData.notes}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Np. alergie, choroby przewlekłe, szczególne potrzeby..."
            />
          </div>

          {/* Opcje kodu QR - przycisk rozwijający opcje */}
          <div className="border-t pt-4 mt-4">
            <button
              type="button"
              onClick={toggleQrOptions}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <QrCode className="w-5 h-5 mr-2" />
              <span className="font-medium">Opcje kodu QR dla zwierzaka {showQrOptions ? '(ukryj)' : '(pokaż)'}</span>
            </button>
            
            {showQrOptions && (
              <div className="mt-3 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-3">
                  Wybierz, które dane mają być dostępne po zeskanowaniu kodu QR zwierzaka:
                </p>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="includeOwnerInfo"
                      checked={qrOptions.includeOwnerInfo}
                      onChange={handleQrOptionChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Dane właściciela</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="includeContactPhone"
                      checked={qrOptions.includeContactPhone}
                      onChange={handleQrOptionChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Numer telefonu</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="includeContactAddress"
                      checked={qrOptions.includeContactAddress}
                      onChange={handleQrOptionChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Adres</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="includeChipId"
                      checked={qrOptions.includeChipId}
                      onChange={handleQrOptionChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Numer chipa</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="includeNotes"
                      checked={qrOptions.includeNotes}
                      onChange={handleQrOptionChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Dodatkowe informacje</span>
                  </label>
                  
                  <div className="pt-2 border-t mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="requirePin"
                        checked={qrOptions.requirePin}
                        onChange={handleQrOptionChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Wymagaj PIN-u do dostępu</span>
                    </label>
                    
                    {qrOptions.requirePin && (
                      <div className="mt-2 pl-6">
                        <label className="text-sm text-gray-700">PIN (4 cyfry):</label>
                        <input
                          type="text"
                          name="pin"
                          value={qrOptions.pin}
                          onChange={handleQrOptionChange}
                          maxLength={4}
                          pattern="[0-9]{4}"
                          className="ml-2 w-16 p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-3">
                  Dane zawarte w kodzie QR mogą być odczytane przez każdego, kto zeskanuje kod. Wybierz tylko te informacje, które chcesz udostępnić w sytuacji zagubienia się zwierzaka.
                </p>
              </div>
            )}
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