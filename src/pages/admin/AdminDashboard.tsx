import { useState, useEffect } from 'react';
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
import {
  CreditCard, Users, CalendarCheck, UserCheck, Clock, GraduationCap,
  Search, Plus, Check, X, AlertTriangle, Settings, Banknote, Star,
  Building, LogOut, LayoutDashboard, BookOpen, MessageSquare, Wallet, UserCog
} from 'lucide-react';

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
  { studentId: 'VT2024001', studentName: 'Arjun Mehta', mentorName: 'Vikram Rao', date: '2026-03-10 10:00', status: 'Upcoming' as const, amount: 299 },
  { studentId: 'VT2024002', studentName: 'Priya Sharma', mentorName: 'Anita Desai', date: '2026-03-08 14:00', status: 'Completed' as const, amount: 499 },
  { studentId: 'VT2024003', studentName: 'Rahul Verma', mentorName: 'Suresh Kumar', date: '2026-03-07 11:00', status: 'Completed' as const, amount: 299 },
  { studentId: 'VT2024004', studentName: 'Sneha Iyer', mentorName: 'Vikram Rao', date: '2026-03-06 16:00', status: 'Cancelled' as const, amount: 0 },
  { studentId: 'VT2024001', studentName: 'Arjun Mehta', mentorName: 'Ritu Kapoor', date: '2026-03-05 09:00', status: 'Completed' as const, amount: 399 },
  { studentId: 'VT2024006', studentName: 'Divya Nair', mentorName: 'Anita Desai', date: '2026-03-12 15:00', status: 'Upcoming' as const, amount: 499 },
  { studentId: 'VT2024007', studentName: 'Aditya Joshi', mentorName: 'Suresh Kumar', date: '2026-03-04 13:00', status: 'Completed' as const, amount: 299 },
];

