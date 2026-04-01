import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
  Award,
  Calendar,
  FileImage,
  Upload,
  Trophy,
  GraduationCap,
  Star,
  ChevronRight,
  Eye,
  FileText,
  File,
  X,
  Image as ImageIcon,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type ActionStatus = 'done' | 'in_progress' | 'not_yet';

interface ActionFollowUp {
  id: string;
  title: string;
  description: string;
  status: ActionStatus;
  evidence?: string;
}

interface JourneySession {
  id: number;
  alumniName: string;
  alumniInitials: string;
  date: string;
  preSessionGoal: string;
  actions: ActionFollowUp[];
  sessionStatus: 'Action Pending' | 'Action Completed' | 'Outcome Achieved';
  linkedMilestone?: string;
}

const statusConfig = {
  done: { label: 'Done', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' },
  in_progress: { label: 'In Progress', icon: Clock, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
  not_yet: { label: 'Not Yet', icon: AlertCircle, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border' },
};

const statusBadge = {
  'Action Pending': { className: 'border-warning text-warning' },
  'Action Completed': { className: 'border-success text-success' },
  'Outcome Achieved': { className: 'border-primary text-primary' },
};

const benefits = [
  { icon: Trophy, label: 'College recognition for top performers', color: 'text-bonus' },
  { icon: GraduationCap, label: 'Credit score boost in final semester', color: 'text-primary' },
  { icon: Star, label: 'Extra session allocation for best outcomes', color: 'text-success' },
];

// Helper to determine file type from filename
const getFileType = (filename: string): 'image' | 'pdf' | 'document' | 'text' | 'spreadsheet' | 'other' => {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
  if (ext === 'pdf') return 'pdf';
  if (['doc', 'docx'].includes(ext)) return 'document';
  if (['txt', 'md'].includes(ext)) return 'text';
  if (['xls', 'xlsx', 'csv'].includes(ext)) return 'spreadsheet';
  return 'other';
};

const getFileIcon = (filename: string) => {
  const type = getFileType(filename);
  switch (type) {
    case 'image': return ImageIcon;
    case 'pdf': return FileText;
    case 'document': return FileText;
    case 'spreadsheet': return File;
    case 'text': return FileText;
    default: return File;
  }
};

const getFileLabel = (filename: string) => {
  const type = getFileType(filename);
  switch (type) {
    case 'image': return 'Image';
    case 'pdf': return 'PDF Document';
    case 'document': return 'Word Document';
    case 'spreadsheet': return 'Spreadsheet';
    case 'text': return 'Text File';
    default: return 'File';
  }
};

const MyJourney = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showEvidenceDialog, setShowEvidenceDialog] = useState(false);
  const [showEvidenceViewer, setShowEvidenceViewer] = useState(false);
  const [viewingEvidence, setViewingEvidence] = useState<{ filename: string; actionTitle: string } | null>(null);
  const [activeAction, setActiveAction] = useState<{ sessionId: number; actionId: string } | null>(null);
  const [expandedSession, setExpandedSession] = useState<number | null>(1);

  const [sessions, setSessions] = useState<JourneySession[]>([
    {
      id: 1,
      alumniName: 'Arjun Singh',
      alumniInitials: 'AS',
      date: 'Oct 28, 2024',
      preSessionGoal: 'Understand how to transition from engineering to product management',
      actions: [
        { id: '1a', title: 'Update LinkedIn headline', description: 'Add "Aspiring PM" to your profile', status: 'done', evidence: 'linkedin-screenshot.png' },
        { id: '1b', title: 'Complete a PM case study', description: 'Write a product improvement proposal', status: 'in_progress' },
        { id: '1c', title: 'Reach out to 3 PMs', description: 'Send personalized connection requests', status: 'not_yet' },
      ],
      sessionStatus: 'Action Pending',
      linkedMilestone: 'Got an Interview Call',
    },
    {
      id: 2,
      alumniName: 'Priya Sharma',
      alumniInitials: 'PS',
      date: 'Oct 20, 2024',
      preSessionGoal: 'Prepare for Google SDE interview rounds',
      actions: [
        { id: '2a', title: 'Solve 50 LeetCode medium problems', description: 'Focus on arrays, trees, and graphs', status: 'in_progress' },
        { id: '2b', title: 'Practice system design', description: 'Design 3 systems end to end', status: 'not_yet' },
      ],
      sessionStatus: 'Action Pending',
    },
    {
      id: 3,
      alumniName: 'Rahul Verma',
      alumniInitials: 'RV',
      date: 'Sep 15, 2024',
      preSessionGoal: 'Understand startup fundraising basics',
      actions: [
        { id: '3a', title: 'Draft a 1-page pitch', description: 'Summarize your idea for investors', status: 'done', evidence: 'pitch-deck.pdf' },
        { id: '3b', title: 'Research 5 VCs', description: 'Find VCs investing in your sector', status: 'done', evidence: 'vc-research.xlsx' },
        { id: '3c', title: 'Build an MVP prototype', description: 'Create a basic clickable demo', status: 'done', evidence: 'mvp-demo-link.txt' },
      ],
      sessionStatus: 'Outcome Achieved',
      linkedMilestone: 'Applied for Internship',
    },
  ]);

  const totalActions = sessions.reduce((s, sess) => s + sess.actions.length, 0);
  const doneActions = sessions.reduce((s, sess) => s + sess.actions.filter(a => a.status === 'done').length, 0);
  const progressPercent = totalActions > 0 ? Math.round((doneActions / totalActions) * 100) : 0;
  const milestoneCount = sessions.filter(s => s.linkedMilestone).length;

  const handleMarkDone = (sessionId: number, actionId: string) => {
    setActiveAction({ sessionId, actionId });
    setShowEvidenceDialog(true);
  };

  const handleStatusChange = (sessionId: number, actionId: string, newStatus: ActionStatus) => {
    setSessions(prev => prev.map(s => {
      if (s.id !== sessionId) return s;
      const updatedActions = s.actions.map(a => a.id === actionId ? { ...a, status: newStatus } : a);
      const allDone = updatedActions.every(a => a.status === 'done');
      const anyInProgress = updatedActions.some(a => a.status === 'in_progress');
      const newSessionStatus = allDone ? 'Action Completed' as const : anyInProgress ? 'Action Pending' as const : 'Action Pending' as const;
      return { ...s, actions: updatedActions, sessionStatus: newSessionStatus };
    }));
  };

  const handleEvidenceUpload = () => {
    if (!activeAction) return;
    setSessions(prev => prev.map(s => {
      if (s.id !== activeAction.sessionId) return s;
      const updatedActions = s.actions.map(a =>
        a.id === activeAction.actionId ? { ...a, status: 'done' as ActionStatus, evidence: 'evidence-uploaded.pdf' } : a
      );
      const allDone = updatedActions.every(a => a.status === 'done');
      return { ...s, actions: updatedActions, sessionStatus: allDone ? 'Action Completed' as const : s.sessionStatus };
    }));
    toast({
      title: '✓ Action completed with evidence',
      description: 'Great work! Your progress has been recorded and shared with your college.',
    });
    setShowEvidenceDialog(false);
    setActiveAction(null);
  };

  const handleViewEvidence = (filename: string, actionTitle: string) => {
    setViewingEvidence({ filename, actionTitle });
    setShowEvidenceViewer(true);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8">
        <div className="container max-w-3xl px-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">My Journey</h1>
            <p className="text-sm text-muted-foreground">Your personal career diary — complete actions to unlock rewards</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <Card className="p-3 text-center">
              <p className="text-2xl font-bold text-primary">{sessions.length}</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-2xl font-bold text-success">{doneActions}/{totalActions}</p>
              <p className="text-xs text-muted-foreground">Actions Done</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-2xl font-bold text-bonus">{milestoneCount}</p>
              <p className="text-xs text-muted-foreground">Milestones</p>
            </Card>
          </div>

          {/* Overall Progress */}
          <Card className="p-4 mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">Overall completion</span>
              <span className="text-xs font-semibold text-foreground">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </Card>

          {/* Benefits Banner */}
          <Card className="p-4 mb-6 bg-gradient-to-r from-primary/5 via-bonus/5 to-success/5 border-primary/20">
            <p className="text-xs font-semibold text-foreground mb-2.5">Why complete your action plan?</p>
            <div className="space-y-2">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <b.icon className={`h-4 w-4 ${b.color} flex-shrink-0`} />
                  <span className="text-xs text-muted-foreground">{b.label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Session Timeline with CRUD */}
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-6">
              {sessions.map((session) => {
                const badge = statusBadge[session.sessionStatus];
                const sessionDone = session.actions.filter(a => a.status === 'done').length;
                const sessionTotal = session.actions.length;
                const sessionPct = Math.round((sessionDone / sessionTotal) * 100);
                const isExpanded = expandedSession === session.id;

                return (
                  <div key={session.id} className="relative pl-12">
                    <div className="absolute left-3 top-1 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10">
                      <Calendar className="h-3 w-3" />
                    </div>

                    <Card className="overflow-hidden">
                      {/* Session Header — clickable */}
                      <button
                        onClick={() => setExpandedSession(isExpanded ? null : session.id)}
                        className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {session.alumniInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-foreground">{session.alumniName}</p>
                            <Badge variant="outline" className={badge.className + ' text-[10px]'}>
                              {session.sessionStatus}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {session.date} · {sessionDone}/{sessionTotal} actions done
                          </p>
                        </div>
                        <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-3 border-t">
                          {/* Goal */}
                          <div className="flex items-start gap-2 bg-muted/50 rounded-lg p-3 mt-3">
                            <Target className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[11px] text-muted-foreground mb-0.5">Session Goal</p>
                              <p className="text-sm text-foreground">{session.preSessionGoal}</p>
                            </div>
                          </div>

                          {/* Progress */}
                          <div className="flex items-center gap-3">
                            <Progress value={sessionPct} className="h-1.5 flex-1" />
                            <span className="text-xs font-medium text-foreground">{sessionPct}%</span>
                          </div>

                          {/* Action Items with CRUD */}
                          <div className="space-y-2">
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

                                      {/* Evidence badge — clickable to view */}
                                      {action.evidence && action.status === 'done' && (
                                        <button
                                          onClick={() => handleViewEvidence(action.evidence!, action.title)}
                                          className="flex items-center gap-1.5 mt-2 group cursor-pointer"
                                        >
                                          {(() => {
                                            const EvidenceIcon = getFileIcon(action.evidence!);
                                            return <EvidenceIcon className="h-3.5 w-3.5 text-success" />;
                                          })()}
                                          <span className="text-[11px] text-success font-medium group-hover:underline">
                                            {action.evidence}
                                          </span>
                                          <Eye className="h-3 w-3 text-success/60 group-hover:text-success transition-colors" />
                                        </button>
                                      )}

                                      {/* Action buttons for non-done items */}
                                      {action.status !== 'done' && (
                                        <div className="flex items-center gap-1.5 mt-2">
                                          <button
                                            onClick={() => handleMarkDone(session.id, action.id)}
                                            className="inline-flex items-center gap-1 text-[11px] font-medium text-success hover:text-success/80 transition-colors"
                                          >
                                            <Upload className="h-3 w-3" />
                                            Attach evidence
                                          </button>
                                          {action.status !== 'in_progress' && (
                                            <>
                                              <span className="text-border">·</span>
                                              <button
                                                onClick={() => handleStatusChange(session.id, action.id, 'in_progress')}
                                                className="text-[11px] font-medium text-warning hover:text-warning/80 transition-colors"
                                              >
                                                Mark in progress
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Milestone */}
                          {session.linkedMilestone && (
                            <div className="flex items-center gap-2 text-xs bg-success/10 text-success rounded-full px-3 py-1.5 w-fit">
                              <Award className="h-3.5 w-3.5" />
                              <span className="font-medium">{session.linkedMilestone}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Upload Dialog — mandatory, no skip */}
      <Dialog open={showEvidenceDialog} onOpenChange={setShowEvidenceDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Upload Evidence to Complete</DialogTitle>
            <DialogDescription className="text-sm">
              Upload a screenshot, document, or certificate as proof of completion. Evidence is required to mark an action as done.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* Upload area */}
            <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer bg-primary/5">
              <Upload className="h-8 w-8 text-primary/60 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Drop files here or tap to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Images, PDFs, Word docs, spreadsheets, text files — max 5MB</p>
            </div>

            {/* What counts */}
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs font-medium text-foreground mb-1.5">What counts as evidence?</p>
              <ul className="text-[11px] text-muted-foreground space-y-1">
                <li>• Screenshot of LinkedIn profile update</li>
                <li>• Email confirmation or certificate</li>
                <li>• Link to published work or repository</li>
                <li>• Photo of completed assignment</li>
              </ul>
            </div>

            {/* Why it matters */}
            <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-lg p-3">
              <p className="text-xs font-medium text-foreground mb-1">Why evidence matters</p>
              <p className="text-[11px] text-muted-foreground">
                Uploading evidence strengthens your profile for college recognition, credit score boosts, and extra session rewards.
              </p>
            </div>

            <Button className="w-full h-10" onClick={handleEvidenceUpload}>
              <Upload className="h-4 w-4 mr-1.5" />
              Upload & Complete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Evidence Viewer Dialog */}
      <Dialog open={showEvidenceViewer} onOpenChange={setShowEvidenceViewer}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base flex items-center gap-2">
              {viewingEvidence && (() => {
                const Icon = getFileIcon(viewingEvidence.filename);
                return <Icon className="h-4 w-4 text-primary" />;
              })()}
              Evidence — {viewingEvidence?.actionTitle}
            </DialogTitle>
            <DialogDescription className="text-sm">
              Attached evidence for this action item
            </DialogDescription>
          </DialogHeader>

          {viewingEvidence && (
            <div className="mt-2 space-y-3">
              {/* File info card */}
              <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
                {(() => {
                  const Icon = getFileIcon(viewingEvidence.filename);
                  const fileType = getFileType(viewingEvidence.filename);
                  return (
                    <>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        fileType === 'image' ? 'bg-primary/10' :
                        fileType === 'pdf' ? 'bg-destructive/10' :
                        fileType === 'spreadsheet' ? 'bg-success/10' :
                        'bg-muted'
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          fileType === 'image' ? 'text-primary' :
                          fileType === 'pdf' ? 'text-destructive' :
                          fileType === 'spreadsheet' ? 'text-success' :
                          'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{viewingEvidence.filename}</p>
                        <p className="text-xs text-muted-foreground">{getFileLabel(viewingEvidence.filename)}</p>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Preview area */}
              {getFileType(viewingEvidence.filename) === 'image' ? (
                <div className="rounded-lg border bg-muted/30 p-2 flex items-center justify-center min-h-[200px]">
                  <div className="text-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Image preview</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{viewingEvidence.filename}</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border bg-muted/30 p-6 flex items-center justify-center min-h-[120px]">
                  <div className="text-center">
                    {(() => {
                      const Icon = getFileIcon(viewingEvidence.filename);
                      return <Icon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />;
                    })()}
                    <p className="text-xs text-muted-foreground">File preview not available</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{viewingEvidence.filename}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 h-9 text-sm" onClick={() => setShowEvidenceViewer(false)}>
                  Close
                </Button>
                <Button className="flex-1 h-9 text-sm">
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  Open File
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MyJourney;
