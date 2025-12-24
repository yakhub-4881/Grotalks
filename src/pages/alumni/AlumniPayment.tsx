import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppContext } from '@/lib/app-context';
import { useToast } from '@/hooks/use-toast';

const AlumniPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setIsAuthenticated, setUserType } = useAppContext();
  const [payoutMethod, setPayoutMethod] = useState<'upi' | 'bank'>('upi');
  const [upiId, setUpiId] = useState('');
  const [upiVerified, setUpiVerified] = useState(false);
  const [upiTesting, setUpiTesting] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [upiAuthorized, setUpiAuthorized] = useState(false);
  const [alumniRoleUnderstood, setAlumniRoleUnderstood] = useState(false);

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
    setUserType('alumni');
    
    toast({
      title: '🎉 Welcome to GroTalks!',
      description: 'Your alumni profile has been created successfully',
    });
    
    navigate('/alumni/first-time');
    
    // Show success notification after navigation
    setTimeout(() => {
      toast({
        title: '✅ Profile Setup Complete',
        description: 'Welcome! You have successfully completed your profile setup as a alumni.',
      });
    }, 500);
  };

  const bankValid = accountName.trim().length > 2 && accountNumber.trim().length >= 8 && ifsc.trim().length >= 8;
  const isFormValid =
    ((payoutMethod === 'upi' && upiId && upiVerified) ||
     (payoutMethod === 'bank' && bankValid));

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8 px-4">
        <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          {/* Progress Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Payment & Verification</h1>
            <p className="text-sm text-muted-foreground">Step 8 of 9</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[88%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Payout Method */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Payout Method</h2>
              <p className="text-sm text-muted-foreground">Choose how you’d like to receive withdrawals</p>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={payoutMethod === 'upi' ? 'default' : 'outline'}
                  className="h-11"
                  onClick={() => setPayoutMethod('upi')}
                >
                  UPI
                </Button>
                <Button
                  type="button"
                  variant={payoutMethod === 'bank' ? 'default' : 'outline'}
                  className="h-11"
                  onClick={() => setPayoutMethod('bank')}
                >
                  Bank Account
                </Button>
              </div>

              {payoutMethod === 'upi' ? (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="upi" className="text-sm font-semibold">UPI ID*</Label>
                    <div className="flex gap-2">
                      <Input
                        id="upi"
                        type="text"
                        placeholder="username@bankname"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          setUpiVerified(false);
                        }}
                        className="h-12 text-base flex-1"
                      />
                      <Button
                        onClick={handleTestUPI}
                        variant="secondary"
                        className="h-12 px-4 whitespace-nowrap"
                        disabled={!upiId.includes('@') || upiVerified || upiTesting}
                      >
                        {upiTesting ? 'Verifying...' : upiVerified ? '✓ Verified' : 'Verify'}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Format: username@bankname OR 10-digit-phone@bank
                    </p>
                  </div>

                  {upiVerified && (
                    <div className="p-4 bg-success/10 border border-success rounded-lg">
                      <p className="text-sm text-success font-medium">
                        ✓ Your UPI ID has been verified and is ready for instant withdrawals
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="accountName" className="text-sm font-semibold">Account Holder Name*</Label>
                    <Input
                      id="accountName"
                      placeholder="Full name as per bank"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber" className="text-sm font-semibold">Account Number*</Label>
                    <Input
                      id="accountNumber"
                      placeholder="Enter account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\s+/g, ''))}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifsc" className="text-sm font-semibold">IFSC Code*</Label>
                    <Input
                      id="ifsc"
                      placeholder="SBIN0001234"
                      value={ifsc}
                      onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                      className="h-12 text-base"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Bank transfers may take 1-2 business days. Ensure details match your bank records.
                  </p>
                </div>
              )}
            </div>



            {/* Navigation */}
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/alumni/meeting-setup')} 
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

export default AlumniPayment;
