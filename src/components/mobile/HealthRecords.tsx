import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  FileText, 
  Download, 
  Upload, 
  Trash2,
  Search,
  Filter,
  Cloud,
  CloudOff,
  Shield,
  Eye,
  EyeOff,
  Calendar,
  User,
  Heart,
  Pill,
  TestTube,
  Stethoscope,
  Plus
} from 'lucide-react';

type Language = 'en' | 'hi';
type RecordType = 'prescription' | 'lab_report' | 'consultation' | 'vaccination' | 'other';

interface HealthRecord {
  id: string;
  title: string;
  titleHi: string;
  type: RecordType;
  date: string;
  doctor: string;
  doctorHi: string;
  description: string;
  descriptionHi: string;
  fileSize?: string;
  isCloudSynced: boolean;
}

interface HealthRecordsProps {
  language: Language;
  userConsent: boolean;
}

const healthRecords: HealthRecord[] = [
  {
    id: '1',
    title: 'Blood Test Report',
    titleHi: 'रक्त जांच रिपोर्ट',
    type: 'lab_report',
    date: '2024-01-10',
    doctor: 'Dr. Rajesh Sharma',
    doctorHi: 'डॉ. राजेश शर्मा',
    description: 'Complete Blood Count (CBC) - All parameters normal',
    descriptionHi: 'पूर्ण रक्त गणना (सीबीसी) - सभी पैरामीटर सामान्य',
    fileSize: '2.3 MB',
    isCloudSynced: true
  },
  {
    id: '2',
    title: 'Consultation Notes',
    titleHi: 'परामर्श नोट्स',
    type: 'consultation',
    date: '2024-01-08',
    doctor: 'Dr. Priya Singh',
    doctorHi: 'डॉ. प्रिया सिंह',
    description: 'Follow-up for hypertension - medication adjusted',
    descriptionHi: 'उच्च रक्तचाप के लिए फॉलो-अप - दवा समायोजित',
    isCloudSynced: false
  },
  {
    id: '3',
    title: 'Prescription',
    titleHi: 'नुस्खा',
    type: 'prescription',
    date: '2024-01-05',
    doctor: 'Dr. Anil Kumar',
    doctorHi: 'डॉ. अनिल कुमार',
    description: 'Paracetamol 500mg - Take twice daily for 5 days',
    descriptionHi: 'पैरासिटामोल 500मिग्रा - 5 दिनों के लिए दिन में दो बार लें',
    isCloudSynced: true
  },
  {
    id: '4',
    title: 'COVID-19 Vaccination',
    titleHi: 'COVID-19 टीकाकरण',
    type: 'vaccination',
    date: '2023-12-15',
    doctor: 'Health Center',
    doctorHi: 'स्वास्थ्य केंद्र',
    description: 'Second booster dose - Covishield',
    descriptionHi: 'दूसरी बूस्टर खुराक - कोविशील्ड',
    isCloudSynced: true
  }
];

