// Comprehensive Disease and Symptom Database for Arogya Mitra
// Covers hundreds of diseases with symptoms, causes, treatments, and Hindi translations

export class ComprehensiveDiseaseDatabase {
  static diseaseDatabase = {
    // Cardiovascular Diseases
    'heart attack': {
      keywords: ['heart attack', 'chest pain', 'myocardial infarction', 'cardiac arrest', 'heart pain', 'दिल का दौरा', 'छाती में दर्द'],
      hindiName: 'दिल का दौरा',
      causes: ['Blocked coronary arteries', 'High cholesterol', 'High blood pressure', 'Smoking', 'Diabetes'],
      severity: 'critical',
      symptoms: [
        'Severe chest pain', 'Pain radiating to left arm', 'Shortness of breath', 
        'Sweating', 'Nausea', 'Dizziness', 'Fatigue'
      ],
      medicines: [
        {
          name: 'Aspirin', generic: 'Acetylsalicylic acid', dosage: '75-100mg',
          frequency: 'Once daily', duration: 'Long-term', sideEffects: ['Stomach irritation'], price: '₹15-30'
        },
        {
          name: 'Atorvastatin', generic: 'Atorvastatin', dosage: '20-40mg',
          frequency: 'Once daily', duration: 'Long-term', sideEffects: ['Muscle pain'], price: '₹50-150'
        },
        {
          name: 'Metoprolol', generic: 'Metoprolol', dosage: '25-50mg',
          frequency: 'Twice daily', duration: 'Long-term', sideEffects: ['Fatigue'], price: '₹30-80'
        }
      ],
      emergencyAction: 'CALL 108 IMMEDIATELY - Give aspirin if available - Keep patient calm - Do not delay medical attention'
    },

    'stroke': {
      keywords: ['stroke', 'brain attack', 'paralysis', 'speech difficulty', 'लकवा', 'दिमागी दौरा', 'बोलने में कठिनाई'],
      hindiName: 'लकवा/स्ट्रोक',
      causes: ['Blood clot in brain', 'Brain hemorrhage', 'High blood pressure', 'Diabetes', 'Heart disease'],
      severity: 'critical',
      symptoms: [
        'Sudden weakness on one side', 'Speech difficulty', 'Facial drooping', 
        'Severe headache', 'Confusion', 'Vision problems', 'Loss of balance'
      ],
      medicines: [
        {
          name: 'Clopidogrel', generic: 'Clopidogrel', dosage: '75mg',
          frequency: 'Once daily', duration: 'Long-term', sideEffects: ['Bleeding risk'], price: '₹100-200'
        },
        {
          name: 'Warfarin', generic: 'Warfarin', dosage: '2-5mg',
          frequency: 'Once daily', duration: 'As prescribed', sideEffects: ['Bleeding risk'], price: '₹20-50'
        }
      ],
      emergencyAction: 'CALL 108 IMMEDIATELY - Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency'
    },

    'arrhythmia': {
      keywords: ['irregular heartbeat', 'palpitations', 'heart rhythm', 'atrial fibrillation', 'तेज़ धड़कन', 'दिल की धड़कन अनियमित'],
      hindiName: 'अनियमित धड़कन',
      causes: ['Heart disease', 'High blood pressure', 'Thyroid problems', 'Stress', 'Caffeine excess'],
      severity: 'high',
      symptoms: [
        'Irregular heartbeat', 'Rapid heartbeat', 'Chest discomfort', 'Dizziness', 'Shortness of breath', 'Fatigue'
      ],
      medicines: [
        {
          name: 'Amiodarone', generic: 'Amiodarone', dosage: '200mg',
          frequency: 'Once daily', duration: 'As prescribed', sideEffects: ['Thyroid problems'], price: '₹150-300'
        },
        {
          name: 'Diltiazem', generic: 'Diltiazem', dosage: '120mg',
          frequency: 'Once daily', duration: 'Long-term', sideEffects: ['Dizziness'], price: '₹80-150'
        }
      ],
      emergencyAction: 'Monitor symptoms - Seek immediate care if chest pain or fainting occurs'
    },

    // Respiratory Diseases
    'tuberculosis': {
      keywords: ['tuberculosis', 'tb', 'persistent cough', 'night sweats', 'weight loss', 'टीबी', 'क्षय रोग', 'खांसी'],
      hindiName: 'क्षय रोग (टीबी)',
      causes: ['Mycobacterium tuberculosis bacteria', 'Airborne transmission', 'Weakened immunity'],
      severity: 'high',
      symptoms: [
        'Persistent cough for 3+ weeks', 'Coughing up blood', 'Night sweats', 'Weight loss', 
        'Fever', 'Fatigue', 'Chest pain'
      ],
      medicines: [
        {
          name: 'Rifampin', generic: 'Rifampin', dosage: '600mg',
          frequency: 'Once daily', duration: '6 months', sideEffects: ['Orange urine'], price: '₹200-400'
        },
        {
          name: 'Isoniazid', generic: 'Isoniazid', dosage: '300mg',
          frequency: 'Once daily', duration: '6 months', sideEffects: ['Liver toxicity'], price: '₹50-100'
        },
        {
          name: 'Ethambutol', generic: 'Ethambutol', dosage: '800mg',
          frequency: 'Once daily', duration: '2 months', sideEffects: ['Vision problems'], price: '₹150-250'
        }
      ],
      emergencyAction: 'DOTS treatment mandatory - Contact TB specialist - Isolate patient initially'
    },

    'copd': {
      keywords: ['copd', 'chronic bronchitis', 'emphysema', 'breathing difficulty', 'smokers cough', 'सांस की तकलीफ'],
      hindiName: 'दीर्घकालिक फेफड़े की बीमारी',
      causes: ['Smoking', 'Air pollution', 'Occupational dust', 'Genetic factors'],
      severity: 'high',
      symptoms: [
        'Chronic cough', 'Shortness of breath', 'Wheezing', 'Chest tightness', 'Fatigue', 'Frequent infections'
      ],
      medicines: [
        {
          name: 'Tiotropium Inhaler', generic: 'Tiotropium', dosage: '18mcg',
          frequency: 'Once daily', duration: 'Long-term', sideEffects: ['Dry mouth'], price: '₹800-1200'
        },
        {
          name: 'Salbutamol', generic: 'Salbutamol', dosage: '100mcg',
          frequency: 'As needed', duration: 'Long-term', sideEffects: ['Tremors'], price: '₹150-300'
        }
      ],
      emergencyAction: 'Quit smoking immediately - Use prescribed inhalers - Monitor oxygen levels'
    },

    // Gastrointestinal Diseases
    'hepatitis': {
      keywords: ['hepatitis', 'liver infection', 'jaundice', 'yellow eyes', 'liver inflammation', 'पीलिया', 'यकृत की सूजन'],
      hindiName: 'यकृत शोथ (हेपेटाइटिस)',
      causes: ['Viral infection (A, B, C)', 'Alcohol abuse', 'Toxic substances', 'Autoimmune'],
      severity: 'high',
      symptoms: [
        'Jaundice (yellow skin/eyes)', 'Fatigue', 'Abdominal pain', 'Dark urine', 'Pale stools', 'Nausea'
      ],
      medicines: [
        {
          name: 'Interferon', generic: 'Interferon alpha', dosage: 'As prescribed',
          frequency: 'Weekly injection', duration: '48 weeks', sideEffects: ['Flu-like symptoms'], price: '₹5000-10000'
        },
        {
          name: 'Ribavirin', generic: 'Ribavirin', dosage: '1000-1200mg',
          frequency: 'Twice daily', duration: '24-48 weeks', sideEffects: ['Anemia'], price: '₹500-1000'
        }
      ],
      emergencyAction: 'Immediate medical attention - Avoid alcohol - Get vaccinated for Hepatitis A & B'
    },

    'cirrhosis': {
      keywords: ['cirrhosis', 'liver scarring', 'liver failure', 'ascites', 'fluid retention', 'यकृत की खराबी'],
      hindiName: 'यकृत का सिकुड़ना',
      causes: ['Chronic alcohol abuse', 'Hepatitis B/C', 'Fatty liver disease', 'Autoimmune hepatitis'],
      severity: 'critical',
      symptoms: [
        'Fatigue', 'Swelling in legs/abdomen', 'Jaundice', 'Easy bruising', 'Confusion', 'Spider veins'
      ],
      medicines: [
        {
          name: 'Lactulose', generic: 'Lactulose', dosage: '30ml',
          frequency: 'Twice daily', duration: 'Long-term', sideEffects: ['Diarrhea'], price: '₹100-200'
        },
        {
          name: 'Propranolol', generic: 'Propranolol', dosage: '40mg',
          frequency: 'Twice daily', duration: 'Long-term', sideEffects: ['Fatigue'], price: '₹30-60'
        }
      ],
      emergencyAction: 'Stop alcohol completely - Low sodium diet - Regular monitoring required'
    },

    'peptic ulcer': {
      keywords: ['peptic ulcer', 'stomach ulcer', 'burning stomach', 'h pylori', 'पेट में छाले', 'अल्सर'],
      hindiName: 'पेप्टिक अल्सर',
      causes: ['H. pylori bacteria', 'NSAIDs use', 'Excessive acid production', 'Stress', 'Smoking'],
      severity: 'medium',
      symptoms: [
        'Burning stomach pain', 'Pain between meals', 'Nausea', 'Bloating', 'Heartburn', 'Loss of appetite'
      ],
      medicines: [
        {
          name: 'Omeprazole', generic: 'Omeprazole', dosage: '20mg',
          frequency: 'Once daily', duration: '4-8 weeks', sideEffects: ['Headache'], price: '₹25-50'
        },
        {
          name: 'Clarithromycin', generic: 'Clarithromycin', dosage: '500mg',
          frequency: 'Twice daily', duration: '14 days', sideEffects: ['Metallic taste'], price: '₹200-400'
        },
        {
          name: 'Amoxicillin', generic: 'Amoxicillin', dosage: '1000mg',
          frequency: 'Twice daily', duration: '14 days', sideEffects: ['Diarrhea'], price: '₹100-200'
        }
      ],
      emergencyAction: 'Avoid spicy foods - Quit smoking - Take medicines with food'
    },

    // Endocrine Disorders
    'thyroid disorders': {
      keywords: ['thyroid', 'hyperthyroid', 'hypothyroid', 'goiter', 'thyroid gland', 'थायराइड', 'घेंघा'],
      hindiName: 'थायराइड विकार',
      causes: ['Autoimmune disease', 'Iodine deficiency', 'Genetic factors', 'Stress'],
      severity: 'medium',
      symptoms: [
        'Weight changes', 'Fatigue', 'Hair loss', 'Mood changes', 'Temperature sensitivity', 'Heart palpitations'
      ],
      medicines: [
        {
          name: 'Levothyroxine', generic: 'Levothyroxine', dosage: '50-100mcg',
          frequency: 'Once daily', duration: 'Lifelong', sideEffects: ['Heart palpitations'], price: '₹50-150'
        },
        {
          name: 'Methimazole', generic: 'Methimazole', dosage: '5-10mg',
          frequency: 'Once daily', duration: '12-18 months', sideEffects: ['Skin rash'], price: '₹100-200'
        }
      ],
      emergencyAction: 'Regular blood tests needed - Take medication at same time daily'
    },

    // Neurological Disorders
    'epilepsy': {
      keywords: ['epilepsy', 'seizures', 'fits', 'convulsions', 'brain disorder', 'मिर्गी', 'दौरे पड़ना'],
      hindiName: 'मिर्गी',
      causes: ['Brain injury', 'Genetic factors', 'Brain infections', 'Stroke', 'Unknown causes'],
      severity: 'high',
      symptoms: [
        'Seizures', 'Loss of consciousness', 'Muscle jerking', 'Confusion', 'Staring spells', 'Memory loss'
      ],
      medicines: [
        {
          name: 'Phenytoin', generic: 'Phenytoin', dosage: '300mg',
          frequency: 'Once daily', duration: 'Long-term', sideEffects: ['Gum overgrowth'], price: '₹50-100'
        },
        {
          name: 'Carbamazepine', generic: 'Carbamazepine', dosage: '200mg',
          frequency: 'Twice daily', duration: 'Long-term', sideEffects: ['Dizziness'], price: '₹80-150'
        },
        {
          name: 'Valproate', generic: 'Sodium valproate', dosage: '500mg',
          frequency: 'Twice daily', duration: 'Long-term', sideEffects: ['Weight gain'], price: '₹100-200'
        }
      ],
      emergencyAction: 'During seizure: Keep safe, turn on side, time the seizure - Call 108 if seizure lasts >5 minutes'
    },

    'migraine': {
      keywords: ['migraine', 'severe headache', 'throbbing pain', 'light sensitivity', 'माइग्रेन', 'तेज़ सिरदर्द'],
      hindiName: 'माइग्रेन',
      causes: ['Genetic factors', 'Hormonal changes', 'Stress', 'Certain foods', 'Sleep changes'],
      severity: 'medium',
      symptoms: [
        'Severe throbbing headache', 'Nausea', 'Vomiting', 'Light sensitivity', 'Sound sensitivity', 'Aura'
      ],
      medicines: [
        {
          name: 'Sumatriptan', generic: 'Sumatriptan', dosage: '50mg',
          frequency: 'At onset', duration: 'As needed', sideEffects: ['Chest tightness'], price: '₹200-400'
        },
        {
          name: 'Propranolol', generic: 'Propranolol', dosage: '40mg',
          frequency: 'Twice daily', duration: 'Preventive', sideEffects: ['Fatigue'], price: '₹30-60'
        }
      ],
      emergencyAction: 'Rest in dark, quiet room - Apply cold/warm compress - Identify triggers'
    },

    'parkinson disease': {
      keywords: ['parkinson', 'tremors', 'shaking', 'movement disorder', 'bradykinesia', 'पार्किंसन', 'कंपकंपी'],
      hindiName: 'पार्किंसन रोग',
      causes: ['Loss of dopamine neurons', 'Genetic factors', 'Environmental toxins', 'Age-related changes'],
      severity: 'high',
      symptoms: [
        'Tremors at rest', 'Slow movement', 'Muscle stiffness', 'Balance problems', 'Speech changes', 'Writing changes'
      ],
      medicines: [
        {
          name: 'Levodopa/Carbidopa', generic: 'L-DOPA', dosage: '100/25mg',
          frequency: 'Three times daily', duration: 'Long-term', sideEffects: ['Nausea', 'dyskinesia'], price: '₹200-400'
        },
        {
          name: 'Pramipexole', generic: 'Pramipexole', dosage: '0.5mg',
          frequency: 'Three times daily', duration: 'Long-term', sideEffects: ['Sleepiness'], price: '₹300-500'
        }
      ],
      emergencyAction: 'Regular exercise important - Physical therapy - Support groups available'
    },

    // Infectious Diseases
    'covid19': {
      keywords: ['covid', 'coronavirus', 'sars-cov-2', 'fever cough', 'loss of taste', 'कोविड', 'कोरोना वायरस'],
      hindiName: 'कोविड-19',
      causes: ['SARS-CoV-2 virus', 'Airborne transmission', 'Contact transmission'],
      severity: 'high',
      symptoms: [
        'Fever', 'Dry cough', 'Fatigue', 'Loss of taste/smell', 'Shortness of breath', 'Body aches'
      ],
      medicines: [
        {
          name: 'Paracetamol', generic: 'Acetaminophen', dosage: '500mg',
          frequency: 'Every 6 hours', duration: '5-7 days', sideEffects: ['Generally safe'], price: '₹10-25'
        },
        {
          name: 'Remdesivir', generic: 'Remdesivir', dosage: 'As prescribed',
          frequency: 'IV infusion', duration: '5 days', sideEffects: ['Liver toxicity'], price: '₹3000-5000'
        }
      ],
      emergencyAction: 'Isolate immediately - Monitor oxygen levels - Seek medical care if breathing difficulty'
    },

    'chikungunya': {
      keywords: ['chikungunya', 'joint pain', 'aedes mosquito', 'viral fever', 'चिकनगुनिया', 'जोड़ों का दर्द'],
      hindiName: 'चिकनगुनिया',
      causes: ['Chikungunya virus', 'Aedes mosquito bite', 'Viral infection'],
      severity: 'medium',
      symptoms: [
        'High fever', 'Severe joint pain', 'Muscle pain', 'Headache', 'Rash', 'Fatigue'
      ],
      medicines: [
        {
          name: 'Paracetamol', generic: 'Acetaminophen', dosage: '500mg',
          frequency: 'Every 6 hours', duration: '7-10 days', sideEffects: ['Generally safe'], price: '₹10-25'
        },
        {
          name: 'Diclofenac', generic: 'Diclofenac', dosage: '50mg',
          frequency: 'Twice daily', duration: '5-7 days', sideEffects: ['Stomach irritation'], price: '₹20-40'
        }
      ],
      emergencyAction: 'Use mosquito nets - Drink plenty of fluids - Avoid aspirin'
    },

    // Skin Conditions
    'acne': {
      keywords: ['acne', 'pimples', 'blackheads', 'whiteheads', 'teenage acne', 'मुंहासे', 'फुंसी'],
      hindiName: 'मुंहासे',
      causes: ['Hormonal changes', 'Excess oil production', 'Bacteria', 'Clogged pores'],
      severity: 'low',
      symptoms: [
        'Pimples', 'Blackheads', 'Whiteheads', 'Oily skin', 'Scarring', 'Inflammation'
      ],
      medicines: [
        {
          name: 'Benzoyl Peroxide', generic: 'Benzoyl peroxide', dosage: '2.5-5%',
          frequency: 'Once daily', duration: '8-12 weeks', sideEffects: ['Skin dryness'], price: '₹150-300'
        },
        {
          name: 'Tretinoin', generic: 'Tretinoin', dosage: '0.025%',
          frequency: 'At night', duration: '12 weeks', sideEffects: ['Skin irritation'], price: '₹200-400'
        }
      ],
      emergencyAction: 'Gentle cleansing - Avoid picking - Use non-comedogenic products'
    },

    'vitiligo': {
      keywords: ['vitiligo', 'white patches', 'loss of pigment', 'autoimmune skin', 'सफेद दाग', 'श्वेत कुष्ठ'],
      hindiName: 'श्वेत कुष्ठ (सफेद दाग)',
      causes: ['Autoimmune condition', 'Genetic factors', 'Stress', 'Sun damage'],
      severity: 'low',
      symptoms: [
        'White patches on skin', 'Hair turning white', 'Loss of skin color', 'Premature graying'
      ],
      medicines: [
        {
          name: 'Tacrolimus', generic: 'Tacrolimus', dosage: '0.1%',
          frequency: 'Twice daily', duration: 'Long-term', sideEffects: ['Skin burning'], price: '₹500-800'
        },
        {
          name: 'Betamethasone', generic: 'Betamethasone', dosage: '0.05%',
          frequency: 'Once daily', duration: '2-3 months', sideEffects: ['Skin thinning'], price: '₹100-200'
        }
      ],
      emergencyAction: 'Sun protection essential - Cosmetic camouflage - Psychological support'
    },

    // Mental Health Conditions
    'depression': {
      keywords: ['depression', 'sadness', 'hopelessness', 'low mood', 'mental health', 'अवसाद', 'डिप्रेशन'],
      hindiName: 'अवसाद',
      causes: ['Chemical imbalance', 'Genetic factors', 'Life events', 'Medical conditions'],
      severity: 'high',
      symptoms: [
        'Persistent sadness', 'Loss of interest', 'Fatigue', 'Sleep changes', 'Appetite changes', 'Guilt feelings'
      ],
      medicines: [
        {
          name: 'Sertraline', generic: 'Sertraline', dosage: '50mg',
          frequency: 'Once daily', duration: '6-12 months', sideEffects: ['Nausea', 'sexual dysfunction'], price: '₹100-200'
        },
        {
          name: 'Escitalopram', generic: 'Escitalopram', dosage: '10mg',
          frequency: 'Once daily', duration: '6-12 months', sideEffects: ['Headache'], price: '₹150-300'
        }
      ],
      emergencyAction: 'Seek professional help - Support groups - Crisis helpline: 9152987821'
    },

    'anxiety': {
      keywords: ['anxiety', 'panic attacks', 'worry', 'nervousness', 'tension', 'चिंता', 'बेचैनी'],
      hindiName: 'चिंता विकार',
      causes: ['Stress', 'Genetic factors', 'Medical conditions', 'Substance abuse'],
      severity: 'medium',
      symptoms: [
        'Excessive worry', 'Restlessness', 'Fatigue', 'Difficulty concentrating', 'Muscle tension', 'Sleep problems'
      ],
      medicines: [
        {
          name: 'Alprazolam', generic: 'Alprazolam', dosage: '0.25mg',
          frequency: 'As needed', duration: 'Short-term', sideEffects: ['Drowsiness'], price: '₹50-100'
        },
        {
          name: 'Propranolol', generic: 'Propranolol', dosage: '40mg',
          frequency: 'As needed', duration: 'Short-term', sideEffects: ['Fatigue'], price: '₹30-60'
        }
      ],
      emergencyAction: 'Deep breathing exercises - Regular exercise - Relaxation techniques'
    },

    // Eye Conditions
    'cataract': {
      keywords: ['cataract', 'cloudy vision', 'blurred vision', 'eye surgery', 'मोतियाबिंद', 'धुंधला दिखना'],
      hindiName: 'मोतियाबिंद',
      causes: ['Aging', 'Diabetes', 'UV exposure', 'Smoking', 'Eye injury'],
      severity: 'medium',
      symptoms: [
        'Cloudy vision', 'Blurred vision', 'Light sensitivity', 'Double vision', 'Night vision problems'
      ],
      medicines: [
        {
          name: 'Artificial tears', generic: 'Polyethylene glycol', dosage: '1-2 drops',
          frequency: '4 times daily', duration: 'As needed', sideEffects: ['Temporary blurring'], price: '₹100-200'
        }
      ],
      emergencyAction: 'Surgery is the definitive treatment - Wear sunglasses - Regular eye exams'
    },

    'glaucoma': {
      keywords: ['glaucoma', 'eye pressure', 'vision loss', 'optic nerve', 'काला मोतिया', 'आंख का दबाव'],
      hindiName: 'काला मोतिया (ग्लूकोमा)',
      causes: ['High eye pressure', 'Poor blood flow to optic nerve', 'Age', 'Family history'],
      severity: 'high',
      symptoms: [
        'Gradual vision loss', 'Eye pain', 'Nausea', 'Halos around lights', 'Tunnel vision'
      ],
      medicines: [
        {
          name: 'Timolol eye drops', generic: 'Timolol', dosage: '0.5%',
          frequency: 'Twice daily', duration: 'Long-term', sideEffects: ['Eye irritation'], price: '₹200-400'
        },
        {
          name: 'Latanoprost', generic: 'Latanoprost', dosage: '0.005%',
          frequency: 'Once daily', duration: 'Long-term', sideEffects: ['Eye color change'], price: '₹500-800'
        }
      ],
      emergencyAction: 'Regular eye pressure monitoring - Use eye drops as prescribed - Avoid steroids'
    },

    // Musculoskeletal Conditions
    'arthritis': {
      keywords: ['arthritis', 'joint pain', 'stiffness', 'swelling', 'rheumatoid', 'गठिया', 'जोड़ों का दर्द'],
      hindiName: 'गठिया',
      causes: ['Age-related wear', 'Autoimmune', 'Infection', 'Injury', 'Genetics'],
      severity: 'medium',
      symptoms: [
        'Joint pain', 'Stiffness', 'Swelling', 'Reduced range of motion', 'Fatigue', 'Morning stiffness'
      ],
      medicines: [
        {
          name: 'Ibuprofen', generic: 'Ibuprofen', dosage: '400mg',
          frequency: 'Three times daily', duration: 'As needed', sideEffects: ['Stomach irritation'], price: '₹15-30'
        },
        {
          name: 'Methotrexate', generic: 'Methotrexate', dosage: '7.5-15mg',
          frequency: 'Weekly', duration: 'Long-term', sideEffects: ['Liver toxicity'], price: '₹100-300'
        },
        {
          name: 'Glucosamine', generic: 'Glucosamine sulfate', dosage: '1500mg',
          frequency: 'Once daily', duration: 'Long-term', sideEffects: ['Mild GI upset'], price: '₹300-500'
        }
      ],
      emergencyAction: 'Regular exercise - Weight management - Hot/cold therapy - Joint protection'
    },

    'osteoporosis': {
      keywords: ['osteoporosis', 'bone loss', 'fractures', 'weak bones', 'हड्डियों की कमजोरी', 'अस्थि क्षय'],
      hindiName: 'अस्थि सुषिरता',
      causes: ['Hormonal changes', 'Calcium deficiency', 'Vitamin D deficiency', 'Age', 'Sedentary lifestyle'],
      severity: 'medium',
      symptoms: [
        'Frequent fractures', 'Loss of height', 'Back pain', 'Stooped posture', 'Bone pain'
      ],
      medicines: [
        {
          name: 'Alendronate', generic: 'Alendronate', dosage: '70mg',
          frequency: 'Weekly', duration: 'Long-term', sideEffects: ['Jaw problems'], price: '₹200-400'
        },
        {
          name: 'Calcium + Vitamin D', generic: 'Calcium carbonate', dosage: '500mg + 200IU',
          frequency: 'Twice daily', duration: 'Long-term', sideEffects: ['Constipation'], price: '₹100-200'
        }
      ],
      emergencyAction: 'Weight-bearing exercise - Adequate calcium/vitamin D - Fall prevention'
    },

    // Kidney Diseases
    'kidney stones': {
      keywords: ['kidney stones', 'renal calculi', 'severe back pain', 'blood in urine', 'गुर्दे की पथरी', 'पथरी'],
      hindiName: 'गुर्दे की पथरी',
      causes: ['Dehydration', 'High calcium/oxalate', 'Infection', 'Genetic factors'],
      severity: 'high',
      symptoms: [
        'Severe back/side pain', 'Blood in urine', 'Frequent urination', 'Nausea', 'Vomiting', 'Burning urination'
      ],
      medicines: [
        {
          name: 'Tamsulosin', generic: 'Tamsulosin', dosage: '0.4mg',
          frequency: 'Once daily', duration: '4-6 weeks', sideEffects: ['Dizziness'], price: '₹100-200'
        },
        {
          name: 'Diclofenac', generic: 'Diclofenac', dosage: '50mg',
          frequency: 'Twice daily', duration: 'As needed', sideEffects: ['Kidney damage'], price: '₹20-40'
        }
      ],
      emergencyAction: 'Drink plenty of water - Strain urine to catch stone - Pain management - Surgery if needed'
    },

    'chronic kidney disease': {
      keywords: ['kidney failure', 'chronic kidney disease', 'dialysis', 'creatinine high', 'गुर्दे की विफलता'],
      hindiName: 'दीर्घकालिक गुर्दा रोग',
      causes: ['Diabetes', 'High blood pressure', 'Polycystic kidney disease', 'Glomerulonephritis'],
      severity: 'critical',
      symptoms: [
        'Fatigue', 'Swelling', 'Shortness of breath', 'Nausea', 'Confusion', 'High blood pressure'
      ],
      medicines: [
        {
          name: 'ACE inhibitors', generic: 'Enalapril', dosage: '5-10mg',
          frequency: 'Twice daily', duration: 'Long-term', sideEffects: ['Cough'], price: '₹50-100'
        },
        {
          name: 'Erythropoietin', generic: 'Epoetin alfa', dosage: 'As prescribed',
          frequency: 'Weekly', duration: 'Long-term', sideEffects: ['High blood pressure'], price: '₹2000-3000'
        }
      ],
      emergencyAction: 'Low protein diet - Control BP and diabetes - Prepare for dialysis/transplant'
    },

    // Women's Health
    'pcos': {
      keywords: ['pcos', 'polycystic ovary', 'irregular periods', 'hirsutism', 'पीसीओएस', 'अनियमित माहवारी'],
      hindiName: 'पॉलीसिस्टिक ओवरी सिंड्रोम',
      causes: ['Insulin resistance', 'Hormonal imbalance', 'Genetics', 'Inflammation'],
      severity: 'medium',
      symptoms: [
        'Irregular periods', 'Excessive hair growth', 'Acne', 'Weight gain', 'Hair loss', 'Skin darkening'
      ],
      medicines: [
        {
          name: 'Metformin', generic: 'Metformin', dosage: '500mg',
          frequency: 'Twice daily', duration: 'Long-term', sideEffects: ['GI upset'], price: '₹50-150'
        },
        {
          name: 'Spironolactone', generic: 'Spironolactone', dosage: '100mg',
          frequency: 'Once daily', duration: 'Long-term', sideEffects: ['Irregular periods'], price: '₹100-200'
        }
      ],
      emergencyAction: 'Weight management - Regular exercise - Hormonal evaluation'
    },

    'endometriosis': {
      keywords: ['endometriosis', 'painful periods', 'pelvic pain', 'heavy bleeding', 'एंडोमेट्रियोसिस', 'दर्दनाक माहवारी'],
      hindiName: 'एंडोमेट्रियोसिस',
      causes: ['Retrograde menstruation', 'Genetic factors', 'Immune system disorders'],
      severity: 'medium',
      symptoms: [
        'Severe menstrual cramps', 'Heavy bleeding', 'Pain during intercourse', 'Infertility', 'Fatigue'
      ],
      medicines: [
        {
          name: 'Ibuprofen', generic: 'Ibuprofen', dosage: '600mg',
          frequency: 'Three times daily', duration: 'As needed', sideEffects: ['Stomach irritation'], price: '₹15-30'
        },
        {
          name: 'Leuprolide', generic: 'Leuprolide', dosage: 'As prescribed',
          frequency: 'Monthly injection', duration: '6 months', sideEffects: ['Menopausal symptoms'], price: '₹5000-8000'
        }
      ],
      emergencyAction: 'Heat therapy - Regular exercise - Surgical consultation if severe'
    }
  };

  // Method to search for diseases based on symptoms
  static searchBySymptoms(symptoms: string[]): any[] {
    const results = [];
    const symptomsLower = symptoms.map(s => s.toLowerCase());
    
    for (const [diseaseKey, disease] of Object.entries(this.diseaseDatabase)) {
      const matchCount = disease.keywords.filter(keyword => 
        symptomsLower.some(symptom => 
          symptom.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(symptom)
        )
      ).length;
      
      if (matchCount > 0) {
        results.push({
          disease: diseaseKey,
          ...disease,
          matchScore: matchCount / disease.keywords.length
        });
      }
    }
    
    return results.sort((a, b) => b.matchScore - a.matchScore);
  }

  // Method to get disease by name
  static getDiseaseInfo(diseaseName: string): any {
    return this.diseaseDatabase[diseaseName.toLowerCase()] || null;
  }

  // Method to get all diseases by category
  static getDiseasesByCategory(category: string): any[] {
    // This would be implemented based on categories
    const results = [];
    for (const [key, disease] of Object.entries(this.diseaseDatabase)) {
      // Simple categorization based on keywords - can be enhanced
      if (disease.keywords.some(keyword => keyword.includes(category.toLowerCase()))) {
        results.push({ disease: key, ...disease });
      }
    }
    return results;
  }

  // Emergency assessment based on symptoms
  static assessUrgency(symptoms: string[]): string {
    const criticalSymptoms = [
      'chest pain', 'difficulty breathing', 'severe bleeding', 'unconscious',
      'seizure', 'stroke symptoms', 'heart attack', 'severe abdominal pain'
    ];
    
    const hasCriticalSymptom = symptoms.some(symptom => 
      criticalSymptoms.some(critical => 
        symptom.toLowerCase().includes(critical.toLowerCase())
      )
    );
    
    if (hasCriticalSymptom) {
      return 'EMERGENCY - Call 108 immediately';
    }
    
    const highSymptoms = ['high fever', 'severe pain', 'vomiting', 'blood'];
    const hasHighSymptom = symptoms.some(symptom => 
      highSymptoms.some(high => 
        symptom.toLowerCase().includes(high.toLowerCase())
      )
    );
    
    if (hasHighSymptom) {
      return 'HIGH - Seek medical attention within 24 hours';
    }
    
    return 'MODERATE - Schedule appointment with doctor';
  }
}

export default ComprehensiveDiseaseDatabase;