import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const MentorManageAvailability = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [availability, setAvailability] = useState<Record<string, string[]>>({
    MON: ['12pm-3pm', '3pm-6pm'],
    WED: ['3pm-6pm', '6pm-9pm'],
    FRI: ['12pm-3pm'],
  });

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const timeSlots = ['8am-12pm', '12pm-3pm', '3pm-6pm', '6pm-9pm'];

  const toggleSlot = (day: string, slot: string) => {
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

  const handleSave = () => {
    toast({
      title: 'Availability Updated',
      description: 'Your weekly availability has been saved successfully.',
    });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8 px-4">
        <div className="w-full max-w-5xl mx-auto">
          <Button variant="ghost" onClick={() => navigate('/mentor/dashboard')} className="mb-4 md:mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <Card className="p-4 md:p-8">
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Manage Availability</h1>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">Set your weekly availability for mentoring sessions</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Select Your Weekly Availability</Label>
                <p className="text-sm text-muted-foreground">
                  Click on time slots to mark when you're available for mentoring sessions
                </p>

                {/* Availability Grid */}
                <div className="overflow-x-auto -mx-4 md:mx-0">
                  <div className="inline-block min-w-full align-middle px-4 md:px-0">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="p-2 text-left text-xs md:text-sm font-semibold border bg-muted/50 sticky left-0 z-10">Day</th>
                          {timeSlots.map(slot => (
                            <th key={slot} className="p-2 text-center text-xs md:text-sm font-semibold border bg-muted/50 whitespace-nowrap">
                              {slot}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {days.map(day => (
                          <tr key={day}>
                            <td className="p-2 font-medium border text-xs md:text-sm bg-background sticky left-0 z-10">{day}</td>
                            {timeSlots.map(slot => (
                              <td key={slot} className="p-1 md:p-2 border">
                                <button
                                  onClick={() => toggleSlot(day, slot)}
                                  className={`w-full h-10 md:h-14 lg:h-16 rounded-md transition-all text-xs md:text-sm ${
                                    isSelected(day, slot)
                                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                      : 'bg-muted hover:bg-muted/70'
                                  }`}
                                  aria-label={`${day} ${slot}`}
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
                </div>

                {/* Selected Summary */}
                {hasAnySelection && (
                  <div className="p-3 md:p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">Selected Slots:</p>
                    <div className="space-y-1">
                      {Object.entries(availability).map(([day, slots]) =>
                        slots.length > 0 && (
                          <p key={day} className="text-xs md:text-sm text-muted-foreground">
                            <span className="font-medium">{day}:</span> {slots.join(', ')}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 h-11 md:h-12 text-sm md:text-base"
                  disabled={!hasAnySelection}
                >
                  Save Availability
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/mentor/dashboard')}
                  className="flex-1 h-11 md:h-12 text-sm md:text-base"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MentorManageAvailability;
