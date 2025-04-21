import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Camera, Bell, BellOff } from 'lucide-react';

interface MedicationData {
  petId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  notes: string;
  reminder?: boolean;
}

const AddMedication: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Sprawdź, czy mamy dane z OCR/AI analizy recepty
  const extractedData = location.state?.medicationData;
  const documentId = location.state?.documentId;
  const doctorName = location.state?.doctorName || '';

  // Inicjalizuj stan z danymi ze skanowania lub pustymi wartościami
  const [medicationData, setMedicationData] = useState<MedicationData>({
    petId: '1', // Domyślnie Burek
    name: extractedData?.name || '',
    dosage: extractedData?.dosage || '',
    frequency: extractedData?.frequency || '',
    startDate: extractedData?.startDate || '',
    endDate: extractedData?.endDate || '',
    notes: extractedData?.notes || '',
    reminder: true // Domyślnie włączone przypomnienia
  });

  const [isDocumentAttached, setIsDocumentAttached] = useState(!!documentId);

  // Przykładowa lista zwierząt
  const pets = [
    { id: '1', name: 'Burek (Pies, Labrador)' },
    { id: '2', name: 'Mruczek (Kot, Europejski)' }
  ];

  // Efekt dla pokazania komunikatu o automatycznym wypełnieniu
  const [showAutoFillMessage, setShowAutoFillMessage] = useState(!!extractedData);
  
  useEffect(() => {
    if (showAutoFillMessage) {
      const timer = setTimeout(() => {
        setShowAutoFillMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAutoFillMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMedicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleReminder = () => {
    setMedicationData(prev => ({
      ...prev,
      reminder: !prev.reminder
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tu kod do wysłania danych do API
    console.log('Dodano lek:', medicationData, 'z dokumentem ID:', documentId);
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

      {showAutoFillMessage && extractedData && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded shadow-sm">
          <p className="font-medium">Recepta została automatycznie przeanalizowana!</p>
          <p className="text-sm">Formularz został wstępnie wypełniony danymi z recepty. Sprawdź poprawność danych przed zapisaniem.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          {extractedData ? 'Zweryfikuj dane z recepty' : 'Dodaj lek'}
        </h1>

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

          {doctorName && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Przepisane przez</label>
              <input
                type="text"
                value={doctorName}
                readOnly
                className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md text-gray-600"
              />
            </div>
          )}

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

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Załączony dokument</label>
              {!isDocumentAttached && (
                <button 
                  type="button"
                  onClick={() => navigate('/scan?redirect=add-medication')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Dodaj receptę
                </button>
              )}
            </div>
            
            {isDocumentAttached ? (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Camera className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-700">Zeskanowana recepta</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsDocumentAttached(false)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Usuń
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Brak załączonej recepty</p>
            )}
          </div>

          <div className="border-t pt-4">
            <label className="flex items-center cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 mr-3">
                {medicationData.reminder ? (
                  <Bell className="w-6 h-6 text-blue-600" />
                ) : (
                  <BellOff className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex-grow">
                <p className="font-medium text-gray-700">Przypomnienia</p>
                <p className="text-sm text-gray-500">
                  {medicationData.reminder 
                    ? 'Przypomnienia dla tego leku są włączone' 
                    : 'Przypomnienia dla tego leku są wyłączone'}
                </p>
              </div>
              <div 
                onClick={toggleReminder}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
                  medicationData.reminder ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span 
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                    medicationData.reminder ? 'translate-x-6' : 'translate-x-1'
                  }`} 
                />
              </div>
            </label>
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