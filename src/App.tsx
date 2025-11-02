import React, { useState } from 'react';
import { WelcomeScreen } from './components/mobile/WelcomeScreen';
import { HomeDashboard } from './components/mobile/HomeDashboard';
import { ChatAssistant } from './components/mobile/ChatAssistantEnhanced';
import { MedicalLocator } from './components/mobile/MedicalLocator';
import { LabBooking } from './components/mobile/LabBooking';
import { Telemedicine } from './components/mobile/Telemedicine';
import { HealthRecords } from './components/mobile/HealthRecords';
import { PrivacyScreen } from './components/mobile/PrivacyScreen';
import { HealthInsuranceScreen } from './components/mobile/HealthInsuranceScreen';
import { GovernmentSchemesScreen } from './components/mobile/GovernmentSchemesScreen';
import { BottomNavigation } from './components/mobile/BottomNavigation';
import { Toaster } from './components/ui/sonner';
import arogyaMitraLogo from 'figma:asset/36e97157d20f426c5ec927e5c3cb9ad04a2e91df.png';

type Screen = 'welcome' | 'home' | 'chat' | 'locator' | 'labs' | 'telemedicine' | 'records' | 'privacy' | 'insurance' | 'schemes';
type Language = 'en' | 'hi';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [showWelcome, setShowWelcome] = useState(true);
  const [userConsent, setUserConsent] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setShowWelcome(false);
    setCurrentScreen('chat'); // Start with chat for immediate assistance
  };

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleConsentChange = (consent: boolean) => {
    setUserConsent(consent);
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
        <WelcomeScreen onLanguageSelect={handleLanguageSelect} />
        <Toaster position="top-center" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 pb-20">
      {/* Status Bar Simulation */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm px-4 py-1 flex justify-between items-center">
        <span>9:41 AM</span>
        <span>●●●●○</span>
        <span>🔋 84%</span>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {currentScreen === 'home' && <HomeDashboard language={selectedLanguage} onNavigate={handleScreenChange} />}
        {currentScreen === 'chat' && <ChatAssistant language={selectedLanguage} userConsent={userConsent} onConsentChange={handleConsentChange} />}
        {currentScreen === 'locator' && <MedicalLocator language={selectedLanguage} />}
        {currentScreen === 'labs' && <LabBooking language={selectedLanguage} userConsent={userConsent} />}
        {currentScreen === 'telemedicine' && <Telemedicine language={selectedLanguage} userConsent={userConsent} />}
        {currentScreen === 'records' && <HealthRecords language={selectedLanguage} userConsent={userConsent} />}
        {currentScreen === 'privacy' && <PrivacyScreen language={selectedLanguage} userConsent={userConsent} onConsentChange={handleConsentChange} />}
        {currentScreen === 'insurance' && <HealthInsuranceScreen language={selectedLanguage} onBack={() => handleScreenChange('home')} />}
        {currentScreen === 'schemes' && <GovernmentSchemesScreen language={selectedLanguage} onBack={() => handleScreenChange('home')} />}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen={currentScreen} onScreenChange={handleScreenChange} language={selectedLanguage} />

      {/* Toast Notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'linear-gradient(135deg, #ffffff 0%, #ecfeff 100%)',
            color: '#0f172a',
            border: '2px solid #06b6d4',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '500',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          },
          duration: 3000
        }}
      />
    </div>
  );
}