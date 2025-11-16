import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/lib/app-context';
import { Loader2, CheckCircle2, XCircle, Linkedin } from 'lucide-react';

const MenteeSignupLinkedInUPI = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setIsAuthenticated, setWalletBalance } = useAppContext();
  
  const [linkedinState, setLinkedinState] = useState<'not-connected' | 'connecting' | 'connected'>('not-connected');
  const [linkedinData, setLinkedinData] = useState({ name: '', headline: '', avatar: '' });
  
  const [upiId, setUpiId] = useState('');
  const [upiState, setUpiState] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');
  const [upiRetries, setUpiRetries] = useState(0);

  useEffect(() => {
    // Check if previous steps completed
    const profileData = sessionStorage.getItem('menteeProfile');
    const interests = sessionStorage.getItem('menteeInterests');
    if (!profileData || !interests) {
      toast({
        title: 'Session Expired',
        description: 'Please start from beginning',
        variant: 'destructive'
      });
      navigate('/mentee/signup');
    }
  }, []);

  const handleLinkedInConnect = () => {
    setLinkedinState('connecting');
    
    // Simulate OAuth flow
    setTimeout(() => {
      setLinkedinState('connected');
      setLinkedinData({
        name: 'Sample User',
        headline: 'Student at College',
        avatar: '👤'
      });
      toast({
        title: 'LinkedIn Connected',
        description: 'Your profile has been linked successfully',
      });
    }, 2000);
  };

  const handleUpiVerify = () => {
    if (upiRetries >= 3) {
      toast({
        title: 'Maximum Retries Reached',
        description: 'Please contact support for manual verification',
        variant: 'destructive'
      });
      return;
    }

    // Validate UPI format
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiRegex.test(upiId)) {
      toast({
        title: 'Invalid UPI ID',
        description: 'Please enter a valid UPI ID (e.g., user@paytm)',
        variant: 'destructive'
      });
      return;
    }

    setUpiState('verifying');
    setUpiRetries(prev => prev + 1);

    // Simulate verification
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      if (success) {
        setUpiState('verified');
        toast({
          title: 'UPI Verified',
          description: 'Your UPI ID has been verified successfully',
        });
      } else {
        setUpiState('failed');
        toast({
          title: 'Verification Failed',
          description: `Attempt ${upiRetries}/3. Please try again.`,
          variant: 'destructive'
        });
      }
    }, 2000);
  };

  const handleComplete = () => {
    if (linkedinState !== 'connected') {
      toast({
        title: 'LinkedIn Required',
        description: 'Please connect your LinkedIn account',
        variant: 'destructive'
      });
      return;
    }

    if (upiState !== 'verified') {
      toast({
        title: 'UPI Verification Required',
        description: 'Please verify your UPI ID',
        variant: 'destructive'
      });
      return;
    }

    // Credit wallet bonus
    setWalletBalance(100);
    setIsAuthenticated(true);
    
    // Clear session storage
    sessionStorage.removeItem('menteeProfile');
    sessionStorage.removeItem('menteeInterests');

    toast({
      title: '🎉 Welcome to Grotalks!',
      description: '₹100 bonus credited to your wallet',
    });

    navigate('/mentee/dashboard');
  };

  const canComplete = linkedinState === 'connected' && upiState === 'verified';

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8 px-4">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Student Verification</h1>
              <p className="text-sm text-muted-foreground">Step 5 of 5 - Connect LinkedIn & verify UPI</p>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[100%] transition-all duration-300"></div>
              </div>
            </div>

            <div className="space-y-6">
              {/* LinkedIn Connection */}
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#0A66C2]/10 text-[#0A66C2] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Connect LinkedIn</h3>
                    <p className="text-sm text-muted-foreground">
                      We use LinkedIn to verify your profile. We never post without permission.
                    </p>
                  </div>
                </div>

                {linkedinState === 'not-connected' && (
                  <Button onClick={handleLinkedInConnect} className="w-full" size="lg">
                    <Linkedin className="mr-2 h-5 w-5" />
                    Connect with LinkedIn
                  </Button>
                )}

                {linkedinState === 'connecting' && (
                  <Button disabled className="w-full" size="lg">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connecting to LinkedIn...
                  </Button>
                )}

                {linkedinState === 'connected' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
                      <div className="text-4xl">{linkedinData.avatar}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{linkedinData.name}</div>
                        <div className="text-sm text-muted-foreground">{linkedinData.headline}</div>
                      </div>
                      <CheckCircle2 className="h-6 w-6 text-success" />
                    </div>
                    <Button variant="outline" onClick={handleLinkedInConnect} className="w-full">
                      Reconnect LinkedIn
                    </Button>
                  </div>
                )}
              </Card>

              {/* UPI Verification */}
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    💳
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Verify UPI ID</h3>
                    <p className="text-sm text-muted-foreground">
                      Required for wallet refunds and transaction security. Your UPI is never charged.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="upi">UPI ID*</Label>
                    <div className="flex gap-2">
                      <Input
                        id="upi"
                        type="text"
                        placeholder="yourname@paytm"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className={`flex-1 h-12 ${
                          upiState === 'verified' ? 'border-success' : 
                          upiState === 'failed' ? 'border-destructive' : ''
                        }`}
                        disabled={upiState === 'verified'}
                      />
                      <Button
                        onClick={handleUpiVerify}
                        disabled={!upiId || upiState === 'verifying' || upiState === 'verified' || upiRetries >= 3}
                        className="h-12 px-6"
                      >
                        {upiState === 'verifying' ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : upiState === 'verified' ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Verified
                          </>
                        ) : (
                          'Verify'
                        )}
                      </Button>
                    </div>
                    {upiState === 'failed' && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <XCircle className="h-4 w-4" />
                        Verification failed. Attempt {upiRetries}/3. Please try again.
                      </p>
                    )}
                    {upiState === 'verified' && (
                      <p className="text-sm text-success flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        UPI ID verified successfully
                      </p>
                    )}
                  </div>

                  {upiRetries >= 3 && upiState !== 'verified' && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                      <p className="text-sm text-destructive font-medium">⚠️ Maximum Retries Reached</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Please contact support at support@grotalks.com for manual verification
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Info Box */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>🎁 Welcome Bonus:</strong><br />
                  Complete setup to receive ₹100 free credits in your wallet!
                </p>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => navigate('/mentee/interests')} className="flex-1 h-12">
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  className="flex-1 h-12 font-medium"
                  disabled={!canComplete}
                >
                  Complete Setup & Get ₹100
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MenteeSignupLinkedInUPI;
