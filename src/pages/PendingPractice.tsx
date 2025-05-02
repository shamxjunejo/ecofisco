import React from 'react';
import { Practice } from '../types/practice';
import { 
  Clock, 
  FileText,
  ChevronLeft,
  Download,
  Upload,
  Trash2
} from 'lucide-react';

interface PendingPracticeProps {
  practice: Practice;
  onBack: () => void;
  onDocumentUpload: (file: File) => void;
  onDocumentDelete: (documentId: string) => void;
}

export default function PendingPractice({ 
  practice, 
  onBack,
  onDocumentUpload,
  onDocumentDelete 
}: PendingPracticeProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="ml-1">Back</span>
        </button>
        <h2 className="text-xl font-semibold">{practice.serviceName}</h2>
      </div>

      <div className="space-y-6">
        {/* Status Section */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-yellow-800 font-medium">Pending</span>
          </div>
          <p className="text-yellow-700 mt-2 text-sm">
            Your practice is currently pending review. Please upload any required documents below.
          </p>
        </div>

        {/* Documents Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Required Documents</h3>
          <div className="space-y-4">
            {practice.documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-2 text-gray-400 hover:text-gray-600"
                    onClick={() => window.open(doc.url, '_blank')}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-gray-600"
                    onClick={() => onDocumentDelete(doc.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            <button
              className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    onDocumentUpload(file);
                  }
                };
                input.click();
              }}
            >
              <Upload className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-gray-600">Upload Document</span>
            </button>
          </div>
        </div>

        {/* Notes Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Notes</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">
              {practice.notes || 'No notes available for this practice.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 