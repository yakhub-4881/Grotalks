import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Calendar, Clock, MessageSquare, CheckCircle2, XCircle, Loader2, Video, ExternalLink } from 'lucide-react';
import { formatPrice, calculateSessionPrice } from '@/lib/college-config';
import { CollegeDisplay } from '@/components/CollegeDisplay';
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
  baseRate: number;
  meetLink?: string;
  isPaid: boolean;
}

const AlumniRequests = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [requests, setRequests] = useState<BookingRequest[]>([
    {
      id: 'REQ001',
      mentee: { name: 'Ravi Kumar', college: 'vel-tech' },
      date: 'Dec 8, 2025',
      time: '2:00 PM',
      duration: 30,
      message: 'I need career guidance for transitioning into product management',
      status: 'pending',
      baseRate: 500,
      isPaid: true
    },
    {
      id: 'REQ002',
      mentee: { name: 'Sneha Patel', college: 'iit-bombay' },
      date: 'Dec 10, 2025',
      time: '4:30 PM',
      duration: 60,
      message: 'Looking for advice on masters programs abroad',
      status: 'pending',
      baseRate: 500,
      isPaid: true
    },
  ]);

  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [declineReason, setDeclineReason] = useState('');

  const handleAccept = async (request: BookingRequest) => {
    setProcessingId(request.id);
    
    setTimeout(() => {
      setRequests(prev => 
        prev.map(r => r.id === request.id ? { 
          ...r, 
          status: 'accepted',
          meetLink: 'https://meet.google.com/abc-defg-hij'
        } : r)
      );
      
      toast({
        title: "✓ Session Confirmed!",
        description: `Video call with ${request.mentee.name} scheduled. Meeting link sent!`,
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
        title: "Session Declined",
        description: `${selectedRequest.mentee.name} has been notified and refunded`,
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
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8">
        <div className="container max-w-5xl px-4">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Session Requests</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage incoming booking requests</p>
          </div>

          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
                ⏳ Pending Requests 
                <Badge variant="secondary">{pendingRequests.length} new</Badge>
              </h2>
              <div className="space-y-4">
                {pendingRequests.map((request) => {
                  const sessionPrice = calculateSessionPrice(request.baseRate, request.duration);
                  
                  return (
                    <Card key={request.id} className="p-4 md:p-6 border-primary/20 bg-card">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm md:text-base">
                                {request.mentee.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-semibold text-base md:text-lg">{request.mentee.name}</div>
                                <CollegeDisplay collegeName={request.mentee.college} variant="desktop" />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-xs">
                              ⏳ PENDING
                            </Badge>
                            {request.isPaid && (
                              <Badge className="bg-success/10 text-success border-success/20 text-xs">
                                ✓ PAID
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Session Details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 py-4 border-y">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="text-xs text-muted-foreground">Date</div>
                              <div className="text-sm font-medium truncate">{request.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="text-xs text-muted-foreground">Time</div>
                              <div className="text-sm font-medium truncate">{request.time}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 text-primary flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="text-xs text-muted-foreground">Duration</div>
                              <div className="text-sm font-medium">{request.duration} min</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 text-success flex-shrink-0 font-bold text-xs">₹</div>
                            <div className="min-w-0">
                              <div className="text-xs text-muted-foreground">Your Earning</div>
                              <div className="text-sm font-bold text-success">{formatPrice(sessionPrice * 0.85)}</div>
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        {request.message && (
                          <div className="bg-muted rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <div className="min-w-0">
                                <div className="text-xs text-muted-foreground mb-1">Message from student:</div>
                                <div className="text-sm break-words">{request.message}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
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
                                Accept & Send Meet Link
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
                            Decline & Refund
                          </Button>
                        </div>

                        {/* Time Limit */}
                        <p className="text-xs text-muted-foreground text-center">
                          ⏰ Please respond within 24 hours
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
              <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
                ✓ Confirmed Sessions
              </h2>
              <div className="space-y-4">
                {acceptedRequests.map((request) => {
                  const sessionPrice = calculateSessionPrice(request.baseRate, request.duration);
                  
                  return (
                    <Card key={request.id} className="p-4 md:p-6 border-success/20 bg-success/5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-success/10 text-success rounded-full flex items-center justify-center flex-shrink-0">
                            ✓
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold truncate">{request.mentee.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {request.date} • {request.time} • {request.duration} min
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          {request.meetLink && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(request.meetLink, '_blank')}
                            >
                              <Video className="mr-2 h-4 w-4" />
                              Join Meet
                              <ExternalLink className="ml-2 h-3 w-3" />
                            </Button>
                          )}
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Your Earning</div>
                            <div className="text-base md:text-lg font-bold text-success">{formatPrice(sessionPrice * 0.85)}</div>
                          </div>
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
            <Card className="p-8 md:p-12 text-center">
              <User className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">No Requests Yet</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Booking requests will appear here when students book sessions
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Decline Dialog */}
      <AlertDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <AlertDialogContent className="max-w-[95vw] sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Why are you declining?</AlertDialogTitle>
            <AlertDialogDescription>
              Please let {selectedRequest?.mentee.name} know why you're declining. They will receive a full refund.
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
                <SelectItem value="too-many">Too many sessions scheduled</SelectItem>
                <SelectItem value="other">Other reason</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
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
                'Decline & Refund'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default AlumniRequests;
