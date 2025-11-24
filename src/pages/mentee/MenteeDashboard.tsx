import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppContext } from '@/lib/app-context';
import { Search, Calendar, User, Wallet, Plus, Clock, RotateCcw, MessageSquare, Star, TrendingUp, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RescheduleDialog } from '@/components/RescheduleDialog';
import { PricingDisplay } from '@/components/PricingDisplay';
import { MentorBrowseSection } from '@/components/MentorBrowseSection';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const MenteeDashboard = () => {
  const navigate = useNavigate();
  const { walletBalance, setIsAuthenticated } = useAppContext();
  const { toast } = useToast();
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [timeUntilSession, setTimeUntilSession] = useState('');

  // Set authentication state on mount
  useEffect(() => {
    setIsAuthenticated(true);
  }, [setIsAuthenticated]);

  const stats = [
    { label: 'Wallet Balance', value: `₹${walletBalance}`, icon: Wallet, color: 'text-success' },
    { label: 'Sessions Booked', value: '2', icon: Calendar, color: 'text-primary' },
    { label: 'Sessions Completed', value: '1', icon: Star, color: 'text-bonus' },
    { label: 'Hours of Learning', value: '0.5', icon: TrendingUp, color: 'text-secondary' },
  ];

  const activeSessions = [
    {
      id: 0,
      mentor: 'Priya Sharma',
      topic: 'Software Engineering Interview Prep',
      date: 'Nov 4, 2024',
      time: '1:00 PM - 2:00 PM',
      status: 'active',
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentor: 'Arjun Singh',
      topic: 'Product Management Career Path',
      date: 'Nov 5, 2024',
      time: '3:00 PM - 4:00 PM',
      status: 'confirmed',
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours from now
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (upcomingSessions[0]?.startTime) {
        const now = new Date();
        const sessionTime = new Date(upcomingSessions[0].startTime);
        const diff = sessionTime.getTime() - now.getTime();
        
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeUntilSession(`${hours}h ${minutes}m`);
        } else {
          setTimeUntilSession('Session can start now');
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const canJoinSession = (session: any) => {
    const now = new Date();
    const sessionTime = new Date(session.startTime);
    const diff = sessionTime.getTime() - now.getTime();
    return diff <= 5 * 60 * 1000; // Can join 5 minutes before
  };

  const handleJoinSession = (sessionId: number) => {
    if (walletBalance < 100) {
      toast({
        title: 'Insufficient Balance',
        description: 'Please recharge your wallet before joining',
        variant: 'destructive'
      });
      navigate('/mentee/wallet/recharge');
      return;
    }
    navigate(`/session/${sessionId}`);
  };

  const handleReschedule = (date: string, time: string, reason: string) => {
    toast({
      title: 'Reschedule Request Sent',
      description: 'Your reschedule request has been sent to the mentor.',
    });
    setShowRescheduleDialog(false);
  };

  const handleDeclineClick = (session: any) => {
    setSelectedSession(session);
    setShowDeclineDialog(true);
  };

  const handleDeclineConfirm = () => {
    if (declineReason.trim().length < 10) {
      toast({
        title: 'Reason Required',
        description: 'Please provide at least 10 characters explaining why you want to decline',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Session Declined',
      description: 'Your cancellation reason has been sent to the mentor.',
      variant: 'destructive'
    });
    
    setShowDeclineDialog(false);
    setDeclineReason('');
    setSelectedSession(null);
  };

  const recentMentors = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Software Engineer @ Google',
      expertise: 'Masters Abroad, Interview Prep',
      rating: 4.9,
      hourlyRate: 350,
    },
    {
      id: 2,
      name: 'Rahul Verma',
      role: 'Startup Founder',
      expertise: 'Entrepreneurship, Funding',
      rating: 4.8,
      hourlyRate: 400,
    },
  ];

  const studentName = "Ravi"; // Get from auth context in real app

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8">
        <div className="container mx-auto px-4">
          {/* Header with Greeting */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              Welcome back, {studentName}! 👋
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">Here's your mentorship overview</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-3 md:p-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.color} flex-shrink-0`} />
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{stat.label}</p>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-foreground truncate">{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Sessions Grid - Side by side on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Active Session */}
            {activeSessions.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Active Session</h2>
                <div className="space-y-4">
                  {activeSessions.map((session) => {
                    const lowBalance = walletBalance < 100;
                  
                    return (
                      <Card key={session.id} className="p-4 md:p-6 border-success/30 bg-success/5 h-full">
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="space-y-2 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-success animate-pulse flex-shrink-0"></div>
                              <span className="text-xs font-medium text-success uppercase">Live Now</span>
                            </div>
                            <h3 className="text-base md:text-lg font-semibold text-foreground truncate">{session.mentor}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{session.topic}</p>
                            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
                              <span className="text-foreground font-medium whitespace-nowrap">{session.date}</span>
                              <span className="text-muted-foreground whitespace-nowrap">{session.time}</span>
                            </div>
                            {lowBalance && (
                              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs md:text-sm bg-warning/10 border border-warning/30 px-3 py-3 rounded-md">
                                <div className="flex items-start gap-2 flex-1 text-warning-foreground/90">
                                  <Wallet className="h-4 w-4 flex-shrink-0 mt-0.5 text-warning" />
                                  <span className="text-foreground">Low wallet balance! Recharge now to avoid session disruption.</span>
                                </div>
                                <Button 
                                  size="sm" 
                                  className="h-8 self-start sm:self-center whitespace-nowrap bg-warning hover:bg-warning/90 text-warning-foreground"
                                  onClick={() => navigate('/mentee/wallet/recharge')}
                                >
                                  <Wallet className="mr-2 h-3 w-3" />
                                  Recharge
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                          <Button 
                            onClick={() => handleJoinSession(session.id)} 
                            className="flex-1 text-sm h-9 md:h-10 bg-success hover:bg-success/90"
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Join Chat
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 text-sm h-9 md:h-10"
                            onClick={() => setShowRescheduleDialog(true)}
                          >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            <span className="truncate">Reschedule</span>
                          </Button>
                          <Button 
                            variant="destructive" 
                            className="flex-1 text-sm h-9 md:h-10"
                            onClick={() => handleDeclineClick(session)}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            <span className="truncate">End Session</span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Upcoming Sessions */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Upcoming Sessions</h2>
            <div className="space-y-4">
              {upcomingSessions.map((session) => {
                const sessionCanJoin = canJoinSession(session);
                const lowBalance = walletBalance < 100;
                
                  return (
                    <Card key={session.id} className="p-4 md:p-6 h-full">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="space-y-2 flex-1 min-w-0">
                          <h3 className="text-base md:text-lg font-semibold text-foreground truncate">{session.mentor}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{session.topic}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
                            <span className="text-foreground font-medium whitespace-nowrap">{session.date}</span>
                            <span className="text-muted-foreground whitespace-nowrap">{session.time}</span>
                          </div>
                          {!sessionCanJoin && (
                            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md w-fit">
                              <Clock className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                              <span>Session starts in {timeUntilSession}</span>
                            </div>
                          )}
                          {lowBalance && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs md:text-sm bg-warning/10 border border-warning/30 px-3 py-3 rounded-md">
                              <div className="flex items-start gap-2 flex-1 text-warning-foreground/90">
                                <Wallet className="h-4 w-4 flex-shrink-0 mt-0.5 text-warning" />
                                <span className="text-foreground">Low wallet balance! Recharge now to avoid session disruption.</span>
                              </div>
                              <Button 
                                size="sm" 
                                className="h-8 self-start sm:self-center whitespace-nowrap bg-warning hover:bg-warning/90 text-warning-foreground"
                                onClick={() => navigate('/mentee/wallet/recharge')}
                              >
                                <Wallet className="mr-2 h-3 w-3" />
                                Recharge
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                        <Button 
                          onClick={() => handleJoinSession(session.id)} 
                          className="flex-1 text-sm h-9 md:h-10"
                          disabled={!sessionCanJoin}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          {sessionCanJoin ? 'Join Chat' : 'Locked'}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 text-sm h-9 md:h-10"
                          onClick={() => setShowRescheduleDialog(true)}
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          <span className="truncate">Reschedule</span>
                        </Button>
                        <Button 
                          variant="destructive" 
                          className="flex-1 text-sm h-9 md:h-10"
                          onClick={() => handleDeclineClick(session)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          <span className="truncate">Decline</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Browse Mentors Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Browse Mentors</h2>
            <MentorBrowseSection />
          </div>

          {/* Continue with Recent Mentors */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Continue with Recent Mentors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentMentors.map((mentor) => (
                <Card 
                  key={mentor.id} 
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/mentor/profile/${mentor.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-bonus text-bonus" />
                      <span className="text-sm font-semibold">{mentor.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground mb-4">{mentor.expertise}</p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <PricingDisplay hourlyRate={mentor.hourlyRate} variant="inline" />
                    <Button size="sm">Book Again</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reschedule Dialog */}
      <RescheduleDialog
        open={showRescheduleDialog}
        onOpenChange={setShowRescheduleDialog}
        onSubmit={handleReschedule}
        isMentor={false}
      />

      {/* Decline Dialog */}
      <AlertDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decline Session</AlertDialogTitle>
            <AlertDialogDescription>
              Please let {selectedSession?.mentor} know why you want to decline this session. This helps mentors understand your needs better.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 space-y-2">
            <Label htmlFor="decline-reason">Reason for declining*</Label>
            <Textarea
              id="decline-reason"
              placeholder="Please explain why you need to decline... (minimum 10 characters)"
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="min-h-24 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {declineReason.length}/500 characters
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setDeclineReason('');
              setSelectedSession(null);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeclineConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Decline Session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default MenteeDashboard;
