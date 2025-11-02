import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft, Heart, Shield, MapPin, Phone, Clock, Star, ExternalLink, Pill, Building, Users, CheckCircle, AlertCircle, IndianRupee } from 'lucide-react';

type Language = 'en' | 'hi';

interface GovernmentSchemesScreenProps {
  language: Language;
  onBack: () => void;
}

const translations = {
  en: {
    title: "Government Health Schemes",
    subtitle: "Healthcare support programs by Government of India & Madhya Pradesh",
    ayushmanBharat: "Ayushman Bharat",
    ayushmanDesc: "World's largest health insurance scheme covering 10.74 crore families",
    janAushadhi: "Jan Aushadhi Stores",
    janAushadhiDesc: "Affordable generic medicines at 50-90% discount from branded prices",
    nhm: "National Health Mission",
    nhmDesc: "Improving healthcare delivery system in rural areas",
    mpSchemes: "MP State Schemes",
    mpSchemesDesc: "Additional healthcare schemes by Government of Madhya Pradesh",
    features: "Key Features",
    coverage: "Coverage Details",
    howToAccess: "How to Access",
    nearbyLocations: "Find Nearby",
    viewDetails: "View Details",
    back: "Back",
    helpline: "Helpline",
    officialWebsite: "Official Website",
    benefits: "Benefits",
    eligibility: "Eligibility",
    importantNote: "Important Note",
    alwaysConsult: "Always consult official resources for applications and detailed information. This app provides general guidance only.",
    medicines: "Medicines Available",
    stores: "Store Locations",
    qualityAssured: "Quality Assured",
    genericInfo: "Generic medicines contain the same active ingredients as branded medicines but cost significantly less.",
    findStore: "Find Nearest Store",
    callHelpline: "Call Helpline",
    visitWebsite: "Visit Official Website",
    commonMedicines: "Common Medicines & Prices",
    mpStores: "MP Jan Aushadhi Stores",
    testimonial: "Testimonial",
    testimonialText: "\"I save ₹2000 every month on my diabetes medicines by using Jan Aushadhi stores. Same quality, much lower price!\"",
    saveUpTo: "Save up to 90% on medicines",
    whyGeneric: "Why Generic Medicines?",
    genericBenefits: [
      "Same active ingredients as branded medicines",
      "WHO-GMP certified manufacturing standards", 
      "Bioequivalence proven through clinical studies",
      "Approved by Drug Controller General of India",
      "Quality control at every manufacturing step"
    ]
  },
  hi: {
    title: "सरकारी स्वास्थ्य योजनाएं",
    subtitle: "भारत सरकार और मध्य प्रदेश सरकार के स्वास्थ्य सहायता कार्यक्रम",
    ayushmanBharat: "आयुष्मान भारत",
    ayushmanDesc: "दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना जो 10.74 करोड़ परिवारों को कवर करती है",
    janAushadhi: "जन औषधि स्टोर",
    janAushadhiDesc: "ब्रांडेड दवाओं से 50-90% छूट पर किफायती जेनेरिक दवाएं",
    nhm: "राष्ट्रीय स्वास्थ्य मिशन",
    nhmDesc: "ग्रामीण क्षेत्रों में स्वास्थ्य सेवा वितरण प्रणाली में सुधार",
    mpSchemes: "मप्र राज्य योजनाएं",
    mpSchemesDesc: "मध्य प्रदेश सरकार की अतिरिक्त स्वास्थ्य सेवा योजनाएं",
    features: "मुख्य विशेषताएं",
    coverage: "कवरेज विवरण",
    howToAccess: "कैसे पहुंचें",
    nearbyLocations: "निकटतम स्थान खोजें",
    viewDetails: "विवरण देखें",
    back: "वापस",
    helpline: "हेल्पलाइन",
    officialWebsite: "आधिकारिक वेबसाइट",
    benefits: "लाभ",
    eligibility: "पात्रता",
    importantNote: "महत्वपूर्ण सूचना",
    alwaysConsult: "आवेदन और विस्तृत जानकारी के लिए हमेशा आधिकारिक संसाधनों से सलाह लें। यह ऐप केवल सामान्य मार्गदर्शन प्रदान करती है।",
    medicines: "उपलब्ध दवाएं",
    stores: "स्टोर स्थान",
    qualityAssured: "गुणवत्ता आश्वासन",
    genericInfo: "जेनेरिक दवाओं में ब्रांडेड दवाओं के समान सक्रिय घटक होते हैं लेकिन वे काफी कम कीमत में मिलती हैं।",
    findStore: "निकटतम स्टोर खोजें",
    callHelpline: "हेल्पलाइन कॉल करें",
    visitWebsite: "आधिकारिक वेबसाइट देखें",
    commonMedicines: "आम दवाएं और कीमतें",
    mpStores: "मप्र जन औषधि स्टोर",
    testimonial: "प्रशंसापत्र",
    testimonialText: "\"जन औषधि स्टोर का उपयोग करके मैं अपनी मधुमेह की दवाओं पर हर महीने ₹2000 बचाता हूं। समान गुणवत्ता, बहुत कम कीमत!\"",
    saveUpTo: "दवाओं पर 90% तक बचत करें",
    whyGeneric: "जेनेरिक दवाएं क्यों?",
    genericBenefits: [
      "ब्रांडेड दवाओं के समान सक्रिय घटक",
      "WHO-GMP प्रमाणित निर्माण मानक",
      "नैदानिक अध्ययन के माध्यम से सिद्ध जैविक समानता",
      "भारत के औषधि नियंत्रक जनरल द्वारा अनुमोदित",
      "हर निर्माण चरण में गुणवत्ता नियंत्रण"
    ]
  }
};

