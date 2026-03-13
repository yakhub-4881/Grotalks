import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ArrowLeft, Target, Brain, CheckCircle, Clock, AlertCircle, User, Calendar } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────
type ActionStatus = 'Done' | 'In Progress' | 'Not Yet';
type SessionTag = 'Action Pending' | 'Action Completed' | 'Outcome Achieved';

type SessionJourney = {
  id: string;
  date: string;
  mentorName: string;
  preSessionGoal: string;
  aiActionPlan: string[];
  followUpStatus: { action: string; status: ActionStatus }[];
  sessionTag: SessionTag;
};

type StudentWithJourney = {
  id: string;
  name: string;
  branch: string;
  year: string;
  sessions: SessionJourney[];
};

// ─── Mock Data ──────────────────────────────────────────────
const STUDENT_JOURNEYS: StudentWithJourney[] = [
  {
    id: 'VT2024001', name: 'Arjun Mehta', branch: 'CSE', year: '3rd',
    sessions: [
      {
        id: 's1', date: '2026-03-10', mentorName: 'Vikram Rao',
        preSessionGoal: 'Understand system design basics for upcoming placement interviews',
        aiActionPlan: ['Complete 5 system design case studies from Grokking', 'Practice drawing architecture diagrams on whiteboard', 'Mock interview with peer on load balancer topic'],
        followUpStatus: [
          { action: 'Complete 5 system design case studies from Grokking', status: 'Done' },
          { action: 'Practice drawing architecture diagrams on whiteboard', status: 'In Progress' },
          { action: 'Mock interview with peer on load balancer topic', status: 'Not Yet' },
        ],
        sessionTag: 'Action Pending',
      },
      {
        id: 's2', date: '2026-03-05', mentorName: 'Ritu Kapoor',
        preSessionGoal: 'Get advice on choosing between backend and full-stack roles',
        aiActionPlan: ['Research 10 job descriptions for both roles', 'Build one small project in each domain', 'Write down pros and cons based on career goals'],
        followUpStatus: [
          { action: 'Research 10 job descriptions for both roles', status: 'Done' },
          { action: 'Build one small project in each domain', status: 'Done' },
          { action: 'Write down pros and cons based on career goals', status: 'Done' },
        ],
        sessionTag: 'Outcome Achieved',
      },
      {
        id: 's3', date: '2026-02-20', mentorName: 'Amit Patel',
        preSessionGoal: 'Review my resume and get feedback for tech companies',
        aiActionPlan: ['Rewrite experience section using STAR format', 'Add quantified metrics to project descriptions', 'Get 2 peers to review updated resume'],
        followUpStatus: [
          { action: 'Rewrite experience section using STAR format', status: 'Done' },
          { action: 'Add quantified metrics to project descriptions', status: 'Done' },
          { action: 'Get 2 peers to review updated resume', status: 'In Progress' },
        ],
        sessionTag: 'Action Completed',
      },
    ],
  },
  {
    id: 'VT2024002', name: 'Priya Sharma', branch: 'ECE', year: '2nd',
    sessions: [
      {
        id: 's4', date: '2026-03-08', mentorName: 'Anita Desai',
        preSessionGoal: 'Explore career options in embedded systems vs VLSI design',
        aiActionPlan: ['Talk to 3 professionals in each field', 'Complete an online intro course in VLSI', 'Attend the next IEEE webinar on embedded systems'],
        followUpStatus: [
          { action: 'Talk to 3 professionals in each field', status: 'In Progress' },
          { action: 'Complete an online intro course in VLSI', status: 'Not Yet' },
          { action: 'Attend the next IEEE webinar on embedded systems', status: 'Not Yet' },
        ],
        sessionTag: 'Action Pending',
      },
    ],
  },
  {
    id: 'VT2024003', name: 'Rahul Verma', branch: 'ME', year: '4th',
    sessions: [
      {
        id: 's5', date: '2026-03-07', mentorName: 'Suresh Kumar',
        preSessionGoal: 'Prepare for GATE ME exam – need a study plan',
        aiActionPlan: ['Create a 3-month study schedule covering all subjects', 'Solve previous year papers for last 5 years', 'Join a GATE study group for weekly discussions'],
        followUpStatus: [
          { action: 'Create a 3-month study schedule covering all subjects', status: 'Done' },
          { action: 'Solve previous year papers for last 5 years', status: 'Done' },
          { action: 'Join a GATE study group for weekly discussions', status: 'Done' },
        ],
        sessionTag: 'Outcome Achieved',
      },
      {
        id: 's6', date: '2026-02-15', mentorName: 'Neha Gupta',
        preSessionGoal: 'Understand how to approach core company placements',
        aiActionPlan: ['List target companies and their hiring criteria', 'Prepare for aptitude tests specific to core companies', 'Build a portfolio of academic projects'],
        followUpStatus: [
          { action: 'List target companies and their hiring criteria', status: 'Done' },
          { action: 'Prepare for aptitude tests specific to core companies', status: 'Done' },
          { action: 'Build a portfolio of academic projects', status: 'In Progress' },
        ],
        sessionTag: 'Action Completed',
      },
    ],
  },
  {
    id: 'VT2024004', name: 'Sneha Iyer', branch: 'CSE', year: '3rd',
    sessions: [
      {
        id: 's7', date: '2026-03-06', mentorName: 'Vikram Rao',
        preSessionGoal: 'Get guidance on open source contributions for GSoC',
        aiActionPlan: ['Find 5 beginner-friendly repos on GitHub', 'Make at least 2 pull requests this month', 'Write a GSoC proposal draft'],
        followUpStatus: [
          { action: 'Find 5 beginner-friendly repos on GitHub', status: 'Done' },
          { action: 'Make at least 2 pull requests this month', status: 'In Progress' },
          { action: 'Write a GSoC proposal draft', status: 'Not Yet' },
        ],
        sessionTag: 'Action Pending',
      },
    ],
  },
  {
    id: 'VT2024006', name: 'Divya Nair', branch: 'IT', year: '3rd',
    sessions: [
      {
        id: 's8', date: '2026-03-12', mentorName: 'Anita Desai',
        preSessionGoal: 'Explore AI/ML career paths and understand industry requirements',
        aiActionPlan: ['Complete Andrew Ng ML course on Coursera', 'Build a classification project with real dataset', 'Apply to 3 ML internships'],
        followUpStatus: [
          { action: 'Complete Andrew Ng ML course on Coursera', status: 'Done' },
          { action: 'Build a classification project with real dataset', status: 'Done' },
          { action: 'Apply to 3 ML internships', status: 'Done' },
        ],
        sessionTag: 'Outcome Achieved',
      },
      {
        id: 's9', date: '2026-02-25', mentorName: 'Ritu Kapoor',
        preSessionGoal: 'Learn about product management as a career option',
        aiActionPlan: ['Read "Inspired" by Marty Cagan', 'Create a mock PRD for a product idea', 'Shadow a PM in your internship network'],
        followUpStatus: [
          { action: 'Read "Inspired" by Marty Cagan', status: 'Done' },
          { action: 'Create a mock PRD for a product idea', status: 'Done' },
          { action: 'Shadow a PM in your internship network', status: 'Not Yet' },
        ],
        sessionTag: 'Action Completed',
      },
    ],
  },
  {
    id: 'VT2024007', name: 'Aditya Joshi', branch: 'CSE', year: '4th',
    sessions: [
      {
        id: 's10', date: '2026-03-04', mentorName: 'Suresh Kumar',
        preSessionGoal: 'Final placement preparation – mock interview practice',
        aiActionPlan: ['Do 3 mock interviews on Pramp', 'Revise top 50 DSA problems', 'Prepare behavioral interview answers using STAR'],
        followUpStatus: [
          { action: 'Do 3 mock interviews on Pramp', status: 'Done' },
          { action: 'Revise top 50 DSA problems', status: 'Done' },
          { action: 'Prepare behavioral interview answers using STAR', status: 'Done' },
        ],
        sessionTag: 'Outcome Achieved',
      },
    ],
  },
];

