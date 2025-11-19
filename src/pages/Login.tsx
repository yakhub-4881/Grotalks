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

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUserType } = useAppContext();
  const [loginType, setLoginType] = useState<'student' | 'mentor'>('student');

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'mentor') {
      setLoginType('mentor');
    }
  }, [searchParams]);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      setUserType(loginType === 'student' ? 'mentee' : 'mentor');
      navigate('/login/otp');
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
          <Tabs value={loginType} onValueChange={(v) => setLoginType(v as 'student' | 'mentor')} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="mentor">Mentor</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Form */}
          <div className="space-y-6">
            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold">Phone Number*</Label>
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
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="w-full h-12 text-base font-medium"
              disabled={!phone}
            >
              Continue with OTP
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                onClick={() => navigate(`/signup?type=${loginType === 'student' ? 'student' : 'mentor'}`)}
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
