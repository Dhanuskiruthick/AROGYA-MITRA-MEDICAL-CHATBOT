import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Clock, 
  Pill, 
  Calendar, 
  Stethoscope, 
  Bell,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

type Language = 'en' | 'hi' | 'bundeli' | 'malvi' | 'nimadi' | 'bagheli';
type ReminderType = 'medicine' | 'appointment' | 'vaccination' | 'checkup';

interface Reminder {
  id: string;
  type: ReminderType;
  title: string;
  titleHi: string;
  time: string;
  frequency: string;
  frequencyHi: string;
  nextDue: string;
  isActive: boolean;
  color: string;
}

interface RemindersScreenProps {
  language: Language;
}

const sampleReminders: Reminder[] = [
  {
    id: '1',
    type: 'medicine',
    title: 'Paracetamol 500mg',
    titleHi: 'पैरासिटामोल 500मिग्रा',
    time: '8:00 AM',
    frequency: 'Twice daily',
    frequencyHi: 'दिन में दो बार',
    nextDue: 'In 2 hours',
    isActive: true,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    type: 'appointment',
    title: 'Dr. Sharma - Cardiology',
    titleHi: 'डॉ. शर्मा - हृदय रोग',
    time: '2:00 PM',
    frequency: 'Tomorrow',
    frequencyHi: 'कल',
    nextDue: 'Tomorrow at 2 PM',
    isActive: true,
    color: 'bg-green-500'
  },
  {
    id: '3',
    type: 'vaccination',
    title: 'COVID-19 Booster',
    titleHi: 'COVID-19 बूस्टर',
    time: '10:00 AM',
    frequency: 'Next week',
    frequencyHi: 'अगले हफ्ते',
    nextDue: 'In 5 days',
    isActive: true,
    color: 'bg-purple-500'
  },
  {
    id: '4',
    type: 'checkup',
    title: 'Blood Pressure Check',
    titleHi: 'रक्तचाप जांच',
    time: '9:00 AM',
    frequency: 'Weekly',
    frequencyHi: 'साप्ताहिक',
    nextDue: 'In 3 days',
    isActive: false,
    color: 'bg-orange-500'
  }
];

const translations = {
  en: {
    title: "Health Reminders",
    subtitle: "Never miss your medications or appointments",
    addReminder: "Add Reminder",
    upcoming: "Upcoming",
    overdue: "Overdue",
    completed: "Completed",
    medicine: "Medicine",
    appointment: "Appointment", 
    vaccination: "Vaccination",
    checkup: "Health Checkup",
    nextDue: "Next due",
    active: "Active",
    inactive: "Inactive",
    edit: "Edit",
    delete: "Delete",
    markComplete: "Mark Complete",
    noReminders: "No reminders set",
    addFirst: "Add your first reminder to get started",
    notifications: "🔔 Push notifications enabled in selected language"
  },
  hi: {
    title: "स्वास्थ्य रिमाइंडर",
    subtitle: "अपनी दवाएं या अपॉइंटमेंट कभी न भूलें",
    addReminder: "रिमाइंडर जोड़ें",
    upcoming: "आगामी",
    overdue: "बकाया",
    completed: "पूर्ण",
    medicine: "दवा",
    appointment: "अपॉइंटमेंट",
    vaccination: "टीकाकरण", 
    checkup: "स्वास्थ्य जांच",
    nextDue: "अगली नियत तारीख",
    active: "सक्रिय",
    inactive: "निष्क्रिय",
    edit: "संपादित करें",
    delete: "हटाएं",
    markComplete: "पूर्ण का निशान लगाएं",
    noReminders: "कोई रिमाइंडर सेट नहीं",
    addFirst: "शुरू करने के लिए अपना पहला रिमाइंडर जोड़ें",
    notifications: "🔔 चुनी गई भाषा में पुश नोटिफिकेशन सक्षम"
  }
};

const reminderIcons = {
  medicine: Pill,
  appointment: Stethoscope,
  vaccination: Calendar,
  checkup: Clock
};

export function RemindersScreen({ language }: RemindersScreenProps) {
  const [reminders, setReminders] = useState(sampleReminders);
  const [selectedTab, setSelectedTab] = useState('upcoming');
  
  const t = translations[language] || translations.en;

  const getFilteredReminders = () => {
    switch (selectedTab) {
      case 'upcoming':
        return reminders.filter(r => r.isActive);
      case 'completed':
        return reminders.filter(r => !r.isActive);
      default:
        return reminders;
    }
  };

  const toggleReminderStatus = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, isActive: !reminder.isActive } : reminder
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 px-6 py-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{t.title}</h1>
              <p className="text-blue-100 text-sm">{t.subtitle}</p>
            </div>
          </div>
          <Button 
            size="sm"
            className="bg-white/20 hover:bg-white/30 rounded-xl border border-white/30"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.addReminder}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {['upcoming', 'completed'].map((tab) => (
            <Button
              key={tab}
              variant={selectedTab === tab ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedTab(tab)}
              className={`rounded-full ${
                selectedTab === tab 
                  ? 'bg-white text-blue-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {t[tab as keyof typeof t]}
            </Button>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="mx-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-200">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-gray-800">{t.notifications}</p>
              <p className="text-xs text-gray-600">Timely alerts for your health needs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reminders List */}
      <div className="px-6 space-y-4 pb-24">
        {getFilteredReminders().map((reminder) => {
          const IconComponent = reminderIcons[reminder.type];
          return (
            <Card key={reminder.id} className="bg-white border-2 border-gray-100 shadow-lg">
              <div className="p-5">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${reminder.color} rounded-2xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-800">
                        {language === 'hi' ? reminder.titleHi : reminder.title}
                      </h3>
                      <Badge 
                        variant={reminder.isActive ? "default" : "secondary"}
                        className={reminder.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}
                      >
                        {reminder.isActive ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {t.active}
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 mr-1" />
                            {t.inactive}
                          </>
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t[reminder.type as keyof typeof t]} • {language === 'hi' ? reminder.frequencyHi : reminder.frequency}
                    </p>
                  </div>
                </div>

                {/* Time and Next Due */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">Time</span>
                    </div>
                    <p className="text-sm font-bold text-blue-800">{reminder.time}</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      <span className="text-xs font-medium text-orange-700">{t.nextDue}</span>
                    </div>
                    <p className="text-sm font-bold text-orange-800">{reminder.nextDue}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => toggleReminderStatus(reminder.id)}
                    className={`flex-1 rounded-xl ${
                      reminder.isActive 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
                    }`}
                  >
                    {reminder.isActive ? t.markComplete : 'Reactivate'}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl border-2">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => deleteReminder(reminder.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* No Reminders */}
      {getFilteredReminders().length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.noReminders}</h3>
          <p className="text-gray-600 mb-6">{t.addFirst}</p>
          <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            {t.addReminder}
          </Button>
        </div>
      )}
    </div>
  );
}