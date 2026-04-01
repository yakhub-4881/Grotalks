import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Clock, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

type FollowUpStatus = 'done' | 'in_progress' | 'not_yet' | null;

interface ActionItem {
  id: number;
  title: string;
  description: string;
  status: FollowUpStatus;
}

const statusConfig = {
  done: { label: 'Done', icon: CheckCircle2, color: 'bg-success text-success-foreground', border: 'border-success' },
  in_progress: { label: 'In Progress', icon: Clock, color: 'bg-warning text-warning-foreground', border: 'border-warning' },
  not_yet: { label: 'Not Yet', icon: AlertCircle, color: 'bg-muted text-muted-foreground', border: 'border-muted-foreground' },
};

const FollowUpCheck = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data — in production, fetched from session record
  const alumniName = 'Arjun Singh';
  const sessionDate = 'Oct 28, 2024';

  const [items, setItems] = useState<ActionItem[]>([
    { id: 1, title: 'Update your LinkedIn headline', description: 'Add "Aspiring Product Manager" and list relevant skills.', status: null },
    { id: 2, title: 'Complete a PM case study', description: 'Write a 1-page improvement proposal for a product you use.', status: null },
    { id: 3, title: 'Reach out to 3 PMs on LinkedIn', description: 'Send personalized connection requests.', status: null },
  ]);

  const setStatus = (id: number, status: FollowUpStatus) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const allAnswered = items.every((i) => i.status !== null);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const allDone = items.every((i) => i.status === 'done');
      const anyInProgress = items.some((i) => i.status === 'in_progress');

      let statusTag = 'Action Pending';
      if (allDone) statusTag = 'Action Completed';
      else if (anyInProgress) statusTag = 'In Progress';

      toast({
        title: '✓ Follow-up saved!',
        description: `Session status updated to "${statusTag}"`,
      });
      navigate('/mentee/dashboard');
    }, 1000);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8">
        <div className="container max-w-xl px-4">
          <Card className="p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">How Did Your Action Plan Go?</h1>
              <p className="text-sm text-muted-foreground">
                Two weeks ago you had a session with <span className="font-semibold text-foreground">{alumniName}</span> on {sessionDate}
              </p>
            </div>

            {/* Action items */}
            <div className="space-y-4 mb-8">
              {items.map((item, index) => (
                <Card key={item.id} className={`p-4 border-l-4 ${item.status ? statusConfig[item.status].border : 'border-l-border'}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                  </div>

                  {/* Status buttons */}
                  <div className="flex gap-2 pl-9">
                    {(['done', 'in_progress', 'not_yet'] as const).map((s) => {
                      const cfg = statusConfig[s];
                      const isSelected = item.status === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setStatus(item.id, s)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                            isSelected
                              ? `${cfg.color} border-transparent`
                              : 'bg-background text-muted-foreground border-border hover:border-foreground/20'
                          }`}
                        >
                          <cfg.icon className="h-3.5 w-3.5" />
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>

            {/* Submit */}
            <Button className="w-full h-12 text-base font-semibold" onClick={handleSubmit} disabled={!allAnswered || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Submit Follow-Up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {!allAnswered && (
              <p className="text-xs text-center text-muted-foreground mt-3">
                Please mark the status for all action items to continue
              </p>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FollowUpCheck;
