import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Wallet } from 'lucide-react';
import { useAppContext } from '@/lib/app-context';

export const WalletBalanceWarning = () => {
  const navigate = useNavigate();
  const { walletBalance } = useAppContext();

  // Only show if balance is below ₹100
  if (walletBalance >= 100) return null;

  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-destructive mb-1">Low Wallet Balance</h3>
            <p className="text-sm text-muted-foreground mb-3">
              You need at least ₹100 to start a session. Current balance: ₹{walletBalance.toFixed(2)}
            </p>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => navigate('/mentee/wallet/recharge')}
              className="h-9"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Recharge Wallet Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
