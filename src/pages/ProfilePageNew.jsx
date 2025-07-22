import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useProfile } from '../context/ProfileContext';

// Import Shadcn UI Components
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';

const ProfilePageNew = () => {
  const { user, logout } = useAuth0();
  const { profile, userStatus } = useProfile();

  // Helper function to determine the next step in the user journey
  const getNextStepInfo = () => {
    switch (userStatus) {
      case 'prospect':
        return {
          text: 'Sign NDA',
          description: 'Sign our Non-Disclosure Agreement to proceed with your application.',
          link: '/nda',
          buttonText: 'Sign NDA Now',
          color: '[#CCC1BE]'
        };
      case 'nda_signed':
        return {
          text: 'Book Session',
          description: 'Book a consultation session with our team to discuss your fitness goals.',
          link: '/book',
          buttonText: 'Schedule Now',
          color: '[#CCC1BE]'
        };
      case 'booked_session':
        return {
          text: 'Awaiting Review',
          description: 'Your application is being reviewed by our team. We\'ll notify you once a decision is made.',
          link: null,
          buttonText: null,
          color: '[#CCC1BE]/60'
        };
      case 'accepted':
        return {
          text: 'Sign Membership Contract',
          description: 'Congratulations! You\'ve been accepted. Please sign the membership contract to continue.',
          link: '/member-contract',
          buttonText: 'Sign Contract',
          color: '[#CCC1BE]'
        };
      case 'member_contract_signed':
        return {
          text: 'Payment Pending',
          description: 'Your membership is ready to be activated. Please complete the payment process.',
          link: '/payment',
          buttonText: 'Complete Payment',
          color: '[#CCC1BE]'
        };
      case 'active_member':
        return {
          text: 'Member Dashboard',
          description: 'Access your membership features and benefits.',
          link: '/member-dashboard',
          buttonText: 'Go to Dashboard',
          color: '[#CCC1BE]'
        };
      default:
        return {
          text: 'Complete Profile',
          description: 'Please complete your profile to continue.',
          link: '/profile-setup',
          buttonText: 'Update Profile',
          color: '[#CCC1BE]'
        };
    }
  };

  const nextStep = getNextStepInfo();
  
  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] pb-16">
      {/* Header */}
      <header className="p-4 border-b border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold text-[#CCC1BE]">Your Profile</h1>
          <p className="text-sm text-[#E5E7EB]/70 mt-1">Manage your SmartFitter account</p>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Digital Business Card */}
          <Card className="lg:col-span-2 bg-[#232323] border-[#2A2A2A] overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] relative">
              <div className="absolute -bottom-10 left-6">
                <Avatar className="h-20 w-20 ring-4 ring-[#232323]">
                  {user?.picture ? (
                    <AvatarImage src={user.picture} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-[#2A2A2A] text-[#CCC1BE] text-xl">
                      {profile?.full_name?.charAt(0) || user?.name?.charAt(0) || '?'}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            </div>
            
            <CardContent className="pt-12 px-6">
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-semibold text-[#CCC1BE]">{profile?.full_name || user?.name}</h2>
                  <p className="text-[#E5E7EB]/70">{user?.email}</p>
                  {profile?.phone_number && (
                    <p className="text-[#E5E7EB]/70 mt-1">{profile.phone_number}</p>
                  )}
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge className="bg-[#2A2A2A] text-[#E5E7EB] hover:bg-[#2A2A2A]">
                      {userStatus?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                    
                    {profile?.profession && (
                      <Badge variant="outline" className="border-[#CCC1BE]/30 text-[#CCC1BE]/80">
                        {profile.profession}
                      </Badge>
                    )}
                    
                    {profile?.join_date && (
                      <Badge variant="outline" className="border-[#CCC1BE]/30 text-[#CCC1BE]/80">
                        Joined {formatDate(profile.join_date)}
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#2A2A2A]">
                  <div>
                    <h3 className="text-sm font-medium text-[#CCC1BE] mb-2">Location</h3>
                    <p className="text-[#E5E7EB]/70">
                      {profile?.location || profile?.city || 'Not specified'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-[#CCC1BE] mb-2">Fitness Goals</h3>
                    <p className="text-[#E5E7EB]/70">
                      {profile?.fitness_goals || 'Not specified'}
                    </p>
                  </div>
                  
                  {profile?.selected_path && (
                    <div>
                      <h3 className="text-sm font-medium text-[#CCC1BE] mb-2">Selected Path</h3>
                      <Badge className="bg-[#CCC1BE]/20 text-[#CCC1BE] hover:bg-[#CCC1BE]/30 px-3">
                        {profile.selected_path}
                      </Badge>
                    </div>
                  )}
                  
                  {profile?.consultation_date && (
                    <div>
                      <h3 className="text-sm font-medium text-[#CCC1BE] mb-2">Consultation Date</h3>
                      <p className="text-[#E5E7EB]/70">
                        {formatDate(profile.consultation_date)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="px-6 py-4 border-t border-[#2A2A2A] flex flex-wrap gap-4">
              <Button 
                variant="outline" 
                className="border-[#CCC1BE]/20 text-[#CCC1BE] hover:bg-[#2A2A2A] hover:text-[#CCC1BE]"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Sign Out
              </Button>
              
              <Link to="/profile-setup">
                <Button 
                  variant="outline"
                  className="border-[#CCC1BE]/20 text-[#CCC1BE] hover:bg-[#2A2A2A] hover:text-[#CCC1BE]"
                >
                  Edit Profile
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* Next Step Card */}
          <Card className="bg-[#232323] border-[#2A2A2A]">
            <CardHeader className="border-b border-[#2A2A2A] bg-[#2A2A2A]/50 pb-4">
              <h2 className="text-lg font-medium text-[#CCC1BE]">Next Step</h2>
            </CardHeader>
            
            <CardContent className="pt-6 px-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#2A2A2A] rounded-full p-3 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#CCC1BE]">{nextStep.text}</h3>
              </div>
              
              <p className="text-[#E5E7EB]/70 mb-6">
                {nextStep.description}
              </p>
              
              {nextStep.buttonText && nextStep.link && (
                <Link to={nextStep.link}>
                  <Button className="w-full bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-[#1A1A1A] font-medium">
                    {nextStep.buttonText}
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Progress Timeline */}
        <Card className="bg-[#232323] border-[#2A2A2A]">
          <CardHeader className="border-b border-[#2A2A2A] bg-[#2A2A2A]/50 pb-4">
            <h2 className="text-lg font-medium text-[#CCC1BE]">Application Progress</h2>
          </CardHeader>
          
          <CardContent className="py-6 px-6">
            <ol className="relative border-l border-[#2A2A2A] ml-3">
              <li className="mb-6 ml-6">
                <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                  userStatus ? 'bg-[#CCC1BE]' : 'bg-[#2A2A2A]'
                }`}>
                  {userStatus ? (
                    <svg className="w-3 h-3 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  ) : (
                    <span className="text-[#E5E7EB]/50 text-xs">1</span>
                  )}
                </span>
                <h3 className="font-medium text-[#CCC1BE]">Profile Setup</h3>
                <p className="text-sm text-[#E5E7EB]/70">Create your SmartFitter profile</p>
              </li>
              
              <li className="mb-6 ml-6">
                <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                  userStatus === 'nda_signed' || userStatus === 'booked_session' || userStatus === 'accepted' || userStatus === 'member_contract_signed' || userStatus === 'active_member' 
                    ? 'bg-[#CCC1BE]' 
                    : userStatus === 'prospect' 
                      ? 'bg-[#CCC1BE]/60' 
                      : 'bg-[#2A2A2A]'
                }`}>
                  {userStatus === 'nda_signed' || userStatus === 'booked_session' || userStatus === 'accepted' || userStatus === 'member_contract_signed' || userStatus === 'active_member' ? (
                    <svg className="w-3 h-3 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  ) : userStatus === 'prospect' ? (
                    <span className="text-[#1A1A1A] text-xs">2</span>
                  ) : (
                    <span className="text-[#E5E7EB]/50 text-xs">2</span>
                  )}
                </span>
                <h3 className="font-medium text-[#CCC1BE]">NDA Signing</h3>
                <p className="text-sm text-[#E5E7EB]/70">Sign confidentiality agreement</p>
              </li>
              
              <li className="mb-6 ml-6">
                <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                  userStatus === 'booked_session' || userStatus === 'accepted' || userStatus === 'member_contract_signed' || userStatus === 'active_member' 
                    ? 'bg-[#CCC1BE]' 
                    : userStatus === 'nda_signed' 
                      ? 'bg-[#CCC1BE]/60' 
                      : 'bg-[#2A2A2A]'
                }`}>
                  {userStatus === 'booked_session' || userStatus === 'accepted' || userStatus === 'member_contract_signed' || userStatus === 'active_member' ? (
                    <svg className="w-3 h-3 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  ) : userStatus === 'nda_signed' ? (
                    <span className="text-[#1A1A1A] text-xs">3</span>
                  ) : (
                    <span className="text-[#E5E7EB]/50 text-xs">3</span>
                  )}
                </span>
                <h3 className="font-medium text-[#CCC1BE]">Consultation</h3>
                <p className="text-sm text-[#E5E7EB]/70">Book and attend your session</p>
              </li>
              
              <li className="mb-6 ml-6">
                <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                  userStatus === 'accepted' || userStatus === 'member_contract_signed' || userStatus === 'active_member' 
                    ? 'bg-[#CCC1BE]' 
                    : userStatus === 'booked_session' 
                      ? 'bg-[#CCC1BE]/60' 
                      : 'bg-[#2A2A2A]'
                }`}>
                  {userStatus === 'accepted' || userStatus === 'member_contract_signed' || userStatus === 'active_member' ? (
                    <svg className="w-3 h-3 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  ) : userStatus === 'booked_session' ? (
                    <span className="text-[#1A1A1A] text-xs">4</span>
                  ) : (
                    <span className="text-[#E5E7EB]/50 text-xs">4</span>
                  )}
                </span>
                <h3 className="font-medium text-[#CCC1BE]">Acceptance</h3>
                <p className="text-sm text-[#E5E7EB]/70">Application review by our team</p>
              </li>
              
              <li className="mb-6 ml-6">
                <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                  userStatus === 'member_contract_signed' || userStatus === 'active_member' 
                    ? 'bg-[#CCC1BE]' 
                    : userStatus === 'accepted' 
                      ? 'bg-[#CCC1BE]/60' 
                      : 'bg-[#2A2A2A]'
                }`}>
                  {userStatus === 'member_contract_signed' || userStatus === 'active_member' ? (
                    <svg className="w-3 h-3 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  ) : userStatus === 'accepted' ? (
                    <span className="text-[#1A1A1A] text-xs">5</span>
                  ) : (
                    <span className="text-[#E5E7EB]/50 text-xs">5</span>
                  )}
                </span>
                <h3 className="font-medium text-[#CCC1BE]">Contract</h3>
                <p className="text-sm text-[#E5E7EB]/70">Sign Membership Contract</p>
              </li>
              
              <li className="ml-6">
                <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                  userStatus === 'active_member' 
                    ? 'bg-[#CCC1BE]' 
                    : userStatus === 'member_contract_signed' 
                      ? 'bg-[#CCC1BE]/60' 
                      : 'bg-[#2A2A2A]'
                }`}>
                  {userStatus === 'active_member' ? (
                    <svg className="w-3 h-3 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  ) : userStatus === 'member_contract_signed' ? (
                    <span className="text-[#1A1A1A] text-xs">6</span>
                  ) : (
                    <span className="text-[#E5E7EB]/50 text-xs">6</span>
                  )}
                </span>
                <h3 className="font-medium text-[#CCC1BE]">Active Member</h3>
                <p className="text-sm text-[#E5E7EB]/70">Full access to member benefits</p>
              </li>
            </ol>
          </CardContent>
        </Card>
        
        {/* Footer Navigation */}
        <footer className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#2A2A2A] py-2 px-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE/60" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span className="text-[#CCC1BE]/60 text-xs">Home</span>
            </div>
            
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE/60" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <span className="text-[#CCC1BE]/60 text-xs">Booking</span>
            </div>
            
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <span className="text-[#CCC1BE] text-xs">Profile</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProfilePageNew;
