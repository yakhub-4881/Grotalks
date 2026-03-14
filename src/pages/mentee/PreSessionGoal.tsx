import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Target, Lightbulb, Loader2 } from 'lucide-react';

const PreSessionGoal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [goal, setGoal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const state = location.state as any;

  if (!state) {
    navigate('/mentee/browse');
    return null;
  }

  const handleSubmit = () => {
    if (goal.trim().length < 10) {
      toast({
        title: 'Please be more specific',
        description: 'Share at least a short sentence so your mentor can prepare',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/booking/confirm', {
        state: { ...state, preSessionGoal: goal.trim() },
      });
    }, 800);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8">
        <div className="container max-w-xl px-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card className="p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                Get the Most Out of Your Session
              </h1>
              <p className="text-sm text-muted-foreground">
                with <span className="font-semibold text-foreground">{state.alumni?.name}</span>
              </p>
            </div>

            {/* Encouragement */}
            <div className="bg-primary/5 border border-primary/15 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">
                    The more specific you are, the more your mentor can help you
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your mentor will see this before the session so they can prepare tailored advice for you.
                  </p>
                </div>
              </div>
            </div>

            {/* Goal Input */}
            <div className="space-y-3 mb-6">
              <label className="text-sm font-medium text-foreground">
                What is the one thing you want to walk away with from this session?
              </label>
              <Textarea
                placeholder="e.g. I want to understand how to transition from engineering to product management, specifically what skills to build and how to get my first PM role..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="min-h-32 resize-none"
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">{goal.length}/500 characters</p>
                {goal.length >= 10 && (
                  <p className="text-xs text-success">✓ Great, your mentor will love this!</p>
                )}
              </div>
            </div>

            {/* Example chips */}
            <div className="mb-6">
              <p className="text-xs text-muted-foreground mb-2">Need inspiration? Try something like:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'How to prepare for campus placements',
                  'Is an MBA worth it after engineering?',
                  'How to build a strong LinkedIn profile',
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => setGoal(example)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <Button
              className="w-full h-12 text-base font-semibold"
              onClick={handleSubmit}
              disabled={isSubmitting || goal.trim().length < 10}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Continue to Booking'
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-3">
              You can always update this before the session
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PreSessionGoal;
