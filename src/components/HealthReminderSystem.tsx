import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Bell, Plus, Clock, Pill, Calendar, AlertCircle, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface HealthReminder {
  id: string;
  type: 'medication' | 'appointment' | 'checkup' | 'test' | 'exercise' | 'diet';
  title: string;
  description: string;
  time: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
  nextDue: Date;
  lastCompleted?: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const reminderTypes = [
  { value: 'medication', label: 'Medication', icon: Pill, color: 'bg-blue-100 text-blue-800' },
  { value: 'appointment', label: 'Doctor Appointment', icon: Calendar, color: 'bg-green-100 text-green-800' },
  { value: 'checkup', label: 'Health Checkup', icon: AlertCircle, color: 'bg-yellow-100 text-yellow-800' },
  { value: 'test', label: 'Medical Test', icon: Clock, color: 'bg-purple-100 text-purple-800' },
  { value: 'exercise', label: 'Exercise', icon: Bell, color: 'bg-orange-100 text-orange-800' },
  { value: 'diet', label: 'Diet/Nutrition', icon: Bell, color: 'bg-pink-100 text-pink-800' }
];

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

export function HealthReminderSystem() {
  const [reminders, setReminders] = useState<HealthReminder[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    type: 'medication' as const,
    title: '',
    description: '',
    time: '',
    frequency: 'daily' as const,
    priority: 'medium' as const
  });

  // Load reminders from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('healthReminders');
    if (stored) {
      try {
        const parsed = JSON.parse(stored).map((r: any) => ({
          ...r,
          nextDue: new Date(r.nextDue),
          lastCompleted: r.lastCompleted ? new Date(r.lastCompleted) : undefined
        }));
        setReminders(parsed);
      } catch (error) {
        console.error('Failed to load reminders:', error);
      }
    }
  }, []);

  // Save reminders to localStorage
  const saveReminders = (updatedReminders: HealthReminder[]) => {
    try {
      localStorage.setItem('healthReminders', JSON.stringify(updatedReminders));
      setReminders(updatedReminders);
    } catch (error) {
      console.error('Failed to save reminders:', error);
      toast.error('Failed to save reminder');
    }
  };

  // Check for due reminders and show notifications
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const dueReminders = reminders.filter(r => 
        r.isActive && r.nextDue <= now
      );

      dueReminders.forEach(reminder => {
        if (Notification.permission === 'granted') {
          new Notification(`Health Reminder: ${reminder.title}`, {
            body: reminder.description,
            icon: '/health-icon.png',
            tag: reminder.id
          });
        }
        
        toast.info(`⏰ ${reminder.title}`, {
          description: reminder.description,
          action: {
            label: 'Mark Complete',
            onClick: () => markAsCompleted(reminder.id)
          }
        });
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [reminders]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const calculateNextDue = (frequency: string, time: string): Date => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    
    const nextDue = new Date();
    nextDue.setHours(hours, minutes, 0, 0);
    
    if (nextDue <= now) {
      switch (frequency) {
        case 'daily':
          nextDue.setDate(nextDue.getDate() + 1);
          break;
        case 'weekly':
          nextDue.setDate(nextDue.getDate() + 7);
          break;
        case 'monthly':
          nextDue.setMonth(nextDue.getMonth() + 1);
          break;
      }
    }
    
    return nextDue;
  };

  const addReminder = () => {
    if (!newReminder.title || !newReminder.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    const reminder: HealthReminder = {
      id: Date.now().toString(),
      ...newReminder,
      isActive: true,
      nextDue: calculateNextDue(newReminder.frequency, newReminder.time)
    };

    const updatedReminders = [...reminders, reminder];
    saveReminders(updatedReminders);
    
    setNewReminder({
      type: 'medication',
      title: '',
      description: '',
      time: '',
      frequency: 'daily',
      priority: 'medium'
    });
    setShowAddForm(false);
    
    toast.success('Health reminder added successfully');
  };

  const markAsCompleted = (id: string) => {
    const updatedReminders = reminders.map(reminder => {
      if (reminder.id === id) {
        const now = new Date();
        let nextDue = new Date(reminder.nextDue);
        
        switch (reminder.frequency) {
          case 'daily':
            nextDue.setDate(nextDue.getDate() + 1);
            break;
          case 'weekly':
            nextDue.setDate(nextDue.getDate() + 7);
            break;
          case 'monthly':
            nextDue.setMonth(nextDue.getMonth() + 1);
            break;
          case 'once':
            return { ...reminder, isActive: false, lastCompleted: now };
        }
        
        return { ...reminder, nextDue, lastCompleted: now };
      }
      return reminder;
    });
    
    saveReminders(updatedReminders);
    toast.success('Reminder marked as completed');
  };

  const toggleReminder = (id: string) => {
    const updatedReminders = reminders.map(reminder =>
      reminder.id === id ? { ...reminder, isActive: !reminder.isActive } : reminder
    );
    saveReminders(updatedReminders);
  };

  const deleteReminder = (id: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    saveReminders(updatedReminders);
    toast.success('Reminder deleted');
  };

  const getUpcomingReminders = () => {
    const now = new Date();
    return reminders
      .filter(r => r.isActive)
      .sort((a, b) => a.nextDue.getTime() - b.nextDue.getTime())
      .slice(0, 5);
  };

  const getDueReminders = () => {
    const now = new Date();
    return reminders.filter(r => r.isActive && r.nextDue <= now);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Health Reminders</h2>
          <p className="text-gray-600">Never miss your medications or appointments</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Reminder
        </Button>
      </div>

      {/* Due Reminders Alert */}
      {getDueReminders().length > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="w-4 h-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            You have {getDueReminders().length} reminder(s) due now!
          </AlertDescription>
        </Alert>
      )}

      {/* Add Reminder Form */}
      {showAddForm && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Add New Health Reminder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <Select value={newReminder.type} onValueChange={(value: any) => 
                  setNewReminder(prev => ({ ...prev, type: value }))
                }>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reminderTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <Select value={newReminder.priority} onValueChange={(value: any) => 
                  setNewReminder(prev => ({ ...prev, priority: value }))
                }>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input 
                  value={newReminder.title}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Take Blood Pressure Medication"
                  className="bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Time *</label>
                <Input 
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                  className="bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Frequency</label>
                <Select value={newReminder.frequency} onValueChange={(value: any) => 
                  setNewReminder(prev => ({ ...prev, frequency: value }))
                }>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Once</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description</label>
                <Input 
                  value={newReminder.description}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Additional details..."
                  className="bg-white"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={addReminder} className="bg-blue-600 hover:bg-blue-700">
                Add Reminder
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Upcoming Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {getUpcomingReminders().length === 0 ? (
            <p className="text-gray-500 text-center py-8">No upcoming reminders</p>
          ) : (
            <div className="space-y-3">
              {getUpcomingReminders().map(reminder => {
                const reminderType = reminderTypes.find(t => t.value === reminder.type);
                const IconComponent = reminderType?.icon || Bell;
                const isOverdue = reminder.nextDue < new Date();
                
                return (
                  <div key={reminder.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{reminder.title}</h4>
                          <Badge className={reminderType?.color}>
                            {reminderType?.label}
                          </Badge>
                          <Badge className={priorityColors[reminder.priority]}>
                            {reminder.priority}
                          </Badge>
                          {isOverdue && (
                            <Badge className="bg-red-100 text-red-800">
                              Overdue
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{reminder.description}</p>
                        <p className="text-xs text-gray-500">
                          {isOverdue ? 'Overdue since' : 'Due'}: {reminder.nextDue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => markAsCompleted(reminder.id)} className="bg-green-600 hover:bg-green-700">
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toggleReminder(reminder.id)}>
                        {reminder.isActive ? 'Pause' : 'Resume'}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteReminder(reminder.id)}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <AlertCircle className="w-4 h-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Privacy Protected:</strong> All reminder data is stored locally on your device and never transmitted to external servers. Your health information remains completely private.
        </AlertDescription>
      </Alert>
    </div>
  );
}