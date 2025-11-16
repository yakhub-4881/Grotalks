import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Gift } from 'lucide-react';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';

const Pricing = () => {
  const navigate = useNavigate();
  const isDarkMode = document.documentElement.classList.contains('dark');
  const logo = isDarkMode ? logoLight : logoDark;

  const examples = [
    { duration: '15 minutes', hourly: 600, perMin: 10, total: 150 },
    { duration: '30 minutes', hourly: 600, perMin: 10, total: 300 },
    { duration: '45 minutes', hourly: 600, perMin: 10, total: 450 },
    { duration: '60 minutes', hourly: 600, perMin: 10, total: 600 }
  ];

  const features = [
    'Only pay for actual time used (rounded to nearest minute)',
    'No session booking fees or platform charges',
    'No cancellation penalties if mentor cancels',
    'Free ₹100 credits for new students',
    'Transparent billing - see costs in real-time',
    'Instant UPI payouts for mentors'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/universal')}>
            <img src={logo} alt="Grotalks" className="h-8 w-8" />
            <span className="text-xl font-bold text-foreground">Grotalks</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/universal#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="/universal#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="/universal/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="/universal/pricing" className="text-sm font-medium text-foreground">Pricing</a>
            <a href="/universal/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            <a href="/universal/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/')}>Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No hidden fees. Pay only for the time you use.
          </p>
        </div>
      </section>

      {/* Main Pricing Card */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <Card className="p-8 md:p-12 max-w-4xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Per-Minute Billing</h2>
              <p className="text-lg text-muted-foreground">Fair pricing that works for everyone</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Hourly Rate Range</p>
                <p className="text-4xl font-bold text-foreground mb-1">₹600 - ₹1200</p>
                <p className="text-sm text-muted-foreground">/hour</p>
                <p className="text-xs text-muted-foreground mt-2">(varies by mentor experience)</p>
              </div>
              <div className="text-center p-6 bg-primary/10 border-2 border-primary rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Per-Minute Rate</p>
                <p className="text-4xl font-bold text-primary mb-1">₹10 - ₹20</p>
                <p className="text-sm text-muted-foreground">/minute</p>
                <p className="text-xs text-muted-foreground mt-2">(what you actually pay)</p>
              </div>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-6 flex items-start gap-3">
              <Gift className="h-6 w-6 text-success flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-success mb-1">Welcome Bonus</p>
                <p className="text-muted-foreground">All new students receive ₹100 free credits to try the platform!</p>
              </div>
            </div>
          </Card>

          {/* Pricing Examples */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Example Sessions</h3>
            <p className="text-center text-muted-foreground mb-8">Based on a mentor rate of ₹600/hour (₹10/minute)</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {examples.map((example, index) => (
                <Card key={index} className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-lg">{example.duration} session</span>
                    <span className="text-2xl font-bold text-primary">₹{example.total}</span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Rate: ₹{example.perMin}/minute</p>
                    <p>Calculation: {example.duration.split(' ')[0]} × ₹{example.perMin} = ₹{example.total}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Features List */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">What's Included</h3>
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-xl mb-8 opacity-90">Get ₹100 free credits when you sign up today</p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-base h-12" 
            onClick={() => navigate('/')}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-background">
        <div className="container px-4 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Have Questions?</h3>
          <p className="text-muted-foreground mb-6">Check out our FAQ for more details about pricing and billing</p>
          <Button variant="outline" onClick={() => navigate('/universal/faq')}>
            View FAQ
          </Button>
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
                <li><a href="/universal#features" className="hover:text-foreground transition-colors">Features</a></li>
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

export default Pricing;
