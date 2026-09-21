import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Search, Users, Clock, Star, MessageSquare, Eye } from 'lucide-react';
import {
  helperLeaderboard,
  peerGuidanceSessions,
  peerGuidanceTotals,
  type HelperSummary,
} from '@/lib/peer-guidance';

const PeerGuidanceTracker = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<HelperSummary | null>(null);

  const totals = useMemo(() => peerGuidanceTotals(), []);
  const leaderboard = useMemo(() => helperLeaderboard(), []);

  const rows = leaderboard.filter((h) => {
    const q = query.toLowerCase();
    return (
      !q ||
      h.name.toLowerCase().includes(q) ||
      h.collegeId.toLowerCase().includes(q) ||
      h.department.toLowerCase().includes(q) ||
      h.topics.some((t) => t.toLowerCase().includes(q))
    );
  });

  const helperSessions = selected
    ? peerGuidanceSessions.filter((s) => s.helperId === selected.helperId)
    : [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Peer conversations', value: String(totals.sessions), icon: MessageSquare },
          { label: 'Students guiding peers', value: String(totals.helpers), icon: Users },
          { label: 'Peer time given', value: `${totals.minutes} min`, icon: Clock },
          { label: 'Avg. rating', value: totals.avgRating ? `${totals.avgRating}/5` : '—', icon: Star },
        ].map((s) => (
          <Card key={s.label} className="p-3 md:p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <s.icon className="h-3.5 w-3.5" />
              <span className="text-[11px]">{s.label}</span>
            </div>
            <p className="text-lg md:text-xl font-semibold">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-semibold">Students helping students</h3>
            <p className="text-xs text-muted-foreground">
              Peer guidance captured from Grotalks AI chats — counts toward the student's profile
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search student, ID, topic"
              className="pl-9 h-9"
            />
          </div>
        </div>

        <div className="divide-y rounded-lg border">
          {rows.map((h) => (
            <div key={h.helperId} className="px-3 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">
                {h.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{h.name}</p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {h.collegeId} · {h.year} · {h.department} · {h.topics.join(', ')}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-4 text-[11px] text-muted-foreground flex-shrink-0">
                <span>{h.studentsHelped} helped</span>
                <span>{h.minutes} min</span>
                {h.avgRating && (
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-current text-amber-500" />
                    {h.avgRating}
                  </span>
                )}
              </div>
              <Badge variant="secondary" className="text-[10px] flex-shrink-0">
                {h.sessions} chats
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="flex-shrink-0 h-8 px-2"
                onClick={() => setSelected(h)}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">View peer guidance record</span>
              </Button>
            </div>
          ))}
          {rows.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">No matching students</p>
          )}
        </div>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader className="text-left">
                <DialogTitle className="text-base">{selected.name}</DialogTitle>
                <DialogDescription className="text-xs">
                  {selected.collegeId} · {selected.year} · {selected.department}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 max-h-[55vh] overflow-y-auto">
                {helperSessions.map((s) => (
                  <div key={s.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{s.topic}</p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          Helped {s.seekerName} · {s.seekerCollegeId} · {s.seekerYear} ·{' '}
                          {s.seekerDepartment}
                        </p>
                      </div>
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
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">"{s.question}"</p>
                    <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" /> {s.messages} messages
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {s.minutes} min
                      </span>
                      <span>{s.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PeerGuidanceTracker;
