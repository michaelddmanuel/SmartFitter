import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { documentAPI } from '../services/api';

const MemberContractPage = () => {
  const { profile, syncProfile } = useProfile();
  const navigate = useNavigate();
  
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  
  // Fetch the active member contract document
  useEffect(() => {
    const fetchContract = async () => {
      try {
        setIsLoading(true);
        const data = await documentAPI.getDocument('member_contract');
        setDocument(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching member contract:', err);
        setError('Failed to load the member contract. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContract();
  }, []);
  
  // Check if user can access this page
  useEffect(() => {
    if (profile && profile.user_status !== 'accepted') {
      // If user is not accepted yet, redirect to appropriate page
      navigate('/unauthorized');
    }
  }, [profile, navigate]);
  
  const handleAgreeToggle = () => {
    setHasAgreed(!hasAgreed);
  };
  
  const handleSignDocument = async () => {
    if (!hasAgreed || !document) return;
    
    try {
      setIsSigning(true);
      
      // Sign the document
      await documentAPI.signDocument(document.id, 'member_contract');
      
      // Refresh the user profile to get the updated status
      await syncProfile();
      
      // Navigate to the member dashboard
      navigate('/member-dashboard');
    } catch (err) {
      console.error('Error signing document:', err);
      setError('Failed to process your signature. Please try again.');
    } finally {
      setIsSigning(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
          <p>{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  if (!document) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 mb-6">
          <p>No member contract is currently available. Please contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-amber-600">Membership Contract</h1>
        <img 
          src="/SmartFitter Assets logos /SmartFitter Icon no wings.svg" 
          alt="SmartFitter Logo" 
          className="h-12" 
        />
      </div>
      
      <div className="mb-8 bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg p-6 shadow-sm">
        <div className="flex items-start">
          <div className="bg-green-100 p-2 rounded-full mr-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Congratulations!</h2>
            <p className="text-gray-700">Your application has been <span className="font-semibold text-green-700">approved</span>. Please review and sign the membership contract below to complete your enrollment.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8 border border-gray-200">
        <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-amber-900">{document.title}</h2>
              <p className="text-sm text-amber-700">Official SmartFitter Membership Agreement</p>
            </div>
            <div className="bg-white px-3 py-1 rounded-full border border-amber-200 text-xs font-medium text-amber-800">
              Version: {document.version}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="border rounded-md p-6 bg-gray-50 mb-6 h-96 overflow-y-auto prose max-w-none shadow-inner">
            {/* Render the markdown content - In a real app, you'd use a markdown renderer */}
            <div dangerouslySetInnerHTML={{ __html: document.content_markdown }} />
          </div>
          
          <div className="flex items-center mb-8 bg-amber-50 p-4 rounded-lg border border-amber-200">
            <input
              type="checkbox"
              id="agree"
              checked={hasAgreed}
              onChange={handleAgreeToggle}
              className="h-5 w-5 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label htmlFor="agree" className="ml-3 block text-amber-900 font-medium">
              I have read and agree to the terms of the SmartFitter Membership Contract
            </label>
          </div>
        </div>
        
        <div className="px-8 py-5 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-gray-500 text-sm">
              <span className="font-medium">Important:</span> By signing, you confirm that you understand all terms and obligations.
            </div>
            <button
              onClick={handleSignDocument}
              disabled={!hasAgreed || isSigning}
              className={`px-6 py-3 ${hasAgreed ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-400'} text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-70 flex items-center`}
            >
              {isSigning ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Sign Contract
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberContractPage;
