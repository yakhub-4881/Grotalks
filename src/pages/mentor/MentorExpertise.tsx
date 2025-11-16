import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/Layout';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Gift, TrendingUp } from 'lucide-react';

const MentorExpertise = () => {
  const navigate = useNavigate();
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [rate, setRate] = useState(12);
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

  const rateOptions = [8, 10, 12, 15, 18, 20];

  const toggleExpertise = (expertise: string) => {
    if (selectedExpertise.includes(expertise)) {
      setSelectedExpertise(selectedExpertise.filter((e) => e !== expertise));
    } else if (selectedExpertise.length < 5) {
      setSelectedExpertise([...selectedExpertise, expertise]);
    }
  };

  const calculateEarnings = (sessions: number) => {
    const earnings = sessions * 10 * rate; // 10-minute average
    const afterFees = earnings * 0.85; // After 15% platform fees
    return Math.round(afterFees);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8 px-4">
        <div className="w-full max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Expertise & Pricing</h1>
            <p className="text-sm text-muted-foreground">Step 5 of 8</p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[62.5%] transition-all duration-300"></div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Expertise Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold">Select Expertise (Max 5)</Label>
                <span className="text-sm text-muted-foreground">
                  {selectedExpertise.length}/5
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {expertiseOptions.map((expertise) => (
                  <div
                    key={expertise}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
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

            {/* Rate Selection */}
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold">Rate per minute (₹)</Label>
              </div>

              {/* Custom Rate Input */}
              <div>
                <Input
                  type="number"
                  value={customRate || rate}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setCustomRate(e.target.value);
                    setRate(value);
                  }}
                  className="h-14 text-center text-2xl font-bold"
                  placeholder="12"
                />
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Recommended range: ₹8 - ₹25 per minute
                </p>
              </div>

              {/* Rate Options */}
              <div className="grid grid-cols-3 gap-3">
                {rateOptions.map((rateValue) => (
                  <Button
                    key={rateValue}
                    variant={rate === rateValue ? 'default' : 'outline'}
                    className="h-12 relative"
                    onClick={() => {
                      setRate(rateValue);
                      setCustomRate('');
                    }}
                  >
                    ₹{rateValue}
                    {(rateValue === 10 || rateValue === 12) && (
                      <span className="absolute -top-2 -right-2 bg-success text-white text-xs px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </Button>
                ))}
              </div>

              {/* Platform Policy */}
              <div className="p-4 bg-muted rounded-lg border">
                <div className="flex gap-3">
                  <Gift className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Platform Policy:</p>
                    <p className="text-sm text-muted-foreground">
                      To encourage great mentoring experiences and help you build your reputation, 
                      we require all mentors to offer the <span className="font-semibold text-foreground">first 5 minutes free</span> for 
                      new mentees. This helps build trust and showcases your mentoring style.
                    </p>
                  </div>
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
                      <span className="font-semibold">₹8-₹10/min:</span> Entry-level mentors, students, early career professionals
                      <span className="ml-2 text-xs bg-success/20 text-success px-2 py-0.5 rounded">Budget Friendly</span>
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      <span className="font-semibold">₹12-₹15/min:</span> Experienced professionals with 5+ years experience
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      <span className="font-semibold">₹18-₹25/min:</span> Senior experts, executives, specialized consultants
                    </p>
                  </div>
                </div>
              </div>

              {/* Estimated Monthly Earnings */}
              <div className="p-6 bg-primary/5 rounded-lg border-2 border-primary">
                <h3 className="font-bold text-lg mb-4 text-center">Estimated Monthly Earnings</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">₹{calculateEarnings(10)}</p>
                    <p className="text-xs text-muted-foreground mt-1">10 sessions/month</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">₹{calculateEarnings(25)}</p>
                    <p className="text-xs text-muted-foreground mt-1">25 sessions/month</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">₹{calculateEarnings(50)}</p>
                    <p className="text-xs text-muted-foreground mt-1">50 sessions/month</p>
                  </div>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  *After platform fees (15%), assuming 10-minute average sessions
                </p>
              </div>

              {/* Suggestion */}
              <div className="p-4 bg-muted rounded-lg border flex gap-3">
                <div className="flex-shrink-0">ℹ️</div>
                <p className="text-sm text-muted-foreground">
                  Consider setting a budget-friendly rate (₹10 or below) to attract more mentees 
                  and build your reputation faster. You can always increase your rates later!
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/mentor/bio')} className="flex-1 h-12">
                Back
              </Button>
              <Button
                onClick={() => navigate('/mentor/availability')}
                className="flex-1 h-12 font-medium"
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
