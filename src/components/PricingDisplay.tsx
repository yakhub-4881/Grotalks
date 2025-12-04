import { formatPrice, calculateSessionPrice } from '@/lib/college-config';
import { Clock } from 'lucide-react';

interface PricingDisplayProps {
  baseRate: number;
  variant?: 'card' | 'inline' | 'detail' | 'packages';
  showIcon?: boolean;
  selectedDuration?: number;
}

export const PricingDisplay = ({ 
  baseRate, 
  variant = 'card',
  showIcon = true,
  selectedDuration
}: PricingDisplayProps) => {
  
  if (variant === 'inline') {
    const price = selectedDuration 
      ? calculateSessionPrice(baseRate, selectedDuration)
      : baseRate;
    const durationLabel = selectedDuration ? `${selectedDuration} min` : '30 min';
    
    return (
      <span className="inline-flex items-center gap-1">
        {showIcon && <Clock className="h-3 w-3 text-primary" />}
        <span className="font-bold text-primary">{formatPrice(price)}</span>
        <span className="text-xs text-muted-foreground">/{durationLabel}</span>
      </span>
    );
  }

  if (variant === 'detail') {
    return (
      <div className="flex items-center gap-2">
        {showIcon && <Clock className="h-4 w-4 text-primary" />}
        <div>
          <div className="font-bold text-lg text-primary">
            {formatPrice(baseRate)}
            <span className="text-sm font-normal text-muted-foreground">/30 min</span>
          </div>
          <div className="text-xs text-muted-foreground">Video call</div>
        </div>
      </div>
    );
  }

  if (variant === 'packages') {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">15 min</span>
          <span className="font-semibold">{formatPrice(calculateSessionPrice(baseRate, 15))}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">30 min</span>
          <span className="font-semibold text-primary">{formatPrice(baseRate)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">1 hour</span>
          <span className="font-semibold">{formatPrice(calculateSessionPrice(baseRate, 60))}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {showIcon && <Clock className="h-4 w-4 text-primary" />}
      <span className="font-bold text-base text-primary">{formatPrice(baseRate)}</span>
      <span className="text-xs text-muted-foreground">/30 min</span>
    </div>
  );
};
