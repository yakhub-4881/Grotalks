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
  Video,
  Clock
} from 'lucide-react';

const AlumniFirstTimeView = () => {
  const navigate = useNavigate();
  const alumniName = "Priya";

  const quickActions = [
    {
      icon: Calendar,
      title: 'Set Your Availability',
      description: 'Define when you\'re free for sessions',
      action: () => navigate('/alumni/manage-availability'),
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: IndianRupee,
      title: 'Setup Payments',
      description: 'Connect your bank account to receive earnings',
      action: () => navigate('/alumni/payment'),
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: Video,
      title: 'Connect Meeting Platform',
      description: 'Link Google Meet or Zoom for sessions',
      action: () => navigate('/alumni/meeting-setup'),
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
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

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Complete Your Setup</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <Card 
                  key={action.title}
                  className="p-5 hover:shadow-lg transition-all cursor-pointer group"
                  onClick={action.action}
                >
                  <div className={`w-12 h-12 rounded-xl ${action.bgColor} flex items-center justify-center mb-4`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                  <ArrowRight className="h-4 w-4 text-muted-foreground mt-3 group-hover:translate-x-1 transition-transform" />
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

          {/* Empty Sessions State */}
          <Card className="p-8 md:p-12 text-center mt-8">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Session Requests Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Once students discover your profile and book sessions, their requests will appear here.
            </p>
            <Button onClick={() => navigate('/alumni/profile/edit')}>
              Enhance Your Profile
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AlumniFirstTimeView;