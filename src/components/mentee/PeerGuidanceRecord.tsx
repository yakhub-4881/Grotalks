import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Users, Star, ChevronRight, MessageSquare } from 'lucide-react';
import {
  CURRENT_STUDENT_ID,
  guidanceGivenBy,
  guidanceReceivedBy,
  type PeerGuidanceSession,
} from '@/lib/peer-guidance';
import PeerConversationDialog from './PeerConversationDialog';

const CURRENT_STUDENT_NAME = 'Ravi Kumar';

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border bg-background px-3 py-2">
    <p className="text-base font-semibold text-foreground leading-tight">{value}</p>
    <p className="text-[11px] text-muted-foreground">{label}</p>
  </div>
);

const SessionRow = ({
  session,
  role,
  onOpen,
}: {
  session: PeerGuidanceSession;
  role: 'helper' | 'seeker';
  onOpen: () => void;
}) => {
  const other =
    role === 'helper'
      ? {
          name: session.seekerName,
          meta: `${session.seekerCollegeId} · ${session.seekerYear} · ${session.seekerDepartment}`,
        }
      : {
          name: session.helperName,
          meta: `${session.helperCollegeId} · ${session.helperYear} · ${session.helperDepartment}`,
        };

  return (
    <button
      onClick={onOpen}
      className="w-full text-left px-3 py-2.5 hover:bg-muted/50 transition-colors flex items-center gap-3"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{other.name}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-[11px] text-muted-foreground truncate">
                {other.meta} · {session.topic}
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              <p>{other.meta}</p>
              <p>Topic: {session.topic}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className="text-[11px] text-muted-foreground flex-shrink-0 hidden sm:inline">
        {session.date}
      </span>
      {session.status === 'ongoing' ? (
        <Badge variant="outline" className="text-[10px] flex-shrink-0">
          Ongoing
        </Badge>
      ) : (
        session.seekerRating && (
          <span className="text-[11px] text-muted-foreground flex items-center gap-0.5 flex-shrink-0">
            <Star className="h-3 w-3 fill-current text-amber-500" />
            {session.seekerRating}
          </span>
        )
      )}
      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    </button>
  );
};

const PeerGuidanceRecord = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<{ session: PeerGuidanceSession; role: 'helper' | 'seeker' } | null>(
    null
  );

  const given = guidanceGivenBy(CURRENT_STUDENT_ID);
  const received = guidanceReceivedBy(CURRENT_STUDENT_NAME);
  if (given.length === 0 && received.length === 0) return null;

  const minutes = given.reduce((s, x) => s + x.minutes, 0);
  const rated = given.filter((s) => s.seekerRating);
  const avg = rated.length
    ? Math.round((rated.reduce((a, s) => a + (s.seekerRating ?? 0), 0) / rated.length) * 10) / 10
    : null;
  const juniors = new Set(given.map((s) => s.seekerCollegeId)).size;
  const topics = Array.from(new Set(given.map((s) => s.topic)));

  const openChat = (session: PeerGuidanceSession, role: 'helper' | 'seeker') => {
    setActive({ session, role });
    setOpen(true);
  };

  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="text-base md:text-lg font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Peer conversations
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Reopen any chat with a fellow student and keep the conversation going
          </p>
        </div>
        <Badge variant="secondary" className="text-[11px] flex-shrink-0">
          Peer guide
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4">
        <Stat label="Students helped" value={String(juniors)} />
        <Stat label="Conversations" value={String(given.length + received.length)} />
        <Stat label="Time given" value={`${minutes} min`} />
        <Stat label="Avg. rating" value={avg ? `${avg}/5` : '—'} />
      </div>

      {topics.length > 0 && (
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
      )}

      <Tabs defaultValue="given">
        <TabsList className="grid w-full grid-cols-2 h-9">
          <TabsTrigger value="given" className="text-xs md:text-sm">
            Guidance you've given ({given.length})
          </TabsTrigger>
          <TabsTrigger value="received" className="text-xs md:text-sm">
            Guidance you've received ({received.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="given" className="mt-3">
          {given.length === 0 ? (
            <p className="text-xs text-muted-foreground px-1 py-4">
              No juniors have reached out to you yet.
            </p>
          ) : (
            <div className="divide-y rounded-lg border">
              {given.map((s) => (
                <SessionRow key={s.id} session={s} role="helper" onOpen={() => openChat(s, 'helper')} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="received" className="mt-3">
          {received.length === 0 ? (
            <p className="text-xs text-muted-foreground px-1 py-4">
              You haven't asked a senior for help yet.
            </p>
          ) : (
            <div className="divide-y rounded-lg border">
              {received.map((s) => (
                <SessionRow key={s.id} session={s} role="seeker" onOpen={() => openChat(s, 'seeker')} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <p className="flex items-start gap-1.5 mt-3 text-[11px] leading-4 text-muted-foreground">
        <MessageSquare className="mt-0.5 h-3 w-3 flex-shrink-0" />
        Open a conversation to ask a follow-up question — both students keep the full thread.
      </p>

      {active && (
        <PeerConversationDialog
          session={active.session}
          role={active.role}
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </Card>
  );
};

export default PeerGuidanceRecord;
