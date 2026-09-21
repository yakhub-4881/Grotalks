// Peer guidance records (prototype data)
// Captures student-to-student help that happens through Grotalks AI chats.

export interface PeerGuidanceSession {
  id: number;
  /** Student who gave the guidance */
  helperId: number;
  helperName: string;
  helperCollegeId: string;
  helperYear: string;
  helperDepartment: string;
  /** Student who asked */
  seekerName: string;
  seekerCollegeId: string;
  seekerYear: string;
  seekerDepartment: string;
  topic: string;
  question: string;
  date: string;
  messages: number;
  minutes: number;
  status: 'completed' | 'ongoing';
  seekerRating: number | null;
  seekerNote?: string;
}

export const peerGuidanceSessions: PeerGuidanceSession[] = [
  {
    id: 1,
    helperId: 101,
    helperName: 'Nikhil Ramesh',
    helperCollegeId: 'VTU21CSE0142',
    helperYear: '4th Year',
    helperDepartment: 'Computer Science',
    seekerName: 'Ravi Kumar',
    seekerCollegeId: 'VTU22CSE0219',
    seekerYear: '3rd Year',
    seekerDepartment: 'Computer Science',
    topic: 'Engineering to Product Management',
    question: 'How do I move from engineering into a product management role?',
    date: 'Sep 16, 2026',
    messages: 14,
    minutes: 22,
    status: 'completed',
    seekerRating: 5,
    seekerNote: 'Shared his exact APM application timeline — really practical.',
  },
  {
    id: 2,
    helperId: 103,
    helperName: 'Sathya Prakash',
    helperCollegeId: 'VTU21CSE0377',
    helperYear: '4th Year',
    helperDepartment: 'Computer Science',
    seekerName: 'Ravi Kumar',
    seekerCollegeId: 'VTU22CSE0219',
    seekerYear: '3rd Year',
    seekerDepartment: 'Computer Science',
    topic: 'Product company interviews',
    question: 'What should I prepare for product based company interviews?',
    date: 'Sep 10, 2026',
    messages: 9,
    minutes: 15,
    status: 'completed',
    seekerRating: 4,
  },
  {
    id: 3,
    helperId: 201,
    helperName: 'Ravi Kumar',
    helperCollegeId: 'VTU22CSE0219',
    helperYear: '3rd Year',
    helperDepartment: 'Computer Science',
    seekerName: 'Meera Suresh',
    seekerCollegeId: 'VTU23CSE0714',
    seekerYear: '2nd Year',
    seekerDepartment: 'Computer Science',
    topic: 'Choosing a first internship',
    question: 'Should I take a startup internship or wait for campus placements?',
    date: 'Sep 18, 2026',
    messages: 18,
    minutes: 26,
    status: 'completed',
    seekerRating: 5,
    seekerNote: 'Helped me compare both offers calmly. Very useful.',
  },
  {
    id: 4,
    helperId: 201,
    helperName: 'Ravi Kumar',
    helperCollegeId: 'VTU22CSE0219',
    helperYear: '3rd Year',
    helperDepartment: 'Computer Science',
    seekerName: 'Ajay Narayan',
    seekerCollegeId: 'VTU23ITE0122',
    seekerYear: '2nd Year',
    seekerDepartment: 'Information Technology',
    topic: 'Building a first project portfolio',
    question: 'What projects should I build to get shortlisted?',
    date: 'Sep 12, 2026',
    messages: 11,
    minutes: 17,
    status: 'completed',
    seekerRating: 4,
  },
  {
    id: 5,
    helperId: 201,
    helperName: 'Ravi Kumar',
    helperCollegeId: 'VTU22CSE0219',
    helperYear: '3rd Year',
    helperDepartment: 'Computer Science',
    seekerName: 'Sneha Iyer',
    seekerCollegeId: 'VTU23ECE0450',
    seekerYear: '2nd Year',
    seekerDepartment: 'Electronics',
    topic: 'Product management basics',
    question: 'How do I know if product management suits me?',
    date: 'Sep 20, 2026',
    messages: 6,
    minutes: 8,
    status: 'ongoing',
    seekerRating: null,
  },
  {
    id: 6,
    helperId: 104,
    helperName: 'Harini Balaji',
    helperCollegeId: 'VTU21ECE0215',
    helperYear: '4th Year',
    helperDepartment: 'Electronics',
    seekerName: 'Vignesh Raj',
    seekerCollegeId: 'VTU22ECE0311',
    seekerYear: '3rd Year',
    seekerDepartment: 'Electronics',
    topic: 'Masters abroad funding',
    question: 'How do I fund a masters abroad?',
    date: 'Sep 8, 2026',
    messages: 21,
    minutes: 30,
    status: 'completed',
    seekerRating: 5,
  },
  {
    id: 7,
    helperId: 102,
    helperName: 'Aishwarya Menon',
    helperCollegeId: 'VTU22ITE0091',
    helperYear: '3rd Year',
    helperDepartment: 'Information Technology',
    seekerName: 'Karan Mehta',
    seekerCollegeId: 'VTU23ITE0087',
    seekerYear: '2nd Year',
    seekerDepartment: 'Information Technology',
    topic: 'Engineering to Product Management',
    question: 'Is a PM role possible right after college?',
    date: 'Sep 14, 2026',
    messages: 8,
    minutes: 12,
    status: 'completed',
    seekerRating: 4,
  },
  {
    id: 8,
    helperId: 106,
    helperName: 'Tanya Fernandes',
    helperCollegeId: 'VTU22DES0033',
    helperYear: '3rd Year',
    helperDepartment: 'Design',
    seekerName: 'Pooja Anand',
    seekerCollegeId: 'VTU23DES0019',
    seekerYear: '2nd Year',
    seekerDepartment: 'Design',
    topic: 'Design portfolio',
    question: 'How many case studies should my portfolio have?',
    date: 'Sep 17, 2026',
    messages: 13,
    minutes: 19,
    status: 'completed',
    seekerRating: 5,
  },
];

