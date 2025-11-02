import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Send, Bot, User, Mic, Shield, MapPin, Clock, Cloud, CloudOff, AlertTriangle, Phone, Heart } from 'lucide-react';
import arogyaMitraLogo from 'figma:asset/36e97157d20f426c5ec927e5c3cb9ad04a2e91df.png';
import { ComprehensiveDiseaseDatabase } from '../ComprehensiveDiseaseDatabase';
import { SymptomAnalyzer } from '../SymptomAnalyzer';
import { EmpathicResponseSystem } from './EmpathicResponseSystem';

type Language = 'en' | 'hi';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatAssistantProps {
  language: Language;
  userConsent: boolean;
  onConsentChange: (consent: boolean) => void;
}

const translations = {
  en: {
    title: "Arogya Mitra",
    subtitle: "Medical Assistant Chatbot",
    disclaimer: "I am just a chatbot medical assistant, not a doctor. For serious symptoms, please see your nearest clinic or hospital.",
    openingMessage: "HI! I am your Arogya Mitra medical assistant, how can I help you🩺?",
    closingDisclaimer: "Remember: I am just a chatbot medical assistant, not a doctor. For serious symptoms, please consult your nearest healthcare facility.",
    privacyMessage: "Enable cloud storage to save your chat history across devices",
    placeholder: "Describe your symptoms or health concerns...",
    voiceInput: "Voice Input",
    suggestions: ["Fever", "Diarrhea", "Cough", "Diabetes", "TB", "Malaria", "Heart Disease", "Worms", "Jan Aushadhi", "Ayushman Bharat"],
    cloudStorage: "Cloud Storage",
    enableCloud: "Save my chat history",
    confidential: "All data is encrypted and secure",
    nearbyFacility: "📍 Find nearest medical facility",
    emergencyContact: "🚨 Emergency: Call 108",
    emergencyButton: "Emergency 108",
    ayushmanBharat: "Ayushman Bharat Info",
    janAushadhi: "Jan Aushadhi Stores"
  },
  hi: {
    title: "आरोग्य मित्र",
    subtitle: "चिकित्सा सहायक चैटबॉट",
    disclaimer: "मैं केवल एक चैटबॉट चिकित्सा सहायक हूं, डॉक्टर नहीं। गंभीर लक्षणों के लिए, कृपया अपनी निकटतम क्लिनिक या अस्पताल देखें।",
    openingMessage: "नमस्ते! मैं आपका आरोग्य मित्र चिकित्सा सहायक हूं, मैं आपकी कैसे मदद कर सकता हूं🩺?",
    closingDisclaimer: "याद रखें: मैं केवल एक चैटबॉट चिकित्सा सहायक हूं, डॉक्टर नहीं। गंभीर लक्षणों के लिए, कृपया अपनी निकटतम स्वास्थ्य सुविधा से सलाह लें।",
    privacyMessage: "अपने चैट इतिहास को उपकरणों में सहेजने के लिए क्लाउड स्टोरेज सक्षम करें",
    placeholder: "अपने लक्षण या स्वास्थ्य संबंधी चिंताएं बताएं...",
    voiceInput: "आवाज़ इनपुट",
    suggestions: ["बुखार", "दस्त", "खाँसी", "मधुमेह", "टीबी", "मलेरिया", "हृदय रोग", "कीड़े", "जन औषधि", "आयुष्मान भारत"],
    cloudStorage: "क्लाउड स्टोरेज",
    enableCloud: "मेरे चैट इतिहास को सहेजें",
    confidential: "सभी डेटा एन्क्रिप्टेड और सुरक्षित है",
    nearbyFacility: "📍 निकटतम चिकित्सा सुविधा खोजें",
    emergencyContact: "🚨 आपातकाल: 108 कॉल करें",
    emergencyButton: "आपातकाल 108",
    ayushmanBharat: "आयुष्मान भारत जानकारी",
    janAushadhi: "जन औषधि स्टोर"
  }
};

