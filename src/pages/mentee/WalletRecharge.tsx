import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/lib/app-context';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Wallet, CreditCard, Smartphone, Loader2 } from 'lucide-react';

const WalletRecharge = () => {
  const navigate = useNavigate();
  const { walletBalance, setWalletBalance } = useAppContext();
  const { toast } = useToast();
  
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'wallet'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  const handleRecharge = async () => {
    const rechargeAmount = parseInt(amount);
    
    if (!rechargeAmount || rechargeAmount < 100) {
      toast({
        title: 'Invalid Amount',
        description: 'Minimum recharge amount is ₹100',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setWalletBalance(walletBalance + rechargeAmount);
      toast({
        title: '✓ Recharge Successful',
        description: `₹${rechargeAmount} added to your wallet`,
      });
      setIsProcessing(false);
      navigate('/mentee/dashboard');
    }, 2000);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8">
        <div className="container max-w-3xl px-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Recharge Wallet</h1>
            <p className="text-muted-foreground">Add funds to book your next alumnihip session</p>
          </div>

          {/* Current Balance */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                <p className="text-3xl font-bold text-primary">₹{walletBalance.toFixed(2)}</p>
              </div>
              <Wallet className="h-12 w-12 text-primary" />
            </div>
          </Card>

          {/* Quick Amount Selection */}
          <Card className="p-6 mb-6">
            <Label className="text-base font-semibold mb-4 block">Quick Select Amount</Label>
            <div className="grid grid-cols-3 gap-3">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant={amount === amt.toString() ? 'default' : 'outline'}
                  onClick={() => setAmount(amt.toString())}
                  className="h-14"
                >
                  ₹{amt}
                </Button>
              ))}
            </div>
          </Card>

          {/* Custom Amount */}
          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <Label htmlFor="custom-amount" className="text-base font-semibold">
                Or Enter Custom Amount
              </Label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter amount (min ₹100)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-14 pl-8 text-lg"
                    min={100}
                  />
                </div>
              </div>
              {amount && parseInt(amount) < 100 && (
                <p className="text-sm text-destructive">Minimum recharge amount is ₹100</p>
              )}
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="p-6 mb-6">
            <Label className="text-base font-semibold mb-4 block">Select Payment Method</Label>
            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`w-full flex items-center gap-4 p-4 border-2 rounded-lg transition-colors ${
                  paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <Smartphone className="h-6 w-6 text-primary" />
                <div className="flex-1 text-left">
                  <div className="font-semibold">UPI Payment</div>
                  <div className="text-sm text-muted-foreground">GPay, PhonePe, Paytm</div>
                </div>
                {paymentMethod === 'upi' && <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">✓</div>}
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full flex items-center gap-4 p-4 border-2 rounded-lg transition-colors ${
                  paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <CreditCard className="h-6 w-6 text-primary" />
                <div className="flex-1 text-left">
                  <div className="font-semibold">Debit/Credit Card</div>
                  <div className="text-sm text-muted-foreground">Visa, Mastercard, Rupay</div>
                </div>
                {paymentMethod === 'card' && <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">✓</div>}
              </button>

              <button
                onClick={() => setPaymentMethod('wallet')}
                className={`w-full flex items-center gap-4 p-4 border-2 rounded-lg transition-colors ${
                  paymentMethod === 'wallet' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <Wallet className="h-6 w-6 text-primary" />
                <div className="flex-1 text-left">
                  <div className="font-semibold">Wallet</div>
                  <div className="text-sm text-muted-foreground">Paytm, PhonePe, Amazon Pay</div>
                </div>
                {paymentMethod === 'wallet' && <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">✓</div>}
              </button>
            </div>
          </Card>

          {/* Recharge Button */}
          <Button
            onClick={handleRecharge}
            disabled={!amount || parseInt(amount) < 100 || isProcessing}
            className="w-full h-14 text-lg font-semibold"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                Recharge ₹{amount || '0'}
              </>
            )}
          </Button>

          {/* Info */}
          <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>💡 Safe & Secure:</strong><br />
              All transactions are encrypted and secure. Amount will be instantly credited to your wallet.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WalletRecharge;
