import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/config';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Practice, PracticeDocument } from '../types/practice';
import { SERVICE_REQUIREMENTS } from '../config/serviceRequirements';

import { 
  Clock, 
  FileText,
  ChevronDown,
  ChevronUp,
  Download,
  Upload,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  FileCheck,
  FileX
} from 'lucide-react';
import { toast } from 'react-hot-toast';



// Loading Practice

export default function PendingPractices() {
  const [user] = useAuthState(auth);
  const [practices, setPractices] = useState<Practice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedPractices, setExpandedPractices] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const loadPractices = async () => {
      if (user) {
        try {
          const practicesRef = collection(db, 'practices');
          const q = query(practicesRef, where('userId', '==', user.uid), where('status', '==', 'pending'));
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

       // Loading proactices

    loadPractices();
  }, [user]);

  const handleDocumentUpload = async (practiceId: string, file: File) => {
    try {
      const practiceRef = doc(db, 'practices', practiceId);
      const newDocument: PracticeDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        url: '#', // Replace with actual URL after upload
        uploadedAt: new Date().toISOString(),
        status: 'pending'
      };

      await updateDoc(practiceRef, {
        documents: [...(practices.find(p => p.id === practiceId)?.documents || []), newDocument],
        updatedAt: new Date().toISOString()
      });

      setPractices(practices.map(p => 
        p.id === practiceId ? { 
          ...p, 
          documents: [...p.documents, newDocument] 
        } : p
      ));

      toast.success('Document uploaded successfully');
    } catch (err) {
      toast.error('Failed to upload document');
      console.error(err);
    }
  };

  const handleDocumentDelete = async (practiceId: string, documentId: string) => {
    try {
      const practiceRef = doc(db, 'practices', practiceId);
      const updatedDocuments = practices.find(p => p.id === practiceId)?.documents.filter(doc => doc.id !== documentId) || [];
      
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

      toast.success('Document deleted successfully');
    } catch (err) {
      toast.error('Failed to delete document');
      console.error(err);
    }
  };

  const handlePracticeDelete = async (practiceId: string) => {
    try {
      const practiceRef = doc(db, 'practices', practiceId);
      await deleteDoc(practiceRef);
      
      setPractices(practices.filter(p => p.id !== practiceId));
      toast.success('Practice deleted successfully');
    } catch (err) {
      toast.error('Failed to delete practice');
      console.error(err);
    }
  };

  const togglePractice = (practiceId: string) => {
    setExpandedPractices(prev => ({
      ...prev,
      [practiceId]: !prev[practiceId]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pending Practices</h1>
            <p className="mt-2 text-gray-600">Manage your pending service requests and required documents</p>
          </div>
        </div>
        
        {practices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No pending practices</h3>
            <p className="text-gray-500 mt-2">
              Your pending practices will appear here once they are created.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {practices.map((practice) => {
              const serviceRequirements = SERVICE_REQUIREMENTS[practice.serviceId];
              const isExpanded = expandedPractices[practice.id];
              
              return (
                <div
                  key={practice.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  {/* Practice Header */}
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => togglePractice(practice.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {serviceRequirements?.title || practice.serviceName}
                          </h3>
                          <p className="text-gray-500 mt-1">{serviceRequirements?.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-yellow-500" />
                          <span className="text-yellow-600 font-medium">Pending</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePracticeDelete(practice.id);
                          }}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-gray-100">
                      <div className="p-6 space-y-6">
                        {/* Documents Section */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-gray-900">Required Documents</h4>
                            <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                              <Plus className="w-4 h-4" />
                              <span className="text-sm font-medium">Upload Document</span>
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleDocumentUpload(practice.id, file);
                                }}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                            </label>
                          </div>

                          <div className="space-y-3">
                            {serviceRequirements?.requiredDocuments.map((doc, index) => {
                              const uploadedDoc = practice.documents.find(d => d.name === doc.name);
                              return (
                                <div 
                                  key={index}
                                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg">
                                      {uploadedDoc ? (
                                        <FileCheck className="w-5 h-5 text-green-500" />
                                      ) : (
                                        <FileX className="w-5 h-5 text-gray-400" />
                                      )}
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-800">{doc.name}</p>
                                      {doc.description && (
                                        <p className="text-sm text-gray-500">{doc.description}</p>
                                      )}
                                      {doc.optional && (
                                        <span className="text-xs text-blue-500">(Optional)</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {uploadedDoc ? (
                                      <>
                                        {getStatusIcon(uploadedDoc.status)}
                                        <button 
                                          className="p-2 text-gray-400 hover:text-gray-600"
                                          onClick={() => window.open(uploadedDoc.url, '_blank')}
                                        >
                                          <Download className="w-5 h-5" />
                                        </button>
                                        <button 
                                          className="p-2 text-gray-400 hover:text-gray-600"
                                          onClick={() => handleDocumentDelete(practice.id, uploadedDoc.id)}
                                        >
                                          <Trash2 className="w-5 h-5" />
                                        </button>
                                      </>
                                    ) : (
                                      <label className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm cursor-pointer hover:bg-blue-100 transition-colors">
                                        <Upload className="w-4 h-4" />
                                        <span>Upload</span>
                                        <input
                                          type="file"
                                          className="hidden"
                                          onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) handleDocumentUpload(practice.id, file);
                                          }}
                                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                        />
                                      </label>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Progress Section */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Progress</span>
                            <span>{practice.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${practice.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 