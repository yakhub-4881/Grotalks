import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/lib/app-context';
import { Mail, Phone } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUserType } = useAppContext();
  const [loginType, setLoginType] = useState<'student' | 'alumni'>('student');

  // Alumni login method
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [email, setEmail] = useState('');

  // Student email state
  const [studentEmail, setStudentEmail] = useState('');

  // Alumni phone state
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'alumni') {
      setLoginType('alumni');
    }
  }, [searchParams]);

  const validateStudentEmail = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(studentEmail)) {
      newErrors.studentEmail = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAlumniForm = () => {
    const newErrors: Record<string, string> = {};
    if (loginMethod === 'email') {
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else {
      if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
        newErrors.phone = 'Phone number must be exactly 10 digits';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (loginType === 'student') {
      if (!validateStudentEmail()) return;
      setUserType('mentee');
      sessionStorage.setItem(
        'loginData',
        JSON.stringify({ userType: 'mentee', method: 'email', contact: studentEmail })
      );
      navigate('/login/otp?type=student&method=email');
      return;
    }

    if (validateAlumniForm()) {
      setUserType('alumni');
      sessionStorage.setItem(
        'loginData',
        JSON.stringify({
          userType: 'alumni',
          method: loginMethod,
          contact: loginMethod === 'email' ? email : phone,
          countryCode,
        })
      );
      navigate(`/login/otp?type=alumni&method=${loginMethod}`);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-base text-muted-foreground">Login to your Grotalks account</p>
          </div>

          {/* Login Type Toggle */}
          <Tabs value={loginType} onValueChange={(v) => setLoginType(v as 'student' | 'alumni')} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="alumni">Alumni</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Form */}
          <div className="space-y-6">
            {loginType === 'student' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email" className="text-sm font-semibold">
                    College Email ID*
                  </Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="yourname@college.edu.in"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className={`h-10 sm:h-12 flex-1 text-sm sm:text-base ${
                      errors.studentEmail ? 'border-destructive' : ''
                    }`}
                  />
                  {errors.studentEmail && (
                    <p className="text-xs sm:text-sm text-destructive">{errors.studentEmail}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    We'll send a one-time password to this email.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Alumni: Email / Mobile input with subtle switch */}
                {loginMethod === 'email' ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email" className="text-sm font-semibold">Email Address*</Label>
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`h-12 text-base ${errors.email ? 'border-destructive' : ''}`}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    <p className="text-xs text-muted-foreground">
                      Prefer using your phone instead?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setLoginMethod('mobile');
                          setErrors({});
                        }}
                        className="text-primary font-medium hover:underline underline-offset-2"
                      >
                        Use mobile OTP
                      </button>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="phone" className="text-sm font-semibold">Mobile Number*</Label>
                    </div>
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
                        id="phone"
                        type="tel"
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className={`flex-1 h-12 text-base ${errors.phone ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    <p className="text-xs text-muted-foreground">
                      Prefer using your email instead?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setLoginMethod('email');
                          setErrors({});
                        }}
                        className="text-primary font-medium hover:underline underline-offset-2"
                      >
                        Use email OTP
                      </button>
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="w-full h-12 text-base font-medium"
              disabled={
                loginType === 'student'
                  ? !studentEmail
                  : loginMethod === 'email'
                    ? !email
                    : !phone
              }
            >
              Continue with OTP
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button
                variant="link"
                onClick={() => navigate(`/signup?type=${loginType === 'student' ? 'student' : 'alumni'}`)}
                className="p-0 h-auto text-primary font-medium"
              >
                Sign Up
              </Button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
