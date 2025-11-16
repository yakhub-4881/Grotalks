import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { useAppContext } from '@/lib/app-context';

const MenteeSignupPhone = () => {
  const navigate = useNavigate();
  const { setUserType } = useAppContext();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [emailState, setEmailState] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [emailError, setEmailError] = useState('');

  const handlePhoneChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, '');
    setPhone(numericValue);
    setIsPhoneValid(numericValue.length === 10);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailState('idle');
    setEmailError('');
  };

  const validateEmail = async () => {
    // Basic email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailState('invalid');
      setEmailError('Please enter a valid email address');
      return;
    }

    // Check if it's a student email (edu domain or common college domains)
    const studentEmailDomains = ['edu', 'ac.in', 'edu.in'];
    const emailDomain = email.split('@')[1]?.toLowerCase();
    const isStudentEmail = studentEmailDomains.some(domain => emailDomain?.includes(domain));

    if (!isStudentEmail) {
      setEmailState('invalid');
      setEmailError('Please use your official college email address');
      return;
    }

    setEmailState('validating');

    // Simulate college database validation (4-5 seconds)
    await new Promise(resolve => setTimeout(resolve, 4500));

    // Simulate validation result (90% success rate for demo)
    const isValid = Math.random() > 0.1;
    
    if (isValid) {
      setEmailState('valid');
    } else {
      setEmailState('invalid');
      setEmailError('Email not found in college database. Please check and try again.');
    }
  };

  const handleContinue = () => {
    if (isPhoneValid && emailState === 'valid') {
      setUserType('mentee');
      sessionStorage.setItem('studentEmail', email);
      navigate('/mentee/otp');
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Sign Up as Student</h1>
            <p className="text-sm text-muted-foreground">Step 1 of 5</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[20%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold">Phone Number*</Label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 h-12 bg-muted border border-input rounded-md">
                  <span className="text-sm font-medium">+91</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={`h-12 text-base flex-1 ${isPhoneValid ? 'border-success' : ''}`}
                  maxLength={10}
                />
              </div>
              {phone.length > 0 && !isPhoneValid && (
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
              <Label htmlFor="email" className="text-sm font-semibold">Student Email ID*</Label>
              <Input
                id="email"
                type="email"
                placeholder="yourname@college.edu.in"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={validateEmail}
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
              onClick={handleContinue}
              className="w-full h-12 text-base font-medium"
              disabled={!isPhoneValid || emailState !== 'valid'}
            >
              Continue with OTP
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Button
                  variant="link"
                  onClick={() => navigate('/login')}
                  className="p-0 h-auto font-medium text-primary"
                >
                  Login
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MenteeSignupPhone;
