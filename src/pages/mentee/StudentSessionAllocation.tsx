import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ArrowLeft, Calendar, CheckCircle2, AlertTriangle, Send, Loader2 } from 'lucide-react';

const StudentSessionAllocation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requestOpen, setRequestOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [outcomes, setOutcomes] = useState('');
  const [careerImportance, setCareerImportance] = useState('');

  // Dummy data
  const sessionData = {
    allocated: 5,
    used: 5,
    remaining: 0,
    month: 'March 2026',
    alumniConsulted: ['Arjun Singh (PM @ Flipkart)', 'Meera Patel (SDE @ Google)'],
  };

  const hasRemaining = sessionData.remaining > 0;

  const handleSubmitRequest = () => {
    if (!outcomes.trim() || !careerImportance.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setRequestOpen(false);
      setOutcomes('');
      setCareerImportance('');
      toast({
        title: 'Request Sent',
        description: 'Your request has been sent to the university alumni admin for review.',
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-4 md:py-8 max-w-lg">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="text-xl font-bold text-foreground mb-2">Session Allocation</h1>
          <p className="text-sm text-muted-foreground mb-6">{sessionData.month}</p>

          {/* Session Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card className="p-4 text-center">
              <Calendar className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{sessionData.allocated}</p>
              <p className="text-xs text-muted-foreground">Allocated</p>
            </Card>
            <Card className="p-4 text-center">
              <CheckCircle2 className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{sessionData.used}</p>
              <p className="text-xs text-muted-foreground">Used</p>
            </Card>
            <Card className="p-4 text-center">
              <Calendar className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className={`text-2xl font-bold ${hasRemaining ? 'text-foreground' : 'text-destructive'}`}>
                {sessionData.remaining}
              </p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </Card>
          </div>

          {/* Zero sessions alert */}
          {!hasRemaining && (
            <Card className="p-4 border-destructive/30 bg-destructive/5 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">
                    No sessions remaining
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    You have used all your allocated sessions for this month. Please send a request to your alumni admin for more sessions.
                  </p>
                  <Button size="sm" onClick={() => setRequestOpen(true)}>
                    <Send className="mr-2 h-3.5 w-3.5" />
                    Request More Sessions
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Alumni Consulted */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Alumni Consulted This Month</h3>
            <div className="space-y-2">
              {sessionData.alumniConsulted.map((alumni, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  {alumni}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Request More Sessions Dialog */}
      <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Additional Sessions</DialogTitle>
            <DialogDescription>
              This request will be sent to your university alumni admin for approval.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* Auto-filled fields */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Sessions Completed This Month</Label>
              <div className="px-3 py-2 bg-muted rounded-md text-sm font-medium text-foreground">
                {sessionData.used} sessions
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Alumni Consulted</Label>
              <div className="px-3 py-2 bg-muted rounded-md text-sm text-foreground">
                {sessionData.alumniConsulted.join(', ')}
              </div>
            </div>

            {/* User input fields */}
            <div className="space-y-2">
              <Label htmlFor="outcomes" className="text-sm font-medium">
                Key Outcomes from Sessions
              </Label>
              <Textarea
                id="outcomes"
                placeholder="Share what you learned and achieved from your sessions..."
                value={outcomes}
                onChange={(e) => setOutcomes(e.target.value)}
                className="min-h-20 resize-none"
                maxLength={500}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="careerImportance" className="text-sm font-medium">
                Why Additional Sessions Are Important for Your Career
              </Label>
              <Textarea
                id="careerImportance"
                placeholder="Explain why you need more sessions and how they will impact your career goals..."
                value={careerImportance}
                onChange={(e) => setCareerImportance(e.target.value)}
                className="min-h-20 resize-none"
                maxLength={500}
              />
            </div>

            <Button
              className="w-full"
              onClick={handleSubmitRequest}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default StudentSessionAllocation;
