import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppContext } from '@/lib/app-context';
import { Calendar, Clock, RotateCcw, Video, Star, TrendingUp, XCircle, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RescheduleDialog } from '@/components/RescheduleDialog';
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
  const { setIsAuthenticated } = useAppContext();
  const { toast } = useToast();
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [selectedSession, setSelectedSession] = useState<any>(null);

  // Set authentication state on mount
  useEffect(() => {
    setIsAuthenticated(true);
  }, [setIsAuthenticated]);

  const stats = [
    { label: 'Sessions Booked', value: '2', icon: Calendar, color: 'text-primary' },
    { label: 'Sessions Completed', value: '1', icon: Star, color: 'text-bonus' },
    { label: 'Hours of Learning', value: '0.5', icon: TrendingUp, color: 'text-success' },
    { label: 'Mentors Connected', value: '3', icon: Users, color: 'text-secondary' },
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentor: 'Arjun Singh',
      topic: 'Product Management Career Path',
      date: 'Nov 5, 2024',
      time: '3:00 PM',
      duration: 30,
      status: 'confirmed',
      meetLink: 'https://meet.google.com/xyz-abcd-efg',
    },
  ];

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
    },
    {
      id: 2,
      name: 'Rahul Verma',
      role: 'Startup Founder',
      expertise: 'Entrepreneurship, Funding',
      rating: 4.8,
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

          {/* Upcoming Sessions */}
          {upcomingSessions.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Upcoming Sessions</h2>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Session Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-success flex-shrink-0"></div>
                          <span className="text-xs font-medium text-success uppercase">Confirmed</span>
                        </div>
                        <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">{session.mentor}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{session.topic}</p>
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
                          onClick={() => setShowRescheduleDialog(true)}
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reschedule
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="text-sm h-10 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeclineClick(session)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

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
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.role}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="h-4 w-4 fill-bonus text-bonus" />
                      <span className="text-sm font-semibold">{mentor.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground mb-4">{mentor.expertise}</p>
                  <div className="flex items-center justify-end pt-4 border-t">
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
