import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Users, Star, Clock, MessageSquare, ChevronRight } from 'lucide-react';
import {
  CURRENT_STUDENT_ID,
  guidanceGivenBy,
  type PeerGuidanceSession,
} from '@/lib/peer-guidance';

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border bg-background px-3 py-2">
    <p className="text-base font-semibold text-foreground leading-tight">{value}</p>
    <p className="text-[11px] text-muted-foreground">{label}</p>
  </div>
);

const PeerGuidanceRecord = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<PeerGuidanceSession | null>(null);

  const sessions = guidanceGivenBy(CURRENT_STUDENT_ID);
  if (sessions.length === 0) return null;

  const minutes = sessions.reduce((s, x) => s + x.minutes, 0);
  const rated = sessions.filter((s) => s.seekerRating);
  const avg = rated.length
    ? Math.round((rated.reduce((a, s) => a + (s.seekerRating ?? 0), 0) / rated.length) * 10) / 10
    : null;
  const juniors = new Set(sessions.map((s) => s.seekerCollegeId)).size;
  const topics = Array.from(new Set(sessions.map((s) => s.topic)));

  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="text-base md:text-lg font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Guidance you've given
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Chats where juniors reached out to you through Grotalks AI
          </p>
        </div>
        <Badge variant="secondary" className="text-[11px] flex-shrink-0">
          Peer guide
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4">
        <Stat label="Students helped" value={String(juniors)} />
        <Stat label="Conversations" value={String(sessions.length)} />
        <Stat label="Time given" value={`${minutes} min`} />
        <Stat label="Avg. rating" value={avg ? `${avg}/5` : '—'} />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {topics.map((t) => (
          <span
            key={t}
            className="text-[11px] px-2 py-1 rounded-full bg-muted text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="divide-y rounded-lg border">
        {sessions.slice(0, 3).map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setActive(s);
              setOpen(true);
            }}
            className="w-full text-left px-3 py-2.5 hover:bg-muted/50 transition-colors flex items-center gap-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{s.seekerName}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {s.seekerCollegeId} · {s.seekerYear} · {s.seekerDepartment} · {s.topic}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">
                    <p>College ID: {s.seekerCollegeId}</p>
                    <p>{s.seekerYear} · {s.seekerDepartment}</p>
                    <p>Topic: {s.topic}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-[11px] text-muted-foreground flex-shrink-0 hidden sm:inline">
              {s.date}
            </span>
            {s.status === 'ongoing' ? (
              <Badge variant="outline" className="text-[10px] flex-shrink-0">
                Ongoing
              </Badge>
            ) : (
              s.seekerRating && (
                <span className="text-[11px] text-muted-foreground flex items-center gap-0.5 flex-shrink-0">
                  <Star className="h-3 w-3 fill-current text-amber-500" />
                  {s.seekerRating}
                </span>
              )
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          </button>
        ))}
      </div>

      {sessions.length > 3 && (
        <p className="text-[11px] text-muted-foreground mt-2">
          +{sessions.length - 3} more conversations on your guidance record
        </p>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          {active && (
            <>
              <DialogHeader className="text-left">
                <DialogTitle className="text-base">{active.topic}</DialogTitle>
                <DialogDescription className="text-xs">
                  {active.seekerName} · {active.seekerCollegeId} · {active.seekerYear} ·{' '}
                  {active.seekerDepartment}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                    Their question
                  </p>
                  <p className="text-sm">{active.question}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" /> {active.messages} messages
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {active.minutes} min
                  </span>
                  <span>{active.date}</span>
                </div>
                {active.seekerNote && (
                  <div className="rounded-lg border p-3">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                      Their feedback
                    </p>
                    <p className="text-sm">"{active.seekerNote}"</p>
                  </div>
                )}
                <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PeerGuidanceRecord;
