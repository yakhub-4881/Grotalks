// College abbreviation configuration
export interface CollegeInfo {
  full: string;
  abbr: string;
  fullName: string;
}

export const collegeMap: Record<string, CollegeInfo> = {
  'vel-tech': {
    full: 'Vel Tech',
    abbr: 'VT',
    fullName: 'Vel Tech Rangarajan Dr. Sagunthala R & D Institute of Science and Technology'
  },
  'iit-delhi': {
    full: 'IIT Delhi',
    abbr: 'IITD',
    fullName: 'Indian Institute of Technology Delhi'
  },
  'iit-bombay': {
    full: 'IIT Bombay',
    abbr: 'IITB',
    fullName: 'Indian Institute of Technology Bombay'
  },
  'bits-pilani': {
    full: 'BITS Pilani',
    abbr: 'BITS',
    fullName: 'Birla Institute of Technology and Science, Pilani'
  },
  'iiit-hyderabad': {
    full: 'IIIT Hyderabad',
    abbr: 'IIITH',
    fullName: 'International Institute of Information Technology, Hyderabad'
  },
  'dtu': {
    full: 'DTU',
    abbr: 'DTU',
    fullName: 'Delhi Technological University'
  },
  'nit-trichy': {
    full: 'NIT Trichy',
    abbr: 'NIT',
    fullName: 'National Institute of Technology, Tiruchirappalli'
  },
  'vit-vellore': {
    full: 'VIT Vellore',
    abbr: 'VIT',
    fullName: 'Vellore Institute of Technology'
  },
  'mit-manipal': {
    full: 'MIT Manipal',
    abbr: 'MIT',
    fullName: 'Manipal Institute of Technology'
  },
  'srm': {
    full: 'SRM Institute',
    abbr: 'SRM',
    fullName: 'SRM Institute of Science and Technology'
  },
  'symbiosis': {
    full: 'Symbiosis IT',
    abbr: 'SIT',
    fullName: 'Symbiosis Institute of Technology'
  },
  'christ': {
    full: 'Christ University',
    abbr: 'Christ',
    fullName: 'Christ University, Bangalore'
  }
};

export const getCollegeDisplay = (collegeKey: string, mode: 'full' | 'abbr' | 'both' = 'both'): string => {
  const college = collegeMap[collegeKey] || collegeMap['vel-tech'];
  
  if (mode === 'full') return college.full;
  if (mode === 'abbr') return college.abbr;
  return `${college.full} [${college.abbr}]`;
};

// Session duration options and pricing
export interface SessionPackage {
  duration: number; // in minutes
  label: string;
  description: string;
}

export const sessionPackages: SessionPackage[] = [
  { duration: 15, label: '15 mins', description: 'Quick consultation' },
  { duration: 30, label: '30 mins', description: 'Standard session' },
  { duration: 45, label: '45 mins', description: 'Extended session' },
  { duration: 60, label: '1 hour', description: 'Deep dive session' },
];

// Calculate session price based on base rate and duration
export const calculateSessionPrice = (baseRate: number, durationMinutes: number): number => {
  return Math.round(baseRate * (durationMinutes / 30)); // Base rate is for 30 mins
};

// Format price for display
export const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};

// Platform fee percentage
export const PLATFORM_FEE_PERCENT = 15;

// Calculate alumni earnings after platform fee
export const calculateAlumniEarnings = (sessionPrice: number): number => {
  return Math.round(sessionPrice * (100 - PLATFORM_FEE_PERCENT) / 100);
};
