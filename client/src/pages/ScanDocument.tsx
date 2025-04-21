import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Camera, FileText } from 'lucide-react';

// Definicje typów dla danych OCR
interface BaseMockedData {
  type: string;
  description: string;
  doctor: string;
  clinic: string;
  date: string;
  notes: string;
}

interface MedicationData {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  notes: string;
}

interface PrescriptionData extends BaseMockedData {
  medicationData: MedicationData;
}

// Typ, który przyjmuje mockedOcrData
type MockedDataType = BaseMockedData | PrescriptionData;

// Symulowane dane OCR dla różnych typów dokumentów
const mockedOcrData: Record<string, MockedDataType> = {
  'medical_results': {
    type: 'examination',
    description: 'Badanie krwi - panel podstawowy',
    doctor: 'dr Jan Nowak',
    clinic: 'PetCare Centrum Weterynaryjne',
    date: new Date().toISOString().split('T')[0],
    notes: 'Wyniki w normie. Poziom czerwonych krwinek w dolnej granicy normy. Zalecana kontrola za 6 miesięcy.'
  },
  'prescription': {
    type: 'treatment',
    description: 'Recepta - antybiotyk Amoksycylina',
    doctor: 'dr Maria Wiśniewska',
    clinic: 'Klinika Weterynaryjna "Futrzak"',
    date: new Date().toISOString().split('T')[0],
    notes: 'Dawkowanie: 1 tabletka 2 razy dziennie przez 7 dni. Podawać z jedzeniem.',
    // Dodane dane specyficzne dla leków
    medicationData: {
      name: 'Antybiotyk - Amoksycylina',
      dosage: '1 tabletka',
      frequency: '2 razy dziennie',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 dni później
      notes: 'Podawać z jedzeniem. W przypadku wymiotów skontaktować się z lekarzem.'
    }
  },
  'vaccination': {
    type: 'vaccination',
    description: 'Szczepienie przeciw wściekliźnie',
    doctor: 'dr Anna Kowalska',
    clinic: 'Klinika Weterynaryjna "Zdrowy Pupil"',
    date: new Date().toISOString().split('T')[0],
    notes: 'Kolejne szczepienie za 12 miesięcy. Po szczepieniu obserwować zwierzę przez 24h.'
  },
  'other': {
    type: 'consultation',
    description: 'Konsultacja weterynaryjna',
    doctor: 'dr Piotr Zieliński',
    clinic: 'Gabinet weterynaryjny "Pod Łapką"',
    date: new Date().toISOString().split('T')[0],
    notes: 'Konsultacja dotycząca diety. Zalecono zmianę karmy na niskotłuszczową.'
  }
};

// Funkcja pomocnicza, sprawdzająca czy dane są typu PrescriptionData
const isPrescriptionData = (data: MockedDataType): data is PrescriptionData => {
  return 'medicationData' in data;
};

