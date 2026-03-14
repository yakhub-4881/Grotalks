import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, User, ArrowLeft, Video, ChevronLeft, ChevronRight, Star, MessageSquare, Users, Package, GraduationCap, ShieldCheck, CreditCard, IdCard, Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { calculateSessionPrice, formatPrice } from '@/lib/college-config';
import { format, addDays, startOfDay, isSameDay } from 'date-fns';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

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

  const [step, setStep] = useState<'schedule' | 'goal' | 'verify' | 'confirmed'>('schedule');
  const [preSessionGoal, setPreSessionGoal] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyErrors, setVerifyErrors] = useState<{ card?: string; college?: string; otp?: string }>({});

  // Dummy valid data
  const VALID_CARD = 'VTGU-2024-8834-1234';
  const VALID_COLLEGE_ID = 'VTU4881';
  const VALID_OTP = '123456';

  // Mock alumni data with services
  const alumni = {
    id: Number(id) || 1,
    name: 'Arjun Singh',
    role: 'Product Manager @ Flipkart',
    baseRate: 2000,
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

  const sessionPrice = selectedService.price;
  const isFormValid = selectedDate && selectedSlot;

  const handleProceedToGoal = () => {
    if (!selectedDate || !selectedSlot) {
      toast({
        title: 'Missing Information',
        description: 'Please select date and time',
        variant: 'destructive'
      });
      return;
    }
    setStep('goal');
  };

  const handleProceedToVerify = () => {
    setStep('verify');
  };

  const handleSendOtp = () => {
    const newErrors: typeof verifyErrors = {};
    if (!cardNumber.trim()) newErrors.card = 'Please enter your virtual card number';
    if (!collegeId.trim()) newErrors.college = 'Please enter your college ID';
    if (Object.keys(newErrors).length > 0) {
      setVerifyErrors(newErrors);
      return;
    }
    setVerifyErrors({});
    setSendingOtp(true);
    setTimeout(() => {
      setSendingOtp(false);
      setOtpSent(true);
      toast({
        title: 'OTP Sent',
        description: 'A verification code has been sent to your registered college email.',
      });
    }, 1500);
  };

  const handleVerifyAndBook = () => {
    const newErrors: typeof verifyErrors = {};
    if (cardNumber !== VALID_CARD) newErrors.card = 'Invalid virtual card number. Check with your university alumni admin.';
    if (collegeId !== VALID_COLLEGE_ID) newErrors.college = 'College ID not found. Verify the ID sent to your college email.';
    if (otp !== VALID_OTP) newErrors.otp = 'Incorrect OTP. Please check and try again.';
    if (Object.keys(newErrors).length > 0) {
      setVerifyErrors(newErrors);
      return;
    }
    setVerifyErrors({});
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setOtpVerified(true);
      toast({
        title: 'Booking Confirmed!',
        description: '1 session deducted from your university allocation.',
      });
      setTimeout(() => {
        setStep('confirmed');
      }, 1200);
    }, 2000);
  };

  const canSendOtp = cardNumber.trim().length > 0 && collegeId.trim().length > 0;
  const canVerify = otpSent && otp.length === 6;

  // Booking Confirmed Screen
  if (step === 'confirmed') {
    const confirmedDate = selectedDate ? format(selectedDate, 'EEE, dd MMM yyyy') : '';
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-primary/5 to-muted flex items-center justify-center py-8">
          <div className="container max-w-md px-4">
            <Card className="p-6 md:p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
              </div>

              <h1 className="text-2xl font-bold text-foreground mb-1">Booking Confirmed!</h1>
              <p className="text-sm text-muted-foreground mb-6">{selectedService.title} with {alumni.name}</p>

              <Card className="p-4 text-left mb-4 bg-muted/50 border">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0 text-sm">
                      {alumni.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{alumni.name}</p>
                      <p className="text-xs text-muted-foreground">{alumni.role}</p>
                    </div>
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <ServiceIcon className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="font-medium">{selectedService.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{confirmedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{selectedSlot} • {selectedService.duration || selectedDuration} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Video className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>Video Meeting</span>
                    </div>
                  </div>

                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Session Value</span>
                    <span className="font-bold text-primary">{formatPrice(sessionPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Booked Via</span>
                    <span className="text-sm font-medium text-foreground">University Session Allocation</span>
                  </div>
                </div>
              </Card>

              <p className="text-xs text-muted-foreground bg-muted rounded-lg py-3 px-4 mb-6">
                Meeting details will be sent to your registered college email and WhatsApp number.
              </p>

              <div className="space-y-3">
                <Button className="w-full h-12 text-base font-semibold" onClick={() => navigate('/mentee/dashboard')}>
                  Go to Dashboard
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/mentee/sessions')}>
                  View My Sessions
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-4 md:py-8 max-w-5xl">
          {/* Back Button */}
          <Button 
            type="button"
            variant="ghost" 
            onClick={() => {
              if (step === 'verify') setStep('goal');
              else if (step === 'goal') setStep('schedule');
              else navigate(-1);
            }}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {step === 'verify' ? 'Back to Goal' : step === 'goal' ? 'Back to Schedule' : 'Back'}
          </Button>
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
                    <span className="text-muted-foreground text-sm">Session Value</span>
                    <span className="font-bold text-primary">{formatPrice(selectedService.price)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">This will use 1 of your allocated sessions</p>
                </div>

                {/* Selected Schedule Summary (shown during verify step) */}
                {step === 'verify' && selectedDate && selectedSlot && (
                  <div className="bg-muted rounded-lg p-3 mb-4 space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Scheduled For</p>
                    <p className="text-sm font-semibold text-foreground">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                    <p className="text-sm text-foreground">{selectedSlot} (IST)</p>
                  </div>
                )}

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

            {/* Right: Booking Form or Verification */}
            <div className="lg:col-span-3 space-y-4 md:space-y-6">
              {step === 'schedule' ? (
                <>
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
                      What would you like to discuss?
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
                    onClick={handleProceedToVerify}
                    disabled={!isFormValid}
                  >
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Continue — Verify & Book Session
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    This session will be deducted from your university-allocated quota
                  </p>
                </>
              ) : (
                /* ===== VERIFICATION STEP ===== */
                <>
                  <Card className="p-5 md:p-7">
                    {/* Verification Header */}
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="h-7 w-7 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-1">Verify University Access</h2>
                      <p className="text-sm text-muted-foreground">
                        Confirm your identity to book using your allocated sessions
                      </p>
                    </div>

                    {/* Session Allocation Info */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Sessions Remaining</span>
                        <span className="text-lg font-bold text-foreground">0 of 5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Session Value</span>
                        <span className="text-sm font-semibold text-primary">{formatPrice(sessionPrice)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pt-1 border-t border-primary/10">
                        1 session will be deducted from your allocation. Value is handled by your university.
                      </p>
                    </div>

                    <div className="space-y-5">
                      {/* Virtual Card Number */}
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="flex items-center gap-2 text-sm font-medium">
                          <CreditCard className="h-4 w-4 text-primary" />
                          Virtual Guidance Card Number
                        </Label>
                        <Input
                          id="cardNumber"
                          placeholder="e.g., VTGU-2024-8834-1234"
                          value={cardNumber}
                          onChange={(e) => {
                            setCardNumber(e.target.value);
                            setVerifyErrors(prev => ({ ...prev, card: undefined }));
                          }}
                          disabled={otpVerified}
                          className={verifyErrors.card ? 'border-destructive' : ''}
                        />
                        <p className="text-xs text-muted-foreground">Enter your university-issued virtual card number</p>
                        {verifyErrors.card && <p className="text-xs text-destructive font-medium">{verifyErrors.card}</p>}
                      </div>

                      {/* College ID */}
                      <div className="space-y-2">
                        <Label htmlFor="collegeId" className="flex items-center gap-2 text-sm font-medium">
                          <IdCard className="h-4 w-4 text-primary" />
                          College ID Number
                        </Label>
                        <Input
                          id="collegeId"
                          placeholder="e.g., VTU4881"
                          value={collegeId}
                          onChange={(e) => {
                            setCollegeId(e.target.value);
                            setVerifyErrors(prev => ({ ...prev, college: undefined }));
                          }}
                          disabled={otpVerified}
                          className={verifyErrors.college ? 'border-destructive' : ''}
                        />
                        <p className="text-xs text-muted-foreground">Enter your College ID — sent to your official college email</p>
                        {verifyErrors.college && <p className="text-xs text-destructive font-medium">{verifyErrors.college}</p>}
                      </div>

                      {/* Send OTP Button */}
                      {!otpSent && (
                        <Button
                          className="w-full"
                          onClick={handleSendOtp}
                          disabled={!canSendOtp || sendingOtp}
                        >
                          {sendingOtp ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending OTP...</>
                          ) : (
                            <><Mail className="mr-2 h-4 w-4" />Send OTP to College Email</>
                          )}
                        </Button>
                      )}

                      {/* OTP Entry */}
                      {otpSent && !otpVerified && (
                        <div className="space-y-3 pt-4 border-t">
                          <Label className="flex items-center gap-2 text-sm font-medium">
                            <Mail className="h-4 w-4 text-primary" />
                            Enter OTP
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            A 6-digit code has been sent to your registered college email
                          </p>
                          <div className="flex justify-center">
                            <InputOTP
                              maxLength={6}
                              value={otp}
                              onChange={(value) => {
                                setOtp(value);
                                setVerifyErrors(prev => ({ ...prev, otp: undefined }));
                              }}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                          {verifyErrors.otp && <p className="text-xs text-destructive font-medium text-center">{verifyErrors.otp}</p>}

                          <Button
                            className="w-full h-12 text-base font-semibold"
                            onClick={handleVerifyAndBook}
                            disabled={!canVerify || verifying}
                          >
                            {verifying ? (
                              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Verifying & Booking...</>
                            ) : (
                              <>Verify & Book Session</>
                            )}
                          </Button>

                          <button
                            className="w-full text-xs text-primary hover:underline text-center"
                            onClick={handleSendOtp}
                          >
                            Didn't receive the OTP? Resend
                          </button>
                        </div>
                      )}

                      {/* Success State */}
                      {otpVerified && (
                        <div className="flex flex-col items-center gap-3 py-6 border-t">
                          <CheckCircle2 className="h-10 w-10 text-primary" />
                          <p className="text-sm font-medium text-foreground">Booking confirmed! Redirecting...</p>
                          <p className="text-xs text-muted-foreground">1 session deducted from your university allocation</p>
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] text-muted-foreground text-center mt-6">
                      Having trouble? Contact your university alumni admin for assistance.
                    </p>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingSchedule;
