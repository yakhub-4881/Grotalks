import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Upload, CheckCircle2, XCircle, Loader2, FileText, Image, X, ChevronDown, ShieldCheck } from 'lucide-react';
import { collegeMap } from '@/lib/college-config';

type VerificationMethod = 'email' | 'documents' | null;

const AlumniAlumniVerification = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod>(null);
  
  // College dropdown states
  const [college, setCollege] = useState('');
  const [collegeDropdownOpen, setCollegeDropdownOpen] = useState(false);
  const [collegeName, setCollegeName] = useState('');
  
  // Email verification states
  const [alumniEmail, setAlumniEmail] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailVerifying, setEmailVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  // Document verification states
  const [marksheet, setMarksheet] = useState<File | null>(null);
  const [govtId, setGovtId] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [fullName, setFullName] = useState('');
  const [documentStatus, setDocumentStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');
  const [aadhaarName, setAadhaarName] = useState('');
  const [aadhaarLast4, setAadhaarLast4] = useState('');
  const [documentChecks, setDocumentChecks] = useState({ nameMatch: false, idMatch: false, photoMatch: false });
  const [verificationNote, setVerificationNote] = useState('');
  
  // College info
  const [batch, setBatch] = useState('');
  const [branch, setBranch] = useState('');
  
  const marksheetRef = useRef<HTMLInputElement>(null);
  const govtIdRef = useRef<HTMLInputElement>(null);
  const profilePhotoRef = useRef<HTMLInputElement>(null);

  const colleges = Object.entries(collegeMap).map(([key, info]) => ({
    key,
    name: info.fullName
  }));

  // Load signup data from session storage
  useEffect(() => {
    const savedData = sessionStorage.getItem('alumniSignupData');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.college) {
        setCollege(data.college);
        const collegeInfo = collegeMap[data.college];
        setCollegeName(collegeInfo?.fullName || '');
      }
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // College dropdown handlers
  const handleCollegeSelect = (collegeKey: string) => {
    setCollege(collegeKey);
    const collegeInfo = collegeMap[collegeKey];
    setCollegeName(collegeInfo?.fullName || '');
    setCollegeDropdownOpen(false);
    
    // Save to session storage
    const savedData = sessionStorage.getItem('alumniSignupData');
    if (savedData) {
      const data = JSON.parse(savedData);
      data.college = collegeKey;
      sessionStorage.setItem('alumniSignupData', JSON.stringify(data));
    }
  };

  const handleCollegeDropdownToggle = () => {
    setCollegeDropdownOpen(!collegeDropdownOpen);
  };

  const handleCollegeClear = () => {
    setCollege('');
    setCollegeName('');
    setCollegeDropdownOpen(false);
    
    // Save to session storage
    const savedData = sessionStorage.getItem('alumniSignupData');
    if (savedData) {
      const data = JSON.parse(savedData);
      delete data.college;
      sessionStorage.setItem('alumniSignupData', JSON.stringify(data));
    }
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

  // Email verification handlers
  const handleSendEmailOtp = async () => {
    if (!alumniEmail) return;
    setEmailSending(true);
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    setEmailSending(false);
    setEmailOtpSent(true);
    setCountdown(60);
  };

  const handleVerifyEmailOtp = async () => {
    if (emailOtp.length !== 6) return;
    setEmailVerifying(true);
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEmailVerifying(false);
    setEmailVerified(true);
  };

  const handleResendOtp = () => {
    setEmailOtp('');
    handleSendEmailOtp();
  };

  // Document verification handlers
  const handleFileUpload = (file: File | null, type: 'marksheet' | 'govtId' | 'profilePhoto') => {
    // Reset status when files change
    setDocumentStatus('idle');
    if (type === 'marksheet') setMarksheet(file);
    if (type === 'govtId') setGovtId(file);
    if (type === 'profilePhoto') setProfilePhoto(file);
  };

  const handleDocumentVerification = async () => {
    if (!marksheet || !govtId || !profilePhoto || !fullName || !aadhaarName || aadhaarLast4.length !== 4) return;
    setDocumentStatus('verifying');
    setVerificationNote('');
    // Simulate document verification (5-6 seconds)
    await new Promise(resolve => setTimeout(resolve, 5500));
    // Mock verification with deterministic checks
    const namesMatch = fullName.trim().toLowerCase() === aadhaarName.trim().toLowerCase();
    const idMatch = /^\d{4}$/.test(aadhaarLast4);
    const photoMatch = Boolean(profilePhoto); // assume a quick face match for demo
    setDocumentChecks({ nameMatch: namesMatch, idMatch, photoMatch });
    const isVerified = namesMatch && idMatch && photoMatch;
    setDocumentStatus(isVerified ? 'verified' : 'failed');
    setVerificationNote(
      isVerified
        ? 'Documents matched with Aadhaar details'
        : 'Name or Aadhaar digits did not match. Please recheck your entries.'
    );
  };

  const isEmailVerificationComplete = emailVerified;
  const isDocumentVerificationComplete = documentStatus === 'verified';
  const canContinue = (selectedMethod === 'email' && isEmailVerificationComplete) || 
                      (selectedMethod === 'documents' && isDocumentVerificationComplete);

  const handleContinue = () => {
    if (canContinue) {
      navigate('/alumni/bio');
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-6 sm:py-8 px-4">
        <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-lg p-4 sm:p-6 md:p-8 animate-fade-in">
          {/* Progress Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Alumni Verification</h1>
            <p className="text-sm text-muted-foreground">Step 3 of 8</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[37.5%] transition-all duration-300"></div>
            </div>
          </div>

          {/* College Info Section */}
          <Card className="p-4 sm:p-6 mb-6">
            <div className="flex items-start gap-3 sm:gap-4 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0 text-lg sm:text-xl">
                🎓
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold mb-1">College Information</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Required for profile credibility</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* College Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">College Name*</Label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleCollegeDropdownToggle}
                    className="w-full h-10 sm:h-12 px-3 py-2 text-left border rounded-md flex items-center justify-between bg-background hover:border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-input"
                  >
                    <div className="flex-1 min-w-0">
                      <span className={`block text-sm truncate ${college ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {college ? collegeName : 'Select your college'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {college && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCollegeClear();
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                      <ChevronDown className={`h-4 w-4 transition-transform ${collegeDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  {collegeDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {colleges.map((c) => (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => handleCollegeSelect(c.key)}
                          className="w-full px-3 py-2 text-left hover:bg-muted focus:bg-muted focus:outline-none"
                        >
                          <div className="text-sm font-medium text-foreground">{c.name}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-muted-foreground">Batch Year*</Label>
                  <Select value={batch} onValueChange={setBatch}>
                    <SelectTrigger className="h-10 sm:h-12 text-muted-foreground">
                      <SelectValue
                        placeholder="Select batch year"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-muted-foreground">Branch*</Label>
                  <Select value={branch} onValueChange={setBranch}>
                    <SelectTrigger className="h-10 sm:h-12 text-muted-foreground">
                      <SelectValue
                        placeholder="Select branch"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((br) => (
                        <SelectItem key={br} value={br}>{br}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {/* Verification Method Selection */}
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Choose Verification Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Email Verification Option */}
              <Card 
                className={`p-4 cursor-pointer transition-all hover:border-primary/50 ${
                  selectedMethod === 'email' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : ''
                }`}
                onClick={() => setSelectedMethod('email')}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedMethod === 'email' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base">Alumni Email OTP</h4>
                    <p className="text-xs text-muted-foreground mt-1">Verify with your official alumni email</p>
                  </div>
                </div>
              </Card>

              {/* Document Verification Option */}
              <Card 
                className={`p-4 cursor-pointer transition-all hover:border-primary/50 ${
                  selectedMethod === 'documents' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : ''
                }`}
                onClick={() => setSelectedMethod('documents')}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedMethod === 'documents' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Upload className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base">Document Upload</h4>
                    <p className="text-xs text-muted-foreground mt-1">Marksheet + Government ID verification</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Email Verification Flow */}
          {selectedMethod === 'email' && (
            <Card className="p-4 sm:p-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Alumni Email Verification</h4>
                </div>

                {!emailOtpSent ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Alumni Email Address*</Label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                          type="email"
                          placeholder="yourname@alumni.veltech.edu.in"
                          value={alumniEmail}
                          onChange={(e) => setAlumniEmail(e.target.value)}
                          className="h-10 sm:h-12 text-sm sm:text-base flex-1"
                        />
                        <Button 
                          onClick={handleSendEmailOtp}
                          disabled={!alumniEmail || emailSending}
                          className="h-10 sm:h-12 px-4 sm:px-6 whitespace-nowrap"
                        >
                          {emailSending ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Sending...
                            </>
                          ) : (
                            'Get OTP'
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter your official alumni email address to receive OTP
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-sm text-success font-medium">
                        OTP sent to {alumniEmail}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Enter 6-digit OTP*</Label>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="000000"
                        value={emailOtp}
                        onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className={`h-12 sm:h-14 text-center text-xl sm:text-2xl tracking-widest font-semibold ${
                          emailVerified ? 'border-success' : ''
                        }`}
                        maxLength={6}
                        disabled={emailVerified}
                      />
                    </div>

                    {emailVerified ? (
                      <div className="flex items-center gap-2 text-success">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">Email verified successfully!</span>
                      </div>
                    ) : (
                      <>
                        <div className="text-center">
                          {countdown > 0 ? (
                            <p className="text-sm text-muted-foreground">
                              Resend OTP in <span className="text-primary font-bold">{countdown}</span> sec
                            </p>
                          ) : (
                            <Button variant="link" onClick={handleResendOtp} className="text-primary p-0 h-auto">
                              Resend OTP
                            </Button>
                          )}
                        </div>

                        <Button
                          onClick={handleVerifyEmailOtp}
                          disabled={emailOtp.length !== 6 || emailVerifying}
                          className="w-full h-10 sm:h-12"
                        >
                          {emailVerifying ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Verifying...
                            </>
                          ) : (
                            'Verify OTP'
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Document Verification Flow */}
          {selectedMethod === 'documents' && (
            <Card className="p-4 sm:p-6 mb-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Document Verification</h4>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground">
                  Upload your marksheet and government ID. The name on documents must match your profile.
                </p>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Full Name (as per documents)*</Label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-10 sm:h-12 text-sm sm:text-base"
                    disabled={documentStatus === 'verified'}
                  />
                </div>

                {/* Aadhaar Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Aadhaar Name*</Label>
                    <Input
                      type="text"
                      placeholder="Name as per Aadhaar"
                      value={aadhaarName}
                      onChange={(e) => {
                        setAadhaarName(e.target.value);
                        setDocumentStatus('idle');
                      }}
                      className="h-10 sm:h-12 text-sm sm:text-base"
                      disabled={documentStatus === 'verified'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Aadhaar Last 4 digits*</Label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="1234"
                      value={aadhaarLast4}
                      onChange={(e) => {
                        setAadhaarLast4(e.target.value.replace(/\D/g, '').slice(0, 4));
                        setDocumentStatus('idle');
                      }}
                      className="h-10 sm:h-12 text-sm sm:text-base"
                      disabled={documentStatus === 'verified'}
                    />
                  </div>
                </div>

                {/* Profile Photo Upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Profile Photo*</Label>
                  <input
                    ref={profilePhotoRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'profilePhoto')}
                  />
                  {!profilePhoto ? (
                    <div 
                      onClick={() => profilePhotoRef.current?.click()}
                      className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <Image className="h-6 sm:h-8 w-6 sm:w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-xs sm:text-sm text-muted-foreground">Click to upload your photo</p>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG (Max 5MB)</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Image className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm flex-1 truncate">{profilePhoto.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setProfilePhoto(null)}
                        disabled={documentStatus === 'verified'}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Marksheet Upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">College Marksheet / Degree Certificate*</Label>
                  <input
                    ref={marksheetRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'marksheet')}
                  />
                  {!marksheet ? (
                    <div 
                      onClick={() => marksheetRef.current?.click()}
                      className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <FileText className="h-6 sm:h-8 w-6 sm:w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-xs sm:text-sm text-muted-foreground">Click to upload marksheet</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm flex-1 truncate">{marksheet.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setMarksheet(null)}
                        disabled={documentStatus === 'verified'}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Government ID Upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Government ID (Aadhaar / PAN / Passport)*</Label>
                  <input
                    ref={govtIdRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'govtId')}
                  />
                  {!govtId ? (
                    <div 
                      onClick={() => govtIdRef.current?.click()}
                      className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <FileText className="h-6 sm:h-8 w-6 sm:w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-xs sm:text-sm text-muted-foreground">Click to upload government ID</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm flex-1 truncate">{govtId.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setGovtId(null)}
                        disabled={documentStatus === 'verified'}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Verification Status */}
                {documentStatus === 'idle' && marksheet && govtId && profilePhoto && fullName && aadhaarName && aadhaarLast4.length === 4 && (
                  <Button
                    onClick={handleDocumentVerification}
                    className="w-full h-10 sm:h-12"
                  >
                    Submit for Verification
                  </Button>
                )}

                {documentStatus === 'verifying' && (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Verifying documents...</p>
                      <p className="text-xs text-muted-foreground">This may take 5-6 seconds</p>
                    </div>
                  </div>
                )}

                {documentStatus === 'verified' && (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-success">Documents Verified Successfully</p>
                      <p className="text-xs text-muted-foreground">Matched with Aadhaar details and photo</p>
                    </div>
                  </div>
                )}

                {documentStatus === 'failed' && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                      <p className="text-sm font-medium text-destructive">Verification Failed</p>
                    </div>
                    <p className="text-xs text-destructive">
                      {verificationNote || "Name or Aadhaar digits didn't match. Please check and try again."}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => {
                        setDocumentStatus('idle');
                        setDocumentChecks({ nameMatch: false, idMatch: false, photoMatch: false });
                      }}
                    >
                      Try Again
                    </Button>
                  </div>
                )}

                {(documentStatus === 'verifying' || documentStatus === 'verified' || documentStatus === 'failed') && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg border bg-muted/40 flex items-center gap-2">
                      <ShieldCheck className={`h-4 w-4 ${documentChecks.nameMatch ? 'text-success' : 'text-muted-foreground'}`} />
                      <div>
                        <p className="text-xs font-semibold">Name Match</p>
                        <p className="text-[11px] text-muted-foreground">{documentChecks.nameMatch ? 'Matches Aadhaar' : 'Awaiting match'}</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border bg-muted/40 flex items-center gap-2">
                      <ShieldCheck className={`h-4 w-4 ${documentChecks.idMatch ? 'text-success' : 'text-muted-foreground'}`} />
                      <div>
                        <p className="text-xs font-semibold">ID Digits</p>
                        <p className="text-[11px] text-muted-foreground">{documentChecks.idMatch ? 'Last 4 captured' : 'Need last 4 digits'}</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border bg-muted/40 flex items-center gap-2">
                      <ShieldCheck className={`h-4 w-4 ${documentChecks.photoMatch ? 'text-success' : 'text-muted-foreground'}`} />
                      <div>
                        <p className="text-xs font-semibold">Photo Check</p>
                        <p className="text-[11px] text-muted-foreground">{documentChecks.photoMatch ? 'Face matched' : 'Waiting for photo'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate('/alumni/signup/otp')}
              className="w-full sm:flex-1 h-10 sm:h-12"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              className="w-full sm:flex-1 h-10 sm:h-12 font-medium"
              disabled={!canContinue || !college || !batch || !branch}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AlumniAlumniVerification;
