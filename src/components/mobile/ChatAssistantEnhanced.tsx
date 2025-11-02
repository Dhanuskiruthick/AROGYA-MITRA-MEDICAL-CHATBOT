import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Send, Bot, User, Mic, Shield, MapPin, Clock, Cloud, CloudOff, AlertTriangle, Phone, Heart } from 'lucide-react';
import arogyaMitraLogo from 'figma:asset/36e97157d20f426c5ec927e5c3cb9ad04a2e91df.png';
import { ComprehensiveDiseaseDatabase } from '../ComprehensiveDiseaseDatabase';
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
    suggestions: ["Fever", "Headache", "Cough", "Stomach pain", "Diabetes info", "TB symptoms", "Jan Aushadhi", "Ayushman Bharat"],
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
    suggestions: ["बुखार", "सिरदर्द", "खाँसी", "पेट दर्द", "मधुमेह जानकारी", "टीबी के लक्षण", "जन औषधि", "आयुष्मान भारत"],
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
        ? `🏥 **आयुष्मान भारत योजना**\n\nआयुष्मान भारत दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना है।\n\n**मुख्य लाभ:**\n• प्रति परिवार ₹5 लाख का कवरेज\n• 1,393+ चिकित्सा प्रक्रियाएं कवर\n• कैशलेस उपचार\n• पूर्व-मौजूदा बीमारियां कवर\n\n**पात्रता जांचने के लिए:**\n📞 हेल्पलाइन: 14555\n🌐 वेबसाइट: pmjay.gov.in\n\n📍 हमारे Health Insurance सेक्शन में विस्तृत जानकारी देखें।\n\n---\n🩺 **याद रखें:** मैं आपका आरोग्य मित्र चैटबॉट हूं, डॉक्टर नहीं।`
        : `🏥 **Ayushman Bharat Scheme**\n\nAyushman Bharat is the world's largest health insurance scheme.\n\n**Key Benefits:**\n• ₹5 lakh coverage per family\n• 1,393+ medical procedures covered\n• Cashless treatment\n• Pre-existing conditions covered\n\n**To check eligibility:**\n📞 Helpline: 14555\n🌐 Website: pmjay.gov.in\n\n📍 Visit our Health Insurance section for detailed information.\n\n---\n🩺 **Remember:** I am your AROGYA MITRA chatbot, not a doctor.`;
    }

    if (lowerInput.includes('jan aushadhi') || lowerInput.includes('जन औषधि')) {
      return language === 'hi'
        ? `💊 **जन औषधि स्टोर**\n\nकिफायती जेनेरिक दवाओं के लिए सरकारी स्टोर।\n\n**मुख्य लाभ:**\n• ब्रांडेड दवाओं से 50-90% कम कीमत\n• WHO-GMP प्रमाणित गुणवत्ता\n• 1,600+ दवाएं उपलब्ध\n• कोई सदस्यता की जरूरत नहीं\n\n**स्टोर खोजने के लिए:**\n📞 हेल्पलाइन: 1800-180-5253\n🌐 वेबसाइट: janaushadhi.gov.in\n\n📍 हमारे Government Schemes सेक्शन में और जानकारी देखें।\n\n---\n🩺 **याद रखें:** मैं आपका आरोग्य मित्र चैटबॉट हूं, डॉक्टर नहीं।`
        : `💊 **Jan Aushadhi Stores**\n\nGovernment stores for affordable generic medicines.\n\n**Key Benefits:**\n• 50-90% cheaper than branded medicines\n• WHO-GMP certified quality\n• 1,600+ medicines available\n• No membership required\n\n**To find stores:**\n📞 Helpline: 1800-180-5253\n🌐 Website: janaushadhi.gov.in\n\n📍 Visit our Government Schemes section for more information.\n\n---\n🩺 **Remember:** I am your AROGYA MITRA chatbot, not a doctor.`;
    }

    // Use the new empathic response system for symptom queries
    const urgencyLevel = EmpathicResponseSystem.assessUrgency(input);
    
    // Check if input contains symptom-related keywords
    const symptomKeywords = [
      'fever', 'बुखार', 'headache', 'सिरदर्द', 'cough', 'खांसी', 
      'pain', 'दर्द', 'sick', 'बीमार', 'hurt', 'problem', 'समस्या',
      'diarrhea', 'दस्त', 'vomiting', 'उल्टी', 'chest', 'छाती',
      'breathing', 'सांस', 'stomach', 'पेट', 'unwell', 'परेशान',
      'feel bad', 'feeling', 'महसूस', 'loose motions', 'लूज मोशन'
    ];
    
    const hasSymptoms = symptomKeywords.some(keyword => 
      lowerInput.includes(keyword.toLowerCase())
    );
    
    if (hasSymptoms) {
      // Generate empathic response following the specified pattern
      const empathicResponse = EmpathicResponseSystem.generateEmpathicResponse(input, language);
      return empathicResponse;
    }

    // Emergency assessment
    if (urgencyLevel === 'emergency') {
      return language === 'hi'
        ? "🚨 **आपातकालीन स्थिति**\n\nआपके लक्षण गंभीर हो सकते हैं। कृपया तुरंत:\n• 108 पर कॉल करें\n• निकटतम अस्पताल जाएं\n• देरी न करें\n\n⚠️ यह जीवन रक्षक हो सकता है!\n\n---\n🩺 **याद रखें**: मैं आपका आरोग्य मित्र चैटबॉट हूं, डॉक्टर नहीं। तत्काल चिकित्सा सहायता लें।"
        : "🚨 **EMERGENCY SITUATION**\n\nYour symptoms may be serious. Please immediately:\n• Call 108\n• Go to nearest hospital\n• Don't delay\n\n⚠️ This could be life-saving!\n\n---\n🩺 **Remember**: I am your AROGYA MITRA chatbot, not a doctor. Seek immediate medical help.";
    }

    // Use comprehensive disease database for specific conditions
    const words = lowerInput.split(' ');
    const potentialDiseases = ComprehensiveDiseaseDatabase.searchBySymptoms(words);
    
    if (potentialDiseases.length > 0) {
      const topMatch = potentialDiseases[0];
      
      const response = language === 'hi' 
        ? `🩺 **${topMatch.hindiName || topMatch.disease.toUpperCase()} - सामान्य जानकारी**\n\n**संभावित कारण:**\n${topMatch.causes.slice(0,3).map(cause => `• ${cause}`).join('\n')}\n\n**सामान्य लक्षण:**\n${topMatch.symptoms ? topMatch.symptoms.slice(0,4).map(symptom => `• ${symptom}`).join('\n') : 'विभिन्न लक्षण हो सकते हैं'}\n\n**महत्वपूर्ण सलाह:**\n• यह केवल सामान्य जानकारी है\n• स्व-दवा न करें\n• डॉक्टर से सलाह जरूर लें\n\n📍 **निकटतम चिकित्सा सुविधा:** Medical Locator का उपयोग करें\n🩺 **ऑनलाइन सलाह:** Telemedicine सेक्शन देखें\n\n---\n🩺 **याद रखें:** मैं आपका आरोग्य मित्र चैटबॉट हूं, डॉक्टर नहीं।`
        : `🩺 **${topMatch.disease.toUpperCase()} - General Information**\n\n**Possible causes:**\n${topMatch.causes.slice(0,3).map(cause => `• ${cause}`).join('\n')}\n\n**Common symptoms:**\n${topMatch.symptoms ? topMatch.symptoms.slice(0,4).map(symptom => `• ${symptom}`).join('\n') : 'Various symptoms may occur'}\n\n**Important advice:**\n• This is general information only\n• Do not self-medicate\n• Please consult a doctor\n\n📍 **Find nearest facility:** Use Medical Locator\n🩺 **Online consultation:** Visit Telemedicine section\n\n---\n🩺 **Remember:** I am your AROGYA MITRA chatbot, not a doctor.`;
      
      return response;
    }

    // Default empathic response when no specific pattern matches
    return EmpathicResponseSystem.getDefaultEmpathicResponse(language);
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

    // Rule-based response with empathic system
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