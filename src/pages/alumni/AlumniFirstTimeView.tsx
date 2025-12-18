import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  IndianRupee, 
  Users, 
  Star, 
  ArrowRight,
  CheckCircle,
  Clock,
  UserCheck,
  MessageSquare,
  Wallet,
  Phone,
  FileText,
  Linkedin,
  Globe,
  Pencil
} from 'lucide-react';

const AlumniFirstTimeView = () => {
  const navigate = useNavigate();
  const alumniName = "Priya";

  const howItWorks = [
    {
      icon: UserCheck,
      title: 'Students Discover You',
      description: 'Your profile appears to students from your college searching for guidance in your field',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: MessageSquare,
      title: 'Accept Bookings',
      description: 'Review session requests, accept the ones that fit your schedule, and connect via video call',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: Wallet,
      title: 'Get Paid Instantly',
      description: 'Receive payments directly to your bank after completing each session',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
  ];

  const currentServices = [
    { icon: Phone, name: '1:1 Call', rate: '₹2,000', duration: '30 mins' },
    { icon: FileText, name: 'Resume Review', rate: '₹1,500', duration: 'Async' },
    { icon: Linkedin, name: 'LinkedIn Optimization', rate: '₹1,800', duration: 'Async' },
  ];

  const benefits = [
    'Earn by sharing your career journey',
    'Help students from your alma mater',
    'Flexible scheduling - you decide when',
    'Build your professional network',
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Welcome Hero */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Welcome to Grotalks
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Hello, {alumniName}! 🎉
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Your alumni profile is ready. Students from your college can now discover and book sessions with you.
            </p>
          </div>

          {/* Stats Preview (Empty State) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
            {[
              { label: 'Total Earnings', value: '₹0', icon: IndianRupee, color: 'text-success' },
              { label: 'Sessions', value: '0', icon: Calendar, color: 'text-primary' },
              { label: 'Hours Mentored', value: '0', icon: Clock, color: 'text-secondary' },
              { label: 'Average Rating', value: '--', icon: Star, color: 'text-bonus' },
            ].map((stat) => (
              <Card key={stat.label} className="p-4 md:p-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.color}`} />
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Current Services */}
          <Card className="p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-foreground">Your Services</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/alumni/profile/edit')}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                Enhance Services
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentServices.map((service) => (
                <div 
                  key={service.name}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{service.name}</p>
                    <p className="text-xs text-muted-foreground">{service.duration}</p>
                  </div>
                  <p className="font-semibold text-success">{service.rate}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Add more services to increase your visibility and earnings
            </p>
          </Card>

          {/* How Grotalks Works */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">How Grotalks Works</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {howItWorks.map((step, index) => (
                <Card key={step.title} className="p-5 relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-4xl font-bold text-muted/30">
                    {index + 1}
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center mb-4`}>
                    <step.icon className={`h-6 w-6 ${step.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <h2 className="text-xl font-semibold text-foreground mb-4">Why Alumni Love Grotalks</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AlumniFirstTimeView;