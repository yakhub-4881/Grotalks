import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Briefcase,
  Phone,
  Award,
  GraduationCap,
  FileText,
  PartyPopper,
  ChevronDown,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Milestone {
  id: string;
  label: string;
  icon: React.ElementType;
  achieved: boolean;
  linkedSession?: string;
}

const CareerMilestoneTracker = () => {
  const { toast } = useToast();
  const [celebratingId, setCelebratingId] = useState<string | null>(null);
  const [askingSessionId, setAskingSessionId] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string>('');

  const pastSessions = [
    { id: '1', label: 'Arjun Singh — Product Management (Oct 28)' },
    { id: '2', label: 'Priya Sharma — Tech Interviews (Oct 20)' },
    { id: '3', label: 'Rahul Verma — Startup Guidance (Sep 15)' },
  ];

  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 'applied_internship', label: 'Applied for Internship', icon: FileText, achieved: false },
    { id: 'interview_call', label: 'Got an Interview Call', icon: Phone, achieved: false },
    { id: 'secured_internship', label: 'Secured an Internship', icon: Briefcase, achieved: false },
    { id: 'job_offer', label: 'Received a Job Offer', icon: Award, achieved: false },
    { id: 'higher_studies', label: 'Applied for Higher Studies', icon: GraduationCap, achieved: false },
  ]);

  const handleMilestoneTap = (id: string) => {
    const milestone = milestones.find((m) => m.id === id);
    if (milestone?.achieved) return;

    setCelebratingId(id);
    setMilestones((prev) => prev.map((m) => (m.id === id ? { ...m, achieved: true } : m)));

    toast({
      title: '🎉 Amazing, keep going!',
      description: 'Your progress has been recorded.',
    });

    // Show session attribution prompt after celebration
    setTimeout(() => {
      setCelebratingId(null);
      setAskingSessionId(id);
    }, 1500);
  };

  const handleSessionAttribution = (contributed: boolean) => {
    if (contributed && selectedSession) {
      setMilestones((prev) =>
        prev.map((m) => (m.id === askingSessionId ? { ...m, linkedSession: selectedSession } : m))
      );
      toast({ title: '✓ Linked to session', description: 'This helps us track mentorship impact.' });
    }
    setAskingSessionId(null);
    setSelectedSession('');
  };

  return (
    <Card className="p-4 md:p-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">My Career Progress</h3>
      <p className="text-sm text-muted-foreground mb-4">Tap a milestone when you achieve it</p>

      <div className="space-y-3">
        {milestones.map((milestone) => {
          const Icon = milestone.icon;
          const isCelebrating = celebratingId === milestone.id;

          return (
            <div key={milestone.id}>
              <button
                onClick={() => handleMilestoneTap(milestone.id)}
                disabled={milestone.achieved}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                  milestone.achieved
                    ? 'bg-success/10 border-success/30'
                    : 'bg-background border-border hover:border-primary/30 hover:bg-primary/5'
                } ${isCelebrating ? 'animate-pulse scale-[1.02]' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    milestone.achieved ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCelebrating ? (
                    <PartyPopper className="h-5 w-5 animate-bounce" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${milestone.achieved ? 'text-success' : 'text-foreground'}`}>
                    {milestone.label}
                  </p>
                  {milestone.linkedSession && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Linked to: {pastSessions.find((s) => s.id === milestone.linkedSession)?.label}
                    </p>
                  )}
                </div>
                {milestone.achieved && (
                  <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full flex-shrink-0">
                    ✓ Achieved
                  </span>
                )}
              </button>

              {/* Session attribution prompt */}
              {askingSessionId === milestone.id && (
                <Card className="mt-2 p-4 border-primary/20 bg-primary/5">
                  <p className="text-sm font-medium text-foreground mb-3">
                    Did any of your mentor sessions contribute to this?
                  </p>
                  <div className="flex gap-2 mb-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8"
                      onClick={() => handleSessionAttribution(false)}
                    >
                      No
                    </Button>
                    <Button
                      size="sm"
                      className="h-8"
                      onClick={() => {
                        if (!selectedSession) {
                          toast({ title: 'Select a session', description: 'Pick which session helped you', variant: 'destructive' });
                          return;
                        }
                        handleSessionAttribution(true);
                      }}
                    >
                      Yes, this one helped
                    </Button>
                  </div>
                  <Select value={selectedSession} onValueChange={setSelectedSession}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select a session..." />
                    </SelectTrigger>
                    <SelectContent>
                      {pastSessions.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CareerMilestoneTracker;
