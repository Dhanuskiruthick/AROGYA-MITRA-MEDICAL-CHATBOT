import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { User, Bot, AlertTriangle, Pill, Clock, DollarSign } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  analysis?: {
    possibleCauses: string[];
    severity: 'low' | 'medium' | 'high';
    recommendations: {
      medicines: Array<{
        name: string;
        generic: string;
        dosage: string;
        frequency: string;
        duration: string;
        sideEffects: string[];
        price: string;
      }>;
      homeRemedies: string[];
      whenToSeeDoctor: string[];
    };
    disclaimer: string;
    location?: string;
  };
  location?: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-2xl ${isUser ? 'order-1' : ''}`}>
        <Card className={`p-4 ${isUser ? 'bg-blue-600 text-white' : 'bg-white border-blue-100'}`}>
          {/* Message Content */}
          {message.content && (
            <p className={`${isUser ? 'text-white' : 'text-gray-700'} mb-2`}>
              {message.content}
            </p>
          )}

          {/* Analysis Results */}
          {message.analysis && (
            <div className="space-y-4">
              {/* Severity Indicator */}
              <div className="flex items-center gap-2">
                <Badge className={getSeverityColor(message.analysis.severity)}>
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {message.analysis.severity.toUpperCase()} PRIORITY
                </Badge>
              </div>

              {/* Possible Causes */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Possible Causes:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {message.analysis.possibleCauses.map((cause, index) => (
                    <li key={index} className="text-sm">{cause}</li>
                  ))}
                </ul>
              </div>

              {/* Recommended Medicines */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Pill className="w-4 h-4" />
                  Recommended Medicines:
                </h4>
                <div className="grid gap-3">
                  {message.analysis.recommendations.medicines.map((medicine, index) => (
                    <Card key={index} className="p-3 bg-blue-50 border-blue-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-semibold text-blue-900">{medicine.name}</h5>
                          <p className="text-sm text-blue-700">Generic: {medicine.generic}</p>
                        </div>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {medicine.price}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <strong>Dosage:</strong> {medicine.dosage}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <strong>Frequency:</strong> {medicine.frequency}
                        </div>
                        <div>
                          <strong>Duration:</strong> {medicine.duration}
                        </div>
                      </div>
                      
                      {medicine.sideEffects.length > 0 && (
                        <div className="text-xs text-gray-500">
                          <strong>Side Effects:</strong> {medicine.sideEffects.join(', ')}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              {/* Home Remedies */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Home Remedies:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {message.analysis.recommendations.homeRemedies.map((remedy, index) => (
                    <li key={index} className="text-sm">{remedy}</li>
                  ))}
                </ul>
              </div>

              {/* When to See Doctor */}
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Consult a doctor if:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {message.analysis.recommendations.whenToSeeDoctor.map((condition, index) => (
                      <li key={index} className="text-sm">{condition}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>

              {/* Disclaimer */}
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertDescription className="text-yellow-800 text-xs">
                  {message.analysis.disclaimer}
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Timestamp */}
          <div className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
            {formatTime(message.timestamp)}
          </div>
        </Card>
      </div>

      {isUser && (
        <div className="flex items-center justify-center w-8 h-8 bg-gray-400 rounded-full flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}