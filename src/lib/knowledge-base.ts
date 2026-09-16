// Grotalks AI knowledge library (prototype data)
// Answers here originate from completed alumni sessions and grow over time.

export interface PeerHelper {
  id: number;
  name: string;
  collegeId: string;
  year: string;
  department: string;
  askedOn: string;
  helpedCount: number;
  /** Only peers who opted in are shown to other students */
  visibleToPeers: boolean;
}

export interface KnowledgeEntry {
  id: number;
  question: string;
  answer: string;
  keyPoints: string[];
  tags: string[];
  source: {
    alumniId: number;
    alumniName: string;
    alumniRole: string;
    sessionDate: string;
  };
  helpfulCount: number;
  askedByCount: number;
  /** Students who asked this before and agreed to guide peers */
  peers: PeerHelper[];
  /** Alumni best suited if the library answer is not enough */
  suggestedAlumniIds: number[];
}

export const knowledgeLibrary: KnowledgeEntry[] = [
  {
    id: 1,
    question: 'How do I move from engineering into a product management role?',
    answer:
      'Start by building product sense inside your current work: own a small feature end to end, talk to users, and write down the trade-offs you made. Most campus-to-PM moves in India happen through associate PM programmes or by switching internally after 1-2 years in engineering. Your portfolio matters more than certifications.',
    keyPoints: [
      'Write 2 product teardowns of apps you use daily',
      'Target APM programmes (Flipkart, Swiggy, Zomato, Microsoft)',
      'Show measurable impact, not tool lists, on your resume',
    ],
    tags: ['product', 'management', 'pm', 'career', 'switch', 'engineering', 'transition', 'apm'],
    source: {
      alumniId: 1,
      alumniName: 'Arjun Singh',
      alumniRole: 'Product Manager @ Flipkart',
      sessionDate: 'Aug 12, 2026',
    },
    helpfulCount: 46,
    askedByCount: 61,
    peers: [
      {
        id: 101,
        name: 'Nikhil Ramesh',
        collegeId: 'VTU21CSE0142',
        year: '4th Year',
        department: 'Computer Science',
        askedOn: 'Aug 20, 2026',
        helpedCount: 4,
        visibleToPeers: true,
      },
      {
        id: 102,
        name: 'Aishwarya Menon',
        collegeId: 'VTU22ITE0091',
        year: '3rd Year',
        department: 'Information Technology',
        askedOn: 'Sep 2, 2026',
        helpedCount: 2,
        visibleToPeers: true,
      },
    ],
    suggestedAlumniIds: [1, 22],
  },
  {
    id: 2,
    question: 'What should I prepare for product based company interviews?',
    answer:
      'Split preparation into three tracks: data structures and algorithms (8-10 weeks, pattern based), low level and system design basics, and a crisp project story. Interviewers at product companies test how you reason out loud far more than whether you reach the optimal answer.',
    keyPoints: [
      'Solve patterns, not random problems - around 150 curated questions is enough',
      'Practise explaining your approach before writing code',
      'Keep one project you can discuss for 15 minutes in depth',
    ],
    tags: ['interview', 'preparation', 'dsa', 'placement', 'coding', 'product', 'company', 'system', 'design'],
    source: {
      alumniId: 7,
      alumniName: 'Karthik Rajan',
      alumniRole: 'Software Engineer @ Microsoft',
      sessionDate: 'Jul 29, 2026',
    },
    helpfulCount: 88,
    askedByCount: 120,
    peers: [
      {
        id: 103,
        name: 'Sathya Prakash',
        collegeId: 'VTU21CSE0377',
        year: '4th Year',
        department: 'Computer Science',
        askedOn: 'Aug 5, 2026',
        helpedCount: 7,
        visibleToPeers: true,
      },
    ],
    suggestedAlumniIds: [7, 17, 19],
  },
  {
    id: 3,
    question: 'Is a masters abroad worth it after engineering, and how do I fund it?',
    answer:
      'A masters abroad pays off when you have a clear specialisation and a target job market, not as an escape from placements. Funding usually combines an education loan, partial assistantship and savings. Apply to a spread of 6-8 universities across ambitious, moderate and safe tiers.',
    keyPoints: [
      'Decide the specialisation before the country',
      'Start GRE/IELTS about 12 months before intake',
      'Ask professors for research assistantships directly by email',
    ],
    tags: ['masters', 'abroad', 'ms', 'higher', 'studies', 'gre', 'university', 'scholarship', 'funding'],
    source: {
      alumniId: 2,
      alumniName: 'Priya Sharma',
      alumniRole: 'Software Engineer @ Google',
      sessionDate: 'Jun 18, 2026',
    },
    helpfulCount: 53,
    askedByCount: 74,
    peers: [
      {
        id: 104,
        name: 'Harini Balaji',
        collegeId: 'VTU21ECE0215',
        year: '4th Year',
        department: 'Electronics',
        askedOn: 'Jul 11, 2026',
        helpedCount: 5,
        visibleToPeers: true,
      },
    ],
    suggestedAlumniIds: [2, 5],
  },
  {
    id: 4,
    question: 'How do I break into data science without a masters degree?',
    answer:
      'Most data roles hired from campus are analyst roles first. Get fluent in SQL and one visualisation tool, then build two end to end projects with messy public data. Recruiters look for the ability to frame a business question, not the fanciest model.',
    keyPoints: [
      'SQL depth beats knowing five ML libraries',
      'Publish two projects with a written business conclusion',
      'Apply for analyst roles and grow into data science internally',
    ],
    tags: ['data', 'science', 'analytics', 'sql', 'machine', 'learning', 'analyst', 'career'],
    source: {
      alumniId: 8,
      alumniName: 'Divya Lakshmi',
      alumniRole: 'Data Analyst @ Deloitte',
      sessionDate: 'Aug 30, 2026',
    },
    helpfulCount: 37,
    askedByCount: 49,
    peers: [
      {
        id: 105,
        name: 'Mohammed Irfan',
        collegeId: 'VTU22CSE0508',
        year: '3rd Year',
        department: 'Computer Science',
        askedOn: 'Sep 6, 2026',
        helpedCount: 1,
        visibleToPeers: true,
      },
    ],
    suggestedAlumniIds: [8, 13, 20],
  },
  {
    id: 5,
    question: 'How do I start a startup while still in college?',
    answer:
      'Validate before you build. Talk to 20 potential users, sell the idea on paper, and only then write code. College is the cheapest time to experiment because your cost of failure is close to zero, but protect your degree timeline with a fixed weekly budget of hours.',
    keyPoints: [
      'Do 20 problem interviews before building anything',
      'Register the company only after your first paying user',
      'Use campus incubation and alumni angels for the first cheque',
    ],
    tags: ['startup', 'entrepreneurship', 'founder', 'business', 'funding', 'idea'],
    source: {
      alumniId: 3,
      alumniName: 'Rahul Verma',
      alumniRole: 'Startup Founder & CEO',
      sessionDate: 'May 22, 2026',
    },
    helpfulCount: 29,
    askedByCount: 33,
    peers: [],
    suggestedAlumniIds: [3],
  },
  {
    id: 6,
    question: 'How do I build a design portfolio that gets shortlisted?',
    answer:
      'Three deep case studies beat fifteen dribbble shots. Each case study should show the problem, your research, two rejected directions and the measurable outcome. Recruiters spend under two minutes per portfolio, so lead with the outcome.',
    keyPoints: [
      'Three case studies, each with a clear before and after',
      'Show rejected directions to prove your thinking',
      'Keep the portfolio site loading in under 3 seconds',
    ],
    tags: ['design', 'portfolio', 'ux', 'ui', 'figma', 'creative', 'internship'],
    source: {
      alumniId: 14,
      alumniName: 'Lakshmi Narayanan',
      alumniRole: 'Product Designer @ Swiggy',
      sessionDate: 'Sep 1, 2026',
    },
    helpfulCount: 24,
    askedByCount: 31,
    peers: [
      {
        id: 106,
        name: 'Tanya Fernandes',
        collegeId: 'VTU22DES0033',
        year: '3rd Year',
        department: 'Design',
        askedOn: 'Sep 9, 2026',
        helpedCount: 3,
        visibleToPeers: true,
      },
    ],
    suggestedAlumniIds: [14, 10, 6],
  },
];

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'how', 'what', 'should', 'can', 'do', 'does', 'is', 'are', 'was',
  'i', 'my', 'me', 'to', 'in', 'on', 'of', 'a', 'an', 'be', 'get', 'got', 'it', 'that', 'this',
  'about', 'from', 'after', 'before', 'want', 'need', 'help', 'please', 'you', 'your',
]);

export const tokenize = (text: string): string[] =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

export interface MatchedEntry extends KnowledgeEntry {
  matchScore: number;
}

/** Lightweight keyword relevance match against the library. */
export const searchKnowledge = (query: string): MatchedEntry[] => {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  return knowledgeLibrary
    .map((entry) => {
      const haystack = [...tokenize(entry.question), ...entry.tags.map((t) => t.toLowerCase())];
      const hits = tokens.filter((t) =>
        haystack.some((h) => h.includes(t) || t.includes(h))
      ).length;
      const matchScore = Math.min(97, Math.round((hits / tokens.length) * 100));
      return { ...entry, matchScore };
    })
    .filter((entry) => entry.matchScore >= 25)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
};

export const visiblePeers = (entry: KnowledgeEntry): PeerHelper[] =>
  entry.peers.filter((p) => p.visibleToPeers);
