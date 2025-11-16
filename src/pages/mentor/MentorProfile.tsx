import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, Loader2, Save, AlertCircle } from 'lucide-react';

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
    
    // Simulate API call
    setTimeout(() => {
      // Check if credibility fields changed
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
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center text-4xl font-bold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{profile.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{profile.jobTitle} at {profile.company}</p>
                <p className="text-sm text-muted-foreground mb-3">⭐ 4.8 • 47 sessions</p>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Warning for credibility changes */}
          {isEditing && (
            <Card className="p-4 mb-6 border-yellow-500/50 bg-yellow-500/5">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-600">Important</p>
                  <p className="text-sm text-muted-foreground">
                    Changes to job title, company, or experience may trigger re-verification to maintain platform credibility.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Professional Information */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-6">Professional Information</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio (10-250 characters)</Label>
                <Textarea
                  id="bio"
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value.slice(0, 250) })}
                  disabled={!isEditing}
                  className="min-h-24"
                  maxLength={250}
                />
                <p className="text-xs text-muted-foreground">{editedProfile.bio.length}/250 characters</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title*</Label>
                  <Input
                    id="jobTitle"
                    value={editedProfile.jobTitle}
                    onChange={(e) => setEditedProfile({ ...editedProfile, jobTitle: e.target.value })}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company*</Label>
                  <Input
                    id="company"
                    value={editedProfile.company}
                    onChange={(e) => setEditedProfile({ ...editedProfile, company: e.target.value })}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location*</Label>
                  <Input
                    id="location"
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience*</Label>
                  <Input
                    id="experience"
                    value={editedProfile.experience}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-6">Contact Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  value={editedProfile.email}
                  disabled
                  className="h-12 opacity-60"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={editedProfile.phone}
                  disabled
                  className="h-12 opacity-60"
                />
                <p className="text-xs text-muted-foreground">Phone cannot be changed</p>
              </div>
            </div>
          </Card>

          {/* Pricing */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-6">Pricing</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rate">Hourly Rate (₹300-₹5000)</Label>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      id="rate"
                      type="number"
                      value={editedProfile.hourlyRate}
                      onChange={(e) => setEditedProfile({ ...editedProfile, hourlyRate: parseInt(e.target.value) || 0 })}
                      disabled={!isEditing}
                      className="h-12 pl-8"
                      min={300}
                      max={5000}
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Per-minute rate:</p>
                    <p className="text-lg font-bold text-primary">₹{(editedProfile.hourlyRate / 60).toFixed(2)}/min</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleCancel} className="flex-1 h-12">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="flex-1 h-12">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MentorProfile;
