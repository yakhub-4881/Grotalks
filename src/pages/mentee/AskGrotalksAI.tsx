import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { searchKnowledge, visiblePeers, type MatchedEntry, type PeerHelper } from '@/lib/knowledge-base';
import { PeerChatDialog } from '@/components/mentee/PeerChatDialog';
import { alumniDirectory } from '@/components/AlumniBrowseSection';
import {
  ArrowLeft,
  Sparkles,
  Send,
  Loader2,
  BookOpen,
  Users,
  Star,
  ThumbsUp,
  MessageSquare,
  CheckCircle2,
  Library,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';

type Stage = 'idle' | 'thinking' | 'answers' | 'alumni';

const SUGGESTIONS = [
  'How do I move into product management?',
  'What should I prepare for product company interviews?',
  'Is a masters abroad worth it after engineering?',
  'How do I build a design portfolio?',
];

const AskGrotalksAI = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [query, setQuery] = useState('');
  const [askedQuestion, setAskedQuestion] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [matches, setMatches] = useState<MatchedEntry[]>([]);
  const [helpfulIds, setHelpfulIds] = useState<number[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stage === 'answers' || stage === 'alumni') {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [stage]);

  const handleAsk = (text?: string) => {
    const q = (text ?? query).trim();
    if (q.length < 8) {
      toast({
        title: 'Tell us a bit more',
        description: 'Write your question in a full sentence so we can match the right guidance.',
        variant: 'destructive',
      });
      return;
    }
    setQuery(q);
    setAskedQuestion(q);
    setHelpfulIds([]);
    setStage('thinking');
    setTimeout(() => {
      const found = searchKnowledge(q);
      setMatches(found);
      setStage(found.length > 0 ? 'answers' : 'alumni');
    }, 1100);
  };

  const suggestedAlumniIds = Array.from(
    new Set(matches.flatMap((m) => m.suggestedAlumniIds))
  );
  const suggestedAlumni = (
    suggestedAlumniIds.length > 0
      ? alumniDirectory.filter((a) => suggestedAlumniIds.includes(a.id))
      : alumniDirectory.filter((a) => a.college === 'vel-tech').slice(0, 3)
  ).slice(0, 4);

  const peers = matches.flatMap((m) => visiblePeers(m));

  const markHelpful = (id: number) => {
    if (helpfulIds.includes(id)) return;
    setHelpfulIds((prev) => [...prev, id]);
    toast({
      title: 'Thanks for the signal',
      description: 'This answer will rank higher for students asking the same thing.',
    });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8">
        <div className="container max-w-3xl px-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">Ask Grotalks AI</h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Answers built from real sessions your seniors already had. If it isn't enough, we'll
              point you to the right alumni.
            </p>
          </div>

          {/* Ask box */}
          <Card className="p-4 md:p-5 mb-6">
            <Textarea
              placeholder="e.g. I'm in 3rd year CSE and want to switch to product management — where do I start?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-24 resize-none border-0 focus-visible:ring-0 px-0 text-base"
              maxLength={400}
            />
            <div className="flex items-center justify-between gap-3 pt-2 border-t">
              <p className="text-xs text-muted-foreground">{query.length}/400</p>
              <Button onClick={() => handleAsk()} disabled={stage === 'thinking'} className="h-10">
                {stage === 'thinking' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Ask
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Suggestions */}
          {stage === 'idle' && (
            <div className="mb-8">
              <p className="text-xs text-muted-foreground mb-2">Popular questions at your college</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleAsk(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {stage === 'thinking' && (
            <Card className="p-6 flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Looking through your college's guidance library...
              </p>
            </Card>
          )}

          <div ref={resultsRef}>
            {/* Step 1 — existing answers */}
            {stage !== 'idle' && stage !== 'thinking' && matches.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Library className="h-4 w-4 text-primary" />
                  <h2 className="text-base font-semibold text-foreground">
                    From your college's guidance library
                  </h2>
                </div>

                <div className="space-y-4">
                  {matches.map((entry) => (
                    <Card key={entry.id} className="p-4 md:p-5 border-l-4 border-l-primary">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-sm md:text-base font-semibold text-foreground">
                          {entry.question}
                        </h3>
                        <Badge variant="secondary" className="flex-shrink-0 text-xs">
                          {entry.matchScore}% match
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{entry.answer}</p>

                      <ul className="space-y-1.5 mb-3">
                        {entry.keyPoints.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-sm text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5 text-primary" />
                          From a session with{' '}
                          <span className="font-medium text-foreground">
                            {entry.source.alumniName}
                          </span>{' '}
                          · {entry.source.alumniRole}
                        </span>
                        <span>·</span>
                        <span>{entry.askedByCount} students asked this</span>
                      </div>

                      {visiblePeers(entry).length > 0 && (
                        <div className="rounded-lg border bg-muted/40 p-3 mb-3">
                          <p className="text-xs font-medium text-foreground mb-2">
                            Batchmates who asked this — chat with them free
                          </p>
                          <div className="space-y-2">
                            {visiblePeers(entry).map((peer) => (
                              <div
                                key={peer.id}
                                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
                              >
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                    {peer.name
                                      .split(' ')
                                      .map((n) => n[0])
                                      .join('')}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-semibold text-foreground truncate">
                                      {peer.name}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground truncate">
                                      {peer.year} · {peer.department} · helped {peer.helpedCount}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full sm:w-auto flex-shrink-0"
                                  onClick={() => setChatPeer(peer)}
                                >
                                  <MessageSquare className="mr-2 h-3.5 w-3.5" />
                                  Chat
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-2 pt-3 border-t">
                        <Button
                          variant={helpfulIds.includes(entry.id) ? 'secondary' : 'outline'}
                          size="sm"
                          onClick={() => markHelpful(entry.id)}
                        >
                          <ThumbsUp className="mr-2 h-3.5 w-3.5" />
                          {helpfulIds.includes(entry.id)
                            ? 'Marked helpful'
                            : `Helpful (${entry.helpfulCount})`}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/alumni/profile/${entry.source.alumniId}`)}
                        >
                          View alumni
                        </Button>
                      </div>

                    </Card>
                  ))}
                </div>

                {stage === 'answers' && (
                  <Card className="p-4 mt-4 bg-primary/5 border-primary/20">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                      <p className="text-sm text-foreground font-medium">
                        Did this answer your question?
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: 'Glad that helped',
                              description: 'Saved to your journey so you can revisit it anytime.',
                            });
                            navigate('/mentee/dashboard');
                          }}
                        >
                          Yes, I'm good
                        </Button>
                        <Button size="sm" onClick={() => setStage('alumni')}>
                          No, connect me
                          <ArrowRight className="ml-2 h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* Step 2 — peers + alumni */}
            {stage === 'alumni' && (
              <div className="space-y-8">
                {peers.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-secondary" />
                      <h2 className="text-base font-semibold text-foreground">
                        Students who recently asked the same thing
                      </h2>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      They agreed to guide juniors after their own session. Free peer guidance.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {peers.map((peer) => (
                        <Card key={peer.id} className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-sm font-semibold flex-shrink-0">
                              {peer.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-sm font-semibold text-foreground truncate">
                                {peer.name}
                              </h3>
                              <p className="text-xs text-muted-foreground truncate">
                                {peer.collegeId} · {peer.year} · {peer.department}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary" className="text-[11px]">
                                  Helped {peer.helpedCount} students
                                </Badge>
                                <span className="text-[11px] text-muted-foreground">
                                  Asked {peer.askedOn}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-3"
                            onClick={() =>
                              toast({
                                title: `Request sent to ${peer.name}`,
                                description:
                                  'They will get a notification and can reply from their dashboard.',
                              })
                            }
                          >
                            <MessageSquare className="mr-2 h-3.5 w-3.5" />
                            Ask for guidance
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <h2 className="text-base font-semibold text-foreground">
                      Alumni who can answer this in depth
                    </h2>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Matched to "{askedQuestion}" · covered by your college
                  </p>
                  <div className="space-y-3">
                    {suggestedAlumni.map((a) => (
                      <Card key={a.id} className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold flex-shrink-0">
                              {a.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-sm font-semibold text-foreground truncate">
                                {a.name}
                              </h3>
                              <p className="text-xs text-muted-foreground truncate">{a.role}</p>
                              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Star className="h-3.5 w-3.5 fill-bonus text-bonus" />
                                  {a.rating} ({a.reviews})
                                </span>
                                {a.expertise.slice(0, 2).map((e) => (
                                  <Badge key={e} variant="outline" className="text-[11px]">
                                    {e}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 sm:flex-shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/alumni/profile/${a.id}`)}
                            >
                              Profile
                            </Button>
                            <Button
                              size="sm"
                              onClick={() =>
                                navigate(`/booking/schedule/${a.id}`, {
                                  state: { preSessionGoal: askedQuestion, fromAI: true },
                                })
                              }
                            >
                              Book Session
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                <Card className="p-4 bg-success/5 border-success/20">
                  <div className="flex gap-3">
                    <Library className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Your session answer joins the library
                      </p>
                      <p className="text-xs text-muted-foreground">
                        After the session, the guidance you receive is summarised and added to your
                        college's knowledge library. You can also choose to appear as a peer guide
                        for juniors who ask this same question later.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AskGrotalksAI;
