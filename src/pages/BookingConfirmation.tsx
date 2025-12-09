import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, Clock, Video, Shield, CheckCircle2, Loader2, User, Mail, Phone, Send, ExternalLink } from 'lucide-react';
import { calculateSessionPrice, formatPrice, PLATFORM_FEE_PERCENT } from '@/lib/college-config';

interface LocationState {
  alumni: {
    id: number;
    name: string;
    role: string;
    baseRate: number;
  };
  date: string;
  time: string;
  duration: number;
  message?: string;
  serviceName?: string;
}

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const state = location.state as LocationState;
  
  if (!state) {
    navigate('/mentee/browse');
    return null;
  }

  const { alumni, date, time, duration, message, serviceName = '1:1 Call' } = state;
  const sessionPrice = calculateSessionPrice(alumni.baseRate, duration);
  const platformFee = 0; // Free for students
  const totalAmount = sessionPrice;

  const handlePayment = async () => {
    if (!name || !email || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms to continue",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
    }, 2500);
  };

  // Booking Confirmed Screen
  if (isConfirmed) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-success/5 to-muted flex items-center justify-center py-8">
          <div className="container max-w-md px-4">
            <Card className="p-6 md:p-8 text-center">
              {/* Alumni Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    {alumni.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="font-semibold text-foreground">{alumni.name}</span>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Success Icon */}
              <div className="w-20 h-20 rounded-full bg-success flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>

              <h1 className="text-2xl font-bold text-foreground mb-1">Booking confirmed</h1>
              <p className="text-sm text-muted-foreground mb-6">for {serviceName}</p>

              {/* Date/Time Card */}
              <div className="bg-muted rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center gap-3 text-primary font-semibold">
                  <Calendar className="h-5 w-5" />
                  <span>{date} | {time}</span>
                </div>
              </div>

              {/* Info Text */}
              <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg py-3 px-4 mb-6">
                Meeting details are sent to your Email and Mobile number
              </p>

              {/* Actions */}
              <Card className="p-4 mb-3 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Save this booking</h3>
                    <p className="text-sm text-muted-foreground">Manage your booking and keep a track of everything</p>
                  </div>
                  <Button 
                    onClick={() => navigate('/mentee/sessions')}
                    className="flex-shrink-0"
                  >
                    Go To Booking
                  </Button>
                </div>
              </Card>

              <Card 
                className="p-4 text-left cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => navigate('/mentee/sessions')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-foreground">Manage booking</span>
                  </div>
                  <span className="text-muted-foreground">›</span>
                </div>
              </Card>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8">
        <div className="container max-w-3xl px-4">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid md:grid-cols-5 gap-6">
            {/* Left: Order Summary */}
            <div className="md:col-span-2 order-2 md:order-1">
              <Card className="p-4 md:p-6 md:sticky md:top-4">
                {/* Alumni Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    {alumni.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">{alumni.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{alumni.role}</p>
                  </div>
                </div>

                {/* Service Name */}
                <div className="bg-primary/5 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-primary">{serviceName}</p>
                </div>

                {/* Session Details */}
                <div className="space-y-3 py-4 border-y">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{time} • {duration} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Video className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Video Meeting</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="py-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{serviceName}</span>
                    <span>{formatPrice(sessionPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Platform fee</span>
                    <span className="text-success">FREE</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t">
                  <Shield className="h-4 w-4 text-success" />
                  <span>100% secure payment • Full refund if declined</span>
                </div>
              </Card>
            </div>

            {/* Right: Payment Form */}
            <div className="md:col-span-3 order-1 md:order-2">
              <Card className="p-4 md:p-6">
                <h1 className="text-xl md:text-2xl font-bold mb-6">Complete Your Booking</h1>

                {/* Contact Details */}
                <div className="space-y-4 mb-6">
                  <h2 className="font-semibold text-base">Your Details</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-11"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Meeting link will be sent here</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 mb-6 p-4 bg-muted rounded-lg">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    className="mt-0.5"
                  />
                  <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    I agree to the <a href="/universal/terms" className="text-primary underline">Terms & Conditions</a> and <a href="/universal/privacy" className="text-primary underline">Privacy Policy</a>. I understand the alumni may reschedule or decline, and I'll receive a full refund if that happens.
                  </label>
                </div>

                {/* Payment Button */}
                <Button
                  className="w-full h-12 text-base font-semibold"
                  onClick={handlePayment}
                  disabled={!name || !email || !phone || !agreedToTerms || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Pay {formatPrice(totalAmount)}
                    </>
                  )}
                </Button>

                {/* Payment Info */}
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong>What happens next?</strong><br />
                    1. Complete payment to confirm your slot<br />
                    2. Alumni will receive your booking request<br />
                    3. You'll get the meeting link via email<br />
                    4. Join the call at the scheduled time
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

export default BookingConfirmation;