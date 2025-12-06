import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, Loader2, Save, AlertCircle, Plus, Trash2, Edit2, Building2, Award } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MentorServices, MentorService } from '@/components/MentorServices';

interface WorkExperience {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
}

const MentorProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    bio: 'Product Manager at Google with 7+ years in tech. Passionate about mentoring and helping students.',
    jobTitle: 'Senior Product Manager',
    company: 'Google',
    location: 'Bangalore, India',
    experience: '5-10 years',
    hourlyRate: 600,
    skills: ['Product Management', 'Strategy', 'User Research']
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  // Work Experience State
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
    { 
      id: 1, 
      title: 'Senior Product Manager', 
      company: 'Google', 
      duration: 'Jan 2021 - Present',
      description: 'Leading product strategy for cloud services with focus on enterprise solutions'
    },
    { 
      id: 2, 
      title: 'Product Manager', 
      company: 'Microsoft', 
      duration: 'Mar 2018 - Dec 2020',
      description: 'Managed cross-functional teams to deliver innovative software products'
    },
  ]);
  
  const [showWorkDialog, setShowWorkDialog] = useState(false);
  const [editingWork, setEditingWork] = useState<WorkExperience | null>(null);
  const [workForm, setWorkForm] = useState<Partial<WorkExperience>>({});

  // Certification State
  const [certifications, setCertifications] = useState<Certification[]>([
    { id: 1, name: 'Certified Product Manager', issuer: 'Product School', year: '2020' },
    { id: 2, name: 'Agile Scrum Master', issuer: 'Scrum Alliance', year: '2019' },
  ]);
  
  const [showCertDialog, setShowCertDialog] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [certForm, setCertForm] = useState<Partial<Certification>>({});

  // Services State
  const [services, setServices] = useState<MentorService[]>([
    { id: 1, type: 'call', title: '1:1 Career Guidance Call', duration: 30, price: 2000 },
    { id: 2, type: 'call', title: 'Mock Interview Session', duration: 45, price: 3500 },
    { id: 3, type: 'dm', title: 'Resume Review', duration: 0, price: 1500, description: 'Get detailed feedback on your resume within 48 hours' },
    { id: 4, type: 'product', title: 'LinkedIn Optimization', duration: 0, price: 2500, description: 'Complete profile revamp with keyword optimization' },
  ]);

  const handleSave = async () => {
    if (editedProfile.bio.length < 10 || editedProfile.bio.length > 250) {
      toast({
        title: 'Validation Error',
        description: 'Bio must be between 10-250 characters',
        variant: 'destructive'
      });
      return;
    }

    if (editedProfile.hourlyRate < 300 || editedProfile.hourlyRate > 5000) {
      toast({
        title: 'Validation Error',
        description: 'Hourly rate must be between ₹300-₹5000',
        variant: 'destructive'
      });
      return;
    }

    setIsSaving(true);
    
    setTimeout(() => {
      const credibilityChanged = 
        editedProfile.jobTitle !== profile.jobTitle ||
        editedProfile.company !== profile.company ||
        editedProfile.experience !== profile.experience;

      setProfile(editedProfile);
      setIsEditing(false);
      setIsSaving(false);
      
      if (credibilityChanged) {
        toast({
          title: '✓ Profile Updated - Verification Required',
          description: 'Changes to job/company require re-verification. You may receive a verification request.',
        });
      } else {
        toast({
          title: '✓ Profile Updated',
          description: 'Your changes have been saved successfully',
        });
      }
    }, 1500);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  // Work Experience Handlers
  const handleAddWork = () => {
    setEditingWork(null);
    setWorkForm({});
    setShowWorkDialog(true);
  };

  const handleEditWork = (work: WorkExperience) => {
    setEditingWork(work);
    setWorkForm(work);
    setShowWorkDialog(true);
  };

  const handleSaveWork = () => {
    if (!workForm.title || !workForm.company || !workForm.duration) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    if (editingWork) {
      setWorkExperiences(workExperiences.map(w => 
        w.id === editingWork.id ? { ...w, ...workForm } as WorkExperience : w
      ));
      toast({ title: 'Work experience updated successfully' });
    } else {
      const newWork: WorkExperience = {
        id: Date.now(),
        title: workForm.title!,
        company: workForm.company!,
        duration: workForm.duration!,
        description: workForm.description || ''
      };
      setWorkExperiences([...workExperiences, newWork]);
      toast({ title: 'Work experience added successfully' });
    }
    
    setShowWorkDialog(false);
    setWorkForm({});
  };

  const handleDeleteWork = (id: number) => {
    setWorkExperiences(workExperiences.filter(w => w.id !== id));
    toast({ title: 'Work experience removed' });
  };

  // Certification Handlers
  const handleAddCert = () => {
    setEditingCert(null);
    setCertForm({});
    setShowCertDialog(true);
  };

  const handleEditCert = (cert: Certification) => {
    setEditingCert(cert);
    setCertForm(cert);
    setShowCertDialog(true);
  };

  const handleSaveCert = () => {
    if (!certForm.name || !certForm.issuer || !certForm.year) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    if (editingCert) {
      setCertifications(certifications.map(c => 
        c.id === editingCert.id ? { ...c, ...certForm } as Certification : c
      ));
      toast({ title: 'Certification updated successfully' });
    } else {
      const newCert: Certification = {
        id: Date.now(),
        name: certForm.name!,
        issuer: certForm.issuer!,
        year: certForm.year!
      };
      setCertifications([...certifications, newCert]);
      toast({ title: 'Certification added successfully' });
    }
    
    setShowCertDialog(false);
    setCertForm({});
  };

  const handleDeleteCert = (id: number) => {
    setCertifications(certifications.filter(c => c.id !== id));
    toast({ title: 'Certification removed' });
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8">
        <div className="container max-w-4xl px-4">
          <Button variant="ghost" onClick={() => navigate('/mentor/dashboard')} className="mb-4 md:mb-6 text-sm md:text-base">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 truncate">My Profile</h1>
              <p className="text-sm md:text-base text-muted-foreground">Manage your mentor profile and settings</p>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="text-sm h-9 md:h-10 w-full sm:w-auto">
                Edit Profile
              </Button>
            )}
          </div>

          {/* Profile Photo */}
          <Card className="p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl md:text-4xl font-bold flex-shrink-0">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 text-center sm:text-left w-full">
                <h3 className="text-base md:text-lg font-semibold mb-1">{profile.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">{profile.jobTitle} at {profile.company}</p>
                <p className="text-xs md:text-sm text-muted-foreground mb-3">⭐ 4.8 • 47 sessions</p>
                {isEditing && (
                  <Button variant="outline" size="sm" className="text-xs md:text-sm h-8 md:h-9">
                    <Upload className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Change Photo
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Warning for credibility changes */}
          {isEditing && (
            <Card className="p-3 md:p-4 mb-4 md:mb-6 border-yellow-500/50 bg-yellow-500/5">
              <div className="flex items-start gap-2 md:gap-3">
                <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium text-yellow-600">Important</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Changes to job title, company, or experience may trigger re-verification to maintain platform credibility.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Professional Information */}
          <Card className="p-4 md:p-6 mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Professional Information</h3>
            
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-xs md:text-sm">Professional Bio (10-250 characters)</Label>
                <Textarea
                  id="bio"
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value.slice(0, 250) })}
                  disabled={!isEditing}
                  className="min-h-20 md:min-h-24 text-xs md:text-sm"
                  maxLength={250}
                />
                <p className="text-xs text-muted-foreground">{editedProfile.bio.length}/250 characters</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-xs md:text-sm">Job Title*</Label>
                  <Input
                    id="jobTitle"
                    value={editedProfile.jobTitle}
                    onChange={(e) => setEditedProfile({ ...editedProfile, jobTitle: e.target.value })}
                    disabled={!isEditing}
                    className="h-10 md:h-12 text-xs md:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-xs md:text-sm">Company*</Label>
                  <Input
                    id="company"
                    value={editedProfile.company}
                    onChange={(e) => setEditedProfile({ ...editedProfile, company: e.target.value })}
                    disabled={!isEditing}
                    className="h-10 md:h-12 text-xs md:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xs md:text-sm">Location*</Label>
                  <Input
                    id="location"
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    disabled={!isEditing}
                    className="h-10 md:h-12 text-xs md:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-xs md:text-sm">Experience*</Label>
                  <Input
                    id="experience"
                    value={editedProfile.experience}
                    disabled={!isEditing}
                    className="h-10 md:h-12 text-xs md:text-sm"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Work Experience Section */}
          <Card className="p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-semibold">Work Experience</h3>
              <Button size="sm" onClick={handleAddWork} className="text-xs md:text-sm h-8 md:h-9 w-full sm:w-auto">
                <Plus className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                Add Experience
              </Button>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {workExperiences.map((work) => (
                <Card key={work.id} className="p-3 md:p-4 border bg-muted/30">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-sm md:text-base mb-1">{work.title}</h4>
                        <p className="text-xs md:text-sm text-muted-foreground mb-1">{work.company}</p>
                        <p className="text-xs text-muted-foreground mb-2">{work.duration}</p>
                        {work.description && (
                          <p className="text-xs md:text-sm text-foreground">{work.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-2 border-t">
                      <Button size="sm" variant="ghost" onClick={() => handleEditWork(work)} className="h-8 text-xs">
                        <Edit2 className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
                        <span className="hidden md:inline">Edit</span>
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteWork(work.id)} className="h-8 text-xs text-destructive">
                        <Trash2 className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
                        <span className="hidden md:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Certifications Section */}
          <Card className="p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-semibold">Certifications</h3>
              <Button size="sm" onClick={handleAddCert} className="text-xs md:text-sm h-8 md:h-9 w-full sm:w-auto">
                <Plus className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                Add Certification
              </Button>
            </div>
            
            <div className="grid gap-3 md:gap-4 md:grid-cols-2">
              {certifications.map((cert) => (
                <Card key={cert.id} className="p-3 md:p-4 border bg-muted/30">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-bonus/10 flex items-center justify-center">
                          <Award className="h-5 w-5 text-bonus" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-xs md:text-sm mb-1 line-clamp-2">{cert.name}</h4>
                        <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground mt-1">{cert.year}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-2 border-t">
                      <Button size="sm" variant="ghost" className="h-8 text-xs" onClick={() => handleEditCert(cert)}>
                        <Edit2 className="h-3 w-3 md:mr-2" />
                        <span className="hidden md:inline">Edit</span>
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 text-xs text-destructive" onClick={() => handleDeleteCert(cert.id)}>
                        <Trash2 className="h-3 w-3 md:mr-2" />
                        <span className="hidden md:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-4 md:p-6 mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Contact Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <Label className="text-xs md:text-sm">Email Address</Label>
                <Input
                  value={editedProfile.email}
                  disabled
                  className="h-10 md:h-12 opacity-60 text-xs md:text-sm"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs md:text-sm">Phone Number</Label>
                <Input
                  value={editedProfile.phone}
                  disabled
                  className="h-10 md:h-12 opacity-60 text-xs md:text-sm"
                />
                <p className="text-xs text-muted-foreground">Phone cannot be changed</p>
              </div>
            </div>
          </Card>

          {/* Services Section */}
          <Card className="p-4 md:p-6 mb-4 md:mb-6">
            <MentorServices
              services={services}
              onServicesChange={setServices}
              isEditable={true}
            />
          </Card>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button variant="outline" onClick={handleCancel} className="flex-1 h-10 md:h-12 text-sm md:text-base">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="flex-1 h-10 md:h-12 text-sm md:text-base">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 md:h-4 md:w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Work Experience Dialog */}
      <Dialog open={showWorkDialog} onOpenChange={setShowWorkDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg">{editingWork ? 'Edit' : 'Add'} Work Experience</DialogTitle>
            <DialogDescription className="text-xs md:text-sm">
              Add your professional work experience from LinkedIn
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 md:space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="work-title" className="text-xs md:text-sm">Job Title*</Label>
              <Input
                id="work-title"
                value={workForm.title || ''}
                onChange={(e) => setWorkForm({ ...workForm, title: e.target.value })}
                placeholder="e.g., Senior Product Manager"
                className="h-9 md:h-10 text-xs md:text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-company" className="text-xs md:text-sm">Company*</Label>
              <Input
                id="work-company"
                value={workForm.company || ''}
                onChange={(e) => setWorkForm({ ...workForm, company: e.target.value })}
                placeholder="e.g., Google"
                className="h-9 md:h-10 text-xs md:text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-duration" className="text-xs md:text-sm">Duration*</Label>
              <Input
                id="work-duration"
                value={workForm.duration || ''}
                onChange={(e) => setWorkForm({ ...workForm, duration: e.target.value })}
                placeholder="e.g., Jan 2021 - Present"
                className="h-9 md:h-10 text-xs md:text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-description" className="text-xs md:text-sm">Description</Label>
              <Textarea
                id="work-description"
                value={workForm.description || ''}
                onChange={(e) => setWorkForm({ ...workForm, description: e.target.value })}
                placeholder="Brief description of your role and achievements"
                rows={3}
                className="text-xs md:text-sm"
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowWorkDialog(false)} className="w-full sm:w-auto text-xs md:text-sm h-9">Cancel</Button>
            <Button onClick={handleSaveWork} className="w-full sm:w-auto text-xs md:text-sm h-9">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Certification Dialog */}
      <Dialog open={showCertDialog} onOpenChange={setShowCertDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg">{editingCert ? 'Edit' : 'Add'} Certification</DialogTitle>
            <DialogDescription className="text-xs md:text-sm">
              Add your professional certifications from LinkedIn
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 md:space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cert-name" className="text-xs md:text-sm">Certification Name*</Label>
              <Input
                id="cert-name"
                value={certForm.name || ''}
                onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                placeholder="e.g., Certified Scrum Master"
                className="h-9 md:h-10 text-xs md:text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cert-issuer" className="text-xs md:text-sm">Issuing Organization*</Label>
              <Input
                id="cert-issuer"
                value={certForm.issuer || ''}
                onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                placeholder="e.g., Scrum Alliance"
                className="h-9 md:h-10 text-xs md:text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cert-year" className="text-xs md:text-sm">Year Obtained*</Label>
              <Input
                id="cert-year"
                value={certForm.year || ''}
                onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                placeholder="e.g., 2020"
                className="h-9 md:h-10 text-xs md:text-sm"
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowCertDialog(false)} className="w-full sm:w-auto text-xs md:text-sm h-9">Cancel</Button>
            <Button onClick={handleSaveCert} className="w-full sm:w-auto text-xs md:text-sm h-9">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MentorProfile;
