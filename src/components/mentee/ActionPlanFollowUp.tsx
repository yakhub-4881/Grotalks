import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  ChevronRight,
  Trophy,
  GraduationCap,
  Star,
  Sparkles,
  FileImage,
  X,
  Eye,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type ActionStatus = 'done' | 'in_progress' | 'not_yet';

interface ActionItem {
  id: string;
  title: string;
  description: string;
  status: ActionStatus;
  evidence?: string; // file name
}

interface PendingSession {
  id: number;
  mentorName: string;
  mentorInitials: string;
  date: string;
  daysLeft: number;
  actions: ActionItem[];
}

const statusConfig = {
  done: { label: 'Done', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' },
  in_progress: { label: 'In Progress', icon: Clock, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
  not_yet: { label: 'Not Yet', icon: AlertCircle, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border' },
};

const benefits = [
  { icon: Trophy, label: 'College recognition for top performers', color: 'text-bonus' },
  { icon: GraduationCap, label: 'Credit score boost in final semester', color: 'text-primary' },
  { icon: Star, label: 'Extra session allocation for best outcomes', color: 'text-success' },
];

const ActionPlanFollowUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showEvidenceDialog, setShowEvidenceDialog] = useState(false);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const [expandedSession, setExpandedSession] = useState<number | null>(1);

  const [sessions, setSessions] = useState<PendingSession[]>([
    {
      id: 1,
      mentorName: 'Arjun Singh',
      mentorInitials: 'AS',
      date: 'Oct 28, 2024',
      daysLeft: 5,
      actions: [
        { id: '1a', title: 'Update LinkedIn headline', description: 'Add "Aspiring PM" to profile', status: 'done', evidence: 'linkedin-screenshot.png' },
        { id: '1b', title: 'Complete a PM case study', description: 'Write a product improvement proposal', status: 'in_progress' },
        { id: '1c', title: 'Reach out to 3 PMs', description: 'Send personalized connection requests', status: 'not_yet' },
      ],
    },
    {
      id: 2,
      mentorName: 'Priya Sharma',
      mentorInitials: 'PS',
      date: 'Oct 20, 2024',
      daysLeft: 0,
      actions: [
        { id: '2a', title: 'Solve 50 LeetCode problems', description: 'Focus on arrays, trees, and graphs', status: 'in_progress' },
        { id: '2b', title: 'Practice system design', description: 'Design 3 systems end to end', status: 'not_yet' },
      ],
    },
  ]);

  const totalActions = sessions.reduce((sum, s) => sum + s.actions.length, 0);
  const completedActions = sessions.reduce((sum, s) => sum + s.actions.filter(a => a.status === 'done').length, 0);
  const progressPercent = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;

  const handleStatusChange = (sessionId: number, actionId: string, newStatus: ActionStatus) => {
    if (newStatus === 'done') {
      setActiveActionId(actionId);
      setShowEvidenceDialog(true);
      // Store sessionId for later
      setActiveSessionForEvidence(sessionId);
      return;
    }
    updateActionStatus(sessionId, actionId, newStatus);
  };

  const [activeSessionForEvidence, setActiveSessionForEvidence] = useState<number | null>(null);

  const updateActionStatus = (sessionId: number, actionId: string, newStatus: ActionStatus, evidence?: string) => {
    setSessions(prev => prev.map(s => {
      if (s.id !== sessionId) return s;
      return {
        ...s,
        actions: s.actions.map(a => a.id === actionId ? { ...a, status: newStatus, ...(evidence ? { evidence } : {}) } : a),
      };
    }));
  };

  const handleEvidenceUpload = () => {
    if (activeActionId && activeSessionForEvidence !== null) {
      updateActionStatus(activeSessionForEvidence, activeActionId, 'done', 'evidence-uploaded.pdf');
      toast({
        title: '✓ Action completed with evidence',
        description: 'Great work! Your progress has been recorded and shared with your college.',
      });
    }
    setShowEvidenceDialog(false);
    setActiveActionId(null);
    setActiveSessionForEvidence(null);
  };

  const handleSkipEvidence = () => {
    if (activeActionId && activeSessionForEvidence !== null) {
      updateActionStatus(activeSessionForEvidence, activeActionId, 'done');
      toast({
        title: '✓ Marked as done',
        description: 'Tip: Adding evidence increases your chances of earning college recognition!',
      });
    }
    setShowEvidenceDialog(false);
    setActiveActionId(null);
    setActiveSessionForEvidence(null);
  };

  if (sessions.length === 0) return null;

  return (
    <>
      <Card className="p-4 md:p-6 border-l-4 border-l-primary/60">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-4.5 w-4.5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Your Action Plan</h3>
              <p className="text-xs text-muted-foreground">Complete actions to unlock rewards</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
            {completedActions}/{totalActions} done
          </Badge>
        </div>

        {/* Overall Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Overall completion</span>
            <span className="text-xs font-semibold text-foreground">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Benefits Banner — compact & motivating */}
        <div className="bg-gradient-to-r from-primary/5 via-bonus/5 to-success/5 rounded-lg p-3 mb-4">
          <p className="text-xs font-medium text-foreground mb-2">Why complete your action plan?</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <b.icon className={`h-3.5 w-3.5 ${b.color} flex-shrink-0`} />
                <span className="text-[11px] text-muted-foreground leading-tight">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Session Action Lists */}
        <div className="space-y-3">
          {sessions.map((session) => {
            const sessionCompleted = session.actions.filter(a => a.status === 'done').length;
            const sessionTotal = session.actions.length;
            const isExpanded = expandedSession === session.id;

            return (
              <div key={session.id} className="rounded-lg border bg-background">
                {/* Session Header — always visible */}
                <button
                  onClick={() => setExpandedSession(isExpanded ? null : session.id)}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/30 transition-colors rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {session.mentorInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Session with {session.mentorName}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {session.date} · {sessionCompleted}/{sessionTotal} actions done
                      {session.daysLeft > 0 && (
                        <span className="text-warning font-medium"> · {session.daysLeft} days left</span>
                      )}
                      {session.daysLeft === 0 && sessionCompleted < sessionTotal && (
                        <span className="text-destructive font-medium"> · Overdue</span>
                      )}
                    </p>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                {/* Expanded Action Items */}
                {isExpanded && (
                  <div className="px-3 pb-3 space-y-2">
                    {session.actions.map((action) => {
                      const cfg = statusConfig[action.status];
                      const StatusIcon = cfg.icon;

                      return (
                        <div key={action.id} className={`rounded-lg border p-3 ${cfg.bg} ${cfg.border}`}>
                          <div className="flex items-start gap-2.5">
                            <StatusIcon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${cfg.color}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground">{action.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>

                              {/* Evidence badge if uploaded */}
                              {action.evidence && action.status === 'done' && (
                                <div className="flex items-center gap-1 mt-1.5">
                                  <FileImage className="h-3 w-3 text-success" />
                                  <span className="text-[11px] text-success font-medium">Evidence attached</span>
                                </div>
                              )}

                              {/* Status buttons for non-done items */}
                              {action.status !== 'done' && (
                                <div className="flex items-center gap-1.5 mt-2">
                                  <Button
                                    size="sm"
                                    className="h-7 text-[11px] px-2.5 bg-success hover:bg-success/90 text-success-foreground"
                                    onClick={() => handleStatusChange(session.id, action.id, 'done')}
                                  >
                                    <Upload className="h-3 w-3 mr-1" />
                                    Mark Done
                                  </Button>
                                  {action.status !== 'in_progress' && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-7 text-[11px] px-2.5 border-warning/40 text-warning hover:bg-warning/10"
                                      onClick={() => handleStatusChange(session.id, action.id, 'in_progress')}
                                    >
                                      In Progress
                                    </Button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View Journey CTA */}
        <Button
          variant="ghost"
          className="w-full mt-4 text-sm text-primary hover:text-primary hover:bg-primary/5 h-9"
          onClick={() => navigate('/mentee/journey')}
        >
          View your complete journey
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </Card>

      {/* Evidence Upload Dialog */}
      <Dialog open={showEvidenceDialog} onOpenChange={setShowEvidenceDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Add Evidence</DialogTitle>
            <DialogDescription className="text-sm">
              Upload a screenshot, document, or link as proof of completion. This strengthens your profile for college recognition and extra session rewards.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* Upload area */}
            <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer bg-primary/5">
              <Upload className="h-8 w-8 text-primary/60 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Drop files here or tap to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Screenshots, PDFs, certificates — max 5MB</p>
            </div>

            {/* What counts as evidence */}
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs font-medium text-foreground mb-1.5">What counts as evidence?</p>
              <ul className="text-[11px] text-muted-foreground space-y-1">
                <li>• Screenshot of LinkedIn profile update</li>
                <li>• Email confirmation or certificate</li>
                <li>• Link to published work or repository</li>
                <li>• Photo of completed assignment</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 h-10" onClick={handleSkipEvidence}>
                Skip for now
              </Button>
              <Button className="flex-1 h-10" onClick={handleEvidenceUpload}>
                <Upload className="h-4 w-4 mr-1.5" />
                Upload & Complete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionPlanFollowUp;