const BRANCHES = ['CSE', 'ECE', 'ME', 'EEE', 'IT'];
const YEARS = ['1st', '2nd', '3rd', '4th'];

// ─── Component ──────────────────────────────────────────────
const StudentJourneyTracker = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentWithJourney | null>(null);
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');

  const filtered = STUDENT_JOURNEYS.filter(s => {
    const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchesBranch = branchFilter === 'all' || s.branch === branchFilter;
    const matchesYear = yearFilter === 'all' || s.year === yearFilter;
    return matchesSearch && matchesBranch && matchesYear;
  });

  const getTagColor = (tag: SessionTag) => {
    switch (tag) {
      case 'Action Pending': return 'bg-warning/10 text-warning border-warning/30';
      case 'Action Completed': return 'bg-primary/10 text-primary border-primary/30';
      case 'Outcome Achieved': return 'bg-success/10 text-success border-success/30';
    }
  };

  const getStatusIcon = (status: ActionStatus) => {
    switch (status) {
      case 'Done': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'In Progress': return <Clock className="h-4 w-4 text-warning" />;
      case 'Not Yet': return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // ─── Detail View ──────────────────────────────────────────
  if (selectedStudent) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(null)}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedStudent.name}</h1>
            <p className="text-muted-foreground text-sm">{selectedStudent.id} · {selectedStudent.branch} · {selectedStudent.year} Year</p>
          </div>
        </div>

        <div className="relative border-l-2 border-border ml-4 space-y-6 pl-6 pt-2">
          {selectedStudent.sessions.map((session) => (
            <div key={session.id} className="relative">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{new Date(session.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="text-muted-foreground">·</span>
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{session.mentorName}</span>
                    </div>
                    <Badge className={`text-xs border ${getTagColor(session.sessionTag)}`}>
                      {session.sessionTag}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Pre-session Goal */}
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pre-Session Goal</span>
                    </div>
                    <p className="text-sm leading-relaxed">{session.preSessionGoal}</p>
                  </div>

                  {/* AI Action Plan */}
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">AI-Generated Action Plan</span>
                    </div>
                    <ul className="space-y-1.5">
                      {session.aiActionPlan.map((item, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary font-medium mt-0.5">{i + 1}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 2-week Follow-up */}
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">2-Week Follow-Up Status</p>
                    <div className="space-y-2">
                      {session.followUpStatus.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          {getStatusIcon(item.status)}
                          <span className="flex-1">{item.action}</span>
                          <Badge variant="outline" className="text-[10px]">{item.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── List View ────────────────────────────────────────────
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Student Session Journey</h1>
        <p className="text-muted-foreground text-sm mt-1">Track each student's complete mentoring journey chronologically</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or student ID..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={branchFilter} onValueChange={setBranchFilter}>
          <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Branch" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            {BRANCHES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-full sm:w-32"><SelectValue placeholder="Year" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Branch</TableHead>
                <TableHead className="hidden sm:table-cell">Year</TableHead>
                <TableHead className="text-center">Sessions</TableHead>
                <TableHead className="text-center">Latest Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(s => {
                const latestTag = s.sessions[0]?.sessionTag;
                return (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-xs">{s.id}</TableCell>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{s.branch}</TableCell>
                    <TableCell className="hidden sm:table-cell">{s.year}</TableCell>
                    <TableCell className="text-center">{s.sessions.length}</TableCell>
                    <TableCell className="text-center">
                      {latestTag && (
                        <Badge className={`text-[10px] border ${getTagColor(latestTag)}`}>{latestTag}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => setSelectedStudent(s)}>
                        View Journey
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No students found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentJourneyTracker;
