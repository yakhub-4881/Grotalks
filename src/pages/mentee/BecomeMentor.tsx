import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, GraduationCap, Coins, Star, TrendingUp, CheckCircle, XCircle, Briefcase } from 'lucide-react';

const BecomeMentor = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {/* Main Card */}
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Ready to Become a Mentor?
                </h1>
                <p className="text-base text-muted-foreground max-w-2xl">
                  Share your knowledge and earn while helping others grow in their careers
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background/50">
                  <Coins className="h-8 w-8 text-success mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Earn Money</h3>
                  <p className="text-sm text-muted-foreground">Set your own rates and earn while mentoring</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background/50">
                  <Star className="h-8 w-8 text-bonus mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Build Reputation</h3>
                  <p className="text-sm text-muted-foreground">Grow your professional network</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background/50">
                  <TrendingUp className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Help Others</h3>
                  <p className="text-sm text-muted-foreground">Make a lasting impact on careers</p>
                </div>
              </div>

              {/* Requirements Section */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-foreground mb-6 text-center">Requirements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Completed at least 3 sessions as mentee</p>
                      <p className="text-xs text-muted-foreground mt-1">Shows you understand the platform</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">3rd year or above / Work experience</p>
                      <p className="text-xs text-muted-foreground mt-1">Ensures relevant expertise to share</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">LinkedIn verification required</p>
                      <p className="text-xs text-muted-foreground mt-1">Builds trust with mentees</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Maintain 4.5+ rating</p>
                      <p className="text-xs text-muted-foreground mt-1">Quality mentorship standard</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activation Notice */}
              <div className="bg-warning/10 border border-warning/30 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Briefcase className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-2">Application Currently Locked</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      The mentor application can only be activated after you begin your first internship or job. 
                      This ensures you have real-world experience to share with mentees.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-warning" />
                      <span className="text-foreground font-medium">Application unlocks after starting your first professional role</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col items-center">
                <Button 
                  size="lg" 
                  className="text-base h-12 px-10 mb-3"
                  disabled
                >
                  Apply to Mentor
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Complete the requirements above to unlock this application
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Approval typically within 48 hours after activation
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BecomeMentor;
