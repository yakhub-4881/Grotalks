import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';

const FAQ = () => {
  const navigate = useNavigate();
  const isDarkMode = document.documentElement.classList.contains('dark');
  const logo = isDarkMode ? logoLight : logoDark;

  const faqCategories = [
    {
      category: 'Pricing & Payments',
      questions: [
        {
          q: 'How much does alumnihip cost?',
          a: 'Rates vary by alumni, typically ranging from ₹10-20 per minute (₹600-1200 per hour). You only pay for actual time used, rounded to the nearest minute.'
        },
        {
          q: 'How is payment processed?',
          a: 'Sessions are charged to your Grotalks wallet in real-time during the chat. You can top up your wallet using UPI, debit/credit cards, or net banking. Alumni receive instant UPI payouts after sessions.'
        },
        {
          q: 'Can I get a refund?',
          a: 'Refund requests are considered case-by-case. If a alumni doesn\'t show up, you\'ll automatically receive a full refund plus ₹100 bonus credit. Contact support@grotalks.com for other refund requests.'
        },
        {
          q: 'Are there any hidden fees?',
          a: 'No hidden fees! You pay exactly what you see - the per-minute rate multiplied by session duration. There are no booking fees, platform charges, or cancellation penalties.'
        },
        {
          q: 'What is the ₹100 free credit?',
          a: 'All new students receive ₹100 free credits when they sign up. You can use these credits to try the platform and book your first session.'
        }
      ]
    },
    {
      category: 'Alumni & Verification',
      questions: [
        {
          q: 'How are alumni verified?',
          a: 'All alumni go through a rigorous verification process including LinkedIn profile verification, alumni ID validation, and KYC (Know Your Customer) checks. We ensure every alumni is a verified alumnus of their claimed institution.'
        },
        {
          q: 'Can I become a alumni?',
          a: 'Yes! If you\'re an alumnus of one of our partner colleges and have professional experience, you can apply to become a alumni. The process includes LinkedIn verification, alumni ID validation, and setting up your profile with expertise areas and rates.'
        },
        {
          q: 'How do alumni set their rates?',
          a: 'Alumni set their own hourly rates (typically ₹600-1200/hour) based on their experience and expertise. The system automatically converts this to per-minute rates for transparent billing.'
        },
        {
          q: 'What if a alumni doesn\'t show up?',
          a: 'If a alumni is more than 15 minutes late, you can report a no-show. You\'ll receive a full refund plus ₹100 bonus credit. Repeated no-shows result in alumni account suspension.'
        }
      ]
    },
    {
      category: 'Sessions & Booking',
      questions: [
        {
          q: 'How do I book a session?',
          a: 'Browse alumni, select one that matches your needs, choose an available time slot, and confirm your booking. The alumni will then accept or decline your request within 1 hour.'
        },
        {
          q: 'What happens after I book a session?',
          a: 'Your booking enters "pending" status until the alumni accepts. You\'ll receive a notification once accepted. The session will appear in your dashboard with a "Start Chat" button available at the scheduled time.'
        },
        {
          q: 'Can I cancel a booking?',
          a: 'Yes, you can cancel before the alumni accepts. Once accepted, contact the alumni directly or reach out to support@grotalks.com for cancellation assistance.'
        },
        {
          q: 'How long do sessions typically last?',
          a: 'Session length is flexible. Most sessions range from 15-60 minutes, but you\'re only charged for actual time used. You can end the chat whenever you\'re done.'
        }
      ]
    },
    {
      category: 'Technical & Safety',
      questions: [
        {
          q: 'Is my data safe?',
          a: 'Yes, we take data security seriously. All payment information is encrypted and processed through secure payment gateways. We never store your complete payment details on our servers.'
        },
        {
          q: 'What if I have technical issues during a session?',
          a: 'Contact support@grotalks.com immediately. If technical issues prevent your session, we\'ll issue a full refund. Make sure you have a stable internet connection before starting.'
        },
        {
          q: 'Can I use Grotalks on mobile?',
          a: 'Yes! Grotalks is fully responsive and works on all devices - desktop, tablet, and mobile. Use any modern web browser.'
        },
        {
          q: 'How do I report inappropriate behavior?',
          a: 'We have zero tolerance for inappropriate behavior. Use the "Report" button in the chat or email safety@grotalks.com immediately. All reports are investigated within 24 hours.'
        }
      ]
    },
    {
      category: 'For Organizations',
      questions: [
        {
          q: 'Do you offer corporate training?',
          a: 'Yes! We offer enterprise solutions for companies, colleges, and institutions. Contact partnership@grotalks.com to discuss bulk alumniing programs, campus recruitment prep, or corporate training.'
        },
        {
          q: 'Can my college join Grotalks?',
          a: 'Absolutely! We\'re always looking to partner with more institutions. Email partnership@grotalks.com with your college details to start the onboarding process.'
        },
        {
          q: 'Do you offer group alumniing sessions?',
          a: 'Group sessions are coming soon! Currently, all sessions are one-on-one for personalized attention. Join our waitlist for group features.'
        }
      ]
    }
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
            <a href="/universal/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="/universal/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            <a href="/universal/faq" className="text-sm font-medium text-foreground">FAQ</a>
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/')}>Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Grotalks
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">{category.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, index) => (
                    <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <Card className="p-8 max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/universal/contact')}>
                Contact Support
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Get Started
              </Button>
            </div>
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

export default FAQ;
