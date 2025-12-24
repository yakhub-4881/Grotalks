import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgeCheck, Video, Target, CheckCircle2, Banknote, Users, Sparkles, Mail, User, Wallet, MessageCircle } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
import heroImage from "@/assets/hero-grotalks-brand.jpg";

type UserType = 'student' | 'alumni' | null;

const ComingSoon = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState<UserType>(null);

  const isDarkMode = useMemo(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  }, []);

  const logo = isDarkMode ? logoLight : logoDark;

  const isValidEmail = email.includes("@") && email.includes(".");
  const isFormValid = userType !== null && isValidEmail && collegeId.trim() !== "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isFormValid) {
      if (!userType) {
        setErrorMessage("Please select an option first.");
      } else if (!isValidEmail) {
        setErrorMessage("Please enter a valid email address.");
      } else if (collegeId.trim() === "") {
        setErrorMessage("Please enter your college ID.");
      }
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setShowSuccess(true);
    setIsLoading(false);
  };

  return (
    <Layout showNav={false}>
      <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-slate-900">
        {/* Left Side - Content Area */}
        <div className="flex-1 lg:basis-1/2 bg-white flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-8 sm:py-8 lg:py-0 min-h-0 overflow-y-auto">
          <div className="max-w-md mx-auto w-full flex flex-col justify-center">
            {/* Logo (clickable to zero landing) */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-3 mb-5 lg:mb-6 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 p-2 rounded-lg bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-lg group-hover:shadow-xl transition-shadow">
                <img src={logo} alt="Grotalks" className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Grotalks</h1>
                <p className="text-xs sm:text-sm text-slate-500">Guidance made easy</p>
              </div>
            </button>

            {/* Coming Soon Badge */}
            <div className="mb-4 lg:mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-3 h-3" /> Coming soon
              </span>
            </div>

            {/* Email Form */}
            <div className="relative mb-5 lg:mb-5">
              {showSuccess ? (
                <>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-emerald-800 text-sm sm:text-base">You're on the list!</p>
                      <p className="text-xs sm:text-sm text-emerald-600">We'll notify you when we launch.</p>
                    </div>
                  </div>

                  {/* WhatsApp Group Join */}
                  <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary mb-1">
                          To stay closely connected and get faster updates, Join the Grotalks VelTech {userType === 'alumni' ? 'Alumni' : 'Students'} WhatsApp Group
                        </p>
                        <p className="text-xs text-primary/70 mb-2">
                          (No spam. Only useful updates.)
                        </p>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 underline"
                        >
                          Join WhatsApp Group
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Radio Button Selection */}
                  <div className="flex items-center gap-4 sm:gap-6 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="student"
                        checked={userType === 'student'}
                        onChange={() => setUserType('student')}
                        className="w-4 h-4 text-primary border-slate-300 focus:ring-primary focus:ring-offset-0"
                      />
                      <span className="text-sm font-medium text-slate-700">Join as Student</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="alumni"
                        checked={userType === 'alumni'}
                        onChange={() => setUserType('alumni')}
                        className="w-4 h-4 text-primary border-slate-300 focus:ring-primary focus:ring-offset-0"
                      />
                      <span className="text-sm font-medium text-slate-700">Join as Alumni</span>
                    </label>
                  </div>

                  {/* Additional Fields - Show when user type is selected */}
                  {userType && (
                    <div className="space-y-4 animate-fade-in">
                      {/* College Email ID / Email ID */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Label className="text-sm font-medium text-slate-700">
                            {userType === 'student' ? 'College Email ID' : 'Email ID'}
                          </Label>
                        </div>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorMessage("");
                          }}
                          placeholder="Enter here"
                          className="h-12 sm:h-14 px-4 rounded-xl bg-slate-50 border-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-all text-sm sm:text-base"
                          disabled={isLoading}
                        />
                      </div>

                      {/* College ID No */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <Label className="text-sm font-medium text-slate-700">College ID No</Label>
                        </div>
                        <Input
                          type="text"
                          value={collegeId}
                          onChange={(e) => setCollegeId(e.target.value)}
                          placeholder="Enter here"
                          className="h-12 sm:h-14 px-4 rounded-xl bg-slate-50 border-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-all text-sm sm:text-base"
                          disabled={isLoading}
                        />
                        <p className="text-xs text-muted-foreground">eg: VTU1234</p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 sm:h-14 text-sm sm:text-base font-bold rounded-xl shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_14px_40px_rgba(37,99,235,0.45)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    disabled={isLoading || !isFormValid}
                  >
                    {isLoading ? "Joining..." : "Get early access"}
                  </Button>
                  {errorMessage && (
                    <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
                  )}
                </form>
              )}
              {!showSuccess && (
                <div className="flex items-center justify-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">2,847+ already joined</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-400">No spam, ever</span>
                </div>
              )}
            </div>

            {/* Features - Dynamic based on user selection */}
            {userType && !showSuccess && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 animate-fade-in">
                {userType === 'student' ? (
                  <>
                    <div className="text-center p-2 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Verified Alumni</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Video className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Live Calls</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Career Goals</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center p-2 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Earn & Impact</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Guide Students</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Build Reputation</p>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mobile Dynamic Hero Text - Fixed near bottom when user type is selected */}
            {userType && !showSuccess && (
              <div className="lg:hidden fixed bottom-6 left-0 right-0 px-6 animate-fade-in pointer-events-none">
                <div className="max-w-md mx-auto">
                  <h2 className="text-base sm:text-lg font-extrabold leading-tight text-slate-900 text-left">
                    {userType === 'student' ? (
                      <>
                        Your future starts with
                        <span className="inline text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                          {' '}
                          alumni who made it
                        </span>
                      </>
                    ) : (
                      <>
                        Your journey inspires
                        <span className="inline text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                          {' '}
                          the next generation
                        </span>
                      </>
                    )}
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Hero Image with Dynamic Text Overlay */}
        <div className="hidden lg:flex lg:flex-1 lg:basis-1/2 relative overflow-hidden">
          <img
            src={heroImage}
            alt="Mentorship Connection"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Perplexity-style gradient overlay (only shows when user type is selected) */}
          {userType && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </>
          )}

          {/* Dynamic Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-12 xl:px-16">
            {userType && (
              <div className="max-w-lg animate-fade-in">
                <h2 className="text-3xl xl:text-4xl font-extrabold leading-tight text-white mb-4">
                  {userType === 'student' ? (
                    <>
                      Your future starts with
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">
                        alumni who made it
                      </span>
                    </>
                  ) : (
                    <>
                      Your journey inspires
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">
                        the next generation
                      </span>
                    </>
                  )}
                </h2>
                <p className="text-base xl:text-lg text-white/80 leading-relaxed">
                  {userType === 'student'
                    ? "Connect with alumni from your college who now live the careers you dream of."
                    : "Share your real-world journey with students from your college who need it most."
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Version Switcher Gear Icon - Bottom Right (Desktop only) */}
        <button
          onClick={() => navigate('/universal')}
          className="hidden lg:flex fixed bottom-6 right-6 w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 items-center justify-center transition-all hover:scale-110 opacity-60 hover:opacity-100 z-50"
          aria-label="Switch to Universal Version"
          title="Switch to Universal Version"
        >
          <span className="text-xl">⚙️</span>
        </button>

      </div>
    </Layout>
  );
};

export default ComingSoon;
