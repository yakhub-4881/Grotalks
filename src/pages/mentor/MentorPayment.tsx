import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppContext } from '@/lib/app-context';
import { useToast } from '@/hooks/use-toast';

const MentorPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setIsAuthenticated, setUserType } = useAppContext();
  const [upiId, setUpiId] = useState('');
  const [upiVerified, setUpiVerified] = useState(false);
  const [upiTesting, setUpiTesting] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [upiAuthorized, setUpiAuthorized] = useState(false);
  const [mentorRoleUnderstood, setMentorRoleUnderstood] = useState(false);

  const handleTestUPI = () => {
    setUpiTesting(true);
    // Mock UPI verification
    setTimeout(() => {
      setUpiVerified(true);
      setUpiTesting(false);
    }, 1500);
  };

  const handleComplete = () => {
    setIsAuthenticated(true);
    setUserType('mentor');
    
    toast({
      title: '🎉 Welcome to GroTalks!',
      description: 'Your mentor profile has been created successfully',
    });
    
    navigate('/mentor/dashboard');
    
    // Show success notification after navigation
    setTimeout(() => {
      toast({
        title: '✅ Profile Setup Complete',
        description: 'Welcome! You have successfully completed your profile setup as a mentor.',
      });
    }, 500);
  };

  const isFormValid = 
    upiId && upiVerified && 
    termsAgreed && upiAuthorized && mentorRoleUnderstood;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8 px-4">
        <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          {/* Progress Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Payment & Verification</h1>
            <p className="text-sm text-muted-foreground">Step 7 of 8</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[87.5%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="space-y-8">
            {/* UPI Setup */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">UPI Setup</h2>
              <p className="text-sm text-muted-foreground">For instant withdrawals of your earnings</p>

              <div className="space-y-2">
                <Label htmlFor="upi" className="text-sm font-semibold">UPI ID*</Label>
                <Input
                  id="upi"
                  type="text"
                  placeholder="username@bankname"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="h-12 text-base"
                />
                <p className="text-xs text-muted-foreground">
                  Format: username@bankname OR 10-digit-phone@bank
                </p>
              </div>

              <Button
                onClick={handleTestUPI}
                variant="secondary"
                className="w-full h-12"
                disabled={!upiId || upiVerified || upiTesting}
              >
                {upiTesting ? 'Verifying...' : upiVerified ? '✓ UPI Verified Successfully' : 'Test UPI'}
              </Button>

              {upiVerified && (
                <div className="p-4 bg-success/10 border border-success rounded-lg">
                  <p className="text-sm text-success font-medium">
                    ✓ Your UPI ID has been verified and is ready for instant withdrawals
                  </p>
                </div>
              )}
            </div>


            {/* Agreements */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Agreements</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={termsAgreed}
                    onCheckedChange={(checked) => setTermsAgreed(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    I agree to the Terms & Conditions
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="upi-auth"
                    checked={upiAuthorized}
                    onCheckedChange={(checked) => setUpiAuthorized(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="upi-auth" className="text-sm leading-relaxed cursor-pointer">
                    I authorize instant UPI withdrawals
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="role"
                    checked={mentorRoleUnderstood}
                    onCheckedChange={(checked) => setMentorRoleUnderstood(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="role" className="text-sm leading-relaxed cursor-pointer">
                    I understand mentor role & responsibilities
                  </Label>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/mentor/availability')} 
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button
                onClick={handleComplete}
                className="flex-1 h-12 font-medium"
                disabled={!isFormValid}
              >
                Complete Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentorPayment;
