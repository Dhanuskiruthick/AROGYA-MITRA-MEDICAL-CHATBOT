import { ComprehensiveDiseaseDatabase } from './ComprehensiveDiseaseDatabase';

export class SymptomAnalyzer {
  private static symptomDatabase = {
    // Integration with comprehensive database
    ...ComprehensiveDiseaseDatabase.diseaseDatabase,
    
    // Additional common symptoms and conditions specific to rural India
    'fever': {
      keywords: ['fever', 'high temperature', 'hot', 'burning up', 'feverish', 'बुखार', 'तेज़ बुखार', 'गर्मी'],
      hindiName: 'बुखार',
      causes: ['Viral infection', 'Bacterial infection', 'Flu', 'Common cold', 'Malaria', 'Dengue', 'Typhoid'],
      severity: 'medium',
      symptoms: ['High body temperature', 'Chills', 'Sweating', 'Headache', 'Body aches', 'Fatigue'],
      medicines: [
        {
          name: 'Paracetamol (Crocin)',
          generic: 'Acetaminophen',
          dosage: '500mg',
          frequency: 'Every 6 hours',
          duration: '3-5 days',
          sideEffects: ['Generally safe when used as directed'],
          price: '₹10-25'
        },
        {
          name: 'Ibuprofen',
          generic: 'Ibuprofen',
          dosage: '400mg',
          frequency: 'Every 8 hours',
          duration: '3-5 days',
          sideEffects: ['May cause stomach irritation'],
          price: '₹15-30'
        },
        {
          name: 'Aspirin',
          generic: 'Acetylsalicylic acid',
          dosage: '500mg',
          frequency: 'Every 6 hours',
          duration: '3-5 days',
          sideEffects: ['Avoid in children, stomach irritation'],
          price: '₹8-20'
        }
      ],
      homeRemedies: [
        'पानी और तरल पदार्थ अधिक पिएं',
        'आराम करें और ठंडी जगह रहें',
        'माथे पर ठंडी पट्टी रखें',
        'हल्का गुनगुना पानी से नहाएं',
        'हल्के कपड़े पहनें'
      ],
      doctorWarning: [
        'Temperature above 103°F (39.4°C)',
        'Fever lasts more than 3 days',
        'Severe headache or neck stiffness',
        'Difficulty breathing',
        'Persistent vomiting',
        'Signs of dehydration'
      ]
    },

    // Common cold and flu - expanded
    'common cold': {
      keywords: ['cold', 'runny nose', 'congestion', 'sneezing', 'stuffy nose', 'सर्दी', 'जुकाम', 'नाक बहना'],
      hindiName: 'सामान्य सर्दी-जुकाम',
      causes: ['Rhinovirus', 'Coronavirus', 'Adenovirus', 'Respiratory syncytial virus'],
      severity: 'low',
      symptoms: ['Runny nose', 'Sneezing', 'Cough', 'Sore throat', 'Mild fever', 'Fatigue'],
      medicines: [
        {
          name: 'Cetirizine (Zyrtec)',
          generic: 'Cetirizine',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '5-7 days',
          sideEffects: ['Drowsiness', 'dry mouth'],
          price: '₹30-50'
        },
        {
          name: 'Phenylephrine + Paracetamol (Sinarest)',
          generic: 'Phenylephrine + Acetaminophen',
          dosage: '1 tablet',
          frequency: 'Every 6 hours',
          duration: '3-5 days',
          sideEffects: ['Drowsiness', 'increased heart rate'],
          price: '₹40-60'
        },
        {
          name: 'Dextromethorphan (Benadryl)',
          generic: 'Dextromethorphan',
          dosage: '10ml',
          frequency: '3 times daily',
          duration: '5-7 days',
          sideEffects: ['Drowsiness'],
          price: '₹80-120'
        }
      ],
      homeRemedies: [
        'भाप लें (Steam inhalation)',
        'नमक के पानी से गरारे करें',
        'अदरक की चाय पिएं',
        'शहद और नींबू गर्म पानी में',
        'पर्याप्त आराम करें'
      ],
      doctorWarning: [
        'Symptoms persist for more than 10 days',
        'High fever above 101°F',
        'Severe headache or sinus pain',
        'Difficulty breathing',
        'Chest pain or persistent cough'
      ]
    },

    // Diarrhea - very common in rural areas
    'diarrhea': {
      keywords: ['diarrhea', 'loose stools', 'frequent bowel movements', 'watery stools', 'दस्त', 'पेचिश', 'पतले दस्त'],
      hindiName: 'दस्त/अतिसार',
      causes: ['Viral gastroenteritis', 'Bacterial infection', 'Food poisoning', 'Contaminated water', 'Parasites'],
      severity: 'medium',
      symptoms: ['Frequent loose stools', 'Abdominal cramps', 'Nausea', 'Vomiting', 'Fever', 'Dehydration'],
      medicines: [
        {
          name: 'ORS (Oral Rehydration Solution)',
          generic: 'ORS',
          dosage: '1 sachet in 200ml water',
          frequency: 'After each loose stool',
          duration: 'Until recovery',
          sideEffects: ['Generally safe'],
          price: '₹5-15'
        },
        {
          name: 'Loperamide (Imodium)',
          generic: 'Loperamide',
          dosage: '2mg',
          frequency: 'After each loose stool',
          duration: '2-3 days',
          sideEffects: ['Constipation', 'dizziness'],
          price: '₹30-60'
        },
        {
          name: 'Zinc tablets',
          generic: 'Zinc sulfate',
          dosage: '20mg',
          frequency: 'Once daily',
          duration: '10-14 days',
          sideEffects: ['Metallic taste'],
          price: '₹20-40'
        }
      ],
      homeRemedies: [
        'ORS घोल बार-बार पिएं',
        'दही और चावल खाएं',
        'केला खाएं',
        'नारियल पानी पिएं',
        'तली हुई चीजें न खाएं'
      ],
      doctorWarning: [
        'Severe dehydration signs',
        'Blood in stool',
        'High fever with diarrhea',
        'Symptoms persist more than 3 days',
        'Signs of severe weakness'
      ]
    },

    // Skin rashes - common in tropical climate
    'skin rash': {
      keywords: ['rash', 'skin irritation', 'red patches', 'itchy skin', 'skin allergy', 'दाने', 'खुजली', 'चर्म रोग'],
      hindiName: 'त्वचा पर दाने',
      causes: ['Allergic reaction', 'Heat rash', 'Fungal infection', 'Bacterial infection', 'Insect bites'],
      severity: 'low',
      symptoms: ['Red patches', 'Itching', 'Burning sensation', 'Swelling', 'Blisters', 'Dry skin'],
      medicines: [
        {
          name: 'Calamine Lotion',
          generic: 'Calamine',
          dosage: 'Apply as needed',
          frequency: '3-4 times daily',
          duration: 'Until relief',
          sideEffects: ['Generally safe'],
          price: '₹40-80'
        },
        {
          name: 'Hydrocortisone Cream',
          generic: 'Hydrocortisone',
          dosage: '1% cream',
          frequency: 'Apply twice daily',
          duration: '7-10 days',
          sideEffects: ['Skin thinning with prolonged use'],
          price: '₹50-120'
        },
        {
          name: 'Cetirizine',
          generic: 'Cetirizine',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '5-7 days',
          sideEffects: ['Drowsiness'],
          price: '₹30-50'
        }
      ],
      homeRemedies: [
        'नीम के पत्ते का पानी लगाएं',
        'एलोवेरा जेल लगाएं',
        'हल्दी का पेस्ट लगाएं',
        'ठंडे पानी से धोएं',
        'सूती कपड़े पहनें'
      ],
      doctorWarning: [
        'Signs of infection (pus formation)',
        'Severe itching interfering with sleep',
        'Spreading rapidly',
        'No improvement after 2 weeks',
        'Fever with skin symptoms'
      ]
    },

    // Worm infestation - common in rural areas
    'worms': {
      keywords: ['worms', 'intestinal worms', 'stomach worms', 'parasites', 'कृमि', 'पेट के कीड़े', 'कीड़े'],
      hindiName: 'कृमि संक्रमण',
      causes: ['Poor hygiene', 'Contaminated food/water', 'Walking barefoot', 'Unwashed vegetables'],
      severity: 'medium',
      symptoms: ['Abdominal pain', 'Loss of appetite', 'Weight loss', 'Itching around anus', 'Visible worms in stool'],
      medicines: [
        {
          name: 'Albendazole',
          generic: 'Albendazole',
          dosage: '400mg',
          frequency: 'Single dose',
          duration: 'Repeat after 2 weeks',
          sideEffects: ['Nausea', 'headache'],
          price: '₹15-30'
        },
        {
          name: 'Mebendazole',
          generic: 'Mebendazole',
          dosage: '100mg',
          frequency: 'Twice daily',
          duration: '3 days',
          sideEffects: ['Abdominal pain'],
          price: '₹20-40'
        },
        {
          name: 'Pyrantel pamoate',
          generic: 'Pyrantel pamoate',
          dosage: '11mg/kg',
          frequency: 'Single dose',
          duration: 'Repeat after 2 weeks',
          sideEffects: ['Nausea', 'vomiting'],
          price: '₹50-100'
        }
      ],
      homeRemedies: [
        'रोज सुबह लहसुन खाएं',
        'पपीते के बीज खाएं',
        'अजवाइन का सेवन करें',
        'हाथ-पैर साफ रखें',
        'नंगे पैर न चलें'
      ],
      doctorWarning: [
        'Severe abdominal pain',
        'Blood in stool',
        'Severe weight loss',
        'Recurring infections',
        'Family members also infected'
      ]
    },

    // Eye problems - common due to dust and pollution
    'eye problems': {
      keywords: ['eye pain', 'red eyes', 'eye infection', 'conjunctivitis', 'watery eyes', 'आंख की समस्या', 'आंख का दर्द'],
      hindiName: 'आंख की समस्या',
      causes: ['Bacterial infection', 'Viral infection', 'Allergies', 'Dust irritation', 'Chemical exposure'],
      severity: 'low',
      symptoms: ['Red eyes', 'Itching', 'Watery discharge', 'Burning sensation', 'Blurred vision', 'Light sensitivity'],
      medicines: [
        {
          name: 'Chloramphenicol Eye Drops',
          generic: 'Chloramphenicol',
          dosage: '1-2 drops',
          frequency: 'Every 2 hours',
          duration: '5-7 days',
          sideEffects: ['Temporary stinging'],
          price: '₹50-100'
        },
        {
          name: 'Artificial Tears',
          generic: 'Polyethylene glycol',
          dosage: '1-2 drops',
          frequency: '4 times daily',
          duration: 'As needed',
          sideEffects: ['Temporary blurring'],
          price: '₹100-200'
        }
      ],
      homeRemedies: [
        'ठंडे पानी से आंखें धोएं',
        'गुलाब जल लगाएं',
        'आंखों को रगड़ें नहीं',
        'साफ तौलिया इस्तेमाल करें',
        'धूप से बचें'
      ],
      doctorWarning: [
        'Severe eye pain',
        'Vision changes',
        'Pus discharge',
        'No improvement in 3 days',
        'Light sensitivity increases'
      ]
    },

    // Urinary tract infection
    'uti': {
      keywords: ['uti', 'urinary infection', 'burning urination', 'frequent urination', 'पेशाब में जलन', 'मूत्र संक्रमण'],
      hindiName: 'मूत्र मार्ग संक्रमण',
      causes: ['Bacterial infection', 'Poor hygiene', 'Dehydration', 'Holding urine too long'],
      severity: 'medium',
      symptoms: ['Burning during urination', 'Frequent urination', 'Urgent need to urinate', 'Cloudy urine', 'Strong smell'],
      medicines: [
        {
          name: 'Trimethoprim-Sulfamethoxazole',
          generic: 'Co-trimoxazole',
          dosage: '160/800mg',
          frequency: 'Twice daily',
          duration: '3-7 days',
          sideEffects: ['Nausea', 'skin rash'],
          price: '₹30-60'
        },
        {
          name: 'Nitrofurantoin',
          generic: 'Nitrofurantoin',
          dosage: '100mg',
          frequency: 'Four times daily',
          duration: '5-7 days',
          sideEffects: ['Nausea', 'brown urine'],
          price: '₹50-100'
        }
      ],
      homeRemedies: [
        'खूब पानी पिएं',
        'क्रैनबेरी जूस पिएं',
        'साफ-सफाई रखें',
        'पेशाब को न रोकें',
        'कॉफी और शराब से बचें'
      ],
      doctorWarning: [
        'Blood in urine',
        'High fever with UTI',
        'Severe back pain',
        'Vomiting',
        'Symptoms worsen'
      ]
    },

    // Headache symptoms
    headache: {
      keywords: ['headache', 'head pain', 'migraine', 'head hurts', 'throbbing head'],
      causes: ['Tension headache', 'Migraine', 'Dehydration', 'Stress', 'Eye strain'],
      severity: 'low',
      medicines: [
        {
          name: 'Paracetamol',
          generic: 'Acetaminophen',
          dosage: '500mg',
          frequency: 'Every 6 hours',
          duration: '1-2 days',
          sideEffects: ['Generally safe'],
          price: '₹10-25'
        },
        {
          name: 'Aspirin',
          generic: 'Acetylsalicylic acid',
          dosage: '500mg',
          frequency: 'Every 6 hours',
          duration: '1-2 days',
          sideEffects: ['Avoid if stomach sensitivity'],
          price: '₹8-20'
        },
        {
          name: 'Ibuprofen',
          generic: 'Ibuprofen',
          dosage: '400mg',
          frequency: 'Every 8 hours',
          duration: '1-2 days',
          sideEffects: ['May cause stomach issues'],
          price: '₹15-30'
        }
      ],
      homeRemedies: [
        'Apply cold or warm compress to head/neck',
        'Stay hydrated with water',
        'Rest in a dark, quiet room',
        'Practice relaxation techniques',
        'Gentle neck and shoulder massage'
      ],
      doctorWarning: [
        'Sudden, severe headache',
        'Headache with fever and neck stiffness',
        'Headache after head injury',
        'Changes in vision or speech',
        'Frequent or worsening headaches'
      ]
    },

    // Cough symptoms
    cough: {
      keywords: ['cough', 'coughing', 'hacking', 'throat clearing', 'phlegm'],
      causes: ['Viral infection', 'Bacterial infection', 'Allergy', 'Dry air', 'Post-nasal drip'],
      severity: 'low',
      medicines: [
        {
          name: 'Benadryl Cough Syrup',
          generic: 'Dextromethorphan',
          dosage: '10ml',
          frequency: '3 times daily',
          duration: '5-7 days',
          sideEffects: ['May cause drowsiness'],
          price: '₹80-120'
        },
        {
          name: 'Ascoril Cough Syrup',
          generic: 'Guaifenesin',
          dosage: '10ml',
          frequency: '3 times daily',
          duration: '5-7 days',
          sideEffects: ['Nausea', 'dizziness'],
          price: '₹90-130'
        },
        {
          name: 'Honey',
          generic: 'Natural remedy',
          dosage: '1 tbsp with warm water',
          frequency: '2-3 times daily',
          duration: '5-7 days',
          sideEffects: ['Natural, generally safe'],
          price: '₹50-100'
        }
      ],
      homeRemedies: [
        'Drink warm liquids (tea, broth, warm water with honey)',
        'Use a humidifier or breathe steam',
        'Suck on throat lozenges',
        'Elevate your head while sleeping',
        'Avoid irritants like smoke'
      ],
      doctorWarning: [
        'Cough with blood',
        'Persistent cough for more than 3 weeks',
        'High fever with cough',
        'Difficulty breathing or wheezing',
        'Chest pain with coughing'
      ]
    },

    // Stomach/digestive issues
    stomach: {
      keywords: ['stomach ache', 'stomach pain', 'belly pain', 'nausea', 'vomiting', 'diarrhea', 'indigestion', 'acidity', 'gas', 'gastritis'],
      causes: ['Indigestion', 'Gas', 'Food poisoning', 'Acidity', 'Gastritis'],
      severity: 'medium',
      medicines: [
        {
          name: 'ENO',
          generic: 'Antacid',
          dosage: '1 sachet in water',
          frequency: 'As needed',
          duration: '2-3 days',
          sideEffects: ['Generally safe'],
          price: '₹5-15'
        },
        {
          name: 'Digene',
          generic: 'Antacid',
          dosage: '2 tablets after meals',
          frequency: 'After meals',
          duration: '2-3 days',
          sideEffects: ['May cause constipation'],
          price: '₹20-40'
        },
        {
          name: 'Omeprazole',
          generic: 'Omeprazole',
          dosage: '20mg before breakfast',
          frequency: 'Once daily',
          duration: '5-7 days',
          sideEffects: ['Long-term use may affect nutrient absorption'],
          price: '₹25-50'
        }
      ],
      homeRemedies: [
        'Stay hydrated with clear fluids',
        'Follow BRAT diet (Bananas, Rice, Applesauce, Toast)',
        'Drink ginger tea for nausea',
        'Rest and avoid solid foods initially',
        'Small, frequent sips of electrolyte solutions'
      ],
      doctorWarning: [
        'Severe dehydration',
        'Blood in stool or vomit',
        'High fever with stomach pain',
        'Severe abdominal pain',
        'Symptoms persist more than 48 hours'
      ]
    },

    // Sore throat
    throat: {
      keywords: ['sore throat', 'throat pain', 'scratchy throat', 'swollen throat', 'difficulty swallowing'],
      causes: ['Viral infection', 'Bacterial infection (strep)', 'Allergies', 'Dry air', 'Acid reflux'],
      severity: 'low',
      medicines: [
        {
          name: 'Strepsils',
          generic: 'Benzocaine/Menthol',
          dosage: '1 lozenge',
          frequency: 'Every 2-3 hours',
          duration: '3-5 days',
          sideEffects: ['Mouth numbness'],
          price: '₹25-40'
        },
        {
          name: 'Betadine Gargle',
          generic: 'Povidone Iodine',
          dosage: '15ml with warm water',
          frequency: '3-4 times daily',
          duration: '3-5 days',
          sideEffects: ['Temporary taste alteration'],
          price: '₹45-70'
        },
        {
          name: 'Ibuprofen',
          generic: 'Ibuprofen',
          dosage: '400mg',
          frequency: 'Every 8 hours',
          duration: '3-5 days',
          sideEffects: ['Stomach upset'],
          price: '₹15-30'
        }
      ],
      homeRemedies: [
        'Gargle with warm salt water',
        'Drink warm liquids (tea, broth)',
        'Use a humidifier',
        'Suck on ice chips or popsicles',
        'Avoid irritants like smoke'
      ],
      doctorWarning: [
        'Severe difficulty swallowing',
        'High fever with sore throat',
        'White patches on throat',
        'Swollen lymph nodes',
        'Symptoms worsen after 3 days'
      ]
    },

    // Cold and flu
    cold: {
      keywords: ['cold', 'runny nose', 'congestion', 'sneezing', 'stuffy nose', 'flu'],
      causes: ['Viral infection', 'Common cold virus', 'Influenza', 'Rhinovirus'],
      severity: 'low',
      medicines: [
        {
          name: 'Cetrizine',
          generic: 'Cetirizine',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '5-7 days',
          sideEffects: ['Drowsiness', 'dry mouth'],
          price: '₹30-50'
        },
        {
          name: 'Paracetamol',
          generic: 'Acetaminophen',
          dosage: '500mg',
          frequency: 'Every 6 hours',
          duration: '3-5 days',
          sideEffects: ['Generally safe'],
          price: '₹10-25'
        },
        {
          name: 'Sinarest',
          generic: 'Paracetamol + Phenylephrine',
          dosage: '1 tablet',
          frequency: 'Every 6 hours',
          duration: '3-5 days',
          sideEffects: ['Drowsiness', 'dry mouth'],
          price: '₹40-60'
        }
      ],
      homeRemedies: [
        'Steam inhalation with eucalyptus oil',
        'Warm salt water gargle',
        'Drink warm fluids like ginger tea',
        'Rest and adequate sleep',
        'Honey and lemon in warm water'
      ],
      doctorWarning: [
        'Symptoms persist for more than 10 days',
        'High fever above 101°F',
        'Severe headache or sinus pain',
        'Difficulty breathing',
        'Chest pain or persistent cough'
      ]
    },

    // Chronic Diseases
    diabetes: {
      keywords: ['diabetes', 'high blood sugar', 'frequent urination', 'excessive thirst', 'diabetic'],
      causes: ['Type 1 diabetes', 'Type 2 diabetes', 'Gestational diabetes', 'Insulin resistance', 'Genetic factors'],
      severity: 'high',
      medicines: [
        {
          name: 'Metformin',
          generic: 'Metformin HCl',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: 'Ongoing as prescribed',
          sideEffects: ['Nausea', 'diarrhea initially'],
          price: '₹50-150'
        },
        {
          name: 'Glimepiride',
          generic: 'Glimepiride',
          dosage: '1-2mg',
          frequency: 'Once daily',
          duration: 'Ongoing as prescribed',
          sideEffects: ['May cause hypoglycemia'],
          price: '₹80-200'
        },
        {
          name: 'Insulin',
          generic: 'Human insulin',
          dosage: 'As per doctor',
          frequency: 'As prescribed',
          duration: 'Ongoing as prescribed',
          sideEffects: ['Requires proper injection technique'],
          price: '₹200-500'
        }
      ],
      homeRemedies: [
        'Regular exercise',
        'Low carb diet',
        'Bitter gourd juice',
        'Fenugreek seeds',
        'Cinnamon powder'
      ],
      doctorWarning: [
        'CHRONIC CONDITION - Requires continuous medical supervision',
        'Regular blood sugar monitoring needed',
        'Annual eye and kidney examinations required',
        'Immediate attention for very high or low blood sugar',
        'Foot care and regular check-ups essential'
      ]
    },

    hypertension: {
      keywords: ['high blood pressure', 'hypertension', 'blood pressure', 'bp high', 'systolic', 'diastolic'],
      causes: ['High blood pressure', 'Stress', 'Obesity', 'High salt intake', 'Genetic factors', 'Kidney problems'],
      severity: 'high',
      medicines: [
        {
          name: 'Amlodipine',
          generic: 'Amlodipine besylate',
          dosage: '5-10mg',
          frequency: 'Once daily',
          duration: 'Ongoing as prescribed',
          sideEffects: ['Ankle swelling', 'dizziness'],
          price: '₹30-80'
        },
        {
          name: 'Telmisartan',
          generic: 'Telmisartan',
          dosage: '40-80mg',
          frequency: 'Once daily',
          duration: 'Ongoing as prescribed',
          sideEffects: ['Dry cough', 'dizziness'],
          price: '₹100-250'
        },
        {
          name: 'Atenolol',
          generic: 'Atenolol',
          dosage: '25-50mg',
          frequency: 'Once daily',
          duration: 'Ongoing as prescribed',
          sideEffects: ['Fatigue', 'cold hands'],
          price: '₹20-60'
        }
      ],
      homeRemedies: [
        'Low sodium diet',
        'Regular exercise',
        'Weight management',
        'Garlic',
        'Meditation',
        'Limit alcohol'
      ],
      doctorWarning: [
        'CHRONIC CONDITION - Silent killer',
        'Regular BP monitoring required',
        'Medication compliance is critical',
        'Annual heart and kidney evaluations',
        'Emergency care for BP above 180/120'
      ]
    },

    asthma: {
      keywords: ['asthma', 'wheezing', 'shortness of breath', 'breathing difficulty', 'chest tightness'],
      causes: ['Allergic asthma', 'Non-allergic asthma', 'Exercise-induced', 'Occupational exposure'],
      severity: 'high',
      medicines: [
        {
          name: 'Salbutamol Inhaler',
          generic: 'Salbutamol',
          dosage: '2 puffs',
          frequency: 'When needed',
          duration: 'As required',
          sideEffects: ['Tremors', 'rapid heartbeat'],
          price: '₹150-300'
        },
        {
          name: 'Budesonide Inhaler',
          generic: 'Budesonide',
          dosage: '1-2 puffs',
          frequency: 'Twice daily',
          duration: 'Ongoing as prescribed',
          sideEffects: ['Oral thrush if not rinsed'],
          price: '₹400-800'
        },
        {
          name: 'Montelukast',
          generic: 'Montelukast',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: 'Ongoing as prescribed',
          sideEffects: ['Mood changes', 'headache'],
          price: '₹100-250'
        }
      ],
      homeRemedies: [
        'Avoid triggers',
        'Steam inhalation',
        'Honey and ginger',
        'Breathing exercises',
        'Turmeric milk'
      ],
      doctorWarning: [
        'CHRONIC CONDITION - Keep rescue inhaler always available',
        'Emergency care for severe breathing difficulty',
        'Avoid known triggers',
        'Regular pulmonary function tests',
        'Action plan for asthma attacks'
      ]
    },

    // Infectious Diseases
    malaria: {
      keywords: ['malaria', 'chills', 'sweating', 'shivering', 'mosquito bite', 'periodic fever'],
      causes: ['Plasmodium parasite', 'Mosquito bite', 'Contaminated blood transfusion'],
      severity: 'high',
      medicines: [
        {
          name: 'Chloroquine',
          generic: 'Chloroquine phosphate',
          dosage: '600mg',
          frequency: 'Initial, then 300mg after 6,24,48 hrs',
          duration: 'As prescribed',
          sideEffects: ['Nausea', 'headache', 'dizziness'],
          price: '₹30-80'
        },
        {
          name: 'Artemether + Lumefantrine',
          generic: 'Artemether/Lumefantrine',
          dosage: '80mg/480mg',
          frequency: 'Twice daily',
          duration: '3 days',
          sideEffects: ['Dizziness', 'loss of appetite'],
          price: '₹200-500'
        },
        {
          name: 'Paracetamol',
          generic: 'Acetaminophen',
          dosage: '500mg',
          frequency: 'Every 6 hours',
          duration: 'For fever',
          sideEffects: ['Generally safe'],
          price: '₹10-25'
        }
      ],
      homeRemedies: [
        'Use mosquito nets',
        'Stay hydrated',
        'Rest and avoid exertion',
        'Neem leaves boiled water',
        'Ginger tea for nausea'
      ],
      doctorWarning: [
        'SERIOUS INFECTIOUS DISEASE - Immediate medical attention required',
        'Blood test needed for confirmation',
        'High fever with chills and sweating',
        'Severe headache or confusion',
        'Breathing difficulty or chest pain'
      ]
    },

    dengue: {
      keywords: ['dengue', 'aedes mosquito', 'body ache', 'eye pain', 'rash', 'platelet count'],
      causes: ['Dengue virus', 'Aedes mosquito bite', 'Viral infection'],
      severity: 'high',
      medicines: [
        {
          name: 'Paracetamol',
          generic: 'Acetaminophen',
          dosage: '500mg',
          frequency: 'Every 6 hours',
          duration: 'For fever and pain',
          sideEffects: ['Generally safe'],
          price: '₹10-25'
        },
        {
          name: 'ORS',
          generic: 'Oral Rehydration Solution',
          dosage: '1 sachet in 200ml water',
          frequency: 'Every 2-3 hours',
          duration: 'Until recovery',
          sideEffects: ['Generally safe'],
          price: '₹5-15'
        },
        {
          name: 'Papaya Leaf Extract',
          generic: 'Natural supplement',
          dosage: '30ml',
          frequency: 'Twice daily',
          duration: '5-7 days',
          sideEffects: ['Natural, generally safe'],
          price: '₹100-200'
        }
      ],
      homeRemedies: [
        'Drink plenty of fluids',
        'Complete bed rest',
        'Papaya leaf juice',
        'Coconut water',
        'Avoid aspirin and ibuprofen'
      ],
      doctorWarning: [
        'SERIOUS VIRAL INFECTION - Immediate medical care required',
        'Regular platelet count monitoring needed',
        'Severe abdominal pain',
        'Persistent vomiting',
        'Bleeding from nose or gums'
      ]
    },

    typhoid: {
      keywords: ['typhoid', 'rose spots', 'prolonged fever', 'diarrhea', 'salmonella'],
      causes: ['Salmonella typhi bacteria', 'Contaminated food/water', 'Poor hygiene'],
      severity: 'high',
      medicines: [
        {
          name: 'Ciprofloxacin',
          generic: 'Ciprofloxacin HCl',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '7-10 days',
          sideEffects: ['Nausea', 'diarrhea'],
          price: '₹50-150'
        },
        {
          name: 'Azithromycin',
          generic: 'Azithromycin',
          dosage: '500mg',
          frequency: 'Once daily',
          duration: '7 days',
          sideEffects: ['GI upset', 'headache'],
          price: '₹100-250'
        },
        {
          name: 'Paracetamol',
          generic: 'Acetaminophen',
          dosage: '500mg',
          frequency: 'Every 6 hours',
          duration: 'For fever',
          sideEffects: ['Generally safe'],
          price: '₹10-25'
        }
      ],
      homeRemedies: [
        'Drink boiled water only',
        'Eat light, easily digestible food',
        'Complete rest',
        'Maintain hygiene',
        'Avoid raw foods'
      ],
      doctorWarning: [
        'SERIOUS BACTERIAL INFECTION - Antibiotic treatment required',
        'Blood test and stool culture needed',
        'High fever for more than 3 days',
        'Severe abdominal pain',
        'Rose-colored spots on chest'
      ]
    },

    // Dermatological Conditions
    eczema: {
      keywords: ['eczema', 'itchy skin', 'rash', 'dry skin', 'red patches', 'atopic dermatitis'],
      causes: ['Allergic reaction', 'Genetic factors', 'Environmental triggers', 'Stress'],
      severity: 'low',
      medicines: [
        {
          name: 'Hydrocortisone Cream',
          generic: 'Hydrocortisone',
          dosage: '1% cream',
          frequency: 'Apply twice daily',
          duration: '7-10 days',
          sideEffects: ['Skin thinning with prolonged use'],
          price: '₹50-120'
        },
        {
          name: 'Cetrizine',
          generic: 'Cetirizine',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '5-7 days',
          sideEffects: ['Drowsiness'],
          price: '₹30-50'
        },
        {
          name: 'Calamine Lotion',
          generic: 'Calamine',
          dosage: 'Apply as needed',
          frequency: '3-4 times daily',
          duration: 'Until relief',
          sideEffects: ['Generally safe'],
          price: '₹40-80'
        }
      ],
      homeRemedies: [
        'Keep skin moisturized',
        'Use mild, fragrance-free soaps',
        'Avoid known triggers',
        'Cool compresses for itching',
        'Oatmeal baths'
      ],
      doctorWarning: [
        'Signs of infection (pus, increased redness)',
        'Severe itching interfering with sleep',
        'Spreading to large areas',
        'No improvement after 2 weeks',
        'Fever with skin symptoms'
      ]
    },

    psoriasis: {
      keywords: ['psoriasis', 'scaly skin', 'silver scales', 'thick patches', 'autoimmune'],
      causes: ['Autoimmune condition', 'Genetic factors', 'Stress', 'Infections'],
      severity: 'medium',
      medicines: [
        {
          name: 'Coal Tar Shampoo',
          generic: 'Coal tar',
          dosage: 'Apply as directed',
          frequency: '2-3 times weekly',
          duration: 'Long-term use',
          sideEffects: ['May stain clothing'],
          price: '₹150-300'
        },
        {
          name: 'Salicylic Acid Cream',
          generic: 'Salicylic acid',
          dosage: '2-3% cream',
          frequency: 'Apply twice daily',
          duration: 'Ongoing',
          sideEffects: ['Skin irritation'],
          price: '₹80-200'
        },
        {
          name: 'Methotrexate',
          generic: 'Methotrexate',
          dosage: 'As per dermatologist',
          frequency: 'Weekly',
          duration: 'Long-term monitoring',
          sideEffects: ['Requires regular blood tests'],
          price: '₹100-300'
        }
      ],
      homeRemedies: [
        'Moisturize regularly',
        'Sunlight exposure (limited)',
        'Stress management',
        'Avoid injury to skin',
        'Healthy diet'
      ],
      doctorWarning: [
        'CHRONIC AUTOIMMUNE CONDITION - Dermatologist consultation needed',
        'Joint pain (psoriatic arthritis)',
        'Severe scaling or bleeding',
        'Emotional distress due to appearance',
        'Infection in affected areas'
      ]
    },

    // Gastrointestinal Conditions
    'acid reflux': {
      keywords: ['acid reflux', 'heartburn', 'gerd', 'burning chest', 'regurgitation'],
      causes: ['Stomach acid backing up', 'Hiatal hernia', 'Certain foods', 'Stress'],
      severity: 'medium',
      medicines: [
        {
          name: 'Omeprazole',
          generic: 'Omeprazole',
          dosage: '20mg',
          frequency: 'Once daily before breakfast',
          duration: '2-4 weeks',
          sideEffects: ['Headache', 'nausea'],
          price: '₹25-50'
        },
        {
          name: 'Ranitidine',
          generic: 'Ranitidine HCl',
          dosage: '150mg',
          frequency: 'Twice daily',
          duration: '2-8 weeks',
          sideEffects: ['Headache', 'constipation'],
          price: '₹30-70'
        },
        {
          name: 'Antacid',
          generic: 'Aluminum/Magnesium hydroxide',
          dosage: '2 tablets',
          frequency: 'After meals and bedtime',
          duration: 'As needed',
          sideEffects: ['May cause constipation/diarrhea'],
          price: '₹20-40'
        }
      ],
      homeRemedies: [
        'Avoid spicy and acidic foods',
        'Eat smaller, frequent meals',
        'Elevate head while sleeping',
        'Avoid lying down after eating',
        'Lose weight if overweight'
      ],
      doctorWarning: [
        'Severe chest pain',
        'Difficulty swallowing',
        'Persistent vomiting',
        'Unexplained weight loss',
        'Symptoms worsen despite treatment'
      ]
    },

    'ibs': {
      keywords: ['ibs', 'irritable bowel', 'abdominal pain', 'bloating', 'gas', 'bowel habits'],
      causes: ['Unknown exact cause', 'Stress', 'Food sensitivities', 'Gut bacteria changes'],
      severity: 'medium',
      medicines: [
        {
          name: 'Mebeverine',
          generic: 'Mebeverine HCl',
          dosage: '135mg',
          frequency: 'Three times daily',
          duration: 'As needed',
          sideEffects: ['Generally well tolerated'],
          price: '₹80-150'
        },
        {
          name: 'Loperamide',
          generic: 'Loperamide HCl',
          dosage: '2mg',
          frequency: 'After each loose stool',
          duration: 'Short-term use',
          sideEffects: ['Constipation', 'dizziness'],
          price: '₹30-60'
        },
        {
          name: 'Psyllium Husk',
          generic: 'Psyllium',
          dosage: '1 tsp in water',
          frequency: 'Twice daily',
          duration: 'Long-term use',
          sideEffects: ['Bloating initially'],
          price: '₹50-100'
        }
      ],
      homeRemedies: [
        'Identify and avoid trigger foods',
        'Regular exercise',
        'Stress management',
        'Adequate fiber intake',
        'Probiotics'
      ],
      doctorWarning: [
        'CHRONIC CONDITION - Requires dietary and lifestyle management',
        'Blood in stool',
        'Severe abdominal pain',
        'Unexplained weight loss',
        'Fever with symptoms'
      ]
    },

    // Respiratory Conditions
    bronchitis: {
      keywords: ['bronchitis', 'chest congestion', 'productive cough', 'phlegm', 'wheezing'],
      causes: ['Viral infection', 'Bacterial infection', 'Smoking', 'Air pollution'],
      severity: 'medium',
      medicines: [
        {
          name: 'Mucinex',
          generic: 'Guaifenesin',
          dosage: '400mg',
          frequency: 'Every 4 hours',
          duration: '7-10 days',
          sideEffects: ['Nausea', 'vomiting'],
          price: '₹100-200'
        },
        {
          name: 'Azithromycin',
          generic: 'Azithromycin',
          dosage: '500mg',
          frequency: 'Once daily',
          duration: '3-5 days',
          sideEffects: ['GI upset'],
          price: '₹100-250'
        },
        {
          name: 'Albuterol Inhaler',
          generic: 'Salbutamol',
          dosage: '2 puffs',
          frequency: 'Every 4-6 hours',
          duration: '7-10 days',
          sideEffects: ['Tremors', 'rapid heartbeat'],
          price: '₹150-300'
        }
      ],
      homeRemedies: [
        'Steam inhalation',
        'Warm fluids',
        'Honey for cough',
        'Rest and avoid smoking',
        'Humidifier use'
      ],
      doctorWarning: [
        'High fever over 101°F',
        'Blood in sputum',
        'Difficulty breathing',
        'Chest pain',
        'Symptoms worsen after 3 days'
      ]
    },

    pneumonia: {
      keywords: ['pneumonia', 'lung infection', 'difficulty breathing', 'chest pain', 'chills'],
      causes: ['Bacterial infection', 'Viral infection', 'Fungal infection', 'Aspiration'],
      severity: 'high',
      medicines: [
        {
          name: 'Amoxicillin',
          generic: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Three times daily',
          duration: '7-10 days',
          sideEffects: ['Diarrhea', 'nausea'],
          price: '₹50-120'
        },
        {
          name: 'Azithromycin',
          generic: 'Azithromycin',
          dosage: '500mg',
          frequency: 'Once daily',
          duration: '5 days',
          sideEffects: ['GI upset'],
          price: '₹100-250'
        },
        {
          name: 'Paracetamol',
          generic: 'Acetaminophen',
          dosage: '500mg',
          frequency: 'Every 6 hours',
          duration: 'For fever and pain',
          sideEffects: ['Generally safe'],
          price: '₹10-25'
        }
      ],
      homeRemedies: [
        'Complete bed rest',
        'Increase fluid intake',
        'Steam inhalation',
        'Warm compresses on chest',
        'Avoid smoking'
      ],
      doctorWarning: [
        'SERIOUS LUNG INFECTION - Immediate medical attention required',
        'Severe breathing difficulty',
        'High fever with chills',
        'Chest pain when breathing',
        'Bluish lips or fingernails'
      ]
    },

    // Gynecological Conditions
    'menstrual cramps': {
      keywords: ['menstrual cramps', 'period pain', 'dysmenorrhea', 'pms', 'menstrual pain'],
      causes: ['Uterine contractions', 'Prostaglandins', 'Hormonal changes'],
      severity: 'low',
      medicines: [
        {
          name: 'Ibuprofen',
          generic: 'Ibuprofen',
          dosage: '400mg',
          frequency: 'Every 6 hours',
          duration: '2-3 days',
          sideEffects: ['Stomach upset'],
          price: '₹15-30'
        },
        {
          name: 'Naproxen',
          generic: 'Naproxen sodium',
          dosage: '220mg',
          frequency: 'Every 8-12 hours',
          duration: '2-3 days',
          sideEffects: ['GI upset'],
          price: '₹25-50'
        },
        {
          name: 'Dicyclomine',
          generic: 'Dicyclomine HCl',
          dosage: '20mg',
          frequency: 'Three times daily',
          duration: '2-3 days',
          sideEffects: ['Dry mouth', 'dizziness'],
          price: '₹30-70'
        }
      ],
      homeRemedies: [
        'Heat therapy (hot water bottle)',
        'Regular exercise',
        'Adequate hydration',
        'Ginger tea',
        'Relaxation techniques'
      ],
      doctorWarning: [
        'Severe pain interfering with daily activities',
        'Heavy bleeding soaking pad every hour',
        'Irregular periods',
        'Pain outside menstrual period',
        'Fever with menstrual symptoms'
      ]
    },

    'urinary tract infection': {
      keywords: ['uti', 'urinary infection', 'burning urination', 'frequent urination', 'bladder infection'],
      causes: ['Bacterial infection', 'E. coli bacteria', 'Poor hygiene', 'Sexual activity'],
      severity: 'medium',
      medicines: [
        {
          name: 'Nitrofurantoin',
          generic: 'Nitrofurantoin',
          dosage: '100mg',
          frequency: 'Twice daily',
          duration: '5-7 days',
          sideEffects: ['Nausea', 'headache'],
          price: '₹80-150'
        },
        {
          name: 'Trimethoprim-Sulfamethoxazole',
          generic: 'Co-trimoxazole',
          dosage: '160mg/800mg',
          frequency: 'Twice daily',
          duration: '3-5 days',
          sideEffects: ['Rash', 'GI upset'],
          price: '₹50-100'
        },
        {
          name: 'Cranberry Extract',
          generic: 'Cranberry',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '7-10 days',
          sideEffects: ['Generally safe'],
          price: '₹200-400'
        }
      ],
      homeRemedies: [
        'Drink plenty of water',
        'Urinate frequently',
        'Cranberry juice',
        'Good hygiene practices',
        'Avoid irritating products'
      ],
      doctorWarning: [
        'Blood in urine',
        'Severe back or side pain',
        'High fever with UTI symptoms',
        'Vomiting or inability to keep fluids down',
        'Symptoms worsen or persist after 3 days'
      ]
    },

    // Orthopedic Conditions
    'joint pain': {
      keywords: ['joint pain', 'stiff joints', 'swollen joints', 'morning stiffness'],
      causes: ['Arthritis', 'Overuse', 'Injury', 'Age-related wear'],
      severity: 'medium',
      medicines: [
        {
          name: 'Diclofenac',
          generic: 'Diclofenac sodium',
          dosage: '50mg',
          frequency: 'Twice daily',
          duration: '7-10 days',
          sideEffects: ['Stomach upset'],
          price: '₹30-80'
        },
        {
          name: 'Glucosamine',
          generic: 'Glucosamine sulfate',
          dosage: '1500mg',
          frequency: 'Once daily',
          duration: 'Long-term use',
          sideEffects: ['Mild GI upset'],
          price: '₹200-500'
        },
        {
          name: 'Topical Pain Relief',
          generic: 'Menthol/Capsaicin',
          dosage: 'Apply as needed',
          frequency: '3-4 times daily',
          duration: 'As needed',
          sideEffects: ['Skin irritation'],
          price: '₹50-150'
        }
      ],
      homeRemedies: [
        'Hot/cold therapy',
        'Gentle exercise',
        'Maintain healthy weight',
        'Turmeric supplements',
        'Fish oil supplements'
      ],
      doctorWarning: [
        'Severe joint deformity',
        'Inability to use the joint',
        'Signs of infection (warmth, redness)',
        'Joint pain with fever',
        'Progressive worsening'
      ]
    },

    // Eye Conditions
    'dry eyes': {
      keywords: ['dry eyes', 'burning eyes', 'gritty feeling', 'eye irritation', 'tear production'],
      causes: ['Reduced tear production', 'Environmental factors', 'Age', 'Medications'],
      severity: 'low',
      medicines: [
        {
          name: 'Artificial Tears',
          generic: 'Polyethylene glycol',
          dosage: '1-2 drops',
          frequency: 'As needed',
          duration: 'Long-term use',
          sideEffects: ['Generally safe'],
          price: '₹50-150'
        },
        {
          name: 'Cyclosporine Eye Drops',
          generic: 'Cyclosporine',
          dosage: '1 drop',
          frequency: 'Twice daily',
          duration: 'As prescribed',
          sideEffects: ['Burning sensation initially'],
          price: '₹800-1500'
        },
        {
          name: 'Omega-3 Supplements',
          generic: 'Fish oil',
          dosage: '1000mg',
          frequency: 'Once daily',
          duration: 'Long-term use',
          sideEffects: ['Fishy aftertaste'],
          price: '₹300-600'
        }
      ],
      homeRemedies: [
        'Use humidifier',
        'Take breaks from screen time',
        'Blink more frequently',
        'Protect eyes from wind',
        'Stay hydrated'
      ],
      doctorWarning: [
        'Severe eye pain',
        'Vision changes',
        'Eye discharge or infection',
        'Symptoms worsen despite treatment',
        'Associated with autoimmune conditions'
      ]
    },

    // Neurological Conditions
    'anxiety': {
      keywords: ['anxiety', 'worry', 'panic', 'restlessness', 'nervous', 'panic attack'],
      causes: ['Stress', 'Genetic factors', 'Brain chemistry', 'Trauma', 'Medical conditions'],
      severity: 'medium',
      medicines: [
        {
          name: 'Lorazepam',
          generic: 'Lorazepam',
          dosage: '0.5mg',
          frequency: 'As needed',
          duration: 'Short-term use',
          sideEffects: ['Drowsiness', 'dependence risk'],
          price: '₹50-100'
        },
        {
          name: 'Sertraline',
          generic: 'Sertraline HCl',
          dosage: '50mg',
          frequency: 'Once daily',
          duration: 'Long-term',
          sideEffects: ['Nausea', 'sexual side effects'],
          price: '₹100-250'
        },
        {
          name: 'Ashwagandha',
          generic: 'Natural supplement',
          dosage: '300mg',
          frequency: 'Twice daily',
          duration: 'Long-term use',
          sideEffects: ['Generally safe'],
          price: '₹200-400'
        }
      ],
      homeRemedies: [
        'Deep breathing exercises',
        'Regular exercise',
        'Meditation',
        'Limit caffeine',
        'Adequate sleep'
      ],
      doctorWarning: [
        'MENTAL HEALTH CONDITION - Professional counseling recommended',
        'Suicidal thoughts',
        'Panic attacks interfering with life',
        'Unable to function normally',
        'Substance abuse as coping mechanism'
      ]
    },

    'insomnia': {
      keywords: ['insomnia', 'sleeplessness', 'trouble sleeping', 'sleep problems', 'waking up'],
      causes: ['Stress', 'Anxiety', 'Depression', 'Medical conditions', 'Medications'],
      severity: 'medium',
      medicines: [
        {
          name: 'Melatonin',
          generic: 'Melatonin',
          dosage: '3mg',
          frequency: '30 minutes before bedtime',
          duration: 'Short-term use',
          sideEffects: ['Daytime drowsiness'],
          price: '₹200-400'
        },
        {
          name: 'Zolpidem',
          generic: 'Zolpidem tartrate',
          dosage: '5mg',
          frequency: 'At bedtime',
          duration: 'Short-term use',
          sideEffects: ['Dependence risk', 'memory problems'],
          price: '₹100-250'
        },
        {
          name: 'Valerian Root',
          generic: 'Natural supplement',
          dosage: '300mg',
          frequency: 'Before bedtime',
          duration: 'Short-term use',
          sideEffects: ['Generally safe'],
          price: '₹300-500'
        }
      ],
      homeRemedies: [
        'Regular sleep schedule',
        'Dark, cool bedroom',
        'Avoid screens before bed',
        'Relaxation techniques',
        'No caffeine after 2 PM'
      ],
      doctorWarning: [
        'Chronic insomnia lasting weeks',
        'Severe daytime impairment',
        'Associated with depression',
        'Sleep apnea symptoms',
        'Multiple medication dependencies'
      ]
    },

    // Pediatric Conditions
    'child fever': {
      keywords: ['child fever', 'baby fever', 'infant fever', 'toddler fever', 'pediatric fever'],
      causes: ['Viral infection', 'Bacterial infection', 'Vaccination reaction', 'Teething'],
      severity: 'medium',
      medicines: [
        {
          name: 'Pediatric Paracetamol',
          generic: 'Paracetamol suspension',
          dosage: '15mg/kg body weight',
          frequency: 'Every 6 hours',
          duration: '3-5 days',
          sideEffects: ['Generally safe when dosed correctly'],
          price: '₹30-60'
        },
        {
          name: 'Ibuprofen (6+ months)',
          generic: 'Ibuprofen suspension',
          dosage: '10mg/kg body weight',
          frequency: 'Every 8 hours',
          duration: '3-5 days',
          sideEffects: ['Stomach upset'],
          price: '₹40-80'
        },
        {
          name: 'ORS for children',
          generic: 'Pediatric ORS',
          dosage: 'As per packet instructions',
          frequency: 'Every 2-3 hours',
          duration: 'Until recovery',
          sideEffects: ['Generally safe'],
          price: '₹10-20'
        }
      ],
      homeRemedies: [
        'Sponge bath with lukewarm water',
        'Light clothing',
        'Increase fluid intake',
        'Room temperature control',
        'Monitor temperature regularly'
      ],
      doctorWarning: [
        'PEDIATRIC EMERGENCY - Immediate attention for infants under 3 months',
        'Temperature above 102°F in children',
        'Difficulty breathing or rapid breathing',
        'Persistent vomiting or dehydration',
        'Unusual drowsiness or irritability'
      ]
    },

    diarrhea: {
      keywords: ['diarrhea', 'loose stools', 'watery stools', 'frequent bowel movements', 'gastroenteritis'],
      causes: ['Viral infection', 'Bacterial infection', 'Food poisoning', 'Stress', 'Medications'],
      severity: 'medium',
      medicines: [
        {
          name: 'ORS',
          generic: 'Oral Rehydration Solution',
          dosage: '1 sachet in 200ml water',
          frequency: 'After each loose stool',
          duration: 'Until recovery',
          sideEffects: ['Generally safe'],
          price: '₹5-15'
        },
        {
          name: 'Loperamide',
          generic: 'Loperamide HCl',
          dosage: '2mg',
          frequency: 'After each loose stool',
          duration: 'Maximum 2 days',
          sideEffects: ['Constipation', 'dizziness'],
          price: '₹30-60'
        },
        {
          name: 'Probiotics',
          generic: 'Lactobacillus',
          dosage: '1 capsule',
          frequency: 'Twice daily',
          duration: '5-7 days',
          sideEffects: ['Generally safe'],
          price: '₹100-300'
        }
      ],
      homeRemedies: [
        'BRAT diet (Bananas, Rice, Applesauce, Toast)',
        'Clear fluids',
        'Avoid dairy temporarily',
        'Rest',
        'Coconut water'
      ],
      doctorWarning: [
        'Blood in stool',
        'High fever with diarrhea',
        'Severe dehydration',
        'Persistent vomiting',
        'Symptoms lasting more than 48 hours'
      ]
    },

    // ENT Conditions
    'ear infection': {
      keywords: ['ear infection', 'ear pain', 'hearing loss', 'ear discharge', 'otitis'],
      causes: ['Bacterial infection', 'Viral infection', 'Water trapped in ear', 'Allergies'],
      severity: 'medium',
      medicines: [
        {
          name: 'Amoxicillin',
          generic: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Three times daily',
          duration: '7-10 days',
          sideEffects: ['Diarrhea', 'nausea'],
          price: '₹50-120'
        },
        {
          name: 'Ear Drops',
          generic: 'Antibiotic/Steroid combination',
          dosage: '2-3 drops',
          frequency: 'Three times daily',
          duration: '7-10 days',
          sideEffects: ['Local irritation'],
          price: '₹80-200'
        },
        {
          name: 'Ibuprofen',
          generic: 'Ibuprofen',
          dosage: '400mg',
          frequency: 'Every 8 hours',
          duration: '3-5 days',
          sideEffects: ['Stomach upset'],
          price: '₹15-30'
        }
      ],
      homeRemedies: [
        'Warm compress on ear',
        'Keep ear dry',
        'Avoid inserting objects in ear',
        'Sleep with affected ear up',
        'Pain relief with heat'
      ],
      doctorWarning: [
        'Severe ear pain',
        'High fever with ear pain',
        'Hearing loss',
        'Discharge from ear',
        'Symptoms worsen after 48 hours'
      ]
    },

    sinusitis: {
      keywords: ['sinusitis', 'sinus infection', 'facial pain', 'nasal congestion', 'post nasal drip'],
      causes: ['Viral infection', 'Bacterial infection', 'Allergies', 'Nasal polyps'],
      severity: 'medium',
      medicines: [
        {
          name: 'Nasal Decongestant',
          generic: 'Oxymetazoline',
          dosage: '2-3 sprays per nostril',
          frequency: 'Twice daily',
          duration: 'Maximum 3 days',
          sideEffects: ['Rebound congestion'],
          price: '₹100-200'
        },
        {
          name: 'Amoxicillin-Clavulanate',
          generic: 'Amoxicillin/Clavulanic acid',
          dosage: '625mg',
          frequency: 'Twice daily',
          duration: '10-14 days',
          sideEffects: ['Diarrhea', 'nausea'],
          price: '₹150-300'
        },
        {
          name: 'Steroid Nasal Spray',
          generic: 'Fluticasone',
          dosage: '2 sprays per nostril',
          frequency: 'Once daily',
          duration: '2-4 weeks',
          sideEffects: ['Nasal dryness'],
          price: '₹300-600'
        }
      ],
      homeRemedies: [
        'Steam inhalation',
        'Saline nasal rinse',
        'Warm compresses on face',
        'Stay hydrated',
        'Sleep with head elevated'
      ],
      doctorWarning: [
        'Severe facial pain',
        'High fever',
        'Visual changes',
        'Severe headache',
        'Symptoms persist beyond 10 days'
      ]
    },

    // Cardiovascular Additional
    'high cholesterol': {
      keywords: ['high cholesterol', 'ldl', 'hdl', 'triglycerides', 'lipid profile'],
      causes: ['Diet high in saturated fats', 'Genetics', 'Lack of exercise', 'Obesity'],
      severity: 'medium',
      medicines: [
        {
          name: 'Atorvastatin',
          generic: 'Atorvastatin calcium',
          dosage: '20mg',
          frequency: 'Once daily at bedtime',
          duration: 'Long-term',
          sideEffects: ['Muscle pain', 'liver enzyme elevation'],
          price: '₹80-200'
        },
        {
          name: 'Rosuvastatin',
          generic: 'Rosuvastatin',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: 'Long-term',
          sideEffects: ['Similar to atorvastatin'],
          price: '₹150-350'
        },
        {
          name: 'Omega-3',
          generic: 'Fish oil supplements',
          dosage: '1000mg',
          frequency: 'Once daily',
          duration: 'Long-term',
          sideEffects: ['Fishy aftertaste'],
          price: '₹300-600'
        }
      ],
      homeRemedies: [
        'Low saturated fat diet',
        'Regular exercise',
        'Increase soluble fiber',
        'Oats and barley',
        'Nuts and seeds'
      ],
      doctorWarning: [
        'CHRONIC CONDITION - Regular lipid monitoring required',
        'Family history of heart disease',
        'Diabetes with high cholesterol',
        'Chest pain or heart symptoms',
        'LDL above 190 mg/dL'
      ]
    },

    // Kidney/Urological Additional
    'kidney stones': {
      keywords: ['kidney stones', 'renal calculi', 'flank pain', 'blood in urine', 'stone pain'],
      causes: ['Dehydration', 'High calcium/oxalate intake', 'Genetics', 'Certain medications'],
      severity: 'high',
      medicines: [
        {
          name: 'Tamsulosin',
          generic: 'Tamsulosin HCl',
          dosage: '0.4mg',
          frequency: 'Once daily',
          duration: 'Until stone passes',
          sideEffects: ['Dizziness', 'decreased semen'],
          price: '₹150-300'
        },
        {
          name: 'Diclofenac',
          generic: 'Diclofenac sodium',
          dosage: '50mg',
          frequency: 'Three times daily',
          duration: 'For pain',
          sideEffects: ['Stomach upset'],
          price: '₹30-80'
        },
        {
          name: 'Potassium Citrate',
          generic: 'Potassium citrate',
          dosage: '1080mg',
          frequency: 'Twice daily',
          duration: 'Prevention long-term',
          sideEffects: ['GI upset'],
          price: '₹200-400'
        }
      ],
      homeRemedies: [
        'Drink 3-4 liters water daily',
        'Lemon water',
        'Reduce sodium intake',
        'Limit oxalate-rich foods',
        'Regular physical activity'
      ],
      doctorWarning: [
        'ACUTE MEDICAL CONDITION - May require urgent intervention',
        'Severe flank pain',
        'Blood in urine',
        'Nausea and vomiting',
        'Fever with stone symptoms'
      ]
    },

    // Endocrine Additional
    'osteoporosis': {
      keywords: ['osteoporosis', 'bone density', 'fractures', 'bone loss', 'brittle bones'],
      causes: ['Aging', 'Hormonal changes', 'Calcium deficiency', 'Lack of exercise'],
      severity: 'medium',
      medicines: [
        {
          name: 'Calcium + Vitamin D',
          generic: 'Calcium carbonate/Vitamin D3',
          dosage: '500mg/400IU',
          frequency: 'Twice daily',
          duration: 'Long-term',
          sideEffects: ['Constipation', 'kidney stones'],
          price: '₹100-250'
        },
        {
          name: 'Alendronate',
          generic: 'Alendronic acid',
          dosage: '70mg',
          frequency: 'Once weekly',
          duration: 'Long-term',
          sideEffects: ['Esophageal irritation'],
          price: '₹300-600'
        },
        {
          name: 'Calcitriol',
          generic: 'Active Vitamin D',
          dosage: '0.25mcg',
          frequency: 'Twice daily',
          duration: 'As prescribed',
          sideEffects: ['Hypercalcemia risk'],
          price: '₹150-350'
        }
      ],
      homeRemedies: [
        'Weight-bearing exercises',
        'Calcium-rich foods',
        'Vitamin D from sunlight',
        'Avoid smoking and alcohol',
        'Fall prevention measures'
      ],
      doctorWarning: [
        'CHRONIC CONDITION - Regular bone density monitoring',
        'Fracture with minimal trauma',
        'Height loss',
        'Severe back pain',
        'Family history of osteoporosis'
      ]
    },

    arthritis: {
      keywords: ['arthritis', 'joint pain', 'stiff joints', 'swollen joints', 'rheumatoid', 'osteoarthritis'],
      causes: ['Osteoarthritis', 'Rheumatoid arthritis', 'Gouty arthritis', 'Age-related wear'],
      severity: 'medium',
      medicines: [
        {
          name: 'Diclofenac',
          generic: 'Diclofenac sodium',
          dosage: '50mg',
          frequency: 'Twice daily',
          duration: 'As prescribed',
          sideEffects: ['Stomach upset', 'kidney issues'],
          price: '₹30-80'
        },
        {
          name: 'Glucosamine',
          generic: 'Glucosamine sulfate',
          dosage: '1500mg',
          frequency: 'Once daily',
          duration: 'Long-term',
          sideEffects: ['Generally safe', 'mild GI upset'],
          price: '₹200-500'
        },
        {
          name: 'Methotrexate',
          generic: 'Methotrexate',
          dosage: 'As per rheumatologist',
          frequency: 'Weekly',
          duration: 'Ongoing monitoring',
          sideEffects: ['Requires regular monitoring'],
          price: '₹100-300'
        }
      ],
      homeRemedies: [
        'Hot/cold compress',
        'Regular gentle exercise',
        'Turmeric',
        'Ginger tea',
        'Maintain healthy weight'
      ],
      doctorWarning: [
        'CHRONIC CONDITION - Joint damage is progressive',
        'Early treatment important',
        'Regular monitoring if on medications',
        'Physical therapy may be beneficial',
        'Severe joint deformity or loss of function'
      ]
    },

    depression: {
      keywords: ['depression', 'sad', 'hopeless', 'anxiety', 'mood disorder', 'mental health'],
      causes: ['Major depressive disorder', 'Anxiety disorder', 'Bipolar disorder', 'Seasonal depression', 'Hormonal changes'],
      severity: 'high',
      medicines: [
        {
          name: 'Sertraline',
          generic: 'Sertraline HCl',
          dosage: '50mg',
          frequency: 'Once daily',
          duration: 'Ongoing as prescribed',
          sideEffects: ['Nausea', 'sexual side effects', 'sleep changes'],
          price: '₹100-250'
        },
        {
          name: 'Escitalopram',
          generic: 'Escitalopram',
          dosage: '10-20mg',
          frequency: 'Once daily',
          duration: 'Ongoing as prescribed',
          sideEffects: ['Similar to sertraline'],
          price: '₹150-300'
        },
        {
          name: 'Bupropion',
          generic: 'Bupropion',
          dosage: '150mg',
          frequency: 'Twice daily',
          duration: 'Ongoing as prescribed',
          sideEffects: ['Dry mouth', 'insomnia'],
          price: '₹200-400'
        }
      ],
      homeRemedies: [
        'Regular exercise',
        'Meditation',
        'Social support',
        'Adequate sleep',
        'Sunlight exposure',
        'Healthy diet'
      ],
      doctorWarning: [
        'MENTAL HEALTH CONDITION - Requires psychiatric evaluation',
        'Therapy along with medication',
        'Suicidal thoughts - emergency care',
        'Regular follow-up essential',
        'Support system important'
      ]
    },

    thyroid: {
      keywords: ['thyroid', 'hypothyroid', 'hyperthyroid', 'goiter', 'thyroid gland'],
      causes: ['Hypothyroidism', 'Hyperthyroidism', 'Thyroid nodules', 'Goiter', 'Autoimmune thyroid disease'],
      severity: 'medium',
      medicines: [
        {
          name: 'Levothyroxine',
          generic: 'Levothyroxine sodium',
          dosage: '25-100mcg',
          frequency: 'Once daily',
          duration: 'Ongoing as prescribed',
          sideEffects: ['Heart palpitations if overdosed'],
          price: '₹50-150'
        },
        {
          name: 'Carbimazole',
          generic: 'Carbimazole',
          dosage: '5-15mg',
          frequency: 'Once daily',
          duration: 'As prescribed',
          sideEffects: ['Skin rash', 'liver issues'],
          price: '₹80-200'
        },
        {
          name: 'Propranolol',
          generic: 'Propranolol',
          dosage: '20-40mg',
          frequency: 'Twice daily',
          duration: 'As prescribed',
          sideEffects: ['Fatigue', 'cold hands'],
          price: '₹20-60'
        }
      ],
      homeRemedies: [
        'Iodine-rich foods (for hypo)',
        'Avoid soy products',
        'Selenium-rich foods',
        'Regular exercise',
        'Stress management'
      ],
      doctorWarning: [
        'CHRONIC CONDITION - Requires regular thyroid function monitoring',
        'Dose adjustments needed based on lab results',
        'Take medication on empty stomach',
        'Annual monitoring essential',
        'Pregnancy requires dose adjustments'
      ]
    },

    'back pain': {
      keywords: ['back pain', 'backache', 'spine pain', 'lower back', 'upper back', 'sciatica'],
      causes: ['Muscle strain', 'Herniated disc', 'Sciatica', 'Arthritis', 'Osteoporosis', 'Poor posture'],
      severity: 'medium',
      medicines: [
        {
          name: 'Ibuprofen',
          generic: 'Ibuprofen',
          dosage: '400mg',
          frequency: 'Every 8 hours',
          duration: '5-7 days',
          sideEffects: ['Stomach irritation'],
          price: '₹15-30'
        },
        {
          name: 'Diclofenac gel',
          generic: 'Diclofenac',
          dosage: 'Apply locally',
          frequency: '3-4 times daily',
          duration: '7-10 days',
          sideEffects: ['Skin irritation'],
          price: '₹40-80'
        },
        {
          name: 'Muscle relaxant',
          generic: 'Cyclobenzaprine',
          dosage: '10mg',
          frequency: 'At bedtime',
          duration: '5-7 days',
          sideEffects: ['Drowsiness', 'dry mouth'],
          price: '₹50-120'
        }
      ],
      homeRemedies: [
        'Hot/cold compress',
        'Gentle stretching',
        'Proper posture',
        'Ergonomic support',
        'Regular exercise'
      ],
      doctorWarning: [
        'Severe pain with numbness or weakness',
        'Bowel/bladder problems',
        'Pain after injury or fall',
        'Progressive weakness in legs',
        'Pain persists beyond 2 weeks'
      ]
    },

    migraine: {
      keywords: ['migraine', 'severe headache', 'throbbing headache', 'light sensitivity', 'nausea with headache'],
      causes: ['Hormonal changes', 'Stress', 'Food triggers', 'Light sensitivity', 'Genetic factors'],
      severity: 'medium',
      medicines: [
        {
          name: 'Sumatriptan',
          generic: 'Sumatriptan',
          dosage: '50-100mg',
          frequency: 'At onset of migraine',
          duration: 'As needed',
          sideEffects: ['Chest tightness', 'dizziness'],
          price: '₹150-300'
        },
        {
          name: 'Rizatriptan',
          generic: 'Rizatriptan',
          dosage: '10mg',
          frequency: 'At onset of migraine',
          duration: 'As needed',
          sideEffects: ['Similar to sumatriptan'],
          price: '₹200-400'
        },
        {
          name: 'Propranolol',
          generic: 'Propranolol',
          dosage: '40mg',
          frequency: 'Twice daily (prevention)',
          duration: 'As prescribed',
          sideEffects: ['Fatigue', 'cold hands'],
          price: '₹20-60'
        }
      ],
      homeRemedies: [
        'Dark, quiet room',
        'Cold compress',
        'Hydration',
        'Regular sleep',
        'Avoid triggers',
        'Magnesium supplement'
      ],
      doctorWarning: [
        'Sudden, severe headache',
        'Headache with fever, stiff neck, confusion',
        'Change in headache pattern',
        'Headache after head injury',
        'Visual changes or weakness'
      ]
    }
  };

