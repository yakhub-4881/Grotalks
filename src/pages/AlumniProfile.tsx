import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, GraduationCap, Award, ArrowLeft, Building2, Linkedin, Globe } from 'lucide-react';
import { getCollegeDisplay } from '@/lib/college-config';
import { AlumniServices, AlumniService } from '@/components/AlumniServices';

const AlumniProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock alumni data with services
  const alumni = {
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
    sessionsCompleted: 45,
    bio: 'Product manager with 6+ years of experience in e-commerce and fintech. Helped 40+ students land product roles at top companies. Passionate about alumniing and career growth.',
    languages: ['English', 'Hindi', 'Tamil'],
    linkedinUrl: 'https://linkedin.com/in/arjunsingh',
    services: [
      { id: 1, type: 'call' as const, title: '1:1 Career Guidance Call', duration: 30, price: 2000 },
      { id: 2, type: 'call' as const, title: 'Mock Interview Session', duration: 45, price: 3500 },
      { id: 3, type: 'dm' as const, title: 'Resume Review', duration: 0, price: 1500, description: 'Get detailed feedback on your resume within 48 hours' },
      { id: 4, type: 'product' as const, title: 'LinkedIn Optimization', duration: 0, price: 2500, description: 'Complete profile revamp with keyword optimization' },
      { id: 5, type: 'workshop' as const, title: 'Abroad Studies Consultation', duration: 60, price: 4000, description: 'Comprehensive guidance on MS applications, SOP review, and university selection' },
    ],
    workExperience: [
      { 
        id: 1, 
        title: 'Senior Product Manager', 
        company: 'Flipkart', 
        duration: 'Jan 2021 - Present',
        description: 'Leading product strategy for e-commerce platform with 100M+ users'
      },
      { 
        id: 2, 
        title: 'Product Manager', 
        company: 'Paytm', 
        duration: 'Mar 2019 - Dec 2020',
        description: 'Managed fintech products and payment solutions'
      },
      { 
        id: 3, 
        title: 'Associate Product Manager', 
        company: 'Myntra', 
        duration: 'Jun 2017 - Feb 2019',
        description: 'Worked on fashion e-commerce features and recommendations'
      },
    ],
    certifications: [
      { id: 1, name: 'Certified Scrum Product Owner (CSPO)', issuer: 'Scrum Alliance', year: '2020' },
      { id: 2, name: 'Product Management Certification', issuer: 'Product School', year: '2019' },
      { id: 3, name: 'Google Analytics Certification', issuer: 'Google', year: '2018' },
    ],
    reviewsList: [
      { id: 1, student: 'Ravi K.', rating: 5, comment: 'Excellent guidance! Helped me crack my PM interview.', date: '2 weeks ago' },
      { id: 2, student: 'Priya S.', rating: 5, comment: 'Very insightful session on product strategy.', date: '1 month ago' },
      { id: 3, student: 'Amit P.', rating: 4, comment: 'Good session, learned a lot about agile.', date: '2 months ago' },
    ]
  };

  const handleBookService = (service: AlumniService) => {
    navigate(`/booking/schedule/${alumni.id}?service=${service.id}`);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-4 md:py-6">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-10rem)]">
            {/* Left Column - Profile Details (Scrollable) */}
            <div className="lg:w-[45%] xl:w-[40%] lg:overflow-y-auto lg:pr-2 scrollbar-thin">
              <div className="space-y-6">
                {/* Profile Header */}
                <Card className="p-4 md:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-20 w-20 md:h-24 md:w-24 bg-primary/10 flex items-center justify-center text-2xl md:text-3xl font-bold text-primary flex-shrink-0 border-4 border-primary/20">
                      {alumni.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">{alumni.name}</h1>
                      <p className="text-sm md:text-base text-muted-foreground mb-2">{alumni.role}</p>
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <Badge variant="secondary" className="gap-1">
                          <GraduationCap className="h-3 w-3" />
                          {getCollegeDisplay(alumni.college, 'both')} • {alumni.batch}
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <MapPin className="h-3 w-3" />
                          {alumni.location}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating & Stats */}
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-bonus text-bonus" />
                      <span className="font-semibold">{alumni.rating}</span>
                      <span className="text-sm text-muted-foreground">({alumni.totalReviews} reviews)</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {alumni.sessionsCompleted} sessions
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-foreground mb-2">About</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{alumni.bio}</p>
                  </div>

                  {/* Expertise */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-foreground mb-2">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {alumni.expertise.map((exp) => (
                        <Badge key={exp} variant="default" className="text-xs">{exp}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-foreground mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {alumni.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <a 
                    href={alumni.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Linkedin className="h-4 w-4" />
                    View LinkedIn Profile
                  </a>
                </Card>

                {/* Work Experience */}
                <Card className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Work Experience
                  </h3>
                  <div className="space-y-4">
                    {alumni.workExperience.map((exp, index) => (
                      <div key={exp.id} className="relative pl-6 pb-4 last:pb-0">
                        {/* Timeline line */}
                        {index < alumni.workExperience.length - 1 && (
                          <div className="absolute left-[7px] top-3 bottom-0 w-0.5 bg-border" />
                        )}
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">{exp.title}</h4>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{exp.duration}</p>
                          <p className="text-sm text-foreground/80 mt-1">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Certifications */}
                <Card className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-bonus" />
                    Certifications
                  </h3>
                  <div className="space-y-3">
                    {alumni.certifications.map((cert) => (
                      <div key={cert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-lg bg-bonus/10 flex items-center justify-center flex-shrink-0">
                          <Award className="h-4 w-4 text-bonus" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground text-sm">{cert.name}</h4>
                          <p className="text-xs text-muted-foreground">{cert.issuer} • {cert.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Reviews */}
                <Card className="p-4 md:p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-bonus" />
                    Reviews ({alumni.reviewsList.length})
                  </h3>
                  <div className="space-y-4">
                    {alumni.reviewsList.map((review) => (
                      <div key={review.id} className="pb-4 border-b last:border-0 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-foreground text-sm">{review.student}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < review.rating ? 'fill-bonus text-bonus' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Column - Services (Scrollable) */}
            <div className="lg:flex-1 lg:overflow-y-auto lg:pl-2 scrollbar-thin">
              <div className="lg:sticky lg:top-0 bg-muted pb-4 -mt-2 pt-2">
                <h2 className="text-lg font-semibold text-foreground">Services Offered</h2>
              </div>
              <AlumniServices 
                services={alumni.services} 
                onBookService={handleBookService}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AlumniProfile;