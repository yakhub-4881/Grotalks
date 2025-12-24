import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Star, Clock, Calendar, CheckCircle, MessageSquare } from 'lucide-react';
import { collegeMap } from '@/lib/college-config';

const AlumniSessionDetails = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { toast } = useToast();

  // Mock session data - in real app, fetch from API
  const session = {
    id: sessionId,
    mentee: {
      name: 'Kavya Narayan',
      college: 'iit-bombay',
      collegeId: 'IITB1234',
      branch: 'Computer Science & Engineering',
      batch: '2020-2024',
      languages: 'English, Hindi',
      guidance: 'Career switch to product'
    },
    topic: 'Career switch to product',
    date: 'Oct 18, 2024',
    duration: 45,
    ratingGiven: 4,
    feedback: 'Great session! Kavya was very engaged and asked insightful questions about product management roles. She has a strong technical background and clear career goals.',
    menteeFeedback: 'Excellent guidance! The session helped me understand the product management landscape better. Highly recommend!',
    menteeRating: 5
  };

  const [rating, setRating] = useState(session.ratingGiven || 0);
  const [feedback, setFeedback] = useState(session.feedback || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitRating = async () => {
    if (rating === 0) {
      toast({
        title: 'Rating Required',
        description: 'Please select a rating for the student',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    // Mock API call
    setTimeout(() => {
      toast({
        title: 'Rating Submitted',
        description: 'Thank you for your feedback!',
      });
      setIsSubmitting(false);
      navigate('/alumni/dashboard');
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8">
        <div className="container max-w-4xl px-4">
          <Button variant="ghost" onClick={() => navigate('/alumni/dashboard')} className="mb-4 md:mb-6 text-sm md:text-base">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="space-y-6">
            {/* Session Header */}
            <Card className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">
                  {session.mentee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">{session.topic}</h1>
                  <p className="text-sm md:text-base text-muted-foreground mb-3">Session with {session.mentee.name}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{session.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-success">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Student Details */}
            <Card className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Student Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="font-medium">College</Label>
                  <p className="text-muted-foreground">{collegeMap[session.mentee.college]?.fullName || session.mentee.college}</p>
                </div>
                <div>
                  <Label className="font-medium">College ID</Label>
                  <p className="text-muted-foreground">{session.mentee.collegeId}</p>
                </div>
                <div>
                  <Label className="font-medium">Branch</Label>
                  <p className="text-muted-foreground">{session.mentee.branch}</p>
                </div>
                <div>
                  <Label className="font-medium">Batch</Label>
                  <p className="text-muted-foreground">{session.mentee.batch}</p>
                </div>
                <div>
                  <Label className="font-medium">Languages</Label>
                  <p className="text-muted-foreground">{session.mentee.languages}</p>
                </div>
                <div>
                  <Label className="font-medium">Guidance Needed</Label>
                  <p className="text-muted-foreground">{session.mentee.guidance}</p>
                </div>
              </div>
            </Card>

            {/* Tabs for Feedback and Rating */}
            <Tabs defaultValue="feedback" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="feedback">Session Feedback</TabsTrigger>
                <TabsTrigger value="rate">Rate Student</TabsTrigger>
              </TabsList>

              <TabsContent value="feedback" className="space-y-4">
                <Card className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Session Summary
                  </h3>

                  {session.feedback ? (
                    <div className="space-y-4">
                      <div>
                        <Label className="font-medium">Your Feedback</Label>
                        <p className="text-muted-foreground mt-1">{session.feedback}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Label className="font-medium">Your Rating:</Label>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < session.ratingGiven ? 'fill-bonus text-bonus' : 'text-muted-foreground'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No feedback submitted yet.</p>
                  )}
                </Card>

                {session.menteeFeedback && (
                  <Card className="p-4 md:p-6">
                    <h3 className="text-lg font-semibold mb-4">Student's Feedback</h3>
                    <div className="space-y-2">
                      <p className="text-muted-foreground">{session.menteeFeedback}</p>
                      <div className="flex items-center gap-2">
                        <Label className="font-medium">Student Rating:</Label>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < session.menteeRating ? 'fill-bonus text-bonus' : 'text-muted-foreground'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="rate" className="space-y-4">
                <Card className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4">Rate Your Experience</h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Rate the student (required)</Label>
                      <div className="flex items-center gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-8 w-8 ${star <= rating ? 'fill-bonus text-bonus' : 'text-muted-foreground'}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="feedback" className="text-sm font-medium">Share your feedback (optional)</Label>
                      <Textarea
                        id="feedback"
                        placeholder="How was your experience mentoring this student?"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="mt-2 min-h-24"
                        maxLength={500}
                      />
                      <p className="text-xs text-muted-foreground mt-1">{feedback.length}/500 characters</p>
                    </div>

                    <Button
                      onClick={handleSubmitRating}
                      disabled={isSubmitting || rating === 0}
                      className="w-full"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AlumniSessionDetails;