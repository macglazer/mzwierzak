import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Clock, Calendar, FileText, Pill, AlertTriangle, ShieldCheck, Phone, Paperclip, Download, User, MapPin } from 'lucide-react';

// Przykładowe dane medyczne
const mockMedicalRecords = [
  { 
    id: '1', 
    type: 'vaccination', 
    date: '15.03.2025', 
    description: 'Szczepienie przeciw wściekliźnie', 
    doctor: 'dr Kowalski',
    clinic: 'Gabinet Weterynaryjny "LEO"',
    notes: 'Kolejne szczepienie za 12 miesięcy.'
  },
  { 
    id: '2', 
    type: 'examination', 
    date: '10.01.2025', 
    description: 'Badanie krwi', 
    doctor: 'dr Nowak',
    clinic: 'Klinika Weterynaryjna "Pod Łapką"',
    notes: 'Wyniki w normie. Poziom czerwonych krwinek w dolnej granicy normy. Zalecana kontrola za 6 miesięcy.'
  },
  { 
    id: '3', 
    type: 'treatment', 
    date: '05.12.2024', 
    description: 'Usunięcie kleszcza', 
    doctor: 'dr Kowalski',
    clinic: 'Gabinet Weterynaryjny "LEO"',
    notes: 'Miejsce usunięcia kleszcza bez stanu zapalnego. Zalecono obserwację przez 7 dni.'
  },
];

// Przykładowe dane leków
const mockMedications = [
  {
    id: '1',
    name: 'Antybiotyk - Amoksycylina',
    dosage: '1 tabletka',
    frequency: 'co 12 godzin',
    startDate: '10.03.2025',
    endDate: '17.03.2025',
    doctor: 'dr Kowalski',
    notes: 'Podawać z posiłkiem. W przypadku wymiotów skontaktować się z lekarzem.',
    active: true
  },
  {
    id: '2',
    name: 'Bioimmunex canis',
    dosage: '1 kapsułka na 20 kg',
    frequency: 'raz dziennie',
    startDate: '15.02.2025',
    endDate: '15.03.2025',
    doctor: 'dr Nowak',
    notes: 'Wspomaganie odporności organizmu. Można wymieszać z karmą.',
    active: true
  },
  {
    id: '3',
    name: 'Krople do oczu',
    dosage: '2 krople',
    frequency: '3 razy dziennie',
    startDate: '05.03.2025',
    endDate: '20.03.2025',
    doctor: 'dr Wiśniewska',
    notes: 'Aplikować bezpośrednio do worka spojówkowego.',
    active: false
  }
];

// Przykładowe dane dokumentów
const mockDocuments = [
  {
    id: '1',
    name: 'Zaświadczenie o szczepieniu przeciwko wściekliźnie.pdf',
    date: '15.03.2025',
    type: 'vaccination',
    thumbnail: 'https://via.placeholder.com/100x120'
  },
  {
    id: '2',
    name: 'Wyniki badania krwi.pdf',
    date: '10.01.2025',
    type: 'examination',
    thumbnail: 'https://via.placeholder.com/100x120'
  },
  {
    id: '3',
    name: 'Karta szczepień.jpg',
    date: '27.12.2023',
    type: 'vaccination',
    thumbnail: 'https://via.placeholder.com/100x120'
  }
];

// Dane zwierzaka
const petData = {
  name: 'Burek',
  species: 'Pies',
  breed: 'Labrador',
  gender: 'Samiec',
  birthDate: '15.06.2020',
  weight: '28 kg',
  chipId: '616093902449231',
  owner: {
    name: 'Marek Mikłaszewski',
    contact: '+48 123 456 789',
    address: 'ul. Swobodna 14/12, 50-088 Wrocław'
  }
};

interface LocationState {
  petName?: string;
  accessTime?: string;
  scope?: {
    history: boolean;
    medications: boolean;
    documents: boolean;
  };
  selectedRecords?: string[];
  sharingMode?: 'all' | 'selected';
}

