import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Briefcase, Phone, FileText, GraduationCap, Send, Trophy, TrendingUp, Star } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────
type MilestoneType = 'Applied for Internship' | 'Got Interview Call' | 'Secured Internship' | 'Got Job Offer' | 'Applied for Higher Studies';

type MilestoneEntry = {
  studentId: string;
  studentName: string;
  branch: string;
  year: string;
  milestone: MilestoneType;
  linkedSessionDate: string;
  linkedAlumni: string;
  semester: string;
};

// ─── Mock Data ──────────────────────────────────────────────
const MILESTONES: MilestoneEntry[] = [
  { studentId: 'VT2024001', studentName: 'Arjun Mehta', branch: 'CSE', year: '3rd', milestone: 'Got Interview Call', linkedSessionDate: '2026-03-10', linkedAlumni: 'Vikram Rao', semester: 'Spring 2026' },
  { studentId: 'VT2024001', studentName: 'Arjun Mehta', branch: 'CSE', year: '3rd', milestone: 'Applied for Internship', linkedSessionDate: '2026-03-05', linkedAlumni: 'Ritu Kapoor', semester: 'Spring 2026' },
  { studentId: 'VT2024002', studentName: 'Priya Sharma', branch: 'ECE', year: '2nd', milestone: 'Applied for Internship', linkedSessionDate: '2026-03-08', linkedAlumni: 'Anita Desai', semester: 'Spring 2026' },
  { studentId: 'VT2024003', studentName: 'Rahul Verma', branch: 'ME', year: '4th', milestone: 'Got Job Offer', linkedSessionDate: '2026-03-07', linkedAlumni: 'Suresh Kumar', semester: 'Spring 2026' },
  { studentId: 'VT2024003', studentName: 'Rahul Verma', branch: 'ME', year: '4th', milestone: 'Got Interview Call', linkedSessionDate: '2026-02-15', linkedAlumni: 'Neha Gupta', semester: 'Spring 2026' },
  { studentId: 'VT2024003', studentName: 'Rahul Verma', branch: 'ME', year: '4th', milestone: 'Secured Internship', linkedSessionDate: '2026-02-15', linkedAlumni: 'Neha Gupta', semester: 'Spring 2026' },
  { studentId: 'VT2024004', studentName: 'Sneha Iyer', branch: 'CSE', year: '3rd', milestone: 'Applied for Internship', linkedSessionDate: '2026-03-06', linkedAlumni: 'Vikram Rao', semester: 'Spring 2026' },
  { studentId: 'VT2024006', studentName: 'Divya Nair', branch: 'IT', year: '3rd', milestone: 'Secured Internship', linkedSessionDate: '2026-03-12', linkedAlumni: 'Anita Desai', semester: 'Spring 2026' },
  { studentId: 'VT2024006', studentName: 'Divya Nair', branch: 'IT', year: '3rd', milestone: 'Got Interview Call', linkedSessionDate: '2026-02-25', linkedAlumni: 'Ritu Kapoor', semester: 'Spring 2026' },
  { studentId: 'VT2024007', studentName: 'Aditya Joshi', branch: 'CSE', year: '4th', milestone: 'Got Job Offer', linkedSessionDate: '2026-03-04', linkedAlumni: 'Suresh Kumar', semester: 'Spring 2026' },
  { studentId: 'VT2024007', studentName: 'Aditya Joshi', branch: 'CSE', year: '4th', milestone: 'Got Interview Call', linkedSessionDate: '2026-03-04', linkedAlumni: 'Suresh Kumar', semester: 'Spring 2026' },
  { studentId: 'VT2024007', studentName: 'Aditya Joshi', branch: 'CSE', year: '4th', milestone: 'Secured Internship', linkedSessionDate: '2026-03-04', linkedAlumni: 'Suresh Kumar', semester: 'Spring 2026' },
  { studentId: 'VT2024008', studentName: 'Meera Patel', branch: 'ECE', year: '2nd', milestone: 'Applied for Higher Studies', linkedSessionDate: '2026-02-20', linkedAlumni: 'Anita Desai', semester: 'Spring 2026' },
  // Fall 2025
  { studentId: 'VT2024001', studentName: 'Arjun Mehta', branch: 'CSE', year: '3rd', milestone: 'Applied for Internship', linkedSessionDate: '2025-10-12', linkedAlumni: 'Amit Patel', semester: 'Fall 2025' },
  { studentId: 'VT2024006', studentName: 'Divya Nair', branch: 'IT', year: '3rd', milestone: 'Got Interview Call', linkedSessionDate: '2025-11-05', linkedAlumni: 'Ritu Kapoor', semester: 'Fall 2025' },
];

