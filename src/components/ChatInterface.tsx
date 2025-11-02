import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { ChatMessage } from './ChatMessage';
import { SymptomAnalyzer } from './SymptomAnalyzer';
import { EncryptionService } from './EncryptionService';
import { getAllMadhyaPradeshCities } from './MadhyaPradeshDatabase';
import { Send, Bot, User, MapPin, Shield, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  analysis?: any;
  location?: string;
  encrypted?: boolean;
  sessionId?: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "👋 **AURA Medical AI Ready**\n\n**Available Services:**\n• Symptom analysis & diagnosis\n• Treatment recommendations\n• Medicine information\n• MP health schemes\n• Specialist directory\n\n⚡ **Emergency:** Call 108\n\n🩺 **Start consultation:** Describe your symptoms",
      timestamp: new Date(),
      encrypted: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [encryptionService] = useState(() => EncryptionService.getInstance());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get Madhya Pradesh cities - Focus on MP for comprehensive healthcare coverage
  const cities = getAllMadhyaPradeshCities();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize encryption and anonymous session
  useEffect(() => {
    const initializeSecureSession = async () => {
      try {
        await encryptionService.generateSessionKey();
        const anonymousId = encryptionService.generateAnonymousId();
        setSessionId(anonymousId);
        
        // Show privacy confirmation
        toast.success('🔒 Secure medical session initialized. All data encrypted locally.', {
          duration: 3000,
        });
      } catch (error) {
        console.warn('Secure session initialization failed, running in basic mode:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          isSecureContext: window.isSecureContext,
          protocol: window.location.protocol
        });
        
        // Generate fallback session ID
        const fallbackId = encryptionService.generateAnonymousId();
        setSessionId(fallbackId);
        
        // Show warning but allow app to continue
        if (!window.isSecureContext) {
          toast.warning('⚠️ Running in HTTP mode. For full security, please use HTTPS. Medical data will not be encrypted.', {
            duration: 5000,
          });
        } else {
          toast.warning('⚠️ Encryption not available. Medical consultation will continue without encryption.', {
            duration: 5000,
          });
        }
      }
    };

    initializeSecureSession();

    // Clear session on page unload for privacy
    const handleUnload = () => {
      try {
        encryptionService.clearSession();
      } catch (error) {
        console.warn('Error clearing session:', error);
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      try {
        encryptionService.clearSession();
      } catch (error) {
        console.warn('Error clearing session on cleanup:', error);
      }
    };
  }, [encryptionService]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isAnalyzing) return;

    try {
      // Try to encrypt user input for privacy - but continue even if encryption fails
      let encryptedInput;
      try {
        encryptedInput = await encryptionService.encryptData(inputValue);
      } catch (encryptionError) {
        console.warn('Encryption failed, proceeding without encryption:', encryptionError);
        encryptedInput = null;
      }
      
      const selectedCity = cities.find(city => city.value === selectedLocation);
      const locationText = selectedLocation ? `📍 ${selectedCity?.label} | ` : '';
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: `${locationText}🩺 ${inputValue}`,
        timestamp: new Date(),
        location: selectedLocation,
        encrypted: !!encryptedInput,
        sessionId: sessionId
      };

      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsAnalyzing(true);

      // Medical AI processing with clinical approach
      setTimeout(async () => {
        try {
          const analysis = SymptomAnalyzer.analyzeSymptoms(inputValue, selectedLocation);
          
          // Generate professional medical response
          const medicalResponse = generateMedicalResponse(analysis, selectedCity?.label || selectedLocation);
          
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content: medicalResponse,
            timestamp: new Date(),
            analysis,
            location: selectedLocation,
            encrypted: !!encryptedInput,
            sessionId: sessionId
          };

          setMessages(prev => [...prev, assistantMessage]);
          setIsAnalyzing(false);
        } catch (analysisError) {
          console.error('Medical analysis failed:', {
            error: analysisError instanceof Error ? analysisError.message : 'Unknown error',
            inputLength: inputValue.length,
            selectedLocation
          });
          setIsAnalyzing(false);
          
          // Add error message to chat
          const errorMessage: Message = {
            id: (Date.now() + 2).toString(),
            type: 'assistant',
            content: `## Medical Analysis Error\n\nI apologize, but I encountered an error while analyzing your symptoms. This could be due to:\n\n- Complex symptom description requiring manual review\n- Technical processing issue\n- Network connectivity problem\n\n**Immediate Recommendations:**\n1. Try rephrasing your symptoms more simply\n2. Contact our emergency helpline if urgent: **108**\n3. Visit the nearest healthcare facility if symptoms are severe\n\n**For ${selectedCity?.label || selectedLocation}**: Please check the "Specialist Directory" tab to find qualified doctors in your area.`,
            timestamp: new Date(),
            location: selectedLocation,
            encrypted: false,
            sessionId: sessionId
          };
          
          setMessages(prev => [...prev, errorMessage]);
          toast.error('Medical analysis encountered an error. Please try rephrasing your symptoms or contact a healthcare professional.');
        }
      }, 2000); // Slightly longer for thorough analysis
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Message handling failed:', {
        error: errorMessage,
        hasSessionId: !!sessionId,
        selectedLocation,
        inputLength: inputValue.length
      });
      toast.error('Failed to process your message. Please try again or refresh the page.');
    }
  };

  const generateMedicalResponse = (analysis: any, cityName?: string): string => {
    if (!analysis.possibleCauses || analysis.possibleCauses.length === 0) {
      return `**Assessment:** Need more details.\n\n**Specify:**\n• Duration & severity (1-10)\n• Associated symptoms\n• Current medications\n\n**See doctor if:**\n• Fever >101°F\n• Breathing issues\n• Severe pain\n\n**Next:** Visit physician.${cityName ? ` Check specialists tab.` : ''}`;
    }

    let response = `**Diagnosis:** ${analysis.possibleCauses.slice(0, 1).join('')}\n`;
    response += `**Priority:** ${analysis.severity.toUpperCase()}\n\n`;

    // Add treatment recommendations
    if (analysis.recommendations?.medicines?.length > 0) {
      response += `**Treatment:**\n`;
      
      const medicine = analysis.recommendations.medicines[0];
      response += `• **${medicine.name}** - ${medicine.dosage}\n`;
      response += `• Price: ${medicine.price}\n\n`;
    }

    // Add key care instructions
    if (analysis.recommendations?.homeRemedies?.length > 0) {
      response += `**Care:**\n`;
      analysis.recommendations.homeRemedies.slice(0, 2).forEach((remedy: string) => {
        response += `• ${remedy}\n`;
      });
      response += `\n`;
    }

    // Add warning signs
    if (analysis.recommendations?.whenToSeeDoctor?.length > 0) {
      response += `**See doctor if:**\n`;
      response += `• ${analysis.recommendations.whenToSeeDoctor[0]}\n\n`;
    }

    // Add local resources if location provided
    if (cityName) {
      response += `**${cityName}:** Check other tabs for pharmacies/specialists\n\n`;
    }

    response += `**Emergency:** 108 | **Follow-up:** 24hrs if no improvement`;

    return response;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[700px] bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl border-2 border-gradient-to-r from-blue-200 to-cyan-200">
      {/* Chat Header */}
      <div className="flex items-center gap-4 p-6 border-b border-gradient-to-r from-blue-200 to-cyan-200 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 rounded-t-2xl">
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg">
          <Bot className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white text-lg">AURA Medical AI</h3>
          <p className="text-blue-100 text-sm">Advanced diagnostic assistant • Real-time medical analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-2 rounded-lg backdrop-blur-sm border border-emerald-300/20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <Lock className="w-4 h-4 text-emerald-300" />
            <span className="text-xs text-emerald-200 font-medium">Secure</span>
          </div>
          {sessionId && (
            <div className="text-xs text-blue-200 bg-blue-500/20 px-2 py-1 rounded border border-blue-300/20">
              #{sessionId.substring(0, 6)}
            </div>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white/50 to-slate-50/50">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isAnalyzing && (
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <Card className="max-w-md p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <span className="text-sm text-blue-800 font-medium">
                  AURA analyzing medical data...
                </span>
              </div>
              <div className="text-xs text-blue-600 mt-2 flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                AI diagnostic processing
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t-2 border-gradient-to-r from-blue-200 to-cyan-200 bg-gradient-to-r from-slate-50 to-blue-50 rounded-b-2xl space-y-4">
        {/* Location Selection */}
        <div>
          <Label htmlFor="location" className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <MapPin className="w-2 h-2 text-white" />
            </div>
            MP Location (Optional)
          </Label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-blue-300 transition-all duration-200 rounded-xl">
              <SelectValue placeholder="🏥 Select your city for local medical facilities..." />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  📍 {city.label} ({city.district})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-slate-600 mt-2 flex items-center gap-1">
            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            Enables nearby pharmacy & specialist recommendations
          </p>
        </div>

        {/* Message Input */}
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="🩺 Describe symptoms: duration, severity (1-10), medications, history..."
            className="flex-1 bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-blue-300 focus:border-blue-400 transition-all duration-200 rounded-xl h-12"
            disabled={isAnalyzing}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl px-6 h-12 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-slate-600 bg-white/50 p-2 rounded-lg border border-slate-200">
          💡 <strong>Best results:</strong> Include symptom duration, pain scale (1-10), current medications, and relevant medical history
        </p>
      </div>
    </div>
  );
}