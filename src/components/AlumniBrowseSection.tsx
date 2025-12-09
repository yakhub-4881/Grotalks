import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, MapPin, SlidersHorizontal } from 'lucide-react';
import { collegeMap } from '@/lib/college-config';
import { CollegeDisplay } from '@/components/CollegeDisplay';

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
    baseRate: 2500,
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
    baseRate: 4000,
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
    baseRate: 6000,
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
    baseRate: 3000,
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
    baseRate: 5000,
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
    baseRate: 2000,
    sessionsCompleted: 42,
  },
  // Vel Tech Alumni
  {
    id: 7,
    name: 'Karthik Rajan',
    role: 'Software Engineer @ Microsoft',
    company: 'Microsoft',
    location: 'Hyderabad',
    college: 'vel-tech',
    batch: '2019',
    language: 'English, Tamil',
    stream: 'Computer Science',
    expertise: ['Interview Prep', 'DSA', 'System Design'],
    rating: 4.8,
    reviews: 35,
    baseRate: 3500,
    sessionsCompleted: 48,
  },
  {
    id: 8,
    name: 'Divya Lakshmi',
    role: 'Data Analyst @ Deloitte',
    company: 'Deloitte',
    location: 'Chennai',
    college: 'vel-tech',
    batch: '2020',
    language: 'English, Tamil',
    stream: 'Data Science',
    expertise: ['Data Analytics', 'SQL', 'Career Guidance'],
    rating: 4.7,
    reviews: 22,
    baseRate: 2000,
    sessionsCompleted: 30,
  },
  {
    id: 9,
    name: 'Sanjay Kumar',
    role: 'DevOps Engineer @ Infosys',
    company: 'Infosys',
    location: 'Bangalore',
    college: 'vel-tech',
    batch: '2017',
    language: 'English, Hindi',
    stream: 'Computer Science',
    expertise: ['DevOps', 'Cloud Computing', 'AWS'],
    rating: 4.6,
    reviews: 18,
    baseRate: 2500,
    sessionsCompleted: 25,
  },
  {
    id: 10,
    name: 'Meera Subramaniam',
    role: 'UI Designer @ Zoho',
    company: 'Zoho',
    location: 'Chennai',
    college: 'vel-tech',
    batch: '2021',
    language: 'English, Tamil',
    stream: 'Design',
    expertise: ['UI Design', 'Figma', 'Portfolio Review'],
    rating: 4.9,
    reviews: 28,
    baseRate: 1800,
    sessionsCompleted: 35,
  },
  {
    id: 11,
    name: 'Arun Prasad',
    role: 'Full Stack Developer @ TCS',
    company: 'TCS',
    location: 'Chennai',
    college: 'vel-tech',
    batch: '2018',
    language: 'English, Tamil',
    stream: 'Computer Science',
    expertise: ['Web Development', 'React', 'Node.js'],
    rating: 4.5,
    reviews: 20,
    baseRate: 2000,
    sessionsCompleted: 28,
  },
  {
    id: 12,
    name: 'Preethi Venkat',
    role: 'Business Analyst @ Accenture',
    company: 'Accenture',
    location: 'Bangalore',
    college: 'vel-tech',
    batch: '2019',
    language: 'English, Tamil, Hindi',
    stream: 'Business',
    expertise: ['Business Analysis', 'Consulting', 'Career Guidance'],
    rating: 4.7,
    reviews: 24,
    baseRate: 2500,
    sessionsCompleted: 32,
  },
  {
    id: 13,
    name: 'Vijay Anand',
    role: 'Machine Learning Engineer @ Freshworks',
    company: 'Freshworks',
    location: 'Chennai',
    college: 'vel-tech',
    batch: '2020',
    language: 'English, Tamil',
    stream: 'Data Science',
    expertise: ['Machine Learning', 'Python', 'Interview Prep'],
    rating: 4.8,
    reviews: 30,
    baseRate: 3000,
    sessionsCompleted: 40,
  },
  {
    id: 14,
    name: 'Lakshmi Narayanan',
    role: 'Product Designer @ Swiggy',
    company: 'Swiggy',
    location: 'Bangalore',
    college: 'vel-tech',
    batch: '2018',
    language: 'English, Tamil',
    stream: 'Design',
    expertise: ['Product Design', 'UX Research', 'Design Systems'],
    rating: 4.9,
    reviews: 26,
    baseRate: 2800,
    sessionsCompleted: 38,
  },
  {
    id: 15,
    name: 'Ramesh Babu',
    role: 'Senior Developer @ Wipro',
    company: 'Wipro',
    location: 'Chennai',
    college: 'vel-tech',
    batch: '2016',
    language: 'English, Tamil',
    stream: 'Computer Science',
    expertise: ['Java', 'Spring Boot', 'Career Guidance'],
    rating: 4.6,
    reviews: 19,
    baseRate: 2200,
    sessionsCompleted: 22,
  },
  {
    id: 16,
    name: 'Sangeetha Ramachandran',
    role: 'QA Lead @ Cognizant',
    company: 'Cognizant',
    location: 'Chennai',
    college: 'vel-tech',
    batch: '2017',
    language: 'English, Tamil',
    stream: 'Computer Science',
    expertise: ['Testing', 'Automation', 'Interview Prep'],
    rating: 4.5,
    reviews: 16,
    baseRate: 1800,
    sessionsCompleted: 20,
  },
  {
    id: 17,
    name: 'Harish Chandran',
    role: 'Cloud Architect @ AWS',
    company: 'AWS',
    location: 'Hyderabad',
    college: 'vel-tech',
    batch: '2015',
    language: 'English, Tamil',
    stream: 'Computer Science',
    expertise: ['Cloud Architecture', 'AWS', 'System Design'],
    rating: 4.9,
    reviews: 42,
    baseRate: 5000,
    sessionsCompleted: 55,
  },
  {
    id: 18,
    name: 'Kavitha Sundaram',
    role: 'Frontend Developer @ Razorpay',
    company: 'Razorpay',
    location: 'Bangalore',
    college: 'vel-tech',
    batch: '2021',
    language: 'English, Tamil',
    stream: 'Computer Science',
    expertise: ['React', 'JavaScript', 'Frontend Development'],
    rating: 4.7,
    reviews: 21,
    baseRate: 2000,
    sessionsCompleted: 28,
  },
  {
    id: 19,
    name: 'Suresh Kannan',
    role: 'Tech Lead @ Flipkart',
    company: 'Flipkart',
    location: 'Bangalore',
    college: 'vel-tech',
    batch: '2014',
    language: 'English, Tamil, Hindi',
    stream: 'Computer Science',
    expertise: ['Leadership', 'System Design', 'Career Guidance'],
    rating: 4.8,
    reviews: 38,
    baseRate: 4500,
    sessionsCompleted: 50,
  },
  {
    id: 20,
    name: 'Nithya Raghavan',
    role: 'Data Engineer @ Uber',
    company: 'Uber',
    location: 'Bangalore',
    college: 'vel-tech',
    batch: '2019',
    language: 'English, Tamil',
    stream: 'Data Science',
    expertise: ['Data Engineering', 'Big Data', 'Interview Prep'],
    rating: 4.8,
    reviews: 29,
    baseRate: 3500,
    sessionsCompleted: 42,
  },
  {
    id: 21,
    name: 'Mohan Raj',
    role: 'Android Developer @ PhonePe',
    company: 'PhonePe',
    location: 'Bangalore',
    college: 'vel-tech',
    batch: '2020',
    language: 'English, Tamil',
    stream: 'Computer Science',
    expertise: ['Android', 'Kotlin', 'Mobile Development'],
    rating: 4.6,
    reviews: 23,
    baseRate: 2500,
    sessionsCompleted: 30,
  },
  {
    id: 22,
    name: 'Deepika Srinivasan',
    role: 'Product Manager @ Ola',
    company: 'Ola',
    location: 'Bangalore',
    college: 'vel-tech',
    batch: '2018',
    language: 'English, Tamil',
    stream: 'Business',
    expertise: ['Product Management', 'Strategy', 'Career Guidance'],
    rating: 4.7,
    reviews: 27,
    baseRate: 3000,
    sessionsCompleted: 36,
  },
  {
    id: 23,
    name: 'Balaji Venkatesh',
    role: 'Security Engineer @ Paytm',
    company: 'Paytm',
    location: 'Noida',
    college: 'vel-tech',
    batch: '2017',
    language: 'English, Tamil, Hindi',
    stream: 'Computer Science',
    expertise: ['Cybersecurity', 'Ethical Hacking', 'Interview Prep'],
    rating: 4.8,
    reviews: 31,
    baseRate: 3500,
    sessionsCompleted: 40,
  },
  {
    id: 24,
    name: 'Revathi Krishnamoorthy',
    role: 'HR Manager @ Infosys',
    company: 'Infosys',
    location: 'Chennai',
    college: 'vel-tech',
    batch: '2016',
    language: 'English, Tamil',
    stream: 'Business',
    expertise: ['HR Interview', 'Resume Review', 'Career Guidance'],
    rating: 4.5,
    reviews: 18,
    baseRate: 1500,
    sessionsCompleted: 24,
  },
  {
    id: 25,
    name: 'Gowtham Ravi',
    role: 'iOS Developer @ Swiggy',
    company: 'Swiggy',
    location: 'Bangalore',
    college: 'vel-tech',
    batch: '2019',
    language: 'English, Tamil',
    stream: 'Computer Science',
    expertise: ['iOS', 'Swift', 'Mobile Development'],
    rating: 4.7,
    reviews: 25,
    baseRate: 2800,
    sessionsCompleted: 33,
  },
  {
    id: 26,
    name: 'Anusha Bala',
    role: 'Scrum Master @ HCL',
    company: 'HCL',
    location: 'Chennai',
    college: 'vel-tech',
    batch: '2018',
    language: 'English, Tamil',
    stream: 'Business',
    expertise: ['Agile', 'Scrum', 'Project Management'],
    rating: 4.6,
    reviews: 20,
    baseRate: 2200,
    sessionsCompleted: 28,
  },
];

