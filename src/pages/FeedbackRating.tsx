import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Star, ThumbsUp } from 'lucide-react';

const FeedbackRating = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const userType = searchParams.get('type') || 'student'; // student or mentor
  const sessionId = searchParams.get('sessionId') || '1';
  
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const sessionDetails = {
    mentorName: 'Arjun Singh',
    studentName: 'Ravi Kumar',
    duration: '45 minutes',
    topic: 'Product Management Career Guidance'
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: 'Rating Required',
        description: 'Please select a rating before submitting',
        variant: 'destructive'
      });
      return;
    }

    if (feedback.length < 10) {
      toast({
        title: 'Feedback Required',
        description: 'Please provide at least 10 characters of feedback',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Thank You!',
      description: 'Your feedback has been submitted successfully',
    });

    // Navigate back to appropriate dashboard
    if (userType === 'student') {
      navigate('/mentee/dashboard');
    } else {
      navigate('/mentor/dashboard');
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 space-y-6">
          <div className="text-center">
            <ThumbsUp className="h-16 w-16 mx-auto text-success mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Session Completed!</h1>
            <p className="text-muted-foreground">
              {userType === 'student' 
                ? `How was your session with ${sessionDetails.mentorName}?`
                : `How was your session with ${sessionDetails.studentName}?`
              }
            </p>
          </div>

          <Card className="p-4 bg-accent/20 border-accent">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">
                  {userType === 'student' ? 'Mentor' : 'Student'}
                </p>
                <p className="font-semibold">
                  {userType === 'student' ? sessionDetails.mentorName : sessionDetails.studentName}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p className="font-semibold">{sessionDetails.duration}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Topic</p>
                <p className="font-semibold">{sessionDetails.topic}</p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Label className="text-lg">Rate Your Experience*</Label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-12 w-12 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-bonus text-bonus'
                        : 'text-muted'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-success">
                {rating === 5 && '⭐ Excellent!'}
                {rating === 4 && '⭐ Great!'}
                {rating === 3 && '⭐ Good'}
                {rating === 2 && '⭐ Could be better'}
                {rating === 1 && '⭐ Needs improvement'}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-lg">
              {userType === 'student' 
                ? 'Share Your Feedback* (min 10 characters)'
                : 'Internal Feedback* (min 10 characters)'
              }
            </Label>
            <Textarea
              id="feedback"
              placeholder={
                userType === 'student'
                  ? 'What did you like? What could be improved? Your feedback helps the mentor and other students...'
                  : 'Share your thoughts about the session and the student (this feedback is for internal analytics only)...'
              }
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-32 resize-none"
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">{feedback.length}/500 characters</p>
              {feedback.length >= 10 && (
                <p className="text-xs text-success">✓ Thank you!</p>
              )}
            </div>
          </div>

          {userType === 'mentor' && (
            <div className="bg-accent/20 rounded-lg p-4">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> Your feedback about the student is used for internal analytics only and will not be shared with the student.
              </p>
            </div>
          )}

          {userType === 'student' && (
            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> Your feedback will be visible on the mentor's profile and helps other students make informed decisions.
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate(userType === 'student' ? '/mentee/dashboard' : '/mentor/dashboard')}
            >
              Skip for Now
            </Button>
            <Button
              className="flex-1 h-12 text-base font-semibold"
              onClick={handleSubmit}
              disabled={rating === 0 || feedback.length < 10}
            >
              Submit Feedback
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default FeedbackRating;
