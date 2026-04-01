import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  Users, 
  Target
} from 'lucide-react';
import { AlumniBrowseSection } from '@/components/AlumniBrowseSection';

const StudentFirstTimeView = () => {
  const navigate = useNavigate();
  const studentName = "Ravi";

  const howItWorks = [
    { step: '1', title: 'Browse Alumni', description: 'Find alumnis in your desired career path' },
    { step: '2', title: 'Book a Session', description: 'Choose a service and pick a time slot' },
    { step: '3', title: 'Connect & Learn', description: 'Join the video call and get personalized guidance' },
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
              Welcome, {studentName}! 🎓
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Your journey to career success starts here. Connect with alumni who've walked the path you aspire to.
            </p>
          </div>

          {/* Stats Preview (Empty State) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
            {[
              { label: 'Sessions Booked', value: '0', icon: Calendar, color: 'text-primary' },
              { label: 'Sessions Completed', value: '0', icon: Clock, color: 'text-success' },
              { label: 'Hours of Learning', value: '0', icon: Target, color: 'text-secondary' },
              { label: 'Alumni Connected', value: '0', icon: Users, color: 'text-bonus' },
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

          {/* How It Works */}
          <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {howItWorks.map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Browse Alumni Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Discover Alumni</h2>
            <AlumniBrowseSection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentFirstTimeView;