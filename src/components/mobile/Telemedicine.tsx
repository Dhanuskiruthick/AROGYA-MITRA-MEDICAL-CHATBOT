import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Video, 
  Phone, 
  MessageCircle, 
  Search,
  Star,
  Clock,
  Calendar,
  User,
  Stethoscope,
  Heart,
  Eye,
  Baby,
  Brain,
  Shield,
  Cloud,
  CloudOff
} from 'lucide-react';

type Language = 'en' | 'hi';
type Specialty = 'general' | 'cardiology' | 'dermatology' | 'pediatrics' | 'psychology';
type ConsultationType = 'video' | 'audio' | 'chat';

interface Doctor {
  id: string;
  name: string;
  nameHi: string;
  specialty: Specialty;
  experience: number;
  rating: number;
  consultationFee: number;
  languages: string[];
  isOnline: boolean;
  nextAvailable: string;
  image: string;
}

interface Consultation {
  id: string;
  doctorId: string;
  type: ConsultationType;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  fee: number;
}

interface TelemedicineProps {
  language: Language;
  userConsent: boolean;
}

const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Sharma',
    nameHi: 'डॉ. राजेश शर्मा',
    specialty: 'general',
    experience: 15,
    rating: 4.8,
    consultationFee: 500,
    languages: ['Hindi', 'English'],
    isOnline: true,
    nextAvailable: 'Available now',
    image: '👨‍⚕️'
  },
  {
    id: '2',
    name: 'Dr. Priya Singh',
    nameHi: 'डॉ. प्रिया सिंह',
    specialty: 'pediatrics',
    experience: 12,
    rating: 4.7,
    consultationFee: 600,
    languages: ['Hindi', 'English'],
    isOnline: false,
    nextAvailable: '2:00 PM today',
    image: '👩‍⚕️'
  },
  {
    id: '3',
    name: 'Dr. Anil Kumar',
    nameHi: 'डॉ. अनिल कुमार',
    specialty: 'cardiology',
    experience: 20,
    rating: 4.9,
    consultationFee: 800,
    languages: ['Hindi', 'English'],
    isOnline: true,
    nextAvailable: 'Available now',
    image: '👨‍⚕️'
  }
];

const consultations: Consultation[] = [
  {
    id: '1',
    doctorId: '1',
    type: 'video',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'upcoming',
    fee: 500
  }
];

const translations = {
  en: {
    title: "Telemedicine",
    subtitle: "Consult doctors online",
    searchPlaceholder: "Search doctors by name or specialty...",
    availableDoctors: "Available Doctors",
    myConsultations: "My Consultations",
    bookNow: "Book Now",
    consultNow: "Consult Now",
    videoCall: "Video Call",
    audioCall: "Audio Call",
    textChat: "Text Chat",
    online: "Online",
    offline: "Offline",
    experience: "Experience",
    consultationFee: "Consultation Fee",
    rating: "Rating",
    languages: "Languages",
    nextAvailable: "Next Available",
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled",
    general: "General Medicine",
    cardiology: "Cardiology",
    dermatology: "Dermatology", 
    pediatrics: "Pediatrics",
    psychology: "Psychology",
    years: "years",
    cloudSaved: "Consultations saved to cloud",
    localOnly: "Data stored locally",
    noConsultations: "No consultations found",
    bookFirst: "Book your first consultation to get started"
  },
  hi: {
    title: "टेलीमेडिसिन",
    subtitle: "ऑनलाइन डॉक्टर परामर्श",
    searchPlaceholder: "नाम या विशेषता से डॉक्टर खोजें...",
    availableDoctors: "उपलब्ध डॉक्टर",
    myConsultations: "मेरे परामर्श",
    bookNow: "अभी बुक करें",
    consultNow: "अभी परामर्श करें",
    videoCall: "वीडियो कॉल",
    audioCall: "ऑडियो कॉल",
    textChat: "टेक्स्ट चैट",
    online: "ऑनलाइन",
    offline: "ऑफलाइन",
    experience: "अनुभव",
    consultationFee: "परामर्श शुल्क",
    rating: "रेटिंग",
    languages: "भाषाएं",
    nextAvailable: "अगली उपलब्धता",
    upcoming: "आगामी",
    completed: "पूर्ण",
    cancelled: "रद्द",
    general: "सामान्य चिकित्सा",
    cardiology: "हृदय रोग",
    dermatology: "त्वचा रोग",
    pediatrics: "बाल रोग",
    psychology: "मनोविज्ञान",
    years: "वर्ष",
    cloudSaved: "परामर्श क्लाउड में सहेजे गए",
    localOnly: "डेटा स्थानीय रूप से संग्रहीत",
    noConsultations: "कोई परामर्श नहीं मिला",
    bookFirst: "शुरू करने के लिए अपना पहला परामर्श बुक करें"
  }
};

const specialtyIcons = {
  general: Stethoscope,
  cardiology: Heart,
  dermatology: Shield,
  pediatrics: Baby,
  psychology: Brain
};

const specialtyColors = {
  general: 'bg-blue-500',
  cardiology: 'bg-red-500',
  dermatology: 'bg-green-500',
  pediatrics: 'bg-yellow-500',
  psychology: 'bg-purple-500'
};

