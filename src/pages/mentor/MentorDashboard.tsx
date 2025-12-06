import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { IndianRupee, Calendar, Clock, Star, TrendingUp, User, Video, CheckCircle2, XCircle, Loader2, RotateCcw, ExternalLink } from 'lucide-react';
import { calculateSessionPrice, formatPrice } from '@/lib/college-config';
import { CollegeDisplay } from '@/components/CollegeDisplay';
import { RescheduleDialog } from '@/components/RescheduleDialog';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface BookingRequest {
  id: string;
  mentee: {
    name: string;
    college: string;
  };
  date: string;
  time: string;
  duration: number;
  message?: string;
  status: 'pending' | 'accepted' | 'declined';
  baseRate: number;
  meetLink?: string;
}

const MentorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [requests, setRequests] = useState<BookingRequest[]>([
    {
      id: 'REQ001',
      mentee: { name: 'Ravi Kumar', college: 'vel-tech' },
      date: 'Nov 5, 2025',
      time: '2:00 PM',
      duration: 30,
      message: 'I need career guidance for transitioning into product management',
      status: 'pending',
      baseRate: 3000
    },
    {
      id: 'REQ002',
      mentee: { name: 'Sneha Patel', college: 'iit-bombay' },
      date: 'Nov 6, 2025',
      time: '4:30 PM',
      duration: 45,
      message: 'Looking for advice on masters programs abroad',
      status: 'pending',
      baseRate: 3000
    },
  ]);

  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [declineReason, setDeclineReason] = useState('');
  const [customDeclineReason, setCustomDeclineReason] = useState('');

  const handleAccept = async (request: BookingRequest) => {
    setProcessingId(request.id);
    
    setTimeout(() => {
      setRequests(prev => 
        prev.map(r => r.id === request.id ? { ...r, status: 'accepted' } : r)
      );
      
      toast({
        title: "✓ Request Accepted!",
        description: `Session with ${request.mentee.name} confirmed`,
      });
      
      setProcessingId(null);
    }, 1500);
  };

  const handleDeclineClick = (request: BookingRequest) => {
    setSelectedRequest(request);
    setShowDeclineDialog(true);
  };

  const handleDeclineConfirm = async () => {
    if (!selectedRequest) return;
    
    setProcessingId(selectedRequest.id);
    
    setTimeout(() => {
      setRequests(prev => 
        prev.map(r => r.id === selectedRequest.id ? { ...r, status: 'declined' } : r)
      );
      
      toast({
        title: "Request Declined",
        description: `${selectedRequest.mentee.name} has been notified`,
        variant: "destructive"
      });
      
      setProcessingId(null);
      setShowDeclineDialog(false);
      setSelectedRequest(null);
      setDeclineReason('');
      setCustomDeclineReason('');
    }, 1500);
  };

  const handleRescheduleClick = (request: BookingRequest) => {
    setSelectedRequest(request);
    setShowRescheduleDialog(true);
  };

  const handleRescheduleSubmit = async (date: string, time: string, reason: string) => {
    if (!selectedRequest) return;
    
    setProcessingId(selectedRequest.id);
    
    setTimeout(() => {
      toast({
        title: "Reschedule Proposal Sent",
        description: `${selectedRequest.mentee.name} will review your proposed time`,
      });
      
      setProcessingId(null);
      setShowRescheduleDialog(false);
      setSelectedRequest(null);
    }, 1500);
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const acceptedRequests = requests.filter(r => r.status === 'accepted');

  const stats = [
    { label: 'Total Earnings', value: '₹12,500', icon: IndianRupee, color: 'text-success' },
    { label: 'Sessions This Month', value: '8', icon: Calendar, color: 'text-primary' },
    { label: 'Hours Mentored', value: '10.5', icon: Clock, color: 'text-secondary' },
    { label: 'Average Rating', value: '4.9', icon: Star, color: 'text-bonus' },
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentee: 'Amit Sharma',
      topic: 'Startup funding strategies',
      date: 'Nov 4, 2024',
      time: '2:00 PM',
      duration: 30,
      status: 'confirmed',
      baseRate: 3000,
      meetLink: 'https://meet.google.com/abc-defg-hij',
    },
  ];

  const mentorName = "Priya"; // Get from auth context in real app

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-4 md:py-8">
          {/* Header with Greeting */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              Welcome back, {mentorName}! 👋
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage your mentorship sessions</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-3 md:p-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`h-4 w-4 md:h-5 md:w-5 flex-shrink-0 ${stat.color}`} />
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-1 truncate">{stat.label}</p>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-foreground truncate">{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Upcoming Sessions */}
          {upcomingSessions.length > 0 && (
            <div className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">Upcoming Sessions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingSessions.map((session) => {
                  const sessionTime = new Date(Date.now() + 2 * 60 * 60 * 1000);
                  const now = new Date();
                  const diff = sessionTime.getTime() - now.getTime();
                  const canStart = diff <= 5 * 60 * 1000;
                  const hours = Math.floor(diff / (1000 * 60 * 60));
                  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                  const sessionPrice = calculateSessionPrice(session.baseRate, session.duration);
                  
                  return (
                    <Card key={session.id} className="p-4 md:p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-2 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-success flex-shrink-0"></div>
                              <span className="text-xs font-medium text-success uppercase">Confirmed</span>
                            </div>
                            <h3 className="text-base md:text-lg font-semibold text-foreground truncate">{session.mentee}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{session.topic}</p>
                          </div>
                        </div>

                        <div className="space-y-2 py-3 border-y text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{session.date} at {session.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{session.duration} minutes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IndianRupee className="h-4 w-4 text-success flex-shrink-0" />
                            <span className="text-foreground font-medium">{formatPrice(sessionPrice)}</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button 
                            className="flex-1 text-sm h-9"
                            disabled={!canStart}
                          >
                            <Video className="mr-2 h-4 w-4" />
                            Join Call
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 text-sm h-9"
                            onClick={() => handleRescheduleClick({ 
                              id: session.id.toString(), 
                              mentee: { name: session.mentee, college: 'iit-bombay' }, 
                              date: session.date, 
                              time: session.time, 
                              duration: session.duration, 
                              status: 'accepted',
                              baseRate: session.baseRate
                            })}
                          >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}


          {/* Pending Requests - Separate row below */}
          {pendingRequests.length > 0 && (
            <div className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                Pending Requests
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingRequests.map((request) => {
                    const sessionPrice = calculateSessionPrice(request.baseRate, request.duration);
                    const estimatedEarning = sessionPrice;
                    
                    return (
                      <Card key={request.id} className="p-4 md:p-6 border-primary/20 bg-card h-full">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                                {request.mentee.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-semibold text-base truncate">{request.mentee.name}</div>
                                <CollegeDisplay collegeName={request.mentee.college} variant="desktop" />
                              </div>
                            </div>
                            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-xs w-fit">
                              ⏳ PENDING
                            </Badge>
                          </div>

                          {/* Session Details */}
                          <div className="space-y-2 py-3 border-y text-xs">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-primary flex-shrink-0" />
                              <span className="text-muted-foreground truncate">{request.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-primary flex-shrink-0" />
                              <span className="text-muted-foreground truncate">{request.time} · {request.duration}min</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <IndianRupee className="h-3 w-3 text-success flex-shrink-0" />
                              <span className="text-muted-foreground truncate">{formatPrice(estimatedEarning)}</span>
                            </div>
                          </div>

                          {/* Message */}
                          {request.message && (
                            <div className="bg-muted/50 rounded-lg p-3">
                              <p className="text-xs text-muted-foreground line-clamp-3">{request.message}</p>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2">
                            <Button 
                              className="w-full text-sm h-9 bg-success hover:bg-success/90"
                              onClick={() => handleAccept(request)}
                              disabled={processingId === request.id}
                            >
                              {processingId === request.id ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Accept
                                </>
                              )}
                            </Button>
                            <Button 
                              variant="outline"
                              className="w-full text-sm h-9"
                              onClick={() => handleRescheduleClick(request)}
                              disabled={processingId === request.id}
                            >
                              <RotateCcw className="mr-2 h-4 w-4" />
                              Propose Time
                            </Button>
                            <Button 
                              variant="destructive"
                              className="w-full text-sm h-9"
                              onClick={() => handleDeclineClick(request)}
                              disabled={processingId === request.id}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Decline
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
          {acceptedRequests.length > 0 && (
            <div className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">Upcoming Confirmed Sessions</h2>
              <div className="space-y-4">
                {acceptedRequests.map((session) => {
                  const sessionTime = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now
                  const now = new Date();
                  const diff = sessionTime.getTime() - now.getTime();
                  const canStart = diff <= 5 * 60 * 1000; // 5 minutes before
                  const hours = Math.floor(diff / (1000 * 60 * 60));
                  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                  
                  return (
                    <Card key={session.id} className="p-4 md:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="space-y-2 min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-success flex-shrink-0"></div>
                            <span className="text-xs font-medium text-success uppercase">Confirmed</span>
                          </div>
                          <h3 className="text-base md:text-lg font-semibold text-foreground truncate">{session.mentee.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{session.message}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
                            <span className="text-foreground font-medium whitespace-nowrap">{session.date}</span>
                            <span className="text-muted-foreground whitespace-nowrap">{session.time}</span>
                          </div>
                          {!canStart && (
                            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md w-fit">
                              <Clock className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                              <span>Session starts in {hours}h {minutes}m</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                          <Button 
                            className="text-sm h-9 md:h-10"
                            onClick={() => navigate(`/session/${session.id}`)}
                            disabled={!canStart}
                          >
                            <Video className="mr-2 h-4 w-4" />
                            {canStart ? 'Join Meeting' : 'Locked'}
                          </Button>
                          <Button variant="outline" className="text-sm h-9 md:h-10">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {pendingRequests.length === 0 && acceptedRequests.length === 0 && (
            <Card className="p-8 md:p-12 text-center mb-6 md:mb-8">
              <User className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">No Requests Yet</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Booking requests will appear here when students request sessions
              </p>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <Button variant="outline" className="h-12 md:h-14 text-sm md:text-base font-medium" onClick={() => navigate('/mentor/withdraw')}>
              <TrendingUp className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              <span className="truncate">View Earnings</span>
            </Button>
            <Button variant="outline" className="h-12 md:h-14 text-sm md:text-base font-medium" onClick={() => navigate('/mentor/manage-availability')}>
              <Calendar className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              <span className="truncate">Manage Availability</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-12 md:h-14 text-sm md:text-base font-medium" 
              onClick={() => {
                toast({
                  title: "Reviews & Ratings",
                  description: "Your average rating is 4.9 stars from 28 reviews",
                });
              }}
            >
              <Star className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              <span className="truncate">View Reviews</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Decline Dialog */}
      <AlertDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Why are you declining?</AlertDialogTitle>
            <AlertDialogDescription>
              Please let {selectedRequest?.mentee.name} know why you're declining this request
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 space-y-4">
            <div>
              <Label>Select a reason</Label>
              <Select value={declineReason} onValueChange={setDeclineReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-available">Not available at that time</SelectItem>
                  <SelectItem value="different-expertise">Different expertise required</SelectItem>
                  <SelectItem value="too-many">Too many sessions today</SelectItem>
                  <SelectItem value="other">Other reason</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {declineReason === 'other' && (
              <div className="space-y-2">
                <Label htmlFor="custom-reason">Please specify the reason*</Label>
                <Textarea
                  id="custom-reason"
                  placeholder="Please explain why you're declining... (minimum 10 characters)"
                  value={customDeclineReason}
                  onChange={(e) => setCustomDeclineReason(e.target.value)}
                  className="min-h-24 resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground">
                  {customDeclineReason.length}/500 characters (minimum 10)
                </p>
              </div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setDeclineReason('');
              setCustomDeclineReason('');
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeclineConfirm}
              disabled={!declineReason || (declineReason === 'other' && customDeclineReason.trim().length < 10)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {processingId ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Declining...
                </>
              ) : (
                'Send Decline'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reschedule Dialog */}
      <RescheduleDialog
        open={showRescheduleDialog}
        onOpenChange={setShowRescheduleDialog}
        onSubmit={handleRescheduleSubmit}
        isMentor={true}
      />
    </Layout>
  );
};

export default MentorDashboard;
