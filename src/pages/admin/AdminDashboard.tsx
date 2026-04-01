import { useState, useEffect } from 'react';
import velTechLogo from '@/assets/college-logos/vel-tech.png';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import StudentImport from '@/components/admin/StudentImport';
import StudentJourneyTracker from '@/components/admin/StudentJourneyTracker';
import BatchAnalytics from '@/components/admin/BatchAnalytics';
import CareerMilestones from '@/components/admin/CareerMilestones';
import SemesterReport from '@/components/admin/SemesterReport';
import NonEngagedAlerts from '@/components/admin/NonEngagedAlerts';
import {
  CreditCard, Users, CalendarCheck, UserCheck, Clock, GraduationCap,
  Search, Plus, Check, X, AlertTriangle, Settings, Banknote, Star,
  Building, LogOut, LayoutDashboard, BookOpen, MessageSquare, Wallet, UserCog,
  FileSpreadsheet, Bell, Shield, Calendar, Edit2, Trash2, Mail
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

// ─── Dummy Data ───────────────────────────────────────────────

const STUDENTS = [
  { id: 'VT2024001', name: 'Arjun Mehta', branch: 'CSE', year: '3rd', allocation: 4, used: 3, remaining: 1 },
  { id: 'VT2024002', name: 'Priya Sharma', branch: 'ECE', year: '2nd', allocation: 4, used: 1, remaining: 3 },
  { id: 'VT2024003', name: 'Rahul Verma', branch: 'ME', year: '4th', allocation: 4, used: 4, remaining: 0 },
  { id: 'VT2024004', name: 'Sneha Iyer', branch: 'CSE', year: '3rd', allocation: 4, used: 2, remaining: 2 },
  { id: 'VT2024005', name: 'Karan Singh', branch: 'EEE', year: '2nd', allocation: 4, used: 0, remaining: 4 },
  { id: 'VT2024006', name: 'Divya Nair', branch: 'IT', year: '3rd', allocation: 4, used: 4, remaining: 0 },
  { id: 'VT2024007', name: 'Aditya Joshi', branch: 'CSE', year: '4th', allocation: 4, used: 3, remaining: 1 },
  { id: 'VT2024008', name: 'Meera Patel', branch: 'ECE', year: '2nd', allocation: 4, used: 1, remaining: 3 },
];

const SESSIONS = [
  { studentId: 'VT2024001', studentName: 'Arjun Mehta', alumniName: 'Vikram Rao', date: '2026-03-10 10:00', status: 'Upcoming' as const, amount: 299 },
  { studentId: 'VT2024002', studentName: 'Priya Sharma', alumniName: 'Anita Desai', date: '2026-03-08 14:00', status: 'Completed' as const, amount: 499 },
  { studentId: 'VT2024003', studentName: 'Rahul Verma', alumniName: 'Suresh Kumar', date: '2026-03-07 11:00', status: 'Completed' as const, amount: 299 },
  { studentId: 'VT2024004', studentName: 'Sneha Iyer', mentorName: 'Vikram Rao', date: '2026-03-06 16:00', status: 'Cancelled' as const, amount: 0 },
  { studentId: 'VT2024001', studentName: 'Arjun Mehta', mentorName: 'Ritu Kapoor', date: '2026-03-05 09:00', status: 'Completed' as const, amount: 399 },
  { studentId: 'VT2024006', studentName: 'Divya Nair', mentorName: 'Anita Desai', date: '2026-03-12 15:00', status: 'Upcoming' as const, amount: 499 },
  { studentId: 'VT2024007', studentName: 'Aditya Joshi', mentorName: 'Suresh Kumar', date: '2026-03-04 13:00', status: 'Completed' as const, amount: 299 },
];

const EXTRA_REQUESTS = [
  { id: 1, studentId: 'VT2024003', name: 'Rahul Verma', used: 4, reason: 'I need guidance on placement preparation for the upcoming campus drive happening next month. I have interviews lined up with 3 companies but I am not confident about system design rounds and need a mentor who has been through the same process recently. My mock interviews have not gone well and I feel I need at least 2 more structured sessions to improve.', importance: 'Securing a placement is critical for my family\'s financial situation. I am the first person in my family to attend a university and getting placed in a good company would change everything for us. I cannot afford to miss this opportunity.', status: 'pending' as const },
  { id: 2, studentId: 'VT2024006', name: 'Divya Nair', used: 4, reason: 'Want to explore career options in AI/ML before choosing electives. I have been reading research papers but I need someone from the industry to help me understand what roles actually exist and what skills companies are hiring for right now.', importance: 'This decision will define my specialization and future career path. Choosing the wrong electives could set me back by a full year.', status: 'pending' as const },
  { id: 3, studentId: 'VT2024001', name: 'Arjun Mehta', used: 3, reason: 'I am working on a startup idea in the ed-tech space and need mentor advice on choosing the right tech stack, understanding cloud deployment costs, and validating the product idea with someone who has industry experience. I have already built a basic prototype but need guidance on scaling it and whether to use microservices or a monolithic architecture. Additionally I want to understand how to pitch this to investors and what metrics they look for in early stage startups.', importance: 'I want to launch before graduation and need experienced guidance. This startup is not just a college project for me, it is my career plan.', status: 'pending' as const },
  { id: 4, studentId: 'VT2024009', name: 'Sneha Iyer', used: 4, reason: 'Preparing for GATE exam alongside college and need a mentor who cleared GATE to help me with a realistic study plan and subject prioritization.', importance: 'GATE score will decide if I get into IIT for my masters. This is the only shot I have this year and I need structured mentorship to make it count. My family has invested a lot in my education and I do not want to let them down by not being prepared enough.', status: 'pending' as const },
  { id: 5, studentId: 'VT2024012', name: 'Karthik Reddy', used: 3, reason: 'Need help with open source contributions.', importance: 'Want to build my resume for GSoC applications.', status: 'pending' as const },
];

const MENTORS = [
  { name: 'Vikram Rao', alumniYear: '2018', branch: 'CSE', company: 'Google', role: 'Senior SWE', price: 299, sessions: 24, rating: 4.8 },
  { name: 'Anita Desai', alumniYear: '2016', branch: 'ECE', company: 'Microsoft', role: 'Product Manager', price: 499, sessions: 18, rating: 4.9 },
  { name: 'Suresh Kumar', alumniYear: '2019', branch: 'ME', company: 'Tesla', role: 'Design Engineer', price: 299, sessions: 12, rating: 4.6 },
  { name: 'Ritu Kapoor', alumniYear: '2017', branch: 'CSE', company: 'Amazon', role: 'Tech Lead', price: 399, sessions: 31, rating: 4.7 },
  { name: 'Amit Patel', alumniYear: '2020', branch: 'IT', company: 'Flipkart', role: 'Backend Dev', price: 199, sessions: 8, rating: 4.5 },
  { name: 'Neha Gupta', alumniYear: '2015', branch: 'EEE', company: 'Siemens', role: 'R&D Lead', price: 349, sessions: 15, rating: 4.8 },
];

const TRANSACTIONS = [
  { date: '2026-03-08', studentId: 'VT2024002', mentor: 'Anita Desai', amount: 2500 },
  { date: '2026-03-07', studentId: 'VT2024003', mentor: 'Suresh Kumar', amount: 299 },
  { date: '2026-03-05', studentId: 'VT2024001', mentor: 'Ritu Kapoor', amount: 1499 },
  { date: '2026-03-04', studentId: 'VT2024007', mentor: 'Suresh Kumar', amount: 799 },
  { date: '2026-03-02', studentId: 'VT2024004', mentor: 'Vikram Rao', amount: 299 },
  { date: '2026-03-01', studentId: 'VT2024006', mentor: 'Anita Desai', amount: 2500 },
  { date: '2026-02-28', studentId: 'VT2024005', mentor: 'Ritu Kapoor', amount: 1299 },
  { date: '2026-02-26', studentId: 'VT2024001', mentor: 'Vikram Rao', amount: 599 },
];

// ─── Component ────────────────────────────────────────────────

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // Check dummy auth
  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  // ─── State ────────────────────────────────────────────────
  const [students, setStudents] = useState(STUDENTS);
  const [requests, setRequests] = useState(EXTRA_REQUESTS);
  const [studentSearch, setStudentSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [sessionDateFilter, setSessionDateFilter] = useState('');
  const [sessionStatusFilter, setSessionStatusFilter] = useState('all');
  const [sessionStudentFilter, setSessionStudentFilter] = useState('');
  const [sessionMentorFilter, setSessionMentorFilter] = useState('');

  // Virtual card state
  const [totalCredits, setTotalCredits] = useState(50000);
  const [creditsUsed] = useState(12890);
  const creditsRemaining = totalCredits - creditsUsed;
  const [alertThreshold, setAlertThreshold] = useState(10000);
  const [reloadDialogOpen, setReloadDialogOpen] = useState(false);
  const [reloadAmount, setReloadAmount] = useState('');

  // Settings state
  const [settingsThreshold, setSettingsThreshold] = useState(10000);
  const [allocationRules, setAllocationRules] = useState([
    { year: '1st Year', branch: 'All Branches', sessions: 2 },
    { year: '2nd Year', branch: 'All Branches', sessions: 3 },
    { year: '3rd Year', branch: 'All Branches', sessions: 4 },
    { year: '4th Year', branch: 'All Branches', sessions: 5 },
  ]);
  const [editRuleDialog, setEditRuleDialog] = useState<{ open: boolean; index: number | null }>({ open: false, index: null });
  const [editRuleForm, setEditRuleForm] = useState({ year: '', branch: '', sessions: 4 });
  const [bookingWindow, setBookingWindow] = useState(7); // days in advance
  const [cancellationHours, setCancellationHours] = useState(24);
  const [maxSessionDuration, setMaxSessionDuration] = useState(60); // minutes
  const [autoResetEnabled, setAutoResetEnabled] = useState(true);
  const [semesterStartDate, setSemesterStartDate] = useState('2026-07-01');
  const [notifyLowBalance, setNotifyLowBalance] = useState(true);
  const [notifyNewRequest, setNotifyNewRequest] = useState(true);
  const [notifySessionComplete, setNotifySessionComplete] = useState(false);
  const [notifyStudentOnboard, setNotifyStudentOnboard] = useState(true);
  const [adminEmail, setAdminEmail] = useState('admin@veltech.edu.in');
  const [universityName, setUniversityName] = useState('Vel Tech University');
  const [confirmResetDialog, setConfirmResetDialog] = useState(false);
  // Add sessions dialog
  const [addSessionDialog, setAddSessionDialog] = useState<{ open: boolean; student: typeof STUDENTS[0] | null }>({ open: false, student: null });
  const [extraSessions, setExtraSessions] = useState('');

  // Rejection dialog state
  const [rejectDialog, setRejectDialog] = useState<{ open: boolean; requestId: number | null; studentName: string }>({ open: false, requestId: null, studentName: '' });
  const [rejectionReason, setRejectionReason] = useState('');

  // Filtered students
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.id.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesBranch = branchFilter === 'all' || s.branch === branchFilter;
    const matchesYear = yearFilter === 'all' || s.year === yearFilter;
    return matchesSearch && matchesBranch && matchesYear;
  });

  // Filtered sessions
  const filteredSessions = SESSIONS.filter(s => {
    const matchesDate = !sessionDateFilter || s.date.startsWith(sessionDateFilter);
    const matchesStatus = sessionStatusFilter === 'all' || s.status === sessionStatusFilter;
    const matchesStudent = !sessionStudentFilter || s.studentName.toLowerCase().includes(sessionStudentFilter.toLowerCase());
    const matchesMentor = !sessionMentorFilter || s.mentorName.toLowerCase().includes(sessionMentorFilter.toLowerCase());
    return matchesDate && matchesStatus && matchesStudent && matchesMentor;
  });

  const handleAddSessions = () => {
    if (!addSessionDialog.student || !extraSessions) return;
    const num = parseInt(extraSessions);
    if (isNaN(num) || num <= 0) return;
    setStudents(prev => prev.map(s =>
      s.id === addSessionDialog.student!.id
        ? { ...s, allocation: s.allocation + num, remaining: s.remaining + num }
        : s
    ));
    toast({ title: 'Sessions Added', description: `${num} extra sessions added to ${addSessionDialog.student.name}'s account.` });
    setAddSessionDialog({ open: false, student: null });
    setExtraSessions('');
  };

  const handleRequestAction = (id: number, action: 'approve' | 'reject') => {
    if (action === 'approve') {
      const req = requests.find(r => r.id === id);
      if (req) {
        setStudents(prev => prev.map(s =>
          s.id === req.studentId ? { ...s, allocation: s.allocation + 2, remaining: s.remaining + 2 } : s
        ));
      }
      setRequests(prev => prev.filter(r => r.id !== id));
      toast({ title: 'Request Approved', description: '2 extra sessions added to the student\'s account.' });
    }
  };

  const handleRejectWithReason = () => {
    if (!rejectDialog.requestId || !rejectionReason.trim()) return;
    setRequests(prev => prev.filter(r => r.id !== rejectDialog.requestId));
    toast({ title: 'Request Rejected', description: `Rejection reason sent to ${rejectDialog.studentName}.` });
    setRejectDialog({ open: false, requestId: null, studentName: '' });
    setRejectionReason('');
  };

  const handleReload = () => {
    const amount = parseInt(reloadAmount);
    if (isNaN(amount) || amount <= 0) return;
    setTotalCredits(prev => prev + amount);
    toast({ title: 'Credits Reloaded', description: `₹${amount.toLocaleString()} added to the Virtual Guidance Card.` });
    setReloadDialogOpen(false);
    setReloadAmount('');
  };

  const handleSaveSettings = () => {
    setAlertThreshold(settingsThreshold);
    toast({ title: 'Settings Saved', description: 'All settings have been updated successfully.' });
  };

  const handleSemesterReset = () => {
    setStudents(prev => prev.map(s => ({ ...s, used: 0, remaining: s.allocation })));
    setConfirmResetDialog(false);
    toast({ title: 'Semester Reset', description: 'All student session counts have been reset.' });
  };

  const handleAddRule = () => {
    setAllocationRules(prev => [...prev, { year: editRuleForm.year || '1st Year', branch: editRuleForm.branch || 'All Branches', sessions: editRuleForm.sessions }]);
    setEditRuleDialog({ open: false, index: null });
    toast({ title: 'Rule Added', description: 'New allocation rule has been created.' });
  };

  const handleUpdateRule = () => {
    if (editRuleDialog.index === null) return;
    setAllocationRules(prev => prev.map((r, i) => i === editRuleDialog.index ? { year: editRuleForm.year, branch: editRuleForm.branch, sessions: editRuleForm.sessions } : r));
    setEditRuleDialog({ open: false, index: null });
    toast({ title: 'Rule Updated', description: 'Allocation rule has been updated.' });
  };

  const handleDeleteRule = (index: number) => {
    setAllocationRules(prev => prev.filter((_, i) => i !== index));
    toast({ title: 'Rule Removed', description: 'Allocation rule has been deleted.' });
  };

  const branches = [...new Set(students.map(s => s.branch))];
  const years = [...new Set(students.map(s => s.year))];

  // Sub-tab states
  const [studentSubTab, setStudentSubTab] = useState('records');
  const [analyticsSubTab, setAnalyticsSubTab] = useState('batch');
  const [mentorSubTab, setMentorSubTab] = useState('directory');

  const sideNavItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'sessions', label: 'Sessions', icon: CalendarCheck },
    { id: 'analytics', label: 'Analytics', icon: Star },
    { id: 'requests', label: 'Requests', icon: MessageSquare },
    { id: 'virtual-card', label: 'Virtual Card', icon: CreditCard },
    { id: 'mentors', label: 'Mentors', icon: GraduationCap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <Layout showNav={false}>
      <div className="min-h-screen flex bg-muted/30">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-background p-4 gap-1">
          <div className="flex items-center gap-2.5 px-3 py-4 mb-4">
            <img src={velTechLogo} alt="Vel Tech University" className="h-9 w-9 rounded-lg object-contain" />
            <div>
              <p className="font-semibold text-sm">University Admin</p>
              <p className="text-xs text-muted-foreground">Vel Tech University</p>
            </div>
          </div>
          {sideNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === item.id ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.id === 'requests' && requests.length > 0 && (
                <Badge variant="destructive" className="ml-auto text-[10px] px-1.5 py-0">{requests.length}</Badge>
              )}
            </button>
          ))}
          <div className="mt-auto pt-4 border-t">
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 w-full">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile tabs */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t flex overflow-x-auto">
          {sideNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 min-w-[64px] flex flex-col items-center gap-1 py-2 text-[10px] ${activeTab === item.id ? 'text-primary font-medium' : 'text-muted-foreground'}`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 overflow-auto">
          {/* ── Overview ── */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                <p className="text-muted-foreground text-sm mt-1">University alumni guidance program at a glance</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <SummaryCard icon={Banknote} label="Total Credits Loaded" value={`₹${totalCredits.toLocaleString()}`} />
                <SummaryCard icon={Wallet} label="Credits Remaining" value={`₹${creditsRemaining.toLocaleString()}`} alert={creditsRemaining < alertThreshold} />
                <SummaryCard icon={CalendarCheck} label="Sessions This Month" value={SESSIONS.filter(s => s.status !== 'Cancelled').length.toString()} />
                <SummaryCard icon={UserCheck} label="Students Booked" value={new Set(SESSIONS.map(s => s.studentId)).size.toString()} />
                <SummaryCard icon={Clock} label="Pending Requests" value={requests.length.toString()} highlight />
                <SummaryCard icon={GraduationCap} label="Active Mentors" value={MENTORS.length.toString()} />
              </div>
              {creditsRemaining < alertThreshold && (
                <div className="flex items-center gap-3 p-4 rounded-lg border border-warning bg-warning/10">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <div>
                    <p className="text-sm font-medium">Low Balance Alert</p>
                    <p className="text-xs text-muted-foreground">Virtual Guidance Card balance is below ₹{alertThreshold.toLocaleString()}. Consider reloading.</p>
                  </div>
                  <Button size="sm" className="ml-auto" onClick={() => { setActiveTab('virtual-card'); setReloadDialogOpen(true); }}>Reload</Button>
                </div>
              )}
            </div>
          )}

          {/* ── Student Management (Tabbed) ── */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">Student Management</h1>
                <p className="text-muted-foreground text-sm mt-1">Manage records, imports, journey tracking & engagement</p>
              </div>
              <Tabs value={studentSubTab} onValueChange={setStudentSubTab}>
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="records" className="gap-1.5"><Users className="h-3.5 w-3.5" /> Records</TabsTrigger>
                  <TabsTrigger value="import" className="gap-1.5"><FileSpreadsheet className="h-3.5 w-3.5" /> Import</TabsTrigger>
                  <TabsTrigger value="journey" className="gap-1.5"><BookOpen className="h-3.5 w-3.5" /> Journey</TabsTrigger>
                  <TabsTrigger value="non-engaged" className="gap-1.5"><Bell className="h-3.5 w-3.5" /> Non-Engaged</TabsTrigger>
                </TabsList>
                <TabsContent value="records">
                  <div className="space-y-4 mt-2">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by name or ID..." className="pl-9" value={studentSearch} onChange={e => setStudentSearch(e.target.value)} />
                      </div>
                      <Select value={branchFilter} onValueChange={setBranchFilter}>
                        <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Branch" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Branches</SelectItem>
                          {branches.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Select value={yearFilter} onValueChange={setYearFilter}>
                        <SelectTrigger className="w-full sm:w-32"><SelectValue placeholder="Year" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Years</SelectItem>
                          {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>College ID</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead className="hidden sm:table-cell">Branch</TableHead>
                              <TableHead className="hidden sm:table-cell">Year</TableHead>
                              <TableHead className="text-center">Allocation</TableHead>
                              <TableHead className="text-center">Used</TableHead>
                              <TableHead className="text-center">Remaining</TableHead>
                              <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredStudents.map(s => (
                              <TableRow key={s.id}>
                                <TableCell className="font-mono text-xs">{s.id}</TableCell>
                                <TableCell className="font-medium">{s.name}</TableCell>
                                <TableCell className="hidden sm:table-cell">{s.branch}</TableCell>
                                <TableCell className="hidden sm:table-cell">{s.year}</TableCell>
                                <TableCell className="text-center">{s.allocation}</TableCell>
                                <TableCell className="text-center">{s.used}</TableCell>
                                <TableCell className="text-center">
                                  <Badge variant={s.remaining === 0 ? 'destructive' : 'secondary'}>{s.remaining}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button size="sm" variant="outline" onClick={() => { setAddSessionDialog({ open: true, student: s }); setExtraSessions(''); }}>
                                    <Plus className="h-3 w-3 mr-1" /> Add
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="import">
                  <StudentImport />
                </TabsContent>
                <TabsContent value="journey">
                  <StudentJourneyTracker />
                </TabsContent>
                <TabsContent value="non-engaged">
                  <NonEngagedAlerts />
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* ── Session Tracking ── */}
          {activeTab === 'sessions' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">Session Tracking</h1>
                <p className="text-muted-foreground text-sm mt-1">Monitor all sessions booked on the platform</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input type="date" className="w-full sm:w-44" value={sessionDateFilter} onChange={e => setSessionDateFilter(e.target.value)} />
                <Input placeholder="Student name..." className="w-full sm:w-44" value={sessionStudentFilter} onChange={e => setSessionStudentFilter(e.target.value)} />
                <Input placeholder="Mentor name..." className="w-full sm:w-44" value={sessionMentorFilter} onChange={e => setSessionMentorFilter(e.target.value)} />
                <Select value={sessionStatusFilter} onValueChange={setSessionStatusFilter}>
                  <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Mentor</TableHead>
                        <TableHead className="hidden sm:table-cell">Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSessions.map((s, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-mono text-xs">{s.studentId}</TableCell>
                          <TableCell className="font-medium">{s.studentName}</TableCell>
                          <TableCell>{s.mentorName}</TableCell>
                          <TableCell className="hidden sm:table-cell text-xs">{s.date}</TableCell>
                          <TableCell>
                            <Badge variant={s.status === 'Completed' ? 'secondary' : s.status === 'Cancelled' ? 'destructive' : 'default'}>
                              {s.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">₹{s.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── Analytics (Tabbed) ── */}
          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">Analytics & Reports</h1>
                <p className="text-muted-foreground text-sm mt-1">Batch insights, career milestones & semester reports</p>
              </div>
              <Tabs value={analyticsSubTab} onValueChange={setAnalyticsSubTab}>
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="batch" className="gap-1.5"><Star className="h-3.5 w-3.5" /> Batch Analytics</TabsTrigger>
                  <TabsTrigger value="milestones" className="gap-1.5"><Shield className="h-3.5 w-3.5" /> Career Milestones</TabsTrigger>
                  <TabsTrigger value="semester" className="gap-1.5"><FileSpreadsheet className="h-3.5 w-3.5" /> Semester Report</TabsTrigger>
                </TabsList>
                <TabsContent value="batch">
                  <BatchAnalytics />
                </TabsContent>
                <TabsContent value="milestones">
                  <CareerMilestones />
                </TabsContent>
                <TabsContent value="semester">
                  <SemesterReport />
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* ── Extra Session Requests ── */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">Extra Session Requests</h1>
                <p className="text-muted-foreground text-sm mt-1">Review and approve student requests for additional sessions</p>
              </div>
              {requests.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Check className="mx-auto h-10 w-10 text-success mb-3" />
                    <p className="text-muted-foreground">No pending requests at this time.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {requests.map(req => (
                    <Card key={req.id}>
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">{req.studentId}</span>
                              <span className="font-semibold">{req.name}</span>
                              <Badge variant="secondary">{req.used} sessions used</Badge>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-3">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Reason for Additional Sessions</p>
                              <p className="text-sm leading-relaxed">{req.reason}</p>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-3">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Career Importance</p>
                              <p className="text-sm leading-relaxed">{req.importance}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 sm:flex-col">
                            <Button size="sm" onClick={() => handleRequestAction(req.id, 'approve')} className="gap-1">
                              <Check className="h-3 w-3" /> Approve
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => { setRejectDialog({ open: true, requestId: req.id, studentName: req.name }); setRejectionReason(''); }} className="gap-1 text-destructive hover:text-destructive">
                              <X className="h-3 w-3" /> Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Virtual Guidance Card ── */}
          {activeTab === 'virtual-card' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">Virtual Guidance Card</h1>
                <p className="text-muted-foreground text-sm mt-1">Manage university's Student Alumni Guidance Virtual Card</p>
              </div>
              {creditsRemaining < alertThreshold && (
                <div className="flex items-center gap-3 p-4 rounded-lg border border-warning bg-warning/10">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Low Balance Alert</p>
                    <p className="text-xs text-muted-foreground">Balance is below the threshold of ₹{alertThreshold.toLocaleString()}</p>
                  </div>
                  <Button size="sm" onClick={() => setReloadDialogOpen(true)}>Reload Now</Button>
                </div>
              )}
              {/* Card visual – debit card style */}
              <div className="w-full max-w-md mx-auto" style={{ aspectRatio: '1.586' }}>
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--primary)/0.85)] to-[hsl(var(--primary)/0.6)] text-primary-foreground p-6 flex flex-col justify-between shadow-xl overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary-foreground/[0.06] rounded-full -mr-12 -mt-12" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-foreground/[0.04] rounded-full -ml-10 -mb-10" />
                  <div className="absolute top-1/2 right-8 w-20 h-20 bg-primary-foreground/[0.03] rounded-full" />

                  {/* Top row */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 mb-0.5">University Card</p>
                      <p className="text-sm font-semibold">Student Alumni Guidance</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-70">
                      <div className="w-7 h-7 rounded-full bg-primary-foreground/20" />
                      <div className="w-7 h-7 rounded-full bg-primary-foreground/10 -ml-3" />
                    </div>
                  </div>

                  {/* Card number */}
                  <div className="relative z-10">
                    <p className="font-mono text-xl tracking-[0.25em] font-bold">4520 •••• •••• 8834</p>
                  </div>

                  {/* Bottom row */}
                  <div className="relative z-10 flex items-end justify-between">
                    <div className="flex items-center gap-5">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider opacity-50">Total Loaded</p>
                        <p className="text-sm font-bold">₹{totalCredits.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider opacity-50">Used</p>
                        <p className="text-sm font-bold">₹{creditsUsed.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider opacity-50">Remaining</p>
                        <p className="text-sm font-bold">₹{creditsRemaining.toLocaleString()}</p>
                      </div>
                    </div>
                    <CreditCard className="h-6 w-6 opacity-40" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-3">
                <Button size="sm" onClick={() => setReloadDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" /> Reload Credits
                </Button>
              </div>

              {/* Transaction History */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Transaction History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-72 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Student</TableHead>
                          <TableHead>Mentor</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {TRANSACTIONS.map((t, i) => (
                          <TableRow key={i}>
                            <TableCell className="text-xs">{t.date}</TableCell>
                            <TableCell className="font-mono text-xs">{t.studentId}</TableCell>
                            <TableCell className="text-sm">{t.mentor}</TableCell>
                            <TableCell className="text-right text-sm text-destructive">-₹{t.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── Mentor / Alumni Management (Tabbed) ── */}
          {activeTab === 'mentors' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">Alumni & Mentor Management</h1>
                <p className="text-muted-foreground text-sm mt-1">Directory, performance & session activity of mentors</p>
              </div>
              <Tabs value={mentorSubTab} onValueChange={setMentorSubTab}>
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="directory" className="gap-1.5"><GraduationCap className="h-3.5 w-3.5" /> Directory</TabsTrigger>
                  <TabsTrigger value="performance" className="gap-1.5"><Star className="h-3.5 w-3.5" /> Performance</TabsTrigger>
                </TabsList>
                <TabsContent value="directory">
                  <Card className="mt-2">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden sm:table-cell">Alumni Year</TableHead>
                            <TableHead className="hidden sm:table-cell">Branch</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead className="hidden md:table-cell">Role</TableHead>
                            <TableHead className="text-center">Price</TableHead>
                            <TableHead className="text-center hidden sm:table-cell">Sessions</TableHead>
                            <TableHead className="text-center">Rating</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {MENTORS.map((m, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-medium">{m.name}</TableCell>
                              <TableCell className="hidden sm:table-cell">{m.alumniYear}</TableCell>
                              <TableCell className="hidden sm:table-cell">{m.branch}</TableCell>
                              <TableCell>{m.company}</TableCell>
                              <TableCell className="hidden md:table-cell">{m.role}</TableCell>
                              <TableCell className="text-center">₹{m.price}</TableCell>
                              <TableCell className="text-center hidden sm:table-cell">{m.sessions}</TableCell>
                              <TableCell className="text-center">
                                <span className="inline-flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-warning text-warning" />
                                  {m.rating}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="performance">
                  <div className="mt-2 grid gap-4">
                    {MENTORS.map((m, i) => (
                      <Card key={i}>
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{m.name}</p>
                            <p className="text-xs text-muted-foreground">{m.company} · {m.role}</p>
                          </div>
                          <div className="flex items-center gap-4 text-center">
                            <div>
                              <p className="text-lg font-bold">{m.sessions}</p>
                              <p className="text-[10px] text-muted-foreground">Sessions</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" />{m.rating}</p>
                              <p className="text-[10px] text-muted-foreground">Rating</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold">₹{m.price}</p>
                              <p className="text-[10px] text-muted-foreground">Per Session</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* ── Settings ── */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground text-sm mt-1">Configure allocation rules, notifications, policies & academic calendar</p>
              </div>

              {/* ── Session Allocation Rules (Year/Branch wise) ── */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Session Allocation Rules</CardTitle>
                    <CardDescription>Define session limits per year and branch — students get allocated based on matching rules</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => { setEditRuleForm({ year: '1st Year', branch: 'All Branches', sessions: 4 }); setEditRuleDialog({ open: true, index: null }); }}>
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Rule
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead>Branch</TableHead>
                        <TableHead className="text-center">Sessions / Semester</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allocationRules.map((rule, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{rule.year}</TableCell>
                          <TableCell><Badge variant="secondary">{rule.branch}</Badge></TableCell>
                          <TableCell className="text-center font-semibold">{rule.sessions}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => { setEditRuleForm({ year: rule.year, branch: rule.branch, sessions: rule.sessions }); setEditRuleDialog({ open: true, index: i }); }}>
                                <Edit2 className="h-3.5 w-3.5" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" onClick={() => handleDeleteRule(i)}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {allocationRules.length === 0 && (
                        <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No allocation rules configured. Add a rule to get started.</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* ── Booking & Session Policies ── */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2"><CalendarCheck className="h-4 w-4 text-primary" /> Booking & Session Policies</CardTitle>
                    <CardDescription>Control how students book and cancel mentorship sessions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Advance Booking Window (days)</Label>
                      <p className="text-xs text-muted-foreground">How many days in advance students can book sessions</p>
                      <Select value={String(bookingWindow)} onValueChange={v => setBookingWindow(Number(v))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[3, 5, 7, 14, 21, 30].map(d => <SelectItem key={d} value={String(d)}>{d} days</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Cancellation Policy (hours before)</Label>
                      <p className="text-xs text-muted-foreground">Minimum hours before session start for free cancellation</p>
                      <Select value={String(cancellationHours)} onValueChange={v => setCancellationHours(Number(v))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[6, 12, 24, 48].map(h => <SelectItem key={h} value={String(h)}>{h} hours</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Max Session Duration</Label>
                      <Select value={String(maxSessionDuration)} onValueChange={v => setMaxSessionDuration(Number(v))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[30, 45, 60, 90].map(m => <SelectItem key={m} value={String(m)}>{m} minutes</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* ── Notification Preferences ── */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Notification Preferences</CardTitle>
                    <CardDescription>Choose which events trigger admin notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div><p className="text-sm font-medium">Low Balance Alert</p><p className="text-xs text-muted-foreground">When virtual card credits fall below threshold</p></div>
                      <Switch checked={notifyLowBalance} onCheckedChange={setNotifyLowBalance} />
                    </div>
                    {notifyLowBalance && (
                      <div className="space-y-1 pl-1 border-l-2 border-primary/20 ml-1">
                        <Label className="text-xs">Alert Threshold (₹)</Label>
                        <Input type="number" min={1000} step={1000} value={settingsThreshold} onChange={e => setSettingsThreshold(Number(e.target.value))} className="h-8 text-sm" />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div><p className="text-sm font-medium">New Extra Session Request</p><p className="text-xs text-muted-foreground">When a student submits an extra session request</p></div>
                      <Switch checked={notifyNewRequest} onCheckedChange={setNotifyNewRequest} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div><p className="text-sm font-medium">Session Completed</p><p className="text-xs text-muted-foreground">After each mentorship session is completed</p></div>
                      <Switch checked={notifySessionComplete} onCheckedChange={setNotifySessionComplete} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div><p className="text-sm font-medium">Student Onboarded</p><p className="text-xs text-muted-foreground">When a new student registers via the platform</p></div>
                      <Switch checked={notifyStudentOnboard} onCheckedChange={setNotifyStudentOnboard} />
                    </div>
                  </CardContent>
                </Card>

                {/* ── Academic Calendar ── */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Academic Calendar</CardTitle>
                    <CardDescription>Manage semester cycles and automatic resets</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Next Semester Start Date</Label>
                      <Input type="date" value={semesterStartDate} onChange={e => setSemesterStartDate(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div><p className="text-sm font-medium">Auto-Reset at Semester Start</p><p className="text-xs text-muted-foreground">Automatically reset session counts when new semester begins</p></div>
                      <Switch checked={autoResetEnabled} onCheckedChange={setAutoResetEnabled} />
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-1">Manual Reset</p>
                      <p className="text-xs text-muted-foreground mb-3">Reset all session counts immediately. This action cannot be undone.</p>
                      <Button variant="destructive" size="sm" onClick={() => setConfirmResetDialog(true)} className="w-full">
                        <AlertTriangle className="h-3.5 w-3.5 mr-1" /> Reset All Session Counts
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* ── University Profile & Admin ── */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2"><Building className="h-4 w-4 text-primary" /> University Profile</CardTitle>
                    <CardDescription>University details and admin contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>University Name</Label>
                      <Input value={universityName} onChange={e => setUniversityName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Admin Email</Label>
                      <Input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>University Logo</Label>
                      <div className="flex items-center gap-3">
                        <img src={velTechLogo} alt="University Logo" className="h-10 w-10 rounded-lg object-contain border" />
                        <Button variant="outline" size="sm">Change Logo</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Save All */}
              <div className="flex justify-end">
                <Button size="lg" onClick={handleSaveSettings} className="px-8">
                  <Check className="h-4 w-4 mr-2" /> Save All Settings
                </Button>
              </div>
            </div>
          )}

          {/* Confirm Reset Dialog */}
          <Dialog open={confirmResetDialog} onOpenChange={setConfirmResetDialog}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-destructive" /> Confirm Semester Reset</DialogTitle>
                <DialogDescription>This will reset all student session usage to 0. This action cannot be undone.</DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setConfirmResetDialog(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleSemesterReset}>Yes, Reset All</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add/Edit Rule Dialog */}
          <Dialog open={editRuleDialog.open} onOpenChange={(open) => { if (!open) setEditRuleDialog({ open: false, index: null }); }}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>{editRuleDialog.index !== null ? 'Edit' : 'Add'} Allocation Rule</DialogTitle>
                <DialogDescription>Define session limits for a specific year and branch combination</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Select value={editRuleForm.year} onValueChange={v => setEditRuleForm(f => ({ ...f, year: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Branch</Label>
                  <Select value={editRuleForm.branch} onValueChange={v => setEditRuleForm(f => ({ ...f, branch: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['All Branches', 'CSE', 'ECE', 'EEE', 'ME', 'IT', 'Civil', 'Chemical'].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Sessions Per Semester</Label>
                  <Input type="number" min={1} max={20} value={editRuleForm.sessions} onChange={e => setEditRuleForm(f => ({ ...f, sessions: Number(e.target.value) }))} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditRuleDialog({ open: false, index: null })}>Cancel</Button>
                <Button onClick={editRuleDialog.index !== null ? handleUpdateRule : handleAddRule}>
                  {editRuleDialog.index !== null ? 'Update' : 'Add'} Rule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>

      {/* Add Sessions Dialog */}
      <Dialog open={addSessionDialog.open} onOpenChange={(open) => setAddSessionDialog({ open, student: open ? addSessionDialog.student : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Extra Sessions</DialogTitle>
            <DialogDescription>Add additional sessions to {addSessionDialog.student?.name}'s account ({addSessionDialog.student?.id})</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Label>Number of Extra Sessions</Label>
            <Input type="number" min={1} max={10} value={extraSessions} onChange={e => setExtraSessions(e.target.value)} placeholder="e.g., 2" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddSessionDialog({ open: false, student: null })}>Cancel</Button>
            <Button onClick={handleAddSessions}>Add Sessions</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reload Dialog */}
      <Dialog open={reloadDialogOpen} onOpenChange={setReloadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reload Virtual Guidance Card</DialogTitle>
            <DialogDescription>Add credits to the university's Virtual Guidance Card</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Label>Reload Amount (₹)</Label>
            <Input type="number" min={1000} step={1000} value={reloadAmount} onChange={e => setReloadAmount(e.target.value)} placeholder="e.g., 25000" />
            <div className="flex gap-2">
              {[5000, 10000, 25000, 50000].map(amt => (
                <Button key={amt} size="sm" variant="outline" onClick={() => setReloadAmount(String(amt))}>₹{(amt / 1000)}K</Button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReloadDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleReload}>Reload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Reason Dialog */}
      <Dialog open={rejectDialog.open} onOpenChange={(open) => { if (!open) { setRejectDialog({ open: false, requestId: null, studentName: '' }); setRejectionReason(''); } }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="h-4 w-4 text-destructive" />
              </div>
              Reject Request
            </DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting <span className="font-medium text-foreground">{rejectDialog.studentName}</span>'s extra session request. The student will be notified with this reason.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Label>Reason for Rejection <span className="text-destructive">*</span></Label>
            <textarea
              className="flex min-h-[120px] w-full rounded-lg border border-input bg-muted/30 px-3 py-3 text-sm leading-relaxed ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              placeholder="e.g., You have already used all allocated sessions this semester. Please wait for the next cycle or contact the department coordinator for special consideration."
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {[
                'Sessions quota exhausted for this semester',
                'Reason not aligned with program objectives',
                'Insufficient academic standing',
                'Duplicate request already processed',
              ].map(reason => (
                <button
                  key={reason}
                  onClick={() => setRejectionReason(reason)}
                  className="text-xs px-2.5 py-1.5 rounded-md border border-border bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setRejectDialog({ open: false, requestId: null, studentName: '' }); setRejectionReason(''); }}>Cancel</Button>
            <Button variant="destructive" onClick={handleRejectWithReason} disabled={!rejectionReason.trim()}>
              <X className="h-3.5 w-3.5 mr-1" /> Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

// ─── Sub-components ───────────────────────────────────────────


const SummaryCard = ({ icon: Icon, label, value, alert, highlight }: { icon: any; label: string; value: string; alert?: boolean; highlight?: boolean }) => (
  <Card className={alert ? 'border-warning' : ''}>
    <CardContent className="p-4 flex items-center gap-3">
      <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${highlight ? 'bg-destructive/10' : 'bg-primary/10'}`}>
        <Icon className={`h-5 w-5 ${highlight ? 'text-destructive' : 'text-primary'}`} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

export default AdminDashboard;
