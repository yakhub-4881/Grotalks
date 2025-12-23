import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/lib/app-context';
import { Layout } from '@/components/Layout';
import { BadgeCheck, Video, Target, Sparkles } from 'lucide-react';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';
import heroImage from '@/assets/hero-grotalks-brand.jpg';

const Landing = () => {
  const navigate = useNavigate();
  const { setUserType } = useAppContext();
  
  const isDarkMode = useMemo(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  }, []);
  
  const logo = isDarkMode ? logoLight : logoDark;

  const handleAlumniSignup = () => {
    setUserType('alumni');
    navigate('/signup?type=alumni');
  };

  const handleSeekerSignup = () => {
    setUserType('mentee');
    navigate('/signup');
  };

  return (
    <Layout showNav={false}>
      <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-slate-900">
        {/* Left Side - Content Area */}
        <div className="flex-1 bg-white flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10 sm:py-8 lg:py-0 min-h-0">
          <div className="max-w-md mx-auto w-full flex flex-col justify-center h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6 lg:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 p-2 rounded-lg bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-lg">
                <img src={logo} alt="Grotalks" className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Grotalks</h1>
                <p className="text-xs sm:text-sm text-slate-500">Guidance made easy</p>
              </div>
            </div>


            {/* CTA Buttons */}
            <div className="space-y-3 mb-6 lg:mb-6">
              <Button 
                onClick={handleSeekerSignup}
                className="w-full h-12 sm:h-14 text-sm sm:text-base font-bold rounded-xl shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_14px_40px_rgba(37,99,235,0.45)]"
                size="lg"
              >
                Sign Up as Student
              </Button>
              <Button 
                onClick={handleAlumniSignup}
                variant="secondary"
                className="w-full h-12 sm:h-14 text-sm sm:text-base font-medium rounded-xl"
                size="lg"
              >
                Sign Up as Alumni
              </Button>
              <p className="text-center text-sm text-slate-500 pt-2">
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

            {/* Features - matching ComingSoon design */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Verified Alumni</p>
              </div>
              <div className="text-center p-3 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Live Calls</p>
              </div>
              <div className="text-center p-3 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Career Goals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Image with Text Overlay */}
        <div className="hidden lg:block lg:flex-1 relative overflow-hidden">
          <img
            src={heroImage}
            alt="Mentorship Connection"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          
          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-12 xl:px-16">
            <div className="max-w-lg">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white/60" />
              </div>
              <h2 className="text-3xl xl:text-4xl font-extrabold leading-tight text-white mb-4">
                Your future starts with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">
                  alumni who made it
                </span>
              </h2>
              <p className="text-base xl:text-lg text-white/80 leading-relaxed">
                Connect with alumni from your college who now live the careers you dream of.
              </p>
            </div>
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
