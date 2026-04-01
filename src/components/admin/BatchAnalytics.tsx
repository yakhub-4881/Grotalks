import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Users, UserCheck, UserX, TrendingUp, Briefcase, GraduationCap, Phone, FileText } from 'lucide-react';

// ─── Mock Data ──────────────────────────────────────────────
type BatchData = {
  year: string;
  branch: string;
  totalStudents: number;
  bookedAtLeastOne: number;
  notEngaged: number;
  actionCompletionRate: number;
  milestones: {
    internshipSecured: number;
    jobOfferReceived: number;
    interviewCalls: number;
    higherStudiesApplied: number;
  };
  guidedMilestones: {
    internshipSecured: number;
    jobOfferReceived: number;
    interviewCalls: number;
    higherStudiesApplied: number;
  };
  nonGuidedMilestones: {
    internshipSecured: number;
    jobOfferReceived: number;
    interviewCalls: number;
    higherStudiesApplied: number;
  };
};

const BATCH_DATA: BatchData[] = [
  {
    year: '4th', branch: 'CSE', totalStudents: 120,
    bookedAtLeastOne: 89, notEngaged: 31, actionCompletionRate: 72,
    milestones: { internshipSecured: 34, jobOfferReceived: 28, interviewCalls: 67, higherStudiesApplied: 12 },
    guidedMilestones: { internshipSecured: 28, jobOfferReceived: 24, interviewCalls: 52, higherStudiesApplied: 9 },
    nonGuidedMilestones: { internshipSecured: 6, jobOfferReceived: 4, interviewCalls: 15, higherStudiesApplied: 3 },
  },
  {
    year: '4th', branch: 'ECE', totalStudents: 90,
    bookedAtLeastOne: 52, notEngaged: 38, actionCompletionRate: 65,
    milestones: { internshipSecured: 18, jobOfferReceived: 14, interviewCalls: 40, higherStudiesApplied: 8 },
    guidedMilestones: { internshipSecured: 14, jobOfferReceived: 12, interviewCalls: 30, higherStudiesApplied: 6 },
    nonGuidedMilestones: { internshipSecured: 4, jobOfferReceived: 2, interviewCalls: 10, higherStudiesApplied: 2 },
  },
  {
    year: '3rd', branch: 'CSE', totalStudents: 130,
    bookedAtLeastOne: 78, notEngaged: 52, actionCompletionRate: 68,
    milestones: { internshipSecured: 22, jobOfferReceived: 5, interviewCalls: 45, higherStudiesApplied: 3 },
    guidedMilestones: { internshipSecured: 18, jobOfferReceived: 4, interviewCalls: 35, higherStudiesApplied: 2 },
    nonGuidedMilestones: { internshipSecured: 4, jobOfferReceived: 1, interviewCalls: 10, higherStudiesApplied: 1 },
  },
  {
    year: '3rd', branch: 'ME', totalStudents: 80,
    bookedAtLeastOne: 35, notEngaged: 45, actionCompletionRate: 58,
    milestones: { internshipSecured: 10, jobOfferReceived: 2, interviewCalls: 20, higherStudiesApplied: 6 },
    guidedMilestones: { internshipSecured: 8, jobOfferReceived: 2, interviewCalls: 15, higherStudiesApplied: 4 },
    nonGuidedMilestones: { internshipSecured: 2, jobOfferReceived: 0, interviewCalls: 5, higherStudiesApplied: 2 },
  },
  {
    year: '2nd', branch: 'CSE', totalStudents: 140,
    bookedAtLeastOne: 45, notEngaged: 95, actionCompletionRate: 55,
    milestones: { internshipSecured: 5, jobOfferReceived: 0, interviewCalls: 12, higherStudiesApplied: 0 },
    guidedMilestones: { internshipSecured: 4, jobOfferReceived: 0, interviewCalls: 10, higherStudiesApplied: 0 },
    nonGuidedMilestones: { internshipSecured: 1, jobOfferReceived: 0, interviewCalls: 2, higherStudiesApplied: 0 },
  },
  {
    year: '2nd', branch: 'EEE', totalStudents: 60,
    bookedAtLeastOne: 18, notEngaged: 42, actionCompletionRate: 50,
    milestones: { internshipSecured: 3, jobOfferReceived: 0, interviewCalls: 8, higherStudiesApplied: 1 },
    guidedMilestones: { internshipSecured: 2, jobOfferReceived: 0, interviewCalls: 6, higherStudiesApplied: 1 },
    nonGuidedMilestones: { internshipSecured: 1, jobOfferReceived: 0, interviewCalls: 2, higherStudiesApplied: 0 },
  },
];

