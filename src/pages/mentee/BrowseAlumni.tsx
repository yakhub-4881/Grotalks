import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, MapPin, Video, ShieldCheck, Sparkles, Send, Loader2, Library, Compass, Wand2 } from 'lucide-react';

import { getCollegeDisplay, collegeMap } from '@/lib/college-config';
import { PricingDisplay } from '@/components/PricingDisplay';

const BrowseAlumni = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'browse' | 'ai'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [batchYearFilter, setBatchYearFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Grotalks AI personalized matching
  const [aiQuery, setAiQuery] = useState('');
  const [aiAsked, setAiAsked] = useState('');
  const [aiStage, setAiStage] = useState<'idle' | 'thinking' | 'results'>('idle');
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aiStage === 'results') {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [aiStage]);

  const alumni = [
    {
      id: 1,
      name: 'Arjun Singh',
      role: 'Product Manager @ Flipkart',
      company: 'Flipkart',
      location: 'Bangalore',
      college: 'vel-tech',
      collegeId: 'VTU4881',
      batch: '2014-2018',
      verified: true,
      language: 'English, Hindi',
      stream: 'Computer Science',
      expertise: ['Product Management', 'Career Guidance', 'Interview Prep'],
      rating: 4.9,
      reviews: 28,
      baseRate: 500, // Base rate for 30 min session
      sessionsCompleted: 45,
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Software Engineer @ Google',
      company: 'Google',
      location: 'Hyderabad',
      college: 'iit-bombay',
      collegeId: 'IITB1234',
      batch: '2015-2019',
      verified: true,
      language: 'English, Tamil',
      stream: 'Data Science',
      expertise: ['Masters Abroad', 'Interview Prep', 'Data Science'],
      rating: 4.9,
      reviews: 32,
      baseRate: 750,
      sessionsCompleted: 52,
    },
    {
      id: 3,
      name: 'Rahul Verma',
      role: 'Startup Founder & CEO',
      company: 'TechVentures',
      location: 'Bangalore',
      college: 'bits-pilani',
      collegeId: 'BITS5678',
      batch: '2011-2015',
      verified: true,
      language: 'English, Hindi',
      stream: 'Business',
      expertise: ['Entrepreneurship', 'Startup Funding', 'Career Guidance'],
      rating: 4.8,
      reviews: 25,
      baseRate: 1000,
      sessionsCompleted: 38,
    },
    {
      id: 4,
      name: 'Sneha Patel',
      role: 'Data Scientist @ Amazon',
      company: 'Amazon',
      location: 'Mumbai',
      college: 'iit-delhi',
      collegeId: 'IITD9012',
      batch: '2016-2020',
      verified: true,
      language: 'English, Hindi',
      stream: 'Data Science',
      expertise: ['Data Science', 'ML/AI', 'Interview Prep'],
      rating: 4.7,
      reviews: 18,
      baseRate: 600,
      sessionsCompleted: 25,
    },
    {
      id: 5,
      name: 'Vikram Reddy',
      role: 'Investment Banker @ Goldman Sachs',
      company: 'Goldman Sachs',
      location: 'Mumbai',
      college: 'dtu',
      collegeId: 'DTU3456',
      batch: '2013-2017',
      verified: true,
      language: 'English',
      stream: 'Finance',
      expertise: ['Finance & Investing', 'Career Guidance', 'MBA Abroad'],
      rating: 4.8,
      reviews: 22,
      baseRate: 700,
      sessionsCompleted: 32,
    },
    {
      id: 6,
      name: 'Ananya Krishnan',
      role: 'UX Designer @ Netflix',
      company: 'Netflix',
      location: 'Bangalore',
      college: 'nit-trichy',
      collegeId: 'NIT7890',
      batch: '2015-2019',
      verified: true,
      language: 'English, Tamil',
      stream: 'Design',
      expertise: ['UX/UI Design', 'Career Guidance', 'Portfolio Review'],
      rating: 4.9,
      reviews: 30,
      baseRate: 550,
      sessionsCompleted: 42,
    },
  ];

  const expertiseKeywords: Record<string, string> = {
    career: 'Career Guidance',
    masters: 'Masters',
    startup: 'Entrepreneurship',
    interview: 'Interview',
    data: 'Data Science',
    design: 'UX',
    finance: 'Finance',
  };

  const filtered = alumni.filter((a) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.company.toLowerCase().includes(q) ||
      a.role.toLowerCase().includes(q) ||
      a.expertise.some((e) => e.toLowerCase().includes(q));
    const matchesCollege = collegeFilter === 'all' || a.college === collegeFilter;
    const matchesBatch = batchYearFilter === 'all' || a.batch.includes(batchYearFilter);
    const matchesExpertise =
      expertiseFilter === 'all' ||
      a.expertise.some((e) =>
        e.toLowerCase().includes((expertiseKeywords[expertiseFilter] || '').toLowerCase())
      );
    const matchesLanguage =
      languageFilter === 'all' || a.language.toLowerCase().includes(languageFilter);
    return matchesQuery && matchesCollege && matchesBatch && matchesExpertise && matchesLanguage;
  });

  // ---- Grotalks AI matching (mock) ----
  const AI_TOPICS: { terms: string[]; expertise: string }[] = [
    { terms: ['product'], expertise: 'product' },
    { terms: ['interview', 'placement', 'faang', 'google', 'amazon'], expertise: 'interview' },
    { terms: ['data science', 'machine learning', 'ml', 'ai '], expertise: 'data' },
    { terms: ['design', 'ux', 'ui', 'portfolio'], expertise: 'design' },
    { terms: ['startup', 'entrepreneur', 'founder', 'funding'], expertise: 'entrepreneur' },
    { terms: ['finance', 'investing', 'banking', 'stock'], expertise: 'finance' },
    { terms: ['masters', 'ms abroad', 'study abroad', 'gre'], expertise: 'masters' },
    { terms: ['mba', 'b-school', 'business school'], expertise: 'mba' },
    { terms: ['career', 'switch', 'transition', 'confused'], expertise: 'career' },
  ];

  type AIMatch = { a: typeof alumni[number]; score: number; reasons: string[] };

  const matchAlumni = (query: string): AIMatch[] => {
    const q = query.toLowerCase();
    const scored: AIMatch[] = alumni.map((a) => {
      let score = a.rating * 4 + a.reviews / 10;
      const reasons: string[] = [];
      for (const topic of AI_TOPICS) {
        const asked = topic.terms.some((t) => q.includes(t));
        const exp = a.expertise.find((e) => e.toLowerCase().includes(topic.expertise));
        if (asked && exp) {
          score += 25;
          if (!reasons.includes(exp)) reasons.push(exp);
        }
      }
      if (q.includes(a.company.toLowerCase()) || q.includes(a.stream.toLowerCase())) {
        score += 20;
        reasons.unshift(a.role.split(' @ ')[1] || a.company);
      }
      return { a, score, reasons };
    });
    const matched = scored.filter((m) => m.reasons.length > 0).sort((x, y) => y.score - x.score);
    if (matched.length >= 3) return matched.slice(0, 4);
    // Fallback — general career guidance alumni, highest rated
    const general = scored
      .filter((m) => m.a.expertise.includes('Career Guidance'))
      .sort((x, y) => y.score - x.score)
      .slice(0, 4)
      .map((m) => ({ ...m, reasons: ['Career Guidance'] }));
    return general;
  };

  const AI_SUGGESTIONS = [
    "I'm in 3rd year CSE and want to move into product management",
    'Help me prepare for interviews at product companies',
    'I want to start a startup after graduation — where do I begin?',
    'Should I do a masters abroad or start working first?',
  ];

  const handleAIAsk = (text?: string) => {
    const q = (text ?? aiQuery).trim();
    if (q.length < 8) return;
    setAiQuery(q);
    setAiAsked(q);
    setAiStage('thinking');
    setTimeout(() => {
      setAiMatches(matchAlumni(q));
      setAiStage('results');
    }, 1100);
  };

  const renderAlumniCard = (alumni: typeof alumni[number], matchReason?: string) => (
    <Card
      className="p-4 md:p-6 hover:shadow-xl transition-all cursor-pointer group"
      onClick={() => navigate(`/alumni/profile/${alumni.id}`)}
    >
      <div className="space-y-3 md:space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-1">
              <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {alumni.name}
              </h3>
              {alumni.verified && (
                <ShieldCheck className="h-5 w-5 text-success flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-1 truncate">{alumni.role}</p>
            <div className="space-y-1 text-xs">
              <div className="font-medium text-muted-foreground truncate">
                {collegeMap[alumni.college]?.fullName || 'Unknown College'}
              </div>
              <div className="text-muted-foreground">
                College ID: {alumni.collegeId} • Batch: {alumni.batch}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            <Star className="h-4 w-4 fill-bonus text-bonus" />
            <span className="text-sm font-semibold">{alumni.rating}</span>
            <span className="text-xs text-muted-foreground">({alumni.reviews})</span>
          </div>
        </div>

        {/* Why this match — AI mode only */}
        {matchReason && (
          <div className="flex items-start gap-2 rounded-lg bg-primary/5 px-3 py-2">
            <Sparkles className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground">
              Matched to your need — <span className="font-medium">{matchReason}</span>
            </p>
          </div>
        )}

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {alumni.expertise.slice(0, 3).map((exp) => (
            <span
              key={exp}
              className="px-2 py-0.5 md:py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
            >
              {exp}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{alumni.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Video className="h-3 w-3" />
            <span>{alumni.sessionsCompleted} calls</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <PricingDisplay baseRate={alumni.baseRate} variant="detail" />
          </div>
          <Button size="sm" onClick={(e) => {
            e.stopPropagation();
            navigate(`/booking/schedule/${alumni.id}`, {
              state: matchReason ? { preSessionGoal: aiAsked, fromAI: true } : undefined,
            });
          }}>
            Book Call
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-4 md:py-8">
          {/* Header */}
          <div className="mb-5 md:mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Find the right alumni</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Scroll and discover alumni yourself, or tell Grotalks AI what you need and get a
              personalized shortlist.
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex mb-6 md:mb-8">
            <div className="inline-flex rounded-lg border bg-card p-1">
              <button
                onClick={() => setMode('browse')}
                className={`flex items-center gap-2 rounded-md px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition-colors ${
                  mode === 'browse'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Compass className="h-4 w-4" />
                Browse alumni
              </button>
              <button
                onClick={() => setMode('ai')}
                className={`flex items-center gap-2 rounded-md px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition-colors ${
                  mode === 'ai'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Ask Grotalks AI
              </button>
            </div>
          </div>

          {mode === 'browse' && (
            <>
              {/* Search & Filters */}
              <div className="bg-card rounded-lg border p-4 md:p-6 mb-6 md:mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  <div className="sm:col-span-2 lg:col-span-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, company..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 md:pl-10 h-10 md:h-12 text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <Select value={collegeFilter} onValueChange={setCollegeFilter}>
                      <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
                        <SelectValue placeholder="College" />
                      </SelectTrigger>
                      <SelectContent className="min-w-[300px]">
                        <SelectItem value="all">All Colleges</SelectItem>
                        <SelectItem value="iit-bombay">Indian Institute of Technology Bombay</SelectItem>
                        <SelectItem value="iit-delhi">Indian Institute of Technology Delhi</SelectItem>
                        <SelectItem value="bits-pilani">Birla Institute of Technology and Science, Pilani</SelectItem>
                        <SelectItem value="nit-trichy">National Institute of Technology, Tiruchirappalli</SelectItem>
                        <SelectItem value="dtu">Delhi Technological University</SelectItem>
                        <SelectItem value="vel-tech">Vel Tech Rangarajan Dr. Sagunthala R & D Institute of Science and Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Select value={batchYearFilter} onValueChange={setBatchYearFilter}>
                      <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
                        <SelectValue placeholder="Batch Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="2019">2019</SelectItem>
                        <SelectItem value="2018">2018</SelectItem>
                        <SelectItem value="2017">2017</SelectItem>
                        <SelectItem value="2015">2015</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                      <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
                        <SelectValue placeholder="Expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Expertise</SelectItem>
                        <SelectItem value="career">Career Guidance</SelectItem>
                        <SelectItem value="masters">Masters Abroad</SelectItem>
                        <SelectItem value="startup">Entrepreneurship</SelectItem>
                        <SelectItem value="interview">Interview Prep</SelectItem>
                        <SelectItem value="data">Data Science</SelectItem>
                        <SelectItem value="design">UX/UI Design</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Select value={languageFilter} onValueChange={setLanguageFilter}>
                      <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Languages</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                        <SelectItem value="telugu">Telugu</SelectItem>
                        <SelectItem value="kannada">Kannada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Highest Rating</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="sessions">Most Sessions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-4 md:mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filtered.length} alumni
                </p>
              </div>

              {/* No results — Grotalks AI fallback */}
              {filtered.length === 0 && (
                <Card className="p-6 md:p-8 text-center mb-6 md:mb-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    No alumni available for this right now
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-5">
                    Try clearing a filter, or let Grotalks AI help while you wait — it gives quick
                    guidance and can connect you with students at your college who had the same doubt.
                  </p>
                  <Button onClick={() => navigate('/mentee/ask-ai', { state: { query: searchQuery, from: 'browse' } })}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Ask Grotalks AI
                  </Button>
                </Card>
              )}

              {/* Alumni Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((alumni) => (
                  <div key={alumni.id}>{renderAlumniCard(alumni)}</div>
                ))}
              </div>
            </>
          )}

          {mode === 'ai' && (
            <>
              {/* Ask box */}
              <Card className="p-4 md:p-5 mb-6">
                <Textarea
                  placeholder="Tell Grotalks AI what you need — e.g. I'm a 2nd year CSE student who wants to prepare for product company interviews"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="min-h-24 resize-none border-0 focus-visible:ring-0 px-0 text-base"
                  maxLength={400}
                />
                <div className="flex items-center justify-between gap-3 pt-2 border-t">
                  <p className="text-xs text-muted-foreground">{aiQuery.length}/400</p>
                  <Button onClick={() => handleAIAsk()} disabled={aiStage === 'thinking'} className="h-10">
                    {aiStage === 'thinking' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Finding matches
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Get my matches
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Suggestions */}
              {aiStage === 'idle' && (
                <div className="mb-8">
                  <p className="text-xs text-muted-foreground mb-2">Or start with one of these</p>
                  <div className="flex flex-wrap gap-2">
                    {AI_SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleAIAsk(s)}
                        className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {aiStage === 'thinking' && (
                <Card className="p-6 flex items-center gap-3 mb-8">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Matching your need with the right alumni...
                  </p>
                </Card>
              )}

              {aiStage === 'results' && (
                <div ref={resultsRef}>
                  <div className="mb-4 md:mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Wand2 className="h-4 w-4 text-primary" />
                      <h2 className="text-base font-semibold text-foreground">
                        Your personalized matches
                      </h2>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Based on "{aiAsked}" · sessions covered by your college · you can always
                      switch back and browse everyone yourself.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                    {aiMatches.map((m) => (
                      <div key={m.a.id}>{renderAlumniCard(m.a, m.reasons.join(' · '))}</div>
                    ))}
                  </div>

                  <Card className="p-4 bg-success/5 border-success/20">
                    <div className="flex gap-3">
                      <Library className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          Your sessions stay private
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Grotalks AI never reads or learns from your alumni conversations — it only
                          helps you find the right alumni faster.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BrowseAlumni;
