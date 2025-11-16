import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layout } from '@/components/Layout';
import { MessageSquare as ChatIcon, Phone, Mic, MicOff, VideoOff, MessageSquare, Send, X, Wallet, Clock, Coins, AlertCircle } from 'lucide-react';
import { useAppContext } from '@/lib/app-context';
import { calculatePerMinuteRate, calculateSessionCost } from '@/lib/college-config';
import { PricingDisplay } from '@/components/PricingDisplay';

const ChatSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { walletBalance, setWalletBalance } = useAppContext();
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'mentor', text: 'Hi! Thanks for booking this session. How can I help you today?', time: '3:00 PM' },
    { id: 2, sender: 'student', text: 'Hi! I want to discuss career paths in Product Management.', time: '3:01 PM' },
  ]);
  const [sessionTime, setSessionTime] = useState(0); // in seconds
  const [isActive, setIsActive] = useState(true);
  const [showLowBalanceWarning, setShowLowBalanceWarning] = useState(false);
  
  const hourlyRate = 600; // Example: ₹600/hour
  const ratePerMinute = calculatePerMinuteRate(hourlyRate);
  const initialBalance = walletBalance;

  useEffect(() => {
    if (!isActive) return;
    
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
      
      // Deduct wallet every minute (60 seconds)
      if ((sessionTime + 1) % 60 === 0) {
        const newBalance = walletBalance - ratePerMinute;
        setWalletBalance(newBalance);
        
        // Show warning if balance is getting low
        if (newBalance < 50 && !showLowBalanceWarning) {
          setShowLowBalanceWarning(true);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionTime, isActive, walletBalance, setWalletBalance, ratePerMinute, showLowBalanceWarning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sessionMinutes = Math.floor(sessionTime / 60);
  const sessionSeconds = sessionTime % 60;
  const totalMinutes = sessionMinutes + (sessionSeconds / 60);
  const costSoFar = calculateSessionCost(ratePerMinute, totalMinutes);
  const estimatedBalance = Math.max(0, initialBalance - costSoFar);
  const nextDeduction = 60 - sessionSeconds;

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'student',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
      setMessage('');
    }
  };

  const handleEndSession = () => {
    setIsActive(false);
    navigate('/feedback?type=student&sessionId=' + sessionId);
  };

  return (
    <Layout showNav={false}>
      <div className="h-screen flex flex-col bg-muted">
        {/* Header */}
        <div className="bg-card border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              AS
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Arjun Singh</h2>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span className="text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4" />
              <span>{formatTime(sessionTime)}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => navigate('/mentee/dashboard')}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Wallet Status Box */}
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className={`font-semibold ${estimatedBalance < 50 ? 'text-destructive' : ''}`}>
                    Balance: ₹{estimatedBalance.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PricingDisplay hourlyRate={hourlyRate} variant="inline" showIcon={true} />
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">Time: {formatTime(sessionTime)}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="font-semibold text-destructive">Cost: ₹{costSoFar.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">Next charge in: {nextDeduction}s</div>
              </div>
            </div>
            
            {/* Low Balance Warning */}
            {estimatedBalance < 50 && (
              <div className="mt-3 bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-destructive">Low Balance Warning!</p>
                    <p className="text-xs text-destructive">Recharge now to avoid session interruption.</p>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => window.open('/mentee/wallet/recharge', '_blank')}
                  >
                    Recharge
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    msg.sender === 'student'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border'
                  }`}
                >
                  <p className="text-base leading-relaxed">{msg.text}</p>
                  <p className={`text-xs mt-2 ${msg.sender === 'student' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-card border-t px-4 py-4">
          <div className="max-w-4xl mx-auto flex gap-3">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 h-12 text-base"
            />
            <Button onClick={handleSendMessage} size="lg" className="px-6">
              <Send className="h-5 w-5" />
            </Button>
            <Button onClick={handleEndSession} variant="destructive" size="lg">
              End Session
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatSession;
