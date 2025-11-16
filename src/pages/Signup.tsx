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

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUserType } = useAppContext();
  const [signupType, setSignupType] = useState<'student' | 'mentor'>('student');
  
  // Student-specific states
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [emailState, setEmailState] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [emailError, setEmailError] = useState('');
  
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

  // Student handlers
  const handleStudentPhoneChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    setStudentPhone(numericValue);
    setIsPhoneValid(numericValue.length === 10);
  };

  const handleStudentEmailChange = (value: string) => {
    setStudentEmail(value);
    setEmailState('idle');
    setEmailError('');
  };

  const validateStudentEmail = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(studentEmail)) {
      setEmailState('invalid');
      setEmailError('Please enter a valid email address');
      return;
    }

    const studentEmailDomains = ['edu', 'ac.in', 'edu.in'];
    const emailDomain = studentEmail.split('@')[1]?.toLowerCase();
    const isStudentEmail = studentEmailDomains.some(domain => emailDomain?.includes(domain));

    if (!isStudentEmail) {
      setEmailState('invalid');
      setEmailError('Please use your official college email address');
      return;
    }

    setEmailState('validating');
    await new Promise(resolve => setTimeout(resolve, 4500));
    const isValid = Math.random() > 0.1;
    
    if (isValid) {
      setEmailState('valid');
    } else {
      setEmailState('invalid');
      setEmailError('Email not found in college database. Please check and try again.');
    }
  };

  const handleStudentContinue = () => {
    if (isPhoneValid && emailState === 'valid') {
      setUserType('mentee');
      sessionStorage.setItem('studentEmail', studentEmail);
      navigate('/mentee/otp');
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
        <div className="w-full max-w-md bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
            <p className="text-base text-muted-foreground">Join Grotalks today</p>
          </div>

          {/* Signup Type Toggle */}
          <Tabs value={signupType} onValueChange={(v) => setSignupType(v as 'student' | 'mentor')} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="mentor">Mentor</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Student Form */}
          {signupType === 'student' && (
            <div className="space-y-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Step 1 of 5</p>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[20%] transition-all duration-300"></div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="student-phone" className="text-sm font-semibold">Phone Number*</Label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 h-12 bg-muted border border-input rounded-md">
                    <span className="text-sm font-medium">+91</span>
                  </div>
                  <Input
                    id="student-phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter 10-digit mobile number"
                    value={studentPhone}
                    onChange={(e) => handleStudentPhoneChange(e.target.value)}
                    className={`h-12 text-base flex-1 ${isPhoneValid ? 'border-success' : ''}`}
                    maxLength={10}
                  />
                </div>
                {studentPhone.length > 0 && !isPhoneValid && (
                  <p className="text-sm text-destructive">Phone number must be 10 digits</p>
                )}
                {isPhoneValid && (
                  <p className="text-sm text-success flex items-center gap-1">
                    <span>✓</span> Valid phone number
                  </p>
                )}
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
                  onBlur={validateStudentEmail}
                  className={`h-12 text-base ${
                    emailState === 'valid' ? 'border-success' : 
                    emailState === 'invalid' ? 'border-destructive' : ''
                  }`}
                  disabled={emailState === 'validating'}
                />
                {emailState === 'validating' && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>Checking with college database...</span>
                  </div>
                )}
                {emailState === 'invalid' && emailError && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3">
                    <p className="text-sm text-destructive font-medium flex items-center gap-2">
                      <span className="text-base">⚠</span> {emailError}
                    </p>
                  </div>
                )}
                {emailState === 'valid' && (
                  <p className="text-sm text-success flex items-center gap-1">
                    <span>✓</span> Email verified with college database
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Use your official college email (e.g., @college.edu.in)
                </p>
              </div>

              <Button
                onClick={handleStudentContinue}
                className="w-full h-12 text-base font-medium"
                disabled={!isPhoneValid || emailState !== 'valid'}
              >
                Continue with OTP
              </Button>
            </div>
          )}

          {/* Mentor Form */}
          {signupType === 'mentor' && (
            <div className="space-y-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Step 1 of 8</p>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[12.5%] transition-all duration-300"></div>
                </div>
              </div>

              <p className="text-base text-foreground">Let's verify you're an alumnus</p>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="mentor-phone" className="text-sm font-semibold">Phone Number*</Label>
                <div className="flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-24 h-12">
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
                    className={`flex-1 h-12 text-base ${errors.phone ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
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
                  className={`h-12 text-base ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I agree to the{' '}
                  <Button variant="link" className="p-0 h-auto text-primary font-medium">
                    Terms & Conditions
                  </Button>
                </Label>
              </div>
              {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}

              <Button
                onClick={handleMentorContinue}
                className="w-full h-12 text-base font-medium"
                disabled={!mentorPhone || !mentorEmail || !agreedToTerms}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button 
                variant="link" 
                onClick={() => navigate(`/login?type=${signupType === 'student' ? 'student' : 'mentor'}`)}
                className="p-0 h-auto font-medium text-primary"
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