const ScanDocument: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [useCamera, setUseCamera] = useState<boolean>(false);
  const [documentType, setDocumentType] = useState<string>(redirectTo === 'add-medication' ? 'prescription' : '');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Ustawienie typu dokumentu na receptę, jeśli przekierowanie jest z formularza dodawania leku
  useEffect(() => {
    if (redirectTo === 'add-medication') {
      setDocumentType('prescription');
    }
  }, [redirectTo]);

  useEffect(() => {
    if (useCamera && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error('Błąd kamery:', err));
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [useCamera]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleScanClick = () => {
    fileInputRef.current?.click();
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'scan.jpg', { type: 'image/jpeg' });
          setSelectedFile(file);
          setPreviewUrl(URL.createObjectURL(blob));
        }
      }, 'image/jpeg');
    }
  };

  const handleSaveDocument = () => {
    // Symulacja OCR/AI analizy
    setIsAnalyzing(true);
    
    // Symulacja czasu przetwarzania
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Pobierz symulowane dane na podstawie typu dokumentu
      const extractedData = mockedOcrData[documentType as keyof typeof mockedOcrData];
      
      // Generuj unikalny ID dla dokumentu
      const documentId = Date.now().toString(36) + Math.random().toString(36).substring(2);
      
      if (redirectTo === 'add-record') {
        // Przekieruj do formularza dodawania wpisu z wypełnionymi danymi
        navigate('/history/add', { 
          state: { 
            documentData: extractedData,
            documentId: documentId
          } 
        });
      } else if (redirectTo === 'add-medication') {
        // Dla dodawania leku musimy sprawdzić czy mamy dane o leku
        if (isPrescriptionData(extractedData)) {
          // Jeśli mamy dane o leku (medicationData), przekazujemy je
          navigate('/medications/add', { 
            state: { 
              medicationData: extractedData.medicationData,
              documentId: documentId,
              doctorName: extractedData.doctor || ''
            } 
          });
        } else {
          // Jeśli nie mamy specificznych danych o leku, tworzymy podstawowe dane z ogólnych informacji
          const defaultMedicationData = {
            name: extractedData.description || '',
            notes: extractedData.notes || '',
            startDate: extractedData.date || '',
            // Domyślnie kończy się 7 dni później, jeśli nie określono inaczej
            endDate: new Date(new Date(extractedData.date).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            dosage: '',
            frequency: '',
          };

          navigate('/medications/add', { 
            state: { 
              medicationData: defaultMedicationData,
              documentId: documentId,
              doctorName: extractedData.doctor || ''
            } 
          });
        }
      } else {
        // W przypadku samodzielnego skanowania, pokaż komunikat o sukcesie i wróć
        navigate(-1);
      }
    }, 2000); // 2 sekundy symulowanego przetwarzania
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Powrót
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Dodaj skan dokumentu</h2>

        {isAnalyzing ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Analizowanie dokumentu...</p>
            <p className="text-sm text-gray-500 mt-2">Automatycznie rozpoznajemy dane z dokumentu</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useCamera}
                    onChange={() => setUseCamera(!useCamera)}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Użyj kamery</span>
                </label>
              </div>

              {!useCamera && (
                <div className="text-center">
                  <button
                    onClick={handleScanClick}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Wybierz plik (JPG / PNG / PDF)
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              )}

              {useCamera && (
                <div className="text-center">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    className="rounded-lg shadow-md mx-auto mb-3 max-w-full h-60 bg-black" 
                  />
                  <button
                    onClick={capturePhoto}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Camera className="w-5 h-5 inline mr-2" />
                    Zrób zdjęcie
                  </button>
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}
            </div>

            {previewUrl && (
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2 text-center">Podgląd dokumentu:</p>
                {selectedFile?.type.startsWith('image') ? (
                  <img 
                    src={previewUrl} 
                    alt="Podgląd dokumentu" 
                    className="max-w-full mx-auto rounded-lg shadow-md" 
                  />
                ) : (
                  <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <FileText className="w-10 h-10 mx-auto mb-2 text-gray-500" />
                    <p className="italic">Plik PDF został załadowany</p>
                  </div>
                )}
              </div>
            )}

            {selectedFile && (
              <>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Typ dokumentu:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDocumentType('medical_results')}
                      className={`p-2 text-sm rounded-lg transition-colors ${
                        documentType === 'medical_results' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                      disabled={redirectTo === 'add-medication'}
                    >
                      Wyniki badań
                    </button>
                    <button
                      type="button"
                      onClick={() => setDocumentType('prescription')}
                      className={`p-2 text-sm rounded-lg transition-colors ${
                        documentType === 'prescription' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      Recepta
                    </button>
                    <button
                      type="button"
                      onClick={() => setDocumentType('vaccination')}
                      className={`p-2 text-sm rounded-lg transition-colors ${
                        documentType === 'vaccination' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                      disabled={redirectTo === 'add-medication'}
                    >
                      Karta szczepień
                    </button>
                    <button
                      type="button"
                      onClick={() => setDocumentType('other')}
                      className={`p-2 text-sm rounded-lg transition-colors ${
                        documentType === 'other' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                      disabled={redirectTo === 'add-medication'}
                    >
                      Inny dokument
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleSaveDocument}
                  disabled={!documentType}
                  className={`mt-6 w-full py-3 rounded-lg font-medium transition-colors ${
                    documentType 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {redirectTo === 'add-record' 
                    ? 'Analizuj i dodaj do historii' 
                    : redirectTo === 'add-medication'
                      ? 'Analizuj receptę i dodaj lek'
                      : 'Zapisz dokument'
                  }
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ScanDocument;