import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Users, Zap, Shield, Star, Clock, TrendingUp } from 'lucide-react';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';
import heroImage from '@/assets/hero-modern.jpg';
import CollegeAutoScroll from '@/components/CollegeAutoScroll';

const UniversalLanding = () => {
  const navigate = useNavigate();
  const isDarkMode = document.documentElement.classList.contains('dark');
  const logo = isDarkMode ? logoLight : logoDark;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="Grotalks" className="h-6 w-6" />
            <span className="text-xl font-bold text-foreground">Grotalks</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/universal" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="/universal/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="/universal/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="/universal/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            <a href="/universal/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/login')}>Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Hero Image with Blend */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Mentorship Platform" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
        </div>

        <div className="container relative px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Zap className="h-4 w-4" />
              12+ Top Colleges Connected
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Mentorship at Scale
            </h1>
            <p className="text-xl text-muted-foreground mb-2">Guidance made easy</p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Connect with verified alumni mentors from India's top institutions. Get real-time guidance, pay per minute, and accelerate your career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base h-12" onClick={() => navigate('/signup')}>
                Find Your Mentor <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base h-12" onClick={() => navigate('/signup?type=mentor')}>
                Become a Mentor
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Active Mentors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.8★</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnered Colleges */}
      <CollegeAutoScroll />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 md:py-16 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to start your mentorship journey
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* For Students */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-8 text-center">For Students</h3>
              <div className="space-y-6">
                {[
                  { step: '1', title: 'Sign Up', desc: 'Create account with college email' },
                  { step: '2', title: 'Browse Mentors', desc: 'Find mentors from your college' },
                  { step: '3', title: 'Book Session', desc: 'Choose time slot (₹10-20/min)' },
                  { step: '4', title: 'Chat Live', desc: 'Get real-time guidance' },
                  { step: '5', title: 'Rate & Review', desc: 'Share your experience' }
                ].map((item) => (
                  <Card key={item.step} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* For Mentors */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-8 text-center">For Mentors</h3>
              <div className="space-y-6">
                {[
                  { step: '1', title: 'Sign Up', desc: 'Register with LinkedIn verification' },
                  { step: '2', title: 'Set Profile', desc: 'Add expertise and rates' },
                  { step: '3', title: 'Get Requests', desc: 'Receive booking requests' },
                  { step: '4', title: 'Approve/Decline', desc: 'Manage your schedule' },
                  { step: '5', title: 'Earn Instantly', desc: 'Get paid per minute via UPI' }
                ].map((item) => (
                  <Card key={item.step} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Grotalks?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for effective mentorship in one platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">12+ Colleges</h3>
              <p className="text-muted-foreground">Connect with mentors across India's top institutions including IITs, BITS, and NITs</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Mentoring</h3>
              <p className="text-muted-foreground">Live chat sessions with instant UPI payments and transparent billing</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Alumni</h3>
              <p className="text-muted-foreground">All mentors verified with LinkedIn proof and KYC validation</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Per-Minute Billing</h3>
              <p className="text-muted-foreground">Pay only for time used - transparent pricing with no hidden fees</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Star className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rated & Reviewed</h3>
              <p className="text-muted-foreground">Community-driven ratings ensure quality mentorship experiences</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Payouts</h3>
              <p className="text-muted-foreground">Mentors receive earnings instantly via UPI with zero delays</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of students and mentors on Grotalks</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-base h-12" onClick={() => navigate('/signup')}>
              Find a Mentor
            </Button>
            <Button size="lg" variant="outline" className="text-base h-12 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" onClick={() => navigate('/signup?type=mentor')}>
              Become a Mentor
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="Grotalks" className="h-6 w-6" />
                <span className="font-bold text-foreground">Grotalks</span>
              </div>
              <p className="text-sm text-muted-foreground">Democratizing mentorship across India's top colleges</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/universal" className="hover:text-foreground transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="/universal/pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><button onClick={() => navigate('/login')} className="hover:text-foreground transition-colors">Login</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/universal/about" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="/universal/contact" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="/universal/terms" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="/universal/privacy" className="hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/universal/faq" className="hover:text-foreground transition-colors">FAQ</a></li>
                <li><span className="text-muted-foreground">support@grotalks.com</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 Grotalks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UniversalLanding;