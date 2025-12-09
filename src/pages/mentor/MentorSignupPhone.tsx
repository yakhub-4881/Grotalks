import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { collegeMap } from '@/lib/college-config';
import { Loader2, Mail, Phone } from 'lucide-react';

const MentorSignupPhone = () => {
  const navigate = useNavigate();
  
  // Common states
  const [college, setCollege] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Verification method toggle
  const [verifyMethod, setVerifyMethod] = useState<'email' | 'mobile'>('email');
  
  // Email states
  const [email, setEmail] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpSending, setEmailOtpSending] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [emailOtpVerifying, setEmailOtpVerifying] = useState(false);
  const [emailCountdown, setEmailCountdown] = useState(0);
  
  // Mobile states
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpSending, setMobileOtpSending] = useState(false);
  const [mobileOtp, setMobileOtp] = useState('');
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [mobileOtpVerifying, setMobileOtpVerifying] = useState(false);
  const [mobileCountdown, setMobileCountdown] = useState(0);

  const colleges = Object.entries(collegeMap).map(([key, info]) => ({
    key,
    name: info.fullName
  }));

  // Countdown timers
  useState(() => {
    if (emailCountdown > 0) {
      const timer = setTimeout(() => setEmailCountdown(emailCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  });
  
  useState(() => {
    if (mobileCountdown > 0) {
      const timer = setTimeout(() => setMobileCountdown(mobileCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  });

  // Email handlers
  const handleSendEmailOtp = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
      return;
    }
    setErrors({ ...errors, email: '' });
    
    setEmailOtpSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEmailOtpSending(false);
    setEmailOtpSent(true);
    setEmailCountdown(60);
  };

  const handleVerifyEmailOtp = async () => {
    if (emailOtp.length !== 6) return;
    
    setEmailOtpVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEmailOtpVerifying(false);
    setEmailOtpVerified(true);
  };

  const handleResendEmailOtp = () => {
    setEmailOtp('');
    setEmailOtpVerified(false);
    handleSendEmailOtp();
  };

  // Mobile handlers
  const handleSendMobileOtp = async () => {
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      setErrors({ ...errors, phone: 'Phone number must be exactly 10 digits' });
      return;
    }
    setErrors({ ...errors, phone: '' });
    
    setMobileOtpSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMobileOtpSending(false);
    setMobileOtpSent(true);
    setMobileCountdown(60);
  };

  const handleVerifyMobileOtp = async () => {
    if (mobileOtp.length !== 6) return;
    
    setMobileOtpVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMobileOtpVerifying(false);
    setMobileOtpVerified(true);
  };

  const handleResendMobileOtp = () => {
    setMobileOtp('');
    setMobileOtpVerified(false);
    handleSendMobileOtp();
  };

  const switchVerifyMethod = (method: 'email' | 'mobile') => {
    if ((verifyMethod === 'email' && emailOtpVerified) || (verifyMethod === 'mobile' && mobileOtpVerified)) {
      // Already verified, don't switch
      return;
    }
    setVerifyMethod(method);
    // Reset states when switching
    setEmailOtpSent(false);
    setEmailOtp('');
    setMobileOtpSent(false);
    setMobileOtp('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!college) {
      newErrors.college = 'Please select your college';
    }
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to Terms & Conditions';
    }
    
    const isVerified = verifyMethod === 'email' ? emailOtpVerified : mobileOtpVerified;
    if (!isVerified) {
      newErrors.verification = 'Please complete OTP verification';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Save data to session storage
      sessionStorage.setItem('mentorSignupData', JSON.stringify({
        college,
        email: verifyMethod === 'email' ? email : '',
        phone: verifyMethod === 'mobile' ? phone : '',
        verifyMethod
      }));
      navigate('/mentor/alumni-verification');
    }
  };

  const isVerified = verifyMethod === 'email' ? emailOtpVerified : mobileOtpVerified;
  const canContinue = college && agreedToTerms && isVerified;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-lg shadow-lg p-4 sm:p-6 md:p-8 animate-fade-in">
          {/* Progress Header */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Sign Up as Mentor</h1>
            <p className="text-sm text-muted-foreground">Step 1 of 8</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[12.5%] transition-all duration-300"></div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <p className="text-sm sm:text-base text-foreground">Let's verify you're an alumnus</p>

            {/* College Selection */}
            <div className="space-y-2">
              <Label htmlFor="college" className="text-sm font-semibold">Select College*</Label>
              <Select value={college} onValueChange={setCollege}>
                <SelectTrigger className={`h-10 sm:h-12 ${errors.college ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select your college" />
                </SelectTrigger>
                <SelectContent className="bg-card border border-border z-50 max-h-60">
                  {colleges.map((c) => (
                    <SelectItem key={c.key} value={c.key}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.college && <p className="text-xs sm:text-sm text-destructive">{errors.college}</p>}
            </div>

            {/* Verification Method Toggle */}
            <div className="flex items-center justify-center gap-2 p-1 bg-muted rounded-lg">
              <Button
                type="button"
                variant={verifyMethod === 'email' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => switchVerifyMethod('email')}
                className="flex-1 gap-2"
                disabled={emailOtpVerified || mobileOtpVerified}
              >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Email OTP</span>
                <span className="sm:hidden">Email</span>
              </Button>
              <Button
                type="button"
                variant={verifyMethod === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => switchVerifyMethod('mobile')}
                className="flex-1 gap-2"
                disabled={emailOtpVerified || mobileOtpVerified}
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Mobile OTP</span>
                <span className="sm:hidden">Mobile</span>
              </Button>
            </div>

            {/* Email Verification */}
            {verifyMethod === 'email' && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email Address*</Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={emailOtpSent && !emailOtpVerified}
                      className={`h-10 sm:h-12 flex-1 ${errors.email ? 'border-destructive' : emailOtpVerified ? 'border-success' : ''}`}
                    />
                    <Button
                      type="button"
                      onClick={handleSendEmailOtp}
                      disabled={!email || emailOtpSending || emailOtpVerified}
                      className="h-10 sm:h-12 px-4 whitespace-nowrap text-sm"
                    >
                      {emailOtpSending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Sending...
                        </>
                      ) : emailOtpSent ? (
                        'OTP Sent'
                      ) : (
                        'Get OTP'
                      )}
                    </Button>
                  </div>
                  {errors.email && <p className="text-xs sm:text-sm text-destructive">{errors.email}</p>}
                </div>

                {emailOtpSent && !emailOtpVerified && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="p-2 sm:p-3 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-xs sm:text-sm text-success font-medium">
                        OTP sent to {email}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email-otp" className="text-sm font-semibold">Enter 6-digit OTP*</Label>
                      <Input
                        id="email-otp"
                        type="text"
                        inputMode="numeric"
                        placeholder="000000"
                        value={emailOtp}
                        onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="h-12 text-center text-xl tracking-widest font-semibold"
                        maxLength={6}
                      />
                    </div>

                    <div className="text-center">
                      {emailCountdown > 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Resend OTP in <span className="text-primary font-bold">{emailCountdown}</span> sec
                        </p>
                      ) : (
                        <Button variant="link" onClick={handleResendEmailOtp} className="text-primary p-0 h-auto text-sm">
                          Resend OTP
                        </Button>
                      )}
                    </div>

                    <Button
                      type="button"
                      onClick={handleVerifyEmailOtp}
                      disabled={emailOtp.length !== 6 || emailOtpVerifying}
                      variant="outline"
                      className="w-full h-10 sm:h-12"
                    >
                      {emailOtpVerifying ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Verifying...
                        </>
                      ) : (
                        'Verify OTP'
                      )}
                    </Button>
                  </div>
                )}

                {emailOtpVerified && (
                  <p className="text-sm text-success font-medium flex items-center gap-2">
                    <span>✓</span> Email verified successfully!
                  </p>
                )}
              </div>
            )}

            {/* Mobile Verification */}
            {verifyMethod === 'mobile' && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold">Mobile Number*</Label>
                  <div className="flex gap-2">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-20 sm:w-24 h-10 sm:h-12 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border z-50">
                        <SelectItem value="+91">+91</SelectItem>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+44">+44</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      disabled={mobileOtpSent && !mobileOtpVerified}
                      className={`flex-1 h-10 sm:h-12 ${errors.phone ? 'border-destructive' : mobileOtpVerified ? 'border-success' : ''}`}
                    />
                    <Button
                      type="button"
                      onClick={handleSendMobileOtp}
                      disabled={phone.length !== 10 || mobileOtpSending || mobileOtpVerified}
                      className="h-10 sm:h-12 px-3 sm:px-4 whitespace-nowrap text-sm"
                    >
                      {mobileOtpSending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Sending...</span>
                        </>
                      ) : mobileOtpSent ? (
                        'Sent'
                      ) : (
                        'Get OTP'
                      )}
                    </Button>
                  </div>
                  {errors.phone && <p className="text-xs sm:text-sm text-destructive">{errors.phone}</p>}
                </div>

                {mobileOtpSent && !mobileOtpVerified && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="p-2 sm:p-3 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-xs sm:text-sm text-success font-medium">
                        OTP sent to {countryCode} {phone}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mobile-otp" className="text-sm font-semibold">Enter 6-digit OTP*</Label>
                      <Input
                        id="mobile-otp"
                        type="text"
                        inputMode="numeric"
                        placeholder="000000"
                        value={mobileOtp}
                        onChange={(e) => setMobileOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="h-12 text-center text-xl tracking-widest font-semibold"
                        maxLength={6}
                      />
                    </div>

                    <div className="text-center">
                      {mobileCountdown > 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Resend OTP in <span className="text-primary font-bold">{mobileCountdown}</span> sec
                        </p>
                      ) : (
                        <Button variant="link" onClick={handleResendMobileOtp} className="text-primary p-0 h-auto text-sm">
                          Resend OTP
                        </Button>
                      )}
                    </div>

                    <Button
                      type="button"
                      onClick={handleVerifyMobileOtp}
                      disabled={mobileOtp.length !== 6 || mobileOtpVerifying}
                      variant="outline"
                      className="w-full h-10 sm:h-12"
                    >
                      {mobileOtpVerifying ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Verifying...
                        </>
                      ) : (
                        'Verify OTP'
                      )}
                    </Button>
                  </div>
                )}

                {mobileOtpVerified && (
                  <p className="text-sm text-success font-medium flex items-center gap-2">
                    <span>✓</span> Mobile verified successfully!
                  </p>
                )}
              </div>
            )}

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

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
              disabled={!canContinue}
            >
              Continue
            </Button>

            {/* Login Link */}
            <p className="text-center text-xs sm:text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button 
                variant="link" 
                onClick={() => navigate('/login?type=mentor')}
                className="p-0 h-auto text-primary font-medium text-xs sm:text-sm"
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

export default MentorSignupPhone;