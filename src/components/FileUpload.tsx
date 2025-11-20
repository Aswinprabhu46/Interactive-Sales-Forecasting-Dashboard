import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  error: string | null;
}

export const FileUpload = ({ onFileUpload, isLoading, error }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-blue-50 scale-105'
            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          disabled={isLoading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          id="file-upload"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full transition-all duration-300 ${
            isDragging ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            {isLoading ? (
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Upload className={`w-12 h-12 transition-colors ${
                isDragging ? 'text-blue-500' : 'text-gray-400'
              }`} />
            )}
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 mb-1">
              {isLoading ? 'Processing...' : 'Drop your CSV file here'}
            </p>
            <p className="text-sm text-gray-500">
              or click to browse
            </p>
          </div>

          {fileName && (
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-blue-700 font-medium">{fileName}</span>
            </div>
          )}

          <p className="text-xs text-gray-400">
            Maximum file size: 10MB
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-start space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
};
