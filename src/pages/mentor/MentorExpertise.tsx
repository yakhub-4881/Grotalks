import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Gift, TrendingUp, Clock, Video } from 'lucide-react';
import { sessionPackages, calculateSessionPrice, formatPrice, calculateMentorEarnings } from '@/lib/college-config';

const MentorExpertise = () => {
  const navigate = useNavigate();
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [baseRate, setBaseRate] = useState(500); // Base rate for 30 min session
  const [customRate, setCustomRate] = useState('');

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

  const rateOptions = [300, 400, 500, 750, 1000, 1500];

  const toggleExpertise = (expertise: string) => {
    if (selectedExpertise.includes(expertise)) {
      setSelectedExpertise(selectedExpertise.filter((e) => e !== expertise));
    } else if (selectedExpertise.length < 5) {
      setSelectedExpertise([...selectedExpertise, expertise]);
    }
  };

  const calculateMonthlyEarnings = (sessions: number) => {
    const grossEarnings = sessions * baseRate;
    return calculateMentorEarnings(grossEarnings);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-4 md:py-8 px-4">
        <div className="w-full max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-4 md:p-8 animate-fade-in">
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">Expertise & Pricing</h1>
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

            {/* Session Type Info */}
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex gap-3">
                <Video className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm mb-1">Video Call Sessions</p>
                  <p className="text-sm text-muted-foreground">
                    Students will book scheduled video calls with you. Sessions can be conducted via 
                    Google Meet or Zoom based on your preference.
                  </p>
                </div>
              </div>
            </div>

            {/* Rate Selection */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <Label className="text-base md:text-lg font-semibold">Session Rate (for 30 minutes)</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  This is your base rate. Other durations will be calculated automatically.
                </p>
              </div>

              {/* Custom Rate Input */}
              <div>
                <Input
                  type="number"
                  value={customRate || baseRate}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setCustomRate(e.target.value);
                    setBaseRate(value);
                  }}
                  className="h-12 md:h-14 text-center text-xl md:text-2xl font-bold"
                  placeholder="500"
                />
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Recommended range: ₹300 - ₹2,000 for 30 min
                </p>
              </div>

              {/* Rate Options */}
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {rateOptions.map((rateValue) => (
                  <Button
                    key={rateValue}
                    variant={baseRate === rateValue ? 'default' : 'outline'}
                    className="h-10 md:h-12 relative text-sm md:text-base"
                    onClick={() => {
                      setBaseRate(rateValue);
                      setCustomRate('');
                    }}
                  >
                    {formatPrice(rateValue)}
                    {(rateValue === 400 || rateValue === 500) && (
                      <span className="absolute -top-2 -right-2 bg-success text-white text-[10px] px-1.5 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </Button>
                ))}
              </div>

              {/* Auto-calculated Session Prices */}
              <div className="p-4 bg-muted rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <Label className="font-semibold">Your Session Prices</Label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {sessionPackages.map((pkg) => (
                    <div key={pkg.duration} className="text-center p-3 bg-background rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">{pkg.label}</p>
                      <p className="font-bold text-primary">
                        {formatPrice(calculateSessionPrice(baseRate, pkg.duration))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rate Setting Guidelines */}
              <div className="space-y-3">
                <div className="flex gap-2 items-center">
                  <TrendingUp className="h-5 w-5 text-foreground" />
                  <Label className="text-base font-semibold">Rate Setting Guidelines</Label>
                </div>
                
                <div className="space-y-2">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <p className="text-sm">
                      <span className="font-semibold">₹300-₹500:</span> Entry-level mentors, students, early career professionals
                      <span className="ml-2 text-xs bg-success/20 text-success px-2 py-0.5 rounded">Budget Friendly</span>
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      <span className="font-semibold">₹500-₹1,000:</span> Experienced professionals with 5+ years experience
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      <span className="font-semibold">₹1,000-₹2,000:</span> Senior experts, executives, specialized consultants
                    </p>
                  </div>
                </div>
              </div>

              {/* Estimated Monthly Earnings */}
              <div className="p-4 md:p-6 bg-primary/5 rounded-lg border-2 border-primary">
                <h3 className="font-bold text-base md:text-lg mb-4 text-center">Estimated Monthly Earnings</h3>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <div className="text-center">
                    <p className="text-lg md:text-2xl font-bold text-primary">{formatPrice(calculateMonthlyEarnings(10))}</p>
                    <p className="text-xs text-muted-foreground mt-1">10 sessions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg md:text-2xl font-bold text-primary">{formatPrice(calculateMonthlyEarnings(25))}</p>
                    <p className="text-xs text-muted-foreground mt-1">25 sessions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg md:text-2xl font-bold text-primary">{formatPrice(calculateMonthlyEarnings(50))}</p>
                    <p className="text-xs text-muted-foreground mt-1">50 sessions</p>
                  </div>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  *After platform fees (15%), based on 30-min sessions
                </p>
              </div>

              {/* Platform Policy */}
              <div className="p-4 bg-muted rounded-lg border">
                <div className="flex gap-3">
                  <Gift className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Platform Policy:</p>
                    <p className="text-sm text-muted-foreground">
                      15% platform fee applies to all sessions. You'll receive {formatPrice(calculateMentorEarnings(baseRate))} per 30-min session after fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3 md:gap-4">
              <Button variant="outline" onClick={() => navigate('/mentor/bio')} className="flex-1 h-11 md:h-12">
                Back
              </Button>
              <Button
                onClick={() => navigate('/mentor/availability')}
                className="flex-1 h-11 md:h-12 font-medium"
                disabled={selectedExpertise.length === 0}
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

export default MentorExpertise;
