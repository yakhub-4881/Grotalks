import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Briefcase, GraduationCap, Award, Calendar, Clock } from 'lucide-react';
import { getCollegeDisplay } from '@/lib/college-config';
import { PricingDisplay } from '@/components/PricingDisplay';

const MentorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock mentor data
  const mentor = {
    id: Number(id) || 1,
    name: 'Arjun Singh',
    role: 'Product Manager @ Flipkart',
    company: 'Flipkart',
    location: 'Bangalore',
    college: 'vel-tech',
    batch: '2018',
    expertise: ['Product Management', 'Career Guidance', 'Interview Prep', 'Agile Methodologies'],
    rating: 4.9,
    totalReviews: 28,
    hourlyRate: 600,
    sessionsCompleted: 45,
    bio: 'Product manager with 6+ years of experience in e-commerce and fintech. Helped 40+ students land product roles at top companies. Passionate about mentoring and career growth.',
    languages: ['English', 'Hindi', 'Tamil'],
    availability: [
      { day: 'Monday', slots: ['10:00 AM', '2:00 PM', '5:00 PM'] },
      { day: 'Tuesday', slots: ['11:00 AM', '3:00 PM'] },
      { day: 'Wednesday', slots: ['10:00 AM', '4:00 PM', '6:00 PM'] },
      { day: 'Thursday', slots: ['2:00 PM', '5:00 PM'] },
      { day: 'Friday', slots: ['10:00 AM', '3:00 PM'] },
    ],
    reviewsList: [
      { id: 1, student: 'Ravi K.', rating: 5, comment: 'Excellent guidance! Helped me crack my PM interview.', date: '2 weeks ago' },
      { id: 2, student: 'Priya S.', rating: 5, comment: 'Very insightful session on product strategy.', date: '1 month ago' },
      { id: 3, student: 'Amit P.', rating: 4, comment: 'Good session, learned a lot about agile.', date: '2 months ago' },
    ]
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-8">
          {/* Header Card */}
          <Card className="p-6 md:p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Left: Profile Info */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20 bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{mentor.name}</h1>
                    <p className="text-base text-muted-foreground mb-2">{mentor.role}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <Badge variant="secondary" className="gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {getCollegeDisplay(mentor.college, 'both')} • {mentor.batch}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <MapPin className="h-3 w-3" />
                        {mentor.location}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-bonus text-bonus" />
                        <span className="font-semibold">{mentor.rating}</span>
                        <span className="text-sm text-muted-foreground">({mentor.totalReviews} reviews)</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {mentor.sessionsCompleted} sessions completed
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">About</h3>
                  <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((exp) => (
                      <Badge key={exp} variant="default">{exp}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.languages.map((lang) => (
                      <Badge key={lang} variant="outline">{lang}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Booking Card */}
              <div className="md:col-span-1">
                <Card className="p-6 border-2 border-primary/20 bg-primary/5 sticky top-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Session Rate</p>
                      <PricingDisplay hourlyRate={mentor.hourlyRate} variant="detail" />
                    </div>
                    <Button 
                      className="w-full h-12 text-base font-semibold"
                      onClick={() => navigate(`/booking/schedule/${mentor.id}`)}
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Session
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Choose your preferred date & time slot
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="availability" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({mentor.reviewsList.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="availability" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Available Time Slots</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mentor.availability.map((day) => (
                    <Card key={day.day} className="p-4 border-2">
                      <h4 className="font-semibold text-foreground mb-3">{day.day}</h4>
                      <div className="space-y-2">
                        {day.slots.map((slot) => (
                          <div key={slot} className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{slot}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="mt-6">
                  <Button 
                    className="w-full md:w-auto"
                    onClick={() => navigate(`/booking/schedule/${mentor.id}`)}
                  >
                    Select & Book a Slot
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              {mentor.reviewsList.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">{review.student}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'fill-bonus text-bonus' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default MentorProfile;