// Enhanced rule-based response system with comprehensive coverage
const medicalRules = {
  // Common symptoms
  fever: {
    en: "🌡️ **FEVER DETECTED**\\n\\n**Immediate Care:**\\n• Drink plenty of fluids (ORS recommended)\\n• Rest in cool environment\\n• Paracetamol 500mg every 6 hours\\n• Cold compress on forehead\\n\\n**When to see doctor:**\\n• Temperature >103°F (39.4°C)\\n• Persists >3 days\\n• Severe headache/neck stiffness\\n\\n💊 **Medicines available:**\\n• Crocin 650mg - ₹20-35\\n• Dolo 650 - ₹15-25\\n\\n📍 **Nearest facility:** Civil Hospital (1.2 km)\\n🚨 **Emergency:** Call 108",
    hi: "🌡️ **बुखार की पहचान**\\n\\n**तत्काल देखभाल:**\\n• भरपूर तरल पदार्थ (ORS की सिफारिश)\\n• ठंडे माहौल में आराम\\n• पैरासिटामोल 500mg हर 6 घंटे\\n• माथे पर ठंडी पट्टी\\n\\n**डॉक्टर से कब मिलें:**\\n• तापमान >103°F (39.4°C)\\n• 3 दिन से ज्यादा\\n• तेज सिरदर्द/गर्दन में अकड़न\\n\\n💊 **उपलब्ध दवाएं:**\\n• क्रोसिन 650mg - ₹20-35\\n• डोलो 650 - ₹15-25\\n\\n📍 **निकटतम सुविधा:** सिविल अस्पताल (1.2 किमी)\\n🚨 **आपातकाल:** 108 पर कॉल करें"
  },
  
  diarrhea: {
    en: "🚽 **DIARRHEA/LOOSE MOTIONS**\\n\\n**Immediate Care:**\\n• ORS solution after each loose stool\\n• Zinc tablets 20mg daily for 10 days\\n• BRAT diet (Banana, Rice, Applesauce, Toast)\\n• Avoid dairy and spicy food\\n\\n**Warning signs:**\\n• Blood in stool\\n• High fever\\n• Severe dehydration\\n• Lasts >3 days\\n\\n💊 **Medicines:**\\n• ORS sachets - ₹5-15\\n• Loperamide - ₹30-60\\n• Zinc tablets - ₹20-40\\n\\n📍 **Nearest PHC:** 0.8 km away",
    hi: "🚽 **दस्त/पतले दस्त**\\n\\n**तत्काल देखभाल:**\\n• हर पतले दस्त के बाद ORS घोल\\n• जिंक की गोली 20mg रोज 10 दिन\\n• केला, चावल, टोस्ट खाएं\\n• दूध और मसालेदार खाना न खाएं\\n\\n**चेतावनी के संकेत:**\\n• मल में खून\\n• तेज बुखार\\n• गंभीर निर्जलीकरण\\n• 3 दिन से ज्यादा\\n\\n💊 **दवाएं:**\\n• ORS के पैकेट - ₹5-15\\n• लोपेरामाइड - ₹30-60\\n• जिंक की गोली - ₹20-40\\n\\n📍 **निकटतम PHC:** 0.8 किमी दूर"
  },

  malaria: {
    en: "🦟 **POSSIBLE MALARIA**\\n\\n**Symptoms match:** Fever with chills, sweating\\n\\n**URGENT ACTION NEEDED:**\\n• Get blood test (RDT/Microscopy) immediately\\n• Don't delay treatment\\n• Use mosquito nets\\n• Drink fluids\\n\\n**Treatment (if confirmed):**\\n• Chloroquine 600mg initially\\n• Artemether-Lumefantrine 80/480mg\\n• Complete full course\\n\\n💊 **Cost:** ₹200-500\\n🏥 **Nearest facility:** District Hospital\\n⚠️ **This is serious - see doctor TODAY**",
    hi: "🦟 **संभावित मलेरिया**\\n\\n**लक्षण मेल:** कंपकंपी के साथ बुखार, पसीना\\n\\n**तुरंत कार्रवाई आवश्यक:**\\n• तुरंत खून की जांच (RDT/माइक्रोस्कोपी)\\n• इलाज में देरी न करें\\n• मच्छरदानी का उपयोग\\n• तरल पदार्थ पिएं\\n\\n**उपचार (पुष्टि होने पर):**\\n• क्लोरोक्विन 600mg शुरुआत में\\n• आर्टेमेथर-ल्यूमेफैंट्राइन 80/480mg\\n• पूरा कोर्स करें\\n\\n💊 **लागत:** ₹200-500\\n🏥 **निकटतम सुविधा:** जिला अस्पताल\\n⚠️ **यह गंभीर है - आज ही डॉक्टर से मिलें**"
  },

  diabetes: {
    en: "🩸 **DIABETES MANAGEMENT**\\n\\n**Daily Care:**\\n• Check blood sugar regularly\\n• Take medicines as prescribed\\n• Exercise 30 mins daily\\n• Diabetic diet\\n• Foot care important\\n\\n**Medicines:**\\n• Metformin 500mg - ₹50-150\\n• Glimepiride 1-2mg - ₹80-200\\n• Insulin (if needed) - ₹200-500\\n\\n**Emergency signs:**\\n• Very high/low sugar\\n• Unconsciousness\\n• Difficulty breathing\\n\\n🏥 **Diabetes clinic:** Every Monday, Wednesday",
    hi: "🩸 **मधुमेह प्रबंधन**\\n\\n**दैनिक देखभाल:**\\n• नियमित रूप से शुगर चेक करें\\n• दवा समय पर लें\\n• रोज 30 मिनट व्यायाम\\n• मधुमेह आहार\\n• पैरों की देखभाल जरूरी\\n\\n**दवाएं:**\\n• मेटफॉर्मिन 500mg - ₹50-150\\n• ग्लिमेपिराइड 1-2mg - ₹80-200\\n• इंसुलिन (जरूरत पर) - ₹200-500\\n\\n**आपातकालीन संकेत:**\\n• बहुत ज्यादा/कम शुगर\\n• बेहोशी\\n• सांस लेने में कठिनाई\\n\\n🏥 **मधुमेह क्लिनिक:** हर सोमवार, बुधवार"
  },

  tuberculosis: {
    en: "🫁 **POSSIBLE TB SYMPTOMS**\\n\\n**Symptoms:** Persistent cough, night sweats, weight loss\\n\\n**IMPORTANT:**\\n• Get sputum test immediately\\n• Chest X-ray needed\\n• Don't ignore symptoms\\n• TB is curable with proper treatment\\n\\n**DOTS Treatment Available:**\\n• Free government treatment\\n• 6-month course\\n• Directly observed therapy\\n\\n📍 **DOTS Center:** PHC (0.8 km)\\n🏥 **TB Specialist:** District Hospital\\n⚠️ **URGENT - Don't delay testing**",
    hi: "🫁 **संभावित टीबी के लक्षण**\\n\\n**लक्षण:** लगातार खांसी, रात में पसीना, वजन कम\\n\\n**महत्वपूर्ण:**\\n• तुरंत कफ की जांच कराएं\\n• छाती का एक्स-रे जरूरी\\n• लक्षणों को नजरअंदाज न करें\\n• उचित इलाज से TB ठीक हो सकती है\\n\\n**DOTS उपचार उपलब्ध:**\\n• मुफ्त सरकारी इलाज\\n• 6 महीने का कोर्स\\n• प्रत्यक्ष निरीक्षण थेरेपी\\n\\n📍 **DOTS केंद्र:** PHC (0.8 किमी)\\n🏥 **TB विशेषज्ञ:** जिला अस्पताल\\n⚠️ **तुरंत - जांच में देरी न करें**"
  },

  hypertension: {
    en: "💓 **HIGH BLOOD PRESSURE**\\n\\n**Daily Management:**\\n• Take medicines regularly\\n• Low salt diet\\n• Regular exercise\\n• Manage stress\\n• Monitor BP weekly\\n\\n**Medicines:**\\n• Amlodipine 5mg - ₹30-80\\n• Telmisartan 40mg - ₹100-250\\n• Atenolol 25mg - ₹20-60\\n\\n**Emergency (BP >180/120):**\\n• Call 108 immediately\\n• Don't drive yourself\\n\\n🏥 **BP Clinic:** Every Tuesday, Friday\\n📊 **Free BP check:** Daily at PHC",
    hi: "💓 **उच्च रक्तचाप**\\n\\n**दैनिक प्रबंधन:**\\n• नियमित दवा लें\\n• कम नमक का आहार\\n• नियमित व्यायाम\\n• तनाव प्रबंधन\\n• साप्ताहिक BP मॉनिटर\\n\\n**दवाएं:**\\n• एम्लोडिपाइन 5mg - ₹30-80\\n• टेल्मिसार्टन 40mg - ₹100-250\\n• एटेनोलोल 25mg - ₹20-60\\n\\n**आपातकाल (BP >180/120):**\\n• तुरंत 108 पर कॉल करें\\n• खुद गाड़ी न चलाएं\\n\\n🏥 **BP क्लिनिक:** हर मंगलवार, शुक्रवार\\n📊 **मुफ्त BP जांच:** PHC में रोज"
  },

  worms: {
    en: "🪱 **INTESTINAL WORMS**\\n\\n**Common in rural areas**\\n\\n**Treatment:**\\n• Albendazole 400mg single dose\\n• Repeat after 2 weeks\\n• Whole family should take\\n\\n**Prevention:**\\n• Wash hands before eating\\n• Don't walk barefoot\\n• Wash vegetables properly\\n• Boil drinking water\\n\\n💊 **Medicine cost:** ₹15-30\\n📍 **Available at:** All PHCs\\n👨‍👩‍👧‍👦 **Family treatment recommended**",
    hi: "🪱 **पेट के कीड़े**\\n\\n**ग्रामीण क्षेत्रों में आम**\\n\\n**उपचार:**\\n• एल्बेंडाजोल 400mg एक खुराक\\n• 2 हफ्ते बाद दोहराएं\\n• पूरे परिवार को लेना चाहिए\\n\\n**बचाव:**\\n• खाने से पहले हाथ धोएं\\n• नंगे पैर न चलें\\n• सब्जियां अच्छी तरह धोएं\\n• पीने का पानी उबालें\\n\\n💊 **दवा की लागत:** ₹15-30\\n📍 **उपलब्ध:** सभी PHC में\\n👨‍👩‍👧‍👦 **पारिवारिक उपचार की सिफारिश**"
  }
};

