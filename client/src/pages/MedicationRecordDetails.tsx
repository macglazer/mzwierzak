import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, User, Clock, Pill, ArrowLeft, Edit2, Trash2, AlertTriangle, X, Check } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  startDate: string;
  endDate: string;
  times: string[];
  pet: string;
  prescribedBy: string;
  notes: string;
  reminder: boolean;
  type: string;
}

const MedicationRecordDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  // To byłoby pobierane z API na podstawie ID
  const medication: Medication = {
    id: id || '',
    name: 'Amoksycylina',
    dosage: '1 tabletka (500mg)',
    startDate: '01.04.2025',
    endDate: '08.04.2025',
    times: ['08:00', '20:00'],
    pet: 'Burek',
    prescribedBy: 'dr Kowalski',
    notes: 'Podawać z jedzeniem. W przypadku wymiotów skontaktować się z lekarzem.',
    reminder: true,
    type: 'antibiotic'
  };

  const getMedicationType = (type: string): string => {
    switch(type) {
      case 'antibiotic':
        return 'Antybiotyk';
      case 'painkiller':
        return 'Lek przeciwbólowy';
      case 'antiparasitic':
        return 'Lek przeciwpasożytniczy';
      case 'supplement':
        return 'Suplement';
      default:
        return 'Lek';
    }
  };

  const handleDelete = (): void => {
    if (confirmDelete) {
      // Tu byłoby usuwanie leku
      console.log('Usuwanie leku o ID:', id);
      navigate('/medications');
    } else {
      setConfirmDelete(true);
    }
  };

  const cancelDelete = (): void => {
    setConfirmDelete(false);
  };

  const handleBack = (): void => {
    navigate('/medications');
  };

  const handleEdit = (): void => {
    navigate(`/medications/${id}/edit`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button 
        onClick={handleBack} 
        className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Powrót do leków
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            {medication.name}
          </h1>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {medication.pet}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <Pill className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Rodzaj leku</p>
              <p className="text-sm text-gray-600">{getMedicationType(medication.type)}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Calendar className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Dawkowanie</p>
              <p className="text-sm text-gray-600">{medication.dosage}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Godziny przyjmowania</p>
              <p className="text-sm text-gray-600">{medication.times.join(', ')}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Calendar className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Okres stosowania</p>
              <p className="text-sm text-gray-600">
                Od {medication.startDate} do {medication.endDate}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <User className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Przepisane przez</p>
              <p className="text-sm text-gray-600">{medication.prescribedBy}</p>
            </div>
          </div>

          {medication.notes && (
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Dodatkowe informacje</p>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{medication.notes}</p>
            </div>
          )}

          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Przypomnienia</p>
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full mr-2 ${medication.reminder ? 'bg-green-500' : 'bg-gray-300'}`}>
                {medication.reminder && <Check className="w-3 h-3 text-white" />}
              </div>
              <p className="text-sm text-gray-600">
                {medication.reminder ? 'Przypomnienia włączone' : 'Przypomnienia wyłączone'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
          {confirmDelete ? (
            <div className="flex items-center w-full">
              <div className="flex-grow">
                <AlertTriangle className="text-red-500 inline mr-2" size={18} />
                <span className="text-sm text-red-600">Potwierdź usunięcie</span>
              </div>
              <button 
                onClick={handleDelete} 
                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 mr-2"
                aria-label="Potwierdź usunięcie"
              >
                <Check size={18} />
              </button>
              <button 
                onClick={cancelDelete} 
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                aria-label="Anuluj usunięcie"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={handleEdit} 
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Edit2 size={16} className="mr-2" />
                Edytuj
              </button>
              <button 
                onClick={handleDelete} 
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <Trash2 size={16} className="mr-2" />
                Usuń
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationRecordDetails;