import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, Loader2, Save } from 'lucide-react';

const MenteeProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Ravi Kumar',
    email: 'ravi.kumar@example.com',
    phone: '+91 98765 43210',
    about: 'Computer Science student interested in Product Management and Entrepreneurship',
    college: 'Vel Tech Rangarajan Dr. Sagunthala R & D Institute',
    branch: 'Computer Science',
    year: '3rd Year',
    city: 'Chennai',
    state: 'Tamil Nadu',
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = async () => {
    if (editedProfile.about.length < 10) {
      toast({
        title: 'Validation Error',
        description: 'About must be at least 10 characters',
        variant: 'destructive'
      });
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setProfile(editedProfile);
      setIsEditing(false);
      setIsSaving(false);
      toast({
        title: '✓ Profile Updated',
        description: 'Your changes have been saved successfully',
      });
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
          <Button variant="ghost" onClick={() => navigate('/mentee/dashboard')} className="mb-4 md:mb-6 text-sm md:text-base">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 truncate">My Profile</h1>
              <p className="text-sm md:text-base text-muted-foreground">Manage your Student account information</p>
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
              <div className="flex-1 text-center sm:text-left min-w-0">
                <h3 className="text-base md:text-lg font-semibold mb-1 truncate">{profile.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">{profile.college}</p>
                {isEditing && (
                  <Button variant="outline" size="sm" className="text-xs md:text-sm h-8 md:h-9">
                    <Upload className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Change Photo
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Profile Information */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile.email}
                    disabled
                    className="h-12 opacity-60"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={editedProfile.phone}
                    disabled
                    className="h-12 opacity-60"
                  />
                  <p className="text-xs text-muted-foreground">Phone cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Current Year</Label>
                  <Input
                    id="year"
                    value={editedProfile.year}
                    onChange={(e) => setEditedProfile({ ...editedProfile, year: e.target.value })}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">About (min 10 characters)</Label>
                <Textarea
                  id="about"
                  value={editedProfile.about}
                  onChange={(e) => setEditedProfile({ ...editedProfile, about: e.target.value })}
                  disabled={!isEditing}
                  className="min-h-24"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground">{editedProfile.about.length}/500 characters</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={editedProfile.city}
                    onChange={(e) => setEditedProfile({ ...editedProfile, city: e.target.value })}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={editedProfile.state}
                    onChange={(e) => setEditedProfile({ ...editedProfile, state: e.target.value })}
                    disabled={!isEditing}
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Academic Information */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-6">Academic Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>College</Label>
                <Input
                  value={editedProfile.college}
                  disabled
                  className="h-12 opacity-60"
                />
                <p className="text-xs text-muted-foreground">College cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label>Branch</Label>
                <Input
                  value={editedProfile.branch}
                  disabled
                  className="h-12 opacity-60"
                />
                <p className="text-xs text-muted-foreground">Branch cannot be changed</p>
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

export default MenteeProfile;
