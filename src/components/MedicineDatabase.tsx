import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Search, Pill, DollarSign, AlertTriangle, Info, ShoppingCart, MapPin, Heart, Clock } from 'lucide-react';
import { expandedMedicineDatabase, medicineCategories, searchMedicines, getMedicinesByCategory, janAushadhiPrices } from './ExpandedMedicineDatabase';
import { getAllMadhyaPradeshCities, getMedicalFacilitiesForCity } from './MadhyaPradeshDatabase';
import { toast } from 'sonner';

interface SelectedMedicine {
  key: string;
  name: string;
  generic: string;
  brands: string[];
  category: string;
  uses: string[];
  dosage: {
    adult: string;
    child?: string;
    maximum?: string;
    duration?: string;
  };
  sideEffects: string[];
  precautions: string[];
  price: {
    generic: string;
    branded: string;
  };
  prescription: boolean;
  availability: string;
}

export function MedicineDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedicine, setSelectedMedicine] = useState<SelectedMedicine | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showPharmacies, setShowPharmacies] = useState(false);

  const cities = getAllMadhyaPradeshCities();

  const getFilteredMedicines = () => {
    if (searchTerm.trim()) {
      return searchMedicines(searchTerm);
    }
    
    if (selectedCategory === 'all') {
      return Object.entries(expandedMedicineDatabase).map(([key, medicine]) => ({
        key,
        ...medicine
      }));
    }
    
    return getMedicinesByCategory(selectedCategory);
  };

  const filteredMedicines = getFilteredMedicines();

  const findNearbyPharmacies = (medicineName: string) => {
    if (!selectedLocation) {
      toast.error('Please select your location to find nearby pharmacies');
      return;
    }

    const medicalFacilities = getMedicalFacilitiesForCity(selectedLocation);
    const pharmacies = medicalFacilities?.pharmacies || [];
    
    if (pharmacies.length > 0) {
      setShowPharmacies(true);
      toast.success(`Found ${pharmacies.length} pharmacies near you for ${medicineName}`);
    } else {
      toast.info('No pharmacy data available for your location. We are expanding our database coverage.');
    }
  };

  const getJanAushadhiPrice = (medicineKey: string) => {
    return janAushadhiPrices[medicineKey] || 'Price not available';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          AURA Medicine Database
        </h2>
        <p className="text-gray-600">
          Comprehensive medicine information with government scheme pricing
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Search className="w-5 h-5" />
            Search Medicines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search Medicine</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, generic, brand, or use..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(medicineCategories).map(([key, category]) => (
                    <SelectItem key={key} value={key}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Location (Optional)</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select for pharmacy locations..." />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label} ({city.district})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedicines.map((medicine) => (
          <Card key={medicine.key} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900">{medicine.name}</CardTitle>
                  <p className="text-sm text-gray-600">{medicine.generic}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {medicine.brands.slice(0, 2).map((brand, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {brand}
                      </Badge>
                    ))}
                    {medicine.brands.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{medicine.brands.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge variant={medicine.prescription ? "destructive" : "secondary"}>
                    {medicine.prescription ? 'Rx' : 'OTC'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <Badge className="bg-purple-100 text-purple-800">
                {medicine.category}
              </Badge>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Common Uses:</h4>
                <p className="text-xs text-gray-600">
                  {medicine.uses.slice(0, 3).join(', ')}
                  {medicine.uses.length > 3 && '...'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Generic:</span>
                  <p className="text-green-600 font-medium">{medicine.price.generic}</p>
                </div>
                <div>
                  <span className="text-gray-500">Branded:</span>
                  <p className="text-blue-600 font-medium">{medicine.price.branded}</p>
                </div>
              </div>

              <div className="text-xs">
                <span className="text-gray-500">Jan Aushadhi:</span>
                <span className="text-orange-600 font-medium ml-1">
                  {getJanAushadhiPrice(medicine.key)}
                </span>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => setSelectedMedicine(medicine)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Info className="w-3 h-3 mr-1" />
                  Details
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => findNearbyPharmacies(medicine.name)}
                  className="flex-1"
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  Find
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredMedicines.length === 0 && (
        <div className="text-center py-12">
          <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No medicines found matching your criteria.</p>
          <p className="text-sm text-gray-500 mt-2">
            Try different search terms or browse by category.
          </p>
        </div>
      )}

      {/* Medicine Detail Modal */}
      {selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{selectedMedicine.name}</h3>
                  <p className="text-lg text-gray-600">{selectedMedicine.generic}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-purple-100 text-purple-800">
                      {selectedMedicine.category}
                    </Badge>
                    <Badge variant={selectedMedicine.prescription ? "destructive" : "secondary"}>
                      {selectedMedicine.availability}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedMedicine(null)}>
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Brand Names */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      Brand Names
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMedicine.brands.map((brand, index) => (
                        <Badge key={index} variant="outline">
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Uses */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Medical Uses
                    </h4>
                    <div className="space-y-1">
                      {selectedMedicine.uses.map((use, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          {use}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dosage */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Dosage Information
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                      <p><strong>Adult:</strong> {selectedMedicine.dosage.adult}</p>
                      {selectedMedicine.dosage.child && (
                        <p><strong>Child:</strong> {selectedMedicine.dosage.child}</p>
                      )}
                      {selectedMedicine.dosage.maximum && (
                        <p><strong>Maximum:</strong> {selectedMedicine.dosage.maximum}</p>
                      )}
                      {selectedMedicine.dosage.duration && (
                        <p><strong>Duration:</strong> {selectedMedicine.dosage.duration}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Pricing */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Pricing Information
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">Generic Price</p>
                        <p className="text-lg font-semibold text-green-600">
                          {selectedMedicine.price.generic}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">Branded Price</p>
                        <p className="text-lg font-semibold text-blue-600">
                          {selectedMedicine.price.branded}
                        </p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">Jan Aushadhi (Government)</p>
                        <p className="text-lg font-semibold text-orange-600">
                          {getJanAushadhiPrice(selectedMedicine.key)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Find Pharmacies */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Find Nearby Pharmacies
                    </h4>
                    <Button 
                      onClick={() => findNearbyPharmacies(selectedMedicine.name)}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!selectedLocation}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {selectedLocation ? 'Find Pharmacies' : 'Select Location First'}
                    </Button>
                    {!selectedLocation && (
                      <p className="text-xs text-gray-500 mt-2">
                        Select your location above to find nearby pharmacies
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Warnings and Precautions */}
              <div className="mt-6 space-y-4">
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription>
                    <strong>Common Side Effects:</strong> {selectedMedicine.sideEffects.join(', ')}
                  </AlertDescription>
                </Alert>

                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription>
                    <strong>Precautions:</strong> {selectedMedicine.precautions.join(', ')}
                  </AlertDescription>
                </Alert>

                <Alert className="border-gray-200 bg-gray-50">
                  <Info className="h-4 w-4 text-gray-600" />
                  <AlertDescription className="text-xs">
                    <strong>AURA Medical Disclaimer:</strong> This information is for educational purposes only. 
                    Always consult with a healthcare provider before starting any medication. 
                    Dosages may vary based on individual conditions and medical history.
                    For prescription medications, a valid prescription is required.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Government Schemes Info */}
      <Alert className="border-green-200 bg-green-50">
        <Heart className="w-4 h-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Government Health Schemes:</strong> Medicines may be available at subsidized rates through 
          Ayushman Bharat, MSBY, and Jan Aushadhi centers. Check the "Health Schemes" tab for eligibility 
          and application procedures.
        </AlertDescription>
      </Alert>
    </div>
  );
}