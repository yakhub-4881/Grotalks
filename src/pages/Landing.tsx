import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/lib/app-context';
import { Layout } from '@/components/Layout';
import { BadgeCheck, Video, Target, Sparkles, Loader2, Mail, Phone } from 'lucide-react';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';
import heroImage from '@/assets/hero-grotalks-brand.jpg';

const Landing = () => {
  const navigate = useNavigate();
  const { setUserType } = useAppContext();
  
  // Shared signup state (mirrors Signup.tsx)
  const [signupType, setSignupType] = useState<'student' | 'alumni'>('student');

  // Student-specific states
  const [studentEmail, setStudentEmail] = useState('');
  const [emailState, setEmailState] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [emailError, setEmailError] = useState('');
  const [agreedToTermsStudent, setAgreedToTermsStudent] = useState(false);

  // Alumni-specific states (contact capture)
  const [alumniPhone, setAlumniPhone] = useState('');
  const [alumniEmail, setAlumniEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // How alumni prefers to verify contact details
  const [verifyMethod, setVerifyMethod] = useState<'email' | 'mobile'>('email');
  
  const isDarkMode = useMemo(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  }, []);
  
  const logo = isDarkMode ? logoLight : logoDark;

  // Handlers mirrored from Signup.tsx
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
    if (!agreedToTermsStudent) {
      setEmailError('You must agree to Terms & Conditions');
      return;
    }
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
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to Terms & Conditions';
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
    <Layout showNav={false}>
      <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-slate-900">
        {/* Left Side - Content Area */}
        <div className="flex-1 lg:basis-1/2 bg-white flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10 sm:py-8 lg:py-0 min-h-0">
          <div className="max-w-md mx-auto w-full flex flex-col justify-center h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6 lg:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 p-2 rounded-lg bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-lg">
                <img src={logo} alt="Grotalks" className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Grotalks</h1>
                <p className="text-xs sm:text-sm text-slate-500">Guidance made easy</p>
              </div>
            </div>


            {/* Inline Signup Interaction (mirrors Signup.tsx) */}
            <div className="mb-6 lg:mb-6">
              <div className="w-full bg-card rounded-lg shadow-lg p-4 sm:p-6 md:p-8 animate-fade-in">
                {/* Header */}
                <div className="mb-6 sm:mb-8 text-center">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
                  <p className="text-sm sm:text-base text-muted-foreground">Join Grotalks today</p>
                </div>

                {/* Signup Type Toggle */}
                <Tabs
                  value={signupType}
                  onValueChange={(v) => setSignupType(v as 'student' | 'alumni')}
                  className="w-full mb-6"
                >
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
                      <Label htmlFor="student-email" className="text-sm font-semibold">Student Email ID*</Label>
                      <Input
                        id="student-email"
                        type="email"
                        placeholder="yourname@college.edu.in"
                        value={studentEmail}
                        onChange={(e) => handleStudentEmailChange(e.target.value)}
                        className={`h-10 sm:h-12 text-sm sm:text-base ${
                          emailState === 'valid'
                            ? 'border-success'
                            : emailState === 'invalid'
                            ? 'border-destructive'
                            : ''
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
                      <p className="text-xs text-muted-foreground">
                        Use your official college email (e.g., @college.edu.in). OTP verification happens on the next
                        screen.
                      </p>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="landing-student-terms"
                        checked={agreedToTermsStudent}
                        onCheckedChange={(checked) => setAgreedToTermsStudent(checked as boolean)}
                        className="mt-1"
                      />
                      <Label htmlFor="landing-student-terms" className="text-xs sm:text-sm leading-relaxed cursor-pointer">
                        I agree to the{' '}
                        <Button
                          type="button"
                          variant="link"
                          className="p-0 h-auto text-primary font-medium text-xs sm:text-sm"
                        >
                          Terms & Conditions
                        </Button>
                      </Label>
                    </div>

                    {/* Send OTP Button */}
                    <Button
                      type="button"
                      onClick={handleStudentContinue}
                      disabled={!studentEmail || emailState === 'validating' || !agreedToTermsStudent}
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
                          <Label htmlFor="alumni-email" className="text-sm font-semibold">
                            Email Address*
                          </Label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                              id="alumni-email"
                              type="email"
                              placeholder="your.email@example.com"
                              value={alumniEmail}
                              onChange={(e) => setAlumniEmail(e.target.value)}
                              className={`h-10 sm:h-12 flex-1 text-sm sm:text-base ${
                                errors.email ? 'border-destructive' : ''
                              }`}
                            />
                          </div>
                          {errors.email && <p className="text-xs sm:text-sm text-destructive">{errors.email}</p>}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                          Prefer using your phone instead?{' '}
                          <button
                            type="button"
                            onClick={() => handleSwitchVerifyMethod('mobile')}
                            className="text-primary font-medium hover:underline underline-offset-2"
                          >
                            Use mobile OTP
                          </button>
                        </p>
                      </div>
                    )}

                    {/* Mobile Verification */}
                    {verifyMethod === 'mobile' && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="space-y-2">
                          <Label htmlFor="alumni-phone" className="text-sm font-semibold">
                            Mobile Number*
                          </Label>
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
                              placeholder="9876543210"
                              value={alumniPhone}
                              onChange={(e) =>
                                setAlumniPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                              }
                              className={`flex-1 h-10 sm:h-12 text-sm sm:text-base ${
                                errors.phone ? 'border-destructive' : ''
                              }`}
                            />
                          </div>
                          {errors.phone && <p className="text-xs sm:text-sm text-destructive">{errors.phone}</p>}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-2">
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

                    {/* Terms Checkbox */}
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="landing-alumni-terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        className="mt-1"
                      />
                      <Label htmlFor="landing-alumni-terms" className="text-xs sm:text-sm leading-relaxed cursor-pointer">
                        I agree to the{' '}
                        <Button
                          type="button"
                          variant="link"
                          className="p-0 h-auto text-primary font-medium text-xs sm:text-sm"
                        >
                          Terms & Conditions
                        </Button>
                      </Label>
                    </div>
                    {errors.terms && <p className="text-xs sm:text-sm text-destructive">{errors.terms}</p>}

                    <Button
                      type="button"
                      onClick={handleAlumniContinue}
                      className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
                      disabled={
                        !agreedToTerms || (verifyMethod === 'email' ? !alumniEmail : alumniPhone.length !== 10)
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
                      type="button"
                      variant="link"
                      onClick={() =>
                        navigate(`/login?type=${signupType === 'student' ? 'student' : 'alumni'}`)
                      }
                      className="p-0 h-auto font-medium text-primary text-xs sm:text-sm"
                    >
                      Login
                    </Button>
                  </p>
                </div>
              </div>
            </div>

            {/* Features - matching ComingSoon design */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Verified Alumni</p>
              </div>
              <div className="text-center p-3 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Live Calls</p>
              </div>
              <div className="text-center p-3 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Career Goals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Image with Text Overlay */}
        <div className="hidden lg:flex lg:flex-1 lg:basis-1/2 relative overflow-hidden">
          <img
            src={heroImage}
            alt="Mentorship Connection"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          
          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-12 xl:px-16">
            <div className="max-w-lg">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white/60" />
              </div>
              <h2 className="text-3xl xl:text-4xl font-extrabold leading-tight text-white mb-4">
                {signupType === 'student' ? (
                  <>
                    Your future starts with
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">
                      alumni who made it
                    </span>
                  </>
                ) : (
                  <>
                    Your journey inspires
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">
                      the next generation
                    </span>
                  </>
                )}
              </h2>
              <p className="text-base xl:text-lg text-white/80 leading-relaxed">
                {signupType === 'student'
                  ? 'Connect with alumni from your college who now live the careers you dream of.'
                  : 'Share your real-world journey with students from your college who need it most.'}
              </p>
            </div>
          </div>
        </div>

        {/* Version Switcher Gear Icon - Bottom Right */}
        <button
          onClick={() => navigate('/universal')}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 flex items-center justify-center transition-all hover:scale-110 opacity-60 hover:opacity-100 z-50"
          aria-label="Switch to Universal Version"
          title="Switch to Universal Version"
        >
          <span className="text-xl">⚙️</span>
        </button>
      </div>
    </Layout>
  );
};

export default Landing;
