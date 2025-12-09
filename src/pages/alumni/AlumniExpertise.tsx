import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { Checkbox } from '@/components/ui/checkbox';
import { AlumniServices, AlumniService } from '@/components/AlumniServices';

const AlumniExpertise = () => {
  const navigate = useNavigate();
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [services, setServices] = useState<AlumniService[]>(() => {
    try {
      return JSON.parse(sessionStorage.getItem('alumniServices') || '[]');
    } catch {
      return [];
    }
  });

  const expertiseOptions = [
    'Career Guidance',
    'Masters Abroad (USA/Europe/Asia)',
    'Startup Journey & Funding',
    'IAS/IPS/UPSC Prep',
    'Interview Preparation',
    'Internship Guidance',
    'Data Science & ML',
    'Web Development',
    'Finance & Investing',
    'Product Management',
  ];

  const handleServicesChange = (updated: AlumniService[]) => {
    setServices(updated);
    sessionStorage.setItem('alumniServices', JSON.stringify(updated));
  };

  const toggleExpertise = (expertise: string) => {
    if (selectedExpertise.includes(expertise)) {
      setSelectedExpertise(selectedExpertise.filter((e) => e !== expertise));
    } else if (selectedExpertise.length < 5) {
      setSelectedExpertise([...selectedExpertise, expertise]);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8 px-4">
        <div className="w-full max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-4 md:p-8 animate-fade-in">
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">Expertise & Services</h1>
            <p className="text-sm text-muted-foreground">Step 5 of 8</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[62.5%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            {/* Expertise Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold">Select Expertise (Max 5)</Label>
                <span className="text-sm text-muted-foreground">
                  {selectedExpertise.length}/5
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                {expertiseOptions.map((expertise) => (
                  <div
                    key={expertise}
                    className={`flex items-center space-x-3 p-3 md:p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedExpertise.includes(expertise)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleExpertise(expertise)}
                  >
                    <Checkbox
                      checked={selectedExpertise.includes(expertise)}
                      onCheckedChange={() => toggleExpertise(expertise)}
                    />
                    <Label className="cursor-pointer flex-1 text-sm">{expertise}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Services CRUD */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <Label className="text-base md:text-lg font-semibold">Services & Pricing</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Add the services you offer with duration and rate. This replaces pay-per-minute pricing.
                </p>
              </div>

              <AlumniServices
                services={services}
                onServicesChange={handleServicesChange}
                isEditable
              />
            </div>

            {/* Navigation */}
            <div className="flex gap-3 md:gap-4">
              <Button variant="outline" onClick={() => navigate('/alumni/bio')} className="flex-1 h-11 md:h-12">
                Back
              </Button>
              <Button
                onClick={() => navigate('/alumni/availability')}
                className="flex-1 h-11 md:h-12 font-medium"
                disabled={selectedExpertise.length === 0 || services.length === 0}
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

export default AlumniExpertise;
