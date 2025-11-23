import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, MapPin, Briefcase, Filter, SlidersHorizontal } from 'lucide-react';
import { getCollegeDisplay, collegeMap } from '@/lib/college-config';
import { CollegeDisplay } from '@/components/CollegeDisplay';
import { PricingDisplay } from '@/components/PricingDisplay';

const mentors = [
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
    hourlyRate: 600,
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
    hourlyRate: 900,
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
    hourlyRate: 1200,
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
    hourlyRate: 720,
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
    hourlyRate: 840,
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
    hourlyRate: 660,
    sessionsCompleted: 42,
  },
];

export const MentorBrowseSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [batchYearFilter, setBatchYearFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showAll, setShowAll] = useState(false);

  const filteredMentors = mentors
    .filter((mentor) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchLower) ||
        mentor.company.toLowerCase().includes(searchLower) ||
        mentor.role.toLowerCase().includes(searchLower);

      const matchesExpertise =
        expertiseFilter === 'all' ||
        mentor.expertise.some((exp) => exp.toLowerCase().includes(expertiseFilter));

      const matchesCollege = collegeFilter === 'all' || mentor.college === collegeFilter;
      const matchesBatch = batchYearFilter === 'all' || mentor.batch === batchYearFilter;
      const matchesLanguage =
        languageFilter === 'all' || mentor.language.toLowerCase().includes(languageFilter.toLowerCase());

      return matchesSearch && matchesExpertise && matchesCollege && matchesBatch && matchesLanguage;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price-high') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'sessions') return b.sessionsCompleted - a.sessionsCompleted;
      return 0;
    });

  const hasActiveFilters =
    expertiseFilter !== 'all' ||
    collegeFilter !== 'all' ||
    batchYearFilter !== 'all' ||
    languageFilter !== 'all';

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search mentors by name, company, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px] h-11">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="sessions">Most Sessions</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-11 gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0 text-xs">
                    {[expertiseFilter, collegeFilter, batchYearFilter, languageFilter].filter(f => f !== 'all').length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Mentors</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Expertise</label>
                  <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select expertise" />
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
                  <label className="text-sm font-medium mb-2 block">College</label>
                  <Select value={collegeFilter} onValueChange={setCollegeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select college" />
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
                  <label className="text-sm font-medium mb-2 block">Batch Year</label>
                  <Select value={batchYearFilter} onValueChange={setBatchYearFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
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
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select value={languageFilter} onValueChange={setLanguageFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setExpertiseFilter('all');
                      setCollegeFilter('all');
                      setBatchYearFilter('all');
                      setLanguageFilter('all');
                    }}
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Results */}
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          Showing {showAll ? filteredMentors.length : Math.min(6, filteredMentors.length)} of {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredMentors.slice(0, showAll ? undefined : 6).map((mentor) => (
            <Card key={mentor.id} className="p-4 md:p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{mentor.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {mentor.role}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <CollegeDisplay collegeName={collegeMap[mentor.college]?.fullName || mentor.college} />
                    <Badge variant="outline" className="text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      {mentor.location}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Batch {mentor.batch}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.slice(0, 3).map((exp) => (
                      <Badge key={exp} variant="secondary" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-bonus text-bonus" />
                      <span className="font-medium">{mentor.rating}</span>
                      <span className="text-muted-foreground">({mentor.reviews})</span>
                    </div>
                    <span className="text-muted-foreground">
                      {mentor.sessionsCompleted} sessions
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between gap-3 md:min-w-[180px]">
                  <PricingDisplay hourlyRate={mentor.hourlyRate} />
                  <Button
                    onClick={() => navigate(`/mentor/profile/${mentor.id}`)}
                    className="w-full md:w-auto"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredMentors.length > 6 && !showAll && (
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowAll(true)}
              className="min-w-[200px]"
            >
              View More Mentors ({filteredMentors.length - 6} more)
            </Button>
          </div>
        )}

        {showAll && filteredMentors.length > 6 && (
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                setShowAll(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="min-w-[200px]"
            >
              Show Less
            </Button>
          </div>
        )}

        {filteredMentors.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No mentors found matching your criteria. Try adjusting your filters.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
