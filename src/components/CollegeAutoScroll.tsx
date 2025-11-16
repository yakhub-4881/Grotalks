import { collegeMap } from '@/lib/college-config';
import { Card } from '@/components/ui/card';
import iitDelhiLogo from '@/assets/college-logos/iit-delhi.png';
import iitBombayLogo from '@/assets/college-logos/iit-bombay.png';
import bitsPilaniLogo from '@/assets/college-logos/bits-pilani.png';
import iiitHyderabadLogo from '@/assets/college-logos/iiit-hyderabad.png';
import dtuLogo from '@/assets/college-logos/dtu.png';
import nitTrichyLogo from '@/assets/college-logos/nit-trichy.png';
import vitVelloreLogo from '@/assets/college-logos/vit-vellore.png';
import mitManipalLogo from '@/assets/college-logos/mit-manipal.png';
import srmLogo from '@/assets/college-logos/srm.png';
import symbiosisLogo from '@/assets/college-logos/symbiosis.png';
import christLogo from '@/assets/college-logos/christ.png';
import velTechLogo from '@/assets/college-logos/vel-tech.png';

const collegeLogos: Record<string, string> = {
  'iit-delhi': iitDelhiLogo,
  'iit-bombay': iitBombayLogo,
  'bits-pilani': bitsPilaniLogo,
  'iiit-hyderabad': iiitHyderabadLogo,
  'dtu': dtuLogo,
  'nit-trichy': nitTrichyLogo,
  'vit-vellore': vitVelloreLogo,
  'mit-manipal': mitManipalLogo,
  'srm': srmLogo,
  'symbiosis': symbiosisLogo,
  'christ': christLogo,
  'vel-tech': velTechLogo,
};

const CollegeAutoScroll = () => {
  const colleges = Object.entries(collegeMap);
  
  // Duplicate for infinite scroll effect
  const doubledColleges = [...colleges, ...colleges];

  return (
    <div className="relative w-full overflow-hidden py-12 bg-muted/30">
      <div className="container px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Partnered Colleges</h2>
        <p className="text-center text-muted-foreground">12+ Top institutions across India</p>
      </div>
      
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/30 to-transparent z-10" />
        
        {/* Scrolling Container */}
        <div 
          className="flex gap-6 animate-scroll"
          style={{
            width: `${doubledColleges.length * 280}px`,
          }}
        >
          {doubledColleges.map(([key, college], index) => (
            <Card
              key={`${college.abbr}-${index}`}
              className="flex-shrink-0 w-64 p-6 bg-card hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-4 rounded-full overflow-hidden bg-card border-2 border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img 
                    src={collegeLogos[key]} 
                    alt={`${college.full} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1">{college.full}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{college.fullName}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default CollegeAutoScroll;
