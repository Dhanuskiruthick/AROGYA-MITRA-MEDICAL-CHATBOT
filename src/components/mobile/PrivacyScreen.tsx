import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { 
  Shield, 
  Download, 
  Lock, 
  Eye, 
  Database, 
  Cloud,
  CloudOff,
  Trash2,
  FileText,
  AlertTriangle,
  CheckCircle,
  Settings,
  UserCheck,
  History,
  Key
} from 'lucide-react';

type Language = 'en' | 'hi';

interface PrivacyScreenProps {
  language: Language;
  userConsent: boolean;
  onConsentChange: (consent: boolean) => void;
}

const translations = {
  en: {
    title: "Privacy & Data Control",
    subtitle: "HIPAA-inspired privacy controls",
    cloudStorage: "Cloud Storage",
    cloudConsent: "Enable cloud data storage",
    cloudDescription: "Save your health records, consultations, and chat history across devices",
    dataEncryption: "Data Encryption",
    anonymousMode: "Anonymous Mode",
    dataExport: "Export Your Data",
    deleteData: "Delete All Data",
    viewHistory: "View Data History",
    enabled: "Enabled",
    disabled: "Disabled",
    exportData: "Export Data",
    deleteAll: "Delete All Data",
    viewHistory: "View History",
    noThirdParty: "No third-party data sharing",
    hipaaCompliant: "HIPAA-inspired privacy guidelines",
    encryptedStorage: "All data encrypted at rest and in transit",
    userControl: "Full user control over data",
    dataMinimization: "We only collect necessary health information",
    consentRequired: "Cloud storage requires explicit consent",
    localFirst: "Data stored locally by default",
    deleteAnytime: "Delete all data anytime",
    transparentPolicy: "Transparent data handling practices",
    settings: "Privacy Controls",
    advanced: "Data Management",
    cloudBenefits: "Benefits of Cloud Storage",
    syncDevices: "Sync across devices",
    backupData: "Automatic backup",
    accessAnywhere: "Access from anywhere",
    secureStorage: "Military-grade encryption"
  },
  hi: {
    title: "निजता और डेटा नियंत्रण",
    subtitle: "HIPAA-प्रेरित निजता नियंत्रण",
    cloudStorage: "क्लाउड स्टोरेज",
    cloudConsent: "क्लाउड डेटा स्टोरेज सक्षम करें",
    cloudDescription: "अपने स्वास्थ्य रिकॉर्ड, परामर्श और चैट इतिहास को डिवाइसों में सहेजें",
    dataEncryption: "डेटा एन्क्रिप्शन",
    anonymousMode: "गुमनाम मोड",
    dataExport: "अपना डेटा निर्यात करें",
    deleteData: "सभी डेटा हटाएं",
    viewHistory: "डेटा इतिहास देखें",
    enabled: "सक्षम",
    disabled: "अक्षम",
    exportData: "डेटा निर्यात करें",
    deleteAll: "सभी डेटा हटाएं",
    viewHistory: "इतिहास देखें",
    noThirdParty: "कोई तृतीय-पक्ष डेटा साझाकरण नहीं",
    hipaaCompliant: "HIPAA-प्रेरित निजता दिशानिर्देश",
    encryptedStorage: "सभी डेटा विश्राम और पारगमन में एन्क्रिप्टेड",
    userControl: "डेटा पर पूर्ण उपयोगकर्ता नियंत्रण",
    dataMinimization: "हम केवल आवश्यक स्वास्थ्य जानकारी एकत्र करते हैं",
    consentRequired: "क्लाउड स्टोरेज के लिए स्पष्ट सहमति आवश्यक",
    localFirst: "डेटा डिफ़ॉल्ट रूप से स्थानीय रूप से संग्रहीत",
    deleteAnytime: "किसी भी समय सभी डेटा हटाएं",
    transparentPolicy: "पारदर्शी डेटा हैंडलिंग प्रथाएं",
    settings: "निजता नियंत्रण",
    advanced: "डेटा प्रबंधन",
    cloudBenefits: "क्लाउड स्टोरेज के फायदे",
    syncDevices: "डिवाइसों में सिंक करें",
    backupData: "स्वचालित बैकअप",
    accessAnywhere: "कहीं से भी एक्सेस करें",
    secureStorage: "मिलिट्री-ग्रेड एन्क्रिप्शन"
  }
};

