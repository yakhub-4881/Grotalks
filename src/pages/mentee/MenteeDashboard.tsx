import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppContext } from '@/lib/app-context';
import { Calendar, Clock, RotateCcw, Video, Star, XCircle, Users, CheckCircle, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RescheduleDialog } from '@/components/RescheduleDialog';
import { AlumniBrowseSection } from '@/components/AlumniBrowseSection';
import ActionPlanFollowUp from '@/components/mentee/ActionPlanFollowUp';
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
    { label: 'Total Sessions', value: '3', icon: Calendar, color: 'text-primary' },
    { label: 'Hours of Learning', value: '4.5', icon: Clock, color: 'text-bonus' },
    { label: 'Alumni Connected', value: '5', icon: Users, color: 'text-success' },
    { label: 'Avg Rating Given', value: '4.8', icon: Star, color: 'text-secondary' },
  ];

  const upcomingSessions = [
    {
      id: 1,
      alumni: 'Arjun Singh',
      alumniRole: 'Product Manager @ Flipkart',
      topic: 'Product Management Career Path',
      description: 'Discuss PM career transition, skills needed, and how to break into product roles at top companies.',
      date: 'Nov 5, 2024',
      time: '3:00 PM',
      duration: 30,
      status: 'confirmed',
      meetLink: 'https://meet.google.com/xyz-abcd-efg',
      serviceName: '1:1 Career Guidance Call',
      creditsPaid: 2000,
      bookingId: 'GRO-BK-20241105',
    },
  ];

  const handleReschedule = (date: string, time: string, reason: string) => {
    toast({
      title: 'Reschedule Request Sent',
      description: 'Your reschedule request has been sent to the alumni.',
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
      description: 'Your cancellation reason has been sent to the alumni.',
      variant: 'destructive'
    });
    
    setShowDeclineDialog(false);
    setDeclineReason('');
    setSelectedSession(null);
  };

  const recentAlumni = [
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
            <p className="text-sm md:text-base text-muted-foreground">Learn from those who've succeeded</p>
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
                  <Card key={session.id} className="p-4 md:p-6 border-l-4 border-l-success">
                    <div className="flex flex-col gap-4">
                      {/* Status */}
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success flex-shrink-0"></div>
                        <span className="text-xs font-medium text-success uppercase">Confirmed</span>
                      </div>

                      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                        {/* Session Details */}
                        <div className="flex-1 min-w-0 space-y-3">
                          {/* Alumni Info */}
                          <div>
                            <h3 className="text-base md:text-lg font-semibold text-foreground">{session.alumni}</h3>
                            <p className="text-xs text-muted-foreground">{session.alumniRole}</p>
                          </div>

                          {/* Service & Topic */}
                          <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm font-medium text-foreground">{session.serviceName}</span>
                            </div>
                            <p className="text-sm text-foreground font-medium">{session.topic}</p>
                            <p className="text-xs text-muted-foreground">{session.description}</p>
                          </div>

                          {/* Date, Time, Duration, Credits */}
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>{session.date} at {session.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>{session.duration} min</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-success/10 rounded-full px-2.5 py-0.5">
                              <CheckCircle className="h-3.5 w-3.5 text-success" />
                              <span className="text-xs font-medium text-success">Covered by your college</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:flex-shrink-0 lg:justify-start">
                          <Button 
                            className="text-sm h-10"
                            disabled={true}
                          >
                            <Video className="mr-2 h-4 w-4" />
                            Join Call
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
                            variant="outline" 
                            className="text-sm h-10 border-destructive/30 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeclineClick(session)}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Action Plan Follow-Up */}
          <div className="mb-8">
            <ActionPlanFollowUp />
          </div>

          {/* Browse Alumni Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Browse Alumni</h2>
            <AlumniBrowseSection />
          </div>

          {/* Continue with Recent Alumni */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Continue with Recent Alumni</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentAlumni.map((alumni) => (
                <Card 
                  key={alumni.id} 
                  className="p-4 md:p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                      {alumni.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-foreground mb-0.5 truncate">{alumni.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{alumni.role}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="h-4 w-4 fill-bonus text-bonus" />
                      <span className="text-sm font-semibold">{alumni.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{alumni.expertise}</p>
                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/alumni/profile/${alumni.id}`)}
                    >
                      View Profile
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/booking/schedule/${alumni.id}`)}
                    >
                      Book Again
                    </Button>
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
        isAlumni={false}
      />

      {/* Decline Dialog */}
      <AlertDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decline Session</AlertDialogTitle>
            <AlertDialogDescription>
              Please let {selectedSession?.alumni} know why you want to decline this session. This helps alumni understand your needs better.
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