export const AlumniBrowseSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [collegeFilter, setCollegeFilter] = useState('vel-tech'); // Default to student's college
  const [batchYearFilter, setBatchYearFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [displayCount, setDisplayCount] = useState(6);

  const filteredAlumni = alumni
    .filter((alumni) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        alumni.name.toLowerCase().includes(searchLower) ||
        alumni.company.toLowerCase().includes(searchLower) ||
        alumni.role.toLowerCase().includes(searchLower);

      const matchesExpertise =
        expertiseFilter === 'all' ||
        alumni.expertise.some((exp) => exp.toLowerCase().includes(expertiseFilter));

      const matchesCollege = collegeFilter === 'all' || alumni.college === collegeFilter;
      const matchesBatch = batchYearFilter === 'all' || alumni.batch === batchYearFilter;
      const matchesLanguage =
        languageFilter === 'all' || alumni.language.toLowerCase().includes(languageFilter.toLowerCase());

      return matchesSearch && matchesExpertise && matchesCollege && matchesBatch && matchesLanguage;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
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
            placeholder="Search alumni by name, company, or role..."
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
                <SheetTitle>Filter Alumni</SheetTitle>
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
          Showing {Math.min(displayCount, filteredAlumni.length)} of {filteredAlumni.length} alumni{filteredAlumni.length !== 1 ? 's' : ''}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.slice(0, displayCount).map((alumni) => (
            <Card key={alumni.id} className="group p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col">
              {/* Header: Name + Rating */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-bold text-foreground leading-tight">
                  {alumni.name}
                </h3>
                <div className="flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-full flex-shrink-0">
                  <Star className="h-3.5 w-3.5 fill-bonus text-bonus" />
                  <span className="text-sm font-semibold text-foreground">{alumni.rating}</span>
                </div>
              </div>

              {/* Role */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {alumni.role}
              </p>

              {/* College Badge + Metadata */}
              <div className="mb-4 pb-4 border-b border-border/50">
                <div className="mb-2">
                  <CollegeDisplay collegeName={collegeMap[alumni.college]?.fullName || alumni.college} />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {alumni.location}
                  </span>
                  <span>•</span>
                  <span>Batch {alumni.batch}</span>
                  <span>•</span>
                  <span>{alumni.sessionsCompleted} sessions</span>
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {alumni.expertise.slice(0, 3).map((exp) => (
                  <span 
                    key={exp} 
                    className="text-xs px-2.5 py-1 bg-secondary/50 text-secondary-foreground rounded-md"
                  >
                    {exp}
                  </span>
                ))}
              </div>

              {/* Footer: CTA */}
              <div className="mt-auto pt-4 border-t border-border/50">
                <Button
                  onClick={() => navigate(`/alumni/profile/${alumni.id}`)}
                  className="w-full group-hover:shadow-md transition-shadow"
                >
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {displayCount < filteredAlumni.length && (
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setDisplayCount(prev => Math.min(prev + 6, filteredAlumni.length))}
              className="min-w-[200px]"
            >
              Load More ({filteredAlumni.length - displayCount} more)
            </Button>
          </div>
        )}

        {displayCount > 6 && displayCount >= filteredAlumni.length && (
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                setDisplayCount(6);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="min-w-[200px]"
            >
              Show Less
            </Button>
          </div>
        )}

        {filteredAlumni.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No alumni found matching your criteria. Try adjusting your filters.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