const translations = {
  en: {
    title: "Health Records",
    subtitle: "Manage your medical documents",
    searchPlaceholder: "Search records...",
    myRecords: "My Records",
    addRecord: "Add Record",
    uploadFile: "Upload File",
    downloadAll: "Download All",
    exportData: "Export Data",
    cloudSynced: "Cloud Synced",
    localOnly: "Local Only",
    syncToCloud: "Sync to Cloud",
    deleteRecord: "Delete",
    viewRecord: "View",
    hideRecord: "Hide",
    prescription: "Prescription",
    lab_report: "Lab Report",
    consultation: "Consultation",
    vaccination: "Vaccination",
    other: "Other",
    doctor: "Doctor",
    date: "Date",
    description: "Description",
    fileSize: "File Size",
    all: "All",
    recent: "Recent",
    important: "Important",
    noRecords: "No health records found",
    addFirst: "Add your first health record to get started",
    dataEncrypted: "All data is encrypted and secure",
    privacyProtected: "Your privacy is protected",
    consentRequired: "Enable cloud storage to sync records across devices"
  },
  hi: {
    title: "स्वास्थ्य रिकॉर्ड",
    subtitle: "अपने चिकित्सा दस्तावेज़ प्रबंधित करें",
    searchPlaceholder: "रिकॉर्ड खोजें...",
    myRecords: "मेरे रिकॉर्ड",
    addRecord: "रिकॉर्ड जोड़ें",
    uploadFile: "फ़ाइल अपलोड करें",
    downloadAll: "सभी डाउनलोड करें",
    exportData: "डेटा निर्यात करें",
    cloudSynced: "क्लाउड में सिंक",
    localOnly: "केवल स्थानीय",
    syncToCloud: "क्लाउड में सिंक करें",
    deleteRecord: "हटाएं",
    viewRecord: "देखें",
    hideRecord: "छुपाएं",
    prescription: "नुस्खा",
    lab_report: "लैब रिपोर्ट",
    consultation: "परामर्श",
    vaccination: "टीकाकरण",
    other: "अन्य",
    doctor: "डॉक्टर",
    date: "दिनांक",
    description: "विवरण",
    fileSize: "फ़ाइल का आकार",
    all: "सभी",
    recent: "हाल ही में",
    important: "महत्वपूर्ण",
    noRecords: "कोई स्वास्थ्य रिकॉर्ड नहीं मिला",
    addFirst: "शुरू करने के लिए अपना पहला स्वास्थ्य रिकॉर्ड जोड़ें",
    dataEncrypted: "सभी डेटा एन्क्रिप्टेड और सुरक्षित है",
    privacyProtected: "आपकी निजता सुरक्षित है",
    consentRequired: "उपकरणों में रिकॉर्ड सिंक करने के लिए क्लाउड स्टोरेज सक्षम करें"
  }
};

const recordIcons = {
  prescription: Pill,
  lab_report: TestTube,
  consultation: Stethoscope,
  vaccination: Shield,
  other: FileText
};

const recordColors = {
  prescription: 'bg-green-500',
  lab_report: 'bg-blue-500',
  consultation: 'bg-purple-500',
  vaccination: 'bg-orange-500',
  other: 'bg-gray-500'
};

