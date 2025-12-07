import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, User, ArrowLeft, Video, ChevronLeft, ChevronRight, MapPin, Star, Briefcase, GraduationCap, Linkedin } from 'lucide-react';
import { formatPrice } from '@/lib/college-config';
import { format, addDays, startOfDay, isSameDay } from 'date-fns';

const BookingSchedule = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const serviceId = searchParams.get('service');

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState('');
  const [message, setMessage] = useState('');
  const [dateScrollIndex, setDateScrollIndex] = useState(0);

  // Mock mentor data with full profile
  const mentor = {
    id: Number(id) || 1,
    name: 'Arjun Singh',
    role: 'Product Manager @ Flipkart',
    company: 'Flipkart',
    location: 'Bangalore',
    college: 'Vel Tech University',
    batch: '2018',
    rating: 4.9,
    reviews: 28,
    sessionsCompleted: 45,
    languages: ['English', 'Hindi'],
    expertise: ['Product Management', 'Career Guidance', 'Interview Prep'],
    bio: 'Experienced Product Manager with 5+ years in building consumer products. Passionate about mentoring aspiring PMs and helping students navigate their career paths.',
    linkedinUrl: 'https://linkedin.com/in/arjunsingh',
    workExperience: [
      { title: 'Senior Product Manager', company: 'Flipkart', duration: '2021 - Present' },
      { title: 'Product Manager', company: 'Ola', duration: '2019 - 2021' },
    ],
    services: [
      { id: '1', title: '1:1 Career Guidance Call', price: 2000, duration: 30 },
      { id: '2', title: 'Resume Review', price: 1500, duration: 45 },
      { id: '3', title: 'LinkedIn Profile Optimization', price: 1000, duration: 30 },
      { id: '4', title: 'Mock Interview Session', price: 2500, duration: 60 },
    ],
    availability: {
      slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM']
    }
  };

  // Get selected service from URL params or default to first
  const selectedService = mentor.services.find(s => s.id === serviceId) || mentor.services[0];

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

    navigate('/booking/confirm', {
      state: {
        mentor: {
          id: mentor.id,
          name: mentor.name,
          role: mentor.role,
        },
        service: selectedService,
        date: format(selectedDate, 'EEE, dd MMM yyyy'),
        time: selectedSlot,
        duration: selectedService.duration,
        message
      }
    });
  };

  const isFormValid = selectedDate && selectedSlot;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-4 md:py-8 max-w-6xl">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: Mentor Profile Details */}
            <div className="lg:col-span-2 space-y-4">
              {/* Mentor Header Card */}
              <Card className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl flex-shrink-0">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h1 className="text-xl md:text-2xl font-bold text-foreground">{mentor.name}</h1>
                      <div className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-full flex-shrink-0">
                        <Star className="h-4 w-4 fill-bonus text-bonus" />
                        <span className="font-semibold">{mentor.rating}</span>
                        <span className="text-xs text-muted-foreground">({mentor.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-2">{mentor.role}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {mentor.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3.5 w-3.5" />
                        {mentor.college}, {mentor.batch}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {mentor.sessionsCompleted} sessions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {mentor.bio}
                </p>

                {/* Expertise Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.expertise.map((exp) => (
                    <Badge key={exp} variant="secondary" className="text-xs">
                      {exp}
                    </Badge>
                  ))}
                </div>

                {/* Languages */}
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Speaks:</span>
                  <span className="font-medium">{mentor.languages.join(', ')}</span>
                </div>

                {/* LinkedIn */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 gap-2"
                  onClick={() => window.open(mentor.linkedinUrl, '_blank')}
                >
                  <Linkedin className="h-4 w-4" />
                  View LinkedIn
                </Button>
              </Card>

              {/* Work Experience */}
              <Card className="p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Work Experience
                </h3>
                <div className="space-y-3">
                  {mentor.workExperience.map((exp, idx) => (
                    <div key={idx} className="flex items-start gap-3 pb-3 last:pb-0 last:border-0 border-b border-border/50">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Briefcase className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{exp.title}</p>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">{exp.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Date Selection */}
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
            </div>

            {/* Right: Order Summary (Sticky) */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-4 space-y-4">
                <Card className="p-4 md:p-6">
                  <h3 className="font-semibold text-foreground mb-4">Booking Summary</h3>
                  
                  {/* Selected Service */}
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Service</p>
                    <p className="font-semibold text-foreground">{selectedService.title}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{selectedService.duration} minutes</span>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Mentor</span>
                      <span className="font-medium text-foreground">{mentor.name}</span>
                    </div>
                    
                    {selectedDate && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium text-foreground">{format(selectedDate, 'dd MMM yyyy')}</span>
                      </div>
                    )}
                    
                    {selectedSlot && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Time</span>
                        <span className="font-medium text-foreground">{selectedSlot}</span>
                      </div>
                    )}
                  </div>

                  {/* Video Call Info */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 pb-4 border-b">
                    <Video className="h-4 w-4" />
                    <span>Video call via Google Meet</span>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between text-lg font-bold mb-4">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(selectedService.price)}</span>
                  </div>

                  {/* Continue Button */}
                  <Button
                    className="w-full h-12 text-base font-semibold"
                    onClick={handleProceedToPayment}
                    disabled={!isFormValid}
                  >
                    Continue to Payment
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-3">
                    Secure payment • Instant confirmation
                  </p>
                </Card>

                {/* Other Services */}
                {mentor.services.length > 1 && (
                  <Card className="p-4">
                    <p className="text-xs text-muted-foreground mb-3">Other services by {mentor.name.split(' ')[0]}</p>
                    <div className="space-y-2">
                      {mentor.services.filter(s => s.id !== selectedService.id).slice(0, 2).map((service) => (
                        <Button
                          key={service.id}
                          variant="ghost"
                          className="w-full justify-between h-auto py-2 px-3 text-left"
                          onClick={() => navigate(`/booking/schedule/${mentor.id}?service=${service.id}`)}
                        >
                          <span className="text-sm truncate">{service.title}</span>
                          <span className="text-sm font-semibold text-primary ml-2">{formatPrice(service.price)}</span>
                        </Button>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingSchedule;
