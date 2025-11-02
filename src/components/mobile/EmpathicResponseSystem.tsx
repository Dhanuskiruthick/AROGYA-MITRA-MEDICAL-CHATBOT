// Empathic Response System for Arogya Mitra
// Provides safe, empathetic medical guidance while avoiding direct disease diagnosis

export interface EmpathicResponse {
  greeting: string;
  symptoms: string;
  causes: string;
  selfCare: string;
  whenToConsult: string;
  disclaimer: string;
  emergency?: string;
  localGuidance?: string;
}

export interface SymptomPattern {
  keywords: string[];
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  response: {
    en: EmpathicResponse;
    hi: EmpathicResponse;
  };
}

export class EmpathicResponseSystem {
  static symptomPatterns: SymptomPattern[] = [
    {
      keywords: ['fever', 'बुखार', 'तेज़ बुखार', 'high temperature', 'गर्मी', 'body heat', 'chills', 'कंपकंपी'],
      urgencyLevel: 'medium',
      response: {
        en: {
          greeting: "I'm sorry to hear you're feeling unwell with fever-like symptoms.",
          symptoms: "Symptoms like these are quite common and can occur for many reasons.",
          causes: "Common causes include:\n• Minor infections (viral or bacterial)\n• Body's natural response to fighting illness\n• Environmental factors like heat\n• Sometimes stress or overexertion",
          selfCare: "Please try these self-care measures:\n• Stay well hydrated - drink water, ORS, or clear soups\n• Rest in a cool, comfortable environment\n• Use a damp cloth on your forehead for comfort\n• Wear light, breathable clothing\n• Monitor your temperature regularly",
          whenToConsult: "It's best to consult a healthcare professional if:\n• Symptoms last more than 2-3 days\n• Temperature goes very high (over 102°F/39°C)\n• You experience severe headache or neck stiffness\n• You feel confused or very weak\n• Symptoms worsen instead of improving",
          disclaimer: "Remember, I am your AROGYA MITRA chatbot here to assist with information, but I am not a doctor. For urgent concerns, seek immediate medical help.",
          localGuidance: "📍 You can find the nearest clinic using our Medical Locator feature\n📞 For telemedicine consultation, visit our Telemedicine section\n🚨 For urgent care, don't hesitate to call 108"
        },
        hi: {
          greeting: "मुझे खुशी नहीं हुई कि आप बुखार जैसे लक्षणों से परेशान हैं।",
          symptoms: "इस तरह के लक्षण काफी आम होते हैं और कई कारणों से हो सकते हैं।",
          causes: "सामान्य कारण हैं:\n• छोटे संक्रमण (वायरल या बैक्टीरियल)\n• बीमारी से लड़ने की शरीर की प्राकृतिक प्रतिक्रिया\n• गर्मी जैसे पर्यावरणीय कारक\n• कभी-कभी तनाव या अधिक थकान",
          selfCare: "कृपया ये स्व-देखभाल उपाय आजमाएं:\n• खूब पानी पिएं - पानी, ORS, या साफ सूप\n• ठंडे, आरामदायक माहौल में आराम करें\n• आराम के लिए माथे पर गीला कपड़ा रखें\n• हल्के, सांस लेने वाले कपड़े पहनें\n• नियमित रूप से अपना तापमान जांचें",
          whenToConsult: "स्वास्थ्य पेशेवर से सलाह लेना सबसे अच्छा है यदि:\n• लक्षण 2-3 दिन से अधिक रहें\n• तापमान बहुत अधिक हो (102°F/39°C से अधिक)\n• आपको तेज सिरदर्द या गर्दन में अकड़न हो\n• आप भ्रमित या बहुत कमजोर महसूस करें\n• लक्षण बेहतर होने के बजाय बदतर हों",
          disclaimer: "याद रखें, मैं आपका आरोग्य मित्र चैटबॉट हूं जो जानकारी के साथ सहायता करता हूं, लेकिन मैं डॉक्टर नहीं हूं। तत्काल चिंताओं के लिए तुरंत चिकित्सा सहायता लें।",
          localGuidance: "📍 आप हमारी Medical Locator सुविधा का उपयोग करके निकटतम क्लिनिक ढूंढ सकते हैं\n📞 टेलीमेडिसिन परामर्श के लिए, हमारा Telemedicine अनुभाग देखें\n🚨 तत्काल देखभाल के लिए, 108 पर कॉल करने में संकोच न करें"
        }
      }
    },
    {
      keywords: ['diarrhea', 'loose motions', 'दस्त', 'पेचिश', 'पतले दस्त', 'लूज मोशन', 'stomach upset', 'पेट खराब'],
      urgencyLevel: 'medium',
      response: {
        en: {
          greeting: "I understand you're experiencing stomach discomfort with loose motions.",
          symptoms: "Digestive issues like these are common and usually resolve with proper care.",
          causes: "This can happen due to:\n• Something you ate or drank\n• Minor stomach infection\n• Stress or anxiety\n• Changes in routine or diet\n• Sometimes weather changes",
          selfCare: "Please try these helpful measures:\n• Stay well hydrated - drink ORS solution frequently\n• Eat simple, easy-to-digest foods like rice, bananas\n• Avoid dairy products and spicy foods temporarily\n• Get adequate rest\n• Keep yourself clean and hygienic",
          whenToConsult: "Please see a healthcare provider if:\n• Symptoms continue for more than 2-3 days\n• You notice blood in stool\n• You develop high fever\n• You feel severely dehydrated\n• You experience severe abdominal pain",
          disclaimer: "Remember, I am your AROGYA MITRA chatbot providing general guidance, but I am not a doctor. For serious concerns, please consult medical professionals.",
          localGuidance: "📍 Find nearby healthcare facilities using our Medical Locator\n💊 Check medicine prices at Jan Aushadhi stores\n🩺 Book a consultation through our Telemedicine service"
        },
        hi: {
          greeting: "मैं समझ सकता हूं कि आप पेट की परेशानी और पतले दस्त से परेशान हैं।",
          symptoms: "इस तरह की पाचन समस्याएं आम होती हैं और उचित देखभाल से आमतौर पर ठीक हो जाती हैं।",
          causes: "यह इन कारणों से हो सकता है:\n• कुछ जो आपने खाया या पिया हो\n• पेट का छोटा संक्रमण\n• तनाव या चिंता\n• दिनचर्या या आहार में बदलाव\n• कभी-कभी मौसम में बदलाव",
          selfCare: "कृपया ये सहायक उपाय आजमाएं:\n• खूब पानी पिएं - बार-बार ORS घोल लें\n• सादा, आसानी से पचने वाला खाना खाएं जैसे चावल, केला\n• अस्थायी रूप से दू�� उत्पाद और मसालेदार खाना न खाएं\n• पर्याप्त आराम करें\n• खुद को साफ और स्वच्छ रखें",
          whenToConsult: "कृपया स्वास्थ्य प्रदाता से मिलें यदि:\n• लक्षण 2-3 दिन से अधिक जारी रहें\n• आपको मल में खून नजर आए\n• आपको तेज बुखार हो\n• आप गंभीर रूप से निर्जलित महसूस करें\n• आपको तेज पेट दर्द हो",
          disclaimer: "याद रखें, मैं आपका आरोग्य मित्र चैटबॉट हूं जो सामान्य मार्गदर्शन प्रदान करता हूं, लेकिन मैं डॉक्टर नहीं हूं। गंभीर चिंताओं के लिए कृपया चिकित्सा पेशेवरों से सलाह लें।",
          localGuidance: "📍 हमारी Medical Locator का उपयोग करके निकटतम स्वास्थ्य सुविधाएं खोजें\n💊 जन औषधि स्टोर पर दवा की कीमत जांचें\n🩺 हमारी Telemedicine सेवा के माध्यम से परामर्श बुक करें"
        }
      }
    },
    {
      keywords: ['headache', 'सिरदर्द', 'माइग्रेन', 'head pain', 'सिर में दर्द', 'temple pain'],
      urgencyLevel: 'low',
      response: {
        en: {
          greeting: "I'm sorry you're dealing with head discomfort.",
          symptoms: "Head discomfort is very common and can be caused by various everyday factors.",
          causes: "Common reasons include:\n• Stress or tension\n• Not getting enough sleep\n• Dehydration\n• Eye strain from screens\n• Poor posture\n• Skipping meals",
          selfCare: "Try these gentle remedies:\n• Rest in a quiet, dark room\n• Apply a cool or warm compress to your head\n• Stay hydrated with water\n• Get some fresh air if possible\n• Try gentle neck and shoulder stretches\n• Ensure you eat regular meals",
          whenToConsult: "Consider seeing a healthcare provider if:\n• Pain is very severe or sudden\n• You experience vision changes\n• Headaches become frequent\n• You have fever with the headache\n• Pain doesn't improve with rest after 24 hours",
          disclaimer: "Remember, I am your AROGYA MITRA chatbot providing general information, but I am not a doctor. For persistent or severe symptoms, please consult healthcare professionals.",
          localGuidance: "📍 Visit nearby pharmacy for basic pain relief options\n🩺 Consider telemedicine consultation if symptoms persist\n📞 Emergency help is available at 108 for severe cases"
        },
        hi: {
          greeting: "मुझे खुशी नहीं है कि आप सिर की परेशानी से जूझ रहे हैं।",
          symptoms: "सिर की परेशानी बहुत आम है और विभिन्न रोजमर्रा के कारकों से हो सकती है।",
          causes: "सामान्य कारण हैं:\n• तनाव या चिंता\n• पर्याप्त नींद न लेना\n• पानी की कमी\n• स्क्रीन से आंखों पर जोर\n• गलत मुद्रा\n• खाना छोड़ना",
          selfCare: "ये कोमल उपाय आजमाएं:\n• शांत, अंधेरे कमरे में आराम करें\n• सिर पर ठंडी या गर्म पट्टी लगाएं\n• पानी पीकर हाइड्रेटेड रहें\n• संभव हो तो ताजी हवा लें\n• गर्दन और कंधों की हल्की स्ट्रेचिंग करें\n• नियमित खाना लेना सुनिश्चित करें",
          whenToConsult: "स्वास्थ्य प्रदाता से मिलने पर विचार करें यदि:\n• दर्द बहुत तेज या अचानक हो\n• आपको दृष्टि में बदलाव हो\n• सिरदर्द बार-बार होने लगे\n• सिरदर्द के साथ बुखार हो\n• 24 घंटे आराम के बाद भी दर्द में सुधार न हो",
          disclaimer: "याद रखें, मैं आपका आरोग्य मित्र चैटबॉट हूं जो सामान्य जानकारी प्रदान करता हूं, लेकिन मैं डॉक्टर नहीं हूं। लगातार या गंभीर लक्षणों के लिए कृपया स्वास्थ्य पेशेवरों से सलाह लें।",
          localGuidance: "📍 बुनियादी दर्द निवारण विकल्पों के लिए पास की फार्मेसी जाएं\n🩺 यदि लक्षण बने रहें तो टेलीमेडिसिन परामर्श पर विचार करें\n📞 गंभीर मामलों के लिए 108 पर आपातकालीन सहायता उपलब्ध है"
        }
      }
    },
    {
      keywords: ['cough', 'खांसी', 'cold', 'सर्दी', 'जुकाम', 'sore throat', 'गले में खराश', 'runny nose'],
      urgencyLevel: 'low',
      response: {
        en: {
          greeting: "I understand you're experiencing respiratory discomfort like cough or cold symptoms.",
          symptoms: "These symptoms are very common, especially during weather changes or when our body is fighting minor infections.",
          causes: "This often happens due to:\n• Common seasonal changes\n• Minor viral infections\n• Dust or environmental irritants\n• Dry air or air conditioning\n• Sometimes stress affecting immunity",
          selfCare: "Please try these soothing remedies:\n• Drink warm water, herbal teas, or warm soup\n• Gargle with warm salt water\n• Get plenty of rest\n• Use a humidifier or breathe steam\n• Avoid cold drinks and ice cream temporarily\n• Cover your mouth when coughing",
          whenToConsult: "Please see a healthcare provider if:\n• Symptoms persist for more than a week\n• You develop high fever\n• Breathing becomes difficult\n• You cough up blood or unusual colored mucus\n• Symptoms worsen significantly",
          disclaimer: "Remember, I am your AROGYA MITRA chatbot providing supportive information, but I am not a doctor. For concerning symptoms, please consult medical professionals.",
          localGuidance: "📍 Visit Medical Locator to find nearby clinics\n💊 Check Jan Aushadhi stores for affordable medicines\n🩺 Consider telemedicine consultation for medical advice"
        },
        hi: {
          greeting: "मैं समझ सकता हूं कि आप सांस संबंधी परेशानी जैसे खांसी या सर्दी के लक्षणों से परेशान हैं।",
          symptoms: "ये लक्षण बहुत आम हैं, विशेषकर मौसम बदलने पर या जब हमारा शरीर छोटे संक्रमणों से लड़ रहा हो।",
          causes: "यह अक्सर इन कारणों से होता है:\n• सामान्य मौसमी बदलाव\n• छोटे वायरल संक्रमण\n• धूल या पर्यावरणीय परेशान करने वाले तत्व\n• सूखी हवा या एयर कंडीशनिंग\n• कभी-कभी तनाव से प्रतिरक्षा प्रभावित होना",
          selfCare: "कृपया ये सुखदायक उपाय आजमाएं:\n• गर्म पानी, हर्बल चाय या गर्म सूप पिएं\n• गर्म नमक के पानी से गरारे करें\n• भरपूर आराम करें\n• ह्यूमिडिफायर का उपयोग करें या भाप लें\n• अस्थायी रूप से ठंडे पेय और आइसक्रीम से बचें\n• खांसते समय मुंह ढकें",
          whenToConsult: "कृपया स्वास्थ्य प्रदाता से मिलें यदि:\n• लक्षण एक सप्ताह से अधिक बने रहें\n• आपको तेज बुखार हो\n• सांस लेना मुश्किल हो जाए\n• आप खून या असामान्य रंग का कफ निकालें\n• लक्षण काफी बदतर हो जाएं",
          disclaimer: "याद रखें, मैं आपका आरोग्य मित्र चैटबॉट हूं जो सहायक जानकारी प्रदान करता हूं, लेकिन मैं डॉक्टर नहीं हूं। चिंताजनक लक्षणों के लिए कृपया चिकित्सा पेशेवरों से सलाह लें।",
          localGuidance: "📍 निकटतम क्लिनिक खोजने के लिए Medical Locator देखें\n💊 किफायती दवाओं के लिए जन औषधि स्टोर जांचें\n🩺 चिकित्सा सलाह के लिए टेलीमेडिसिन परामर्श पर विचार करें"
        }
      }
    },
    {
      keywords: ['chest pain', 'छाती में दर्द', 'heart pain', 'दिल में दर्द', 'breathing difficulty', 'सांस लेने में कठिनाई', 'shortness of breath'],
      urgencyLevel: 'emergency',
      response: {
        en: {
          greeting: "I'm concerned about the chest discomfort you're experiencing.",
          symptoms: "Chest discomfort can have various causes, some of which may need immediate attention.",
          causes: "While it could be due to:\n• Muscle strain or stress\n• Acid reflux or digestive issues\n• Anxiety or panic\n• Minor respiratory irritation",
          selfCare: "If symptoms are mild, try:\n• Sit upright and breathe slowly and deeply\n• Loosen tight clothing\n• Try to stay calm\n• Avoid physical exertion",
          whenToConsult: "⚠️ **SEEK IMMEDIATE MEDICAL HELP** if you experience:\n• Severe or crushing chest pain\n• Pain spreading to arms, neck, or jaw\n• Severe difficulty breathing\n• Sweating with chest pain\n• Dizziness or fainting\n• Symptoms that are getting worse",
          disclaimer: "This is potentially serious. I am your AROGYA MITRA chatbot, not a doctor. Please seek immediate medical attention.",
          emergency: "🚨 **CALL 108 IMMEDIATELY** if symptoms are severe\n🏥 Go to the nearest hospital emergency department\n📞 Don't drive yourself - call for help"
        },
        hi: {
          greeting: "मैं आपकी छाती की परेशानी के बारे में चिंतित हूं।",
          symptoms: "छाती की परेशानी के कई कारण हो सकते हैं, जिनमें से कुछ को तत्काल ध्यान की आवश्यकता हो सकती है।",
          causes: "यह इन कारणों से हो सकता है:\n• मांसपेशियों में खिंचाव या तनाव\n• एसिडिटी या पाचन संबंधी समस्याएं\n• चिंता या घबराहट\n• सांस संबंधी छोटी परेशानी",
          selfCare: "यदि लक्षण हल्के हैं, तो कोशिश करें:\n• सीधे बैठें और धीरे-धीरे गहरी सांस लें\n• तंग कपड़े ढीले करें\n• शांत रहने की कोशिश करें\n• शारीरिक परिश्रम से बचें",
          whenToConsult: "⚠️ **तत्काल चिकित्सा सहायता लें** यदि आपको हो:\n• तेज या दबाने वाला छाती का दर्द\n• दर्द बाजू, गर्दन या जबड़े में फैलना\n• सांस लेने में गंभीर कठिनाई\n• छाती के दर्द के साथ पसीना\n• चक्कर आना या बेहोशी\n• लक्षण जो बदतर हो रहे हैं",
          disclaimer: "यह संभावित रूप से गंभीर है। मैं आपका आरोग्य मित्र चैटबॉट हूं, डॉक्टर नहीं। कृपया तत्काल चिकित्सा सहायता लें।",
          emergency: "🚨 **यदि लक्षण गंभीर हैं तो तुरंत 108 पर कॉल करें**\n🏥 निकटतम अस्पताल के आपातकालीन विभाग में जाएं\n📞 खुद गाड़ी न चलाएं - मदद के लिए कॉल करें"
        }
      }
    }
  ];

