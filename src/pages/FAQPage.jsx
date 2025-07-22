import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is SmartFitter?",
      answer: "SmartFitter is an executive coaching program designed to help professionals achieve international-level success. We provide personalized mentoring, networking opportunities, and a structured path to elevate your career to the next level."
    },
    {
      question: "How much does it cost to join?",
      answer: "The SmartFitter program requires an R20K investment, which includes full access to our executive network, personalized career development plan, monthly mentorship sessions, and all the resources needed to succeed in the program."
    },
    {
      question: "How long is the program?",
      answer: "The SmartFitter program is designed as a 12-month journey, with regular check-ins, mentorship sessions, and networking events. Many members continue their involvement beyond the initial period to maintain access to the network and resources."
    },
    {
      question: "What kind of results can I expect?",
      answer: "Members typically report significant career advancement, higher income potential (R100K+ monthly), expanded professional networks, and improved leadership skills. Results vary based on your commitment and active participation in the program."
    },
    {
      question: "How does the mentorship work?",
      answer: "You'll be paired with experienced executives who provide one-on-one guidance tailored to your goals. Mentorship includes regular video calls, progress tracking, and actionable feedback to help you advance your career."
    },
    {
      question: "Can I choose between different paths?",
      answer: "Yes, SmartFitter offers three primary paths: Career Path (for corporate advancement), Business Path (for entrepreneurs), and Education Path (for those seeking to enhance their skills and qualifications). You can select the path that best aligns with your goals."
    },
    {
      question: "What happens after I book a consultation?",
      answer: "After your consultation, our team will assess if you're a good fit for the program. If approved, you'll receive an invitation to join, complete the onboarding process, and begin your SmartFitter journey with an initial strategy session."
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 30-day satisfaction guarantee. If you feel the program isn't meeting your expectations within the first 30 days, contact our support team to discuss your concerns and potential refund options."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col text-[#E5E7EB]">
      {/* Header */}
      <header className="border-b border-[#2A2A2A] p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-semibold text-[#CCC1BE]">Frequently Asked Questions</h1>
          <p className="text-[#E5E7EB]/70 mt-1">Everything you need to know about SmartFitter</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 overflow-y-auto">
        <div className="max-w-5xl mx-auto py-6 space-y-6">
          {/* FAQ Items */}
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className={`bg-[#232323] rounded-lg overflow-hidden transition-all ${
                  openIndex === index ? 'shadow-md' : ''
                }`}
              >
                <button
                  className="w-full text-left px-5 py-4 flex justify-between items-center"
                  onClick={() => toggleQuestion(index)}
                >
                  <h3 className="text-[#E5E7EB] font-medium">{item.question}</h3>
                  <div className={`text-[#CCC1BE] transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-5 pb-4 text-[#E5E7EB]/80 border-t border-[#2A2A2A] pt-3">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Contact Section */}
          <Card className="mt-8 bg-[#232323] border-border/40">
            <CardContent className="p-5">
              <h3 className="text-lg font-medium text-[#CCC1BE] mb-2">Still have questions?</h3>
              <p className="text-[#E5E7EB]/70 mb-4">
                If you couldn't find the answer to your question, feel free to reach out to our support team.
              </p>
              <a href="mailto:support@smartfitter.com">
                <Button className="bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-[#1A1A1A] font-medium h-auto py-2">
                  Contact Support
                </Button>
              </a>
            </CardContent>
          </Card>
          
          {/* Book Session CTA */}
          <Card className="mt-8 bg-[#2A2A2A] border-border/40">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-medium text-[#CCC1BE] mb-2">Ready to transform your career?</h3>
              <p className="text-[#E5E7EB]/70 mb-4">
                Book a free consultation with our team to learn how SmartFitter can help you achieve your goals.
              </p>
              <Link to="/book">
                <Button className="bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-[#1A1A1A] font-medium h-auto py-2">
                  Book a Consultation
                </Button>
              </Link>
            </CardContent>
          </Card>
          
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

export default FAQPage;
