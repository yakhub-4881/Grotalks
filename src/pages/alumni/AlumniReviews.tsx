import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ArrowLeft, MessageSquare, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sampleReviews = [
  {
    id: 1,
    student: 'Ravi Kumar',
    topic: 'Product Management Career Path',
    rating: 5,
    feedback: 'Super actionable tips and clarity on breaking into PM roles.',
    date: 'Oct 28, 2024',
  },
  {
    id: 2,
    student: 'Sneha Patel',
    topic: 'Masters abroad planning',
    rating: 4,
    feedback: 'Great walkthrough of scholarship options and timelines.',
    date: 'Oct 20, 2024',
  },
];

const AlumniReviews = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <div className="flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={() => navigate('/alumni/dashboard')} className="h-10 px-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Award className="h-4 w-4 text-primary" />
              <span>Lifetime rating: 4.9 (28 reviews)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Reviews & Ratings</h1>
              <p className="text-muted-foreground">See what students said about your past sessions</p>
            </div>
            <Button className="h-11" onClick={() => navigate('/feedback?type=alumni')}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Leave internal feedback
            </Button>
          </div>

          <div className="grid gap-4 md:gap-5">
            {sampleReviews.map((review) => (
              <Card key={review.id} className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-bonus">
                        {'⭐'.repeat(review.rating)}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground">{review.topic}</h3>
                    <p className="text-sm text-muted-foreground">Student: {review.student}</p>
                    <p className="text-sm text-foreground">{review.feedback}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="h-10 md:h-11"
                    onClick={() => navigate(`/feedback?type=alumni&sessionId=${review.id}`)}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Respond / Re-rate
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AlumniReviews;

