import { getCollegeDisplay } from '@/lib/college-config';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CollegeDisplayProps {
  collegeName: string;
  variant?: 'desktop' | 'mobile';
  showTooltip?: boolean;
}

export const CollegeDisplay = ({ 
  collegeName, 
  variant = 'desktop',
  showTooltip = true 
}: CollegeDisplayProps) => {
  const displayText = getCollegeDisplay(collegeName, variant === 'mobile' ? 'abbr' : 'both');
  
  if (!showTooltip) {
    return <span className="text-sm text-muted-foreground">{displayText}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-sm text-muted-foreground cursor-help">
            {displayText}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{collegeName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