  static analyzeSymptoms(userInput: string, location?: string): any {
    const normalizedInput = userInput.toLowerCase();
    
    // Find matching symptoms
    const matchedSymptoms = [];
    let highestSeverity = 'low';
    
    for (const [symptom, data] of Object.entries(this.symptomDatabase)) {
      const hasKeyword = data.keywords.some(keyword => 
        normalizedInput.includes(keyword.toLowerCase())
      );
      
      if (hasKeyword) {
        matchedSymptoms.push({ symptom, data });
        if (data.severity === 'high') highestSeverity = 'high';
        else if (data.severity === 'medium' && highestSeverity !== 'high') {
          highestSeverity = 'medium';
        }
      }
    }

    // If no specific symptoms matched, provide general advice
    if (matchedSymptoms.length === 0) {
      return this.getGeneralAdvice();
    }

    // Combine information from matched symptoms
    const allCauses = new Set();
    const allMedicines = [];
    const allRemedies = new Set();
    const allWarnings = new Set();

    matchedSymptoms.forEach(({ data }) => {
      data.causes.forEach(cause => allCauses.add(cause));
      allMedicines.push(...data.medicines);
      data.homeRemedies.forEach(remedy => allRemedies.add(remedy));
      data.doctorWarning.forEach(warning => allWarnings.add(warning));
    });

    // Remove duplicate medicines
    const uniqueMedicines = allMedicines.filter((medicine, index, self) =>
      index === self.findIndex(m => m.name === medicine.name)
    );

    return {
      possibleCauses: Array.from(allCauses),
      severity: highestSeverity,
      recommendations: {
        medicines: uniqueMedicines.slice(0, 3), // Limit to top 3 recommendations
        homeRemedies: Array.from(allRemedies),
        whenToSeeDoctor: Array.from(allWarnings)
      },
      location: location,
      disclaimer: "This analysis is for informational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for accurate diagnosis and treatment."
    };
  }

  private static getGeneralAdvice() {
    return {
      possibleCauses: [
        'Symptoms may be related to various common conditions',
        'Could be stress-related or environmental factors',
        'May require professional evaluation for accurate diagnosis'
      ],
      severity: 'medium',
      recommendations: {
        medicines: [
          {
            name: 'General Pain Relief',
            generic: 'Acetaminophen/Ibuprofen',
            dosage: 'As directed on package',
            frequency: 'As needed',
            duration: 'Short-term use',
            sideEffects: ['Follow package warnings'],
            price: '$5-15'
          }
        ],
        homeRemedies: [
          'Get adequate rest and sleep',
          'Stay well hydrated',
          'Maintain a balanced diet',
          'Practice stress management techniques',
          'Monitor symptoms and note any changes'
        ],
        whenToSeeDoctor: [
          'Symptoms persist or worsen',
          'New or concerning symptoms develop',
          'You have underlying health conditions',
          'Symptoms interfere with daily activities',
          'You are unsure about the severity'
        ]
      },
      disclaimer: "Without specific symptom information, this general advice is provided. For accurate diagnosis and treatment, please describe your symptoms in more detail or consult a healthcare professional."
    };
  }
}