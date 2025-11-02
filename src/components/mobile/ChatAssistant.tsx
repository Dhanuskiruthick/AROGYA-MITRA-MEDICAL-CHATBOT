import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Send, Bot, User, Mic, Shield, MapPin, Clock, Cloud, CloudOff, AlertTriangle } from 'lucide-react';
import arogyaMitraLogo from 'figma:asset/36e97157d20f426c5ec927e5c3cb9ad04a2e91df.png';
import { ComprehensiveDiseaseDatabase } from '../ComprehensiveDiseaseDatabase';
import { SymptomAnalyzer } from '../SymptomAnalyzer';

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
    disclaimer: "I am just a chatbot medical assistant, not a doctor.",
    openingMessage: "HI! I am your Arogya Mitra medical assistant, how can I help you🩺?",
    privacyMessage: "Enable cloud storage to save your chat history across devices",
    placeholder: "Describe your symptoms...",
    voiceInput: "Voice Input",
    suggestions: ["Fever", "Headache", "Stomach pain", "Cough", "Cold", "Diabetes"],
    cloudStorage: "Cloud Storage",
    enableCloud: "Save my chat history",
    confidential: "All data is encrypted and secure",
    nearbyFacility: "📍 Nearest medical facility",
    emergencyContact: "🚨 For emergency, call 108"
  },
  hi: {
    title: "आरोग्य मित्र",
    subtitle: "चिकित्सा सहायक चैटबॉट",
    disclaimer: "मैं केवल एक चैटबॉट चिकित्सा सहायक हूं, डॉक्टर नहीं।",
    openingMessage: "नमस्ते! मैं आपका आरोग्य मित्र चिकित्सा सहायक हूं, मैं आपकी कैसे मदद कर सकता हूं🩺?",
    privacyMessage: "अपने चैट इतिहास को उपकरणों में सहेजने के लिए क्लाउड स्टोरेज सक्षम करें",
    placeholder: "अपने लक्षण बताएं...",
    voiceInput: "आवाज़ इनपुट",
    suggestions: ["बुखार", "सिरदर्द", "पेट दर्द", "खाँसी", "सर्दी", "मधुमेह"],
    cloudStorage: "क्लाउड स्टोरेज",
    enableCloud: "मेरे चैट इतिहास को सहेजें",
    confidential: "सभी डेटा एन्क्रिप्टेड और सुरक्षित है",
    nearbyFacility: "📍 निकटतम चिकित्सा सुविधा",
    emergencyContact: "🚨 आपातकाल के लिए, 108 कॉल करें"
  }
};

// Rule-based response system
const medicalRules = {
  fever: {
    en: "For fever:\n• Drink plenty of fluids\n• Rest and stay cool\n• Take paracetamol if needed\n• See a doctor if fever persists over 3 days\n\n📍 Nearest clinic: 1.2 km away",
    hi: "बुखार के लिए:\n• भरपूर तरल पदार्थ पिएं\n• आराम करें और ठंडे रहें\n• जरूरत पड़ने पर पैरासिटामोल लें\n• अगर बुखार 3 दिन से ज्यादा रहे तो डॉक्टर से मिलें\n\n📍 निकटतम क्लिनिक: 1.2 किमी दूर"
  },
  headache: {
    en: "For headache:\n• Rest in a quiet, dark room\n• Apply cold compress\n• Stay hydrated\n• Avoid stress\n• Consult doctor if severe or persistent\n\n💊 Available at nearby pharmacy",
    hi: "सिरदर्द के लिए:\n• शांत, अंधेरे कमरे में आराम करें\n• ठंडी पट्टी लगाएं\n• पानी पिएं\n• तनाव से बचें\n• अगर तेज या लगातार हो तो डॉक्टर से सलाह लें\n\n💊 नजदीकी फार्मेसी में उपलब्ध"
  },
  stomach: {
    en: "For stomach pain:\n• Eat light, bland foods\n• Avoid spicy/oily food\n• Stay hydrated\n• Rest and avoid stress\n• See doctor if pain is severe\n\n⚠️ Visit hospital if severe abdominal pain",
    hi: "पेट दर्द के लिए:\n• हल्का, सादा भोजन करें\n• मसालेदार/तेल वाला खाना न खाएं\n• पानी पिएं\n• आराम करें और तनाव से बचें\n• अगर दर्द तेज हो तो डॉक्टर से मिलें\n\n⚠️ तेज पेट दर्द में अस्पताल जाएं"
  },
  cough: {
    en: "For cough:\n• Drink warm water with honey\n• Stay hydrated\n• Use humidifier or steam\n• Avoid cold foods\n• See doctor if persists over 2 weeks\n\n🏥 Chest specialist available at district hospital",
    hi: "खाँसी के लिए:\n• शहद के साथ गर्म पानी पिएं\n• पानी पिएं\n• ह्यूमिडिफायर या भाप का उपयोग करें\n• ठंडा खाना न खाएं\n• अगर 2 हफ्ते से ज्यादा रहे तो डॉक्टर से मिलें\n\n🏥 जिला अस्पताल में छाती विशेषज्ञ उपलब्ध"
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
    
    // Check for symptoms and provide rule-based responses
    if (lowerInput.includes('fever') || lowerInput.includes('बुखार')) {
      return medicalRules.fever[language];
    } else if (lowerInput.includes('headache') || lowerInput.includes('सिरदर्द')) {
      return medicalRules.headache[language];
    } else if (lowerInput.includes('stomach') || lowerInput.includes('पेट')) {
      return medicalRules.stomach[language];
    } else if (lowerInput.includes('cough') || lowerInput.includes('खाँसी')) {
      return medicalRules.cough[language];
    } else {
      return language === 'hi' 
        ? "कृपया अपने लक्षण स्पष्ट रूप से बताएं। मैं बुखार, सिरदर्द, पेट दर्द, खाँसी आदि के बारे में सलाह दे सकता हूं।\n\n⚠️ याद रखें: मैं केवल एक चैटबॉट हूं, डॉक्टर नहीं।"
        : "Please describe your symptoms clearly. I can provide advice about fever, headache, stomach pain, cough, etc.\n\n⚠️ Remember: I am just a chatbot, not a doctor.";
    }
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
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-6 text-white">
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
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
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