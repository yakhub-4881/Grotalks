import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  BookOpen,
  Award,
} from 'lucide-react';

const followUpIcon = {
  done: { icon: CheckCircle2, color: 'text-success' },
  in_progress: { icon: Clock, color: 'text-warning' },
  not_yet: { icon: AlertCircle, color: 'text-muted-foreground' },
};

const JourneyPreview = () => {
  const navigate = useNavigate();

  // Latest 2 sessions as preview
  const recentSessions = [
    {
      id: 1,
      mentorName: 'Arjun Singh',
      mentorInitials: 'AS',
      date: 'Oct 28',
      goal: 'Transition to product management',
      status: 'Action Completed' as const,
      milestone: 'Got Interview Call',
      doneCount: 2,
      totalCount: 3,
    },
    {
      id: 2,
      mentorName: 'Priya Sharma',
      mentorInitials: 'PS',
      date: 'Oct 20',
      goal: 'Google SDE interview prep',
      status: 'Action Pending' as const,
      doneCount: 0,
      totalCount: 2,
    },
  ];

  const statusColor = {
    'Action Pending': 'text-warning border-warning/30',
    'Action Completed': 'text-success border-success/30',
    'Outcome Achieved': 'text-primary border-primary/30',
  };

  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4.5 w-4.5 text-primary" />
          <div>
            <h3 className="text-base font-semibold text-foreground">My Journey</h3>
            <p className="text-xs text-muted-foreground">3 sessions · 2 milestones achieved</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 mb-3">
        {recentSessions.map((session) => (
          <div key={session.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
              {session.mentorInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground truncate">{session.mentorName}</p>
                <span className="text-[11px] text-muted-foreground flex-shrink-0">{session.date}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{session.goal}</p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${statusColor[session.status]}`}>
                {session.doneCount}/{session.totalCount}
              </Badge>
              {session.milestone && (
                <span className="flex items-center gap-0.5 text-[10px] text-success">
                  <Award className="h-2.5 w-2.5" />
                  {session.milestone}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full h-9 text-sm text-primary border-primary/20 hover:bg-primary/5"
        onClick={() => navigate('/mentee/journey')}
      >
        View complete journey
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </Card>
  );
};

export default JourneyPreview;