const VetPreview: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const location = useLocation();
  
  // Stan dla aktywnej zakładki
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'medications' | 'documents'>('info');
  
  // Określenie zakresu udostępnienia na podstawie stanu z location
  const state = location.state as LocationState || {};
  const { scope = { history: true, medications: true, documents: true } } = state;
  
  // Filtrowanie rekordów jeśli wybrano konkretne rekordy
  const selectedRecords = state.selectedRecords || [];
  const sharingMode = state.sharingMode || 'all';
  
  const filteredMedicalRecords = sharingMode === 'selected' 
    ? mockMedicalRecords.filter(record => selectedRecords.includes(record.id))
    : mockMedicalRecords;

  // Formatowanie czasu pozostałego
  const formatTimeRemaining = (timeStr: string = '30 minut') => {
    // W prawdziwej aplikacji, obliczalibyśmy czas na podstawie czasu utworzenia i wygaśnięcia
    return timeStr;
  };

  // Zwracanie typu wpisu po polsku
  const getRecordTypeName = (type: string) => {
    switch(type) {
      case 'vaccination': return 'Szczepienie';
      case 'examination': return 'Badanie';
      case 'treatment': return 'Leczenie';
      default: return type;
    }
  };

  // Ustalenie aktualnej daty i godziny
  const currentDateTime = new Date().toLocaleString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">mZwierzak - Dane medyczne</h1>
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>Ważne przez: {formatTimeRemaining(state.accessTime)}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{petData.name}</h1>
              <p className="text-gray-600">{petData.species}, {petData.breed}</p>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              <ShieldCheck className="w-4 h-4 inline mr-1" />
              Kod dostępu: {code}
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-gray-700">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Tymczasowy dostęp</p>
                <p>Dostęp do tych danych wygaśnie {state.accessTime ? `za ${state.accessTime}` : 'wkrótce'}. Dostęp udzielony: {currentDateTime}.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nawigacja między zakładkami */}
        <div className="bg-white rounded-lg shadow-md mb-4">
          <div className="border-b">
            <nav className="flex overflow-x-auto">
              <button 
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'info' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('info')}
              >
                Informacje
              </button>
              {scope.history && (
                <button 
                  className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('history')}
                >
                  Historia medyczna
                </button>
              )}
              {scope.medications && (
                <button 
                  className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'medications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('medications')}
                >
                  Leki
                </button>
              )}
              {scope.documents && (
                <button 
                  className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'documents' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('documents')}
                >
                  Dokumenty
                </button>
              )}
            </nav>
          </div>

          <div className="p-4">
            {/* Zakładka z informacjami o zwierzaku */}
            {activeTab === 'info' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Informacje o zwierzaku</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-500">Gatunek</p>
                    <p className="font-medium">{petData.species}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-500">Rasa</p>
                    <p className="font-medium">{petData.breed}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-500">Płeć</p>
                    <p className="font-medium">{petData.gender}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-500">Data urodzenia</p>
                    <p className="font-medium">{petData.birthDate}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-500">Waga</p>
                    <p className="font-medium">{petData.weight}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-500">Numer czipa</p>
                    <p className="font-medium">{petData.chipId}</p>
                  </div>
                </div>

                <h3 className="text-md font-semibold text-gray-800 mt-6 mb-3">Kontakt do właściciela</h3>
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center mb-2">
                    <User className="w-4 h-4 text-gray-500 mr-2" />
                    <p className="text-sm text-gray-500">Właściciel</p>
                  </div>
                  <p className="font-medium">{petData.owner.name}</p>
                  
                  <div className="flex items-center mt-3 mb-1">
                    <Phone className="w-4 h-4 text-gray-500 mr-2" />
                    <p className="text-sm text-gray-500">Kontakt</p>
                  </div>
                  <p className="font-medium">{petData.owner.contact}</p>
                  
                  <div className="flex items-start mt-3 mb-1">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                    <p className="text-sm text-gray-500">Adres</p>
                  </div>
                  <p className="font-medium">{petData.owner.address}</p>
                </div>
              </div>
            )}

            {/* Zakładka z historią medyczną */}
            {activeTab === 'history' && scope.history && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Historia medyczna</h2>
                
                {filteredMedicalRecords.length > 0 ? (
                  <div className="space-y-4">
                    {filteredMedicalRecords.map(record => (
                      <div key={record.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-800">{getRecordTypeName(record.type)}: {record.description}</h3>
                          <span className="text-sm text-gray-500">{record.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Lekarz: {record.doctor}</p>
                        <p className="text-sm text-gray-600 mb-2">Klinika: {record.clinic}</p>
                        {record.notes && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                            <p className="text-gray-500">Notatki:</p>
                            <p className="text-gray-700">{record.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                    Brak udostępnionych wpisów w historii medycznej.
                  </div>
                )}
              </div>
            )}

            {/* Zakładka z lekami */}
            {activeTab === 'medications' && scope.medications && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Leki</h2>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Aktualne leki</h3>
                  {mockMedications.filter(med => med.active).length > 0 ? (
                    <div className="space-y-3">
                      {mockMedications.filter(med => med.active).map(med => (
                        <div key={med.id} className="p-3 border border-l-4 border-l-blue-500 border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-800">{med.name}</h4>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Aktywny</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Dawkowanie: {med.dosage}, {med.frequency}</p>
                          <p className="text-sm text-gray-600">Okres: {med.startDate} - {med.endDate}</p>
                          {med.notes && (
                            <p className="text-sm text-gray-500 mt-2 bg-gray-50 p-2 rounded">{med.notes}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-2">Przepisany przez: {med.doctor}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 p-3 bg-gray-50 rounded">Brak aktualnie przyjmowanych leków.</p>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Historia leków</h3>
                  {mockMedications.filter(med => !med.active).length > 0 ? (
                    <div className="space-y-3">
                      {mockMedications.filter(med => !med.active).map(med => (
                        <div key={med.id} className="p-3 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-800">{med.name}</h4>
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Zakończony</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Dawkowanie: {med.dosage}, {med.frequency}</p>
                          <p className="text-sm text-gray-600">Okres: {med.startDate} - {med.endDate}</p>
                          {med.notes && (
                            <p className="text-sm text-gray-500 mt-2 bg-gray-50 p-2 rounded">{med.notes}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-2">Przepisany przez: {med.doctor}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 p-3 bg-gray-50 rounded">Brak historii leków.</p>
                  )}
                </div>
              </div>
            )}

            {/* Zakładka z dokumentami */}
            {activeTab === 'documents' && scope.documents && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Dokumenty medyczne</h2>
                
                {mockDocuments.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {mockDocuments.map(doc => (
                      <div key={doc.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                        <div className="flex">
                          <div className="flex-shrink-0 w-16 h-20 bg-gray-200 rounded mr-3 overflow-hidden">
                            <img 
                              src={doc.thumbnail} 
                              alt={doc.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium text-sm text-gray-800 mb-1 line-clamp-2">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.date}</p>
                            <p className="text-xs text-gray-500">{getRecordTypeName(doc.type)}</p>
                            <button className="mt-2 flex items-center text-blue-600 text-xs">
                              <Download className="w-3 h-3 mr-1" />
                              Pobierz
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                    Brak udostępnionych dokumentów.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Pobierz wszystkie dane w formacie PDF
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Pobierz kompletną dokumentację zwierzęcia w jednym pliku.
          </p>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-300 p-4 text-sm text-center">
        <p>mZwierzak &copy; 2025. Wszystkie dane osobowe są chronione zgodnie z RODO.</p>
        <p className="mt-1">Ten widok jest dostępny tylko dla autoryzowanych odbiorców i wygaśnie automatycznie.</p>
      </footer>
    </div>
  );
};

export default VetPreview;