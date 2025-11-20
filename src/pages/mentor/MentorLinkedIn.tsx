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
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    jobTitle: '',
    company: '',
    profilePicture: '',
    about: '',
    workExperience: [] as Array<{ company: string; role: string; duration: string }>,
    certifications: [] as Array<{ title: string; issuer: string; date: string }>
  });
  const [batch, setBatch] = useState('');
  const [branch, setBranch] = useState('');
  const [alumniId, setAlumniId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');

  const handleLinkedInConnect = () => {
    // Mock LinkedIn connection with detailed profile data
    setLinkedInConnected(true);
    setProfileData({
      name: 'Arjun Singh',
      email: 'arjun.singh@example.com',
      jobTitle: 'Senior Product Manager',
      company: 'Flipkart',
      profilePicture: '👤',
      about: 'Experienced Product Manager with 8+ years in e-commerce and fintech. Passionate about building products that solve real user problems. Led multiple 0-1 product launches and scaled features to millions of users.',
      workExperience: [
        { company: 'Flipkart', role: 'Senior Product Manager', duration: '2021 - Present' },
        { company: 'PayTM', role: 'Product Manager', duration: '2018 - 2021' },
        { company: 'Amazon', role: 'Associate Product Manager', duration: '2016 - 2018' }
      ],
      certifications: [
        { title: 'Product Management Certification', issuer: 'Product School', date: '2020' },
        { title: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2019' }
      ]
    });
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
            <Card className="p-4 sm:p-6">
              {!linkedInConnected ? (
                <>
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
                </>
              ) : null}
              
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
                <div className="space-y-4 sm:space-y-6">
                  {/* Success Header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                    <div className="w-10 h-10 bg-[#0A66C2]/10 text-[#0A66C2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-success flex items-center gap-2">
                        LinkedIn Connected Successfully
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      </h3>
                    </div>
                  </div>

                  {/* Profile Header */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-gradient-to-br from-success/5 to-success/10 border border-success/20 rounded-xl">
                    <div className="text-5xl sm:text-6xl">{profileData.profilePicture}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <h4 className="text-lg sm:text-xl font-bold break-words">{profileData.name}</h4>
                      </div>
                      <p className="text-sm sm:text-base font-medium text-foreground/80 break-words">{profileData.jobTitle}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">{profileData.company}</p>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
                      <div className="w-1 h-4 bg-primary rounded-full flex-shrink-0"></div>
                      About
                    </h5>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-3">
                      {profileData.about}
                    </p>
                  </div>

                  {/* Work Experience */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
                      <div className="w-1 h-4 bg-primary rounded-full flex-shrink-0"></div>
                      Work Experience
                    </h5>
                    <div className="space-y-3 pl-3">
                      {profileData.workExperience.map((exp, index) => (
                        <div key={index} className="relative pl-4 pb-3 border-l-2 border-border/50 last:border-l-0 last:pb-0">
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary"></div>
                          <div className="min-w-0">
                            <p className="font-medium text-xs sm:text-sm break-words">{exp.role}</p>
                            <p className="text-xs sm:text-sm text-foreground/70 break-words">{exp.company}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{exp.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
                      <div className="w-1 h-4 bg-primary rounded-full flex-shrink-0"></div>
                      Certifications
                    </h5>
                    <div className="space-y-2 pl-3">
                      {profileData.certifications.map((cert, index) => (
                        <div key={index} className="p-2.5 sm:p-3 bg-muted/50 rounded-lg border border-border/50">
                          <p className="font-medium text-xs sm:text-sm break-words">{cert.title}</p>
                          <p className="text-xs text-muted-foreground break-words">{cert.issuer} • {cert.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" onClick={handleLinkedInConnect} className="w-full" size="sm">
                    Reconnect LinkedIn
                  </Button>
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
                  <h3 className="text-lg font-semibold mb-1">College Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Required for profile credibility. Helps students identify and trust alumni mentors.
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