export function PrivacyScreen({ language, userConsent, onConsentChange }: PrivacyScreenProps) {
  const [anonymousMode, setAnonymousMode] = useState(true);
  
  const t = translations[language] || translations.en;

  const privacyFeatures = [
    { icon: Shield, text: t.noThirdParty, color: 'bg-green-500' },
    { icon: Lock, text: t.encryptedStorage, color: 'bg-blue-500' },
    { icon: UserCheck, text: t.userControl, color: 'bg-purple-500' },
    { icon: Eye, text: t.transparentPolicy, color: 'bg-orange-500' }
  ];

  const cloudBenefits = [
    { icon: Database, text: t.syncDevices },
    { icon: Shield, text: t.backupData },
    { icon: Cloud, text: t.accessAnywhere },
    { icon: Key, text: t.secureStorage }
  ];

  const handleExportData = () => {
    console.log('Exporting user data...');
    // Simulate data export
  };

  const handleDeleteAllData = () => {
    console.log('Deleting all user data...');
    // Simulate data deletion
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{t.title}</h1>
            <p className="text-cyan-100 text-sm">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* HIPAA Compliance Badge */}
      <div className="mx-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-cyan-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{t.hipaaCompliant}</p>
              <p className="text-xs text-gray-600">{t.dataMinimization}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Storage Control */}
      <div className="px-6 mb-6">
        <Card className="bg-white border-2 border-gray-100 shadow-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${userConsent ? 'bg-cyan-500' : 'bg-gray-500'} rounded-2xl flex items-center justify-center`}>
                  {userConsent ? <Cloud className="w-6 h-6 text-white" /> : <CloudOff className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{t.cloudStorage}</h3>
                  <p className="text-sm text-gray-600">{t.cloudDescription}</p>
                </div>
              </div>
              <Switch
                checked={userConsent}
                onCheckedChange={onConsentChange}
              />
            </div>
            
            <div className={`p-3 rounded-xl ${userConsent ? 'bg-cyan-50' : 'bg-gray-50'}`}>
              <p className={`text-sm font-medium ${userConsent ? 'text-cyan-800' : 'text-gray-800'}`}>
                {userConsent ? t.enabled : t.disabled}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {userConsent ? "Your data is encrypted and synced securely" : t.localFirst}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Cloud Benefits (when enabled) */}
      {userConsent && (
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">{t.cloudBenefits}</h2>
          <Card className="bg-white border-2 border-gray-100 shadow-lg">
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {cloudBenefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 bg-cyan-50 rounded-xl">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-cyan-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-800">{benefit.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Privacy Features */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Privacy Protection</h2>
        <Card className="bg-white border-2 border-gray-100 shadow-lg">
          <div className="p-6">
            <div className="space-y-4">
              {privacyFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 ${feature.color} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{feature.text}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Anonymous Mode */}
      <div className="px-6 mb-6">
        <Card className="bg-white border-2 border-gray-100 shadow-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{t.anonymousMode}</h3>
                  <p className="text-sm text-gray-600">Use app without providing personal information</p>
                </div>
              </div>
              <Switch
                checked={anonymousMode}
                onCheckedChange={setAnonymousMode}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Data Management */}
      <div className="px-6 space-y-4 mb-24">
        <h2 className="text-lg font-bold text-gray-800">{t.advanced}</h2>
        
        <div className="space-y-3">
          <Button 
            onClick={handleExportData}
            className="w-full h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-2xl"
          >
            <Download className="w-5 h-5 mr-3" />
            <div className="text-left">
              <p className="font-semibold">{t.exportData}</p>
              <p className="text-xs text-cyan-100">Download all your health data</p>
            </div>
          </Button>

          <Button 
            variant="outline"
            className="w-full h-14 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-2xl"
          >
            <History className="w-5 h-5 mr-3" />
            <div className="text-left">
              <p className="font-semibold">{t.viewHistory}</p>
              <p className="text-xs text-blue-500">See what data has been stored</p>
            </div>
          </Button>

          <Button 
            onClick={handleDeleteAllData}
            variant="outline" 
            className="w-full h-14 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-2xl"
          >
            <Trash2 className="w-5 h-5 mr-3" />
            <div className="text-left">
              <p className="font-semibold">{t.deleteAll}</p>
              <p className="text-xs text-red-500">{t.deleteAnytime}</p>
            </div>
          </Button>
        </div>

        {/* Disclaimer */}
        <Card className="bg-amber-50 border-2 border-amber-200 shadow-lg mt-6">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Important Notice</p>
                <p className="text-xs text-amber-700 mt-1">
                  {language === 'hi' 
                    ? "Arogya Mitra व्यक्तिगत पहचान योग्य जानकारी (PII) या संवेदनशील डेटा एकत्र करने के लिए नहीं है।"
                    : "Arogya Mitra is not intended for collecting personally identifiable information (PII) or securing sensitive data."
                  }
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}