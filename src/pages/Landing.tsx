import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/lib/app-context';
import { Layout } from '@/components/Layout';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';
import heroImage from '@/assets/hero-modern.jpg';

const Landing = () => {
  const navigate = useNavigate();
  const { setUserType } = useAppContext();
  
  // Check for dark mode
  const isDarkMode = document.documentElement.classList.contains('dark');
  const logo = isDarkMode ? logoLight : logoDark;

  const handleMentorSignup = () => {
    setUserType('mentor');
    navigate('/signup?type=mentor');
  };

  const handleSeekerSignup = () => {
    setUserType('mentee');
    navigate('/signup');
  };

  return (
    <Layout showNav={false}>
      <div className="h-screen overflow-hidden bg-background">
        <div className="h-full grid md:grid-cols-2 gap-0">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-8">
          {/* Logo - Fixed Size */}
          <div className="mb-6">
            <img src={logo} alt="Grotalks Logo" className="h-8 w-8 mb-2" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-0.5">Grotalks</h1>
            <p className="text-sm text-muted-foreground mb-4">Guidance made easy</p>
          </div>

            {/* Value Proposition */}
            <div className="mb-8 max-w-lg">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                Connect with Alumni Mentors
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Grotalks does not connect students to random experts. It connects them to alumni from their own college. People who once walked the same halls and now live the career students dream of. This turns passive alumni links into active mentorship.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 max-w-md mb-8">
              <Button 
                onClick={handleSeekerSignup}
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                Sign Up as Student
              </Button>
              <Button 
                onClick={handleMentorSignup}
                variant="secondary"
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                Sign Up as Mentor
              </Button>
              <p className="text-center text-sm text-muted-foreground pt-2">
                Already have an account?{' '}
                <Button 
                  variant="link" 
                  onClick={() => navigate('/login')}
                  className="p-0 h-auto font-medium text-primary"
                >
                  Login
                </Button>
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="text-center">
                <div className="text-2xl mb-2">✨</div>
                <p className="text-xs font-semibold mb-1">Transparent Pricing</p>
                <p className="text-xs text-muted-foreground">Book & pay upfront</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-xs font-semibold mb-1">Instant Payouts</p>
                <p className="text-xs text-muted-foreground">UPI instant transfer</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <p className="text-xs font-semibold mb-1">Verified Alumni</p>
                <p className="text-xs text-muted-foreground">Trusted mentors only</p>
              </div>
            </div>
          </div>

          {/* Right Side - Premium Blended Image */}
          <div className="hidden md:block relative overflow-hidden">
            <img 
              src={heroImage} 
              alt="Mentorship Connection" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/5 to-background"></div>
          </div>
        </div>

        {/* Version Switcher Gear Icon - Bottom Right */}
        <button
          onClick={() => navigate('/universal')}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 flex items-center justify-center transition-all hover:scale-110 opacity-60 hover:opacity-100 z-50"
          aria-label="Switch to Universal Version"
          title="Switch to Universal Version"
        >
          <span className="text-xl">⚙️</span>
        </button>
      </div>
    </Layout>
  );
};

export default Landing;
