import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Shield, Heart, Users, CheckCircle, ArrowRight, ExternalLink, Phone, MapPin, CreditCard } from 'lucide-react';

type Language = 'en' | 'hi';

interface HealthInsuranceScreenProps {
  language: Language;
  onBack: () => void;
}

const translations = {
  en: {
    title: "Health Insurance Guide",
    subtitle: "Understanding your healthcare coverage options",
    ayushmanBharat: "Ayushman Bharat",
    stateSchemes: "MP State Schemes", 
    privateInsurance: "Private Insurance",
    ayushmanTitle: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
    ayushmanDesc: "World's largest health insurance scheme providing ₹5 lakh coverage per family per year",
    eligibility: "Eligibility",
    coverage: "Coverage",
    benefits: "Benefits",
    howToApply: "How to Apply",
    ayushmanEligibility: [
      "Rural families as per SECC 2011 database",
      "Urban families with specific occupations",
      "Families below poverty line",
      "Check eligibility at official portal"
    ],
    ayushmanCoverage: [
      "₹5 lakh per family per year",
      "Covers hospitalization costs",
      "Pre and post hospitalization",
      "1,393 procedures covered",
      "No premium for beneficiaries"
    ],
    ayushmanBenefits: [
      "Cashless treatment at empanelled hospitals",
      "Covers entire family",
      "Pre-existing conditions covered",
      "No age limit",
      "Portable across India"
    ],
    ayushmanApply: [
      "Visit nearest Common Service Center",
      "Provide Aadhaar and family details",
      "Verify eligibility online",
      "Get Ayushman card issued",
      "Start using immediately"
    ],
    stateTitle: "Madhya Pradesh State Health Schemes",
    stateDesc: "Additional health coverage schemes by MP Government",
    stateEligibility: [
      "MP residents with valid domicile",
      "BPL families get priority",
      "Different schemes for different income groups",
      "Government employees have separate schemes"
    ],
    stateCoverage: [
      "Supplementary to Ayushman Bharat",
      "Covers additional procedures",
      "State government hospitals",
      "Free medicines at Jan Aushadhi",
      "Diagnostic tests at reduced rates"
    ],
    stateBenefits: [
      "Free treatment at government hospitals",
      "Subsidized private hospital treatment",
      "Free ambulance services",
      "Health checkup camps",
      "Maternal and child health programs"
    ],
    stateApply: [
      "Visit district collector office",
      "Submit income certificate",
      "Provide residence proof", 
      "Get scheme card",
      "Register at empanelled hospitals"
    ],
    privateTitle: "Private Health Insurance",
    privateDesc: "Employer-provided or individual health insurance policies",
    privateEligibility: [
      "Available to all individuals",
      "Medical checkup may be required",
      "Age restrictions vary by insurer",
      "Pre-existing conditions may have waiting period"
    ],
    privateCoverage: [
      "Coverage amount varies (₹1 lakh - ₹1 crore+)",
      "Room rent limits apply",
      "Network hospitals for cashless",
      "Covers OPD and IPD",
      "Premium based on coverage and age"
    ],
    privateBenefits: [
      "Faster claim processing",
      "Better hospital rooms",
      "Wider hospital network",
      "Additional benefits like health checkups",
      "Tax benefits under 80D"
    ],
    privateApply: [
      "Contact insurance agent or company",
      "Compare plans online",
      "Submit application with documents",
      "Pay premium",
      "Policy issued within 7-15 days"
    ],
    importantNote: "Important Note",
    note: "Always direct users to official resources for applications and claims. Do not process claims through this app.",
    officialResources: "Official Resources",
    checkEligibility: "Check Eligibility",
    downloadApp: "Download Official App",
    findHospital: "Find Empanelled Hospital",
    helpline: "Helpline",
    back: "Back"
  },
  hi: {
    title: "स्वास्थ्य बीमा गाइड",
    subtitle: "अपने स्वास्थ्य सेवा कवरेज विकल्पों को समझें",
    ayushmanBharat: "आयुष्मान भारत",
    stateSchemes: "मप्र राज्य योजनाएं",
    privateInsurance: "निजी बीमा",
    ayushmanTitle: "आयुष्मान भारत - प्रधान मंत्री जन आरोग्य योजना",
    ayushmanDesc: "विश्व की सबसे बड़ी स्वास्थ्य बीमा योजना जो प्रति परिवार प्रति वर्ष ₹5 लाख कवरेज प्रदान करती है",
    eligibility: "पात्रता",
    coverage: "कवरेज",
    benefits: "लाभ",
    howToApply: "आवेदन कैसे करें",
    ayushmanEligibility: [
      "SECC 2011 डेटाबेस के अनुसार ग्रामीण परिवार",
      "विशिष्ट व्यवसायों वाले शहरी परिवार",
      "गरीबी रेखा से नीचे के परिवार",
      "आधिकारिक पोर्टल पर पात्रता जांचें"
    ],
    ayushmanCoverage: [
      "प्रति परिवार प्रति वर्ष ₹5 लाख",
      "अस्पताल में भर्ती की लागत कवर",
      "अस्पताल में भर्ती से पहले और बाद",
      "1,393 प्रक्रियाएं कवर",
      "लाभार्थियों के लिए कोई प्रीमियम नहीं"
    ],
    ayushmanBenefits: [
      "सूचीबद्ध अस्पतालों में कैशलेस उपचार",
      "पूरे परिवार को कवर",
      "पूर्व-मौजूदा स्थितियां कवर",
      "कोई आयु सीमा नहीं",
      "पूरे भारत में पोर्टेबल"
    ],
    ayushmanApply: [
      "निकटतम कॉमन सर्विस सेंटर पर जाएं",
      "आधार और पारिवारिक विवरण प्रदान करें",
      "ऑनलाइन पात्रता सत्यापित करें",
      "आयुष्मान कार्ड जारी कराएं",
      "तुरंत उपयोग शुरू करें"
    ],
    stateTitle: "मध्य प्रदेश राज्य स्वास्थ्य योजनाएं",
    stateDesc: "मप्र सरकार की अतिरिक्त स्वास्थ्य कवरेज योजनाएं",
    stateEligibility: [
      "वैध अधिवास के साथ मप्र निवासी",
      "BPL परिवारों को प्राथमिकता",
      "विभिन्न आय समूहों के लिए अलग योजनाएं",
      "सरकारी कर्मचारियों की अलग योजनाएं"
    ],
    stateCoverage: [
      "आयुष्मान भारत का पूरक",
      "अतिरिक्त प्रक्रियाएं कवर",
      "राज्य सरकारी अस्पताल",
      "जन औषधि में मुफ्त दवाएं",
      "कम दरों पर डायग्नोस्टिक टेस्ट"
    ],
    stateBenefits: [
      "सरकारी अस्पतालों में मुफ्त इलाज",
      "सब्सिडी वाला निजी अस्पताल उपचार",
      "मुफ्त एम्बुलेंस सेवाएं",
      "स्वास्थ्य जांच शिविर",
      "मातृ एवं शिशु स्वास्थ्य कार्यक्रम"
    ],
    stateApply: [
      "जिला कलेक्टर कार्यालय जाएं",
      "आय प्रमाण पत्र जमा करें",
      "निवास प्रमाण प्रदान करें",
      "योजना कार्ड प्राप्त करें",
      "सूचीबद्ध अस्पतालों में पंजीकरण"
    ],
    privateTitle: "निजी स्वास्थ्य बीमा",
    privateDesc: "नियोक्ता-प्रदान या व्यक्तिगत स्वास्थ्य बीमा पॉलिसियां",
    privateEligibility: [
      "सभी व्यक्तियों के लिए उपलब्ध",
      "चिकित्सा जांच की आवश्यकता हो सकती है",
      "आयु प्रतिबंध बीमाकर्ता के अनुसार",
      "पूर्व-मौजूदा स्थितियों में प्रतीक्षा अवधि"
    ],
    privateCoverage: [
      "कवरेज राशि अलग (₹1 लाख - ₹1 करोड़+)",
      "कमरे के किराए की सीमा लागू",
      "कैशलेस के लिए नेटवर्क अस्पताल",
      "OPD और IPD कवर",
      "कवरेज और आयु के आधार पर प्रीमियम"
    ],
    privateBenefits: [
      "तेज़ क्लेम प्रोसेसिंग",
      "बेहतर अस्पताल कमरे",
      "व्यापक अस्पताल नेटवर्क",
      "स्वास्थ्य जांच जैसे अतिरिक्त लाभ",
      "80D के तहत कर लाभ"
    ],
    privateApply: [
      "बीमा एजेंट या कंपनी से संपर्क करें",
      "ऑनलाइन प्लान की तुलना करें",
      "दस्तावेजों के साथ आवेदन जमा करें",
      "प्रीमियम का भुगतान करें",
      "7-15 दिन में पॉलिसी जारी"
    ],
    importantNote: "महत्वपूर्ण नोट",
    note: "हमेशा आवेदन और दावों के लिए उपयोगकर्ताओं को आधिकारिक संसाधनों पर भेजें। इस ऐप के माध्यम से दावों की प्रक्रिया न करें।",
    officialResources: "आधिकारिक संसाधन",
    checkEligibility: "पात्रता जांचें",
    downloadApp: "आधिकारिक ऐप डाउनलोड करें",
    findHospital: "सूचीबद्ध अस्पताल खोजें",
    helpline: "हेल्पलाइन",
    back: "वापस"
  }
};

