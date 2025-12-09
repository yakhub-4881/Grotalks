import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';

const Terms = () => {
  const navigate = useNavigate();
  const isDarkMode = document.documentElement.classList.contains('dark');
  const logo = isDarkMode ? logoLight : logoDark;

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
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/')}>Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <Card className="p-8 md:p-12 max-w-4xl mx-auto prose prose-slate dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
            <p className="text-sm text-muted-foreground mb-8">Last Updated: November 4, 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Grotalks, you accept and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Service Description</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Grotalks is a alumnihip platform connecting students with verified alumni alumni 
                from top educational institutions across India. Our services include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Real-time chat sessions between students and alumni</li>
                <li>Per-minute billing for alumnihip sessions</li>
                <li>Wallet-based payment system</li>
                <li>Alumni verification and rating system</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To use Grotalks, you must:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Be at least 18 years old or have parental consent</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Alumni Verification</h2>
              <p className="text-muted-foreground leading-relaxed">
                All alumni undergo verification including LinkedIn profile validation, alumni ID verification, 
                and KYC checks. While we strive for accuracy, Grotalks is not responsible for false credentials 
                that pass our verification process.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Payments and Billing</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Sessions are billed per minute based on alumni-set rates</li>
                <li>Payments are processed through your Grotalks wallet</li>
                <li>All payments are final unless alumni fails to deliver service</li>
                <li>Refunds are considered case-by-case</li>
                <li>Alumni receive payouts via UPI after session completion</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Conduct Guidelines</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Users must not:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Engage in harassment, abuse, or inappropriate behavior</li>
                <li>Share offensive, illegal, or harmful content</li>
                <li>Attempt to circumvent payment systems</li>
                <li>Impersonate others or provide false information</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cancellation and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bookings can be cancelled before alumni acceptance without penalty. Post-acceptance cancellations 
                require mutual agreement or support intervention. Full refunds plus ₹100 bonus are provided for 
                verified alumni no-shows.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Grotalks provides a platform for connecting students and alumni. We are not responsible for the 
                quality, accuracy, or outcomes of alumnihip sessions. Our liability is limited to the amount 
                paid for the specific session in question.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Modifications to Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any part of our service at any time 
                with reasonable notice to users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms, contact us at legal@grotalks.com
              </p>
            </section>
          </Card>
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

export default Terms;
