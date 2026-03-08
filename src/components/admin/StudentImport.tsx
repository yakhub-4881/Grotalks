import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  Upload, FileSpreadsheet, CheckCircle, AlertCircle, X, Download,
  Search, Trash2, Edit2, Plus, ChevronLeft, ChevronRight, Users,
  FileText, ArrowRight, RotateCcw, Eye, Filter
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

// ─── Types ───────────────────────────────────────────────────
type StudentRecord = {
  id: string;
  collegeId: string;
  name: string;
  email: string;
  branch: string;
  year: string;
  phone: string;
  enrollmentYear: string;
  status: 'active' | 'inactive' | 'graduated';
  importedAt?: string;
  importBatch?: string;
};

type ValidationError = {
  row: number;
  field: string;
  message: string;
};

type ImportStep = 'upload' | 'mapping' | 'preview' | 'importing' | 'complete';

// ─── Sample data for existing records ───────────────────────
const EXISTING_RECORDS: StudentRecord[] = [
  { id: '1', collegeId: 'VT2024001', name: 'Arjun Mehta', email: 'arjun.mehta@veltech.edu.in', branch: 'CSE', year: '3rd', phone: '9876543210', enrollmentYear: '2022', status: 'active', importedAt: '2026-01-15', importBatch: 'Jan 2026' },
  { id: '2', collegeId: 'VT2024002', name: 'Priya Sharma', email: 'priya.sharma@veltech.edu.in', branch: 'ECE', year: '2nd', phone: '9876543211', enrollmentYear: '2023', status: 'active', importedAt: '2026-01-15', importBatch: 'Jan 2026' },
  { id: '3', collegeId: 'VT2024003', name: 'Rahul Verma', email: 'rahul.verma@veltech.edu.in', branch: 'ME', year: '4th', phone: '9876543212', enrollmentYear: '2021', status: 'active', importedAt: '2026-01-15', importBatch: 'Jan 2026' },
  { id: '4', collegeId: 'VT2024004', name: 'Sneha Iyer', email: 'sneha.iyer@veltech.edu.in', branch: 'CSE', year: '3rd', phone: '9876543213', enrollmentYear: '2022', status: 'active', importedAt: '2026-02-01', importBatch: 'Feb 2026' },
  { id: '5', collegeId: 'VT2024005', name: 'Karan Singh', email: 'karan.singh@veltech.edu.in', branch: 'EEE', year: '2nd', phone: '9876543214', enrollmentYear: '2023', status: 'active', importedAt: '2026-02-01', importBatch: 'Feb 2026' },
  { id: '6', collegeId: 'VT2024006', name: 'Divya Nair', email: 'divya.nair@veltech.edu.in', branch: 'IT', year: '3rd', phone: '9876543215', enrollmentYear: '2022', status: 'active', importedAt: '2026-02-01', importBatch: 'Feb 2026' },
  { id: '7', collegeId: 'VT2023001', name: 'Amit Patel', email: 'amit.patel@veltech.edu.in', branch: 'CSE', year: '4th', phone: '9876543216', enrollmentYear: '2021', status: 'graduated', importedAt: '2025-08-10', importBatch: 'Aug 2025' },
  { id: '8', collegeId: 'VT2023002', name: 'Neha Gupta', email: 'neha.gupta@veltech.edu.in', branch: 'ECE', year: '4th', phone: '9876543217', enrollmentYear: '2021', status: 'graduated', importedAt: '2025-08-10', importBatch: 'Aug 2025' },
  { id: '9', collegeId: 'VT2025001', name: 'Rohan Das', email: 'rohan.das@veltech.edu.in', branch: 'CSE', year: '1st', phone: '9876543218', enrollmentYear: '2025', status: 'active', importedAt: '2026-03-01', importBatch: 'Mar 2026' },
  { id: '10', collegeId: 'VT2025002', name: 'Ananya Krishnan', email: 'ananya.k@veltech.edu.in', branch: 'ME', year: '1st', phone: '9876543219', enrollmentYear: '2025', status: 'active', importedAt: '2026-03-01', importBatch: 'Mar 2026' },
  { id: '11', collegeId: 'VT2024007', name: 'Aditya Joshi', email: 'aditya.joshi@veltech.edu.in', branch: 'CSE', year: '4th', phone: '9876543220', enrollmentYear: '2021', status: 'active', importedAt: '2026-01-15', importBatch: 'Jan 2026' },
  { id: '12', collegeId: 'VT2024008', name: 'Meera Patel', email: 'meera.patel@veltech.edu.in', branch: 'ECE', year: '2nd', phone: '9876543221', enrollmentYear: '2023', status: 'inactive', importedAt: '2026-01-15', importBatch: 'Jan 2026' },
];

