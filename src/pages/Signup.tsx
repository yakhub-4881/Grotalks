import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/lib/app-context';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUserType } = useAppContext();
  const [signupType, setSignupType] = useState<'student' | 'mentor'>('student');
  
  // Student-specific states
  const [studentEmail, setStudentEmail] = useState('');
  const [emailState, setEmailState] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [emailError, setEmailError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [studentOtp, setStudentOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  // Mentor-specific states
  const [mentorPhone, setMentorPhone] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'mentor') {
      setSignupType('mentor');
    }
  }, [searchParams]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Student handlers
  const handleStudentEmailChange = (value: string) => {
    setStudentEmail(value);
    setEmailState('idle');
    setEmailError('');
    setOtpSent(false);
    setStudentOtp('');
    setOtpVerified(false);
  };

  const validateStudentEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(studentEmail)) {
      setEmailState('invalid');
      setEmailError('Please enter a valid email address');
      return false;
    }

    const studentEmailDomains = ['edu', 'ac.in', 'edu.in'];
    const emailDomain = studentEmail.split('@')[1]?.toLowerCase();
    const isStudentEmail = studentEmailDomains.some(domain => emailDomain?.includes(domain));

    if (!isStudentEmail) {
      setEmailState('invalid');
      setEmailError('Please use your official college email address');
      return false;
    }

    return true;
  };

  const handleSendOtp = async () => {
    if (!validateStudentEmail()) return;
    
    setOtpSending(true);
    setEmailState('validating');
    
    // Simulate email validation and OTP sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock validation - 90% success rate
    const isValid = Math.random() > 0.1;
    
    if (isValid) {
      setEmailState('valid');
      setOtpSent(true);
      setCountdown(60);
    } else {
      setEmailState('invalid');
      setEmailError('Email not found in college database. Please check and try again.');
    }
    setOtpSending(false);
  };

  const handleVerifyOtp = async () => {
    if (studentOtp.length !== 6) return;
    
    setOtpVerifying(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOtpVerifying(false);
    setOtpVerified(true);
  };

  const handleResendOtp = () => {
    setStudentOtp('');
    setOtpVerified(false);
    handleSendOtp();
  };

  const handleStudentContinue = () => {
    if (otpVerified) {
      setUserType('mentee');
      sessionStorage.setItem('studentEmail', studentEmail);
      navigate('/mentee/profile');
    }
  };

  // Mentor handlers
  const validateMentorForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (mentorPhone.length !== 10 || !/^\d{10}$/.test(mentorPhone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    
    if (!mentorEmail || !/\S+@\S+\.\S+/.test(mentorEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to Terms & Conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMentorContinue = () => {
    if (validateMentorForm()) {
      setUserType('mentor');
      navigate('/mentor/otp');
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-lg shadow-lg p-4 sm:p-6 md:p-8 animate-fade-in">
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Join Grotalks today</p>
          </div>

          {/* Signup Type Toggle */}
          <Tabs value={signupType} onValueChange={(v) => setSignupType(v as 'student' | 'mentor')} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2 h-10 sm:h-12">
              <TabsTrigger value="student" className="text-sm sm:text-base">Student</TabsTrigger>
              <TabsTrigger value="mentor" className="text-sm sm:text-base">Mentor</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Student Form */}
          {signupType === 'student' && (
            <div className="space-y-5 sm:space-y-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Step 1 of 4</p>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[25%] transition-all duration-300"></div>
                </div>
              </div>

              {/* Student Email */}
              <div className="space-y-2">
                <Label htmlFor="student-email" className="text-sm font-semibold">Student Email ID*</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="yourname@college.edu.in"
                    value={studentEmail}
                    onChange={(e) => handleStudentEmailChange(e.target.value)}
                    className={`h-10 sm:h-12 text-sm sm:text-base flex-1 ${
                      emailState === 'valid' ? 'border-success' : 
                      emailState === 'invalid' ? 'border-destructive' : ''
                    }`}
                    disabled={otpSent && emailState === 'valid'}
                  />
                  <Button 
                    onClick={handleSendOtp}
                    disabled={!studentEmail || otpSending || (otpSent && emailState === 'valid')}
                    className="h-10 sm:h-12 px-4 sm:px-6 whitespace-nowrap text-sm"
                  >
                    {otpSending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : otpSent ? (
                      'OTP Sent'
                    ) : (
                      'Get OTP'
                    )}
                  </Button>
                </div>
                
                {emailState === 'validating' && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying with college database...</span>
                  </div>
                )}
                {emailState === 'invalid' && emailError && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-md p-2 sm:p-3">
                    <p className="text-xs sm:text-sm text-destructive font-medium flex items-center gap-2">
                      <span className="text-base">⚠</span> {emailError}
                    </p>
                  </div>
                )}
                {emailState === 'valid' && !otpSent && (
                  <p className="text-sm text-success flex items-center gap-1">
                    <span>✓</span> Email verified with college database
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Use your official college email (e.g., @college.edu.in)
                </p>
              </div>

              {/* OTP Input - shown after OTP is sent */}
              {otpSent && emailState === 'valid' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-2 sm:p-3 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-xs sm:text-sm text-success font-medium">
                      OTP sent to {studentEmail}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-otp" className="text-sm font-semibold">Enter 6-digit OTP*</Label>
                    <Input
                      id="student-otp"
                      type="text"
                      inputMode="numeric"
                      placeholder="000000"
                      value={studentOtp}
                      onChange={(e) => setStudentOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className={`h-12 sm:h-14 text-center text-xl sm:text-2xl tracking-widest font-semibold ${
                        otpVerified ? 'border-success' : ''
                      }`}
                      maxLength={6}
                      disabled={otpVerified}
                    />
                  </div>

                  {otpVerified ? (
                    <p className="text-sm text-success font-medium flex items-center gap-2">
                      <span>✓</span> OTP verified successfully!
                    </p>
                  ) : (
                    <>
                      <div className="text-center">
                        {countdown > 0 ? (
                          <p className="text-sm text-muted-foreground">
                            Resend OTP in <span className="text-primary font-bold">{countdown}</span> sec
                          </p>
                        ) : (
                          <Button variant="link" onClick={handleResendOtp} className="text-primary p-0 h-auto text-sm">
                            Resend OTP
                          </Button>
                        )}
                      </div>

                      <Button
                        onClick={handleVerifyOtp}
                        disabled={studentOtp.length !== 6 || otpVerifying}
                        variant="outline"
                        className="w-full h-10 sm:h-12"
                      >
                        {otpVerifying ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Verifying...
                          </>
                        ) : (
                          'Verify OTP'
                        )}
                      </Button>
                    </>
                  )}
                </div>
              )}

              <Button
                onClick={handleStudentContinue}
                className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
                disabled={!otpVerified}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Mentor Form */}
          {signupType === 'mentor' && (
            <div className="space-y-5 sm:space-y-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Step 1 of 8</p>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[12.5%] transition-all duration-300"></div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-foreground">Let's verify you're an alumnus</p>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="mentor-phone" className="text-sm font-semibold">Phone Number*</Label>
                <div className="flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-20 sm:w-24 h-10 sm:h-12 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+91">+91</SelectItem>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="mentor-phone"
                    type="tel"
                    placeholder="9876543210"
                    value={mentorPhone}
                    onChange={(e) => setMentorPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className={`flex-1 h-10 sm:h-12 text-sm sm:text-base ${errors.phone ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.phone && <p className="text-xs sm:text-sm text-destructive">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="mentor-email" className="text-sm font-semibold">Email Address*</Label>
                <Input
                  id="mentor-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={mentorEmail}
                  onChange={(e) => setMentorEmail(e.target.value)}
                  className={`h-10 sm:h-12 text-sm sm:text-base ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && <p className="text-xs sm:text-sm text-destructive">{errors.email}</p>}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-xs sm:text-sm leading-relaxed cursor-pointer">
                  I agree to the{' '}
                  <Button variant="link" className="p-0 h-auto text-primary font-medium text-xs sm:text-sm">
                    Terms & Conditions
                  </Button>
                </Label>
              </div>
              {errors.terms && <p className="text-xs sm:text-sm text-destructive">{errors.terms}</p>}

              <Button
                onClick={handleMentorContinue}
                className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
                disabled={!mentorPhone || !mentorEmail || !agreedToTerms}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button 
                variant="link" 
                onClick={() => navigate(`/login?type=${signupType === 'student' ? 'student' : 'mentor'}`)}
                className="p-0 h-auto font-medium text-primary text-xs sm:text-sm"
              >
                Login
              </Button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
