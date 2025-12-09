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

const AlumniSignupPhone = () => {
  const navigate = useNavigate();
  
  // Common states
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Verification method toggle
  const [verifyMethod, setVerifyMethod] = useState<'email' | 'mobile'>('email');
  
  // Email states
  const [email, setEmail] = useState('');
  
  // Mobile states
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');

  const switchVerifyMethod = (method: 'email' | 'mobile') => {
    if (verifyMethod === method) return;
    setVerifyMethod(method);
    // Reset states when switching
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to Terms & Conditions';
    }
    
    if (verifyMethod === 'email') {
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Save data to session storage for OTP screen
      sessionStorage.setItem('alumniSignupData', JSON.stringify({
        email: verifyMethod === 'email' ? email : '',
        phone: verifyMethod === 'mobile' ? phone : '',
        verifyMethod,
        countryCode,
      }));
      navigate('/alumni/otp');
    }
  };

  const canContinue =
    agreedToTerms &&
    (verifyMethod === 'email' ? !!email : phone.length === 10);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-lg shadow-lg p-4 sm:p-6 md:p-8 animate-fade-in">
          {/* Progress Header */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Sign Up as Alumni</h1>
            <p className="text-sm text-muted-foreground">Step 1 of 8</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[12.5%] transition-all duration-300"></div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <p className="text-sm sm:text-base text-foreground">Let's verify you're an alumnus</p>

            {/* Verification Method Toggle */}
            <div className="flex items-center justify-center gap-2 p-1 bg-muted rounded-lg">
              <Button
                type="button"
                variant={verifyMethod === 'email' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => switchVerifyMethod('email')}
                className="flex-1 gap-2"
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
                    className={`h-10 sm:h-12 flex-1 ${errors.email ? 'border-destructive' : ''}`}
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
                      className={`flex-1 h-10 sm:h-12 ${errors.phone ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs sm:text-sm text-destructive">{errors.phone}</p>}
                </div>
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
              Send OTP & Continue
            </Button>

            {/* Login Link */}
            <p className="text-center text-xs sm:text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button 
                variant="link" 
                onClick={() => navigate('/login?type=alumni')}
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

export default AlumniSignupPhone;