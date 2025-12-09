import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAppContext } from '@/lib/app-context';

const MenteeWallet = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAppContext();
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const freeBonus = 100;
  const quickAmounts = [100, 300, 500, 1000];

  const handleQuickAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    const numValue = parseInt(value) || 0;
    setCustomAmount(value);
    setSelectedAmount(numValue);
  };

  const totalBalance = freeBonus + selectedAmount;

  const handleComplete = () => {
    setIsAuthenticated(true);
    navigate('/mentee/dashboard');
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8 px-4">
        <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Setup Your Wallet</h1>
            <p className="text-sm text-muted-foreground">Complete your Student registration</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[100%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="space-y-6">
            {/* PROMINENT WELCOME BONUS - EMERALD/TEAL GRADIENT FOR SURPRISE EFFECT */}
            <div className="p-8 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-center space-y-4 shadow-2xl border-2 border-emerald-300 animate-scale-in">
              <div className="text-5xl animate-bounce">🎉</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">WELCOME BONUS!</h2>
              <p className="text-xl font-semibold text-white drop-shadow">
                You've received <span className="font-bold text-4xl md:text-5xl text-white drop-shadow-lg">₹100 FREE</span> to start!
              </p>
              <div className="space-y-2">
                <p className="text-base font-medium text-white">✨ Use it for your first alumniing session</p>
                <p className="text-base font-medium text-white">💚 No payment needed - It's on us!</p>
              </div>
            </div>

            {/* Current Balance - LARGE DISPLAY */}
            <div className="p-8 bg-card border-2 border-success rounded-lg text-center">
              <Label className="text-base text-muted-foreground font-medium">Your Current Balance</Label>
              <p className="text-5xl md:text-6xl font-bold mt-3" style={{ color: '#10B981' }}>
                ₹{freeBonus}
              </p>
              <p className="text-lg font-bold mt-2" style={{ color: '#10B981' }}>FREE ✓</p>
            </div>

            {/* Optional Top-up */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Optional: Add More Credits</Label>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? 'default' : 'outline'}
                    onClick={() => handleQuickAmount(amount)}
                    className="h-16 text-lg font-semibold"
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom" className="text-sm font-semibold">Custom Amount</Label>
                <Input
                  id="custom"
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              {selectedAmount > 0 && (
                <div className="p-4 bg-muted rounded-lg border">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span>Free Bonus:</span>
                    <span className="font-semibold text-success">₹{freeBonus}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span>Your Top-up:</span>
                    <span className="font-semibold">₹{selectedAmount}</span>
                  </div>
                  <div className="h-px bg-border my-2"></div>
                  <div className="flex justify-between items-center text-base font-bold">
                    <span>Total Balance:</span>
                    <span className="text-primary">₹{totalBalance}</span>
                  </div>
                </div>
              )}
            </div>

            {selectedAmount > 0 && (
              <div className="space-y-4">
                <Label className="text-base font-semibold">Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary cursor-pointer">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="cursor-pointer flex-1">
                      <span className="font-medium">UPI</span>
                      <span className="ml-2 text-sm text-muted-foreground">(Recommended)</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary cursor-pointer">
                    <RadioGroupItem value="debit" id="debit" />
                    <Label htmlFor="debit" className="cursor-pointer flex-1 font-medium">
                      Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary cursor-pointer">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="cursor-pointer flex-1 font-medium">
                      Credit Card
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-muted rounded-lg space-y-3">
                    <div className="aspect-square w-32 mx-auto bg-white rounded-lg flex items-center justify-center">
                      <p className="text-xs text-center text-gray-600">QR Code<br/>Mock Display</p>
                    </div>
                    <p className="text-center text-sm font-medium">
                      UPI ID: grotalks@razorpay
                    </p>
                    <p className="text-center text-sm text-muted-foreground">
                      Amount: ₹{selectedAmount}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {selectedAmount > 0 ? (
                <>
                  <Button onClick={handleComplete} className="w-full h-12 text-base font-medium">
                    Proceed to Pay ₹{selectedAmount}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleComplete}
                    className="w-full h-12 text-base font-medium"
                  >
                    Skip & Use ₹{freeBonus} Free Credits
                  </Button>
                </>
              ) : (
                <Button onClick={handleComplete} className="w-full h-12 text-base font-medium">
                  Complete Setup with ₹{freeBonus} Free
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MenteeWallet;
