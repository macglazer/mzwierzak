import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';

const AddMedicalRecord: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Sprawdź, czy mamy dane z OCR/AI analizy
  const extractedData = location.state?.documentData;
  const documentId = location.state?.documentId;
  
  const [recordData, setRecordData] = useState({
    type: extractedData?.type || 'examination',
    petId: extractedData?.petId || '',
    date: extractedData?.date || new Date().toISOString().split('T')[0],
    description: extractedData?.description || '',
    doctor: extractedData?.doctor || '',
    clinic: extractedData?.clinic || '',
    notes: extractedData?.notes || ''
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
    setRecordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tutaj kod do wysłania danych do API
    console.log('Dodawanie wpisu:', recordData, 'z dokumentem ID:', documentId);
    
    // Przekierowanie po dodaniu
    navigate('/history');
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
          <p className="font-medium">Dokument został automatycznie przeanalizowany!</p>
          <p className="text-sm">Formularz został wstępnie wypełniony danymi z dokumentu. Sprawdź poprawność danych przed zapisaniem.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          {extractedData ? 'Zweryfikuj dane z dokumentu' : 'Dodaj nowy wpis'}
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Typ wpisu</label>
            <select
              name="type"
              value={recordData.type}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="examination">Badanie</option>
              <option value="vaccination">Szczepienie</option>
              <option value="treatment">Leczenie</option>
              <option value="surgery">Operacja</option>
              <option value="consultation">Konsultacja</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zwierzak</label>
            <select
              name="petId"
              value={recordData.petId}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Wybierz zwierzaka</option>
              {pets.map(pet => (
                <option key={pet.id} value={pet.id}>{pet.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              type="date"
              name="date"
              value={recordData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
            <input
              type="text"
              name="description"
              value={recordData.description}
              onChange={handleChange}
              required
              placeholder="Np. Szczepienie przeciw wściekliźnie"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lekarz</label>
            <input
              type="text"
              name="doctor"
              value={recordData.doctor}
              onChange={handleChange}
              placeholder="Np. dr Kowalski"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Klinika/Gabinet</label>
            <input
              type="text"
              name="clinic"
              value={recordData.clinic}
              onChange={handleChange}
              placeholder="Np. Klinika Weterynaryjna ABC"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dodatkowe notatki</label>
            <textarea
              name="notes"
              value={recordData.notes}
              onChange={handleChange}
              placeholder="Dodatkowe informacje, zalecenia, uwagi..."
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Załączone dokumenty</label>
              {!isDocumentAttached && (
                <button 
                  type="button"
                  onClick={() => navigate('/scan?redirect=add-record')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Dodaj dokument
                </button>
              )}
            </div>
            
            {isDocumentAttached ? (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Camera className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-700">Zeskanowany dokument</span>
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
              <p className="text-sm text-gray-500 italic">Brak załączonych dokumentów</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Zapisz wpis
        </button>
      </form>
    </div>
  );
};

export default AddMedicalRecord;