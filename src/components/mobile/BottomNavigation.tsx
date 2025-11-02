import React from 'react';
import { 
  MessageCircle, 
  MapPin, 
  FileText, 
  Video, 
  Shield 
} from 'lucide-react';

type Screen = 'welcome' | 'home' | 'chat' | 'locator' | 'labs' | 'telemedicine' | 'records' | 'privacy';
type Language = 'en' | 'hi';

interface BottomNavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  language: Language;
}

const translations = {
  en: {
    chat: "Chat",
    locator: "Find",
    labs: "Labs", 
    telemedicine: "Consult",
    privacy: "Privacy"
  },
  hi: {
    chat: "चैट",
    locator: "खोजें",
    labs: "लैब्स",
    telemedicine: "परामर्श",
    privacy: "निजता"
  }
};

const navItems = [
  { id: 'chat' as Screen, icon: MessageCircle, label: 'chat' },
  { id: 'locator' as Screen, icon: MapPin, label: 'locator' },
  { id: 'labs' as Screen, icon: FileText, label: 'labs' },
  { id: 'telemedicine' as Screen, icon: Video, label: 'telemedicine' },
  { id: 'privacy' as Screen, icon: Shield, label: 'privacy' }
];

export function BottomNavigation({ currentScreen, onScreenChange, language }: BottomNavigationProps) {
  const t = translations[language] || translations.en;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 shadow-2xl">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 min-w-[60px] ${
                isActive 
                  ? 'bg-gradient-to-t from-blue-500 to-green-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <IconComponent className={`w-5 h-5 mb-1 ${isActive ? 'drop-shadow-sm' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
                {t[item.label as keyof typeof t]}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-white rounded-full shadow-sm"></div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-2 bg-white"></div>
    </div>
  );
}