const YEARS = ['All Years', '2nd', '3rd', '4th'];
const BRANCHES = ['All Branches', 'CSE', 'ECE', 'ME', 'EEE', 'IT'];

// ─── Component ──────────────────────────────────────────────
const BatchAnalytics = () => {
  const [yearFilter, setYearFilter] = useState('All Years');
  const [branchFilter, setBranchFilter] = useState('All Branches');

  const filtered = BATCH_DATA.filter(b => {
    const matchesYear = yearFilter === 'All Years' || b.year === yearFilter;
    const matchesBranch = branchFilter === 'All Branches' || b.branch === branchFilter;
    return matchesYear && matchesBranch;
  });

  // Aggregated stats
  const totals = filtered.reduce((acc, b) => ({
    totalStudents: acc.totalStudents + b.totalStudents,
    bookedAtLeastOne: acc.bookedAtLeastOne + b.bookedAtLeastOne,
    notEngaged: acc.notEngaged + b.notEngaged,
    actionCompletionRate: acc.actionCompletionRate + b.actionCompletionRate * b.totalStudents,
    internship: acc.internship + b.milestones.internshipSecured,
    jobOffer: acc.jobOffer + b.milestones.jobOfferReceived,
    interviewCalls: acc.interviewCalls + b.milestones.interviewCalls,
    higherStudies: acc.higherStudies + b.milestones.higherStudiesApplied,
    mInternship: acc.mInternship + b.guidedMilestones.internshipSecured,
    mJobOffer: acc.mJobOffer + b.guidedMilestones.jobOfferReceived,
    mInterviewCalls: acc.mInterviewCalls + b.guidedMilestones.interviewCalls,
    mHigherStudies: acc.mHigherStudies + b.guidedMilestones.higherStudiesApplied,
    nmInternship: acc.nmInternship + b.nonGuidedMilestones.internshipSecured,
    nmJobOffer: acc.nmJobOffer + b.nonGuidedMilestones.jobOfferReceived,
    nmInterviewCalls: acc.nmInterviewCalls + b.nonGuidedMilestones.interviewCalls,
    nmHigherStudies: acc.nmHigherStudies + b.nonGuidedMilestones.higherStudiesApplied,
  }), {
    totalStudents: 0, bookedAtLeastOne: 0, notEngaged: 0, actionCompletionRate: 0,
    internship: 0, jobOffer: 0, interviewCalls: 0, higherStudies: 0,
    mInternship: 0, mJobOffer: 0, mInterviewCalls: 0, mHigherStudies: 0,
    nmInternship: 0, nmJobOffer: 0, nmInterviewCalls: 0, nmHigherStudies: 0,
  });

  const avgCompletion = totals.totalStudents > 0 ? Math.round(totals.actionCompletionRate / totals.totalStudents) : 0;

  const comparisonData = [
    { label: 'Internship Secured', guided: totals.mInternship, nonGuided: totals.nmInternship },
    { label: 'Job Offer Received', guided: totals.mJobOffer, nonGuided: totals.nmJobOffer },
    { label: 'Interview Calls', guided: totals.mInterviewCalls, nonGuided: totals.nmInterviewCalls },
    { label: 'Higher Studies Applied', guided: totals.mHigherStudies, nonGuided: totals.nmHigherStudies },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Batch Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Engagement and career milestone data segmented by year and branch</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-full sm:w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            {YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={branchFilter} onValueChange={setBranchFilter}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            {BRANCHES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <UserCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Engaged Students</p>
              <p className="text-lg font-bold">{totals.bookedAtLeastOne}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
              <UserX className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Not Yet Engaged</p>
              <p className="text-lg font-bold">{totals.notEngaged}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Action Completion</p>
              <p className="text-lg font-bold">{avgCompletion}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Students</p>
              <p className="text-lg font-bold">{totals.totalStudents}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Student Engagement</CardTitle>
          <CardDescription>Proportion of students who have booked at least one session this semester</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Engaged</span>
              <span className="font-medium">{totals.bookedAtLeastOne} / {totals.totalStudents} ({totals.totalStudents > 0 ? Math.round(totals.bookedAtLeastOne / totals.totalStudents * 100) : 0}%)</span>
            </div>
            <Progress value={totals.totalStudents > 0 ? (totals.bookedAtLeastOne / totals.totalStudents) * 100 : 0} className="h-3" />
            <div className="flex gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
                Engaged ({totals.bookedAtLeastOne})
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-muted" />
                Not Yet Engaged ({totals.notEngaged})
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Career Milestones Declared</CardTitle>
          <CardDescription>Aggregate milestones reported by students in this batch</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <Briefcase className="h-5 w-5 mx-auto text-primary mb-1" />
              <p className="text-2xl font-bold">{totals.internship}</p>
              <p className="text-xs text-muted-foreground">Internship Secured</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <FileText className="h-5 w-5 mx-auto text-success mb-1" />
              <p className="text-2xl font-bold">{totals.jobOffer}</p>
              <p className="text-xs text-muted-foreground">Job Offer Received</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <Phone className="h-5 w-5 mx-auto text-warning mb-1" />
              <p className="text-2xl font-bold">{totals.interviewCalls}</p>
              <p className="text-xs text-muted-foreground">Interview Calls</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <GraduationCap className="h-5 w-5 mx-auto text-primary mb-1" />
              <p className="text-2xl font-bold">{totals.higherStudies}</p>
              <p className="text-xs text-muted-foreground">Higher Studies Applied</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guided vs Non-Guided Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Guided vs Non-Guided Comparison</CardTitle>
          <CardDescription>Career milestone comparison between students who used alumni guidance vs those who didn't</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {comparisonData.map(item => {
              const total = item.guided + item.nonGuided;
              const guidedPct = total > 0 ? Math.round((item.guided / total) * 100) : 0;
              return (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted-foreground">{total} total</span>
                  </div>
                  <div className="flex h-6 rounded-full overflow-hidden bg-muted">
                    {item.guided > 0 && (
                      <div
                        className="bg-primary flex items-center justify-center text-[10px] font-medium text-primary-foreground transition-all"
                        style={{ width: `${guidedPct}%` }}
                      >
                        {item.guided}
                      </div>
                    )}
                    {item.nonGuided > 0 && (
                      <div
                        className="bg-muted-foreground/30 flex items-center justify-center text-[10px] font-medium text-foreground transition-all"
                        style={{ width: `${100 - guidedPct}%` }}
                      >
                        {item.nonGuided}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-sm bg-primary" /> Guided ({guidedPct}%)</span>
                    <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-sm bg-muted-foreground/30" /> Non-Guided ({100 - guidedPct}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Per-Batch Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Per-Batch Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-muted-foreground">Year</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Branch</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Students</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Engaged</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Not Engaged</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Completion %</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="p-3 font-medium">{b.year} Year</td>
                    <td className="p-3">{b.branch}</td>
                    <td className="p-3 text-center">{b.totalStudents}</td>
                    <td className="p-3 text-center">
                      <Badge variant="secondary">{b.bookedAtLeastOne}</Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant="destructive">{b.notEngaged}</Badge>
                    </td>
                    <td className="p-3 text-center">{b.actionCompletionRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchAnalytics;
