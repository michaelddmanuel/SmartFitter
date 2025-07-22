import { useAuth0 } from '@auth0/auth0-react';
// @ts-ignore - Ignore missing type declaration for ProfileContext
import { useProfile } from '../context/ProfileContext';
import { Link } from 'react-router-dom';

// Import Shadcn UI Components
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/card.tsx';
import { Button } from '../components/ui/button.tsx';

// Define interface for next step info
interface NextStepInfo {
  text: string;
  description: string;
  link: string | null;
  buttonText: string | null;
  color: string;
}

const ProfilePage = () => {
  const { user, isLoading } = useAuth0();
  const { profile, userStatus } = useProfile();

  // Helper function to determine the next step in the user journey
  const getNextStepInfo = (): NextStepInfo => {
    switch (userStatus) {
      case 'prospect':
        return {
          text: 'Sign NDA',
          description: 'Sign our Non-Disclosure Agreement to proceed with your application.',
          link: '/nda',
          buttonText: 'Sign NDA Now',
          color: 'amber'
        };
      case 'nda_signed':
        return {
          text: 'Book Session',
          description: 'Book a consultation session with our team to discuss your fitness goals.',
          link: '/book',
          buttonText: 'Schedule Now',
          color: 'amber'
        };
      case 'booked_session':
        return {
          text: 'Awaiting Review',
          description: 'Your application is being reviewed by our team. We\'ll notify you once a decision is made.',
          link: null,
          buttonText: null,
          color: 'blue'
        };
      case 'accepted':
        return {
          text: 'Sign Membership Contract',
          description: 'Congratulations! You\'ve been accepted. Please sign the membership contract to continue.',
          link: '/member-contract',
          buttonText: 'Sign Contract',
          color: 'green'
        };
      case 'member_contract_signed':
        return {
          text: 'Payment Pending',
          description: 'Your membership is ready to be activated. Please complete the payment process.',
          link: '/payment',
          buttonText: 'Complete Payment',
          color: 'amber'
        };
      case 'active_member':
        return {
          text: 'Member Dashboard',
          description: 'Access your membership features and benefits.',
          link: '/member-dashboard',
          buttonText: 'Go to Dashboard',
          color: 'green'
        };
      default:
        return {
          text: 'Complete Profile',
          description: 'Please complete your profile to continue.',
          link: '/profile-setup',
          buttonText: 'Update Profile',
          color: 'amber'
        };
    }
  };

  const nextStep = getNextStepInfo();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-primary">Your SmartFitter Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info Card using Shadcn Card component */}
        <div className="lg:col-span-2">
          <Card className="border-secondary/20">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your profile details and membership status</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-shrink-0">
                  {user?.picture ? (
                    <img 
                      src={user.picture} 
                      alt="Profile" 
                      className="h-24 w-24 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-secondary/20 flex items-center justify-center">
                      <span className="text-2xl text-secondary">{profile?.full_name?.charAt(0) || user?.name?.charAt(0) || '?'}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">{profile?.full_name || user?.name}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                  {profile?.phone_number && (
                    <p className="text-muted-foreground">{profile.phone_number}</p>
                  )}
                  
                  {/* Status Badge */}
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      userStatus === 'active_member' ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300' :
                      userStatus === 'accepted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300'
                    }`}>
                      {userStatus?.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Next Step Card */}
              <Card className="border-secondary/10 bg-secondary/5 mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Next Step: {nextStep.text}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{nextStep.description}</p>
                </CardContent>
                {nextStep.link && nextStep.buttonText && (
                  <CardFooter>
                    <Button asChild>
                      <Link to={nextStep.link}>{nextStep.buttonText}</Link>
                    </Button>
                  </CardFooter>
                )}
              </Card>
              
              {/* Additional Profile Info */}
              {profile && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.location && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p>{profile.location}</p>
                      </div>
                    )}
                    {profile.fitness_goals && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Fitness Goals</p>
                        <p>{profile.fitness_goals}</p>
                      </div>
                    )}
                    {profile.preferred_training_times && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Preferred Training Times</p>
                        <p>{profile.preferred_training_times}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Progress Timeline Card */}
        <div className="lg:col-span-1">
          <Card className="border-secondary/20">
            <CardHeader>
              <CardTitle>Application Progress</CardTitle>
              <CardDescription>Your membership journey</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="relative border-l border-gray-200 dark:border-gray-700">
                <li className="mb-6 ml-6">
                  <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                    userStatus ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                  <h3 className="font-medium">Profile Created</h3>
                  <p className="text-sm text-muted-foreground">Complete profile information</p>
                </li>
                <li className="mb-6 ml-6">
                  <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                    userStatus === 'prospect' || userStatus === 'nda_signed' || userStatus === 'booked_session' || userStatus === 'accepted' || userStatus === 'member_contract_signed' || userStatus === 'active_member' ? 
                    'bg-green-500' : 'bg-gray-200'
                  }`}>
                    {userStatus === 'prospect' || userStatus === 'nda_signed' || userStatus === 'booked_session' || userStatus === 'accepted' || userStatus === 'member_contract_signed' || userStatus === 'active_member' ? (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    ) : (
                      <span className="text-gray-500 text-xs">2</span>
                    )}
                  </span>
                  <h3 className="font-medium">NDA</h3>
                  <p className="text-sm text-muted-foreground">Sign Non-Disclosure Agreement</p>
                </li>
                <li className="mb-6 ml-6">
                  <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                    userStatus === 'nda_signed' || userStatus === 'booked_session' || userStatus === 'accepted' || userStatus === 'member_contract_signed' || userStatus === 'active_member' ? 
                    'bg-green-500' : userStatus === 'prospect' ? 'bg-amber-500' : 'bg-gray-200'
                  }`}>
                    {userStatus === 'nda_signed' || userStatus === 'booked_session' || userStatus === 'accepted' || userStatus === 'member_contract_signed' || userStatus === 'active_member' ? (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    ) : userStatus === 'prospect' ? (
                      <span className="text-white text-xs">3</span>
                    ) : (
                      <span className="text-gray-500 text-xs">3</span>
                    )}
                  </span>
                  <h3 className="font-medium">Consultation</h3>
                  <p className="text-sm text-muted-foreground">Book and attend your session</p>
                </li>
                <li className="mb-6 ml-6">
                  <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                    userStatus === 'accepted' || userStatus === 'member_contract_signed' || userStatus === 'active_member' ? 
                    'bg-green-500' : userStatus === 'booked_session' ? 'bg-amber-500' : 'bg-gray-200'
                  }`}>
                    {userStatus === 'accepted' || userStatus === 'member_contract_signed' || userStatus === 'active_member' ? (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    ) : userStatus === 'booked_session' ? (
                      <span className="text-white text-xs">4</span>
                    ) : (
                      <span className="text-gray-500 text-xs">4</span>
                    )}
                  </span>
                  <h3 className="font-medium">Acceptance</h3>
                  <p className="text-sm text-muted-foreground">Application review by our team</p>
                </li>
                <li className="mb-6 ml-6">
                  <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                    userStatus === 'member_contract_signed' || userStatus === 'active_member' ? 
                    'bg-green-500' : userStatus === 'accepted' ? 'bg-amber-500' : 'bg-gray-200'
                  }`}>
                    {userStatus === 'member_contract_signed' || userStatus === 'active_member' ? (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    ) : userStatus === 'accepted' ? (
                      <span className="text-white text-xs">5</span>
                    ) : (
                      <span className="text-gray-500 text-xs">5</span>
                    )}
                  </span>
                  <h3 className="font-medium">Contract</h3>
                  <p className="text-sm text-muted-foreground">Sign Membership Contract</p>
                </li>
                <li className="ml-6">
                  <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                    userStatus === 'active_member' ? 
                    'bg-green-500' : userStatus === 'member_contract_signed' ? 'bg-amber-500' : 'bg-gray-200'
                  }`}>
                    {userStatus === 'active_member' ? (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    ) : userStatus === 'member_contract_signed' ? (
                      <span className="text-white text-xs">6</span>
                    ) : (
                      <span className="text-gray-500 text-xs">6</span>
                    )}
                  </span>
                  <h3 className="font-medium">Active Member</h3>
                  <p className="text-sm text-muted-foreground">Full access to member benefits</p>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
