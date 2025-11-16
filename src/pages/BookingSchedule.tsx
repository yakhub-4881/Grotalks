import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/lib/app-context';
import { Calendar as CalendarIcon, Clock, User, Coins, AlertCircle } from 'lucide-react';
import { PricingDisplay } from '@/components/PricingDisplay';
import { WalletBalanceWarning } from '@/components/WalletBalanceWarning';

const BookingSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { walletBalance } = useAppContext();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState('');
  const [message, setMessage] = useState('');

  // Mock mentor data
  const mentor = {
    id: Number(id) || 1,
    name: 'Arjun Singh',
    role: 'Product Manager @ Flipkart',
    hourlyRate: 600,
    availability: {
      slots: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM']
    }
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedSlot) {
      toast({
        title: 'Missing Information',
        description: 'Please select both date and time slot',
        variant: 'destructive'
      });
      return;
    }

    if (walletBalance < 100) {
      toast({
        title: 'Insufficient Balance',
        description: 'Please recharge your wallet to book a session',
        variant: 'destructive'
      });
      return;
    }

    if (message.length < 20) {
      toast({
        title: 'Message Required',
        description: 'Please describe what you\'re looking for (minimum 20 characters)',
        variant: 'destructive'
      });
      return;
    }

    // Navigate to mentor requests with booking data
    toast({
      title: 'Booking Request Sent!',
      description: 'The mentor will review your request shortly',
    });
    
    // Store booking request in sessionStorage for demonstration
    const bookingRequest = {
      mentorId: mentor.id,
      mentorName: mentor.name,
      date: selectedDate.toDateString(),
      slot: selectedSlot,
      message,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    const existingRequests = JSON.parse(sessionStorage.getItem('studentBookingRequests') || '[]');
    sessionStorage.setItem('studentBookingRequests', JSON.stringify([...existingRequests, bookingRequest]));
    
    navigate('/mentee/dashboard');
  };

  const isFormValid = selectedDate && selectedSlot && message.length >= 20;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Schedule Session</h1>
            <p className="text-muted-foreground">Book a session with {mentor.name}</p>
          </div>

          <WalletBalanceWarning />

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date Selection */}
              <Card className="p-6">
                <Label className="flex items-center gap-2 mb-4 text-lg">
                  <CalendarIcon className="h-5 w-5" />
                  Select Date
                </Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-md border w-full"
                />
                {selectedDate && (
                  <p className="mt-4 text-sm text-success flex items-center gap-1">
                    <span>✓</span> Selected: {selectedDate.toDateString()}
                  </p>
                )}
              </Card>

              {/* Time Slot Selection */}
              <Card className="p-6">
                <Label className="flex items-center gap-2 mb-4 text-lg">
                  <Clock className="h-5 w-5" />
                  Select Time Slot
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mentor.availability.slots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedSlot === slot ? 'default' : 'outline'}
                      className="h-12"
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
                {selectedSlot && (
                  <p className="mt-4 text-sm text-success flex items-center gap-1">
                    <span>✓</span> Selected: {selectedSlot}
                  </p>
                )}
              </Card>

              {/* Message to Mentor */}
              <Card className="p-6">
                <Label htmlFor="message" className="flex items-center gap-2 mb-4 text-lg">
                  <User className="h-5 w-5" />
                  Message to Mentor* (min 20 characters)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Describe what you're looking for in this session... (e.g., career guidance, interview preparation, specific topics you want to discuss)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-32 resize-none"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-muted-foreground">
                    {message.length}/500 characters
                  </p>
                  {message.length >= 20 && (
                    <p className="text-xs text-success">✓ Looks good!</p>
                  )}
                </div>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4 space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Booking Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mentor</span>
                      <span className="font-medium">{mentor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role</span>
                      <span className="font-medium text-right">{mentor.role}</span>
                    </div>
                    {selectedDate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
                      </div>
                    )}
                    {selectedSlot && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time</span>
                        <span className="font-medium">{selectedSlot}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Session Rate</p>
                    <PricingDisplay hourlyRate={mentor.hourlyRate} variant="detail" />
                  </div>
                  <div className="bg-accent/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Coins className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Your Balance:</span>
                      <span className="font-bold text-foreground">₹{walletBalance.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {walletBalance < 100 && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-destructive">
                        Minimum ₹100 balance required to book
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Button
                    className="w-full h-12 text-base font-semibold"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                  >
                    Send Booking Request
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/mentor/profile/${id}`)}
                  >
                    Cancel
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Next Steps:</strong><br />
                    • Mentor will review your request<br />
                    • You'll be notified of acceptance/reschedule<br />
                    • Payment charged only when session starts
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingSchedule;
