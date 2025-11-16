import { calculatePerMinuteRate } from '@/lib/college-config';
import { Coins } from 'lucide-react';

interface PricingDisplayProps {
  hourlyRate: number;
  variant?: 'card' | 'inline' | 'detail';
  showIcon?: boolean;
}

export const PricingDisplay = ({ 
  hourlyRate, 
  variant = 'card',
  showIcon = true 
}: PricingDisplayProps) => {
  const perMinuteRate = calculatePerMinuteRate(hourlyRate);

  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center gap-1">
        {showIcon && <Coins className="h-3 w-3 text-primary" />}
        <span className="font-bold text-primary">₹{perMinuteRate.toFixed(2)}/min</span>
        <span className="text-xs text-muted-foreground">(₹{hourlyRate}/hr)</span>
      </span>
    );
  }

  if (variant === 'detail') {
    return (
      <div className="flex items-center gap-2">
        {showIcon && <Coins className="h-4 w-4 text-primary" />}
        <div>
          <div className="font-bold text-lg text-primary">₹{perMinuteRate.toFixed(2)}/min</div>
          <div className="text-xs text-muted-foreground">(₹{hourlyRate}/hour rate)</div>
        </div>
      </div>
    );
  }

  // Default 'card' variant
  return (
    <div className="flex items-center gap-2">
      {showIcon && <Coins className="h-4 w-4 text-primary" />}
      <span className="font-bold text-base text-primary">₹{perMinuteRate.toFixed(2)}/min</span>
      <span className="text-xs text-muted-foreground">(₹{hourlyRate}/hr)</span>
    </div>
  );
};
