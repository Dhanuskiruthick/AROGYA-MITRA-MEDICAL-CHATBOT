import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Clock, 
  Phone,
  Star,
  Filter,
  Map,
  List,
  Navigation2,
  Zap
} from 'lucide-react';

type Language = 'en' | 'hi';
type FacilityType = 'hospital' | 'clinic' | 'pharmacy' | 'lab';
type ViewMode = 'list' | 'map';

interface MedicalFacility {
  id: string;
  name: string;
  nameHi: string;
  type: FacilityType;
  distance: string;
  rating: number;
  isOpen: boolean;
  openTime: string;
  phone: string;
  address: string;
  addressHi: string;
  emergency: boolean;
}

interface MedicalLocatorProps {
  language: Language;
}

const facilities: MedicalFacility[] = [
  {
    id: '1',
    name: 'City Hospital',
    nameHi: 'सिटी अस्पताल',
    type: 'hospital',
    distance: '1.2 km',
    rating: 4.2,
    isOpen: true,
    openTime: '24/7',
    phone: '0755-2345678',
    address: 'MG Road, Bhopal',
    addressHi: 'एमजी रोड, भोपाल',
    emergency: true
  },
  {
    id: '2',
    name: 'Jan Aushadhi Store',
    nameHi: 'जन औषधि स्टोर',
    type: 'pharmacy',
    distance: '0.8 km',
    rating: 4.5,
    isOpen: true,
    openTime: '8 AM - 10 PM',
    phone: '0755-2567890',
    address: 'Hoshangabad Road',
    addressHi: 'होशंगाबाद रोड',
    emergency: false
  },
  {
    id: '3',
    name: 'Apollo Clinic',
    nameHi: 'अपोलो क्लिनिक',
    type: 'clinic',
    distance: '2.1 km',
    rating: 4.0,
    isOpen: false,
    openTime: '9 AM - 6 PM',
    phone: '0755-2789012',
    address: 'Arera Colony',
    addressHi: 'एरेरा कॉलोनी',
    emergency: false
  },
  {
    id: '4',
    name: 'SRL Diagnostics',
    nameHi: 'एसआरएल डायग्नोस्टिक्स',
    type: 'lab',
    distance: '1.5 km',
    rating: 4.3,
    isOpen: true,
    openTime: '6 AM - 10 PM',
    phone: '0755-2345123',
    address: 'New Market',
    addressHi: 'न्यू मार्केट',
    emergency: false
  }
];

const translations = {
  en: {
    title: "Medical Locator",
    subtitle: "Find nearby healthcare facilities",
    searchPlaceholder: "Search hospitals, clinics...",
    currentLocation: "Using current location",
    emergency: "Emergency",
    open: "Open",
    closed: "Closed",
    getDirections: "Get Directions",
    callNow: "Call Now",
    listView: "List",
    mapView: "Map",
    filters: "Filters",
    all: "All",
    hospital: "Hospitals",
    clinic: "Clinics", 
    pharmacy: "Pharmacies",
    lab: "Labs",
    rating: "Rating",
    noResults: "No facilities found",
    tryAdjusting: "Try adjusting your search or filters"
  },
  hi: {
    title: "चिकित्सा लोकेटर",
    subtitle: "नजदीकी स्वास्थ्य सुविधाएं खोजें",
    searchPlaceholder: "अस्पताल, क्लिनिक खोजें...",
    currentLocation: "वर्तमान स्थान का उपयोग",
    emergency: "आपातकालीन",
    open: "खुला",
    closed: "बंद",
    getDirections: "दिशा-निर्देश",
    callNow: "अभी कॉल करें",
    listView: "सूची",
    mapView: "मानचित्र",
    filters: "फिल्टर",
    all: "सभी",
    hospital: "अस्पताल",
    clinic: "क्लिनिक",
    pharmacy: "फार्मेसी",
    lab: "लैब",
    rating: "रेटिंग",
    noResults: "कोई सुविधा नहीं मिली",
    tryAdjusting: "अपनी खोज या फिल्टर को समायोजित करने का प्रयास करें"
  }
};

const facilityIcons = {
  hospital: '🏥',
  clinic: '🩺',
  pharmacy: '💊',
  lab: '🔬'
};

const facilityColors = {
  hospital: 'bg-red-500',
  clinic: 'bg-blue-500',
  pharmacy: 'bg-green-500',
  lab: 'bg-purple-500'
};

export function MedicalLocator({ language }: MedicalLocatorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FacilityType | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  
  const t = translations[language] || translations.en;

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = language === 'hi' 
      ? facility.nameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.addressHi.toLowerCase().includes(searchQuery.toLowerCase())
      : facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || facility.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleDirections = (facility: MedicalFacility) => {
    // Simulate opening maps application
    console.log('Opening directions to:', facility.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{t.title}</h1>
            <p className="text-cyan-100 text-sm">{t.subtitle}</p>
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

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'list' ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode('list')}
              className={`rounded-full ${
                viewMode === 'list' 
                  ? 'bg-white text-cyan-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <List className="w-4 h-4 mr-2" />
              {t.listView}
            </Button>
            <Button
              variant={viewMode === 'map' ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode('map')}
              className={`rounded-full ${
                viewMode === 'map' 
                  ? 'bg-white text-cyan-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Map className="w-4 h-4 mr-2" />
              {t.mapView}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-cyan-100">
            <Navigation className="w-4 h-4" />
            <span>{t.currentLocation}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4">
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'hospital', 'clinic', 'pharmacy', 'lab'].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter as FacilityType | 'all')}
              className={`whitespace-nowrap rounded-full ${
                selectedFilter === filter 
                  ? 'bg-cyan-500 text-white' 
                  : 'border-cyan-200 text-cyan-700 hover:bg-cyan-50'
              }`}
            >
              {filter !== 'all' && facilityIcons[filter as FacilityType]}
              <span className="ml-1">{t[filter as keyof typeof t]}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-6 space-y-4 pb-24">
        {filteredFacilities.map((facility) => (
          <Card key={facility.id} className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 ${facilityColors[facility.type]} rounded-2xl flex items-center justify-center text-white text-xl`}>
                  {facilityIcons[facility.type]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {language === 'hi' ? facility.nameHi : facility.name}
                    </h3>
                    {facility.emergency && (
                      <Badge className="bg-red-100 text-red-700 border-red-200">
                        <Zap className="w-3 h-3 mr-1" />
                        {t.emergency}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'hi' ? facility.addressHi : facility.address}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{facility.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{facility.distance}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className={`p-3 rounded-xl ${facility.isOpen ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className={`w-4 h-4 ${facility.isOpen ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-xs font-medium ${facility.isOpen ? 'text-green-700' : 'text-red-700'}`}>
                      {facility.isOpen ? t.open : t.closed}
                    </span>
                  </div>
                  <p className={`text-sm font-bold ${facility.isOpen ? 'text-green-800' : 'text-red-800'}`}>
                    {facility.openTime}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-700">Contact</span>
                  </div>
                  <p className="text-sm font-bold text-blue-800">{facility.phone}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleDirections(facility)}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl"
                >
                  <Navigation2 className="w-4 h-4 mr-2" />
                  {t.getDirections}
                </Button>
                <Button 
                  onClick={() => handleCall(facility.phone)}
                  variant="outline" 
                  className="rounded-xl border-2 border-green-200 text-green-600 hover:bg-green-50"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t.callNow}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredFacilities.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.noResults}</h3>
          <p className="text-gray-600">{t.tryAdjusting}</p>
        </div>
      )}
    </div>
  );
}