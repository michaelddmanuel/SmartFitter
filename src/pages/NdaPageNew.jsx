import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { documentAPI } from '../services/api';

// Import Shadcn UI Components
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Checkbox } from '../components/ui/checkbox';

const NdaPageNew = () => {
  const { profile, syncProfile } = useProfile();
  const navigate = useNavigate();
  
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  
  // Fetch the active NDA document
  useEffect(() => {
    const fetchNda = async () => {
      try {
        setIsLoading(true);
        const data = await documentAPI.getDocument('nda');
        setDocument(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching NDA:', err);
        setError('Failed to load the NDA document. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNda();
  }, []);
  
  // Check if user has already signed the NDA - TEMPORARILY DISABLED FOR TESTING
  // useEffect(() => {
  //   if (profile?.user_status !== 'prospect') {
  //     // User has already signed the NDA, redirect to next step
  //     if (profile?.user_status === 'nda_signed') {
  //       navigate('/book');
  //     } else {
  //       navigate('/profile');
  //     }
  //   }
  // }, [profile, navigate]);
  
  const handleAgreeToggle = (checked) => {
    setHasAgreed(checked === true);
  };
  
  const handleSignDocument = async () => {
    if (!hasAgreed || !document) return;
    
    try {
      setIsSigning(true);
      
      // Sign the document
      await documentAPI.signDocument(document.id, 'nda');
      
      // Refresh the user profile to get the updated status
      await syncProfile();
      
      // Navigate to the booking page
      navigate('/book');
    } catch (err) {
      console.error('Error signing document:', err);
      setError('Failed to process your signature. Please try again.');
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] pb-16">
      {/* Header */}
      <header className="p-4 border-b border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-[#CCC1BE]">Non-Disclosure Agreement</h1>
          <p className="text-sm text-[#E5E7EB]/70 mt-1">Please review and sign before proceeding</p>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CCC1BE] mx-auto"></div>
              <p className="mt-4 text-[#E5E7EB]/70">Loading document...</p>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="max-w-3xl mx-auto">
            <Alert className="bg-red-900/20 border border-red-800/50 text-red-200 mb-6">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Error</span>
              </div>
              <AlertDescription className="mt-2">{error}</AlertDescription>
            </Alert>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-[#1A1A1A]"
            >
              Try Again
            </Button>
          </div>
        )}
        
        {/* No Document State */}
        {!isLoading && !error && !document && (
          <div className="max-w-3xl mx-auto">
            <Alert className="bg-[#2A2A2A] border border-[#CCC1BE]/20 text-[#E5E7EB] mb-6">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#CCC1BE]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 4a1 1 0 10-2 0v4a1 1 0 102 0V10z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-[#CCC1BE]">Document Unavailable</span>
              </div>
              <AlertDescription className="mt-2 text-[#E5E7EB]/70">
                No NDA document is currently available. Please contact support.
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {/* Document Content */}
        {!isLoading && !error && document && (
          <>
            <Card className="bg-[#232323] border-[#2A2A2A]">
              <CardHeader className="border-b border-[#2A2A2A] bg-[#2A2A2A]/50 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-[#CCC1BE] text-lg">SmartFitter Confidentiality Agreement</CardTitle>
                    <CardDescription className="text-[#E5E7EB]/70">
                      Document ID: {document.id}
                    </CardDescription>
                  </div>
                  <div>
                    <img 
                      src="/SmartFitter Assets logos /SmartFitter Icon no wings.svg" 
                      alt="SmartFitter Logo" 
                      className="h-10 w-10" 
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6 px-6 space-y-6">
                {/* Info Alert */}
                <Alert className="bg-[#2A2A2A]/50 border border-[#CCC1BE]/20 text-[#E5E7EB]">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-[#CCC1BE] mt-0.5 flex-shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <AlertDescription className="text-[#E5E7EB]/80">
                      This agreement must be signed before we can share proprietary fitness technology details with you.
                    </AlertDescription>
                  </div>
                </Alert>
                
                {/* Document Content */}
                <div className="border border-[#2A2A2A] rounded-lg p-4 md:p-6 bg-[#1A1A1A] h-[28rem] overflow-y-auto prose prose-invert max-w-none shadow-inner text-[#E5E7EB]/90">
                  <div dangerouslySetInnerHTML={{ __html: document.content_markdown }} />
                </div>
                
                {/* Agreement Checkbox */}
                <div className="flex items-start space-x-3 p-5 rounded-lg bg-[#2A2A2A]/70 border border-[#CCC1BE]/20">
                  <Checkbox
                    id="agree"
                    checked={hasAgreed}
                    onCheckedChange={handleAgreeToggle}
                    className="mt-1 border-[#CCC1BE]/70 data-[state=checked]:bg-[#CCC1BE] data-[state=checked]:text-[#1A1A1A]"
                  />
                  <label htmlFor="agree" className="block text-[#E5E7EB] cursor-pointer">
                    I have read and agree to the terms of the SmartFitter Non-Disclosure Agreement
                  </label>
                </div>
              </CardContent>
              
              <CardFooter className="px-6 py-5 bg-[#2A2A2A]/30 border-t border-[#2A2A2A]">
                <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-4">
                  <div className="text-[#E5E7EB]/60 text-sm order-2 sm:order-1 text-center sm:text-left">
                    <span className="text-[#CCC1BE]">Legal notice:</span> By signing, you accept the terms of our confidentiality agreement.
                  </div>
                  <Button
                    onClick={handleSignDocument}
                    disabled={!hasAgreed || isSigning}
                    className="order-1 sm:order-2 bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 disabled:bg-[#2A2A2A] disabled:text-[#E5E7EB]/30 text-[#1A1A1A] font-medium w-full sm:w-auto"
                  >
                    {isSigning ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Sign Agreement
                      </>
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card className="bg-[#232323] border-[#2A2A2A]">
              <CardContent className="pt-6 px-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#2A2A2A] rounded-full p-3 hidden sm:flex items-center justify-center flex-shrink-0">
                    <svg className="h-6 w-6 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#CCC1BE] mb-2">What happens next?</h3>
                    <p className="text-[#E5E7EB]/70">
                      After signing this agreement, you'll be able to book a consultation with our team to discuss the SmartFitter program and your fitness goals. Your information will be kept confidential in accordance with this agreement.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <span className="text-[#CCC1BE] text-xs">NDA</span>
            </div>
            
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE/60" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <span className="text-[#CCC1BE]/60 text-xs">Profile</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NdaPageNew;
