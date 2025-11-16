import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppContext } from '@/lib/app-context';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, Clock, Wallet, User, Coins, CheckCircle2, Loader2 } from 'lucide-react';
import { calculatePerMinuteRate, calculateSessionCost, getCollegeDisplay } from '@/lib/college-config';
import { CollegeDisplay } from '@/components/CollegeDisplay';
import { PricingDisplay } from '@/components/PricingDisplay';

interface LocationState {
  mentor: {
    id: number;
    name: string;
    role: string;
    college: string;
    hourlyRate: number;
  };
  date: string;
  time: string;
  duration: number;
}

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { walletBalance, setWalletBalance } = useAppContext();
  const { toast } = useToast();
  
  const [message, setMessage] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const state = location.state as LocationState;
  
  if (!state) {
    navigate('/mentee/browse');
    return null;
  }

  const { mentor, date, time, duration } = state;
  const perMinuteRate = calculatePerMinuteRate(mentor.hourlyRate);
  const totalCost = calculateSessionCost(perMinuteRate, duration);
  const walletAfter = walletBalance - totalCost;
  const hasInsufficientBalance = walletBalance < totalCost;

  const handleConfirmBooking = async () => {
    if (hasInsufficientBalance) {
      toast({
        title: "Insufficient Balance",
        description: "Please top up your wallet to continue",
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

    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      
      toast({
        title: "✓ Session Booked!",
        description: `Waiting for ${mentor.name}'s approval`,
      });
      
      navigate('/mentee/dashboard', { 
        state: { 
          bookingStatus: 'pending',
          bookingId: `BK${Date.now()}`,
          mentor: mentor.name
        } 
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8">
        <div className="container max-w-3xl px-4">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Confirm Your Session</h1>
            <p className="text-muted-foreground">Review the details before booking</p>
          </div>

          {/* Booking Details Card */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Session Details
            </h2>
            
            <div className="space-y-4">
              {/* Mentor Info */}
              <div className="flex items-start justify-between pb-4 border-b">
                <div>
                  <div className="font-semibold text-lg">{mentor.name}</div>
                  <div className="text-sm text-muted-foreground">{mentor.role}</div>
                  <div className="mt-1">
                    <CollegeDisplay collegeName={mentor.college} variant="desktop" />
                  </div>
                </div>
              </div>

              {/* Session Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Date</div>
                    <div className="font-semibold">{date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Time</div>
                    <div className="font-semibold">{time} ({duration} min)</div>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <PricingDisplay hourlyRate={mentor.hourlyRate} variant="inline" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{duration} minutes</span>
                </div>
                <div className="flex items-center justify-between text-base font-bold pt-2 border-t">
                  <span>Total Cost</span>
                  <span className="text-primary">₹{totalCost.toFixed(2)}</span>
                </div>
              </div>

              {/* Wallet Status */}
              <div className={`flex items-center justify-between p-4 rounded-lg ${hasInsufficientBalance ? 'bg-destructive/10 border border-destructive/20' : 'bg-success/10 border border-success/20'}`}>
                <div className="flex items-center gap-3">
                  <Wallet className={`h-5 w-5 ${hasInsufficientBalance ? 'text-destructive' : 'text-success'}`} />
                  <div>
                    <div className="text-sm text-muted-foreground">Current Wallet Balance</div>
                    <div className="font-bold">₹{walletBalance.toFixed(2)}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground text-right">After Booking</div>
                  <div className={`font-bold ${hasInsufficientBalance ? 'text-destructive' : 'text-success'}`}>
                    ₹{hasInsufficientBalance ? '0.00' : walletAfter.toFixed(2)}
                  </div>
                </div>
              </div>

              {hasInsufficientBalance && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <p className="text-sm text-destructive font-medium mb-2">⚠️ Insufficient Balance</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    You need ₹{(totalCost - walletBalance).toFixed(2)} more to book this session
                  </p>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => navigate('/mentee/wallet')}
                  >
                    Top Up Wallet
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Message to Mentor */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold mb-3">Message to Mentor (Optional)</h2>
            <Textarea
              placeholder="Let the mentor know what you'd like to discuss..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={200}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">{message.length}/200 characters</p>
          </Card>

          {/* Terms Agreement */}
          <Card className="p-6 mb-6">
            <div className="flex items-start gap-3">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                I agree to the mentoring session terms. I understand that the session will be charged at ₹{perMinuteRate.toFixed(2)}/minute and the mentor has the right to accept or decline this booking request.
              </label>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(-1)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              size="lg"
              onClick={handleConfirmBooking}
              disabled={!agreedToTerms || hasInsufficientBalance || isBooking}
              className="flex-1"
            >
              {isBooking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Confirm Booking
                </>
              )}
            </Button>
          </div>

          {/* Info Box */}
          <Card className="mt-6 p-4 bg-primary/5 border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong>What happens next?</strong><br />
              1. Your booking request will be sent to {mentor.name}<br />
              2. The mentor will respond within 1 hour<br />
              3. You'll receive a notification once confirmed<br />
              4. Payment will only be deducted after mentor approval
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BookingConfirmation;