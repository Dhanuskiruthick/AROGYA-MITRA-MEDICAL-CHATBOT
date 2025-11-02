// Comprehensive Medicine Database for AURA Platform
export const expandedMedicineDatabase = {
  // Pain & Fever Management
  'paracetamol': {
    name: 'Paracetamol',
    generic: 'Acetaminophen',
    brands: ['Crocin', 'Dolo 650', 'Paracip', 'Calpol', 'Metacin'],
    category: 'Analgesic & Antipyretic',
    uses: ['Fever', 'Headache', 'Body pain', 'Dental pain', 'Post-vaccination fever'],
    dosage: {
      adult: '500-1000mg every 4-6 hours',
      child: '10-15mg/kg every 4-6 hours',
      maximum: '4g/day for adults'
    },
    sideEffects: ['Nausea (rare)', 'Skin rash (rare)', 'Liver damage (overdose)'],
    precautions: ['Avoid alcohol', 'Caution in liver disease', 'Check other medications for paracetamol'],
    price: {
      generic: '₹5-15/strip',
      branded: '₹20-45/strip'
    },
    prescription: false,
    availability: 'Over-the-counter'
  },

  'ibuprofen': {
    name: 'Ibuprofen',
    generic: 'Ibuprofen',
    brands: ['Brufen', 'Combiflam', 'Advil', 'Ibugesic'],
    category: 'NSAID',
    uses: ['Pain relief', 'Fever', 'Inflammation', 'Arthritis', 'Menstrual pain'],
    dosage: {
      adult: '200-400mg every 4-6 hours',
      child: '5-10mg/kg every 6-8 hours',
      maximum: '1200mg/day (OTC), 2400mg/day (prescription)'
    },
    sideEffects: ['Stomach upset', 'Nausea', 'Heartburn', 'Kidney problems (long-term)'],
    precautions: ['Take with food', 'Avoid in kidney/heart disease', 'Not for children <6 months'],
    price: {
      generic: '₹8-20/strip',
      branded: '₹25-60/strip'
    },
    prescription: false,
    availability: 'Over-the-counter'
  },

  'aspirin': {
    name: 'Aspirin',
    generic: 'Acetylsalicylic Acid',
    brands: ['Disprin', 'Ecosprin', 'Loprin', 'Delisprin'],
    category: 'NSAID/Antiplatelet',
    uses: ['Heart attack prevention', 'Stroke prevention', 'Pain relief', 'Fever'],
    dosage: {
      adult: '75-100mg daily (cardioprotective), 300-600mg (pain/fever)',
      child: 'Not recommended <16 years',
      maximum: '4g/day for pain relief'
    },
    sideEffects: ['Stomach bleeding', 'Heartburn', 'Nausea', 'Tinnitus'],
    precautions: ['Take with food', 'Avoid in children (Reye syndrome)', 'Monitor for bleeding'],
    price: {
      generic: '₹3-12/strip',
      branded: '₹15-35/strip'
    },
    prescription: false,
    availability: 'Over-the-counter'
  },

  // Antibiotics
  'amoxicillin': {
    name: 'Amoxicillin',
    generic: 'Amoxicillin',
    brands: ['Amoxyclav', 'Novamox', 'Clavam', 'Augmentin'],
    category: 'Antibiotic (Penicillin)',
    uses: ['Bacterial infections', 'Respiratory tract infections', 'UTI', 'Skin infections'],
    dosage: {
      adult: '250-500mg every 8 hours',
      child: '20-40mg/kg/day divided into 3 doses',
      duration: '5-10 days'
    },
    sideEffects: ['Nausea', 'Diarrhea', 'Skin rash', 'Allergic reactions'],
    precautions: ['Complete full course', 'Check penicillin allergy', 'Take with food'],
    price: {
      generic: '₹15-30/strip',
      branded: '₹40-80/strip'
    },
    prescription: true,
    availability: 'Prescription only'
  },

  'azithromycin': {
    name: 'Azithromycin',
    generic: 'Azithromycin',
    brands: ['Azee', 'Zithromax', 'Azithral', 'Azimax'],
    category: 'Antibiotic (Macrolide)',
    uses: ['Respiratory infections', 'Skin infections', 'STDs', 'Atypical pneumonia'],
    dosage: {
      adult: '500mg day 1, then 250mg daily for 4 days',
      child: '10mg/kg day 1, then 5mg/kg for 4 days',
      duration: '3-5 days'
    },
    sideEffects: ['Nausea', 'Diarrhea', 'Abdominal pain', 'Headache'],
    precautions: ['Complete course', 'Avoid antacids', 'Monitor liver function'],
    price: {
      generic: '₹25-45/strip',
      branded: '₹60-120/strip'
    },
    prescription: true,
    availability: 'Prescription only'
  },

  'ciprofloxacin': {
    name: 'Ciprofloxacin',
    generic: 'Ciprofloxacin',
    brands: ['Cipro', 'Ciplox', 'Cifran', 'Quintor'],
    category: 'Antibiotic (Fluoroquinolone)',
    uses: ['UTI', 'GI infections', 'Respiratory infections', 'Bone/joint infections'],
    dosage: {
      adult: '250-500mg every 12 hours',
      child: 'Generally avoided <18 years',
      duration: '7-14 days'
    },
    sideEffects: ['Nausea', 'Diarrhea', 'Headache', 'Tendon problems'],
    precautions: ['Avoid dairy products', 'Increase fluid intake', 'Avoid in pregnancy'],
    price: {
      generic: '₹20-40/strip',
      branded: '₹50-100/strip'
    },
    prescription: true,
    availability: 'Prescription only'
  },

  // Gastrointestinal
  'omeprazole': {
    name: 'Omeprazole',
    generic: 'Omeprazole',
    brands: ['Omez', 'Prilosec', 'Ocid', 'Lomac'],
    category: 'Proton Pump Inhibitor',
    uses: ['Peptic ulcer', 'GERD', 'Hyperacidity', 'H.pylori eradication'],
    dosage: {
      adult: '20-40mg once daily before breakfast',
      child: '0.7-1.4mg/kg once daily',
      duration: '2-8 weeks depending on indication'
    },
    sideEffects: ['Headache', 'Nausea', 'Abdominal pain', 'Long-term: B12 deficiency'],
    precautions: ['Take on empty stomach', 'Gradual withdrawal after long-term use'],
    price: {
      generic: '₹12-25/strip',
      branded: '₹30-70/strip'
    },
    prescription: false,
    availability: 'Over-the-counter'
  },

  'ranitidine': {
    name: 'Ranitidine',
    generic: 'Ranitidine',
    brands: ['Aciloc', 'Rantac', 'Zinetac', 'R-Loc'],
    category: 'H2 Receptor Blocker',
    uses: ['Peptic ulcer', 'Hyperacidity', 'GERD', 'Heartburn'],
    dosage: {
      adult: '150mg twice daily or 300mg at bedtime',
      child: '2-4mg/kg twice daily',
      duration: '4-8 weeks'
    },
    sideEffects: ['Headache', 'Dizziness', 'Constipation', 'Fatigue'],
    precautions: ['Monitor liver function', 'Reduce dose in kidney disease'],
    price: {
      generic: '₹8-18/strip',
      branded: '₹25-50/strip'
    },
    prescription: false,
    availability: 'Over-the-counter'
  },

  'domperidone': {
    name: 'Domperidone',
    generic: 'Domperidone',
    brands: ['Domstal', 'Vomistop', 'Domel', 'Depom'],
    category: 'Antiemetic/Prokinetic',
    uses: ['Nausea', 'Vomiting', 'Gastroparesis', 'Functional dyspepsia'],
    dosage: {
      adult: '10mg three times daily before meals',
      child: '0.25mg/kg three times daily',
      maximum: 'Not more than 7 days continuous use'
    },
    sideEffects: ['Dry mouth', 'Headache', 'Diarrhea', 'Cardiac arrhythmia (rare)'],
    precautions: ['Avoid in heart conditions', 'Use shortest duration possible'],
    price: {
      generic: '₹10-20/strip',
      branded: '₹30-55/strip'
    },
    prescription: false,
    availability: 'Over-the-counter'
  },

  // Respiratory System
  'salbutamol': {
    name: 'Salbutamol',
    generic: 'Salbutamol',
    brands: ['Asthalin', 'Ventolin', 'Aerovent', 'Duolin'],
    category: 'Bronchodilator',
    uses: ['Asthma', 'COPD', 'Bronchospasm', 'Respiratory distress'],
    dosage: {
      adult: '2-4mg three times daily (oral), 2 puffs (inhaler)',
      child: '0.1-0.15mg/kg three times daily',
      inhaler: '2 puffs every 4-6 hours as needed'
    },
    sideEffects: ['Tremor', 'Headache', 'Palpitations', 'Muscle cramps'],
    precautions: ['Monitor heart rate', 'Use spacer with inhaler', 'Rinse mouth after use'],
    price: {
      tablets: '₹15-30/strip',
      inhaler: '₹80-150/inhaler'
    },
    prescription: false,
    availability: 'Over-the-counter'
  },

  'cetirizine': {
    name: 'Cetirizine',
    generic: 'Cetirizine',
    brands: ['Zyrtec', 'Alerid', 'Cetriz', 'Okacet'],
    category: 'Antihistamine',
    uses: ['Allergic rhinitis', 'Urticaria', 'Allergic conjunctivitis', 'Skin allergies'],
    dosage: {
      adult: '10mg once daily',
      child: '2.5-5mg once daily (age dependent)',
      elderly: '5mg once daily'
    },
    sideEffects: ['Drowsiness', 'Fatigue', 'Dry mouth', 'Headache'],
    precautions: ['Avoid alcohol', 'Caution while driving', 'Reduce dose in kidney disease'],
    price: {
      generic: '₹8-15/strip',
      branded: '₹20-45/strip'
    },
    prescription: false,
    availability: 'Over-the-counter'
  },

  // Cardiovascular System
  'amlodipine': {
    name: 'Amlodipine',
    generic: 'Amlodipine',
    brands: ['Amlokind', 'Amtas', 'Stamlo', 'Norvasc'],
    category: 'Calcium Channel Blocker',
    uses: ['Hypertension', 'Angina', 'Coronary artery disease'],
    dosage: {
      adult: '5-10mg once daily',
      elderly: 'Start with 2.5mg once daily',
      child: 'Not recommended <6 years'
    },
    sideEffects: ['Ankle swelling', 'Headache', 'Flushing', 'Palpitations'],
    precautions: ['Monitor blood pressure', 'Gradual dose increase', 'Liver dysfunction'],
    price: {
      generic: '₹12-25/strip',
      branded: '₹35-80/strip'
    },
    prescription: true,
    availability: 'Prescription only'
  },

  'atenolol': {
    name: 'Atenolol',
    generic: 'Atenolol',
    brands: ['Aten', 'Tenormin', 'Atenova', 'Atecor'],
    category: 'Beta Blocker',
    uses: ['Hypertension', 'Angina', 'Arrhythmia', 'Post-MI prophylaxis'],
    dosage: {
      adult: '25-100mg once daily',
      elderly: 'Start with 25mg once daily',
      child: '1-2mg/kg once daily'
    },
    sideEffects: ['Fatigue', 'Cold extremities', 'Bradycardia', 'Bronchospasm'],
    precautions: ['Avoid sudden withdrawal', 'Caution in asthma/diabetes', 'Monitor pulse'],
    price: {
      generic: '₹8-18/strip',
      branded: '₹25-55/strip'
    },
    prescription: true,
    availability: 'Prescription only'
  },

  // Diabetes Management
  'metformin': {
    name: 'Metformin',
    generic: 'Metformin',
    brands: ['Glycomet', 'Glucophage', 'Obimet', 'Formet'],
    category: 'Antidiabetic (Biguanide)',
    uses: ['Type 2 diabetes', 'PCOS', 'Prediabetes prevention'],
    dosage: {
      adult: '500-1000mg twice daily with meals',
      maximum: '2000-2500mg/day',
      child: 'Generally not used <10 years'
    },
    sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste', 'Lactic acidosis (rare)'],
    precautions: ['Take with meals', 'Monitor kidney function', 'Stop before surgery'],
    price: {
      generic: '₹15-30/strip',
      branded: '₹40-90/strip'
    },
    prescription: true,
    availability: 'Prescription only'
  },

  'glimepiride': {
    name: 'Glimepiride',
    generic: 'Glimepiride',
    brands: ['Amaryl', 'Glimestar', 'Glimiprex', 'Glimp'],
    category: 'Antidiabetic (Sulfonylurea)',
    uses: ['Type 2 diabetes', 'Combination with other antidiabetics'],
    dosage: {
      adult: '1-4mg once daily with breakfast',
      maximum: '8mg/day',
      elderly: 'Start with 1mg daily'
    },
    sideEffects: ['Hypoglycemia', 'Weight gain', 'Nausea', 'Skin reactions'],
    precautions: ['Monitor blood glucose', 'Avoid alcohol', 'Regular meals important'],
    price: {
      generic: '₹18-35/strip',
      branded: '₹45-95/strip'
    },
    prescription: true,
    availability: 'Prescription only'
  },

  // Mental Health
  'sertraline': {
    name: 'Sertraline',
    generic: 'Sertraline',
    brands: ['Zoloft', 'Serta', 'Daxid', 'Serenata'],
    category: 'SSRI Antidepressant',
    uses: ['Depression', 'Anxiety disorders', 'PTSD', 'OCD'],
    dosage: {
      adult: '50-200mg once daily',
      child: '25-200mg daily (age >6 years for OCD)',
      start: '25-50mg daily, increase gradually'
    },
    sideEffects: ['Nausea', 'Sexual dysfunction', 'Insomnia', 'Headache'],
    precautions: ['Gradual dose changes', 'Monitor for suicidal thoughts', 'Avoid alcohol'],
    price: {
      generic: '₹25-50/strip',
      branded: '₹80-180/strip'
    },
    prescription: true,
    availability: 'Prescription only'
  },

  'lorazepam': {
    name: 'Lorazepam',
    generic: 'Lorazepam',
    brands: ['Ativan', 'Loraz', 'Anxira', 'Loripta'],
    category: 'Benzodiazepine',
    uses: ['Anxiety', 'Insomnia', 'Panic attacks', 'Preoperative sedation'],
    dosage: {
      adult: '0.5-2mg twice daily',
      elderly: '0.5-1mg twice daily',
      maximum: '10mg/day'
    },
    sideEffects: ['Sedation', 'Memory problems', 'Confusion', 'Dependence'],
    precautions: ['Risk of dependence', 'Avoid alcohol', 'Gradual withdrawal'],
    price: {
      generic: '₹20-40/strip',
      branded: '₹50-120/strip'
    },
    prescription: true,
    availability: 'Prescription only (Schedule H)'
  },

  // Women's Health
  'mefenamic_acid': {
    name: 'Mefenamic Acid',
    generic: 'Mefenamic Acid',
    brands: ['Meftal', 'Ponstan', 'Dolser', 'Mefgesic'],
    category: 'NSAID',
    uses: ['Menstrual pain', 'Heavy menstrual bleeding', 'Pain relief'],
    dosage: {
      adult: '500mg three times daily with food',
      duration: 'Maximum 7 days per cycle',
      child: '>14 years: adult dose'
    },
    sideEffects: ['Stomach upset', 'Headache', 'Dizziness', 'Rash'],
    precautions: ['Take with food', 'Avoid in peptic ulcer', 'Monitor for bleeding'],
    price: {
      generic: '₹12-25/strip',
      branded: '₹30-65/strip'
    },
    prescription: false,
    availability: 'Over-the-counter'
  },

  'folic_acid': {
    name: 'Folic Acid',
    generic: 'Folic Acid',
    brands: ['Folvite', 'Folsafe', 'Acfol', 'Folibest'],
    category: 'Vitamin Supplement',
    uses: ['Pregnancy supplement', 'Anemia prevention', 'Neural tube defect prevention'],
    dosage: {
      pregnancy: '400-800mcg daily',
      anemia: '5-15mg daily',
      child: '50-300mcg daily'
    },
    sideEffects: ['Nausea (rare)', 'Abdominal cramps (rare)', 'Sleep disturbances (rare)'],
    precautions: ['Start before conception', 'Continue through pregnancy', 'Check B12 levels'],
    price: {
      generic: '₹5-15/strip',
      branded: '₹20-40/strip'
    },
    prescription: false,
    availability: 'Over-the-counter'
  },

  // Vitamins & Supplements
  'vitamin_d3': {
    name: 'Vitamin D3',
    generic: 'Cholecalciferol',
    brands: ['Calcirol', 'Uprise', 'D3 Must', 'Tayo'],
    category: 'Vitamin Supplement',
    uses: ['Vitamin D deficiency', 'Bone health', 'Immunity support', 'Rickets prevention'],
    dosage: {
      adult: '1000-4000 IU daily or 60,000 IU weekly',
      child: '400-1000 IU daily',
      deficiency: '60,000 IU weekly for 8 weeks'
    },
    sideEffects: ['Nausea (overdose)', 'Kidney stones (excess)', 'Weakness (toxicity)'],
    precautions: ['Monitor calcium levels', 'Take with fat-containing meal', 'Check vitamin D levels'],
    price: {
      generic: '₹15-30/strip',
      branded: '₹40-80/strip'
    },
    prescription: false,
    availability: 'Over-the-counter'
  },

  'iron_folic_acid': {
    name: 'Iron + Folic Acid',
    generic: 'Ferrous Sulfate + Folic Acid',
    brands: ['IFA', 'Fefol', 'Orofer', 'Autrin'],
    category: 'Mineral + Vitamin',
    uses: ['Iron deficiency anemia', 'Pregnancy anemia', 'Nutritional anemia'],
    dosage: {
      adult: '100-200mg iron + 400mcg folic acid daily',
      pregnancy: '100mg iron + 500mcg folic acid daily',
      child: '3-6mg/kg iron daily'
    },
    sideEffects: ['Constipation', 'Nausea', 'Black stools', 'Metallic taste'],
    precautions: ['Take on empty stomach if tolerated', 'Avoid tea/coffee', 'Take with vitamin C'],
    price: {
      generic: '₹8-20/strip',
      branded: '₹25-50/strip'
    },
    prescription: false,
    availability: 'Over-the-counter'
  }
};

