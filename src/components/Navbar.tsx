import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
// @ts-ignore - Ignore missing type declaration for ProfileContext
import { useProfile } from '../context/ProfileContext'

// Import Shadcn/UI components
import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();
  const { profile } = useProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Determine navigation links based on user status
  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [
        { text: 'Home', path: '/' },
        { text: 'About', path: '/about' }
      ];
    }

    // Basic links for all authenticated users
    const links = [
      { text: 'Home', path: '/' },
      { text: 'Profile', path: '/profile' }
    ];

    // Add status-specific links
    if (profile?.user_status === 'prospect') {
      links.push({ text: 'Sign NDA', path: '/nda' });
    } else if (profile?.user_status === 'nda_signed') {
      links.push({ text: 'Book Session', path: '/book' });
    } else if (profile?.user_status === 'accepted') {
      links.push({ text: 'Membership Contract', path: '/member-contract' });
    }

    // Add admin link if user is admin
    if (profile?.is_admin) {
      links.push({ text: 'Admin', path: '/admin' });
    }

    return links;
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-background border-b border-border/40 text-foreground shadow-md p-4 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/SmartFitter Assets logos /SmartFitter Logo and tag.svg" 
            alt="SmartFitter Logo" 
            className="h-10" 
          />
        </Link>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost"
          size="icon"
          className="md:hidden" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </Button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.path} 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.text}
            </Link>
          ))}
          
          {!isLoading && (
            isAuthenticated ? (
              <div className="flex items-center gap-4">
                {profile?.user_status && (
                  <Badge variant="outline" className="border-primary/50 text-primary">
                    {profile.user_status.replace('_', ' ').toUpperCase()}
                  </Badge>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full" aria-label="User menu">
                      <Avatar>
                        <AvatarImage src={profile?.picture} alt="Profile picture" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {profile?.full_name?.charAt(0) || '?'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="w-full cursor-pointer">Profile</Link>
                    </DropdownMenuItem>
                    {profile?.is_admin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="w-full cursor-pointer">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                      const logoutUrl = (import.meta as any).env.VITE_AUTH0_LOGOUT_URL || window.location.origin;
                      logout({ logoutParams: { returnTo: logoutUrl } });
                    }} className="cursor-pointer">
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                onClick={() => loginWithRedirect()}
                variant="default"
                className="bg-primary hover:bg-primary/90"
              >
                Log In
              </Button>
            )
          )}
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border shadow-md p-4 flex flex-col space-y-3 md:hidden z-50">
            {profile && isAuthenticated && (
              <div className="flex items-center space-x-4 p-2 mb-2">
                <Avatar>
                  <AvatarImage src={profile?.picture} alt="Profile picture" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {profile?.full_name?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{profile?.full_name}</p>
                  {profile?.user_status && (
                    <Badge variant="outline" className="mt-1 border-primary/50 text-primary">
                      {profile.user_status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.path} 
                className="text-muted-foreground hover:text-primary transition-colors px-2 py-1.5"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
            
            {!isLoading && (
              isAuthenticated ? (
                <Button
                  onClick={() => {
                    const logoutUrl = (import.meta as any).env.VITE_AUTH0_LOGOUT_URL || window.location.origin;
                    logout({ logoutParams: { returnTo: logoutUrl } });
                    setIsMenuOpen(false);
                  }}
                  variant="default"
                  className="w-full bg-primary hover:bg-primary/90 mt-2"
                >
                  Log Out
                </Button>
              ) : (
                <Button
                  onClick={() => loginWithRedirect()}
                  variant="default"
                  className="w-full bg-primary hover:bg-primary/90 mt-2"
                >
                  Log In
                </Button>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
