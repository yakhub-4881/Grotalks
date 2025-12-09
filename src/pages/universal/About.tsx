import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Zap, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';

const About = () => {
  const navigate = useNavigate();
  const isDarkMode = document.documentElement.classList.contains('dark');
  const logo = isDarkMode ? logoLight : logoDark;

  const colleges = [
    'Vel Tech [VT]', 'IIT Delhi [IITD]', 'IIT Bombay [IITB]', 'BITS Pilani [BITS]',
    'IIIT Hyderabad [IIITH]', 'DTU [DTU]', 'NIT Trichy [NIT]', 'VIT Vellore [VIT]',
    'MIT Manipal [MIT]', 'SRM Institute [SRM]', 'Symbiosis IT [SIT]', 'Christ University [Christ]'
  ];

  const whyGrotalks = [
    { icon: Users, text: 'No middleman - direct student ↔ alumni connection' },
    { icon: Zap, text: 'Fair pricing - per-minute billing with no hidden fees' },
    { icon: Shield, text: 'Verified alumni - LinkedIn + KYC validation' },
    { icon: CheckCircle, text: 'Instant payouts - UPI direct transfer for alumni' },
    { icon: CheckCircle, text: 'Community-driven - ratings & reviews ensure quality' }
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
            <a href="/universal/about" className="text-sm font-medium text-foreground">About</a>
            <a href="/universal/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Grotalks</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Democratizing alumnihip across India's top colleges
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <Card className="p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Mission</h2>
            <h3 className="text-2xl font-semibold text-primary mb-4 text-center">Democratizing Alumnihip</h3>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              Grotalks connects students with experienced alumni alumni across India's top colleges. 
              We believe quality alumnihip should be accessible, affordable, and transparent. By leveraging 
              technology and a per-minute billing model, we're breaking down barriers and making expert 
              guidance available to every student who needs it.
            </p>
          </Card>
        </div>
      </section>

      {/* Why Grotalks Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Grotalks?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyGrotalks.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <item.icon className="h-10 w-10 text-primary mb-4" />
                <p className="text-muted-foreground">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Colleges Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Our Network</h2>
          <p className="text-lg text-muted-foreground mb-8 text-center">12+ Top Colleges Connected</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
            {colleges.map((college, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow">
                <p className="font-semibold text-sm">{college}</p>
              </Card>
            ))}
          </div>

          {/* Growth Metrics */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Active Alumni</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-muted-foreground">Sessions Completed</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.8★</div>
              <p className="text-muted-foreground">Average Rating</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get alumnihip?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of students growing their careers</p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-base h-12" 
            onClick={() => navigate('/')}
          >
            Start Now <ArrowRight className="ml-2 h-5 w-5" />
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
              <p className="text-sm text-muted-foreground">Democratizing alumnihip across India's top colleges</p>
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

export default About;
