import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { Checkbox } from '@/components/ui/checkbox';

const AlumniAvailability = () => {
  const navigate = useNavigate();
  const [availability, setAvailability] = useState<Record<string, string[]>>({});

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const timeSlots = ['8am-12pm', '12pm-3pm', '3pm-6pm', '6pm-9pm'];

  const toggleSlot = (day: string, slot: string) => {
    const key = `${day}-${slot}`;
    const currentSlots = availability[day] || [];
    
    if (currentSlots.includes(slot)) {
      setAvailability({
        ...availability,
        [day]: currentSlots.filter(s => s !== slot)
      });
    } else {
      setAvailability({
        ...availability,
        [day]: [...currentSlots, slot]
      });
    }
  };

  const isSelected = (day: string, slot: string) => {
    return (availability[day] || []).includes(slot);
  };

  const hasAnySelection = Object.values(availability).some(slots => slots.length > 0);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8 px-4">
        <div className="w-full max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          {/* Progress Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Weekly Availability</h1>
            <p className="text-sm text-muted-foreground">Step 6 of 8</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[75%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-semibold">Select Your Weekly Availability</Label>
              <p className="text-sm text-muted-foreground">
                Click on time slots to mark when you're available for alumniing sessions
              </p>

              {/* Availability Grid */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 text-left text-sm font-semibold border">Day</th>
                      {timeSlots.map(slot => (
                        <th key={slot} className="p-2 text-center text-sm font-semibold border">
                          {slot}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {days.map(day => (
                      <tr key={day}>
                        <td className="p-2 font-medium border text-sm">{day}</td>
                        {timeSlots.map(slot => (
                          <td key={slot} className="p-2 border">
                            <button
                              onClick={() => toggleSlot(day, slot)}
                              className={`w-full h-12 md:h-16 rounded-md transition-all ${
                                isSelected(day, slot)
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted hover:bg-muted/70'
                              }`}
                            >
                              {isSelected(day, slot) && '✓'}
                            </button>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Selected Summary */}
              {hasAnySelection && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Selected Slots:</p>
                  <div className="space-y-1">
                    {Object.entries(availability).map(([day, slots]) => (
                      slots.length > 0 && (
                        <p key={day} className="text-sm text-muted-foreground">
                          <span className="font-medium">{day}:</span> {slots.join(', ')}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/alumni/expertise')} 
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button
                onClick={() => navigate('/alumni/meeting-setup')}
                className="flex-1 h-12 font-medium"
                disabled={!hasAnySelection}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AlumniAvailability;
