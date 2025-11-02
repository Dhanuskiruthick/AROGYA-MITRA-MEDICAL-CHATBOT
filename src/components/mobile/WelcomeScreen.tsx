import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Heart, Shield, Globe, ChevronRight, Stethoscope, Palette, Lock, UserCheck, UserX } from 'lucide-react';
import arogyaMitraLogo from 'figma:asset/36e97157d20f426c5ec927e5c3cb9ad04a2e91df.png';

type Language = 'en' | 'hi';
type Theme = 'healthcare' | 'nature' | 'professional';
type LoginMode = 'anonymous' | 'secure';

interface WelcomeScreenProps {
  onLanguageSelect: (language: Language) => void;
}

const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' }
];

const themes = [
  { 
    id: 'healthcare' as Theme, 
    name: 'Healthcare Blue', 
    description: 'Calming medical blues and greens',
    gradient: 'from-cyan-500 to-blue-500',
    preview: 'bg-gradient-to-r from-cyan-100 to-blue-100'
  },
  { 
    id: 'nature' as Theme, 
    name: 'Nature Green', 
    description: 'Soothing natural greens',
    gradient: 'from-emerald-500 to-teal-500',
    preview: 'bg-gradient-to-r from-emerald-100 to-teal-100'
  },
  { 
    id: 'professional' as Theme, 
    name: 'Professional Gray', 
    description: 'Clean professional design',
    gradient: 'from-slate-500 to-gray-500',
    preview: 'bg-gradient-to-r from-slate-100 to-gray-100'
  }
];

