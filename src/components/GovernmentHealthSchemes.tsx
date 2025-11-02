import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Heart, Shield, Users, Phone, ExternalLink, CheckCircle, AlertCircle, Search } from 'lucide-react';
import { toast } from 'sonner';

interface HealthScheme {
  id: string;
  name: string;
  type: 'Central' | 'State' | 'District';
  coverageAmount: string;
  eligibility: string[];
  benefits: string[];
  applicationProcess: string;
  documentsRequired: string[];
  contactNumber: string;
  website?: string;
  status: 'Active' | 'Under Review' | 'Enrollment Open';
}

const healthSchemes: HealthScheme[] = [
  {
    id: 'mp-sahayata-yojana',
    name: 'M.P. Sahayata Yojana',
    type: 'State',
    coverageAmount: '₹2,00,000 per family per year',
    eligibility: [
      'Residents of Madhya Pradesh',
      'BPL and APL families',
      'Income below ₹2.5 lakh per annum',
      'All age groups covered'
    ],
    benefits: [
      'General medical treatment coverage',
      'Emergency medical assistance',
      'Accident and injury treatment',
      'Basic surgical procedures',
      'Medicine allowance'
    ],
    applicationProcess: 'Apply at district collector office or online through MP Health Portal',
    documentsRequired: [
      'MP Domicile Certificate',
      'Aadhaar Card',
      'Income Certificate',
      'Samagra ID',
      'Bank account details'
    ],
    contactNumber: '0755-2441000',
    website: 'https://health.mp.gov.in',
    status: 'Active'
  },
  {
    id: 'mjay',
    name: 'Mukhyamantri Jan Arogya Yojana (MJAY)',
    type: 'State',
    coverageAmount: '₹5,00,000 per family per year',
    eligibility: [
      'All residents of Madhya Pradesh',
      'No income restrictions',
      'Automatic coverage for all families',
      'Government employees eligible'
    ],
    benefits: [
      'Comprehensive health coverage',
      'Free treatment at government hospitals',
      'Cashless treatment facility',
      'Pre and post hospitalization',
      'All surgical procedures covered'
    ],
    applicationProcess: 'Automatic enrollment for MP residents, get MJAY card from nearest center',
    documentsRequired: [
      'Aadhaar Card',
      'Samagra ID',
      'MP Domicile Certificate',
      'Family photograph',
      'Mobile number'
    ],
    contactNumber: '0755-2761800',
    website: 'https://mjay.mp.gov.in',
    status: 'Active'
  },
  {
    id: 'chiranjeevi-yojana',
    name: 'Chiranjeevi Yojana',
    type: 'State',
    coverageAmount: '₹25,000 for childbirth, ₹50,000 for complications',
    eligibility: [
      'Pregnant women in Madhya Pradesh',
      'All income groups eligible',
      'First two deliveries covered',
      'Age 18+ years'
    ],
    benefits: [
      'Free delivery services',
      'Complete antenatal care',
      'Post-natal care for 6 months',
      'Emergency obstetric care',
      'Newborn care services'
    ],
    applicationProcess: 'Register at nearest PHC/CHC during pregnancy',
    documentsRequired: [
      'Pregnancy registration card',
      'Aadhaar Card',
      'Husband\'s Aadhaar Card',
      'Bank account details',
      'Address proof'
    ],
    contactNumber: '104',
    status: 'Active'
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    type: 'Central',
    coverageAmount: '₹5,00,000 per family per year',
    eligibility: [
      'Families listed in SECC-2011 database',
      'Rural families with specific deprivation criteria',
      'Urban occupational category families',
      'BPL families with health insurance cards'
    ],
    benefits: [
      'Secondary and tertiary care hospitalization',
      'Pre and post-hospitalization expenses',
      '1,393+ medical packages covered',
      'Cashless treatment at empaneled hospitals',
      'No cap on family size and age'
    ],
    applicationProcess: 'Visit nearest Jan Aushadhi or CSC center with required documents',
    documentsRequired: [
      'Aadhaar Card',
      'Ration Card',
      'SECC-2011 verification',
      'Bank account details',
      'Mobile number'
    ],
    contactNumber: '14555',
    website: 'https://pmjay.gov.in',
    status: 'Active'
  },
  {
    id: 'state-illness-fund',
    name: 'State Illness Assistance Fund',
    type: 'State',
    coverageAmount: '₹3,00,000 for critical illnesses',
    eligibility: [
      'MP residents with critical illnesses',
      'Income below ₹4 lakh per annum',
      'Cancer, kidney, heart patients',
      'Rare disease patients'
    ],
    benefits: [
      'Financial assistance for treatment',
      'Medicine procurement support',
      'Surgery and procedure costs',
      'Travel allowance for treatment',
      'Post-treatment care support'
    ],
    applicationProcess: 'Apply through District Collector with medical certificates',
    documentsRequired: [
      'Medical diagnosis certificate',
      'Treatment cost estimate',
      'Income certificate',
      'Aadhaar Card',
      'Hospital referral letter'
    ],
    contactNumber: '0755-2540100',
    status: 'Active'
  },
  {
    id: 'kanya-suraksha-yojana',
    name: 'Kanya Suraksha Yojana',
    type: 'State',
    coverageAmount: '₹25,000 insurance cover + financial incentives',
    eligibility: [
      'Girl children born in MP',
      'BPL and lower middle class families',
      'Registration within 90 days of birth',
      'Continuation till marriage/21 years'
    ],
    benefits: [
      'Insurance coverage for girl child',
      'Educational incentives',
      'Health check-up coverage',
      'Marriage assistance',
      'Skill development support'
    ],
    applicationProcess: 'Register at Anganwadi center or district office within 90 days',
    documentsRequired: [
      'Birth certificate',
      'Parent\'s Aadhaar Card',
      'BPL Card/Income certificate',
      'Bank account details',
      'Photographs'
    ],
    contactNumber: '0755-2700800',
    status: 'Active'
  },
  {
    id: 'health-helpline-104',
    name: 'Toll-Free Health Helpline (104)',
    type: 'State',
    coverageAmount: 'Free consultation and guidance',
    eligibility: [
      'All residents of Madhya Pradesh',
      '24x7 availability',
      'No registration required',
      'Multi-language support'
    ],
    benefits: [
      '24x7 medical consultation',
      'Emergency medical guidance',
      'Ambulance services coordination',
      'Medicine information',
      'Health scheme guidance'
    ],
    applicationProcess: 'Simply dial 104 from any phone',
    documentsRequired: [
      'No documents required',
      'Just dial 104 for assistance'
    ],
    contactNumber: '104',
    status: 'Active'
  },
  {
    id: 'mp-telemedicine',
    name: 'Madhya Pradesh Telemedicine Services',
    type: 'State',
    coverageAmount: 'Free teleconsultation services',
    eligibility: [
      'All MP residents',
      'Rural and remote area priority',
      'Chronic disease patients',
      'Follow-up consultations'
    ],
    benefits: [
      'Video consultation with doctors',
      'Digital prescription',
      'Health monitoring',
      'Medicine delivery coordination',
      'Specialist referrals'
    ],
    applicationProcess: 'Register on MP Telemedicine portal or visit nearest health center',
    documentsRequired: [
      'Aadhaar Card',
      'Mobile number',
      'Email ID (optional)',
      'Medical history (if any)'
    ],
    contactNumber: '0755-2761900',
    website: 'https://telemedicine.mp.gov.in',
    status: 'Active'
  },
  {
    id: 'swachh-bharat-abhiyan',
    name: 'Swachh Bharat Abhiyan (Health Component)',
    type: 'Central',
    coverageAmount: 'Free sanitation and hygiene services',
    eligibility: [
      'All families in Madhya Pradesh',
      'Rural and urban areas',
      'Priority to BPL families',
      'Community participation encouraged'
    ],
    benefits: [
      'Free toilet construction',
      'Sanitation awareness programs',
      'Hygiene education',
      'Clean water initiatives',
      'Disease prevention programs'
    ],
    applicationProcess: 'Apply through Gram Panchayat or Municipal Corporation',
    documentsRequired: [
      'Aadhaar Card',
      'Property documents',
      'Income certificate',
      'Photographs',
      'Bank account details'
    ],
    contactNumber: '1800-11-2000',
    website: 'https://swachhbharatmission.gov.in',
    status: 'Active'
  },
  {
    id: 'mukhyamantri-swasthya-bima',
    name: 'Mukhyamantri Swasthya Bima Yojana (MSBY)',
    type: 'State',
    coverageAmount: '₹4,00,000 per family per year',
    eligibility: [
      'All families in Madhya Pradesh',
      'Priority to BPL and APL families',
      'State government employees eligible',
      'No income limit restrictions'
    ],
    benefits: [
      'Comprehensive health coverage',
      'Pre-existing diseases covered from day 1',
      'Maternity benefits included',
      'Emergency ambulance services',
      'Free health check-ups'
    ],
    applicationProcess: 'Apply online through MP Health Portal or visit district collector office',
    documentsRequired: [
      'Aadhaar Card',
      'Samagra ID',
      'Income Certificate',
      'Residence Proof',
      'Family Photo'
    ],
    contactNumber: '0755-2761800',
    website: 'https://health.mp.gov.in',
    status: 'Active'
  },
  {
    id: 'janani-suraksha',
    name: 'Janani Suraksha Yojana (JSY)',
    type: 'Central',
    coverageAmount: '₹1,400 for rural, ₹1,000 for urban areas',
    eligibility: [
      'Pregnant women from BPL families',
      'All pregnant women in high focus states',
      'Age limit: 19+ years',
      'Maximum 2 live births'
    ],
    benefits: [
      'Cash assistance for institutional delivery',
      'Free delivery services',
      'Post-natal care support',
      'Transportation allowance',
      'ASHA worker incentives'
    ],
    applicationProcess: 'Register at nearest ANM or Health Sub-Centre during pregnancy',
    documentsRequired: [
      'BPL Card',
      'Age Proof',
      'Pregnancy Registration Card',
      'Bank Account Details',
      'Aadhaar Card'
    ],
    contactNumber: '104',
    status: 'Active'
  },
  {
    id: 'rashtriya-swasthya',
    name: 'Rashtriya Swasthya Bima Yojana (RSBY)',
    type: 'Central',
    coverageAmount: '₹30,000 per family per year',
    eligibility: [
      'BPL families',
      'Unorganized sector workers',
      'MGNREGA workers',
      'Street vendors and rickshaw pullers'
    ],
    benefits: [
      'Hospitalization coverage',
      'Pre-existing diseases covered',
      'Maternity benefits',
      'Day care procedures',
      'Smart card facility'
    ],
    applicationProcess: 'Enrollment through authorized centers with biometric verification',
    documentsRequired: [
      'BPL Card',
      'Aadhaar Card',
      'Job Card (for MGNREGA workers)',
      'Family Photo',
      'Bank Details'
    ],
    contactNumber: '1800-345-6789',
    status: 'Active'
  },
  {
    id: 'deendayal-antyodaya',
    name: 'Deendayal Antyodaya Yojana - National Health Mission',
    type: 'State',
    coverageAmount: '₹2,00,000 per family',
    eligibility: [
      'Antyodaya families',
      'Below poverty line families',
      'Marginalized communities',
      'Tribal and rural populations'
    ],
    benefits: [
      'Comprehensive healthcare services',
      'Specialized treatment support',
      'Emergency medical assistance',
      'Preventive healthcare programs',
      'Medicine assistance'
    ],
    applicationProcess: 'Apply through Antyodaya centers or district health offices',
    documentsRequired: [
      'Antyodaya Card',
      'Aadhaar Card',
      'Income Certificate',
      'Caste Certificate (if applicable)',
      'Residence Proof'
    ],
    contactNumber: '0755-2550908',
    status: 'Active'
  },
  {
    id: 'mp-state-illness',
    name: 'MP State Illness Assistance Scheme',
    type: 'State',
    coverageAmount: '₹1,50,000 for specific conditions',
    eligibility: [
      'Residents of Madhya Pradesh',
      'Income below ₹3 lakh per annum',
      'Critical illness patients',
      'Cancer, kidney, heart patients'
    ],
    benefits: [
      'Financial aid for critical illnesses',
      'Cancer treatment support',
      'Dialysis assistance',
      'Heart surgery support',
      'Organ transplant aid'
    ],
    applicationProcess: 'Apply through Chief Minister Relief Fund or district collector',
    documentsRequired: [
      'Medical certificates',
      'Income proof',
      'Aadhaar Card',
      'Hospital estimates',
      'Doctor recommendations'
    ],
    contactNumber: '0755-2441000',
    status: 'Active'
  }
];