export function HealthRecords({ language, userConsent }: HealthRecordsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<RecordType | 'all'>('all');
  const [visibleRecords, setVisibleRecords] = useState<Set<string>>(new Set(healthRecords.map(r => r.id)));
  
  const t = translations[language] || translations.en;

  const filteredRecords = healthRecords.filter(record => {
    const matchesSearch = language === 'hi' 
      ? record.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.descriptionHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.doctorHi.toLowerCase().includes(searchQuery.toLowerCase())
      : record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || record.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const toggleRecordVisibility = (recordId: string) => {
    setVisibleRecords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(recordId)) {
        newSet.delete(recordId);
      } else {
        newSet.add(recordId);
      }
      return newSet;
    });
  };

  const handleSyncToCloud = (recordId: string) => {
    if (userConsent) {
      console.log(`Syncing record ${recordId} to cloud`);
      // Simulate cloud sync
    }
  };

  const handleDownload = (recordId: string) => {
    console.log(`Downloading record ${recordId}`);
  };

  const handleDelete = (recordId: string) => {
    console.log(`Deleting record ${recordId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{t.title}</h1>
              <p className="text-cyan-100 text-sm">{t.subtitle}</p>
            </div>
          </div>
          <Button 
            size="sm"
            className="bg-white/20 hover:bg-white/30 rounded-xl border border-white/30"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.addRecord}
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="pl-12 h-12 bg-white/20 border-white/30 text-white placeholder-white/70 rounded-2xl backdrop-blur-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'prescription', 'lab_report', 'consultation', 'vaccination', 'other'].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedFilter(filter as RecordType | 'all')}
              className={`whitespace-nowrap rounded-full ${
                selectedFilter === filter 
                  ? 'bg-white text-cyan-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {t[filter as keyof typeof t]}
            </Button>
          ))}
        </div>
      </div>

      {/* Cloud Storage Status */}
      <div className="mx-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-cyan-200">
          <div className="flex items-center gap-3">
            {userConsent ? <Cloud className="w-5 h-5 text-cyan-600" /> : <CloudOff className="w-5 h-5 text-gray-500" />}
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {userConsent ? t.cloudSynced : t.consentRequired}
              </p>
              <p className="text-xs text-gray-600">{t.dataEncrypted}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 mb-6">
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="flex-1 border-2 border-cyan-200 text-cyan-600 hover:bg-cyan-50 rounded-xl"
          >
            <Upload className="w-4 h-4 mr-2" />
            {t.uploadFile}
          </Button>
          <Button 
            variant="outline"
            className="flex-1 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl"
          >
            <Download className="w-4 h-4 mr-2" />
            {t.downloadAll}
          </Button>
        </div>
      </div>

      {/* Records List */}
      <div className="px-6 space-y-4 pb-24">
        {filteredRecords.map((record) => {
          const RecordIcon = recordIcons[record.type];
          const isVisible = visibleRecords.has(record.id);
          
          return (
            <Card key={record.id} className="bg-white border-2 border-gray-100 shadow-lg">
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 ${recordColors[record.type]} rounded-2xl flex items-center justify-center`}>
                    <RecordIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-800">
                        {isVisible 
                          ? (language === 'hi' ? record.titleHi : record.title)
                          : '••••••••••••'
                        }
                      </h3>
                      <Badge 
                        variant={record.isCloudSynced && userConsent ? "default" : "secondary"}
                        className={record.isCloudSynced && userConsent ? "bg-cyan-100 text-cyan-700" : "bg-gray-100 text-gray-600"}
                      >
                        {record.isCloudSynced && userConsent ? (
                          <>
                            <Cloud className="w-3 h-3 mr-1" />
                            {t.cloudSynced}
                          </>
                        ) : (
                          <>
                            <CloudOff className="w-3 h-3 mr-1" />
                            {t.localOnly}
                          </>
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {t[record.type]} • {language === 'hi' ? record.doctorHi : record.doctor}
                    </p>
                    <p className="text-sm text-gray-700">
                      {isVisible 
                        ? (language === 'hi' ? record.descriptionHi : record.description)
                        : '••••••••••••••••••••••••'
                      }
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">{t.date}</span>
                    </div>
                    <p className="text-sm font-bold text-blue-800">
                      {isVisible ? record.date : '••••••••'}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-700">{t.doctor}</span>
                    </div>
                    <p className="text-sm font-bold text-green-800">
                      {isVisible 
                        ? (language === 'hi' ? record.doctorHi : record.doctor)
                        : '••••••••'
                      }
                    </p>
                  </div>
                  {record.fileSize && (
                    <div className="bg-purple-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-medium text-purple-700">{t.fileSize}</span>
                      </div>
                      <p className="text-sm font-bold text-purple-800">
                        {isVisible ? record.fileSize : '••••'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => toggleRecordVisibility(record.id)}
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-2"
                  >
                    {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  
                  {!record.isCloudSynced && userConsent && (
                    <Button
                      onClick={() => handleSyncToCloud(record.id)}
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-2 border-cyan-200 text-cyan-600 hover:bg-cyan-50"
                    >
                      <Cloud className="w-4 h-4 mr-2" />
                      {t.syncToCloud}
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => handleDownload(record.id)}
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-2 border-green-200 text-green-600 hover:bg-green-50"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={() => handleDelete(record.id)}
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* No Records */}
      {filteredRecords.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.noRecords}</h3>
          <p className="text-gray-600 mb-6">{t.addFirst}</p>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            {t.addRecord}
          </Button>
        </div>
      )}
    </div>
  );
}