export function GovernmentSchemesScreen({ language, onBack }: GovernmentSchemesScreenProps) {
  const [selectedScheme, setSelectedScheme] = useState<string | null>('janaushadhi');
  
  const t = translations[language];

  const commonMedicines = language === 'en' ? [
    { name: 'Paracetamol 500mg (10 tablets)', generic: '₹2-5', branded: '₹15-25', savings: '80%' },
    { name: 'Ibuprofen 400mg (10 tablets)', generic: '₹8-12', branded: '₹30-50', savings: '75%' },
    { name: 'Metformin 500mg (30 tablets)', generic: '₹15-25', branded: '₹80-120', savings: '80%' },
    { name: 'Amlodipine 5mg (30 tablets)', generic: '₹12-20', branded: '₹45-80', savings: '75%' },
    { name: 'Omeprazole 20mg (30 capsules)', generic: '₹8-15', branded: '₹35-60', savings: '75%' },
    { name: 'Atorvastatin 10mg (30 tablets)', generic: '₹25-40', branded: '₹120-200', savings: '80%' }
  ] : [
    { name: 'पैरासिटामोल 500mg (10 गोलियां)', generic: '₹2-5', branded: '₹15-25', savings: '80%' },
    { name: 'इबुप्रोफेन 400mg (10 गोलियां)', generic: '₹8-12', branded: '₹30-50', savings: '75%' },
    { name: 'मेटफॉर्मिन 500mg (30 गोलियां)', generic: '₹15-25', branded: '₹80-120', savings: '80%' },
    { name: 'एम्लोडिपाइन 5mg (30 गोलियां)', generic: '₹12-20', branded: '₹45-80', savings: '75%' },
    { name: 'ओमेप्राजोल 20mg (30 कैप्सूल)', generic: '₹8-15', branded: '₹35-60', savings: '75%' },
    { name: 'एटोरवास्टेटिन 10mg (30 गोलियां)', generic: '₹25-40', branded: '₹120-200', savings: '80%' }
  ];

  const mpStores = language === 'en' ? [
    { city: 'Bhopal', count: '45+', areas: 'MP Nagar, Arera Colony, Jahangirabad, Kolar' },
    { city: 'Indore', count: '38+', areas: 'Vijay Nagar, Palasia, Bengali Square, Rajwada' },
    { city: 'Jabalpur', count: '22+', areas: 'Napier Town, Civil Lines, Wright Town, Madan Mahal' },
    { city: 'Gwalior', count: '18+', areas: 'Lashkar, City Center, Thatipur, Maharaj Bagh' },
    { city: 'Ujjain', count: '15+', areas: 'Mahakal Road, Dewas Gate, Nanakheda, Freeganj' }
  ] : [
    { city: 'भोपाल', count: '45+', areas: 'एमपी नगर, अरेरा कॉलोनी, जहांगीराबाद, कोलार' },
    { city: 'इंदौर', count: '38+', areas: 'विजय नगर, पलासिया, बंगाली स्क्वेयर, राजवाड़ा' },
    { city: 'जबलपुर', count: '22+', areas: 'नेपियर टाउन, सिविल लाइन्स, राइट टाउन, मदन महल' },
    { city: 'ग्वालियर', count: '18+', areas: 'लश्कर, सिटी सेंटर, थतिपुर, महाराज बाग' },
    { city: 'उज्जैन', count: '15+', areas: 'महाकाल रोड, देवास गेट, नानाखेड़ा, फ्रीगंज' }
  ];

  if (selectedScheme === 'janaushadhi') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-6 text-white">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedScheme(null)}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{t.janAushadhi}</h1>
              <p className="text-green-100 text-sm mt-1">{t.janAushadhiDesc}</p>
            </div>
            <Pill className="w-8 h-8 text-green-200" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 pb-20">
          {/* Save Money Banner */}
          <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white border-none">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">{t.saveUpTo}</h3>
                <p className="text-orange-100 text-sm">{t.genericInfo}</p>
              </div>
              <div className="text-3xl font-bold bg-white/20 w-16 h-16 rounded-full flex items-center justify-center">
                90%
              </div>
            </div>
          </Card>

          {/* Why Generic Section */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-green-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              {t.whyGeneric}
            </h3>
            <div className="space-y-3">
              {t.genericBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Common Medicines Pricing */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-green-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-green-500" />
              {t.commonMedicines}
            </h3>
            <div className="space-y-3">
              {commonMedicines.map((medicine, index) => (
                <div key={index} className="border rounded-xl p-3 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800 text-sm">{medicine.name}</h4>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                      {medicine.savings} {language === 'hi' ? 'बचत' : 'savings'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-600">{language === 'hi' ? 'जेनेरिक:' : 'Generic:'}</span>
                      <span className="font-bold text-green-600 ml-2">{medicine.generic}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{language === 'hi' ? 'ब्रांडेड:' : 'Branded:'}</span>
                      <span className="text-gray-500 line-through ml-2">{medicine.branded}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* MP Store Locations */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-green-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-500" />
              {t.mpStores}
            </h3>
            <div className="space-y-4">
              {mpStores.map((store, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div>
                    <h4 className="font-bold text-gray-800">{store.city}</h4>
                    <p className="text-gray-600 text-sm">{store.areas}</p>
                  </div>
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {store.count}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Testimonial */}
          <Card className="p-6 bg-blue-50/90 backdrop-blur-sm border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3">{t.testimonial}</h3>
            <div className="bg-white p-4 rounded-xl border-l-4 border-blue-500">
              <p className="text-gray-700 italic text-sm mb-3">{t.testimonialText}</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-600">
                  {language === 'hi' ? 'राम प्रसाद, भोपाल' : 'Ram Prasad, Bhopal'}
                </span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => window.open('https://janaushadhi.gov.in/storelocator.aspx', '_blank')}
              className="h-14 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-2xl flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              {t.findStore}
            </Button>
            <Button 
              onClick={() => window.open('tel:18001805253', '_self')}
              variant="outline"
              className="h-14 border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-2xl flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {t.callHelpline}
            </Button>
          </div>

          {/* Official Website */}
          <Button 
            onClick={() => window.open('https://janaushadhi.gov.in', '_blank')}
            variant="ghost"
            className="w-full text-green-600 hover:bg-green-50 flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            {t.visitWebsite}
          </Button>
        </div>
      </div>
    );
  }

  // Scheme Selection Screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-6 text-white">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{t.title}</h1>
            <p className="text-cyan-100 text-sm mt-1">{t.subtitle}</p>
          </div>
          <Shield className="w-8 h-8 text-cyan-200" />
        </div>
      </div>

      {/* Scheme Cards */}
      <div className="p-6 space-y-4 pb-20">
        {/* Jan Aushadhi */}
        <Card 
          className="p-6 bg-white/90 backdrop-blur-sm border-green-200 cursor-pointer hover:shadow-xl transition-all duration-200"
          onClick={() => setSelectedScheme('janaushadhi')}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t.janAushadhi}</h3>
              <p className="text-gray-600 text-sm mb-3">{t.janAushadhiDesc}</p>
              <div className="flex items-center justify-between">
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                  {language === 'hi' ? '9000+ स्टोर' : '9000+ Stores'}
                </div>
                <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
              </div>
            </div>
          </div>
        </Card>

        {/* Ayushman Bharat */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-orange-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t.ayushmanBharat}</h3>
              <p className="text-gray-600 text-sm mb-3">{t.ayushmanDesc}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold text-center">
                  ₹5 {language === 'hi' ? 'लाख कवर' : 'Lakh Cover'}
                </div>
                <Button 
                  onClick={() => window.open('tel:14555', '_self')}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  {t.helpline}: 14555
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* National Health Mission */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t.nhm}</h3>
              <p className="text-gray-600 text-sm mb-3">{t.nhmDesc}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold text-center">
                  {language === 'hi' ? 'ग्रामीण फोकस' : 'Rural Focus'}
                </div>
                <Button 
                  onClick={() => window.open('tel:104', '_self')}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  {t.helpline}: 104
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Important Note */}
        <Card className="p-4 bg-amber-50/90 backdrop-blur-sm border-2 border-amber-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-amber-800 text-sm mb-1">{t.importantNote}</p>
              <p className="text-amber-700 text-sm">{t.alwaysConsult}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}