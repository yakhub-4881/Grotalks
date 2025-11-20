import { useState } from 'react';
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

const MentorBio = () => {
  const navigate = useNavigate();
  
  // Mock LinkedIn data - in real app, this would come from LinkedIn API
  const [bio, setBio] = useState('Experienced Product Manager with 8+ years in e-commerce and fintech. Passionate about building products that solve real user problems. Led multiple 0-1 product launches and scaled features to millions of users.');
  const [jobTitle, setJobTitle] = useState('Senior Product Manager');
  const [company, setCompany] = useState('Flipkart');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('5-10');
  const [workExperience, setWorkExperience] = useState([
    { id: 1, company: 'Flipkart', role: 'Senior Product Manager', duration: '2021 - Present' },
    { id: 2, company: 'PayTM', role: 'Product Manager', duration: '2018 - 2021' },
    { id: 3, company: 'Amazon', role: 'Associate Product Manager', duration: '2016 - 2018' }
  ]);
  const [certifications, setCertifications] = useState([
    { id: 1, title: 'Product Management Certification', issuer: 'Product School', date: '2020' },
    { id: 2, title: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2019' }
  ]);
  const [languages, setLanguages] = useState<string[]>(['English', 'Hindi']);
  const [newLanguage, setNewLanguage] = useState('');
  
  const MAX_BIO_LENGTH = 250;

  const removeWorkExperience = (id: number) => {
    setWorkExperience(workExperience.filter(exp => exp.id !== id));
  };

  const removeCertification = (id: number) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
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
                  <Label htmlFor="jobTitle" className="text-sm font-semibold">Job Title*</Label>
                  <Input
                    id="jobTitle"
                    placeholder="Product Manager"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-semibold">Company*</Label>
                  <Input
                    id="company"
                    placeholder="Flipkart"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>

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
                  <Label htmlFor="experience" className="text-sm font-semibold">Experience*</Label>
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
            </Card>

            {/* Work Experience */}
            <Card className="p-4 sm:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Work Experience</h2>
              <p className="text-sm text-muted-foreground">Remove any experience you don't want to display</p>
              
              <div className="space-y-3">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg group hover:bg-muted transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm">{exp.role}</h3>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-xs text-muted-foreground mt-1">{exp.duration}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeWorkExperience(exp.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                {workExperience.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No work experience added</p>
                )}
              </div>
            </Card>

            {/* Certifications */}
            <Card className="p-4 sm:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Certifications</h2>
              <p className="text-sm text-muted-foreground">Remove any certifications you don't want to display</p>
              
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg group hover:bg-muted transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCertification(cert.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                {certifications.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No certifications added</p>
                )}
              </div>
            </Card>

            {/* Languages Spoken */}
            <Card className="p-4 sm:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Languages Spoken</h2>
              <p className="text-sm text-muted-foreground">Add languages to help students find mentors in their preferred language</p>
              
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
              <Button variant="outline" onClick={() => navigate('/mentor/linkedin')} className="flex-1 h-12">
                Back
              </Button>
              <Button
                onClick={() => navigate('/mentor/expertise')}
                className="flex-1 h-12 font-medium"
                disabled={!bio || !jobTitle || !company || !location || !experience || languages.length === 0}
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

export default MentorBio;
