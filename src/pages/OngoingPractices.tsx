import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/config';
import { collection, query, where, getDocs, doc, updateDoc, addDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { Practice, PracticeUpdate, PracticeDocument } from '../types/practice';
import { 
  FolderOpen, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronRight,
  Upload,
  Download,
  Trash2,
  Edit,
  FileText
} from 'lucide-react';
import PendingPractice from './PendingPractice';

export default function OngoingPractices() {
  const [user] = useAuthState(auth);
  const [practices, setPractices] = useState<Practice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showPendingView, setShowPendingView] = useState(false);

  useEffect(() => {
    const loadPractices = async () => {
      if (user) {
        try {
          const practicesRef = collection(db, 'practices');
          const q = query(practicesRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          
          const practicesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Practice[];
          
          setPractices(practicesData);
        } catch (err) {
          setError('Failed to load practices');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPractices();
  }, [user]);

  const getStatusIcon = (status: Practice['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'in-progress':
        return <FolderOpen className="w-5 h-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Practice['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  const handlePracticeClick = (practice: Practice) => {
    setSelectedPractice(practice);
    if (practice.status === 'pending') {
      setShowPendingView(true);
    } else {
      setShowDetails(true);
    }
  };

  const handleBackFromPending = () => {
    setShowPendingView(false);
    setSelectedPractice(null);
  };

  const handleStatusUpdate = async (practiceId: string, updates: PracticeUpdate) => {
    try {
      const practiceRef = doc(db, 'practices', practiceId);
      await updateDoc(practiceRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });

      setPractices(practices.map(p => 
        p.id === practiceId ? { ...p, ...updates } : p
      ));
      
      if (selectedPractice?.id === practiceId) {
        setSelectedPractice({ ...selectedPractice, ...updates });
      }
    } catch (err) {
      setError('Failed to update practice');
      console.error(err);
    }
  };

  const handleDocumentUpload = async (practiceId: string, file: File) => {
    try {
      const practiceRef = doc(db, 'practices', practiceId);
      const newDocument: PracticeDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        url: '#', // Replace with actual URL after upload
        uploadedAt: new Date().toISOString(),
        status: 'pending' as const
      };

      await updateDoc(practiceRef, {
        documents: [...(selectedPractice?.documents || []), newDocument],
        updatedAt: new Date().toISOString()
      });

      setPractices(practices.map(p => 
        p.id === practiceId ? { 
          ...p, 
          documents: [...p.documents, newDocument] 
        } : p
      ));

      if (selectedPractice?.id === practiceId) {
        setSelectedPractice({ 
          ...selectedPractice, 
          documents: [...selectedPractice.documents, newDocument] 
        });
      }
    } catch (err) {
      setError('Failed to upload document');
      console.error(err);
    }
  };

  const handleDocumentDelete = async (practiceId: string, documentId: string) => {
    try {
      const practiceRef = doc(db, 'practices', practiceId);
      const updatedDocuments = selectedPractice?.documents.filter(doc => doc.id !== documentId) || [];
      
      await updateDoc(practiceRef, {
        documents: updatedDocuments,
        updatedAt: new Date().toISOString()
      });

      setPractices(practices.map(p => 
        p.id === practiceId ? { 
          ...p, 
          documents: updatedDocuments 
        } : p
      ));

      if (selectedPractice?.id === practiceId) {
        setSelectedPractice({ 
          ...selectedPractice, 
          documents: updatedDocuments 
        });
      }
    } catch (err) {
      setError('Failed to delete document');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (showPendingView && selectedPractice) {
    return (
      <PendingPractice
        practice={selectedPractice}
        onBack={handleBackFromPending}
        onDocumentUpload={(file) => handleDocumentUpload(selectedPractice.id, file)}
        onDocumentDelete={(documentId) => handleDocumentDelete(selectedPractice.id, documentId)}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ongoing Practices</h1>
      
      {practices.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No practices yet</h3>
          <p className="text-gray-500 mt-2">
            Your purchased services will appear here once they are processed.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practices.map((practice) => (
            <div
              key={practice.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handlePracticeClick(practice)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{practice.serviceName}</h3>
                <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(practice.status)}`}>
                  {practice.status}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Created: {new Date(practice.createdAt).toLocaleDateString()}</span>
                </div>
                
                {practice.estimatedCompletionDate && (
                  <div className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Estimated completion: {new Date(practice.estimatedCompletionDate).toLocaleDateString()}</span>
                  </div>
                )}
                
                <div className="flex items-center text-gray-600">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  <span>{practice.documents.length} documents</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(practice.status)}
                    <span className="ml-2 text-sm text-gray-500">
                      Progress: {practice.progress}%
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDetails && selectedPractice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold">{selectedPractice.serviceName}</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={selectedPractice.status}
                      onChange={(e) => handleStatusUpdate(selectedPractice.id, { status: e.target.value as Practice['status'] })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Progress</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedPractice.progress}
                      onChange={(e) => handleStatusUpdate(selectedPractice.id, { progress: parseInt(e.target.value) })}
                      className="mt-1 block w-full"
                    />
                    <span className="text-sm text-gray-500">{selectedPractice.progress}%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    value={selectedPractice.notes}
                    onChange={(e) => handleStatusUpdate(selectedPractice.id, { notes: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Documents</h3>
                  <div className="space-y-4">
                    {selectedPractice.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Download className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600">
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
                          if (file && selectedPractice) {
                            handleDocumentUpload(selectedPractice.id, file);
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 