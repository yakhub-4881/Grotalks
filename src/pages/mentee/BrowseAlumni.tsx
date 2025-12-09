import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Search, Star, MapPin, Video } from 'lucide-react';
import { getCollegeDisplay } from '@/lib/college-config';
import { PricingDisplay } from '@/components/PricingDisplay';

const BrowseAlumni = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [batchYearFilter, setBatchYearFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const alumni = [
    {
      id: 1,
      name: 'Arjun Singh',
      role: 'Product Manager @ Flipkart',
      company: 'Flipkart',
      location: 'Bangalore',
      college: 'vel-tech',
      batch: '2018',
      language: 'English, Hindi',
      stream: 'Computer Science',
      expertise: ['Product Management', 'Career Guidance', 'Interview Prep'],
      rating: 4.9,
      reviews: 28,
      baseRate: 500, // Base rate for 30 min session
      sessionsCompleted: 45,
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Software Engineer @ Google',
      company: 'Google',
      location: 'Hyderabad',
      college: 'iit-bombay',
      batch: '2019',
      language: 'English, Tamil',
      stream: 'Data Science',
      expertise: ['Masters Abroad', 'Interview Prep', 'Data Science'],
      rating: 4.9,
      reviews: 32,
      baseRate: 750,
      sessionsCompleted: 52,
    },
    {
      id: 3,
      name: 'Rahul Verma',
      role: 'Startup Founder & CEO',
      company: 'TechVentures',
      location: 'Bangalore',
      college: 'bits-pilani',
      batch: '2015',
      language: 'English, Hindi',
      stream: 'Business',
      expertise: ['Entrepreneurship', 'Startup Funding', 'Career Guidance'],
      rating: 4.8,
      reviews: 25,
      baseRate: 1000,
      sessionsCompleted: 38,
    },
    {
      id: 4,
      name: 'Sneha Patel',
      role: 'Data Scientist @ Amazon',
      company: 'Amazon',
      location: 'Mumbai',
      college: 'iit-delhi',
      batch: '2020',
      language: 'English, Hindi',
      stream: 'Data Science',
      expertise: ['Data Science', 'ML/AI', 'Interview Prep'],
      rating: 4.7,
      reviews: 18,
      baseRate: 600,
      sessionsCompleted: 25,
    },
    {
      id: 5,
      name: 'Vikram Reddy',
      role: 'Investment Banker @ Goldman Sachs',
      company: 'Goldman Sachs',
      location: 'Mumbai',
      college: 'dtu',
      batch: '2017',
      language: 'English',
      stream: 'Finance',
      expertise: ['Finance & Investing', 'Career Guidance', 'MBA Abroad'],
      rating: 4.8,
      reviews: 22,
      baseRate: 700,
      sessionsCompleted: 32,
    },
    {
      id: 6,
      name: 'Ananya Krishnan',
      role: 'UX Designer @ Netflix',
      company: 'Netflix',
      location: 'Bangalore',
      college: 'nit-trichy',
      batch: '2019',
      language: 'English, Tamil',
      stream: 'Design',
      expertise: ['UX/UI Design', 'Career Guidance', 'Portfolio Review'],
      rating: 4.9,
      reviews: 30,
      baseRate: 550,
      sessionsCompleted: 42,
    },
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-muted">
        <div className="container mx-auto px-4 py-4 md:py-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Browse Alumni</h1>
            <p className="text-sm md:text-base text-muted-foreground">Book 1:1 video call sessions with industry experts</p>
          </div>

          {/* Search & Filters */}
          <div className="bg-card rounded-lg border p-4 md:p-6 mb-6 md:mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 md:pl-10 h-10 md:h-12 text-sm md:text-base"
                  />
                </div>
              </div>

              <div>
                <Select value={collegeFilter} onValueChange={setCollegeFilter}>
                  <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
                    <SelectValue placeholder="College" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Colleges</SelectItem>
                    <SelectItem value="iit-bombay">IIT Bombay</SelectItem>
                    <SelectItem value="iit-delhi">IIT Delhi</SelectItem>
                    <SelectItem value="bits-pilani">BITS Pilani</SelectItem>
                    <SelectItem value="nit-trichy">NIT Trichy</SelectItem>
                    <SelectItem value="dtu">DTU</SelectItem>
                    <SelectItem value="vel-tech">Vel Tech</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={batchYearFilter} onValueChange={setBatchYearFilter}>
                  <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
                    <SelectValue placeholder="Batch Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2019">2019</SelectItem>
                    <SelectItem value="2018">2018</SelectItem>
                    <SelectItem value="2017">2017</SelectItem>
                    <SelectItem value="2015">2015</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                  <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
                    <SelectValue placeholder="Expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Expertise</SelectItem>
                    <SelectItem value="career">Career Guidance</SelectItem>
                    <SelectItem value="masters">Masters Abroad</SelectItem>
                    <SelectItem value="startup">Entrepreneurship</SelectItem>
                    <SelectItem value="interview">Interview Prep</SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                    <SelectItem value="design">UX/UI Design</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={languageFilter} onValueChange={setLanguageFilter}>
                  <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="telugu">Telugu</SelectItem>
                    <SelectItem value="kannada">Kannada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-10 md:h-12 text-sm md:text-base">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="sessions">Most Sessions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 md:mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {alumni.length} alumni
            </p>
          </div>

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {alumni.map((alumni) => (
              <Card
                key={alumni.id}
                className="p-4 md:p-6 hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => navigate(`/alumni/profile/${alumni.id}`)}
              >
                <div className="space-y-3 md:space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {alumni.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1 truncate">{alumni.role}</p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="inline-flex items-center gap-2 text-xs">
                            <span className="px-2 py-1 bg-accent/50 text-accent-foreground rounded-md font-medium truncate max-w-[150px]">
                              {getCollegeDisplay(alumni.college, 'abbr')}
                            </span>
                            <span className="text-muted-foreground whitespace-nowrap">• {alumni.batch}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{getCollegeDisplay(alumni.college, 'full')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                      <Star className="h-4 w-4 fill-bonus text-bonus" />
                      <span className="text-sm font-semibold">{alumni.rating}</span>
                      <span className="text-xs text-muted-foreground">({alumni.reviews})</span>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {alumni.expertise.slice(0, 3).map((exp) => (
                      <span
                        key={exp}
                        className="px-2 py-0.5 md:py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{alumni.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Video className="h-3 w-3" />
                      <span>{alumni.sessionsCompleted} calls</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div>
                      <PricingDisplay baseRate={alumni.baseRate} variant="detail" />
                    </div>
                    <Button size="sm" onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/booking/schedule/${alumni.id}`);
                    }}>
                      Book Call
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BrowseAlumni;
