import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, User, FileText, MapPin, Camera, ArrowLeft } from 'lucide-react';

const MedicalRecordDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // To byłoby pobierane z API na podstawie ID
  const record = {
    id,
    type: 'vaccination',
    date: '15.03.2025',
    description: 'Szczepienie przeciw wściekliźnie',
    doctor: 'dr Kowalski',
    clinic: 'Weterynaria Centrum',
    pet: 'Burek',
    notes: 'Szczepienie przebiegło bez komplikacji. Następna dawka za rok.',
    documents: [
      { id: '1', name: 'Zaświadczenie szczepienia.jpg', type: 'image' },
      { id: '2', name: 'Zalecenia.pdf', type: 'pdf' }
    ]
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
        return 'Wpis';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button 
        onClick={() => navigate('/history')} 
        className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Powrót do historii
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            {getTypeName(record.type)}
          </h1>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {record.pet}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <Calendar className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Data</p>
              <p className="text-sm text-gray-600">{record.date}</p>
            </div>
          </div>

          <div className="flex items-start">
            <User className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Lekarz</p>
              <p className="text-sm text-gray-600">{record.doctor}</p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Klinika</p>
              <p className="text-sm text-gray-600">{record.clinic}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Opis</p>
            <p className="text-sm text-gray-600">{record.description}</p>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Notatki</p>
            <p className="text-sm text-gray-600">{record.notes}</p>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Dokumenty</p>
            <div className="space-y-2">
              {record.documents.map(doc => (
                <div key={doc.id} className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                  {doc.type === 'image' ? (
                    <Camera className="w-5 h-5 text-blue-500 mr-2" />
                  ) : (
                    <FileText className="w-5 h-5 text-blue-500 mr-2" />
                  )}
                  <span className="text-sm">{doc.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button 
            className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => navigate(`/history/${id}/edit`)}
          >
            Edytuj
          </button>
          <button 
            className="flex-1 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordDetails;