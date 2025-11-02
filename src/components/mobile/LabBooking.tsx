import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Search,
  Filter,
  Star,
  Phone,
  CheckCircle,
  AlertCircle,
  Cloud,
  CloudOff,
  FileText
} from 'lucide-react';

type Language = 'en' | 'hi';

interface LabTest {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  duration: string;
  fasting: boolean;
  category: string;
}

interface Lab {
  id: string;
  name: string;
  nameHi: string;
  rating: number;
  distance: string;
  phone: string;
  address: string;
  addressHi: string;
  timings: string;
  homeCollection: boolean;
}

interface Appointment {
  id: string;
  labId: string;
  testIds: string[];
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  totalPrice: number;
}

interface LabBookingProps {
  language: Language;
  userConsent: boolean;
}

const popularTests: LabTest[] = [
  {
    id: '1',
    name: 'Complete Blood Count (CBC)',
    nameHi: 'पूर्ण रक्त गणना (सीबीसी)',
    price: 300,
    duration: '2 hours',
    fasting: false,
    category: 'Blood'
  },
  {
    id: '2',
    name: 'Lipid Profile',
    nameHi: 'लिपिड प्रोफाइल',
    price: 800,
    duration: '4 hours',
    fasting: true,
    category: 'Blood'
  },
  {
    id: '3',
    name: 'Thyroid Function Test',
    nameHi: 'थायराइड फ़ंक्शन टेस्ट',
    price: 600,
    duration: '6 hours',
    fasting: false,
    category: 'Blood'
  },
  {
    id: '4',
    name: 'HbA1c (Diabetes)',
    nameHi: 'एचबीए1सी (मधुमेह)',
    price: 450,
    duration: '4 hours',
    fasting: false,
    category: 'Blood'
  }
];

const nearbyLabs: Lab[] = [
  {
    id: '1',
    name: 'SRL Diagnostics',
    nameHi: 'एसआरएल डायग्नोस्टिक्स',
    rating: 4.5,
    distance: '1.2 km',
    phone: '0755-2345678',
    address: 'MG Road, Bhopal',
    addressHi: 'एमजी रोड, भोपाल',
    timings: '6 AM - 10 PM',
    homeCollection: true
  },
  {
    id: '2',
    name: 'Dr Lal PathLabs',
    nameHi: 'डॉ लाल पैथलैब्स',
    rating: 4.3,
    distance: '2.1 km',
    phone: '0755-2567890',
    address: 'Arera Colony',
    addressHi: 'एरेरा कॉलोनी',
    timings: '7 AM - 9 PM',
    homeCollection: true
  }
];

const translations = {
  en: {
    title: "Lab Test Booking",
    subtitle: "Book tests & view appointments",
    searchPlaceholder: "Search lab tests...",
    popularTests: "Popular Tests",
    nearbyLabs: "Nearby Labs",
    myAppointments: "My Appointments",
    bookNow: "Book Now",
    homeCollection: "Home Collection",
    fasting: "Fasting Required",
    duration: "Duration",
    price: "Price",
    rating: "Rating",
    timings: "Timings",
    callLab: "Call Lab",
    selectTests: "Select Tests",
    selectLab: "Select Lab",
    bookAppointment: "Book Appointment",
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled",
    cloudSaved: "Saved to cloud",
    localOnly: "Local only",
    total: "Total",
    noAppointments: "No appointments found",
    bookFirst: "Book your first lab test to get started"
  },
  hi: {
    title: "लैब टेस्ट बुकिंग",
    subtitle: "टेस्ट बुक करें और अपॉइंटमेंट देखें",
    searchPlaceholder: "लैब टेस्ट खोजें...",
    popularTests: "लोकप्रिय टेस्ट",
    nearbyLabs: "नजदीकी लैब",
    myAppointments: "मेरे अपॉइंटमेंट",
    bookNow: "अभी बुक करें",
    homeCollection: "होम कलेक्शन",
    fasting: "उपवास आवश्यक",
    duration: "अवधि",
    price: "मूल्य",
    rating: "रेटिंग",
    timings: "समय",
    callLab: "लैब को कॉल करें",
    selectTests: "टेस्ट चुनें",
    selectLab: "लैब चुनें",
    bookAppointment: "अपॉइंटमेंट बुक करें",
    upcoming: "आगामी",
    completed: "पूर्ण",
    cancelled: "रद्द",
    cloudSaved: "क्लाउड में सहेजा गया",
    localOnly: "केवल स्थानीय",
    total: "कुल",
    noAppointments: "कोई अपॉइंटमेंट नहीं मिला",
    bookFirst: "शुरू करने के लिए अपना पहला लैब टेस्ट बुक करें"
  }
};