export function ChatAssistant({ language, userConsent, onConsentChange }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: translations[language]?.openingMessage || translations.en.openingMessage,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = translations[language] || translations.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRuleBasedResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // First, check for government schemes and general health queries
    if (lowerInput.includes('ayushman') || lowerInput.includes('आयुष्मान')) {
      return language === 'hi'
        ? `🏥 **आयुष्मान भारत योजना**\n\nआयुष्मान भारत दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना है।\n\n**मुख्य लाभ:**\n• प्रति परिवार ₹5 लाख का कवरेज\n• 1,393+ चिकित्सा प्रक्रियाएं कवर\n• कैशलेस उपचार\n• पूर्व-मौजूदा बीमारियां कवर\n\n**पात्रता जांचने के लिए:**\n📞 हेल्पलाइन: 14555\n🌐 वेबसाइट: pmjay.gov.in\n\n📍 हमारे Health Insurance सेक्शन में विस्तृत जानकारी देखें।\n\n🩺 **याद रखें:** मैं केवल चैटबॉट हूं, डॉक्टर नहीं।`
        : `🏥 **Ayushman Bharat Scheme**\n\nAyushman Bharat is the world's largest health insurance scheme.\n\n**Key Benefits:**\n• ₹5 lakh coverage per family\n• 1,393+ medical procedures covered\n• Cashless treatment\n• Pre-existing conditions covered\n\n**To check eligibility:**\n📞 Helpline: 14555\n🌐 Website: pmjay.gov.in\n\n📍 Visit our Health Insurance section for detailed information.\n\n🩺 **Remember:** I am just a chatbot, not a doctor.`;
    }

    if (lowerInput.includes('jan aushadhi') || lowerInput.includes('जन औषधि')) {
      return language === 'hi'
        ? `💊 **जन औषधि स्टोर**\n\nकिफायती जेनेरिक दवाओं के लिए सरकारी स्टोर।\n\n**मुख्य लाभ:**\n• ब्रांडेड दवाओं से 50-90% कम कीमत\n• WHO-GMP प्रमाणित गुणवत्ता\n• 1,600+ दवाएं उपलब्ध\n• कोई सदस्यता की जरूरत नहीं\n\n**स्टोर खोजने के लिए:**\n📞 हेल्पलाइन: 1800-180-5253\n🌐 वेबसाइट: janaushadhi.gov.in\n\n📍 हमारे Government Schemes सेक्शन में और जानकारी देखें।\n\n🩺 **याद रखें:** मैं केवल चैटबॉट हूं, डॉक्टर नहीं।`
        : `💊 **Jan Aushadhi Stores**\n\nGovernment stores for affordable generic medicines.\n\n**Key Benefits:**\n• 50-90% cheaper than branded medicines\n• WHO-GMP certified quality\n• 1,600+ medicines available\n• No membership required\n\n**To find stores:**\n📞 Helpline: 1800-180-5253\n🌐 Website: janaushadhi.gov.in\n\n📍 Visit our Government Schemes section for more information.\n\n🩺 **Remember:** I am just a chatbot, not a doctor.`;
    }

    // Use the new empathic response system for symptom queries
    const urgencyLevel = EmpathicResponseSystem.assessUrgency(input);
    
    // Check if input contains symptom-related keywords
    const symptomKeywords = [
      'fever', 'बुखार', 'headache', 'सिरदर्द', 'cough', 'खांसी', 
      'pain', 'दर्द', 'sick', 'बीमार', 'hurt', 'problem', 'समस्या',
      'diarrhea', 'दस्त', 'vomiting', 'उल्टी', 'chest', 'छाती',
      'breathing', 'सांस', 'stomach', 'पेट', 'unwell', 'परेशान',
      'feel bad', 'feeling', 'महसूस'
    ];
    
    const hasSymptoms = symptomKeywords.some(keyword => 
      lowerInput.includes(keyword.toLowerCase())
    );
    
    if (hasSymptoms) {
      // Generate empathic response following the specified pattern
      const empathicResponse = EmpathicResponseSystem.generateEmpathicResponse(input, language);
      return empathicResponse;
    }

    // Emergency assessment first
    if (urgencyLevel === 'emergency') {
      return language === 'hi'
        ? "🚨 **आपातकालीन स्थिति**\n\nआपके लक्षण गंभीर हो सकते हैं। कृपया तुरंत:\n• 108 पर कॉल करें\n• निकटतम अस्पताल जाएं\n• देरी न करें\n\n⚠️ यह जीवन रक्षक हो सकता है!\n\n🩺 **याद रखें**: मैं केवल चैटबॉट हूं, डॉक्टर नहीं। तत्काल चिकित्सा सहायता लें।"
        : "🚨 **EMERGENCY SITUATION**\n\nYour symptoms may be serious. Please immediately:\n• Call 108\n• Go to nearest hospital\n• Don't delay\n\n⚠️ This could be life-saving!\n\n🩺 **Remember**: I am just a chatbot, not a doctor. Seek immediate medical help.";
    }
    
    // Use comprehensive disease database for symptom analysis
    const words = lowerInput.split(' ');
    const potentialDiseases = ComprehensiveDiseaseDatabase.searchBySymptoms(words);
    
    // Enhanced symptom matching with Hindi support
    const symptomKeywords = {
      fever: ['fever', 'बुखार', 'तेज़ बुखार', 'high temperature', 'गर्मी'],
      diarrhea: ['diarrhea', 'loose motions', 'दस्त', 'पेचिश', 'पतले दस्त', 'लूज मोशन'],
      malaria: ['malaria', 'chills', 'sweating', 'मलेरिया', 'कंपकंपी', 'पसीना'],
      diabetes: ['diabetes', 'sugar', 'मधुमेह', 'शुगर', 'frequent urination', 'बार बार पेशाब'],
      tuberculosis: ['tb', 'tuberculosis', 'persistent cough', 'टीबी', 'लगातार खांसी', 'night sweats'],
      hypertension: ['high bp', 'blood pressure', 'उच्च रक्तचाप', 'हाई बीपी', 'headache'],
      worms: ['worms', 'कृमि', 'कीड़े', 'पेट के कीड़े', 'stomach worms'],
      headache: ['headache', 'सिरदर्द', 'माइग्रेन', 'head pain'],
      stomach: ['stomach pain', 'पेट दर्द', 'acidity', 'gas', 'gastric'],
      cough: ['cough', 'खांसी', 'cold', 'सर्दी', 'जुकाम'],
      rash: ['rash', 'skin problem', 'दाने', 'खुजली', 'चर्म रोग'],
      uti: ['urination problem', 'burning', 'पेशाब में जलन', 'uti'],
      eye: ['eye problem', 'आंख की समस्या', 'red eyes', 'conjunctivitis']
    };

    // Check for specific symptoms and provide detailed responses
    for (const [condition, keywords] of Object.entries(symptomKeywords)) {
      if (keywords.some(keyword => lowerInput.includes(keyword.toLowerCase()))) {
        if (medicalRules[condition] && medicalRules[condition][language]) {
          return medicalRules[condition][language];
        }
      }
    }

    // If comprehensive database has matches, provide first match info
    if (potentialDiseases.length > 0) {
      const topMatch = potentialDiseases[0];
      const diseaseInfo = topMatch;
      
      const response = language === 'hi' 
        ? `🩺 **${diseaseInfo.hindiName || diseaseInfo.disease.toUpperCase()}**\n\n**संभावित कारण:**\n${diseaseInfo.causes.slice(0,3).map(cause => `• ${cause}`).join('\n')}\n\n**लक्षण:**\n${diseaseInfo.symptoms ? diseaseInfo.symptoms.slice(0,4).map(symptom => `• ${symptom}`).join('\n') : 'विभिन्न लक्षण हो सकते हैं'}\n\n⚠️ **महत्वपूर्ण:** यह केवल सामान्य जानकारी है। कृपया डॉक्टर से सलाह लें।\n\n📍 **निकटतम चिकित्सा सुविधा देखने के लिए 'Medical Locator' पर जाएं**`
        : `🩺 **${diseaseInfo.disease.toUpperCase()}**\n\n**Possible causes:**\n${diseaseInfo.causes.slice(0,3).map(cause => `• ${cause}`).join('\n')}\n\n**Symptoms:**\n${diseaseInfo.symptoms ? diseaseInfo.symptoms.slice(0,4).map(symptom => `• ${symptom}`).join('\n') : 'Various symptoms may occur'}\n\n⚠️ **Important:** This is general information only. Please consult a doctor.\n\n📍 **Visit 'Medical Locator' to find nearest medical facility**`;
      
      return response;
    }

    // Emergency assessment
    const urgencyLevel = ComprehensiveDiseaseDatabase.assessUrgency(words);
    if (urgencyLevel.includes('EMERGENCY')) {
      return language === 'hi'
        ? "🚨 **आपातकालीन स्थिति**\n\nआपके लक्षण गंभीर हो सकते हैं। कृपया तुरंत:\n• 108 पर कॉल करें\n• निकटतम अस्पताल जाएं\n• देरी न करें\n\n⚠️ यह जीवन रक्षक हो सकता है!"
        : "🚨 **EMERGENCY SITUATION**\n\nYour symptoms may be serious. Please immediately:\n• Call 108\n• Go to nearest hospital\n• Don't delay\n\n⚠️ This could be life-saving!";
    }

    // Default response with more options
    return language === 'hi' 
      ? `🩺 **आरोग्य मित्र चिकित्सा सहायक**\n\nकृपया अपने लक्षण स्पष्ट रूप से बताएं। मैं निम्नलिखित के बारे में सलाह दे सकता हूं:\n\n🔸 **सामान्य समस्याएं:**\n• बुखार, सिरदर्द, खांसी\n• पेट दर्द, दस्त, गैस\n• चर्म रोग, आंख की समस्या\n\n🔸 **दीर्घकालिक रोग:**\n• मधुमेह, उच्च रक्तचाप\n• टीबी, मलेरिया\n• हृदय रोग, गुर्दा रोग\n\n📍 **सुविधाएं:**\n• Medical Locator - निकटतम अस्पताल\n• Lab Booking - जांच बुकिंग\n• Telemedicine - ऑनलाइन डॉक्टर\n\n⚠️ **याद रखें:** मैं केवल एक चैटबॉट हूं, डॉक्टर नहीं।`
      : `🩺 **Arogya Mitra Medical Assistant**\n\nPlease describe your symptoms clearly. I can provide advice about:\n\n🔸 **Common Problems:**\n• Fever, headache, cough\n• Stomach pain, diarrhea, gas\n• Skin problems, eye issues\n\n🔸 **Chronic Conditions:**\n• Diabetes, hypertension\n• TB, malaria\n• Heart disease, kidney disease\n\n📍 **Services Available:**\n• Medical Locator - Find nearest hospital\n• Lab Booking - Book tests\n• Telemedicine - Online doctor\n\n⚠️ **Remember:** I am just a chatbot, not a doctor.`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Save to cloud if consent is given
    if (userConsent) {
      // Simulate cloud storage
      console.log('Saving to cloud:', userMessage);
    }
    
    setInputValue('');
    setIsTyping(true);

    // Rule-based response
    setTimeout(() => {
      const response = getRuleBasedResponse(inputValue);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      
      // Save AI response to cloud if consent is given
      if (userConsent) {
        console.log('Saving AI response to cloud:', aiResponse);
      }
      
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-cyan-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4 text-white">
        <div className="flex items-center gap-4">
          <img 
            src={arogyaMitraLogo} 
            alt="Arogya Mitra" 
            className="w-12 h-12 object-contain bg-white/20 rounded-2xl p-1"
          />
          <div className="flex-1">
            <h1 className="text-lg font-bold">{t.title}</h1>
            <p className="text-cyan-100 text-sm">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.open('tel:108', '_self')}
              className="bg-red-500 hover:bg-red-600 p-2 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-white" />
            </button>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Emergency Bar */}
      <div className="bg-red-50 border-b border-red-200 px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-800">{t.emergencyContact}</span>
          </div>
          <button 
            onClick={() => window.open('tel:108', '_self')}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
          >
            {t.emergencyButton}
          </button>
        </div>
      </div>

      {/* Cloud Storage Consent */}
      <div className="mx-6 -mt-3 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-cyan-200">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {userConsent ? <Cloud className="w-5 h-5 text-cyan-600" /> : <CloudOff className="w-5 h-5 text-gray-500" />}
              <div>
                <p className="text-sm font-medium text-gray-800">{t.cloudStorage}</p>
                <p className="text-xs text-gray-600">{t.privacyMessage}</p>
              </div>
            </div>
            <Switch
              checked={userConsent}
              onCheckedChange={onConsentChange}
            />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mx-6 mb-4">
        <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <p className="text-xs text-amber-800 font-medium">{t.disclaimer}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-end gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-br from-green-500 to-blue-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <Card className={`p-4 ${
                  message.type === 'user' 
                    ? 'bg-cyan-500 text-white border-cyan-500' 
                    : 'bg-white border-gray-200'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                  <div className="flex items-center justify-between mt-2 opacity-70">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    {userConsent && (
                      <div className="flex items-center gap-1">
                        <Cloud className="w-3 h-3" />
                        <span className="text-xs">Saved</span>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <Card className="p-4 bg-white border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-xs text-gray-500">AI is thinking...</span>
                </div>
              </Card>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="px-6 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {t.suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick(suggestion)}
              className="whitespace-nowrap rounded-full bg-white/80 border-cyan-200 text-cyan-700 hover:bg-cyan-50"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.placeholder}
              className="h-12 pr-12 rounded-2xl border-2 border-gray-200 focus:border-cyan-400 text-base"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full"
            >
              <Mic className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-2xl"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}