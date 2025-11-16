import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  MessageSquare as ChatIcon, 
  CheckCircle,
  XCircle,
  MessageSquare,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/lib/app-context';
import { WalletBalanceWarning } from '@/components/WalletBalanceWarning';
import { PricingDisplay } from '@/components/PricingDisplay';
import { RescheduleDialog } from '@/components/RescheduleDialog';

const MenteeSessions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { walletBalance } = useAppContext();
  
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
      duration: '60 min',
      hourlyRate: 600,
      status: 'confirmed',
      startsIn: '2 hours 30 minutes',
      canJoin: false,
    },
    {
      id: 2,
      mentor: 'Priya Sharma',
      mentorRole: 'Software Engineer @ Google',
      topic: 'Interview Preparation Tips',
      date: 'Nov 10, 2024',
      time: '5:00 PM',
      duration: '45 min',
      hourlyRate: 900,
      status: 'pending',
      startsIn: '5 days',
      canJoin: false,
    },
  ];

  const completedSessions = [
    {
      id: 3,
      mentor: 'Rahul Verma',
      mentorRole: 'Startup Founder',
      topic: 'Startup Funding Guidance',
      date: 'Oct 28, 2024',
      duration: '30 min',
      cost: 360,
      rating: 5,
    },
  ];

  const handleJoinSession = (sessionId: number) => {
    if (walletBalance < 100) {
      toast({
        title: 'Insufficient Balance',
        description: 'Please recharge your wallet before joining',
        variant: 'destructive'
      });
      return;
    }
    navigate(`/session/${sessionId}`);
  };

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
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">My Sessions</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage your mentorship sessions</p>
          </div>

          <WalletBalanceWarning />

          <Tabs defaultValue="upcoming" className="mt-4 md:mt-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
              <TabsTrigger value="upcoming" className="text-sm">Upcoming ({upcomingSessions.length})</TabsTrigger>
              <TabsTrigger value="completed" className="text-sm">Completed ({completedSessions.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-4 md:mt-6 space-y-4">
              {upcomingSessions.map((session) => (
                <Card key={session.id} className="p-4 md:p-6">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
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
                        <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 truncate">{session.mentor}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-1">{session.mentorRole}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                            <span className="truncate">{session.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                            <span className="truncate">{session.time} ({session.duration})</span>
                          </div>
                        </div>
                        {!session.canJoin && (
                          <div className="mt-3 flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                            <AlertCircle className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                            <span>Available in {session.startsIn}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-xs md:text-sm break-words"><strong>Topic:</strong> {session.topic}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs md:text-sm text-muted-foreground">
                          <PricingDisplay hourlyRate={session.hourlyRate} />
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                      <Button
                        className="flex-1 text-sm h-9 md:h-10"
                        disabled={!session.canJoin}
                        onClick={() => handleJoinSession(session.id)}
                      >
                        <ChatIcon className="mr-2 h-4 w-4" />
                        <span className="truncate">{session.canJoin ? 'Join Chat' : 'Locked'}</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="text-sm h-9 md:h-10"
                        onClick={() => {
                          setSelectedSession(session);
                          setRescheduleOpen(true);
                        }}
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Reschedule</span>
                      </Button>
                      <Button
                        variant="destructive"
                        className="text-sm h-9 md:h-10"
                        onClick={() => handleCancelSession(session)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Cancel</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="mt-6 space-y-4">
              {completedSessions.map((session) => (
                <Card key={session.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <h3 className="text-lg font-semibold">{session.mentor}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{session.mentorRole}</p>
                      <p className="text-sm text-foreground mb-2">{session.topic}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{session.date}</span>
                        <span>•</span>
                        <span>{session.duration}</span>
                        <span>•</span>
                        <span className="font-medium text-foreground">₹{session.cost}</span>
                      </div>
                    </div>
                    <div>
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
