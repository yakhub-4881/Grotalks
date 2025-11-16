import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Calendar, Clock, MessageSquare, CheckCircle2, XCircle, Loader2, Coins } from 'lucide-react';
import { calculatePerMinuteRate, calculateSessionCost, getCollegeDisplay } from '@/lib/college-config';
import { CollegeDisplay } from '@/components/CollegeDisplay';
import { PricingDisplay } from '@/components/PricingDisplay';
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
  hourlyRate: number;
}

const MentorRequests = () => {
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
      hourlyRate: 600
    },
    {
      id: 'REQ002',
      mentee: { name: 'Sneha Patel', college: 'iit-bombay' },
      date: 'Nov 6, 2025',
      time: '4:30 PM',
      duration: 45,
      message: 'Looking for advice on masters programs abroad',
      status: 'pending',
      hourlyRate: 600
    },
  ]);

  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [declineReason, setDeclineReason] = useState('');

  const handleAccept = async (request: BookingRequest) => {
    setProcessingId(request.id);
    
    // Simulate API call
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
    
    // Simulate API call
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
    }, 1500);
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const acceptedRequests = requests.filter(r => r.status === 'accepted');

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8">
        <div className="container max-w-5xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Session Requests</h1>
            <p className="text-muted-foreground">Manage incoming booking requests</p>
          </div>

          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                ⏳ Pending Requests 
                <Badge variant="secondary">{pendingRequests.length} new</Badge>
              </h2>
              <div className="space-y-4">
                {pendingRequests.map((request) => {
                  const perMinuteRate = calculatePerMinuteRate(request.hourlyRate);
                  const estimatedEarning = calculateSessionCost(perMinuteRate, request.duration);
                  
                  return (
                    <Card key={request.id} className="p-6 border-primary/20 bg-card">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">
                                {request.mentee.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-semibold text-lg">{request.mentee.name}</div>
                                <CollegeDisplay collegeName={request.mentee.college} variant="desktop" />
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                            ⏳ PENDING YOUR RESPONSE
                          </Badge>
                        </div>

                        {/* Session Details */}
                        <div className="grid grid-cols-3 gap-4 py-4 border-y">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <div>
                              <div className="text-xs text-muted-foreground">Date</div>
                              <div className="text-sm font-medium">{request.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <div>
                              <div className="text-xs text-muted-foreground">Time</div>
                              <div className="text-sm font-medium">{request.time} ({request.duration} min)</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Coins className="h-4 w-4 text-success" />
                            <div>
                              <div className="text-xs text-muted-foreground">Estimated Earning</div>
                              <div className="text-sm font-bold text-success">₹{estimatedEarning.toFixed(2)}</div>
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        {request.message && (
                          <div className="bg-muted rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Message from mentee:</div>
                                <div className="text-sm">{request.message}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button
                            className="flex-1"
                            onClick={() => handleAccept(request)}
                            disabled={processingId === request.id}
                          >
                            {processingId === request.id ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Accepting...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Accept
                              </>
                            )}
                          </Button>
                          <Button
                            variant="destructive"
                            className="flex-1"
                            onClick={() => handleDeclineClick(request)}
                            disabled={processingId === request.id}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Decline
                          </Button>
                        </div>

                        {/* Time Limit */}
                        <p className="text-xs text-muted-foreground text-center">
                          ⏰ Please respond within 1 hour
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Accepted Requests */}
          {acceptedRequests.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                ✓ Confirmed Sessions
              </h2>
              <div className="space-y-4">
                {acceptedRequests.map((request) => {
                  const perMinuteRate = calculatePerMinuteRate(request.hourlyRate);
                  const estimatedEarning = calculateSessionCost(perMinuteRate, request.duration);
                  
                  return (
                    <Card key={request.id} className="p-6 border-success/20 bg-success/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-success/10 text-success rounded-full flex items-center justify-center">
                            ✓
                          </div>
                          <div>
                            <div className="font-semibold">{request.mentee.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {request.date} • {request.time} • {request.duration} min
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Your Earning</div>
                          <div className="text-lg font-bold text-success">₹{estimatedEarning.toFixed(2)}</div>
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
            <Card className="p-12 text-center">
              <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Requests Yet</h3>
              <p className="text-muted-foreground">
                Booking requests will appear here when mentees request sessions
              </p>
            </Card>
          )}
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
          <div className="my-4">
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
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeclineReason('')}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeclineConfirm}
              disabled={!declineReason}
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
    </Layout>
  );
};

export default MentorRequests;