export function Telemedicine({ language, userConsent }: TelemedicineProps) {
  const [activeTab, setActiveTab] = useState<'doctors' | 'consultations'>('doctors');
  const [searchQuery, setSearchQuery] = useState('');
  
  const t = translations[language] || translations.en;

  const filteredDoctors = doctors.filter(doctor => 
    language === 'hi' 
      ? doctor.nameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t[doctor.specialty].toLowerCase().includes(searchQuery.toLowerCase())
      : doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t[doctor.specialty].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConsultation = (doctor: Doctor, type: ConsultationType) => {
    console.log(`Starting ${type} consultation with ${doctor.name}`);
    // Simulate starting consultation
  };

  const handleBookConsultation = (doctor: Doctor) => {
    console.log(`Booking consultation with ${doctor.name}`);
    if (userConsent) {
      console.log('Saving consultation to cloud');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{t.title}</h1>
            <p className="text-cyan-100 text-sm">{t.subtitle}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['doctors', 'consultations'] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full ${
                activeTab === tab 
                  ? 'bg-white text-cyan-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {tab === 'doctors' ? t.availableDoctors : t.myConsultations}
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
                {userConsent ? t.cloudSaved : t.localOnly}
              </p>
              <p className="text-xs text-gray-600">
                {userConsent ? "Access consultations from any device" : "Consultations stored locally only"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      {activeTab === 'doctors' && (
        <div className="px-6 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="pl-12 h-12 bg-white border-2 border-gray-200 focus:border-cyan-400 rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-6 space-y-4 pb-24">
        {/* Doctors Tab */}
        {activeTab === 'doctors' && (
          <>
            {filteredDoctors.map((doctor) => {
              const SpecialtyIcon = specialtyIcons[doctor.specialty];
              return (
                <Card key={doctor.id} className="bg-white border-2 border-gray-100 shadow-lg">
                  <div className="p-5">
                    {/* Doctor Info */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center text-2xl">
                        {doctor.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-800">
                            {language === 'hi' ? doctor.nameHi : doctor.name}
                          </h3>
                          <Badge 
                            variant={doctor.isOnline ? "default" : "secondary"}
                            className={doctor.isOnline ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}
                          >
                            {doctor.isOnline ? t.online : t.offline}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-6 h-6 ${specialtyColors[doctor.specialty]} rounded-lg flex items-center justify-center`}>
                            <SpecialtyIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm text-gray-600">{t[doctor.specialty]}</span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{doctor.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600">{doctor.experience} {t.years}</span>
                          <span className="text-sm font-semibold text-cyan-600">₹{doctor.consultationFee}</span>
                        </div>
                      </div>
                    </div>

                    {/* Availability & Languages */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-medium text-blue-700">{t.nextAvailable}</span>
                        </div>
                        <p className="text-sm font-bold text-blue-800">{doctor.nextAvailable}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageCircle className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-medium text-green-700">{t.languages}</span>
                        </div>
                        <p className="text-sm font-bold text-green-800">{doctor.languages.join(', ')}</p>
                      </div>
                    </div>

                    {/* Consultation Options */}
                    {doctor.isOnline ? (
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <Button 
                            onClick={() => handleConsultation(doctor, 'video')}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl"
                          >
                            <Video className="w-4 h-4 mr-2" />
                            {t.videoCall}
                          </Button>
                          <Button 
                            onClick={() => handleConsultation(doctor, 'audio')}
                            variant="outline"
                            className="flex-1 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            {t.audioCall}
                          </Button>
                        </div>
                        <Button 
                          onClick={() => handleConsultation(doctor, 'chat')}
                          variant="outline"
                          className="w-full border-2 border-cyan-200 text-cyan-600 hover:bg-cyan-50 rounded-xl"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {t.textChat}
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => handleBookConsultation(doctor)}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {t.bookNow}
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </>
        )}

        {/* Consultations Tab */}
        {activeTab === 'consultations' && (
          <>
            {consultations.length > 0 ? (
              consultations.map((consultation) => {
                const doctor = doctors.find(d => d.id === consultation.doctorId);
                const consultationIcon = consultation.type === 'video' ? Video : 
                                       consultation.type === 'audio' ? Phone : MessageCircle;
                const ConsultationIcon = consultationIcon;
                
                return (
                  <Card key={consultation.id} className="bg-white border-2 border-gray-100 shadow-lg">
                    <div className="p-5">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center">
                          <ConsultationIcon className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-800">
                              {language === 'hi' ? doctor?.nameHi : doctor?.name}
                            </h3>
                            <Badge 
                              variant={consultation.status === 'upcoming' ? "default" : "secondary"}
                              className={consultation.status === 'upcoming' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}
                            >
                              {t[consultation.status]}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {t[consultation.type as keyof typeof t]} • {t[doctor?.specialty || 'general']}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">{consultation.date}</span>
                            <span className="text-sm text-gray-600">{consultation.time}</span>
                            <span className="text-sm font-semibold text-cyan-600">₹{consultation.fee}</span>
                          </div>
                        </div>
                      </div>

                      {consultation.status === 'upcoming' && (
                        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl">
                          <ConsultationIcon className="w-4 h-4 mr-2" />
                          {t.consultNow}
                        </Button>
                      )}

                      {userConsent && (
                        <div className="bg-cyan-50 rounded-xl p-3 mt-3">
                          <div className="flex items-center gap-2">
                            <Cloud className="w-4 h-4 text-cyan-600" />
                            <span className="text-sm text-cyan-700">Consultation records synced</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.noConsultations}</h3>
                <p className="text-gray-600 mb-6">{t.bookFirst}</p>
                <Button 
                  onClick={() => setActiveTab('doctors')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl"
                >
                  {t.bookNow}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}