import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Video, Target, CheckCircle2, Sparkles } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
import heroImage from "@/assets/hero-abstract-frames.jpg";

const ComingSoon = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isDarkMode = useMemo(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  }, []);

  const logo = isDarkMode ? logoLight : logoDark;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setShowSuccess(true);
    setEmail("");
    setIsLoading(false);

    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <Layout showNav={false}>
      <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-slate-900">
        {/* Left Side - Content Area */}
        <div className="flex-1 bg-white flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10 sm:py-8 lg:py-0 min-h-0">
          <div className="max-w-md mx-auto w-full flex flex-col justify-center h-full">
            {/* Logo (clickable to zero landing) */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-3 mb-6 lg:mb-6 group"
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
            <div className="mb-4 lg:mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-3 h-3" /> Coming soon
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-3 lg:mb-3">
              Your future starts with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                alumni who made it
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 mb-6 lg:mb-6 leading-relaxed">
              Connect with alumni from your college who now live the careers you dream of.
            </p>

            {/* Email Form */}
            <div className="relative mb-6 lg:mb-6">
              {showSuccess ? (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-800 text-sm sm:text-base">You are on the list</p>
                    <p className="text-xs sm:text-sm text-emerald-600">We will notify you when we launch.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="Enter your email address"
                    className="w-full h-12 sm:h-14 px-4 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-sm sm:text-base"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 sm:h-14 text-sm sm:text-base font-bold rounded-xl shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_14px_40px_rgba(37,99,235,0.45)]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Joining..." : "Get early access"}
                  </Button>
                  {errorMessage && (
                    <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
                  )}
                </form>
              )}
              <p className="text-xs text-slate-400 mt-2">
                Join hundreds of students and alumni waiting. No spam.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Verified alumni</p>
              </div>
              <div className="text-center p-3 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Live calls</p>
              </div>
              <div className="text-center p-3 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1.5 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-700">Career goals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Image (use zero version landing hero) */}
        <div className="hidden lg:block lg:flex-1 relative overflow-hidden">
          <img
            src={heroImage}
            alt="Alumnihip Connection"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/30" />
        </div>

      </div>
    </Layout>
  );
};

export default ComingSoon;