const MILESTONE_TYPES: MilestoneType[] = ['Applied for Internship', 'Got Interview Call', 'Secured Internship', 'Got Job Offer', 'Applied for Higher Studies'];
const BRANCHES = ['All Branches', 'CSE', 'ECE', 'ME', 'EEE', 'IT'];
const YEARS = ['All Years', '1st', '2nd', '3rd', '4th'];
const SEMESTERS = ['All Semesters', 'Spring 2026', 'Fall 2025'];

const getMilestoneIcon = (type: MilestoneType) => {
  switch (type) {
    case 'Applied for Internship': return <Send className="h-5 w-5 text-primary" />;
    case 'Got Interview Call': return <Phone className="h-5 w-5 text-warning" />;
    case 'Secured Internship': return <Briefcase className="h-5 w-5 text-success" />;
    case 'Got Job Offer': return <FileText className="h-5 w-5 text-success" />;
    case 'Applied for Higher Studies': return <GraduationCap className="h-5 w-5 text-primary" />;
  }
};

// ─── Component ──────────────────────────────────────────────
const CareerMilestones = () => {
  const [branchFilter, setBranchFilter] = useState('All Branches');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [semesterFilter, setSemesterFilter] = useState('All Semesters');

  const filtered = MILESTONES.filter(m => {
    const matchesBranch = branchFilter === 'All Branches' || m.branch === branchFilter;
    const matchesYear = yearFilter === 'All Years' || m.year === yearFilter;
    const matchesSemester = semesterFilter === 'All Semesters' || m.semester === semesterFilter;
    return matchesBranch && matchesYear && matchesSemester;
  });

  // Counts per milestone type
  const counts = MILESTONE_TYPES.reduce((acc, type) => {
    acc[type] = filtered.filter(m => m.milestone === type).length;
    return acc;
  }, {} as Record<MilestoneType, number>);

  // Top alumnis by milestone count
  const alumniCounts: Record<string, number> = {};
  filtered.forEach(m => {
    alumniCounts[m.linkedAlumni] = (alumniCounts[m.linkedAlumni] || 0) + 1;
  });
  const topAlumnis = Object.entries(alumniCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Sessions most linked to milestones (unique session dates + alumnis)
  const sessionCounts: Record<string, { alumni: string; date: string; count: number }> = {};
  filtered.forEach(m => {
    const key = `${m.linkedAlumni}-${m.linkedSessionDate}`;
    if (!sessionCounts[key]) sessionCounts[key] = { alumni: m.linkedAlumni, date: m.linkedSessionDate, count: 0 };
    sessionCounts[key].count++;
  });
  const topSessions = Object.values(sessionCounts).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Career Milestone Tracking</h1>
        <p className="text-muted-foreground text-sm mt-1">Aggregated career milestones declared by students across the college</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={branchFilter} onValueChange={setBranchFilter}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            {BRANCHES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-full sm:w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            {YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={semesterFilter} onValueChange={setSemesterFilter}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            {SEMESTERS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Milestone Count Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {MILESTONE_TYPES.map(type => (
          <Card key={type}>
            <CardContent className="p-4 text-center">
              <div className="mx-auto mb-2">{getMilestoneIcon(type)}</div>
              <p className="text-2xl font-bold">{counts[type]}</p>
              <p className="text-xs text-muted-foreground mt-1">{type}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Alumnis & Top Sessions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="h-4 w-4 text-warning" /> Top Alumnis by Milestones
            </CardTitle>
            <CardDescription>Alumnis most frequently linked to student career milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topAlumnis.map(([name, count], i) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {i + 1}
                  </div>
                  <span className="flex-1 font-medium text-sm">{name}</span>
                  <Badge variant="secondary">{count} milestones</Badge>
                </div>
              ))}
              {topAlumnis.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No data available</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" /> Top Sessions by Outcome
            </CardTitle>
            <CardDescription>Sessions with the most career milestones linked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topSessions.map((session, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center text-sm font-bold text-success">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{session.alumni}</p>
                    <p className="text-xs text-muted-foreground">{new Date(session.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <Badge variant="secondary">{session.count} milestones</Badge>
                </div>
              ))}
              {topSessions.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No data available</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full Milestone Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Milestones</CardTitle>
          <CardDescription>{filtered.length} milestone entries found</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="hidden sm:table-cell">Branch</TableHead>
                <TableHead className="hidden sm:table-cell">Year</TableHead>
                <TableHead>Milestone</TableHead>
                <TableHead className="hidden md:table-cell">Linked Alumni</TableHead>
                <TableHead className="hidden md:table-cell">Session Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((m, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{m.studentName}</p>
                      <p className="text-xs text-muted-foreground font-mono">{m.studentId}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{m.branch}</TableCell>
                  <TableCell className="hidden sm:table-cell">{m.year}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{m.milestone}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{m.linkedAlumni}</TableCell>
                  <TableCell className="hidden md:table-cell text-xs">
                    {new Date(m.linkedSessionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No milestones found for the selected filters</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerMilestones;
