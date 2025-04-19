import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ScanDocument: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [useCamera, setUseCamera] = useState<boolean>(false);

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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => navigate(-1)} className="text-sm text-blue-600 mb-4">&larr; Skanuj dokument</button>

      <div className="bg-white p-6 rounded-lg shadow text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Dodaj skan dokumentu</h2>

        <div className="mb-4">
          <div className="mb-2">
            <label className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                checked={useCamera}
                onChange={() => setUseCamera(!useCamera)}
              />
              Użyj kamery
            </label>
          </div>

          {!useCamera && (
            <>
              <button
                onClick={handleScanClick}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
            </>
          )}

          {useCamera && (
            <div className="mb-4">
              <video ref={videoRef} autoPlay className="rounded shadow mx-auto mb-2 max-w-full h-60" />
              <button
                onClick={capturePhoto}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Zrób zdjęcie
              </button>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Podgląd:</p>
            {selectedFile?.type.startsWith('image') ? (
              <img src={previewUrl} alt="Podgląd dokumentu" className="max-w-full mx-auto rounded shadow" />
            ) : (
              <p className="text-gray-600 italic">Plik PDF został załadowany</p>
            )}
          </div>
        )}

        {selectedFile && (
          <button className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
            Zapisz dokument
          </button>
        )}
      </div>
    </div>
  );
};

export default ScanDocument;