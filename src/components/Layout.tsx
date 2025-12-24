import { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Settings, Menu, User, LogOut, UserCircle, GraduationCap, Wallet, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppContext } from '@/lib/app-context';
import logoLight from '@/assets/logo-light.png';
import logoDark from '@/assets/logo-dark.png';

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export const Layout = ({ children, showNav = true }: LayoutProps) => {
  const { versionMode, setVersionMode, isAuthenticated, selectedCollege, setSelectedCollege, setIsAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for dark mode
  const isDarkMode = document.documentElement.classList.contains('dark');
  const logo = isDarkMode ? logoLight : logoDark;

  // Check if current path is alumni
  const isAlumniPage = location.pathname.startsWith('/alumni');
  const isMenteePage = location.pathname.startsWith('/mentee');

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const screens = [
    { name: '🏠 Landing', path: '/' },
    { name: '🌐 Universal Landing', path: '/universal' },
    { name: '🚀 Coming Soon', path: '/coming-soon' },
    { name: '👨‍🏫 Alumni Signup - Phone', path: '/signup?type=alumni' },
    { name: '👨‍🏫 Alumni Dashboard', path: '/alumni/dashboard' },
    { name: '👨‍🏫 Alumni First Time View', path: '/alumni/first-time' },
    { name: '👨‍🏫 Alumni Requests', path: '/alumni/requests' },
    { name: '👨‍🏫 Alumni Profile', path: '/alumni/profile' },
    { name: '👨‍🏫 Alumni Withdraw', path: '/alumni/withdraw' },
    { name: '👨‍🎓 Student Signup - Phone', path: '/mentee/signup' },
    { name: '👨‍🎓 Student Dashboard', path: '/mentee/dashboard' },
    { name: '👨‍🎓 Student First Time View', path: '/mentee/first-time' },
    { name: '👨‍🎓 Browse Alumni', path: '/mentee/browse' },
    { name: '👨‍🎓 Student Profile', path: '/mentee/profile' },
    { name: '👨‍🎓 Wallet Recharge', path: '/mentee/wallet/recharge' },
    { name: '📞 Booking Confirmation', path: '/booking/confirm' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {showNav && (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Grotalks" className="h-5 w-5" />
              <span className="text-xl font-semibold text-foreground">Grotalks</span>
            </Link>

            <div className="flex items-center gap-2 md:gap-4">
              {isAuthenticated && isAlumniPage && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <UserCircle className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Alumni Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/alumni/profile/edit')}>
                      <User className="mr-2 h-4 w-4" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {isAuthenticated && isMenteePage && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/mentee/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/mentee/sessions')}>
                      <Calendar className="mr-2 h-4 w-4" />
                      My Sessions
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/mentee/become-alumni')}>
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Become Alumni?
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 max-h-96 overflow-y-auto">
                  <DropdownMenuLabel>📱 Select Experience</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      setVersionMode('mvp');
                      navigate('/');
                    }}
                    className={versionMode === 'mvp' ? 'bg-accent font-medium' : ''}
                  >
                    {versionMode === 'mvp' ? '●' : '○'} MVP Mode (Single College)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setVersionMode('universal');
                      navigate('/');
                    }}
                    className={versionMode === 'universal' ? 'bg-accent font-medium' : ''}
                  >
                    {versionMode === 'universal' ? '●' : '○'} Universal Mode (Multi-College)
                  </DropdownMenuItem>
                  
                  {versionMode === 'universal' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>🎓 Select College</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedCollege('Vel Tech')}>
                        Vel Tech Rangarajan
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedCollege('IIT Delhi')}>
                        IIT Delhi
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedCollege('IIT Mumbai')}>
                        IIT Mumbai
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>📋 Screen Navigator</DropdownMenuLabel>
                  {screens.map((screen) => (
                    <DropdownMenuItem
                      key={screen.path}
                      onClick={() => navigate(screen.path)}
                      className="text-sm"
                    >
                      {screen.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      )}
      <main className="w-full">{children}</main>
    </div>
  );
};
