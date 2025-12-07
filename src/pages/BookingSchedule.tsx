import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, User, ArrowLeft, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { sessionPackages, calculateSessionPrice, formatPrice } from '@/lib/college-config';
import { format, addDays, startOfDay, isSameDay } from 'date-fns';

const BookingSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [message, setMessage] = useState('');
  const [dateScrollIndex, setDateScrollIndex] = useState(0);

  // Mock mentor data
  const mentor = {
    id: Number(id) || 1,
    name: 'Arjun Singh',
    role: 'Product Manager @ Flipkart',
    baseRate: 500,
    rating: 4.9,
    availability: {
      slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM']
    }
  };

  // Generate available dates (next 14 days excluding Sundays)
  const availableDates = Array.from({ length: 14 }, (_, i) => addDays(startOfDay(new Date()), i + 1))
    .filter(date => date.getDay() !== 0);

  const visibleDates = availableDates.slice(dateScrollIndex, dateScrollIndex + 5);

  const handleProceedToPayment = () => {
    if (!selectedDate || !selectedSlot) {
      toast({
        title: 'Missing Information',
        description: 'Please select date and time',
        variant: 'destructive'
      });
      return;
    }

    // Navigate to payment/confirmation
    navigate('/booking/confirm', {
      state: {
        mentor: {
          id: mentor.id,
          name: mentor.name,
          role: mentor.role,
          baseRate: mentor.baseRate
        },
        date: format(selectedDate, 'EEE, dd MMM yyyy'),
        time: selectedSlot,
        duration: selectedDuration,
        message
      }
    });
  };

  const sessionPrice = calculateSessionPrice(mentor.baseRate, selectedDuration);
  const isFormValid = selectedDate && selectedSlot;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-4 md:py-8 max-w-5xl">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left: Session Info */}
            <div className="lg:col-span-2">
              <Card className="p-4 md:p-6 sticky top-4">
                {/* Mentor Info */}
                <div className="flex items-start gap-3 mb-4 pb-4 border-b">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-foreground truncate">{mentor.name}</h2>
                    <p className="text-sm text-muted-foreground truncate">{mentor.role}</p>
                    <div className="flex items-center gap-1 mt-1 text-sm">
                      <span className="text-bonus">★</span>
                      <span className="font-medium">{mentor.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Session Duration Selection */}
                <div className="mb-4">
                  <Label className="text-sm font-semibold mb-3 block">Session Duration</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {sessionPackages.map((pkg) => {
                      const price = calculateSessionPrice(mentor.baseRate, pkg.duration);
                      return (
                        <Button
                          key={pkg.duration}
                          variant={selectedDuration === pkg.duration ? 'default' : 'outline'}
                          className={`h-auto py-3 flex flex-col items-center ${selectedDuration === pkg.duration ? '' : 'hover:border-primary'}`}
                          onClick={() => setSelectedDuration(pkg.duration)}
                        >
                          <span className="font-semibold">{pkg.label}</span>
                          <span className={`text-xs ${selectedDuration === pkg.duration ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                            {formatPrice(price)}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Session</span>
                    <span className="font-medium">{selectedDuration} min video call</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(sessionPrice)}</span>
                  </div>
                </div>

                {/* Video Call Info */}
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Video className="h-4 w-4" />
                  <span>Video call via Google Meet</span>
                </div>
              </Card>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-3 space-y-4 md:space-y-6">
              {/* Date Selection - Horizontal Scroll */}
              <Card className="p-4 md:p-6">
                <Label className="flex items-center gap-2 mb-4 text-base font-semibold">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Select Date
                </Label>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDateScrollIndex(Math.max(0, dateScrollIndex - 1))}
                    disabled={dateScrollIndex === 0}
                    className="flex-shrink-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex gap-2 overflow-hidden flex-1 justify-center">
                    {visibleDates.map((date) => (
                      <Button
                        key={date.toISOString()}
                        variant={selectedDate && isSameDay(selectedDate, date) ? 'default' : 'outline'}
                        className={`flex flex-col h-auto py-2 px-3 md:px-4 min-w-[60px] md:min-w-[70px] ${
                          selectedDate && isSameDay(selectedDate, date) ? '' : 'hover:border-primary'
                        }`}
                        onClick={() => setSelectedDate(date)}
                      >
                        <span className={`text-[10px] md:text-xs ${selectedDate && isSameDay(selectedDate, date) ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          {format(date, 'EEE')}
                        </span>
                        <span className="font-bold text-sm md:text-base">{format(date, 'd')}</span>
                        <span className={`text-[10px] md:text-xs ${selectedDate && isSameDay(selectedDate, date) ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          {format(date, 'MMM')}
                        </span>
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDateScrollIndex(Math.min(availableDates.length - 5, dateScrollIndex + 1))}
                    disabled={dateScrollIndex >= availableDates.length - 5}
                    className="flex-shrink-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {selectedDate && (
                  <p className="mt-3 text-sm text-success flex items-center gap-1">
                    <span>✓</span> {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </p>
                )}
              </Card>

              {/* Time Selection */}
              <Card className="p-4 md:p-6">
                <Label className="flex items-center gap-2 mb-4 text-base font-semibold">
                  <Clock className="h-5 w-5 text-primary" />
                  Select Time
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {mentor.availability.slots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedSlot === slot ? 'default' : 'outline'}
                      className={`h-10 text-sm ${selectedSlot === slot ? '' : 'hover:border-primary'}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
                {selectedSlot && (
                  <p className="mt-3 text-sm text-success flex items-center gap-1">
                    <span>✓</span> {selectedSlot} (IST)
                  </p>
                )}
              </Card>

              {/* Message */}
              <Card className="p-4 md:p-6">
                <Label htmlFor="message" className="flex items-center gap-2 mb-4 text-base font-semibold">
                  <User className="h-5 w-5 text-primary" />
                  What would you like to discuss? (Optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell the mentor what you'd like to cover in this session..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-24 resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-2 text-right">
                  {message.length}/500
                </p>
              </Card>

              {/* Continue Button */}
              <Button
                className="w-full h-12 text-base font-semibold"
                onClick={handleProceedToPayment}
                disabled={!isFormValid}
              >
                Continue to Payment • {formatPrice(sessionPrice)}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secure payment • Instant confirmation • Full refund if declined
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingSchedule;
