import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { alumniDirectory } from '@/components/AlumniBrowseSection';
import { PeerChatDialog } from '@/components/mentee/PeerChatDialog';
import {
  searchKnowledge,
  tokenize,
  visiblePeers,
  type MatchedEntry,
  type PeerHelper,
} from '@/lib/knowledge-base';
import { PricingDisplay } from '@/components/PricingDisplay';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Loader2,
  MessageSquare,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Users,
} from 'lucide-react';

type Stage = 'idle' | 'thinking' | 'results';
type DirectoryAlumni = (typeof alumniDirectory)[number];
type AlumniMatch = { alumni: DirectoryAlumni; score: number; reasons: string[] };

const SUGGESTIONS = [
  'I want to move into product management from engineering',
  'How can I prepare for product company interviews?',
  'I am exploring a masters abroad after engineering',
  'I want to build a strong data science portfolio',
];

const getAlumniMatches = (query: string): AlumniMatch[] => {
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  return alumniDirectory
    .map((alumni) => {
      const expertise = alumni.expertise ?? [];
      const profileText = [alumni.role, alumni.company, alumni.stream, ...expertise]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const reasons = expertise.filter((item) => {
        const lower = item.toLowerCase();
        return terms.some((term) => lower.includes(term) || term.includes(lower));
      });
      const overlap = terms.filter((term) => profileText.includes(term)).length;
      const score = overlap + reasons.length * 2;
      return { alumni, score, reasons: reasons.slice(0, 2) };
    })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || b.alumni.rating - a.alumni.rating)
    .slice(0, 4);
};

