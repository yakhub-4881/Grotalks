import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
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

          <div className="space-y-6">
            {/* Section 1: LinkedIn */}
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#0A66C2]/10 text-[#0A66C2] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Linkedin className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Connect LinkedIn</h3>
                  <p className="text-sm text-muted-foreground">
                    LinkedIn verification is required for all mentors to ensure authenticity. We never post without permission.
                  </p>
                </div>
              </div>
              
              {!linkedInConnected ? (
                <Button
                  onClick={handleLinkedInConnect}
                  className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white"
                  size="lg"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  Connect with LinkedIn
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="text-4xl">👤</div>
                    <div className="flex-1">
                      <div className="font-semibold">{name}</div>
                      <div className="text-sm text-muted-foreground">{jobTitle} @ {company}</div>
                    </div>
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <Button variant="outline" onClick={handleLinkedInConnect} className="w-full">
                    Reconnect LinkedIn
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
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
            </Card>

            {/* Section 2: College Verification */}
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  🎓
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">College Verification (Optional)</h3>
                  <p className="text-sm text-muted-foreground">
                    Optional but highly recommended for profile credibility. Helps students identify alumni mentors.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
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
                  <Label className="text-sm font-semibold">Alumni ID (4 digits)*</Label>
                  <Input
                    type="text"
                    placeholder="1234"
                    value={alumniId}
                    onChange={(e) => setAlumniId(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="h-12 text-base"
                    maxLength={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your 4-digit alumni ID for instant verification
                  </p>
                </div>

                {verificationStatus === 'verifying' && (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <div>
                      <p className="text-sm font-medium">Verifying Alumni ID...</p>
                      <p className="text-xs text-muted-foreground">This may take 5-6 seconds</p>
                    </div>
                  </div>
                )}

                {verificationStatus === 'verified' && (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <div>
                      <p className="text-sm font-medium text-success">Alumni ID Verified Successfully</p>
                      <p className="text-xs text-muted-foreground">Your college verification is complete</p>
                    </div>
                  </div>
                )}

                {verificationStatus === 'failed' && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <XCircle className="h-5 w-5 text-destructive" />
                      <p className="text-sm font-medium text-destructive">Verification Failed</p>
                    </div>
                    <p className="text-xs text-destructive">Alumni ID verification required for college alumni</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate('/mentor/signup/otp')}
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button
                onClick={handleContinue}
                className="flex-1 h-12 font-medium"
                disabled={!linkedInConnected}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentorLinkedIn;
