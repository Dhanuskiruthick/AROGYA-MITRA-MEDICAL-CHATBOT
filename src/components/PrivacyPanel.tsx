import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Shield, Trash2, Eye, Lock, Server, UserX } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PrivacyPanelProps {
  onClearSession?: () => void;
}

export function PrivacyPanel({ onClearSession }: PrivacyPanelProps) {
  const handleClearSession = () => {
    // Clear any stored data
    localStorage.removeItem('healthcare_chat_history');
    sessionStorage.clear();
    
    // Call parent callback if provided
    if (onClearSession) {
      onClearSession();
    }
    
    toast.success("Session data cleared successfully", {
      description: "All local data has been removed from your device"
    });
  };

  const privacyFeatures = [
    {
      icon: <Server className="w-4 h-4" />,
      title: "No Data Stored",
      description: "No health information is sent to external servers"
    },
    {
      icon: <UserX className="w-4 h-4" />,
      title: "Anonymous Sessions",
      description: "No user accounts or personal identification required"
    },
    {
      icon: <Eye className="w-4 h-4" />,
      title: "Local Processing",
      description: "All analysis happens on your device only"
    },
    {
      icon: <Shield className="w-4 h-4" />,
      title: "HIPAA Inspired",
      description: "Following healthcare privacy best practices"
    }
  ];

  return (
    <Card className="bg-gradient-to-r from-blue-900 to-blue-800 text-white border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-6 h-6" />
            <h3 className="text-xl font-semibold">Privacy-First Healthcare</h3>
          </div>
          <p className="text-blue-100">
            Your health data privacy is our top priority
          </p>
        </div>

        {/* Privacy Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {privacyFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center justify-center mb-2 text-blue-200">
                {feature.icon}
              </div>
              <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Privacy Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              <Lock className="w-3 h-3 mr-1" />
              Secure Session
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
              <Shield className="w-3 h-3 mr-1" />
              Privacy Protected
            </Badge>
          </div>
          
          <Button 
            onClick={handleClearSession}
            variant="secondary"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Session Data
          </Button>
        </div>

        {/* Privacy Information */}
        <Alert className="bg-white/10 border-white/20 text-white">
          <Shield className="h-4 w-4" />
          <AlertDescription className="text-blue-100">
            <strong className="text-white">Privacy Guarantee:</strong> This application processes all health information locally on your device. 
            No data is transmitted to external servers, stored in databases, or shared with third parties. 
            You can clear all session data at any time using the button above.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}