// Medicine categories for better organization
export const medicineCategories = {
  'analgesics': {
    name: 'Pain Relief & Fever',
    medicines: ['paracetamol', 'ibuprofen', 'aspirin', 'mefenamic_acid']
  },
  'antibiotics': {
    name: 'Antibiotics',
    medicines: ['amoxicillin', 'azithromycin', 'ciprofloxacin']
  },
  'gastrointestinal': {
    name: 'Stomach & Digestion',
    medicines: ['omeprazole', 'ranitidine', 'domperidone']
  },
  'respiratory': {
    name: 'Respiratory System',
    medicines: ['salbutamol', 'cetirizine']
  },
  'cardiovascular': {
    name: 'Heart & Blood Pressure',
    medicines: ['amlodipine', 'atenolol']
  },
  'diabetes': {
    name: 'Diabetes Management',
    medicines: ['metformin', 'glimepiride']
  },
  'mental_health': {
    name: 'Mental Health',
    medicines: ['sertraline', 'lorazepam']
  },
  'womens_health': {
    name: 'Women\'s Health',
    medicines: ['mefenamic_acid', 'folic_acid']
  },
  'vitamins': {
    name: 'Vitamins & Supplements',
    medicines: ['vitamin_d3', 'iron_folic_acid', 'folic_acid']
  }
};

