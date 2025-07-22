import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { documentAPI } from '../services/api';

// Import Shadcn UI Components
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import { Checkbox } from '../components/ui/checkbox';

const NdaPage = () => {
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
  
  // Check if user has already signed the NDA
  useEffect(() => {
    if (profile?.user_status !== 'prospect') {
      // User has already signed the NDA, redirect to next step
      if (profile?.user_status === 'nda_signed') {
        navigate('/book');
      } else {
        navigate('/profile');
      }
    }
  }, [profile, navigate]);
  
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
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading document...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary/90"
        >
          Try Again
        </Button>
      </div>
    );
  }
  
  if (!document) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Alert className="bg-primary/5 border-primary/20 text-foreground mb-6">
          <AlertTitle>Document Unavailable</AlertTitle>
          <AlertDescription>
            No NDA document is currently available. Please contact support.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Non-Disclosure Agreement</h1>
          <p className="text-muted-foreground mt-1">Please review and sign before proceeding</p>
        </div>
        <img 
          src="/SmartFitter Assets logos /SmartFitter Icon no wings.svg" 
          alt="SmartFitter Logo" 
          className="h-10 md:h-12" 
        />
      </div>
      
      <Card className="border-border/40 overflow-hidden">
        <CardHeader className="bg-card/50 border-b border-border/30">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-primary-foreground">{document.title}</CardTitle>
              <CardDescription>Confidentiality Agreement</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm rounded-full bg-primary/10 text-primary px-3 py-1.5">
              <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Confidential document</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 px-6 space-y-6">
          <Alert className="bg-primary/5 border-primary/20 text-foreground">
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <AlertDescription>
                This agreement must be signed before we can share proprietary fitness technology details with you.
              </AlertDescription>
            </div>
          </Alert>
          
          <div className="border rounded-lg p-4 md:p-6 bg-card/50 h-[28rem] overflow-y-auto prose dark:prose-invert max-w-none shadow-inner border-border/50">
            {/* Render the markdown content */}
            <div dangerouslySetInnerHTML={{ __html: document.content_markdown }} />
          </div>
          
          <div className="flex items-start space-x-3 p-5 rounded-lg bg-primary/5 border border-primary/20">
            <Checkbox
              id="agree"
              checked={hasAgreed}
              onCheckedChange={handleAgreeToggle}
              className="mt-1"
            />
            <label htmlFor="agree" className="block font-medium cursor-pointer">
              I have read and agree to the terms of the SmartFitter Non-Disclosure Agreement
            </label>
          </div>
        </CardContent>
        
        <CardFooter className="px-6 py-4 bg-card/50 border-t border-border/30">
          <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm order-2 sm:order-1 text-center sm:text-left">
              <span className="font-medium">Legal notice:</span> By signing, you accept the terms of our confidentiality agreement.
            </div>
            <Button
              onClick={handleSignDocument}
              disabled={!hasAgreed || isSigning}
              className="order-1 sm:order-2 bg-primary hover:bg-primary/90 disabled:bg-muted w-full sm:w-auto"
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
      
      <Card className="border-border/40">
        <CardContent className="pt-6 px-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-3 hidden sm:flex items-center justify-center flex-shrink-0">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What happens next?</h3>
              <p className="text-muted-foreground">
                After signing this agreement, you'll be able to book a consultation with our team to discuss the SmartFitter program and your fitness goals. Your information will be kept confidential in accordance with this agreement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NdaPage;
