import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isDarkMode = document.documentElement.classList.contains('dark');
  const logo = isDarkMode ? logoLight : logoDark;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    subject: '',
    message: ''
  });

  const colleges = [
    'Vel Tech', 'IIT Delhi', 'IIT Bombay', 'BITS Pilani', 'IIIT Hyderabad',
    'DTU', 'NIT Trichy', 'VIT Vellore', 'MIT Manipal', 'SRM Institute',
    'Symbiosis IT', 'Christ University'
  ];

  const subjects = [
    'General Inquiry',
    'Report Issue',
    'Partnership Opportunity',
    'Mentor Support',
    'Student Support',
    'Technical Issue',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.college || !formData.subject || !formData.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.message.length > 500) {
      toast({
        title: "Message Too Long",
        description: "Please keep your message under 500 characters",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "✓ Message Sent!",
      description: "We'll get back to you within 24 hours"
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      college: '',
      subject: '',
      message: ''
    });
  };

  const isFormValid = formData.name && formData.email && formData.college && formData.subject && formData.message;

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
            <a href="/universal/contact" className="text-sm font-medium text-foreground">Contact</a>
            <a href="/universal/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/')}>Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="college">College *</Label>
                  <Select value={formData.college} onValueChange={(value) => setFormData({ ...formData, college: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your college" />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.map((college) => (
                        <SelectItem key={college} value={college}>
                          {college}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="What is this about?" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    maxLength={500}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {formData.message.length}/500 characters
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={!isFormValid}>
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">contact@grotalks.com</p>
                      <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Support</p>
                      <p className="text-muted-foreground">support@grotalks.com</p>
                      <p className="text-sm text-muted-foreground mt-1">For technical issues and urgent matters</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Partnerships</p>
                      <p className="text-muted-foreground">partnership@grotalks.com</p>
                      <p className="text-sm text-muted-foreground mt-1">For institutional collaborations</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <h3 className="text-xl font-semibold mb-4">Quick Support</h3>
                <p className="text-muted-foreground mb-4">
                  Looking for immediate answers? Check out our FAQ page for common questions.
                </p>
                <Button variant="outline" onClick={() => navigate('/universal/faq')}>
                  View FAQ
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                  Saturday: 10:00 AM - 4:00 PM IST<br />
                  Sunday: Closed
                </p>
              </Card>
            </div>
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

export default Contact;
