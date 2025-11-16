import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Linkedin, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const MentorLinkedIn = () => {
  const navigate = useNavigate();
  const [linkedInConnected, setLinkedInConnected] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [batch, setBatch] = useState('');
  const [branch, setBranch] = useState('');
  const [alumniId, setAlumniId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');

  const handleLinkedInConnect = () => {
    // Mock LinkedIn connection
    setLinkedInConnected(true);
    setName('Arjun Singh');
    setEmail('arjun.singh@example.com');
    setCompany('Flipkart');
    setJobTitle('Product Manager');
  };

  // Alumni ID verification
  useEffect(() => {
    if (alumniId.length === 4) {
      setVerificationStatus('verifying');
      
      // Simulate verification delay (5-6 seconds)
      const timer = setTimeout(() => {
        // Mock verification - 90% success rate
        const isVerified = Math.random() > 0.1;
        setVerificationStatus(isVerified ? 'verified' : 'failed');
      }, 5500);

      return () => clearTimeout(timer);
    } else {
      setVerificationStatus('idle');
    }
  }, [alumniId]);

  const handleContinue = () => {
    navigate('/mentor/bio');
  };

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());
  const branches = [
    'Computer Science & Engineering',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Chemical Engineering',
    'Biotechnology',
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8 px-4">
        <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          {/* Progress Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Professional Verification</h1>
            <p className="text-sm text-muted-foreground">Step 3 of 8</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[37.5%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Section 1: LinkedIn */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">LinkedIn Connection (Mandatory)</h2>
              <p className="text-sm text-muted-foreground">LinkedIn verification is required for all mentors to ensure authenticity.</p>
              
              {!linkedInConnected ? (
                <div className="space-y-3">
                  <Button
                    onClick={handleLinkedInConnect}
                    className="w-full h-12 bg-[#0A66C2] hover:bg-[#004182] text-white"
                  >
                    <Linkedin className="mr-2 h-5 w-5" />
                    Connect with LinkedIn (Required)
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 p-4 bg-muted rounded-lg border-2 border-success">
                  <div className="flex items-center gap-2 text-success font-medium">
                    <span>✓</span> LinkedIn Verified
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Name</Label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Email</Label>
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Company</Label>
                      <Input value={company} onChange={(e) => setCompany(e.target.value)} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Job Title</Label>
                      <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="h-12" />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Label className="text-sm">LinkedIn Profile</Label>
                    <Button variant="link" className="p-0 h-auto text-primary">
                      linkedin.com/in/arjunsingh
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Alumni Verification */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Alumni Verification</h2>
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold">College Name</Label>
                <Input
                  value="Vel Tech Rangarajan Dr. Sagunthala R & D Institute of Science & Technology"
                  disabled
                  className="h-12 text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Batch Year*</Label>
                  <Select value={batch} onValueChange={setBatch}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select batch year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Branch*</Label>
                  <Select value={branch} onValueChange={setBranch}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((br) => (
                        <SelectItem key={br} value={br}>{br}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Alumni ID* (4 digits)</Label>
                <div className="relative">
                  <Input 
                    placeholder="Enter 4-digit alumni ID" 
                    className="h-12 text-base pr-12"
                    value={alumniId}
                    onChange={(e) => setAlumniId(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    maxLength={4}
                  />
                  {verificationStatus === 'verifying' && (
                    <Loader2 className="absolute right-3 top-3 h-6 w-6 text-primary animate-spin" />
                  )}
                  {verificationStatus === 'verified' && (
                    <CheckCircle2 className="absolute right-3 top-3 h-6 w-6 text-success" />
                  )}
                  {verificationStatus === 'failed' && (
                    <XCircle className="absolute right-3 top-3 h-6 w-6 text-destructive" />
                  )}
                </div>
                
                {verificationStatus === 'verifying' && (
                  <p className="text-sm text-primary font-medium animate-pulse">
                    Verifying with college database...
                  </p>
                )}
                
                {verificationStatus === 'verified' && (
                  <p className="text-sm text-success font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    ID verified successfully
                  </p>
                )}
                
                {verificationStatus === 'failed' && (
                  <div className="space-y-2">
                    <p className="text-sm text-destructive font-medium flex items-center gap-1">
                      <XCircle className="h-4 w-4" />
                      ID verification failed
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Unable to verify your alumni ID. Please contact support at{' '}
                      <a href="mailto:support@grotalks.com" className="text-primary font-medium hover:underline">
                        support@grotalks.com
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/mentor/otp')} className="flex-1 h-12">
                Back
              </Button>
              <Button
                onClick={handleContinue}
                className="flex-1 h-12 font-medium"
                disabled={!batch || !branch || verificationStatus !== 'verified'}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentorLinkedIn;
