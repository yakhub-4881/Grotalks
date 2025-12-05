import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Video,
  CheckCircle,
  XCircle,
  MessageSquare,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RescheduleDialog } from '@/components/RescheduleDialog';

const MenteeSessions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const upcomingSessions = [
    {
      id: 1,
      mentor: 'Arjun Singh',
      mentorRole: 'Product Manager @ Flipkart',
      topic: 'Product Management Career Path',
      date: 'Nov 5, 2024',
      time: '3:00 PM',
      duration: 60,
      status: 'confirmed',
      meetLink: 'https://meet.google.com/xyz-abcd-efg',
    },
    {
      id: 2,
      mentor: 'Priya Sharma',
      mentorRole: 'Software Engineer @ Google',
      topic: 'Interview Preparation Tips',
      date: 'Nov 10, 2024',
      time: '5:00 PM',
      duration: 45,
      status: 'pending',
      meetLink: 'https://meet.google.com/abc-defg-hij',
    },
  ];

  const completedSessions = [
    {
      id: 3,
      mentor: 'Rahul Verma',
      mentorRole: 'Startup Founder',
      topic: 'Startup Funding Guidance',
      date: 'Oct 28, 2024',
      duration: 30,
      rating: 5,
    },
  ];

  const handleCancelSession = (session: any) => {
    toast({
      title: 'Session Cancelled',
      description: `Your session with ${session.mentor} has been cancelled`,
    });
  };

  const handleReschedule = (date: string, time: string, reason: string) => {
    toast({
      title: 'Reschedule Request Sent',
      description: 'The mentor will review your request',
    });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="mb-4 md:mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/mentee/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">My Sessions</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage your mentorship sessions</p>
          </div>

          <Tabs defaultValue="upcoming" className="mt-4 md:mt-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
              <TabsTrigger value="upcoming" className="text-sm">Upcoming ({upcomingSessions.length})</TabsTrigger>
              <TabsTrigger value="completed" className="text-sm">Completed ({completedSessions.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-4 md:mt-6 space-y-4">
              {upcomingSessions.map((session) => (
                <Card key={session.id} className="p-4 md:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Session Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          session.status === 'confirmed' ? 'bg-success' : 'bg-yellow-500'
                        }`}></div>
                        <span className={`text-xs font-medium uppercase ${
                          session.status === 'confirmed' ? 'text-success' : 'text-yellow-600'
                        }`}>
                          {session.status}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">{session.mentor}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-3">{session.topic}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{session.date} at {session.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{session.duration} min</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
                      <Button 
                        className="text-sm h-10"
                        onClick={() => window.open(session.meetLink, '_blank')}
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Join Google Meet
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-sm h-10"
                        onClick={() => {
                          setSelectedSession(session);
                          setRescheduleOpen(true);
                        }}
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reschedule
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="text-sm h-10 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleCancelSession(session)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="mt-6 space-y-4">
              {completedSessions.map((session) => (
                <Card key={session.id} className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <h3 className="text-base md:text-lg font-semibold">{session.mentor}</h3>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground mb-1">{session.mentorRole}</p>
                      <p className="text-sm text-foreground mb-3">{session.topic}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span>{session.date}</span>
                        <span>•</span>
                        <span>{session.duration} min</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {session.rating ? (
                        <div className="flex items-center gap-1 text-bonus">
                          {'⭐'.repeat(session.rating)}
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/feedback?type=student&sessionId=${session.id}`)}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Rate Session
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {completedSessions.length === 0 && (
                <Card className="p-12 text-center">
                  <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Completed Sessions</h3>
                  <p className="text-muted-foreground">
                    Your completed sessions will appear here
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <RescheduleDialog
        open={rescheduleOpen}
        onOpenChange={setRescheduleOpen}
        onSubmit={handleReschedule}
        isMentor={false}
      />
    </Layout>
  );
};

export default MenteeSessions;
