import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ShieldCheck, CreditCard, IdCard, Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const UniversityVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const alumniId = searchParams.get('alumniId');
  const serviceId = searchParams.get('serviceId');

  const [cardNumber, setCardNumber] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [errors, setErrors] = useState<{ card?: string; college?: string; otp?: string }>({});

  // Dummy valid data
  const VALID_CARD = 'VTGU-2024-8834-1234';
  const VALID_COLLEGE_ID = 'VTU4881';
  const VALID_OTP = '123456';

  const handleSendOtp = () => {
    const newErrors: typeof errors = {};
    if (!cardNumber.trim()) {
      newErrors.card = 'Please enter your virtual card number';
    }
    if (!collegeId.trim()) {
      newErrors.college = 'Please enter your college ID';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSendingOtp(true);

    setTimeout(() => {
      setSendingOtp(false);
      setOtpSent(true);
      toast({
        title: 'OTP Sent',
        description: 'A verification code has been sent to your registered college email.',
      });
    }, 1500);
  };

  const handleVerifyAndBook = () => {
    const newErrors: typeof errors = {};

    if (cardNumber !== VALID_CARD) {
      newErrors.card = 'Invalid virtual card number. Please check with your university alumni admin.';
    }
    if (collegeId !== VALID_COLLEGE_ID) {
      newErrors.college = 'College ID not found in the university database. Verify the ID sent to your college email.';
    }
    if (otp !== VALID_OTP) {
      newErrors.otp = 'Incorrect OTP. Please check and try again.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setVerifying(true);

    setTimeout(() => {
      setVerifying(false);
      setOtpVerified(true);
      toast({
        title: 'Verified Successfully',
        description: 'Your university access has been confirmed. Redirecting to booking...',
      });

      setTimeout(() => {
        navigate(`/booking/schedule/${alumniId}?service=${serviceId}`);
      }, 1200);
    }, 2000);
  };

  const canSendOtp = cardNumber.trim().length > 0 && collegeId.trim().length > 0;
  const canVerify = otpSent && otp.length === 6;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card className="p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-foreground mb-1">Verify Your University Access</h1>
              <p className="text-sm text-muted-foreground">
                Confirm your identity to proceed with booking
              </p>
            </div>

            <div className="space-y-5">
              {/* Field 1: Virtual Card Number */}
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="flex items-center gap-2 text-sm font-medium">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Student Alumni Guidance Virtual Card Number
                </Label>
                <Input
                  id="cardNumber"
                  placeholder="e.g., VTGU-2024-8834-1234"
                  value={cardNumber}
                  onChange={(e) => {
                    setCardNumber(e.target.value);
                    setErrors(prev => ({ ...prev, card: undefined }));
                  }}
                  disabled={otpVerified}
                  className={errors.card ? 'border-destructive' : ''}
                />
                <p className="text-xs text-muted-foreground">
                  Enter your university issued virtual card number
                </p>
                {errors.card && (
                  <p className="text-xs text-destructive font-medium">{errors.card}</p>
                )}
              </div>

              {/* Field 2: College ID */}
              <div className="space-y-2">
                <Label htmlFor="collegeId" className="flex items-center gap-2 text-sm font-medium">
                  <IdCard className="h-4 w-4 text-primary" />
                  College ID Number
                </Label>
                <Input
                  id="collegeId"
                  placeholder="e.g., VTU4881"
                  value={collegeId}
                  onChange={(e) => {
                    setCollegeId(e.target.value);
                    setErrors(prev => ({ ...prev, college: undefined }));
                  }}
                  disabled={otpVerified}
                  className={errors.college ? 'border-destructive' : ''}
                />
                <p className="text-xs text-muted-foreground">
                  Enter your College ID — this was sent to your official college email
                </p>
                {errors.college && (
                  <p className="text-xs text-destructive font-medium">{errors.college}</p>
                )}
              </div>

              {/* Send OTP Button */}
              {!otpSent && (
                <Button
                  className="w-full"
                  onClick={handleSendOtp}
                  disabled={!canSendOtp || sendingOtp}
                >
                  {sendingOtp ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send OTP to College Email
                    </>
                  )}
                </Button>
              )}

              {/* Field 3: OTP */}
              {otpSent && !otpVerified && (
                <div className="space-y-3 pt-2 border-t">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4 text-primary" />
                    Enter OTP
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    A 6-digit code has been sent to your registered college email
                  </p>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => {
                        setOtp(value);
                        setErrors(prev => ({ ...prev, otp: undefined }));
                      }}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {errors.otp && (
                    <p className="text-xs text-destructive font-medium text-center">{errors.otp}</p>
                  )}

                  <Button
                    className="w-full"
                    onClick={handleVerifyAndBook}
                    disabled={!canVerify || verifying}
                  >
                    {verifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify & Proceed to Booking'
                    )}
                  </Button>

                  <button
                    className="w-full text-xs text-primary hover:underline text-center"
                    onClick={handleSendOtp}
                  >
                    Didn't receive the OTP? Resend
                  </button>
                </div>
              )}

              {/* Success State */}
              {otpVerified && (
                <div className="flex flex-col items-center gap-3 py-4 border-t">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                  <p className="text-sm font-medium text-foreground">Verified! Redirecting to booking...</p>
                </div>
              )}
            </div>

            {/* Hint */}
            <p className="text-[11px] text-muted-foreground text-center mt-6">
              Having trouble? Contact your university alumni admin for assistance.
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default UniversityVerification;
