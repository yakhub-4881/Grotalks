import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Video, Calendar, Clock, ExternalLink, CheckCircle2, Sparkles } from 'lucide-react';


const ChatSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  // Mock session data - in real app this would come from the booking
  const session = {
    alumniName: 'Arjun Singh',
    alumniRole: 'Product Manager @ Flipkart',
    date: 'Dec 8, 2025',
    time: '2:00 PM',
    duration: 30,
    meetLink: 'https://meet.google.com/abc-defg-hij',
    status: 'upcoming'
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8">
        <div className="container max-w-2xl px-4">
          <Card className="p-6 md:p-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Session Confirmed!</h1>
            <p className="text-muted-foreground mb-6">Your video call with {session.alumniName} is scheduled</p>

            <div className="bg-muted rounded-lg p-4 mb-6 space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">{session.date}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">{session.time} • {session.duration} min</span>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full mb-4"
              onClick={() => window.open(session.meetLink, '_blank')}
            >
              <Video className="mr-2 h-5 w-5" />
              Join Google Meet
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/mentee/sessions')}
            >
              View All Sessions
            </Button>

            <div className="flex items-start gap-2 text-left bg-muted rounded-lg p-3 mt-6">
              <Sparkles className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Grotalks AI will help you create goals and tasks to work on after this session — it never records your conversation.
              </p>
            </div>

          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ChatSession;