/** The signed-in student in this prototype */
export const CURRENT_STUDENT_ID = 201;

export const guidanceGivenBy = (helperId: number) =>
  peerGuidanceSessions.filter((s) => s.helperId === helperId);

export const guidanceReceivedBy = (name: string) =>
  peerGuidanceSessions.filter((s) => s.seekerName === name);

export interface HelperSummary {
  helperId: number;
  name: string;
  collegeId: string;
  year: string;
  department: string;
  sessions: number;
  studentsHelped: number;
  minutes: number;
  avgRating: number | null;
  topics: string[];
  lastActive: string;
}

export const helperLeaderboard = (): HelperSummary[] => {
  const map = new Map<number, HelperSummary & { ratings: number[] }>();
  peerGuidanceSessions.forEach((s) => {
    const existing = map.get(s.helperId);
    const row =
      existing ?? {
        helperId: s.helperId,
        name: s.helperName,
        collegeId: s.helperCollegeId,
        year: s.helperYear,
        department: s.helperDepartment,
        sessions: 0,
        studentsHelped: 0,
        minutes: 0,
        avgRating: null,
        topics: [] as string[],
        lastActive: s.date,
        ratings: [] as number[],
      };
    row.sessions += 1;
    row.minutes += s.minutes;
    if (!row.topics.includes(s.topic)) row.topics.push(s.topic);
    if (s.seekerRating) row.ratings.push(s.seekerRating);
    map.set(s.helperId, row);
  });

  return Array.from(map.values())
    .map((row) => {
      const seekers = new Set(
        peerGuidanceSessions.filter((s) => s.helperId === row.helperId).map((s) => s.seekerCollegeId)
      );
      const { ratings, ...rest } = row;
      return {
        ...rest,
        studentsHelped: seekers.size,
        avgRating: ratings.length
          ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
          : null,
      };
    })
    .sort((a, b) => b.sessions - a.sessions);
};

export const peerGuidanceTotals = () => {
  const sessions = peerGuidanceSessions.length;
  const helpers = new Set(peerGuidanceSessions.map((s) => s.helperId)).size;
  const minutes = peerGuidanceSessions.reduce((sum, s) => sum + s.minutes, 0);
  const rated = peerGuidanceSessions.filter((s) => s.seekerRating);
  const avgRating = rated.length
    ? Math.round((rated.reduce((a, s) => a + (s.seekerRating ?? 0), 0) / rated.length) * 10) / 10
    : null;
  return { sessions, helpers, minutes, avgRating };
};
