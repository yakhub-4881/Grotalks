import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { useAppContext } from '@/lib/app-context';

const MentorSignupOTP = () => {
  const navigate = useNavigate();
  const { userType } = useAppContext();
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setOtp(numericValue);
    setError('');
    
    // Auto-verify when 6 digits entered
    if (numericValue.length === 6) {
      handleVerify(numericValue);
    }
  };

  const handleVerify = (otpValue: string = otp) => {
    if (otpValue.length === 6) {
      setVerified(true);
      setTimeout(() => {
        // Route based on user type
        if (userType === 'mentee') {
          navigate('/mentee/wallet');
        } else {
          navigate('/mentor/linkedin');
        }
      }, 1000);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setOtp('');
    setError('');
    setVerified(false);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          {/* Progress Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Verify Your Phone</h1>
            <p className="text-sm text-muted-foreground">Step 2 of 8</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[25%] transition-all duration-300"></div>
            </div>
          </div>

          {/* OTP Form */}
          <div className="space-y-6">
            <p className="text-base text-foreground">
              We've sent an OTP to <span className="font-semibold">+91-XXXXX3210</span>
            </p>

            {/* OTP Input */}
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-semibold">Enter 6-digit OTP*</Label>
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                placeholder="000000"
                value={otp}
                onChange={(e) => handleOtpChange(e.target.value)}
                className={`h-14 text-center text-2xl tracking-widest font-semibold ${
                  error ? 'border-destructive' : verified ? 'border-success' : ''
                }`}
                maxLength={6}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              {verified && (
                <p className="text-sm text-success font-medium flex items-center gap-2">
                  <span>✓</span> Verified successfully!
                </p>
              )}
            </div>

            {/* Countdown Timer - REAL-TIME */}
            <div className="text-center">
              {!canResend ? (
                <p className="text-sm font-medium" style={{ color: '#6B7280' }}>
                  Resend OTP available in <span className="text-primary font-bold">{countdown}</span> sec
                </p>
              ) : (
                <Button
                  variant="link"
                  onClick={handleResend}
                  className="text-success font-medium h-auto p-0 text-base"
                >
                  Resend OTP
                </Button>
              )}
            </div>

            {/* Verify Button */}
            <Button
              onClick={() => handleVerify()}
              className="w-full h-12 text-base font-medium"
              disabled={otp.length !== 6 || verified}
            >
              {verified ? 'Verified ✓' : 'Verify OTP'}
            </Button>

            {/* Back Link */}
            <Button
              variant="ghost"
              onClick={() => navigate('/mentor/signup')}
              className="w-full"
            >
              ← Back to Phone Entry
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentorSignupOTP;