// Government scheme medicine prices (Jan Aushadhi)
export const janAushadhiPrices = {
  'paracetamol': '₹2-5/strip',
  'ibuprofen': '₹5-12/strip',
  'amoxicillin': '₹8-18/strip',
  'azithromycin': '₹15-25/strip',
  'omeprazole': '₹6-12/strip',
  'cetirizine': '₹3-8/strip',
  'metformin': '₹8-15/strip',
  'amlodipine': '₹5-12/strip',
  'atenolol': '₹3-8/strip',
  'vitamin_d3': '₹8-15/strip',
  'iron_folic_acid': '₹3-8/strip'
};

export const getMedicineByName = (name: string) => {
  return expandedMedicineDatabase[name.toLowerCase().replace(/\s+/g, '_')];
};

export const searchMedicines = (query: string) => {
  const results = [];
  const searchTerm = query.toLowerCase();
  
  for (const [key, medicine] of Object.entries(expandedMedicineDatabase)) {
    if (
      medicine.name.toLowerCase().includes(searchTerm) ||
      medicine.generic.toLowerCase().includes(searchTerm) ||
      medicine.brands.some(brand => brand.toLowerCase().includes(searchTerm)) ||
      medicine.uses.some(use => use.toLowerCase().includes(searchTerm)) ||
      medicine.category.toLowerCase().includes(searchTerm)
    ) {
      results.push({ key, ...medicine });
    }
  }
  
  return results;
};

export const getMedicinesByCategory = (categoryKey: string) => {
  const category = medicineCategories[categoryKey];
  if (!category) return [];
  
  return category.medicines.map(medicineKey => ({
    key: medicineKey,
    ...expandedMedicineDatabase[medicineKey]
  }));
};