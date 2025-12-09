import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, User, ArrowLeft, Video, ChevronLeft, ChevronRight, Star, MessageSquare, Users, Package, GraduationCap } from 'lucide-react';
import { calculateSessionPrice, formatPrice } from '@/lib/college-config';
import { format, addDays, startOfDay, isSameDay } from 'date-fns';

// Service type icons mapping
const serviceIcons = {
  call: Video,
  dm: MessageSquare,
  workshop: Users,
  product: GraduationCap,
  package: Package,
};

const BookingSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const serviceId = searchParams.get('service');

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [message, setMessage] = useState('');
  const [dateScrollIndex, setDateScrollIndex] = useState(0);

  // Mock alumni data with services
  const alumni = {
    id: Number(id) || 1,
    name: 'Arjun Singh',
    role: 'Product Manager @ Flipkart',
    baseRate: 500,
    rating: 4.9,
    availability: {
      slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM']
    },
    services: [
      { id: 1, type: 'call' as const, title: '1:1 Career Guidance Call', duration: 30, price: 2000 },
      { id: 2, type: 'call' as const, title: 'Mock Interview Session', duration: 45, price: 3500 },
      { id: 3, type: 'dm' as const, title: 'Resume Review', duration: 0, price: 1500, description: 'Get detailed feedback on your resume within 48 hours' },
      { id: 4, type: 'product' as const, title: 'LinkedIn Optimization', duration: 0, price: 2500, description: 'Complete profile revamp with keyword optimization' },
      { id: 5, type: 'workshop' as const, title: 'Abroad Studies Consultation', duration: 60, price: 4000, description: 'Comprehensive guidance on MS applications, SOP review, and university selection' },
    ]
  };

  // Get selected service
  const selectedService = alumni.services.find(s => s.id === Number(serviceId)) || alumni.services[0];
  const ServiceIcon = serviceIcons[selectedService.type] || Video;

  // Mock past ratings for this service
  const serviceRatings = [
    { id: 1, student: 'Ravi K.', rating: 5, comment: 'Very helpful session!', date: '1 week ago' },
    { id: 2, student: 'Priya S.', rating: 5, comment: 'Excellent guidance', date: '2 weeks ago' },
    { id: 3, student: 'Amit P.', rating: 4, comment: 'Good insights shared', date: '3 weeks ago' },
  ];

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
        alumni: {
          id: alumni.id,
          name: alumni.name,
          role: alumni.role,
          baseRate: alumni.baseRate
        },
        date: format(selectedDate, 'EEE, dd MMM yyyy'),
        time: selectedSlot,
        duration: selectedDuration,
        message
      }
    });
  };

  const sessionPrice = selectedService.price;
  const isFormValid = selectedDate && selectedSlot;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-4 md:py-8 max-w-5xl">
          {/* Back Button */}
          <Button 
            type="button"
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
                {/* Alumni Info */}
                <div className="flex items-start gap-3 mb-4 pb-4 border-b">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {alumni.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-foreground truncate">{alumni.name}</h2>
                    <p className="text-sm text-muted-foreground truncate">{alumni.role}</p>
                    <div className="flex items-center gap-1 mt-1 text-sm">
                      <span className="text-bonus">★</span>
                      <span className="font-medium">{alumni.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Selected Service Details */}
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 mb-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <ServiceIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">Selected Service</p>
                      <h4 className="font-semibold text-foreground text-sm">{selectedService.title}</h4>
                      {selectedService.duration > 0 && (
                        <p className="text-xs text-muted-foreground mt-0.5">{selectedService.duration} mins session</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-primary/20">
                    <span className="text-muted-foreground text-sm">Amount</span>
                    <span className="font-bold text-primary">{formatPrice(selectedService.price)}</span>
                  </div>
                </div>

                {/* Video Call Info */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Video className="h-4 w-4" />
                  <span>Video call via Google Meet</span>
                </div>

                {/* Past Ratings for this Service */}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">Recent Reviews</p>
                  <div className="space-y-3">
                    {serviceRatings.slice(0, 3).map((review) => (
                      <div key={review.id} className="flex items-start gap-2">
                        <div className="flex items-center gap-0.5 flex-shrink-0 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-2.5 w-2.5 ${i < review.rating ? 'fill-bonus text-bonus' : 'text-muted/30'}`}
                            />
                          ))}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground/80 line-clamp-1">"{review.comment}"</p>
                          <p className="text-[10px] text-muted-foreground">{review.student} • {review.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
                  {alumni.availability.slots.map((slot) => (
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
                  placeholder="Tell the alumni what you'd like to cover in this session..."
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
