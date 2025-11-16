import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MentorSignupPhone = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to Terms & Conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigate('/mentor/otp');
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          {/* Progress Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Sign Up as Mentor</h1>
            <p className="text-sm text-muted-foreground">Step 1 of 8</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[12.5%] transition-all duration-300"></div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <p className="text-base text-foreground">Let's verify you're an alumnus</p>

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

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email Address*</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="w-full h-12 text-base font-medium"
              disabled={!phone || !email || !agreedToTerms}
            >
              Continue
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button 
                variant="link" 
                onClick={() => navigate('/login?type=mentor')}
                className="p-0 h-auto text-primary font-medium"
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