export function WelcomeScreen({ onLanguageSelect }: WelcomeScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [selectedTheme, setSelectedTheme] = useState<Theme>('healthcare');
  const [loginMode, setLoginMode] = useState<LoginMode>('anonymous');
  const [currentStep, setCurrentStep] = useState<'welcome' | 'language' | 'theme' | 'login' | 'privacy'>('welcome');

  const translations = {
    en: {
      welcome: "Welcome to",
      subtitle: "Your Personal Medical Assistant",
      friendlyGreeting: "We're here to help you with trusted healthcare guidance, available 24/7",
      selectLanguage: "Select Your Language",
      chooseTheme: "Choose Your Theme",
      loginOptions: "Privacy Options",
      privacyHighlight: "Your information is stored securely and only with your consent.",
      anonymous: "Anonymous Mode",
      anonymousDesc: "Use without creating an account",
      secure: "Secure Account",
      secureDesc: "Create account for cloud sync",
      continue: "Continue",
      skip: "Skip for now",
      startConsultation: "Start Consultation",
      back: "Back",
      next: "Next"
    },
    hi: {
      welcome: "आपका स्वागत है",
      subtitle: "आपका व्यक्तिगत चिकित्सा सहायक",
      friendlyGreeting: "हम यहाँ आपकी विश्वसनीय स्वास्थ्य सेवा मार्गदर्शन में मदद के लिए हैं, 24/7 उपलब्ध",
      selectLanguage: "अपनी भाषा चुनें",
      chooseTheme: "अपनी थीम चुनें",
      loginOptions: "गोपनीयता विकल्प",
      privacyHighlight: "आपकी जानकारी सुरक्षित रूप से संग्रहीत की जाती है और केवल आपकी सहमति से।",
      anonymous: "गुमनाम मोड",
      anonymousDesc: "खाता बनाए बिना उपयोग करें",
      secure: "सुरक्षित खाता",
      secureDesc: "क्लाउड सिंक के लिए खाता बनाएं",
      continue: "जारी रखें",
      skip: "अभी के लिए छोड़ें",
      startConsultation: "परामर्श शुरू करें",
      back: "वापस",
      next: "अगला"
    }
  };

  const t = translations[selectedLanguage];

  // Welcome Step
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen p-6 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8 mt-8 flex-1">
          <div className="flex items-center justify-center mb-6">
            <img 
              src={arogyaMitraLogo} 
              alt="Arogya Mitra Logo" 
              className="w-32 h-32 object-contain drop-shadow-lg"
            />
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-cyan-200 mb-8">
            <h1 className="text-3xl font-bold text-cyan-900 mb-2">{t.welcome}</h1>
            <h2 className="text-3xl font-bold text-cyan-900 mb-4">Arogya Mitra</h2>
            <p className="text-lg text-blue-700 mb-4">{t.subtitle}</p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-cyan-600 bg-cyan-50 rounded-full px-4 py-2">
              <Stethoscope className="w-4 h-4" />
              <span>Citizen-Friendly Healthcare Support</span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-cyan-100 text-center">
            <p className="text-base text-gray-700 leading-relaxed">
              {t.friendlyGreeting}
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="space-y-4">
          <Button 
            onClick={() => setCurrentStep('language')}
            className="w-full h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-lg font-semibold rounded-2xl shadow-lg"
          >
            <span>{t.continue}</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Features Preview */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-cyan-100">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-4 h-4 text-cyan-600" />
                </div>
                <p className="text-xs text-gray-600 font-medium">HIPAA Compliant</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600 font-medium">24/7 Support</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Stethoscope className="w-4 h-4 text-cyan-600" />
                </div>
                <p className="text-xs text-gray-600 font-medium">Medical Assistant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Language Selection Step
  if (currentStep === 'language') {
    return (
      <div className="min-h-screen p-6 flex flex-col">
        <div className="text-center mb-6 mt-8">
          <img 
            src={arogyaMitraLogo} 
            alt="Arogya Mitra" 
            className="w-20 h-20 object-contain mx-auto mb-4 drop-shadow-lg"
          />
          <h1 className="text-2xl font-bold text-cyan-900">Arogya Mitra</h1>
        </div>

        <div className="flex-1">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-cyan-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{t.selectLanguage}</h2>
            </div>

            <div className="space-y-3">
              {languages.map((language) => (
                <Card 
                  key={language.code}
                  className={`cursor-pointer transition-all duration-200 border-2 ${
                    selectedLanguage === language.code 
                      ? 'border-cyan-500 bg-cyan-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-cyan-300 hover:bg-cyan-50'
                  }`}
                  onClick={() => setSelectedLanguage(language.code)}
                >
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{language.name}</p>
                      <p className="text-base text-gray-600">{language.nativeName}</p>
                    </div>
                    {selectedLanguage === language.code && (
                      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Button 
            onClick={() => setCurrentStep('theme')}
            className="w-full h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-lg font-semibold rounded-2xl shadow-lg"
          >
            <span>{t.next}</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => setCurrentStep('welcome')}
              variant="outline"
              className="flex-1 h-12 rounded-2xl"
            >
              {t.back}
            </Button>
            <Button 
              onClick={() => onLanguageSelect(selectedLanguage)}
              variant="ghost"
              className="flex-1 h-12 text-gray-600"
            >
              {t.skip}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Theme Selection Step
  if (currentStep === 'theme') {
    return (
      <div className="min-h-screen p-6 flex flex-col">
        <div className="text-center mb-6 mt-8">
          <img 
            src={arogyaMitraLogo} 
            alt="Arogya Mitra" 
            className="w-20 h-20 object-contain mx-auto mb-4 drop-shadow-lg"
          />
          <h1 className="text-2xl font-bold text-cyan-900">Arogya Mitra</h1>
        </div>

        <div className="flex-1">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-cyan-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{t.chooseTheme}</h2>
            </div>

            <div className="space-y-4">
              {themes.map((theme) => (
                <Card 
                  key={theme.id}
                  className={`cursor-pointer transition-all duration-200 border-2 ${
                    selectedTheme === theme.id 
                      ? 'border-cyan-500 bg-cyan-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-cyan-300 hover:bg-cyan-50'
                  }`}
                  onClick={() => setSelectedTheme(theme.id)}
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-8 rounded-lg ${theme.preview} border-2 border-white shadow-sm`}></div>
                      <div>
                        <p className="text-lg font-semibold text-gray-800">{theme.name}</p>
                        <p className="text-sm text-gray-600">{theme.description}</p>
                      </div>
                    </div>
                    {selectedTheme === theme.id && (
                      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Button 
            onClick={() => setCurrentStep('privacy')}
            className="w-full h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-lg font-semibold rounded-2xl shadow-lg"
          >
            <span>{t.next}</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => setCurrentStep('language')}
              variant="outline"
              className="flex-1 h-12 rounded-2xl"
            >
              {t.back}
            </Button>
            <Button 
              onClick={() => onLanguageSelect(selectedLanguage)}
              variant="ghost"
              className="flex-1 h-12 text-gray-600"
            >
              {t.skip}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Privacy & Login Options Step
  return (
    <div className="min-h-screen p-6 flex flex-col">
      <div className="text-center mb-6 mt-8">
        <img 
          src={arogyaMitraLogo} 
          alt="Arogya Mitra" 
          className="w-20 h-20 object-contain mx-auto mb-4 drop-shadow-lg"
        />
        <h1 className="text-2xl font-bold text-cyan-900">Arogya Mitra</h1>
      </div>

      <div className="flex-1">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-cyan-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{t.loginOptions}</h2>
          </div>

          {/* Privacy Highlight */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-800 mb-1">Privacy First</p>
                <p className="text-sm text-green-700">{t.privacyHighlight}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card 
              className={`cursor-pointer transition-all duration-200 border-2 ${
                loginMode === 'anonymous' 
                  ? 'border-cyan-500 bg-cyan-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-cyan-300 hover:bg-cyan-50'
              }`}
              onClick={() => setLoginMode('anonymous')}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <UserX className="w-6 h-6 text-cyan-600" />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{t.anonymous}</p>
                    <p className="text-sm text-gray-600">{t.anonymousDesc}</p>
                  </div>
                </div>
                {loginMode === 'anonymous' && (
                  <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </Card>

            <Card 
              className={`cursor-pointer transition-all duration-200 border-2 ${
                loginMode === 'secure' 
                  ? 'border-cyan-500 bg-cyan-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-cyan-300 hover:bg-cyan-50'
              }`}
              onClick={() => setLoginMode('secure')}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <UserCheck className="w-6 h-6 text-cyan-600" />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{t.secure}</p>
                    <p className="text-sm text-gray-600">{t.secureDesc}</p>
                  </div>
                </div>
                {loginMode === 'secure' && (
                  <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Button 
          onClick={() => onLanguageSelect(selectedLanguage)}
          className="w-full h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-lg font-semibold rounded-2xl shadow-lg"
        >
          <span>{t.startConsultation}</span>
          <Stethoscope className="w-5 h-5 ml-2" />
        </Button>
        
        <Button 
          onClick={() => setCurrentStep('theme')}
          variant="outline"
          className="w-full h-12 rounded-2xl"
        >
          {t.back}
        </Button>
      </div>
    </div>
  );
}