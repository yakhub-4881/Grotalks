import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, TrendingUp, Loader2, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AlumniWithdraw = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [earnings, setEarnings] = useState(2450); // Mock earnings
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [upiId, setUpiId] = useState('alumni@paytm');
  const [isProcessing, setIsProcessing] = useState(false);

  const MIN_WITHDRAWAL = 500;

  const transactions = [
    { id: 'TXN001', date: 'Nov 1, 2025', amount: 300, status: 'Completed' },
    { id: 'TXN002', date: 'Nov 3, 2025', amount: 450, status: 'Completed' },
    { id: 'TXN003', date: 'Nov 5, 2025', amount: 600, status: 'Completed' },
  ];

  const handleWithdraw = async () => {
    const amount = parseInt(withdrawAmount);
    
    if (!amount || amount < MIN_WITHDRAWAL) {
      toast({
        title: 'Invalid Amount',
        description: `Minimum withdrawal amount is ₹${MIN_WITHDRAWAL}`,
        variant: 'destructive'
      });
      return;
    }

    if (amount > earnings) {
      toast({
        title: 'Insufficient Balance',
        description: 'Withdrawal amount exceeds available earnings',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);

    // Simulate withdrawal processing
    setTimeout(() => {
      setEarnings(earnings - amount);
      toast({
        title: '✓ Withdrawal Initiated',
        description: `₹${amount} will be transferred to ${upiId} within 24 hours`,
      });
      setIsProcessing(false);
      setWithdrawAmount('');
    }, 2000);
  };

  const canWithdraw = earnings >= MIN_WITHDRAWAL;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8">
        <div className="container max-w-5xl px-4">
          <Button variant="ghost" onClick={() => navigate('/alumni/dashboard')} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Withdraw Earnings</h1>
            <p className="text-muted-foreground">Transfer your earnings to your UPI account</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* Current Earnings */}
            <Card className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Available Earnings</p>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-success">₹{earnings.toFixed(2)}</p>
                </div>
                <TrendingUp className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-success flex-shrink-0" />
              </div>
              
              {!canWithdraw && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 md:p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs md:text-sm font-medium text-destructive">Minimum Not Met</p>
                      <p className="text-xs md:text-sm text-muted-foreground mt-1">
                        You need ₹{MIN_WITHDRAWAL - earnings} more to withdraw
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Withdrawal Form */}
            <Card className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-4">Initiate Withdrawal</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm md:text-base">Withdrawal Amount*</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm md:text-base">₹</span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder={`Min ₹${MIN_WITHDRAWAL}`}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="h-10 md:h-12 pl-7 md:pl-8 text-sm md:text-base"
                      min={MIN_WITHDRAWAL}
                      max={earnings}
                    />
                  </div>
                  {withdrawAmount && parseInt(withdrawAmount) < MIN_WITHDRAWAL && (
                    <p className="text-xs md:text-sm text-destructive">Minimum withdrawal is ₹{MIN_WITHDRAWAL}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="upi" className="text-sm md:text-base">UPI ID*</Label>
                  <Input
                    id="upi"
                    type="text"
                    placeholder="yourname@paytm"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="h-10 md:h-12 text-sm md:text-base"
                  />
                </div>

                <Button
                  onClick={handleWithdraw}
                  disabled={!canWithdraw || !withdrawAmount || parseInt(withdrawAmount) < MIN_WITHDRAWAL || isProcessing}
                  className="w-full h-10 md:h-12 text-sm md:text-base"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Withdraw ₹{withdrawAmount || '0'}
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Funds will be transferred within 24 hours
                </p>
              </div>
            </Card>
          </div>

          {/* Transaction History */}
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold mb-4">Earnings History</h3>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="inline-block min-w-full align-middle px-4 md:px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs md:text-sm">Transaction ID</TableHead>
                      <TableHead className="text-xs md:text-sm">Date</TableHead>
                      <TableHead className="text-xs md:text-sm">Amount</TableHead>
                      <TableHead className="text-xs md:text-sm">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((txn) => (
                      <TableRow key={txn.id}>
                        <TableCell className="font-mono text-xs md:text-sm">{txn.id}</TableCell>
                        <TableCell className="text-xs md:text-sm whitespace-nowrap">{txn.date}</TableCell>
                        <TableCell className="font-semibold text-success text-xs md:text-sm whitespace-nowrap">₹{txn.amount}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success whitespace-nowrap">
                            {txn.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>

          {/* Info */}
          <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>💡 Withdrawal Policy:</strong><br />
              • Minimum withdrawal: ₹{MIN_WITHDRAWAL}<br />
              • Processing time: 24 hours<br />
              • No charges for UPI transfers<br />
              • TDS applicable as per income tax regulations
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AlumniWithdraw;
