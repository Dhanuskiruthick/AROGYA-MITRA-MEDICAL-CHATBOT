import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  MapPin, 
  Pill, 
  Stethoscope, 
  FileText, 
  Clock, 
  Phone,
  Heart,
  Shield,
  Globe,
  AlertTriangle,
  CreditCard,
  Building
} from 'lucide-react';

type Language = 'en' | 'hi';
type Screen = 'welcome' | 'home' | 'chat' | 'locator' | 'labs' | 'telemedicine' | 'records' | 'privacy' | 'insurance' | 'schemes';

interface HomeDashboardProps {
  language: Language;
  onNavigate: (screen: Screen) => void;
}

const translations = {
  en: {
    greeting: "Welcome to Arogya Mitra",
    subtitle: "Your personal medical assistant",
    chatAssistant: "Chat Assistant",
    chatSubtitle: "Talk to your medical assistant chatbot",
    medicalLocator: "Find Medical Facilities",
    medicalSubtitle: "Locate hospitals, clinics & pharmacies",
    labBooking: "Lab Test Booking",
    labSubtitle: "Book tests and manage appointments",
    telemedicine: "Doctor Consultation",
    teleSubtitle: "Video/audio calls with doctors",
    healthRecords: "Health Records",
    recordsSubtitle: "Manage your medical documents",
    healthInsurance: "Health Insurance",
    insuranceSubtitle: "Ayushman Bharat, MP schemes & private insurance",
    governmentSchemes: "Government Schemes", 
    schemesSubtitle: "Jan Aushadhi, NHM & other govt programs",
    emergency: "🚨 Emergency Help - Call 108",
    emergencySubtitle: "Immediate ambulance & emergency services",
    languageToggle: "Language: English",
    location: "📍 Available across Madhya Pradesh",
    privacyBadge: "🔒 HIPAA-Compliant Privacy • Cloud Optional"
  },
  hi: {
    greeting: "आरोग्य मित्र में आपका स्वागत है",
    subtitle: "आपका व्यक्तिगत चिकित्सा सहायक",
    chatAssistant: "चैट सहायक",
    chatSubtitle: "अपने चिकित्सा सहायक चैटबॉट से बात करें",
    medicalLocator: "चिकित्सा सुविधाएं खोजें",
    medicalSubtitle: "अस्पताल, क्लिनिक और फार्मेसी का पता लगाएं",
    labBooking: "लैब टेस्ट बुकिंग",
    labSubtitle: "टेस्ट बुक करें और अपॉइंटमेंट प्रबंधित करें",
    telemedicine: "डॉक्टर परामर्श",
    teleSubtitle: "डॉक्टरों के साथ वीडियो/ऑडियो कॉल",
    healthRecords: "स्वास्थ्य रिकॉर्ड",
    recordsSubtitle: "अपने चिकित्सा दस्तावेज़ प्रबंधित करें",
    healthInsurance: "स्वास्थ्य बीमा",
    insuranceSubtitle: "आयुष्मान भारत, मप्र योजनाएं और निजी बीमा",
    governmentSchemes: "सरकारी योजनाएं",
    schemesSubtitle: "जन औषधि, NHM और अन्य सरकारी कार्यक्रम",
    emergency: "🚨 आपातकालीन सहायता - 108 कॉल करें",
    emergencySubtitle: "तत्काल एम्बुलेंस और आपातकालीन सेवाएं",
    languageToggle: "भाषा: हिंदी",
    location: "📍 मध्य प्रदेश में उपलब्ध",
    privacyBadge: "🔒 HIPAA-अनुपालित निजता • क्लाउड वैकल्पिक"
  }
};

export function HomeDashboard({ language, onNavigate }: HomeDashboardProps) {
  const t = translations[language] || translations.en;

  const handleEmergencyCall = () => {
    // Simulate emergency call
    window.open('tel:108', '_self');
  };

  const serviceCards = [
    {
      icon: Stethoscope,
      title: t.chatAssistant,
      subtitle: t.chatSubtitle,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      action: () => onNavigate('chat')
    },
    {
      icon: CreditCard,
      title: t.healthInsurance,
      subtitle: t.insuranceSubtitle,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      action: () => onNavigate('insurance')
    },
    {
      icon: Building,
      title: t.governmentSchemes,
      subtitle: t.schemesSubtitle,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      action: () => onNavigate('schemes')
    },
    {
      icon: MapPin,
      title: t.medicalLocator,
      subtitle: t.medicalSubtitle,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      action: () => onNavigate('locator')
    },
    {
      icon: FileText,
      title: t.labBooking,
      subtitle: t.labSubtitle,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      action: () => onNavigate('labs')
    },
    {
      icon: Pill,
      title: t.telemedicine,
      subtitle: t.teleSubtitle,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      action: () => onNavigate('telemedicine')
    },
    {
      icon: Clock,
      title: t.healthRecords,
      subtitle: t.recordsSubtitle,
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      action: () => onNavigate('records')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{t.greeting}</h1>
            <p className="text-cyan-100 text-base">{t.subtitle}</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
        </div>
        
        {/* Language Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-2">
            <Globe className="w-4 h-4" />
            <span className="text-sm">{t.languageToggle}</span>
          </div>
          <div className="text-sm text-cyan-100">{t.location}</div>
        </div>
      </div>

      {/* Privacy Banner */}
      <div className="mx-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-cyan-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">{t.privacyBadge}</p>
              <p className="text-xs text-gray-600">Full control over your medical data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Button - More Prominent */}
      <div className="px-6 mb-6">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 border-red-600 shadow-xl">
          <Button 
            onClick={handleEmergencyCall}
            className="w-full h-20 bg-transparent hover:bg-white/10 text-white rounded-2xl p-6"
            variant="ghost"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold">{t.emergency}</p>
                  <p className="text-red-100 text-sm">{t.emergencySubtitle}</p>
                </div>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="text-white font-bold">108</span>
              </div>
            </div>
          </Button>
        </Card>
      </div>

      {/* Service Cards */}
      <div className="px-6 space-y-4">
        {serviceCards.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <Card 
              key={index}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${service.borderColor} ${service.bgColor} hover:scale-[1.02]`}
              onClick={service.action}
            >
              <div className="p-6 flex items-center gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.subtitle}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-cyan-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-cyan-600">500+</p>
              <p className="text-xs text-gray-600">Hospitals</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">1000+</p>
              <p className="text-xs text-gray-600">Doctors</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">50+</p>
              <p className="text-xs text-gray-600">Districts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}