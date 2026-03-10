import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/lib/app-context';
import { Loader2, Mail, Phone } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUserType } = useAppContext();
  const [signupType, setSignupType] = useState<'student' | 'alumni'>('student');
  
  // Student-specific states
  const [studentEmail, setStudentEmail] = useState('');
  const [emailState, setEmailState] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [emailError, setEmailError] = useState('');

  // Alumni-specific states (contact capture)
  const [alumniPhone, setAlumniPhone] = useState('');
  const [alumniEmail, setAlumniEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // How alumni prefers to verify contact details
  const [verifyMethod, setVerifyMethod] = useState<'email' | 'mobile'>('email');

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'alumni') {
      setSignupType('alumni');
    }
  }, [searchParams]);

  // Student handlers
  const handleStudentEmailChange = (value: string) => {
    setStudentEmail(value);
    setEmailState('idle');
    setEmailError('');
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

  const handleStudentContinue = async () => {
    if (!validateStudentEmail()) return;
    setEmailState('validating');
    await new Promise(resolve => setTimeout(resolve, 750));
    setEmailState('valid');
    setUserType('mentee');
    sessionStorage.setItem('studentSignupEmail', studentEmail);
    navigate('/mentee/otp');
  };

  const handleSwitchVerifyMethod = (method: 'email' | 'mobile') => {
    if (verifyMethod === method) return;
    setVerifyMethod(method);
    setErrors({});
  };

  const handleAlumniContinue = () => {
    const newErrors: Record<string, string> = {};

    if (verifyMethod === 'email') {
      if (!alumniEmail || !/\S+@\S+\.\S+/.test(alumniEmail)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else {
      if (alumniPhone.length !== 10 || !/^\d{10}$/.test(alumniPhone)) {
        newErrors.phone = 'Phone number must be exactly 10 digits';
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setUserType('alumni');
    sessionStorage.setItem(
      'alumniSignupData',
      JSON.stringify({
        email: verifyMethod === 'email' ? alumniEmail : '',
        phone: verifyMethod === 'mobile' ? alumniPhone : '',
        verifyMethod,
        countryCode,
      })
    );
    navigate('/alumni/otp');
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
          <Tabs value={signupType} onValueChange={(v) => setSignupType(v as 'student' | 'alumni')} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2 h-10 sm:h-12">
              <TabsTrigger value="student" className="text-sm sm:text-base">Student</TabsTrigger>
              <TabsTrigger value="alumni" className="text-sm sm:text-base">Alumni</TabsTrigger>
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
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="student-email" className="text-sm font-semibold">College Email ID</Label>
                </div>
                <Input
                  id="student-email"
                  type="email"
                  placeholder="Type here"
                  value={studentEmail}
                  onChange={(e) => handleStudentEmailChange(e.target.value)}
                  className={`h-10 sm:h-12 text-sm sm:text-base ${
                    emailState === 'valid' ? 'border-success' :
                    emailState === 'invalid' ? 'border-destructive' : ''
                  }`}
                  disabled={emailState === 'validating'}
                />
                
                {emailState === 'validating' && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing your OTP…</span>
                  </div>
                )}
                {emailState === 'invalid' && emailError && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-md p-2 sm:p-3">
                    <p className="text-xs sm:text-sm text-destructive font-medium flex items-center gap-2">
                      <span className="text-base">⚠</span> {emailError}
                    </p>
                  </div>
                )}
              </div>

              {/* Terms Notice */}
              <div className="text-left">
                <p className="text-xs text-muted-foreground">
                  By proceeding, you agree to our{' '}
                  <a href="/universal/terms" className="text-primary underline hover:text-primary/80">Terms</a>{' '}
                  and{' '}
                  <a href="/universal/privacy" className="text-primary underline hover:text-primary/80">Policy</a>.
                </p>
              </div>

              {/* Send OTP Button */}
              <Button
                onClick={handleStudentContinue}
                disabled={!studentEmail || emailState === 'validating'}
                className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
              >
                {emailState === 'validating' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  'Send OTP & Continue'
                )}
              </Button>
            </div>
          )}

          {/* Alumni Form */}
          {signupType === 'alumni' && (
            <div className="space-y-5 sm:space-y-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Step 1 of 8</p>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[12.5%] transition-all duration-300"></div>
                </div>
              </div>

              {/* Email Verification (default) */}
              {verifyMethod === 'email' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="alumni-email" className="text-sm font-semibold">Email Address*</Label>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        id="alumni-email"
                        type="email"
                        placeholder="Type here"
                        value={alumniEmail}
                        onChange={(e) => setAlumniEmail(e.target.value)}
                        className={`h-10 sm:h-12 flex-1 text-sm sm:text-base ${
                          errors.email ? 'border-destructive' : ''
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-xs sm:text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>
              )}

              {/* Mobile Verification */}
              {verifyMethod === 'mobile' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="alumni-phone" className="text-sm font-semibold">Mobile Number*</Label>
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
                        id="alumni-phone"
                        type="tel"
                        placeholder="Enter here"
                        value={alumniPhone}
                        onChange={(e) => setAlumniPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className={`flex-1 h-10 sm:h-12 text-sm sm:text-base ${
                          errors.phone ? 'border-destructive' : ''
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-xs sm:text-sm text-destructive">{errors.phone}</p>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Prefer using your email instead?{' '}
                    <button
                      type="button"
                      onClick={() => handleSwitchVerifyMethod('email')}
                      className="text-primary font-medium hover:underline underline-offset-2"
                    >
                      Use email OTP
                    </button>
                  </p>
                </div>
              )}

              {/* Terms Notice */}
              <div className="text-left">
                <p className="text-xs text-muted-foreground">
                  By proceeding, you agree to our{' '}
                  <a href="/universal/terms" className="text-primary underline hover:text-primary/80">Terms</a>{' '}
                  and{' '}
                  <a href="/universal/privacy" className="text-primary underline hover:text-primary/80">Policy</a>.
                </p>
              </div>

              <Button
                onClick={handleAlumniContinue}
                className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
                disabled={
                  (verifyMethod === 'email' ? !alumniEmail : alumniPhone.length !== 10)
                }
              >
                Send OTP & Continue
              </Button>
            </div>
          )}

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button
                variant="link"
                onClick={() => navigate(`/login?type=${signupType === 'student' ? 'student' : 'alumni'}`)}
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
