import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useProfile } from '../context/ProfileContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const ProfilePage = () => {
  const { user, logout } = useAuth0();
  const { profile, userStatus } = useProfile();
  const [copySuccess, setCopySuccess] = useState(false);

  // Helper function to determine the next step in the user journey
  const getNextStepInfo = () => {
    switch (userStatus) {
      case 'prospect':
        return {
          text: 'Sign NDA',
          description: 'Sign our Non-Disclosure Agreement to proceed with your application.',
          link: '/nda',
          buttonText: 'Sign NDA Now'
        };
      case 'nda_signed':
        return {
          text: 'Book Session',
          description: 'Book a consultation session with our team to discuss your fitness goals.',
          link: '/book',
          buttonText: 'Schedule Now'
        };
      case 'booked_session':
        return {
          text: 'Awaiting Review',
          description: 'Your application is being reviewed by our team. We\'ll notify you once a decision is made.',
          link: null,
          buttonText: null
        };
      case 'accepted':
        return {
          text: 'Sign Membership Contract',
          description: 'Congratulations! You\'ve been accepted. Please sign the membership contract to continue.',
          link: '/member-contract',
          buttonText: 'Sign Contract'
        };
      case 'member_contract_signed':
        return {
          text: 'Payment Pending',
          description: 'Your membership is ready to be activated. Please complete the payment process.',
          link: '/payment',
          buttonText: 'Complete Payment'
        };
      case 'active_member':
        return {
          text: 'Member Dashboard',
          description: 'Access your membership features and benefits.',
          link: '/member-dashboard',
          buttonText: 'Go to Dashboard'
        };
      default:
        return {
          text: 'Complete Profile',
          description: 'Please complete your profile to continue.',
          link: '/profile-setup',
          buttonText: 'Update Profile'
        };
    }
  };

  const nextStep = getNextStepInfo();
  
  // Helper function to copy text to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Helper function to get step status
  const getStepStatus = (stepName) => {
    const statusOrder = ['prospect', 'nda_signed', 'booked_session', 'accepted', 'member_contract_signed', 'active_member'];
    const currentIndex = statusOrder.indexOf(userStatus);
    
    switch (stepName) {
      case 'signup':
        return userStatus ? 'completed' : 'current';
      case 'nda':
        return currentIndex >= 1 ? 'completed' : currentIndex === 0 ? 'current' : 'pending';
      case 'booking':
        return currentIndex >= 2 ? 'completed' : currentIndex === 1 ? 'current' : 'pending';
      case 'review':
        return currentIndex >= 3 ? 'completed' : currentIndex === 2 ? 'current' : 'pending';
      case 'contract':
        return currentIndex >= 4 ? 'completed' : currentIndex === 3 ? 'current' : 'pending';
      case 'payment':
        return currentIndex >= 5 ? 'completed' : currentIndex === 4 ? 'current' : 'pending';
      default:
        return 'pending';
    }
  };

  const CheckIcon = () => (
    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col text-[#E5E7EB]">
      {/* Header */}
      <header className="border-b border-[#2A2A2A] p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-semibold text-[#CCC1BE]">Your SmartFitter Profile</h1>
          <p className="text-[#E5E7EB]/70 mt-1">Manage your account and track your progress</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Profile Info Card */}
            <div className="lg:col-span-2">
              <Card className="bg-[#232323] border-[#2A2A2A] overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      {user?.picture ? (
                        <img 
                          src={user.picture} 
                          alt="Profile" 
                          className="h-20 w-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-20 w-20 rounded-full bg-[#CCC1BE]/20 flex items-center justify-center">
                          <span className="text-2xl text-[#CCC1BE]">
                            {profile?.full_name?.charAt(0) || user?.name?.charAt(0) || '?'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#E5E7EB]">
                        {profile?.full_name || user?.name}
                      </h2>
                      <p className="text-[#E5E7EB]/70">{user?.email}</p>
                      {profile?.phone_number && (
                        <p className="text-[#E5E7EB]/70">{profile.phone_number}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-medium text-[#CCC1BE]">Status</h3>
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#CCC1BE]/20 text-[#CCC1BE]">
                        {userStatus?.replace('_', ' ').toUpperCase() || 'NEW MEMBER'}
                      </div>
                    </div>
                    <p className="text-[#E5E7EB]/70 text-sm mb-3">{nextStep.description}</p>
                    {nextStep.link && nextStep.buttonText && (
                      <Link to={nextStep.link}>
                        <Button className="bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-[#1A1A1A] font-medium">
                          {nextStep.buttonText}
                        </Button>
                      </Link>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4 text-[#CCC1BE]">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#E5E7EB]/70">Member Since</label>
                        <div className="mt-1 text-[#E5E7EB]">
                          {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Not available'}
                        </div>
                      </div>
                      {profile?.referred_by_user_id && (
                        <div>
                          <label className="block text-sm font-medium text-[#E5E7EB]/70">Referred By</label>
                          <div className="mt-1 text-[#E5E7EB]">Another Member</div>
                        </div>
                      )}
                      {profile?.unique_share_slug && (
                        <div className="md:col-span-2 mt-2">
                          <label className="block text-sm font-medium text-[#E5E7EB]/70 mb-1">Your Referral Link</label>
                          <div className="flex items-center">
                            <code className="bg-[#2A2A2A] px-3 py-1 rounded text-sm mr-2 flex-1 overflow-x-auto text-[#E5E7EB]/90">
                              {`${window.location.origin}/?ref=${profile.unique_share_slug}`}
                            </code>
                            <Button 
                              onClick={() => copyToClipboard(`${window.location.origin}/?ref=${profile.unique_share_slug}`)}
                              className="bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-[#1A1A1A] font-medium"
                            >
                              {copySuccess ? 'Copied!' : 'Copy'}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#2A2A2A]">
                    <Link to="/edit-profile">
                      <Button className="bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-[#1A1A1A] font-medium">
                        Edit Profile
                      </Button>
                    </Link>
                    <button
                      onClick={() => {
                        const logoutUrl = import.meta.env.VITE_AUTH0_LOGOUT_URL || window.location.origin;
                        logout({ returnTo: logoutUrl });
                      }}
                      className="inline-flex items-center justify-center px-4 py-2 border border-[#2A2A2A] rounded-md shadow-sm text-sm font-medium text-[#E5E7EB]/70 bg-transparent hover:bg-[#2A2A2A] transition-colors focus:outline-none"
                    >
                      Sign Out
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* User Journey Card */}
            <div className="lg:col-span-1">
              <Card className="bg-[#232323] border-[#2A2A2A] overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4 text-[#CCC1BE]">Your Journey</h3>
                  
                  <div className="mb-6 p-4 border border-[#2A2A2A] rounded-lg bg-[#1A1A1A]/50">
                    <h4 className="font-medium text-[#CCC1BE] mb-1">Next Step</h4>
                    <p className="text-[#E5E7EB]/70 text-sm mb-3">{nextStep.description}</p>
                    {nextStep.link && nextStep.buttonText && (
                      <Link to={nextStep.link}>
                        <Button className="w-full bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-[#1A1A1A] font-medium py-2">
                          {nextStep.buttonText}
                        </Button>
                      </Link>
                    )}
                  </div>
                  
                  <h4 className="text-md font-medium mb-3 text-[#CCC1BE]">Progress Tracker</h4>
                  <ol className="relative border-l border-[#2A2A2A]">
                    
                    {/* Sign Up Step */}
                    <li className="mb-6 ml-6">
                      <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                        getStepStatus('signup') === 'completed' ? 'bg-[#CCC1BE]' : 'bg-[#2A2A2A]'
                      }`}>
                        {getStepStatus('signup') === 'completed' ? (
                          <CheckIcon />
                        ) : (
                          <span className="text-[#E5E7EB]/50 text-xs">1</span>
                        )}
                      </span>
                      <h3 className="font-medium text-[#E5E7EB]">Sign Up</h3>
                      <p className="text-sm text-[#E5E7EB]/50">Create your SmartFitter account</p>
                    </li>
                    
                    {/* NDA Step */}
                    <li className="mb-6 ml-6">
                      <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                        getStepStatus('nda') === 'completed' ? 'bg-[#CCC1BE]' : 
                        getStepStatus('nda') === 'current' ? 'bg-[#CCC1BE]/60' : 'bg-[#2A2A2A]'
                      }`}>
                        {getStepStatus('nda') === 'completed' ? (
                          <CheckIcon />
                        ) : (
                          <span className={`text-xs ${
                            getStepStatus('nda') === 'current' ? 'text-[#1A1A1A]' : 'text-[#E5E7EB]/50'
                          }`}>2</span>
                        )}
                      </span>
                      <h3 className="font-medium text-[#E5E7EB]">NDA</h3>
                      <p className="text-sm text-[#E5E7EB]/50">Sign our Non-Disclosure Agreement</p>
                    </li>
                    
                    {/* Booking Step */}
                    <li className="mb-6 ml-6">
                      <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                        getStepStatus('booking') === 'completed' ? 'bg-[#CCC1BE]' : 
                        getStepStatus('booking') === 'current' ? 'bg-[#CCC1BE]/60' : 'bg-[#2A2A2A]'
                      }`}>
                        {getStepStatus('booking') === 'completed' ? (
                          <CheckIcon />
                        ) : (
                          <span className={`text-xs ${
                            getStepStatus('booking') === 'current' ? 'text-[#1A1A1A]' : 'text-[#E5E7EB]/50'
                          }`}>3</span>
                        )}
                      </span>
                      <h3 className="font-medium text-[#E5E7EB]">Book Session</h3>
                      <p className="text-sm text-[#E5E7EB]/50">Schedule consultation with our team</p>
                    </li>
                    
                    {/* Review Step */}
                    <li className="mb-6 ml-6">
                      <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                        getStepStatus('review') === 'completed' ? 'bg-[#CCC1BE]' : 
                        getStepStatus('review') === 'current' ? 'bg-[#CCC1BE]/60' : 'bg-[#2A2A2A]'
                      }`}>
                        {getStepStatus('review') === 'completed' ? (
                          <CheckIcon />
                        ) : (
                          <span className={`text-xs ${
                            getStepStatus('review') === 'current' ? 'text-[#1A1A1A]' : 'text-[#E5E7EB]/50'
                          }`}>4</span>
                        )}
                      </span>
                      <h3 className="font-medium text-[#E5E7EB]">Review</h3>
                      <p className="text-sm text-[#E5E7EB]/50">Application review by our team</p>
                    </li>
                    
                    {/* Contract Step */}
                    <li className="mb-6 ml-6">
                      <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                        getStepStatus('contract') === 'completed' ? 'bg-[#CCC1BE]' : 
                        getStepStatus('contract') === 'current' ? 'bg-[#CCC1BE]/60' : 'bg-[#2A2A2A]'
                      }`}>
                        {getStepStatus('contract') === 'completed' ? (
                          <CheckIcon />
                        ) : (
                          <span className={`text-xs ${
                            getStepStatus('contract') === 'current' ? 'text-[#1A1A1A]' : 'text-[#E5E7EB]/50'
                          }`}>5</span>
                        )}
                      </span>
                      <h3 className="font-medium text-[#E5E7EB]">Contract</h3>
                      <p className="text-sm text-[#E5E7EB]/50">Sign membership contract</p>
                    </li>
                    
                    {/* Payment Step */}
                    <li className="mb-6 ml-6">
                      <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                        getStepStatus('payment') === 'completed' ? 'bg-[#CCC1BE]' : 
                        getStepStatus('payment') === 'current' ? 'bg-[#CCC1BE]/60' : 'bg-[#2A2A2A]'
                      }`}>
                        {getStepStatus('payment') === 'completed' ? (
                          <CheckIcon />
                        ) : (
                          <span className={`text-xs ${
                            getStepStatus('payment') === 'current' ? 'text-[#1A1A1A]' : 'text-[#E5E7EB]/50'
                          }`}>6</span>
                        )}
                      </span>
                      <h3 className="font-medium text-[#E5E7EB]">Active Member</h3>
                      <p className="text-sm text-[#E5E7EB]/50">Complete payment and access benefits</p>
                    </li>
                    
                  </ol>
                </CardContent>
              </Card>
            </div>
            
          </div>

          {/* Footer links */}
          <div className="mt-8 pt-6 border-t border-[#2A2A2A] flex flex-wrap justify-center gap-6 text-sm text-[#E5E7EB]/60">
            <Link to="/contacts" className="hover:text-[#CCC1BE] transition-colors">Contacts</Link>
            <Link to="/terms" className="hover:text-[#CCC1BE] transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-[#CCC1BE] transition-colors">Privacy</Link>
            <a href="https://smartfitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#CCC1BE] transition-colors">SmartFitter.com</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