  static generateEmpathicResponse(userInput: string, language: 'en' | 'hi'): string {
    const input = userInput.toLowerCase();
    
    // Find matching symptom pattern
    for (const pattern of this.symptomPatterns) {
      if (pattern.keywords.some(keyword => input.includes(keyword.toLowerCase()))) {
        const response = pattern.response[language];
        
        let fullResponse = `${response.greeting}\n\n`;
        fullResponse += `${response.symptoms}\n\n`;
        fullResponse += `**${language === 'hi' ? 'संभावित कारण:' : 'Possible causes:'}**\n${response.causes}\n\n`;
        fullResponse += `**${language === 'hi' ? 'स्व-देखभाल:' : 'Self-care measures:'}**\n${response.selfCare}\n\n`;
        fullResponse += `**${language === 'hi' ? 'डॉक्टर से कब मिलें:' : 'When to see a doctor:'}**\n${response.whenToConsult}\n\n`;
        
        if (pattern.urgencyLevel === 'emergency' && response.emergency) {
          fullResponse += `${response.emergency}\n\n`;
        }
        
        if (response.localGuidance) {
          fullResponse += `**${language === 'hi' ? 'स्थानीय मार्गदर्शन:' : 'Local guidance:'}**\n${response.localGuidance}\n\n`;
        }
        
        fullResponse += `---\n${response.disclaimer}`;
        
        return fullResponse;
      }
    }

    // Default empathic response when no specific pattern matches
    return this.getDefaultEmpathicResponse(language);
  }

