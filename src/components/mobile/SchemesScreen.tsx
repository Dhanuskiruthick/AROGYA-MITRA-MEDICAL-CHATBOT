import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Filter, 
  Heart, 
  IndianRupee, 
  Users, 
  FileText, 
  Phone,
  Download,
  CheckCircle,
  Clock
} from 'lucide-react';

type Language = 'en' | 'hi' | 'bundeli' | 'malvi' | 'nimadi' | 'bagheli';

interface SchemesScreenProps {
  language: Language;
}

const schemes = [
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat PM-JAY',
    nameHi: 'आयुष्मान भारत पीएम-जेएवाई',
    coverage: '₹5,00,000',
    beneficiaries: '10+ Crore families',
    description: 'Comprehensive health coverage for secondary and tertiary care',
    descriptionHi: 'द्वितीयक और तृतीयक देखभाल के लिए व्यापक स्वास्थ्य कवरेज',
    eligibility: 'SECC-2011 listed families',
    eligibilityHi: 'SECC-2011 सूचीबद्ध परिवार',
    helpline: '14555',
    status: 'Active',
    color: 'bg-blue-500',
    category: 'central'
  },
  {
    id: 'mjay',
    name: 'Mukhyamantri Jan Arogya Yojana',
    nameHi: 'मुख्यमंत्री जन आरोग्य योजना',
    coverage: '₹5,00,000',
    beneficiaries: 'All MP residents',
    description: 'Universal health coverage for all MP families',
    descriptionHi: 'सभी MP परिवारों के लिए सार्वभौमिक स्वास्थ्य कवरेज',
    eligibility: 'All MP residents',
    eligibilityHi: 'सभी MP निवासी',
    helpline: '0755-2761800',
    status: 'Active',
    color: 'bg-green-500',
    category: 'state'
  },
  {
    id: 'janani-suraksha',
    name: 'Janani Suraksha Yojana',
    nameHi: 'जननी सुरक्षा योजना',
    coverage: '₹1,400 - ₹1,000',
    beneficiaries: 'Pregnant women',
    description: 'Cash assistance for institutional delivery',
    descriptionHi: 'संस्थागत प्रसव के लिए नकद सहायता',
    eligibility: 'BPL pregnant women',
    eligibilityHi: 'BPL गर्भवती महिलाएं',
    helpline: '104',
    status: 'Active',
    color: 'bg-pink-500',
    category: 'central'
  },
  {
    id: 'free-medicine',
    name: 'Free Medicine Program',
    nameHi: 'निःशुल्क दवा कार्यक्रम',
    coverage: 'Free medicines',
    beneficiaries: 'All patients',
    description: '600+ essential medicines available free',
    descriptionHi: '600+ आवश्यक दवाएं मुफ्त उपलब्ध',
    eligibility: 'Government hospital patients',
    eligibilityHi: 'सरकारी अस्पताल के मरीज़',
    helpline: '104',
    status: 'Active',
    color: 'bg-purple-500',
    category: 'state'
  },
  {
    id: 'rashtriya-bal',
    name: 'Rashtriya Bal Swasthya Karyakram',
    nameHi: 'राष्ट्रीय बाल स्वास्थ्य कार्यक्रम',
    coverage: 'Free treatment',
    beneficiaries: 'Children 0-18 years',
    description: 'Early detection and treatment of child health conditions',
    descriptionHi: 'बाल स्वास्थ्य स्थितियों का प्रारंभिक पता लगाना और उपचार',
    eligibility: 'All children',
    eligibilityHi: 'सभी बच्चे',
    helpline: '104',
    status: 'Active',
    color: 'bg-orange-500',
    category: 'central'
  }
];

const translations = {
  en: {
    title: "Government Health Schemes",
    subtitle: "Benefits and assistance programs",
    searchPlaceholder: "Search schemes...",
    filter: "Filter",
    all: "All",
    central: "Central",
    state: "State",
    coverage: "Coverage",
    beneficiaries: "Beneficiaries",
    eligibility: "Eligibility",
    helpline: "Helpline",
    applyNow: "Apply Now",
    learnMore: "Learn More",
    downloadInfo: "Download Info",
    active: "Active",
    offline: "Available Offline"
  },
  hi: {
    title: "सरकारी स्वास्थ्य योजनाएं",
    subtitle: "लाभ और सहायता कार्यक्रम",
    searchPlaceholder: "योजनाएं खोजें...",
    filter: "फिल्टर",
    all: "सभी",
    central: "केंद्रीय",
    state: "राज्य",
    coverage: "कवरेज",
    beneficiaries: "लाभार्थी",
    eligibility: "पात्रता",
    helpline: "हेल्पलाइन",
    applyNow: "अभी आवेदन करें",
    learnMore: "और जानें",
    downloadInfo: "जानकारी डाउनलोड करें",
    active: "सक्रिय",
    offline: "ऑफलाइन उपलब्ध"
  }
};

export function SchemesScreen({ language }: SchemesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const t = translations[language] || translations.en;

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = language === 'hi' 
      ? scheme.nameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.descriptionHi.toLowerCase().includes(searchQuery.toLowerCase())
      : scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || scheme.category === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 px-6 py-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{t.title}</h1>
            <p className="text-blue-100 text-sm">{t.subtitle}</p>
          </div>
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
        <div className="flex gap-2">
          {['all', 'central', 'state'].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full ${
                selectedFilter === filter 
                  ? 'bg-white text-blue-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {t[filter as keyof typeof t]}
            </Button>
          ))}
        </div>
      </div>

      {/* Offline Notice */}
      <div className="mx-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-200">
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-gray-800">{t.offline}</p>
              <p className="text-xs text-gray-600">Scheme information saved for offline access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Schemes List */}
      <div className="px-6 space-y-4 pb-24">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 ${scheme.color} rounded-2xl flex items-center justify-center`}>
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {language === 'hi' ? scheme.nameHi : scheme.name}
                    </h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {t.active}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'hi' ? scheme.descriptionHi : scheme.description}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <IndianRupee className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-700">{t.coverage}</span>
                  </div>
                  <p className="text-sm font-bold text-blue-800">{scheme.coverage}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-green-700">{t.beneficiaries}</span>
                  </div>
                  <p className="text-sm font-bold text-green-800">{scheme.beneficiaries}</p>
                </div>
              </div>

              {/* Eligibility */}
              <div className="bg-gray-50 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-xs font-medium text-gray-700">{t.eligibility}</span>
                </div>
                <p className="text-sm text-gray-800">
                  {language === 'hi' ? scheme.eligibilityHi : scheme.eligibility}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-xl">
                  {t.applyNow}
                </Button>
                <Button variant="outline" className="rounded-xl border-2">
                  <Phone className="w-4 h-4 mr-2" />
                  {scheme.helpline}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredSchemes.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No schemes found</h3>
          <p className="text-gray-600">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
}