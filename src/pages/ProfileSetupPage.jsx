import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useProfile } from '../context/ProfileContext';

// Import Shadcn UI Components
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Alert, AlertDescription } from '../components/ui/alert';

const ProfileSetupPage = () => {
  const { user } = useAuth0();
  const { profile, updateProfile, isLoading } = useProfile();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    digital_card_tagline: '',
  });
  
  // Pre-populate form with any existing data
  useEffect(() => {
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        full_name: user.name || '',
      }));
    }
    
    if (profile) {
      setFormData({
        full_name: profile.full_name || user?.name || '',
        phone_number: profile.phone_number || '',
        digital_card_tagline: profile.digital_card_tagline || '',
      });
    }
  }, [user, profile]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateProfile(formData);
      
      // Redirect based on user status
      if (profile?.user_status === 'prospect') {
        navigate('/nda');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Complete Your Profile</h1>
          <p className="text-muted-foreground mt-1">Let's set up your SmartFitter account</p>
        </div>
        <img 
          src="/SmartFitter Assets logos /SmartFitter Icon no wings.svg" 
          alt="SmartFitter Logo" 
          className="h-10 md:h-12" 
        />
      </div>
      
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="text-xl">Profile Information</CardTitle>
          <CardDescription>Enter your details to complete setup</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Alert className="bg-primary/5 border-primary/20 text-foreground mb-6">
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <AlertDescription>
                Complete your profile details below to continue with the SmartFitter onboarding process. This information helps us personalize your experience.
              </AlertDescription>
            </div>
          </Alert>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <label 
                    htmlFor="full_name" 
                    className="text-sm font-medium"
                  >
                    Full Name
                  </label>
                </div>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full border-border/60"
                />
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <label 
                    htmlFor="phone_number" 
                    className="text-sm font-medium"
                  >
                    Phone Number
                  </label>
                </div>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="e.g., (555) 123-4567"
                  className="w-full border-border/60"
                />
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <label 
                    htmlFor="digital_card_tagline" 
                    className="text-sm font-medium"
                  >
                    Digital Card Tagline
                  </label>
                </div>
                <Input
                  id="digital_card_tagline"
                  name="digital_card_tagline"
                  type="text"
                  value={formData.digital_card_tagline}
                  onChange={handleChange}
                  placeholder="e.g., Fitness Expert | Nutrition Coach"
                  className="w-full border-border/60"
                />
                <div className="mt-2 flex items-start p-3 bg-muted/50 rounded-md">
                  <svg className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="ml-3 text-sm text-muted-foreground">
                    This will appear on your digital member card when you become an active SmartFitter member. It helps when referring friends to the program.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto ml-auto flex items-center bg-primary hover:bg-primary/90 disabled:bg-muted"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card className="border-border/40">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            After completing your profile, you'll continue to the next steps in the SmartFitter onboarding process.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetupPage;
