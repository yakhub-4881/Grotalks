import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Layout } from '@/components/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

type WorkExperienceItem = {
  id: number;
  company: string;
  role: string;
  startYear: string;
  endYear: string;
  isCurrent?: boolean;
};

const AlumniBio = () => {
  const navigate = useNavigate();
  
  const [bio, setBio] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [workExperience, setWorkExperience] = useState<WorkExperienceItem[]>([
    { id: 1, company: '', role: '', startYear: '', endYear: '', isCurrent: false },
  ]);
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [certifications, setCertifications] = useState<
    { id: number; title: string; issuer: string; date: string }[]
  >([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [newLanguage, setNewLanguage] = useState('');
  
  const MAX_BIO_LENGTH = 250;

  const hasCurrentExperience = useMemo(
    () => workExperience.some(exp => exp.isCurrent),
    [workExperience]
  );

  const isCurrentExperienceValid = useMemo(
    () =>
      workExperience.some(
        exp =>
          exp.isCurrent &&
          exp.role.trim().length > 0 &&
          exp.company.trim().length > 0 &&
          exp.startYear.trim().length > 0
      ),
    [workExperience]
  );

  const removeWorkExperience = (id: number) => {
    setWorkExperience(workExperience.filter(exp => exp.id !== id));
  };

  const addWorkExperience = (overrides: Partial<WorkExperienceItem> = {}) => {
    setWorkExperience(prev => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(exp => exp.id)) + 1 : 1;
      return [
        ...prev,
        {
          id: nextId,
          company: '',
          role: '',
          startYear: '',
          endYear: '',
          isCurrent: false,
          ...overrides
        }
      ];
    });
  };

  const updateWorkExperience = (id: number, field: keyof WorkExperienceItem, value: string | boolean) => {
    setWorkExperience(prev =>
      prev.map(exp => {
        if (field === 'isCurrent') {
          if (value) {
            return { ...exp, isCurrent: exp.id === id, endYear: exp.id === id ? '' : exp.endYear };
          }
          if (exp.id === id) {
            return { ...exp, isCurrent: false };
          }
          return exp;
        }
        return exp.id === id ? { ...exp, [field]: value } : exp;
      })
    );
  };

  const removeCertification = (id: number) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  const addCertification = () => {
    const nextId = certifications.length > 0 ? Math.max(...certifications.map(cert => cert.id)) + 1 : 1;
    setCertifications([
      ...certifications,
      { id: nextId, title: '', issuer: '', date: '' }
    ]);
  };

  const updateCertification = (id: number, field: 'title' | 'issuer' | 'date', value: string) => {
    setCertifications((prev) =>
      prev.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setLanguages(languages.filter(lang => lang !== language));
  };

  const canProceed = useMemo(() => {
    const hasBasicInfo =
      bio.trim().length > 0 &&
      location.trim().length > 0 &&
      experience.trim().length > 0 &&
      languages.length > 0;
    const hasValidExperiences = workExperience.every(
      exp =>
        exp.role.trim().length > 0 &&
        exp.company.trim().length > 0 &&
        exp.startYear.trim().length > 0 &&
        (exp.isCurrent || exp.endYear.trim().length > 0)
    );
    const currentRoleOk = !hasCurrentExperience || isCurrentExperienceValid;
    return hasBasicInfo && currentRoleOk && hasValidExperiences;
  }, [bio, location, experience, languages.length, hasCurrentExperience, isCurrentExperienceValid, workExperience]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8 px-4">
        <div className="w-full max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Review Your Professional Profile</h1>
            <p className="text-sm text-muted-foreground">Step 4 of 8 • Edit or remove any information as needed</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[50%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="p-4 sm:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Basic Information</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="bio" className="text-sm font-semibold">
                    Professional Bio* (250 chars max)
                  </Label>
                  <span 
                    className={`text-sm ${
                      bio.length > MAX_BIO_LENGTH ? 'text-destructive' : 'text-muted-foreground'
                    }`}
                  >
                    {bio.length} / {MAX_BIO_LENGTH}
                  </span>
                </div>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your professional journey..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, MAX_BIO_LENGTH))}
                  className="min-h-32 text-base resize-none"
                  maxLength={MAX_BIO_LENGTH}
                />
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-semibold">Location*</Label>
                  <Input
                    id="location"
                    placeholder="Bangalore, India"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-semibold">Total Experience*</Label>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-sm font-semibold">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  placeholder="https://www.linkedin.com/in/your-profile"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

            </Card>

            {/* Work Experience */}
            <Card className="p-4 sm:p-6 space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Work Experience</h2>
                <p className="text-sm text-muted-foreground">Showcase meaningful roles (latest first) to build credibility.</p>
              </div>
              
              <div className="space-y-4">
                {workExperience.map((exp, index) => (
                  <div
                    key={exp.id}
                    className={`rounded-2xl border bg-card/80 shadow-sm p-4 space-y-4 ${
                      exp.isCurrent ? 'border-primary/60' : 'border-muted'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-foreground">
                        {exp.isCurrent ? 'Current Role' : `Experience #${index + 1}`}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeWorkExperience(exp.id)}
                        aria-label="Remove experience"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground uppercase">Role / Title</Label>
                        <Input
                          value={exp.role}
                          onChange={(e) => updateWorkExperience(exp.id, 'role', e.target.value)}
                          placeholder="Senior Product Manager"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground uppercase">Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                          placeholder="Flipkart"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground uppercase">Start Year</Label>
                        <Select
                          value={exp.startYear}
                          onValueChange={(value) => updateWorkExperience(exp.id, 'startYear', value)}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 30 }, (_, idx) => (new Date().getFullYear() - idx).toString()).map((year) => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground uppercase">End Year</Label>
                        <Select
                          value={exp.isCurrent ? 'current' : exp.endYear}
                          onValueChange={(value) => {
                            if (value === 'current') {
                              updateWorkExperience(exp.id, 'isCurrent', true);
                            } else {
                              updateWorkExperience(exp.id, 'endYear', value);
                              updateWorkExperience(exp.id, 'isCurrent', false);
                            }
                          }}
                          disabled={exp.isCurrent}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder={exp.isCurrent ? 'Current' : 'Select year'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="current">Mark as Current</SelectItem>
                            {Array.from({ length: 30 }, (_, idx) => (new Date().getFullYear() - idx).toString()).map((year) => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
                {workExperience.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-muted p-6 text-center text-sm text-muted-foreground">
                    No work experience added yet.
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <p className="text-xs text-muted-foreground sm:flex-1">Add internships, full-time roles, or entrepreneurial journeys.</p>
                <Button variant="secondary" className="flex-1 sm:flex-none" onClick={() => addWorkExperience()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add another experience
                </Button>
              </div>
            </Card>

            {/* Certifications */}
            <Card className="p-4 sm:p-6 space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Certifications</h2>
                <p className="text-sm text-muted-foreground">Highlight credentials that reinforce trust.</p>
              </div>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={cert.id} className="rounded-2xl border border-muted bg-card/80 shadow-sm p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">Certification #{index + 1}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCertification(cert.id)}
                        aria-label="Remove certification"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground uppercase">Title</Label>
                        <Input
                          value={cert.title}
                          onChange={(e) => updateCertification(cert.id, 'title', e.target.value)}
                          placeholder="Product Management Certification"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground uppercase">Issuer</Label>
                        <Input
                          value={cert.issuer}
                          onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                          placeholder="Product School"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground uppercase">Year / Date</Label>
                        <Input
                          value={cert.date}
                          onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                          placeholder="2023"
                          className="h-11"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {certifications.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-muted p-6 text-center text-sm text-muted-foreground">
                    No certifications added yet.
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <p className="text-xs text-muted-foreground sm:flex-1">Include degrees, bootcamps, licenses, or industry-recognized programs.</p>
                <Button variant="secondary" className="flex-1 sm:flex-none" onClick={addCertification}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add another certification
                </Button>
              </div>
            </Card>

            {/* Languages Spoken */}
            <Card className="p-4 sm:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Languages Spoken</h2>
              <p className="text-sm text-muted-foreground">Add languages to help students find alumni in their preferred language</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {languages.map((language) => (
                  <Badge key={language} variant="secondary" className="px-3 py-1.5 text-sm">
                    {language}
                    <button
                      onClick={() => removeLanguage(language)}
                      className="ml-2 hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {languages.length === 0 && (
                  <p className="text-sm text-muted-foreground">No languages added yet</p>
                )}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add a language (e.g., English, Hindi)"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                  className="flex-1"
                />
                <Button onClick={addLanguage} size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/alumni/linkedin')} className="flex-1 h-12">
                Back
              </Button>
              <Button
                onClick={() => navigate('/alumni/expertise')}
                className="flex-1 h-12 font-medium"
                disabled={!canProceed}
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

export default AlumniBio;