const schemeCategories = [
  { value: 'all', label: 'All Schemes' },
  { value: 'Central', label: 'Central Government' },
  { value: 'State', label: 'State Government' },
  { value: 'District', label: 'District Level' }
];

export function GovernmentHealthSchemes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScheme, setSelectedScheme] = useState<HealthScheme | null>(null);

  const filteredSchemes = healthSchemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || scheme.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const checkEligibility = (schemeId: string) => {
    const scheme = healthSchemes.find(s => s.id === schemeId);
    if (scheme) {
      setSelectedScheme(scheme);
      toast.success(`Detailed information loaded for ${scheme.name}`);
    }
  };

  const callHelpline = (number: string) => {
    window.open(`tel:${number}`);
  };

  const visitWebsite = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Madhya Pradesh Government Health Schemes
        </h2>
        <p className="text-gray-600">
          Comprehensive healthcare coverage for all citizens of Madhya Pradesh
        </p>
      </div>

      {/* Search and Filter */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <Search className="w-5 h-5" />
            Find Your Health Scheme
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search Schemes</label>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by scheme name or benefits..."
                className="bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {schemeCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schemes Grid */}
      <div className="grid gap-6">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900 mb-2">
                    {scheme.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      className={
                        scheme.type === 'Central' ? 'bg-blue-100 text-blue-800' :
                        scheme.type === 'State' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }
                    >
                      {scheme.type} Scheme
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {scheme.status}
                    </Badge>
                  </div>
                  <div className="text-lg font-semibold text-green-600 mb-3">
                    Coverage: {scheme.coverageAmount}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Key Benefits */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {scheme.benefits.slice(0, 4).map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                {scheme.benefits.length > 4 && (
                  <p className="text-sm text-gray-500 mt-1">
                    +{scheme.benefits.length - 4} more benefits
                  </p>
                )}
              </div>

              {/* Eligibility Preview */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Eligibility:</h4>
                <p className="text-sm text-gray-600">
                  {scheme.eligibility[0]} 
                  {scheme.eligibility.length > 1 && ` and ${scheme.eligibility.length - 1} more criteria`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <Button 
                  onClick={() => checkEligibility(scheme.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Check Eligibility
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => callHelpline(scheme.contactNumber)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Helpline
                </Button>
                
                {scheme.website && (
                  <Button 
                    variant="outline"
                    onClick={() => visitWebsite(scheme.website!)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Official Website
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Scheme Modal */}
      {selectedScheme && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center justify-between">
              {selectedScheme.name}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedScheme(null)}
              >
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Complete Eligibility */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Complete Eligibility Criteria:</h4>
              <div className="space-y-2">
                {selectedScheme.eligibility.map((criteria, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{criteria}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Benefits */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">All Benefits & Coverage:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedScheme.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Process */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">How to Apply:</h4>
              <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border">
                {selectedScheme.applicationProcess}
              </p>
            </div>

            {/* Required Documents */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Required Documents:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedScheme.documentsRequired.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <Shield className="w-3 h-3 text-orange-500" />
                    {doc}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-900 mb-3">Contact Information:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Helpline: {selectedScheme.contactNumber}</span>
                </div>
                {selectedScheme.website && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                    <a 
                      href={selectedScheme.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {selectedScheme.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emergency Contact */}
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="w-4 h-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Emergency Health Services:</strong> For medical emergencies, call <strong>108</strong> (Ambulance) or 
          <strong> 102</strong> (Health Helpline). For scheme-related queries, contact your nearest District Health Office 
          or visit <strong>Jan Aushadhi Kendra</strong>.
        </AlertDescription>
      </Alert>
    </div>
  );
}