  static getDefaultEmpathicResponse(language: 'en' | 'hi'): string {
    if (language === 'hi') {
      return `मैं समझ सकता हूं कि आप स्वास्थ्य संबंधी चिंता में हैं।

**कृपया अपने लक्षणों को स्पष्ट रूप से बताएं** ताकि मैं बेहतर मार्गदर्शन दे सकूं। आप निम्नलिखित के बारे में पूछ सकते हैं:

• **आम समस्याएं:** बुखार, सिरदर्द, खांसी, पेट दर्द
• **स्वास्थ्य प्रबंधन:** मधुमेह, उच्च रक्तचाप की जानकारी
• **सरकारी योजनाएं:** आयुष्मान भारत, जन औषधि स्टोर
• **स्थानीय सेवाएं:** निकटतम अस्पताल, टेलीमेडिसिन

**याद रखें:** मैं केवल सामान्य जानकारी प्रदान करता हूं। गंभीर या लगातार लक्षणों के लिए कृपया डॉक्टर से सलाह लें।

🚨 **आपातकाल के लिए:** 108 पर कॉल करें`;
    }
    
    return `I understand you have health-related concerns, and I'm here to help.

**Please describe your symptoms clearly** so I can provide better guidance. You can ask about:

• **Common issues:** Fever, headache, cough, stomach pain
• **Health management:** Information about diabetes, blood pressure
• **Government schemes:** Ayushman Bharat, Jan Aushadhi stores  
• **Local services:** Nearest hospitals, telemedicine options

**Please remember:** I provide general information only. For serious or persistent symptoms, please consult with a doctor.

🚨 **For emergencies:** Call 108 immediately`;
  }

  static assessUrgency(input: string): 'low' | 'medium' | 'high' | 'emergency' {
    const emergencyKeywords = ['chest pain', 'छाती में दर्द', 'breathing difficulty', 'सांस लेने में कठिनाई', 'unconscious', 'बेहोश', 'severe bleeding', 'तेज खून बहना'];
    const highKeywords = ['high fever', 'तेज बुखार', 'severe pain', 'तेज दर्द', 'blood', 'खून'];
    const mediumKeywords = ['fever', 'बुखार', 'diarrhea', 'दस्त', 'vomiting', 'उल्टी'];
    
    const lowerInput = input.toLowerCase();
    
    if (emergencyKeywords.some(keyword => lowerInput.includes(keyword))) {
      return 'emergency';
    } else if (highKeywords.some(keyword => lowerInput.includes(keyword))) {
      return 'high';
    } else if (mediumKeywords.some(keyword => lowerInput.includes(keyword))) {
      return 'medium';
    }
    
    return 'low';
  }
}