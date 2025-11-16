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

export const calculatePerMinuteRate = (hourlyRate: number): number => {
  return parseFloat((hourlyRate / 60).toFixed(2));
};

export const calculateSessionCost = (perMinuteRate: number, minutes: number): number => {
  return parseFloat((perMinuteRate * minutes).toFixed(2));
};