const REQUIRED_FIELDS = ['College ID', 'Name', 'Email', 'Branch', 'Year', 'Phone', 'Enrollment Year'];

const CSV_TEMPLATE = `College ID,Name,Email,Branch,Year,Phone,Enrollment Year
VT2025003,John Doe,john.doe@veltech.edu.in,CSE,1st,9876543222,2025
VT2025004,Jane Smith,jane.smith@veltech.edu.in,ECE,1st,9876543223,2025`;

// ─── Component ───────────────────────────────────────────────
const StudentImport = () => {
  const { toast } = useToast();

  // View mode: 'records' for CRUD table, 'import' for wizard
  const [viewMode, setViewMode] = useState<'records' | 'import'>('records');

  // ─── Records State ────────────────────────────────────────
  const [records, setRecords] = useState<StudentRecord[]>(EXISTING_RECORDS);
  const [recordSearch, setRecordSearch] = useState('');
  const [recordBranchFilter, setRecordBranchFilter] = useState('all');
  const [recordYearFilter, setRecordYearFilter] = useState('all');
  const [recordStatusFilter, setRecordStatusFilter] = useState('all');
  const [recordBatchFilter, setRecordBatchFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState<Set<string>>(new Set());
  const [editDialog, setEditDialog] = useState<{ open: boolean; record: StudentRecord | null }>({ open: false, record: null });
  const [editForm, setEditForm] = useState<Partial<StudentRecord>>({});
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; ids: string[] }>({ open: false, ids: [] });
  const recordsPerPage = 10;

  // ─── Import Wizard State ──────────────────────────────────
  const [importStep, setImportStep] = useState<ImportStep>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [rawCsvData, setRawCsvData] = useState<string[][]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [parsedRecords, setParsedRecords] = useState<Partial<StudentRecord>[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [importProgress, setImportProgress] = useState(0);
  const [importedCount, setImportedCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Filtered & Paginated Records ─────────────────────────
  const filteredRecords = records.filter(r => {
    const matchesSearch = recordSearch === '' ||
      r.name.toLowerCase().includes(recordSearch.toLowerCase()) ||
      r.collegeId.toLowerCase().includes(recordSearch.toLowerCase()) ||
      r.email.toLowerCase().includes(recordSearch.toLowerCase());
    const matchesBranch = recordBranchFilter === 'all' || r.branch === recordBranchFilter;
    const matchesYear = recordYearFilter === 'all' || r.year === recordYearFilter;
    const matchesStatus = recordStatusFilter === 'all' || r.status === recordStatusFilter;
    const matchesBatch = recordBatchFilter === 'all' || r.importBatch === recordBatchFilter;
    return matchesSearch && matchesBranch && matchesYear && matchesStatus && matchesBatch;
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const branches = [...new Set(records.map(r => r.branch))];
  const years = [...new Set(records.map(r => r.year))];
  const batches = [...new Set(records.map(r => r.importBatch).filter(Boolean))];

  // ─── CSV Parsing ──────────────────────────────────────────
  const parseCSV = (text: string): string[][] => {
    const lines = text.trim().split('\n');
    return lines.map(line => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
          inQuotes = !inQuotes;
        } else if (line[i] === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += line[i];
        }
      }
      result.push(current.trim());
      return result;
    });
  };

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast({ title: 'Invalid File', description: 'Please upload a .csv file', variant: 'destructive' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'File Too Large', description: 'Maximum file size is 5MB', variant: 'destructive' });
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const data = parseCSV(text);
      if (data.length < 2) {
        toast({ title: 'Empty File', description: 'CSV must contain headers and at least one row', variant: 'destructive' });
        return;
      }
      const headers = data[0];
      setCsvHeaders(headers);
      setRawCsvData(data.slice(1));

      // Auto-map columns
      const autoMap: Record<string, string> = {};
      REQUIRED_FIELDS.forEach(field => {
        const match = headers.findIndex(h =>
          h.toLowerCase().replace(/[_\s-]/g, '') === field.toLowerCase().replace(/[_\s-]/g, '')
        );
        if (match !== -1) autoMap[field] = headers[match];
      });
      setColumnMapping(autoMap);
      setImportStep('mapping');
    };
    reader.readAsText(file);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  // ─── Validation ───────────────────────────────────────────
  const validateAndParse = () => {
    const errors: ValidationError[] = [];
    const parsed: Partial<StudentRecord>[] = [];

    rawCsvData.forEach((row, rowIdx) => {
      const record: Partial<StudentRecord> = {};

      REQUIRED_FIELDS.forEach(field => {
        const csvCol = columnMapping[field];
        const colIdx = csvHeaders.indexOf(csvCol);
        const value = colIdx !== -1 ? row[colIdx]?.trim() || '' : '';

        switch (field) {
          case 'College ID':
            record.collegeId = value;
            if (!value) errors.push({ row: rowIdx + 2, field, message: 'College ID is required' });
            break;
          case 'Name':
            record.name = value;
            if (!value) errors.push({ row: rowIdx + 2, field, message: 'Name is required' });
            break;
          case 'Email':
            record.email = value;
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              errors.push({ row: rowIdx + 2, field, message: 'Invalid email format' });
            }
            break;
          case 'Branch':
            record.branch = value;
            if (!value) errors.push({ row: rowIdx + 2, field, message: 'Branch is required' });
            break;
          case 'Year':
            record.year = value;
            break;
          case 'Phone':
            record.phone = value;
            if (value && !/^\d{10}$/.test(value)) {
              errors.push({ row: rowIdx + 2, field, message: 'Phone must be 10 digits' });
            }
            break;
          case 'Enrollment Year':
            record.enrollmentYear = value;
            break;
        }
      });

      parsed.push(record);
    });

    setValidationErrors(errors);
    setParsedRecords(parsed);
    setImportStep('preview');
  };

  // ─── Import Execution ─────────────────────────────────────
  const executeImport = () => {
    setImportStep('importing');
    const validRecords = parsedRecords.filter((_, idx) =>
      !validationErrors.some(e => e.row === idx + 2)
    );

    let imported = 0;
    let skipped = 0;
    let duplicates = 0;
    const batchName = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    const interval = setInterval(() => {
      if (imported + skipped + duplicates >= validRecords.length) {
        clearInterval(interval);
        setImportedCount(imported);
        setSkippedCount(skipped);
        setDuplicateCount(duplicates);
        setImportStep('complete');
        return;
      }

      const record = validRecords[imported + skipped + duplicates];
      const isDuplicate = records.some(r => r.collegeId === record.collegeId);

      if (isDuplicate) {
        duplicates++;
      } else if (!record.collegeId || !record.name) {
        skipped++;
      } else {
        const newRecord: StudentRecord = {
          id: String(records.length + imported + 1),
          collegeId: record.collegeId!,
          name: record.name!,
          email: record.email || '',
          branch: record.branch || 'N/A',
          year: record.year || '1st',
          phone: record.phone || '',
          enrollmentYear: record.enrollmentYear || new Date().getFullYear().toString(),
          status: 'active',
          importedAt: new Date().toISOString().split('T')[0],
          importBatch: batchName,
        };
        setRecords(prev => [...prev, newRecord]);
        imported++;
      }

      setImportProgress(Math.round(((imported + skipped + duplicates) / validRecords.length) * 100));
    }, 80);
  };

  const resetImport = () => {
    setImportStep('upload');
    setFileName('');
    setRawCsvData([]);
    setCsvHeaders([]);
    setColumnMapping({});
    setParsedRecords([]);
    setValidationErrors([]);
    setImportProgress(0);
    setImportedCount(0);
    setSkippedCount(0);
    setDuplicateCount(0);
  };

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_import_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── CRUD Handlers ────────────────────────────────────────
  const handleEditSave = () => {
    if (!editDialog.record) return;
    setRecords(prev => prev.map(r =>
      r.id === editDialog.record!.id ? { ...r, ...editForm } : r
    ));
    toast({ title: 'Record Updated', description: `${editForm.name || editDialog.record.name}'s record has been updated.` });
    setEditDialog({ open: false, record: null });
  };

  const handleBulkDelete = () => {
    setRecords(prev => prev.filter(r => !deleteDialog.ids.includes(r.id)));
    setSelectedRecords(new Set());
    toast({ title: 'Records Deleted', description: `${deleteDialog.ids.length} record(s) have been removed.` });
    setDeleteDialog({ open: false, ids: [] });
  };

  const toggleSelectAll = () => {
    if (selectedRecords.size === paginatedRecords.length) {
      setSelectedRecords(new Set());
    } else {
      setSelectedRecords(new Set(paginatedRecords.map(r => r.id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedRecords(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const exportRecords = () => {
    const headers = ['College ID,Name,Email,Branch,Year,Phone,Enrollment Year,Status,Import Date,Import Batch'];
    const rows = filteredRecords.map(r =>
      `${r.collegeId},${r.name},${r.email},${r.branch},${r.year},${r.phone},${r.enrollmentYear},${r.status},${r.importedAt || ''},${r.importBatch || ''}`
    );
    const csv = [...headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_records_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Render: Records View ─────────────────────────────────
  if (viewMode === 'records') {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Student Records</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {records.length} total records across all years
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportRecords} className="gap-1.5">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="sm" onClick={() => { setViewMode('import'); resetImport(); }} className="gap-1.5">
              <Upload className="h-4 w-4" /> Import Students
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name, ID, or email..." className="pl-9" value={recordSearch} onChange={e => { setRecordSearch(e.target.value); setCurrentPage(1); }} />
          </div>
          <Select value={recordBranchFilter} onValueChange={v => { setRecordBranchFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-full sm:w-32"><SelectValue placeholder="Branch" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {branches.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={recordYearFilter} onValueChange={v => { setRecordYearFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-full sm:w-28"><SelectValue placeholder="Year" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={recordStatusFilter} onValueChange={v => { setRecordStatusFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-full sm:w-32"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="graduated">Graduated</SelectItem>
            </SelectContent>
          </Select>
          <Select value={recordBatchFilter} onValueChange={v => { setRecordBatchFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-full sm:w-32"><SelectValue placeholder="Batch" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              {batches.map(b => <SelectItem key={b} value={b!}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Bulk actions */}
        {selectedRecords.size > 0 && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <span className="text-sm font-medium">{selectedRecords.size} selected</span>
            <Button size="sm" variant="destructive" onClick={() => setDeleteDialog({ open: true, ids: Array.from(selectedRecords) })} className="gap-1">
              <Trash2 className="h-3 w-3" /> Delete Selected
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSelectedRecords(new Set())}>Clear</Button>
          </div>
        )}

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox checked={paginatedRecords.length > 0 && selectedRecords.size === paginatedRecords.length} onCheckedChange={toggleSelectAll} />
                    </TableHead>
                    <TableHead>College ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden sm:table-cell">Branch</TableHead>
                    <TableHead className="hidden sm:table-cell">Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Import Batch</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRecords.map(r => (
                    <TableRow key={r.id} className={selectedRecords.has(r.id) ? 'bg-primary/5' : ''}>
                      <TableCell>
                        <Checkbox checked={selectedRecords.has(r.id)} onCheckedChange={() => toggleSelect(r.id)} />
                      </TableCell>
                      <TableCell className="font-mono text-xs">{r.collegeId}</TableCell>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{r.email}</TableCell>
                      <TableCell className="hidden sm:table-cell">{r.branch}</TableCell>
                      <TableCell className="hidden sm:table-cell">{r.year}</TableCell>
                      <TableCell>
                        <Badge variant={r.status === 'active' ? 'default' : r.status === 'graduated' ? 'secondary' : 'destructive'} className="text-[10px]">
                          {r.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">{r.importBatch}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => { setEditDialog({ open: true, record: r }); setEditForm(r); }}>
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" onClick={() => setDeleteDialog({ open: true, ids: [r.id] })}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {paginatedRecords.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                        No records found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * recordsPerPage + 1}–{Math.min(currentPage * recordsPerPage, filteredRecords.length)} of {filteredRecords.length}
            </p>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button key={page} size="sm" variant={page === currentPage ? 'default' : 'outline'} onClick={() => setCurrentPage(page)} className="w-8 h-8 p-0">
                  {page}
                </Button>
              ))}
              <Button size="sm" variant="outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={editDialog.open} onOpenChange={open => { if (!open) setEditDialog({ open: false, record: null }); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Student Record</DialogTitle>
              <DialogDescription>Update details for {editDialog.record?.collegeId}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="space-y-1.5">
                <Label className="text-xs">College ID</Label>
                <Input value={editForm.collegeId || ''} onChange={e => setEditForm(f => ({ ...f, collegeId: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Name</Label>
                <Input value={editForm.name || ''} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label className="text-xs">Email</Label>
                <Input value={editForm.email || ''} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Branch</Label>
                <Input value={editForm.branch || ''} onChange={e => setEditForm(f => ({ ...f, branch: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Year</Label>
                <Select value={editForm.year || ''} onValueChange={v => setEditForm(f => ({ ...f, year: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['1st', '2nd', '3rd', '4th'].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Phone</Label>
                <Input value={editForm.phone || ''} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Status</Label>
                <Select value={editForm.status || ''} onValueChange={v => setEditForm(f => ({ ...f, status: v as StudentRecord['status'] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="graduated">Graduated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialog({ open: false, record: null })}>Cancel</Button>
              <Button onClick={handleEditSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog.open} onOpenChange={open => { if (!open) setDeleteDialog({ open: false, ids: [] }); }}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </div>
                Delete {deleteDialog.ids.length > 1 ? `${deleteDialog.ids.length} Records` : 'Record'}
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. The student record(s) will be permanently removed.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setDeleteDialog({ open: false, ids: [] })}>Cancel</Button>
              <Button variant="destructive" onClick={handleBulkDelete}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ─── Render: Import Wizard ────────────────────────────────
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => setViewMode('records')} className="gap-1">
          <ChevronLeft className="h-4 w-4" /> Back to Records
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Import Students</h1>
          <p className="text-muted-foreground text-sm mt-1">Bulk import student records via CSV file</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {(['upload', 'mapping', 'preview', 'importing'] as ImportStep[]).map((step, idx) => {
          const labels = ['Upload', 'Map Columns', 'Preview & Validate', 'Import'];
          const stepNum = idx + 1;
          const currentIdx = ['upload', 'mapping', 'preview', 'importing', 'complete'].indexOf(importStep);
          const isActive = idx === currentIdx;
          const isDone = idx < currentIdx;
          return (
            <div key={step} className="flex items-center gap-2">
              {idx > 0 && <div className={`w-8 h-px ${isDone ? 'bg-primary' : 'bg-border'}`} />}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isActive ? 'bg-primary text-primary-foreground' :
                isDone ? 'bg-primary/10 text-primary' :
                'bg-muted text-muted-foreground'
              }`}>
                {isDone ? <CheckCircle className="h-3.5 w-3.5" /> : <span>{stepNum}</span>}
                <span className="hidden sm:inline">{labels[idx]}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step 1: Upload */}
      {importStep === 'upload' && (
        <div className="space-y-4">
          <Card
            className={`border-2 border-dashed transition-colors cursor-pointer ${
              isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <CardContent className="py-16 flex flex-col items-center gap-4 text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold">Drop your CSV file here</p>
                <p className="text-sm text-muted-foreground mt-1">or click to browse • Max 5MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileInput}
              />
            </CardContent>
          </Card>

          <div className="flex items-center gap-4 justify-center">
            <Button variant="outline" size="sm" onClick={downloadTemplate} className="gap-1.5">
              <Download className="h-4 w-4" /> Download CSV Template
            </Button>
          </div>

          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Expected CSV Format</p>
              <div className="overflow-x-auto">
                <table className="text-xs w-full">
                  <thead>
                    <tr className="border-b">
                      {REQUIRED_FIELDS.map(f => <th key={f} className="py-1.5 pr-4 text-left font-medium">{f}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-muted-foreground">
                      <td className="py-1.5 pr-4">VT2025003</td>
                      <td className="py-1.5 pr-4">John Doe</td>
                      <td className="py-1.5 pr-4">john@veltech.edu.in</td>
                      <td className="py-1.5 pr-4">CSE</td>
                      <td className="py-1.5 pr-4">1st</td>
                      <td className="py-1.5 pr-4">9876543222</td>
                      <td className="py-1.5 pr-4">2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Column Mapping */}
      {importStep === 'mapping' && (
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-base">{fileName}</CardTitle>
                  <CardDescription>{rawCsvData.length} rows detected • {csvHeaders.length} columns</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Map your CSV columns to the required fields. Auto-mapped columns are pre-filled.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {REQUIRED_FIELDS.map(field => (
                  <div key={field} className="space-y-1.5">
                    <Label className="text-xs font-medium flex items-center gap-1">
                      {field}
                      {['College ID', 'Name', 'Branch'].includes(field) && <span className="text-destructive">*</span>}
                    </Label>
                    <Select value={columnMapping[field] || ''} onValueChange={v => setColumnMapping(prev => ({ ...prev, [field]: v }))}>
                      <SelectTrigger className={!columnMapping[field] ? 'border-warning' : ''}>
                        <SelectValue placeholder="Select column..." />
                      </SelectTrigger>
                      <SelectContent>
                        {csvHeaders.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetImport}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button onClick={validateAndParse} disabled={!columnMapping['College ID'] || !columnMapping['Name']}>
              Preview & Validate <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Preview & Validate */}
      {importStep === 'preview' && (
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Rows</p>
                  <p className="text-lg font-bold">{parsedRecords.length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <div>
                  <p className="text-xs text-muted-foreground">Valid</p>
                  <p className="text-lg font-bold text-success">
                    {parsedRecords.length - new Set(validationErrors.map(e => e.row)).size}
                  </p>
                </div>
              </div>
            </Card>
            <Card className={`p-4 ${validationErrors.length > 0 ? 'border-warning' : ''}`}>
              <div className="flex items-center gap-2">
                <AlertCircle className={`h-4 w-4 ${validationErrors.length > 0 ? 'text-warning' : 'text-muted-foreground'}`} />
                <div>
                  <p className="text-xs text-muted-foreground">Errors</p>
                  <p className={`text-lg font-bold ${validationErrors.length > 0 ? 'text-warning' : ''}`}>
                    {validationErrors.length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <Card className="border-warning/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-warning">
                  <AlertCircle className="h-4 w-4" /> Validation Issues
                </CardTitle>
                <CardDescription>Rows with errors will be skipped during import</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {validationErrors.map((err, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground">
                      <span className="font-mono text-warning">Row {err.row}</span> — {err.field}: {err.message}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Data Preview */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Data Preview</CardTitle>
              <CardDescription>First 10 rows of your import</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">#</TableHead>
                      <TableHead>College ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsedRecords.slice(0, 10).map((r, idx) => {
                      const hasError = validationErrors.some(e => e.row === idx + 2);
                      return (
                        <TableRow key={idx} className={hasError ? 'bg-warning/5' : ''}>
                          <TableCell className="text-xs text-muted-foreground">{idx + 2}</TableCell>
                          <TableCell className="font-mono text-xs">{r.collegeId || '—'}</TableCell>
                          <TableCell className="font-medium text-sm">{r.name || '—'}</TableCell>
                          <TableCell className="text-xs">{r.email || '—'}</TableCell>
                          <TableCell className="text-sm">{r.branch || '—'}</TableCell>
                          <TableCell className="text-sm">{r.year || '—'}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setImportStep('mapping')}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button onClick={executeImport}>
              Import {parsedRecords.length - new Set(validationErrors.map(e => e.row)).size} Records <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Importing */}
      {importStep === 'importing' && (
        <Card>
          <CardContent className="py-16 flex flex-col items-center gap-6 text-center">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
              <FileSpreadsheet className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold">Importing Records...</p>
              <p className="text-sm text-muted-foreground mt-1">Please don't close this page</p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Progress value={importProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">{importProgress}% complete</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Complete */}
      {importStep === 'complete' && (
        <Card>
          <CardContent className="py-12 flex flex-col items-center gap-6 text-center">
            <div className="h-16 w-16 rounded-2xl bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <div>
              <p className="text-xl font-bold">Import Complete!</p>
              <p className="text-sm text-muted-foreground mt-1">Your student records have been processed</p>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
              <div className="p-3 rounded-lg bg-success/10 text-center">
                <p className="text-2xl font-bold text-success">{importedCount}</p>
                <p className="text-xs text-muted-foreground">Imported</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10 text-center">
                <p className="text-2xl font-bold text-warning">{duplicateCount}</p>
                <p className="text-xs text-muted-foreground">Duplicates</p>
              </div>
              <div className="p-3 rounded-lg bg-muted text-center">
                <p className="text-2xl font-bold">{skippedCount}</p>
                <p className="text-xs text-muted-foreground">Skipped</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => { resetImport(); }} className="gap-1.5">
                <RotateCcw className="h-4 w-4" /> Import More
              </Button>
              <Button onClick={() => { setViewMode('records'); resetImport(); }} className="gap-1.5">
                <Eye className="h-4 w-4" /> View Records
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentImport;