const EXTRA_REQUESTS = [
  { id: 1, studentId: 'VT2024003', name: 'Rahul Verma', used: 4, reason: 'Need guidance on placement preparation for upcoming campus drive', importance: 'Securing a placement is critical for my family\'s financial situation', status: 'pending' as const },
  { id: 2, studentId: 'VT2024006', name: 'Divya Nair', used: 4, reason: 'Want to explore career options in AI/ML before choosing electives', importance: 'This decision will define my specialization and future career path', status: 'pending' as const },
  { id: 3, studentId: 'VT2024001', name: 'Arjun Mehta', used: 3, reason: 'Working on a startup idea and need mentor advice on tech stack', importance: 'I want to launch before graduation and need experienced guidance', status: 'pending' as const },
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
  const [monthlyAllocation, setMonthlyAllocation] = useState(4);
  const [settingsThreshold, setSettingsThreshold] = useState(10000);
  const [newStudentId, setNewStudentId] = useState('');

  // Add sessions dialog
  const [addSessionDialog, setAddSessionDialog] = useState<{ open: boolean; student: typeof STUDENTS[0] | null }>({ open: false, student: null });
  const [extraSessions, setExtraSessions] = useState('');

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
    }
    setRequests(prev => prev.filter(r => r.id !== id));
    toast({ title: action === 'approve' ? 'Request Approved' : 'Request Rejected', description: action === 'approve' ? '2 extra sessions added to the student\'s account.' : 'The request has been rejected.' });
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
    toast({ title: 'Settings Saved', description: 'Admin settings have been updated.' });
  };

  const handleSemesterReset = () => {
    setStudents(prev => prev.map(s => ({ ...s, used: 0, remaining: s.allocation })));
    toast({ title: 'Semester Reset', description: 'All student session counts have been reset.' });
  };

  const handleAddStudentId = () => {
    if (!newStudentId.trim()) return;
    const id = newStudentId.trim().toUpperCase();
    if (students.find(s => s.id === id)) {
      toast({ title: 'Already Exists', description: 'This Student ID is already registered.', variant: 'destructive' });
      return;
    }
    setStudents(prev => [...prev, { id, name: 'New Student', branch: 'CSE', year: '1st', allocation: monthlyAllocation, used: 0, remaining: monthlyAllocation }]);
    toast({ title: 'Student Added', description: `${id} has been added to the university account.` });
    setNewStudentId('');
  };

  const handleRemoveStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    toast({ title: 'Student Removed', description: `${id} has been removed from the university account.` });
  };

  const branches = [...new Set(students.map(s => s.branch))];
  const years = [...new Set(students.map(s => s.year))];

  const sideNavItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'sessions', label: 'Sessions', icon: CalendarCheck },
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
          <div className="flex items-center gap-2 px-3 py-4 mb-4">
            <ShieldIcon className="h-6 w-6 text-primary" />
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

          {/* ── Student Management ── */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">Student Management</h1>
                <p className="text-muted-foreground text-sm mt-1">Manage student session allocations</p>
              </div>
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
                            <div>
                              <p className="text-sm"><span className="font-medium">Reason:</span> {req.reason}</p>
                            </div>
                            <div>
                              <p className="text-sm"><span className="font-medium">Career Importance:</span> {req.importance}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 sm:flex-col">
                            <Button size="sm" onClick={() => handleRequestAction(req.id, 'approve')} className="gap-1">
                              <Check className="h-3 w-3" /> Approve
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleRequestAction(req.id, 'reject')} className="gap-1 text-destructive hover:text-destructive">
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
              {/* Card visual – compact credit-card style */}
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden relative">
                <div className="absolute top-0 right-0 w-28 h-28 bg-primary-foreground/5 rounded-full -mr-8 -mt-8" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary-foreground/5 rounded-full -ml-6 -mb-6" />
                <CardContent className="p-5 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm opacity-80 font-medium">Student Alumni Guidance Card</p>
                    <CreditCard className="h-5 w-5 opacity-60" />
                  </div>
                  <p className="font-mono text-lg tracking-widest mb-3">4520 •••• •••• 8834</p>
                  <div className="flex items-center gap-6 text-sm mb-3">
                    <div>
                      <p className="text-[10px] uppercase opacity-60">Total Loaded</p>
                      <p className="font-semibold">₹{totalCredits.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase opacity-60">Used</p>
                      <p className="font-semibold">₹{creditsUsed.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase opacity-60">Remaining</p>
                      <p className="font-semibold">₹{creditsRemaining.toLocaleString()}</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => setReloadDialogOpen(true)} className="w-full">
                    <Plus className="h-4 w-4 mr-1" /> Reload Credits
                  </Button>
                </CardContent>
              </Card>

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

          {/* ── Mentor Directory ── */}
          {activeTab === 'mentors' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">Mentor Directory</h1>
                <p className="text-muted-foreground text-sm mt-1">All active mentors available for university students</p>
              </div>
              <Card>
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
            </div>
          )}

          {/* ── Settings ── */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground text-sm mt-1">Configure admin preferences and student management</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Session Allocation</CardTitle>
                    <CardDescription>Set the monthly session limit per student</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Monthly Sessions Per Student</Label>
                      <Input type="number" min={1} max={20} value={monthlyAllocation} onChange={e => setMonthlyAllocation(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Low Balance Alert Threshold (₹)</Label>
                      <Input type="number" min={1000} step={1000} value={settingsThreshold} onChange={e => setSettingsThreshold(Number(e.target.value))} />
                    </div>
                    <Button onClick={handleSaveSettings} className="w-full">Save Settings</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Semester Management</CardTitle>
                    <CardDescription>Reset session counts for a new semester</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">This will reset all student session usage to 0 and restore their allocation to the current monthly limit.</p>
                    <Button variant="destructive" onClick={handleSemesterReset} className="w-full">Reset All Session Counts</Button>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base">Manage Student IDs</CardTitle>
                    <CardDescription>Add or remove students from the university account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Enter Student ID (e.g., VT2024010)" value={newStudentId} onChange={e => setNewStudentId(e.target.value)} />
                      <Button onClick={handleAddStudentId}><Plus className="h-4 w-4 mr-1" /> Add</Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                      {students.map(s => (
                        <div key={s.id} className="flex items-center justify-between bg-muted/50 px-3 py-2 rounded-lg">
                          <span className="font-mono text-xs">{s.id}</span>
                          <Button size="sm" variant="ghost" className="text-destructive h-7 w-7 p-0" onClick={() => handleRemoveStudent(s.id)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
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
    </Layout>
  );
};

// ─── Sub-components ───────────────────────────────────────────

const ShieldIcon = ({ className }: { className?: string }) => (
  <div className={`rounded-full bg-primary/10 p-1.5 ${className}`}>
    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  </div>
);

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