export function HealthInsuranceScreen({ language, onBack }: HealthInsuranceScreenProps) {
  const [activeTab, setActiveTab] = useState("ayushman");
  const t = translations[language];

  const renderInfoSection = (title: string, items: string[]) => (
    <div className="mb-6">
      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-700 text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-6 text-white">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{t.title}</h1>
            <p className="text-cyan-100 text-sm mt-1">{t.subtitle}</p>
          </div>
          <Shield className="w-8 h-8 text-cyan-200" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/90 backdrop-blur-sm">
            <TabsTrigger value="ayushman" className="text-sm">{t.ayushmanBharat}</TabsTrigger>
            <TabsTrigger value="state" className="text-sm">{t.stateSchemes}</TabsTrigger>
            <TabsTrigger value="private" className="text-sm">{t.privateInsurance}</TabsTrigger>
          </TabsList>

          {/* Ayushman Bharat Tab */}
          <TabsContent value="ayushman">
            <div className="space-y-6">
              <Card className="p-6 bg-white/90 backdrop-blur-sm border-cyan-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{t.ayushmanTitle}</h3>
                    <p className="text-gray-600 text-sm">{t.ayushmanDesc}</p>
                  </div>
                </div>

                {renderInfoSection(t.eligibility, t.ayushmanEligibility)}
                {renderInfoSection(t.coverage, t.ayushmanCoverage)}
                {renderInfoSection(t.benefits, t.ayushmanBenefits)}
                {renderInfoSection(t.howToApply, t.ayushmanApply)}
              </Card>

              {/* Official Resources */}
              <Card className="p-6 bg-white/90 backdrop-blur-sm border-cyan-200">
                <h4 className="font-bold text-gray-800 mb-4">{t.officialResources}</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-12 text-xs flex items-center gap-2"
                    onClick={() => window.open('https://pmjay.gov.in', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t.checkEligibility}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12 text-xs flex items-center gap-2"
                    onClick={() => window.open('https://pmjay.gov.in/app', '_blank')}
                  >
                    <Phone className="w-4 h-4" />
                    {t.downloadApp}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12 text-xs flex items-center gap-2"
                    onClick={() => window.open('https://hospitals.pmjay.gov.in', '_blank')}
                  >
                    <MapPin className="w-4 h-4" />
                    {t.findHospital}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12 text-xs flex items-center gap-2"
                    onClick={() => window.open('tel:14555', '_self')}
                  >
                    <Phone className="w-4 h-4" />
                    {t.helpline}: 14555
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* State Schemes Tab */}
          <TabsContent value="state">
            <div className="space-y-6">
              <Card className="p-6 bg-white/90 backdrop-blur-sm border-cyan-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{t.stateTitle}</h3>
                    <p className="text-gray-600 text-sm">{t.stateDesc}</p>
                  </div>
                </div>

                {renderInfoSection(t.eligibility, t.stateEligibility)}
                {renderInfoSection(t.coverage, t.stateCoverage)}
                {renderInfoSection(t.benefits, t.stateBenefits)}
                {renderInfoSection(t.howToApply, t.stateApply)}
              </Card>
            </div>
          </TabsContent>

          {/* Private Insurance Tab */}
          <TabsContent value="private">
            <div className="space-y-6">
              <Card className="p-6 bg-white/90 backdrop-blur-sm border-cyan-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{t.privateTitle}</h3>
                    <p className="text-gray-600 text-sm">{t.privateDesc}</p>
                  </div>
                </div>

                {renderInfoSection(t.eligibility, t.privateEligibility)}
                {renderInfoSection(t.coverage, t.privateCoverage)}
                {renderInfoSection(t.benefits, t.privateBenefits)}
                {renderInfoSection(t.howToApply, t.privateApply)}
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Important Note */}
        <Card className="mt-6 p-4 bg-amber-50/90 backdrop-blur-sm border-2 border-amber-200">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-amber-800 text-sm mb-1">{t.importantNote}</p>
              <p className="text-amber-700 text-sm">{t.note}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}