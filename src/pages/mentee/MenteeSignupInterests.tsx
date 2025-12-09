import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const MenteeSignupInterests = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const careerAreas = [
    { id: 'product-management', label: 'Product Management', icon: '📦' },
    { id: 'software-engineering', label: 'Software Engineering', icon: '💻' },
    { id: 'data-science', label: 'Data Science & ML', icon: '📊' },
    { id: 'consulting', label: 'Consulting', icon: '💼' },
    { id: 'entrepreneurship', label: 'Entrepreneurship', icon: '🚀' },
    { id: 'finance', label: 'Finance & Investment Banking', icon: '💰' },
    { id: 'marketing', label: 'Marketing & Growth', icon: '📈' },
    { id: 'design', label: 'UI/UX Design', icon: '🎨' },
    { id: 'research', label: 'Research & PhD', icon: '🔬' },
    { id: 'higher-studies', label: 'Higher Studies (MS/MBA)', icon: '🎓' },
    { id: 'civil-services', label: 'Civil Services (UPSC)', icon: '🏛️' },
    { id: 'teaching', label: 'Teaching & Academia', icon: '📚' }
  ];

  useEffect(() => {
    // Check if previous data exists
    const profileData = sessionStorage.getItem('menteeProfile');
    if (!profileData) {
      toast({
        title: 'Session Expired',
        description: 'Please start from beginning',
        variant: 'destructive'
      });
      navigate('/mentee/signup');
    }
  }, []);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (selectedInterests.length === 0) {
      toast({
        title: 'Selection Required',
        description: 'Please select at least one area of interest',
        variant: 'destructive'
      });
      return;
    }

    // Save interests and complete profile
    sessionStorage.setItem('menteeInterests', JSON.stringify(selectedInterests));
    
    // Clear session storage
    sessionStorage.removeItem('menteeProfile');
    sessionStorage.removeItem('menteeInterests');

    toast({
      title: '🎉 Welcome to GroTalks!',
      description: 'Your profile has been created successfully',
    });

    navigate('/mentee/dashboard');
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Student Career Interests</h1>
            <p className="text-sm text-muted-foreground">Step 4 of 4 - Choose areas where you need guidance</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[100%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground">
              Select one or more areas where you're looking for career guidance. This helps us match you with the right mentors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careerAreas.map((area) => (
                <div
                  key={area.id}
                  onClick={() => toggleInterest(area.id)}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedInterests.includes(area.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Checkbox
                    checked={selectedInterests.includes(area.id)}
                    onCheckedChange={() => toggleInterest(area.id)}
                    className="pointer-events-none"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-2xl">{area.icon}</span>
                    <Label className="cursor-pointer text-sm font-medium">{area.label}</Label>
                  </div>
                </div>
              ))}
            </div>

            {selectedInterests.length > 0 && (
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <p className="text-sm text-success font-medium">
                  ✓ {selectedInterests.length} area{selectedInterests.length > 1 ? 's' : ''} selected
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/mentee/signup/profile')} className="flex-1 h-12">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 h-12 font-medium"
                disabled={selectedInterests.length === 0}
              >
                Complete Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MenteeSignupInterests;
