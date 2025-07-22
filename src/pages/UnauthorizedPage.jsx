import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

// Import Shadcn UI Components
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';

const UnauthorizedPage = () => {
  const { userStatus } = useProfile();
  
  // Determine where to direct the user based on their status
  const getNextStep = () => {
    switch (userStatus) {
      case 'prospect':
        return { path: '/nda', text: 'Sign NDA' };
      case 'nda_signed':
        return { path: '/book', text: 'Book a Session' };
      case 'booked_session':
        return { path: '/profile', text: 'View Profile' };
      case 'accepted':
        return { path: '/member-contract', text: 'Sign Member Contract' };
      case 'member_contract_signed':
      case 'active_member':
        return { path: '/dashboard', text: 'Go to Dashboard' };
      default:
        return { path: '/profile', text: 'Go to Profile' };
    }
  };
  
  const nextStep = getNextStep();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <Card className="border-primary/20 max-w-2xl w-full">
        <CardHeader>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg 
                className="w-10 h-10 text-primary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            <CardTitle className="text-2xl text-center">Access Denied</CardTitle>
            <CardDescription className="text-lg text-center mt-2 max-w-md mx-auto">
              You don't have permission to access this page at your current status level.
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Alert variant="default" className="bg-primary/5 border-primary/20 text-foreground">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <AlertTitle className="font-medium">Status Information</AlertTitle>
            </div>
            <AlertDescription>
              <div className="mt-3">
                <p className="mb-2">Your current status: <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{userStatus.replace(/_/g, ' ').toUpperCase()}</span></p>
                <p className="text-muted-foreground">Please complete the previous steps in your journey before accessing this page.</p>
              </div>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Next Steps</h3>
            <p className="text-muted-foreground">We recommend continuing with your SmartFitter journey by completing the following steps:</p>
            
            <div className="p-4 rounded-md bg-card/50 border border-border mt-2">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">{nextStep.text}</p>
                  <p className="text-sm text-muted-foreground">This is the next recommended action based on your current status.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Button asChild variant="default" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Link to={nextStep.path}>
              {nextStep.text}
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary w-full sm:w-auto">
            <Link to="/profile">
              View Profile
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
