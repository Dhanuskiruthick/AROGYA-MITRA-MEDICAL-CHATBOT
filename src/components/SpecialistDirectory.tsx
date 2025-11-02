import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { UserCheck, Phone, MapPin, Clock, Star, Search, Calendar, Shield } from 'lucide-react';
import { madhyaPradeshLocations, getAllMadhyaPradeshCities, getSpecialistsForCity } from './MadhyaPradeshDatabase';
import { toast } from 'sonner';

interface Specialist {
  name: string;
  specialty: string;
  hospital: string;
  phone: string;
  experience: string;
  qualifications?: string[];
  consultationFee?: string;
  availability?: string[];
  rating?: number;
}

const medicalSpecialties = [
  'All Specialties',
  'Cardiology',
  'Dermatology', 
  'Endocrinology',
  'Gastroenterology',
  'General Medicine',
  'General Surgery',
  'Gynecology',
  'Internal Medicine',
  'Neurology',
  'Oncology',
  'Ophthalmology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Pulmonology',
  'Radiology',
  'Urology',
  'Anesthesiology',
  'Emergency Medicine',
  'Family Medicine',
  'Pathology',
  'Obstetrics'
];

export function SpecialistDirectory() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [searchQuery, setSearchQuery] = useState('');
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(false);

  const madhyaPradeshCities = getAllMadhyaPradeshCities();

  const searchSpecialists = () => {
    if (!selectedCity) {
      toast.error('Please select a city first');
      return;
    }

    setLoading(true);
    
    // Get specialists from the database
    const citySpecialists = getSpecialistsForCity(selectedCity);
    
    let filteredSpecialists = citySpecialists;
    
    // Filter by specialty
    if (selectedSpecialty !== 'All Specialties') {
      filteredSpecialists = filteredSpecialists.filter(specialist => 
        specialist.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      filteredSpecialists = filteredSpecialists.filter(specialist =>
        specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        specialist.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        specialist.hospital.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Add mock additional data for demonstration
    const enhancedSpecialists = filteredSpecialists.map(specialist => ({
      ...specialist,
      qualifications: ['MBBS', 'MD', 'FICP'],
      consultationFee: '₹500-800',
      availability: ['Mon-Fri: 10 AM - 6 PM', 'Sat: 10 AM - 2 PM'],
      rating: 4.2 + Math.random() * 0.8 // Random rating between 4.2-5.0
    }));

    setTimeout(() => {
      setSpecialists(enhancedSpecialists);
      setLoading(false);
    }, 1000);
  };

  const bookAppointment = (specialist: Specialist) => {
    // In a real app, this would integrate with booking system
    toast.success(`Appointment request sent to ${specialist.name}. You will receive a confirmation call within 2 hours.`);
  };

  const callDoctor = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Find Specialist Doctors</h2>
        <p className="text-gray-600">Connect with verified medical specialists in Madhya Pradesh</p>
      </div>

      {/* Search Filters */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Search className="w-5 h-5" />
            Search Specialists
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City/District</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select city..." />
                </SelectTrigger>
                <SelectContent>
                  {madhyaPradeshCities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label} ({city.district})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Medical Specialty</label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {medicalSpecialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Search by Name</label>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Doctor or hospital name..."
                className="bg-white"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={searchSpecialists} 
              disabled={!selectedCity || loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Search className="w-4 h-4 mr-2" />
              {loading ? 'Searching...' : 'Find Specialists'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Finding qualified specialists...</p>
        </div>
      )}

      {/* Specialist Results */}
      {specialists.length > 0 && !loading && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            Found {specialists.length} Specialist{specialists.length !== 1 ? 's' : ''}
          </h3>
          
          <div className="grid gap-4">
            {specialists.map((specialist, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{specialist.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{formatRating(specialist.rating!)}</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4" />
                          <span className="font-medium text-blue-700">{specialist.specialty}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{specialist.hospital}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Experience: {specialist.experience}</span>
                        </div>

                        {specialist.qualifications && (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {specialist.qualifications.join(', ')}
                            </Badge>
                          </div>
                        )}

                        {specialist.consultationFee && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-green-600">
                              Consultation Fee: {specialist.consultationFee}
                            </span>
                          </div>
                        )}

                        {specialist.availability && (
                          <div className="text-xs text-gray-500">
                            <strong>Available:</strong> {specialist.availability.join(' | ')}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button 
                        onClick={() => bookAppointment(specialist)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => callDoctor(specialist.phone)}
                        className="border-gray-300"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-3 text-xs text-gray-500">
                    <p>
                      <strong>Note:</strong> Please verify doctor availability before visiting. 
                      Appointment confirmation will be sent via SMS/call within 2 hours.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {specialists.length === 0 && !loading && selectedCity && (
        <div className="text-center py-12">
          <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No specialists found matching your criteria.</p>
          <p className="text-sm text-gray-500 mt-2">
            Try adjusting your search filters or contact our helpline for assistance.
          </p>
        </div>
      )}

      {/* Medical Ethics & Privacy Notice */}
      <Alert className="border-green-200 bg-green-50">
        <Shield className="w-4 h-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Medical Ethics & Privacy:</strong> All listed doctors are verified medical professionals. 
          Your consultation details remain confidential and protected under medical privacy laws. 
          Emergency cases should contact nearest hospital directly.
        </AlertDescription>
      </Alert>

      {/* Emergency Contact */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-red-900">Medical Emergency</h4>
              <p className="text-sm text-red-700">
                For life-threatening emergencies, call <strong>108</strong> (Ambulance) or visit nearest emergency room immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}