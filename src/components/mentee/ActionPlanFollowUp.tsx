import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Sparkles,
  ChevronRight,
  Trophy,
  GraduationCap,
  Star,
} from 'lucide-react';

const ActionPlanFollowUp = () => {
  const navigate = useNavigate();

  // Mock data — in real app, fetched from session records
  const totalActions = 5;
  const completedActions = 2;
  const progressPercent = Math.round((completedActions / totalActions) * 100);
  const pendingSessions = 2;

  if (totalActions <= 0) return null;

  return (
    <Card
      className="p-4 border-l-4 border-l-primary/50 hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => navigate('/mentee/journey')}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-foreground">Your Action Plan</h3>
            <Badge variant="outline" className="text-[11px] border-primary/30 text-primary ml-2">
              {completedActions}/{totalActions} done
            </Badge>
          </div>

          {/* Progress bar */}
          <Progress value={progressPercent} className="h-1.5 mb-2" />

          {/* Benefits — single line */}
          <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Trophy className="h-3 w-3 text-bonus flex-shrink-0" />
              College recognition
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <GraduationCap className="h-3 w-3 text-primary flex-shrink-0" />
              Credit boost
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Star className="h-3 w-3 text-success flex-shrink-0" />
              Extra sessions
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </div>

      {pendingSessions > 0 && (
        <p className="text-[11px] text-primary font-medium mt-2 ml-13 pl-[52px]">
          {pendingSessions} sessions need your follow-up — complete actions & upload evidence
        </p>
      )}
    </Card>
  );
};

export default ActionPlanFollowUp;
