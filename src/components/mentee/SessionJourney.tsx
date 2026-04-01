import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  Award,
  Calendar,
} from 'lucide-react';

interface ActionFollowUp {
  title: string;
  status: 'done' | 'in_progress' | 'not_yet';
}

interface JourneySession {
  id: number;
  alumniName: string;
  alumniInitials: string;
  date: string;
  preSessionGoal: string;
  actionItems: { title: string; description: string }[];
  followUps: ActionFollowUp[];
  sessionStatus: 'Action Pending' | 'Action Completed' | 'Outcome Achieved';
  linkedMilestone?: string;
}

const statusBadge = {
  'Action Pending': { variant: 'outline' as const, className: 'border-warning text-warning' },
  'Action Completed': { variant: 'outline' as const, className: 'border-success text-success' },
  'Outcome Achieved': { variant: 'outline' as const, className: 'border-primary text-primary' },
};

const followUpIcon = {
  done: { icon: CheckCircle2, color: 'text-success' },
  in_progress: { icon: Clock, color: 'text-warning' },
  not_yet: { icon: AlertCircle, color: 'text-muted-foreground' },
};

const SessionJourney = () => {
  // Mock chronological session data
  const sessions: JourneySession[] = [
    {
      id: 1,
      alumniName: 'Arjun Singh',
      alumniInitials: 'AS',
      date: 'Oct 28, 2024',
      preSessionGoal: 'Understand how to transition from engineering to product management',
      actionItems: [
        { title: 'Update LinkedIn headline', description: 'Add "Aspiring PM" to your profile' },
        { title: 'Complete a PM case study', description: 'Write a product improvement proposal' },
        { title: 'Reach out to 3 PMs', description: 'Send personalized connection requests' },
      ],
      followUps: [
        { title: 'Update LinkedIn headline', status: 'done' },
        { title: 'Complete a PM case study', status: 'in_progress' },
        { title: 'Reach out to 3 PMs', status: 'done' },
      ],
      sessionStatus: 'Action Completed',
      linkedMilestone: 'Got an Interview Call',
    },
    {
      id: 2,
      alumniName: 'Priya Sharma',
      alumniInitials: 'PS',
      date: 'Oct 20, 2024',
      preSessionGoal: 'Prepare for Google SDE interview rounds',
      actionItems: [
        { title: 'Solve 50 LeetCode medium problems', description: 'Focus on arrays, trees, and graphs' },
        { title: 'Practice system design', description: 'Design 3 systems end to end' },
      ],
      followUps: [
        { title: 'Solve 50 LeetCode medium problems', status: 'in_progress' },
        { title: 'Practice system design', status: 'not_yet' },
      ],
      sessionStatus: 'Action Pending',
    },
    {
      id: 3,
      alumniName: 'Rahul Verma',
      alumniInitials: 'RV',
      date: 'Sep 15, 2024',
      preSessionGoal: 'Understand startup fundraising basics',
      actionItems: [
        { title: 'Draft a 1-page pitch', description: 'Summarize your idea for investors' },
        { title: 'Research 5 VCs', description: 'Find VCs investing in your sector' },
        { title: 'Build an MVP prototype', description: 'Create a basic clickable demo' },
      ],
      followUps: [
        { title: 'Draft a 1-page pitch', status: 'done' },
        { title: 'Research 5 VCs', status: 'done' },
        { title: 'Build an MVP prototype', status: 'done' },
      ],
      sessionStatus: 'Outcome Achieved',
      linkedMilestone: 'Applied for Internship',
    },
  ];

  return (
    <Card className="p-4 md:p-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">My Journey</h3>
      <p className="text-sm text-muted-foreground mb-6">Your personal career diary — see how far you've come</p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8">
          {sessions.map((session) => {
            const badge = statusBadge[session.sessionStatus];
            return (
              <div key={session.id} className="relative pl-12">
                {/* Timeline dot */}
                <div className="absolute left-3 top-1 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10">
                  <Calendar className="h-3 w-3" />
                </div>

                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {session.alumniInitials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{session.alumniName}</p>
                      <p className="text-xs text-muted-foreground">{session.date}</p>
                    </div>
                    <Badge variant={badge.variant} className={badge.className + ' ml-auto text-xs'}>
                      {session.sessionStatus}
                    </Badge>
                  </div>

                  {/* Pre-session goal */}
                  <div className="flex items-start gap-2 bg-muted/50 rounded-lg p-3">
                    <Target className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Session Goal</p>
                      <p className="text-sm text-foreground">{session.preSessionGoal}</p>
                    </div>
                  </div>

                  {/* Action plan */}
                  <div className="flex items-start gap-2 bg-primary/5 rounded-lg p-3">
                    <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-2">Action Plan</p>
                      <div className="space-y-1.5">
                        {session.actionItems.map((item, i) => (
                          <p key={i} className="text-sm text-foreground">
                            <span className="font-medium">{i + 1}.</span> {item.title}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Follow-up status */}
                  {session.followUps.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs text-muted-foreground">Follow-up Status</p>
                      <div className="flex flex-wrap gap-2">
                        {session.followUps.map((fu, i) => {
                          const cfg = followUpIcon[fu.status];
                          const Icon = cfg.icon;
                          return (
                            <div key={i} className="flex items-center gap-1.5 text-xs bg-background border rounded-full px-2.5 py-1">
                              <Icon className={`h-3.5 w-3.5 ${cfg.color}`} />
                              <span className="text-foreground">{fu.title}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Linked milestone */}
                  {session.linkedMilestone && (
                    <div className="flex items-center gap-2 text-xs bg-success/10 text-success rounded-full px-3 py-1.5 w-fit">
                      <Award className="h-3.5 w-3.5" />
                      <span className="font-medium">{session.linkedMilestone}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default SessionJourney;
