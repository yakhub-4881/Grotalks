import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { collegeMap } from '@/lib/college-config';

const MenteeSignupProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    about: '',
    branch: '',
    stream: '',
    year: '',
    college: '',
    city: '',
    state: '',
    languages: [] as string[],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const streams = ['Engineering', 'Medical', 'Commerce', 'Arts', 'Science', 'Management', 'Law'];
  const branches = {
    Engineering: ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Electronics', 'IT', 'Chemical'],
    Medical: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'Nursing', 'Pharmacy'],
    Commerce: ['B.Com', 'BBA', 'CA', 'CS'],
    Arts: ['BA English', 'BA History', 'BA Psychology', 'BA Political Science'],
    Science: ['BSc Physics', 'BSc Chemistry', 'BSc Mathematics', 'BSc Biology'],
    Management: ['MBA', 'PGDM', 'BMS'],
    Law: ['LLB', 'BA LLB', 'BBA LLB']
  };
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Final Year', 'Graduated/Alumni'];
  const colleges = Object.values(collegeMap).map(c => c.fullName);
  const availableLanguages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi'];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.about || formData.about.length < 10) {
      newErrors.about = 'About must be at least 10 characters';
    }
    if (formData.about.length > 500) {
      newErrors.about = 'About must not exceed 500 characters';
    }
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.stream) newErrors.stream = 'Stream is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.college) newErrors.college = 'College is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (formData.languages.length === 0) newErrors.languages = 'Select at least one language';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Save to session storage for recovery
      sessionStorage.setItem('menteeProfile', JSON.stringify(formData));
      navigate('/mentee/interests');
    } else {
      toast({
        title: 'Validation Error',
        description: 'Please fill all required fields correctly',
        variant: 'destructive'
      });
    }
  };

  const toggleLanguage = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const currentBranches = formData.stream ? branches[formData.stream as keyof typeof branches] || [] : [];
  const isFormValid = Object.keys(errors).length === 0 && 
    formData.about && formData.branch && formData.stream && formData.year && 
    formData.college && formData.city && formData.state &&
    formData.languages.length > 0;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Student Profile Setup</h1>
            <p className="text-sm text-muted-foreground">Step 3 of 4 - Tell us about yourself</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[75%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="space-y-6">
            {/* About */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="about">About Yourself* (10-500 characters)</Label>
                <span className={`text-sm ${formData.about.length > 500 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {formData.about.length}/500
                </span>
              </div>
              <Textarea
                id="about"
                placeholder="Tell us about your background, interests, and what you're looking for..."
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                className={`min-h-24 ${errors.about ? 'border-destructive' : ''}`}
                maxLength={500}
              />
              {errors.about && <p className="text-sm text-destructive">{errors.about}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Stream */}
              <div className="space-y-2">
                <Label htmlFor="stream">Stream*</Label>
                <Select value={formData.stream} onValueChange={(value) => setFormData({ ...formData, stream: value, branch: '' })}>
                  <SelectTrigger className={`h-12 ${errors.stream ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select stream" />
                  </SelectTrigger>
                  <SelectContent>
                    {streams.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.stream && <p className="text-sm text-destructive">{errors.stream}</p>}
              </div>

              {/* Branch */}
              <div className="space-y-2">
                <Label htmlFor="branch">Branch*</Label>
                <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })} disabled={!formData.stream}>
                  <SelectTrigger className={`h-12 ${errors.branch ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentBranches.map(b => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.branch && <p className="text-sm text-destructive">{errors.branch}</p>}
              </div>

              {/* Year */}
              <div className="space-y-2">
                <Label htmlFor="year">Which Year*</Label>
                <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                  <SelectTrigger className={`h-12 ${errors.year ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(y => (
                      <SelectItem key={y} value={y}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.year && <p className="text-sm text-destructive">{errors.year}</p>}
              </div>

            </div>

            {/* College */}
            <div className="space-y-2">
              <Label htmlFor="college">College*</Label>
              <Select value={formData.college} onValueChange={(value) => setFormData({ ...formData, college: value })}>
                <SelectTrigger className={`h-12 ${errors.college ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select your college" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.college && <p className="text-sm text-destructive">{errors.college}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">City*</Label>
                <Input
                  id="city"
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`h-12 ${errors.city ? 'border-destructive' : ''}`}
                />
                {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
              </div>

              {/* State */}
              <div className="space-y-2">
                <Label htmlFor="state">State*</Label>
                <Input
                  id="state"
                  placeholder="Maharashtra"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className={`h-12 ${errors.state ? 'border-destructive' : ''}`}
                />
                {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <Label>Languages You Speak* (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableLanguages.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.languages.includes(lang)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      formData.languages.includes(lang) ? 'bg-primary border-primary' : 'border-input'
                    }`}>
                      {formData.languages.includes(lang) && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{lang}</span>
                  </div>
                ))}
              </div>
              {errors.languages && <p className="text-sm text-destructive">{errors.languages}</p>}
              {formData.languages.length > 0 && (
                <p className="text-sm text-success flex items-center gap-1">
                  <span>✓</span> {formData.languages.length} language{formData.languages.length > 1 ? 's' : ''} selected
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>💡 Why we need this:</strong><br />
                This information helps us connect you with the right alumni and ensure account security.
              </p>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/signup')} className="flex-1 h-12">
                Back
              </Button>
              <Button onClick={handleSubmit} className="flex-1 h-12 font-medium" disabled={!isFormValid}>
                Next: Select Interests
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MenteeSignupProfile;
