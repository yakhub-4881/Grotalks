import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Layout } from '@/components/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MentorBio = () => {
  const navigate = useNavigate();
  const [bio, setBio] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  
  const MAX_BIO_LENGTH = 250;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8 px-4">
        <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Tell Us About Yourself</h1>
            <p className="text-sm text-muted-foreground">Step 4 of 8</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[50%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="space-y-6">
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
                placeholder="I'm a Product Manager at Flipkart with 5+ years experience in AI/ML products. Graduated from Vel Tech in 2018..."
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

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/mentor/linkedin')} className="flex-1 h-12">
                Back
              </Button>
              <Button
                onClick={() => navigate('/mentor/expertise')}
                className="flex-1 h-12 font-medium"
                disabled={!bio || !jobTitle || !company || !location || !experience}
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
