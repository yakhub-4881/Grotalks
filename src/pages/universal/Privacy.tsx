import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';

const Privacy = () => {
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
            <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-8">Last Updated: November 4, 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Account information (name, email, phone number, college affiliation)</li>
                <li>Profile information (bio, expertise, LinkedIn profile)</li>
                <li>Payment information (processed securely through payment gateways)</li>
                <li>Communication data (chat messages, session feedback, reviews)</li>
                <li>Usage data (browsing activity, session duration, feature usage)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use collected information to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide and improve our alumnihip platform services</li>
                <li>Process payments and maintain wallet balances</li>
                <li>Verify alumni credentials and alumni status</li>
                <li>Facilitate communication between students and alumni</li>
                <li>Send notifications about bookings, sessions, and platform updates</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Detect and prevent fraud or unauthorized access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We share your information only in these circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>With alumni/students you interact with (name, college, profile info)</li>
                <li>With payment processors to facilitate transactions</li>
                <li>With verification services for alumni credential checks</li>
                <li>When required by law or to protect rights and safety</li>
                <li>With your explicit consent for any other purpose</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We never sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures including encryption, secure servers, and 
                access controls to protect your data. However, no internet transmission is 100% secure. 
                You're responsible for maintaining the confidentiality of your account credentials.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your information for as long as your account is active or as needed to provide 
                services. You may request account deletion, after which we'll remove or anonymize your data 
                within 30 days, except where required by law to retain records.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data in portable format</li>
                <li>Object to certain data processing activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to maintain session state, analyze usage, and improve 
                functionality. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Grotalks is not intended for users under 18 without parental consent. We do not knowingly 
                collect information from children under 18. If you believe we've collected such data, 
                contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy periodically. We'll notify you of significant changes via 
                email or platform notification. Continued use after changes constitutes acceptance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For privacy-related questions or to exercise your rights, contact us at:<br />
                Email: privacy@grotalks.com<br />
                Subject: Privacy Inquiry
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

export default Privacy;