export function LabBooking({ language, userConsent }: LabBookingProps) {
  const [activeTab, setActiveTab] = useState<'tests' | 'labs' | 'appointments'>('tests');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      labId: '1',
      testIds: ['1', '2'],
      date: '2024-01-15',
      time: '9:00 AM',
      status: 'upcoming',
      totalPrice: 1100
    }
  ]);
  
  const t = translations[language] || translations.en;

  const filteredTests = popularTests.filter(test => 
    language === 'hi' 
      ? test.nameHi.toLowerCase().includes(searchQuery.toLowerCase())
      : test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTestSelection = (testId: string) => {
    setSelectedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const getTotalPrice = () => {
    return selectedTests.reduce((total, testId) => {
      const test = popularTests.find(t => t.id === testId);
      return total + (test?.price || 0);
    }, 0);
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{t.title}</h1>
            <p className="text-cyan-100 text-sm">{t.subtitle}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['tests', 'labs', 'appointments'] as const).map((tab) => (
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
              {t[tab as keyof typeof t]}
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
                {userConsent ? "Appointments synced across devices" : "Data stored locally only"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      {activeTab === 'tests' && (
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
        {/* Tests Tab */}
        {activeTab === 'tests' && (
          <>
            <h2 className="text-lg font-bold text-gray-800 mb-4">{t.popularTests}</h2>
            {filteredTests.map((test) => (
              <Card 
                key={test.id} 
                className={`cursor-pointer transition-all duration-200 border-2 ${
                  selectedTests.includes(test.id) 
                    ? 'border-cyan-500 bg-cyan-50 shadow-md' 
                    : 'border-gray-100 bg-white hover:border-cyan-300'
                }`}
                onClick={() => toggleTestSelection(test.id)}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {language === 'hi' ? test.nameHi : test.name}
                        </h3>
                        {selectedTests.includes(test.id) && (
                          <CheckCircle className="w-5 h-5 text-cyan-500" />
                        )}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="bg-blue-50 rounded-xl p-2 text-center">
                          <p className="text-lg font-bold text-blue-800">₹{test.price}</p>
                          <p className="text-xs text-blue-600">{t.price}</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-2 text-center">
                          <p className="text-sm font-bold text-green-800">{test.duration}</p>
                          <p className="text-xs text-green-600">{t.duration}</p>
                        </div>
                        <div className={`rounded-xl p-2 text-center ${test.fasting ? 'bg-amber-50' : 'bg-gray-50'}`}>
                          <p className={`text-xs font-bold ${test.fasting ? 'text-amber-800' : 'text-gray-800'}`}>
                            {test.fasting ? t.fasting : 'No Fasting'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Selected Tests Summary */}
            {selectedTests.length > 0 && (
              <div className="fixed bottom-24 left-6 right-6">
                <Card className="bg-cyan-500 text-white shadow-xl">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{selectedTests.length} tests selected</span>
                      <span className="font-bold">{t.total}: ₹{getTotalPrice()}</span>
                    </div>
                    <Button 
                      onClick={() => setActiveTab('labs')}
                      className="w-full bg-white text-cyan-600 hover:bg-gray-100"
                    >
                      {t.selectLab}
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </>
        )}

        {/* Labs Tab */}
        {activeTab === 'labs' && (
          <>
            <h2 className="text-lg font-bold text-gray-800 mb-4">{t.nearbyLabs}</h2>
            {nearbyLabs.map((lab) => (
              <Card key={lab.id} className="bg-white border-2 border-gray-100 shadow-lg">
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {language === 'hi' ? lab.nameHi : lab.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {language === 'hi' ? lab.addressHi : lab.address}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{lab.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{lab.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-700">{t.timings}</span>
                      </div>
                      <p className="text-sm font-bold text-blue-800">{lab.timings}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-medium text-green-700">{t.homeCollection}</span>
                      </div>
                      <p className="text-sm font-bold text-green-800">Available</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl">
                      <Calendar className="w-4 h-4 mr-2" />
                      {t.bookAppointment}
                    </Button>
                    <Button 
                      onClick={() => handleCall(lab.phone)}
                      variant="outline" 
                      className="rounded-xl border-2 border-green-200 text-green-600 hover:bg-green-50"
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <>
            <h2 className="text-lg font-bold text-gray-800 mb-4">{t.myAppointments}</h2>
            {appointments.length > 0 ? (
              appointments.map((appointment) => {
                const lab = nearbyLabs.find(l => l.id === appointment.labId);
                const appointmentTests = popularTests.filter(t => appointment.testIds.includes(t.id));
                
                return (
                  <Card key={appointment.id} className="bg-white border-2 border-gray-100 shadow-lg">
                    <div className="p-5">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-800">
                              {language === 'hi' ? lab?.nameHi : lab?.name}
                            </h3>
                            <Badge 
                              variant={appointment.status === 'upcoming' ? "default" : "secondary"}
                              className={appointment.status === 'upcoming' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}
                            >
                              {t[appointment.status]}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {appointmentTests.map(test => language === 'hi' ? test.nameHi : test.name).join(', ')}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">{appointment.date}</span>
                            <span className="text-sm text-gray-600">{appointment.time}</span>
                            <span className="text-sm font-semibold text-cyan-600">₹{appointment.totalPrice}</span>
                          </div>
                        </div>
                      </div>

                      {userConsent && (
                        <div className="bg-cyan-50 rounded-xl p-3">
                          <div className="flex items-center gap-2">
                            <Cloud className="w-4 h-4 text-cyan-600" />
                            <span className="text-sm text-cyan-700">{t.cloudSaved}</span>
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
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.noAppointments}</h3>
                <p className="text-gray-600 mb-6">{t.bookFirst}</p>
                <Button 
                  onClick={() => setActiveTab('tests')}
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