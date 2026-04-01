import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Search, AlertTriangle, Send, Bell, Users, UserX, MessageSquare } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────
type NonEngagedStudent = {
  id: string;
  name: string;
  branch: string;
  year: string;
  email: string;
  lastActive: string | null;
};

// ─── Mock Data ──────────────────────────────────────────────
const NON_ENGAGED: NonEngagedStudent[] = [
  { id: 'VT2024005', name: 'Karan Singh', branch: 'EEE', year: '2nd', email: 'karan.singh@veltech.edu.in', lastActive: null },
  { id: 'VT2024008', name: 'Meera Patel', branch: 'ECE', year: '2nd', email: 'meera.patel@veltech.edu.in', lastActive: '2025-11-10' },
  { id: 'VT2025001', name: 'Rohan Das', branch: 'CSE', year: '1st', email: 'rohan.das@veltech.edu.in', lastActive: null },
  { id: 'VT2025002', name: 'Ananya Krishnan', branch: 'ME', year: '1st', email: 'ananya.k@veltech.edu.in', lastActive: null },
  { id: 'VT2024010', name: 'Vikram Thakur', branch: 'CSE', year: '3rd', email: 'vikram.t@veltech.edu.in', lastActive: '2025-10-05' },
  { id: 'VT2024011', name: 'Pooja Reddy', branch: 'IT', year: '2nd', email: 'pooja.r@veltech.edu.in', lastActive: null },
  { id: 'VT2024012', name: 'Karthik Reddy', branch: 'CSE', year: '3rd', email: 'karthik.r@veltech.edu.in', lastActive: '2025-09-15' },
  { id: 'VT2025003', name: 'Sanya Malhotra', branch: 'ECE', year: '1st', email: 'sanya.m@veltech.edu.in', lastActive: null },
  { id: 'VT2024013', name: 'Deepak Kumar', branch: 'ME', year: '4th', email: 'deepak.k@veltech.edu.in', lastActive: '2025-08-22' },
  { id: 'VT2025004', name: 'Ishita Jain', branch: 'EEE', year: '1st', email: 'ishita.j@veltech.edu.in', lastActive: null },
  { id: 'VT2024014', name: 'Nikhil Sharma', branch: 'IT', year: '3rd', email: 'nikhil.s@veltech.edu.in', lastActive: '2025-12-01' },
  { id: 'VT2024015', name: 'Riya Gupta', branch: 'CSE', year: '2nd', email: 'riya.g@veltech.edu.in', lastActive: null },
];

const DEFAULT_NUDGE_MESSAGE = 'Your college has provided you access to alumni alumnis on Grotalks. Book your first session today!';
const BRANCHES = ['All Branches', 'CSE', 'ECE', 'ME', 'EEE', 'IT'];
const YEARS = ['All Years', '1st', '2nd', '3rd', '4th'];

// ─── Component ──────────────────────────────────────────────
const NonEngagedAlerts = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('All Branches');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [nudgeDialog, setNudgeDialog] = useState(false);
  const [nudgeMessage, setNudgeMessage] = useState(DEFAULT_NUDGE_MESSAGE);
  const [sentNudges, setSentNudges] = useState<Set<string>>(new Set());

  const filtered = NON_ENGAGED.filter(s => {
    const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchesBranch = branchFilter === 'All Branches' || s.branch === branchFilter;
    const matchesYear = yearFilter === 'All Years' || s.year === yearFilter;
    return matchesSearch && matchesBranch && matchesYear;
  });

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map(s => s.id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSendNudge = () => {
    const count = selected.size;
    setSentNudges(prev => {
      const next = new Set(prev);
      selected.forEach(id => next.add(id));
      return next;
    });
    setNudgeDialog(false);
    setSelected(new Set());
    toast({ title: 'Nudge Sent!', description: `Notification sent to ${count} student${count > 1 ? 's' : ''} with a link to book their first session.` });
  };

  const handleSendSingleNudge = (student: NonEngagedStudent) => {
    setSentNudges(prev => new Set(prev).add(student.id));
    toast({ title: 'Nudge Sent', description: `Notification sent to ${student.name}.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Non-Engaged Student Alerts</h1>
        <p className="text-muted-foreground text-sm mt-1">Students who have not booked a single session this semester</p>
      </div>

      {/* Alert Banner */}
      <div className="flex items-center gap-3 p-4 rounded-lg border border-warning bg-warning/10">
        <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">{NON_ENGAGED.length} students have not booked any session this semester</p>
          <p className="text-xs text-muted-foreground">Send them a nudge notification to encourage their first booking</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
              <UserX className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Not Engaged</p>
              <p className="text-lg font-bold">{NON_ENGAGED.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
              <Bell className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Nudges Sent</p>
              <p className="text-lg font-bold">{sentNudges.size}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
              <MessageSquare className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending Nudges</p>
              <p className="text-lg font-bold">{NON_ENGAGED.length - sentNudges.size}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or student ID..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
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
        {selected.size > 0 && (
          <Button onClick={() => { setNudgeMessage(DEFAULT_NUDGE_MESSAGE); setNudgeDialog(true); }} className="gap-1.5">
            <Send className="h-4 w-4" /> Nudge {selected.size} Student{selected.size > 1 ? 's' : ''}
          </Button>
        )}
      </div>

      {/* Student Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Branch</TableHead>
                <TableHead className="hidden sm:table-cell">Year</TableHead>
                <TableHead className="hidden md:table-cell">Last Active</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(s => (
                <TableRow key={s.id}>
                  <TableCell>
                    <Checkbox checked={selected.has(s.id)} onCheckedChange={() => toggleSelect(s.id)} />
                  </TableCell>
                  <TableCell className="font-mono text-xs">{s.id}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{s.branch}</TableCell>
                  <TableCell className="hidden sm:table-cell">{s.year}</TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                    {s.lastActive ? new Date(s.lastActive).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Never logged in'}
                  </TableCell>
                  <TableCell className="text-center">
                    {sentNudges.has(s.id) ? (
                      <Badge variant="secondary" className="text-[10px]">Nudge Sent</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-[10px]">No Sessions</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={sentNudges.has(s.id)}
                      onClick={() => handleSendSingleNudge(s)}
                      className="gap-1"
                    >
                      <Send className="h-3 w-3" /> Nudge
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No non-engaged students found for the selected filters</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Nudge Dialog */}
      <Dialog open={nudgeDialog} onOpenChange={setNudgeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Send className="h-4 w-4 text-primary" />
              </div>
              Send Nudge Notification
            </DialogTitle>
            <DialogDescription>
              Send a notification to {selected.size} selected student{selected.size > 1 ? 's' : ''} encouraging them to book their first session.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Message Preview</p>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm leading-relaxed">{nudgeMessage}</p>
                <div className="mt-3">
                  <Button size="sm" className="text-xs">Book Your First Session →</Button>
                </div>
              </div>
            </div>
            <textarea
              className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-3 text-sm leading-relaxed ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              value={nudgeMessage}
              onChange={e => setNudgeMessage(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNudgeDialog(false)}>Cancel</Button>
            <Button onClick={handleSendNudge} className="gap-1.5">
              <Send className="h-4 w-4" /> Send Nudge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NonEngagedAlerts;
