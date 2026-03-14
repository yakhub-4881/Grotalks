import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Star, CheckCircle2, Sparkles, Edit3, Loader2 } from 'lucide-react';

interface ActionItem {
  id: number;
  title: string;
  description: string;
  isEditing: boolean;
}

const PostSessionActionPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const state = (location.state as any) || {};
  const mentorName = state.mentorName || 'Arjun Singh';
  const preSessionGoal = state.preSessionGoal || 'Career guidance in product management';

  const [actionItems, setActionItems] = useState<ActionItem[]>([
    {
      id: 1,
      title: 'Update your LinkedIn headline',
      description: 'Add "Aspiring Product Manager" and list 2-3 relevant skills to attract recruiters.',
      isEditing: false,
    },
    {
      id: 2,
      title: 'Complete a PM case study',
      description: 'Pick one product you use daily and write a 1-page improvement proposal by next week.',
      isEditing: false,
    },
    {
      id: 3,
      title: 'Reach out to 3 PMs on LinkedIn',
      description: 'Send personalized connection requests mentioning your interest in their company\'s product.',
      isEditing: false,
    },
  ]);

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleEdit = (id: number) => {
    setActionItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isEditing: !item.isEditing } : item))
    );
  };

  const updateItem = (id: number, field: 'title' | 'description', value: string) => {
    setActionItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast({ title: 'Please rate your session', description: 'Tap a star to rate your mentor', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({ title: '🎉 Action plan saved!', description: 'Your session is now fully complete.' });
      navigate('/mentee/dashboard');
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8">
        <div className="container max-w-xl px-4">
          <Card className="p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">Your Session Action Plan</h1>
              <p className="text-sm text-muted-foreground">
                AI-generated based on your goal with <span className="font-semibold text-foreground">{mentorName}</span>
              </p>
            </div>

            {/* Pre-session goal recap */}
            <div className="bg-muted rounded-lg p-3 mb-6">
              <p className="text-xs text-muted-foreground mb-1">Your session goal</p>
              <p className="text-sm text-foreground italic">"{preSessionGoal}"</p>
            </div>

            {/* Action Items */}
            <div className="space-y-4 mb-8">
              {actionItems.map((item, index) => (
                <Card key={item.id} className="p-4 border-l-4 border-l-primary">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      {item.isEditing ? (
                        <Input
                          value={item.title}
                          onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                          className="h-8 text-sm font-semibold"
                        />
                      ) : (
                        <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0" onClick={() => toggleEdit(item.id)}>
                      <Edit3 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  {item.isEditing ? (
                    <Textarea
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="min-h-16 text-sm resize-none"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground pl-8">{item.description}</p>
                  )}
                </Card>
              ))}
            </div>

            {/* Rating Section */}
            <div className="border-t pt-6 mb-6">
              <h2 className="text-base font-semibold text-foreground mb-3 text-center">Rate your session with {mentorName}</h2>
              <div className="flex justify-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-10 w-10 ${
                        star <= (hoveredRating || rating) ? 'fill-bonus text-bonus' : 'text-muted'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-xs text-success mb-4">
                  {rating === 5 && '⭐ Excellent!'}
                  {rating === 4 && '⭐ Great!'}
                  {rating === 3 && '⭐ Good'}
                  {rating === 2 && '⭐ Could be better'}
                  {rating === 1 && '⭐ Needs improvement'}
                </p>
              )}
              <Textarea
                placeholder="Leave a short review (optional)..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="min-h-20 resize-none"
                maxLength={300}
              />
              <p className="text-xs text-muted-foreground mt-1">{review.length}/300 characters</p>
            </div>

            {/* Submit */}
            <Button className="w-full h-12 text-base font-semibold" onClick={handleSubmit} disabled={isSubmitting || rating === 0}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Confirm Action Plan & Submit Rating
                </>
              )}
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PostSessionActionPlan;