const AskGrotalksAI = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const incomingQuery = (location.state as { query?: unknown } | null)?.query;
  const [query, setQuery] = useState(typeof incomingQuery === 'string' ? incomingQuery : '');
  const [askedQuestion, setAskedQuestion] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [matches, setMatches] = useState<MatchedEntry[]>([]);
  const [alumniMatches, setAlumniMatches] = useState<AlumniMatch[]>([]);
  const [helpfulIds, setHelpfulIds] = useState<number[]>([]);
  const [chatPeer, setChatPeer] = useState<PeerHelper | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stage === 'results') {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [stage]);

  const peers = useMemo(
    () => Array.from(new Map(matches.flatMap((entry) => visiblePeers(entry)).map((peer) => [peer.id, peer])).values()),
    [matches],
  );

  const handleAsk = (suggestedQuery?: string) => {
    const question = (suggestedQuery ?? query).trim();
    if (question.length < 8) {
      toast({
        title: 'Tell us a bit more',
        description: 'Write a little more about what you are looking for.',
        variant: 'destructive',
      });
      return;
    }

    setQuery(question);
    setAskedQuestion(question);
    setHelpfulIds([]);
    setStage('thinking');
    window.setTimeout(() => {
      setMatches(searchKnowledge(question));
      setAlumniMatches(getAlumniMatches(question));
      setStage('results');
    }, 650);
  };

  const markHelpful = (id: number) => {
    if (helpfulIds.includes(id)) return;
    setHelpfulIds((current) => [...current, id]);
    toast({ title: 'Thanks for the feedback', description: 'Your response has been noted.' });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8">
        <div className="container max-w-4xl px-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <header className="mb-7 max-w-2xl">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Grotalks AI</h1>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Tell us what you are looking for. Get general guidance, find relevant Alumni, and
              prepare with fellow students who opted in to help.
            </p>
          </header>

          <Card className="mb-6 p-4 md:p-5">
            <Textarea
              aria-label="What guidance or Alumni are you looking for?"
              placeholder="For example: I’m a 3rd year CSE student looking to prepare for product interviews..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') handleAsk();
              }}
              className="min-h-24 resize-y border-0 px-0 text-base focus-visible:ring-0"
              maxLength={400}
            />
            <div className="flex items-center justify-between gap-3 border-t pt-3">
              <span className="text-xs text-muted-foreground">{query.length}/400</span>
              <Button onClick={() => handleAsk()} disabled={stage === 'thinking'}>
                {stage === 'thinking' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding matches
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Find guidance and Alumni
                  </>
                )}
              </Button>
            </div>
          </Card>

          {stage === 'idle' && (
            <section aria-label="Suggested searches" className="mb-8">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Try a common search</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    className="h-auto whitespace-normal py-2 text-left"
                    onClick={() => handleAsk(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </section>
          )}

          {stage === 'thinking' && (
            <Card className="flex items-center gap-3 p-5" role="status" aria-live="polite">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Searching for guidance and relevant Alumni...</p>
            </Card>
          )}

          {stage === 'results' && (
            <div ref={resultsRef} className="space-y-8">
              {matches.length > 0 && (
                <section aria-labelledby="guidance-heading">
                  <div className="mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <h2 id="guidance-heading" className="text-lg font-semibold text-foreground">
                      General guidance
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {matches.map((entry) => (
                      <Card key={entry.id} className="p-4 md:p-5">
                        <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-foreground md:text-base">{entry.question}</h3>
                          <Badge variant="secondary">{entry.matchScore}% match</Badge>
                        </div>
                        <p className="text-sm leading-6 text-muted-foreground">{entry.answer}</p>
                        <ul className="mt-3 space-y-2">
                          {entry.keyPoints.map((point) => (
                            <li key={point} className="flex items-start gap-2 text-sm text-foreground">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
                          <span className="text-xs text-muted-foreground">
                            General guidance from Grotalks AI · {entry.askedByCount} students asked this
                          </span>
                          <Button
                            variant={helpfulIds.includes(entry.id) ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={() => markHelpful(entry.id)}
                          >
                            <ThumbsUp className="mr-2 h-3.5 w-3.5" />
                            {helpfulIds.includes(entry.id) ? 'Helpful' : 'Mark helpful'}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              <section aria-labelledby="alumni-heading">
                <div className="mb-1 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <h2 id="alumni-heading" className="text-lg font-semibold text-foreground">
                    Alumni who match your needs
                  </h2>
                </div>
                <p className="mb-3 text-sm text-muted-foreground">
                  Based on your search: “{askedQuestion}”
                </p>
                {alumniMatches.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {alumniMatches.map(({ alumni, reasons }) => (
                      <Card key={alumni.id} className="flex min-w-0 flex-col p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {alumni.name.split(' ').map((part) => part[0]).join('')}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <h3 className="font-semibold text-foreground">{alumni.name}</h3>
                              {alumni.verified && <ShieldCheck className="h-4 w-4 text-success" />}
                            </div>
                            <p className="text-sm text-muted-foreground">{alumni.role}</p>
                            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="h-3.5 w-3.5 fill-bonus text-bonus" />
                              {alumni.rating} ({alumni.reviews} reviews)
                            </div>
                          </div>
                        </div>
                        {reasons.length > 0 && (
                          <p className="mt-3 text-xs text-muted-foreground">
                            Relevant experience: <span className="font-medium text-foreground">{reasons.join(' · ')}</span>
                          </p>
                        )}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {alumni.expertise.slice(0, 3).map((area) => (
                            <Badge key={area} variant="outline" className="font-normal">{area}</Badge>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
                          <div className="text-sm text-muted-foreground">
                            <PricingDisplay baseRate={alumni.baseRate} variant="detail" />
                            <span className="ml-1 text-xs">· covered by your college</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => navigate(`/alumni/profile/${alumni.id}`)}>
                              Profile
                            </Button>
                            <Button size="sm" onClick={() => navigate(`/booking/schedule/${alumni.id}`, {
                              state: { preSessionGoal: askedQuestion, fromAI: true },
                            })}>
                              Book
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <Search className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        We couldn’t find a close match for this search. You can browse all Alumni instead.
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/mentee/browse')}>
                      Browse Alumni <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Card>
                )}
              </section>

              <section aria-labelledby="peer-heading">
                <div className="mb-1 flex items-center gap-2">
                  <Users className="h-4 w-4 text-secondary" />
                  <h2 id="peer-heading" className="text-lg font-semibold text-foreground">
                    Prepare with fellow students
                  </h2>
                </div>
                <p className="mb-3 max-w-3xl text-sm text-muted-foreground">
                  These students recently explored similar questions and chose to guide others. Chat
                  for free to shape your questions before an Alumni session.
                </p>
                {peers.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {peers.map((peer) => (
                      <Card key={peer.id} className="flex min-w-0 flex-col p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10 text-sm font-semibold text-secondary">
                            {peer.name.split(' ').map((part) => part[0]).join('')}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate font-semibold text-foreground">{peer.name}</h3>
                            <p className="text-xs text-muted-foreground">{peer.year} · {peer.department}</p>
                            <Badge variant="secondary" className="mt-2 font-normal">Opted in to guide</Badge>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-2 border-t pt-3">
                          <span className="text-xs text-muted-foreground">Helped {peer.helpedCount} students</span>
                          <Button variant="outline" size="sm" onClick={() => setChatPeer(peer)}>
                            <MessageSquare className="mr-2 h-3.5 w-3.5" />
                            Chat to prepare
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-4 text-sm text-muted-foreground">
                    No opted-in peer guides were found for this topic yet. You can still browse Alumni above.
                  </Card>
                )}
              </section>

              <Card className="flex items-start gap-3 border-success/20 bg-success/5 p-4">
                <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">Your Alumni sessions stay private</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Grotalks AI does not access, record, or learn from Alumni-student conversations.
                    Peer guides appear only because they opted in.
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {chatPeer && (
        <PeerChatDialog
          peer={chatPeer}
          question={askedQuestion}
          open={!!chatPeer}
          onOpenChange={(open) => !open && setChatPeer(null)}
        />
      )}
    </Layout>
  );
};

export default AskGrotalksAI;