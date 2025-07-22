import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import NavigationPublic from '../components/NavigationPublic';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  // Executive slideshow data
  const executiveSlides = [
    {
      image: "/Smartfitter Images/leadership-meeting-and-planning-with-a-black-man-2023-11-27-04-52-25-utc.png",
      title: "Executive Leadership",
      description: "Join leaders who shape the future of business globally"
    },
    {
      image: "/Smartfitter Images/black-woman-leadership-presentation-and-business-2023-11-27-05-00-48-utc.png",
      title: "Strategic Management",
      description: "Learn proven business strategies from top industry executives"
    },
    {
      image: "/Smartfitter Images/business-team-portrait-people-smile-in-profession-2023-11-27-04-53-53-utc.png",
      title: "Global Network",
      description: "Connect with a powerful network of international executives"
    }
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % executiveSlides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + executiveSlides.length) % executiveSlides.length);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] overflow-x-hidden">
      {/* Navigation */}
      <NavigationPublic />
      
      {/* Hero Section - Become an International Executive */}
      <section className="text-center pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* SmartFitter Logo */}
          <div className="pt-24 mb-8">
            <img 
              src="/SmartFitter Assets logos /SmartFitter Logo Icon only.svg" 
              alt="SmartFitter Logo" 
              className="h-16 md:h-20 w-auto mx-auto"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-8 leading-tight">
            BECOME AN<br/>
            INTERNATIONAL<br/>
            EXECUTIVE
          </h1>
          
          <p className="text-lg text-[#E5E7EB]/70 mb-12 leading-relaxed">
            Join our exclusive network of global executives and unlock unprecedented opportunities.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <Button 
              onClick={() => loginWithRedirect({ screen_hint: 'signup', connection: 'google-oauth2' })}
              className="flex-1 bg-[#FFFFFF] text-[#000000] border-none flex items-center justify-center space-x-3 h-14 text-lg font-medium rounded-lg hover:bg-[#F5F5F5]"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Sign up with Google</span>
            </Button>
            
            <Button 
              onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
              className="flex-1 bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-black font-medium py-4 text-lg rounded-lg h-14"
            >
              Start Your Journey
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#CCC1BE]/15 hover:-translate-y-2 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-[#CCC1BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#CCC1BE]/10 rounded-full blur-2xl group-hover:bg-[#CCC1BE]/20 transition-colors duration-500"></div>
              <CardContent className="relative p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#CCC1BE] to-[#CCC1BE]/80 rounded-xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-1 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#CCC1BE] mb-4 group-hover:text-[#E5E7EB] transition-colors duration-300">Global Network</h3>
                <p className="text-[#E5E7EB]/80 leading-relaxed group-hover:text-[#E5E7EB]/95 transition-colors duration-300">
                  Connect with executives worldwide through our extensive network of 10,000+ professionals across 50+ countries.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#CCC1BE]/15 hover:-translate-y-2 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-[#CCC1BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#CCC1BE]/10 rounded-full blur-2xl group-hover:bg-[#CCC1BE]/20 transition-colors duration-500"></div>
              <CardContent className="relative p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#CCC1BE] to-[#CCC1BE]/80 rounded-xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-1 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#CCC1BE] mb-4 group-hover:text-[#E5E7EB] transition-colors duration-300">Exclusive Opportunities</h3>
                <p className="text-[#E5E7EB]/80 leading-relaxed group-hover:text-[#E5E7EB]/95 transition-colors duration-300">
                  Access premium career advancement opportunities reserved exclusively for our elite members and partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PROVEN SUCCESS Section */}
      <section className="py-16 bg-gradient-to-br from-[#232323] to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <div className="mb-8">
                <span className="inline-block bg-[#CCC1BE]/20 text-[#CCC1BE] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  PROVEN SUCCESS
                </span>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#CCC1BE] to-[#E5E7EB] bg-clip-text text-transparent mb-6 leading-tight">
                  From Vision to Victory
                </h3>
                <p className="text-[#E5E7EB]/80 text-lg leading-relaxed mb-8">
                  Every industry leader started with ambition. Our executive development program provides the strategic framework, global network, and proven methodologies to transform your career aspirations into measurable success.
                </p>
              </div>
              
              {/* Success Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <div className="text-center p-3 sm:p-4 bg-[#1A1A1A]/50 rounded-xl border border-[#CCC1BE]/20">
                  <div className="text-2xl sm:text-3xl font-bold text-[#CCC1BE] mb-2">94%</div>
                  <div className="text-[#E5E7EB]/70 text-xs sm:text-sm">Success Rate</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-[#1A1A1A]/50 rounded-xl border border-[#CCC1BE]/20">
                  <div className="text-2xl sm:text-3xl font-bold text-[#CCC1BE] mb-2">$2.5M</div>
                  <div className="text-[#E5E7EB]/70 text-xs sm:text-sm">Avg. Salary Boost</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-[#1A1A1A]/50 rounded-xl border border-[#CCC1BE]/20">
                  <div className="text-2xl sm:text-3xl font-bold text-[#CCC1BE] mb-2">8</div>
                  <div className="text-[#E5E7EB]/70 text-xs sm:text-sm">Months to C-Suite</div>
                </div>
              </div>
              
              {/* Key Benefits */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#CCC1BE] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#E5E7EB]/90 text-sm">Direct access to Fortune 500 executives</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#CCC1BE] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#E5E7EB]/90 text-sm">Personalized career acceleration strategy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#CCC1BE] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#E5E7EB]/90 text-sm">Global business opportunities pipeline</span>
                </div>
              </div>
            </div>
            
            {/* Professional Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#CCC1BE]/20 to-[#CCC1BE]/5 rounded-3xl blur-xl"></div>
                <img 
                  src="/Smartfitter Images/looking-out-window-vision-and-business-man-of-sta-2023-11-27-05-30-12-utc.png" 
                  alt="Executive Vision and Leadership" 
                  className="relative w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute top-4 right-4 bg-[#CCC1BE] text-black px-3 py-1 rounded-full text-xs font-bold">
                  Executive Excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transform Your Career Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#CCC1BE] to-[#E5E7EB] bg-clip-text text-transparent mb-4">
              Transform Your Career
            </h2>
            <p className="text-lg text-[#E5E7EB]/80">
              Join our global network and accelerate your professional growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Global Network Card */}
            <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#CCC1BE]/20 hover:-translate-y-2 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-[#CCC1BE]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#CCC1BE]/5 rounded-full blur-3xl group-hover:bg-[#CCC1BE]/10 transition-colors duration-700"></div>
              <CardContent className="relative p-6 text-center">
                <div className="bg-gradient-to-br from-[#CCC1BE] to-[#CCC1BE]/80 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 group-hover:-translate-y-1 transition-transform duration-500 shadow-lg group-hover:shadow-[#CCC1BE]/30">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#000" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-3 group-hover:text-[#CCC1BE] transition-colors duration-300">Global Network</h3>
                <p className="text-[#E5E7EB]/70 text-sm leading-relaxed group-hover:text-[#E5E7EB]/90 transition-colors duration-300">
                  Access opportunities worldwide through our extensive international network of executives.
                </p>
              </CardContent>
            </Card>
            
            {/* Career Growth Card */}
            <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#CCC1BE]/20 hover:-translate-y-2 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-[#CCC1BE]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#CCC1BE]/5 rounded-full blur-3xl group-hover:bg-[#CCC1BE]/10 transition-colors duration-700"></div>
              <CardContent className="relative p-6 text-center">
                <div className="bg-gradient-to-br from-[#CCC1BE] to-[#CCC1BE]/80 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 group-hover:-translate-y-1 transition-transform duration-500 shadow-lg group-hover:shadow-[#CCC1BE]/30">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#000" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-3 group-hover:text-[#CCC1BE] transition-colors duration-300">Career Growth</h3>
                <p className="text-[#E5E7EB]/70 text-sm leading-relaxed group-hover:text-[#E5E7EB]/90 transition-colors duration-300">
                  Accelerate your career trajectory with personalized guidance from industry leaders.
                </p>
              </CardContent>
            </Card>
            
            {/* Executive Community Card */}
            <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#CCC1BE]/20 hover:-translate-y-2 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-[#CCC1BE]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#CCC1BE]/5 rounded-full blur-3xl group-hover:bg-[#CCC1BE]/10 transition-colors duration-700"></div>
              <CardContent className="relative p-6 text-center">
                <div className="bg-gradient-to-br from-[#CCC1BE] to-[#CCC1BE]/80 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 group-hover:-translate-y-1 transition-transform duration-500 shadow-lg group-hover:shadow-[#CCC1BE]/30">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#000" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-3 group-hover:text-[#CCC1BE] transition-colors duration-300">Executive Community</h3>
                <p className="text-[#E5E7EB]/70 text-sm leading-relaxed group-hover:text-[#E5E7EB]/90 transition-colors duration-300">
                  Join an elite network of global business leaders and industry pioneers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Executive Leadership Slideshow */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-2xl group">
            {/* Slideshow Images */}
            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
              {executiveSlides.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Multiple overlay layers for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/30"></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  {/* Text content with enhanced styling */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="bg-gradient-to-t from-black/80 to-transparent p-4 -m-4 rounded-b-2xl">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-2xl">
                        {slide.title}
                      </h3>
                      <p className="text-white text-base md:text-lg leading-relaxed drop-shadow-lg">
                        {slide.description}
                      </p>
                      
                      {/* Optional accent line */}
                      <div className="w-12 h-1 bg-[#CCC1BE] mt-3 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm hover:bg-[#CCC1BE]/80 text-white hover:text-black rounded-full flex items-center justify-center transition-colors duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-[#CCC1BE]"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm hover:bg-[#CCC1BE]/80 text-white hover:text-black rounded-full flex items-center justify-center transition-colors duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-[#CCC1BE]"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {executiveSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-[#CCC1BE] w-6' : 'bg-white/50 hover:bg-white'}`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="w-full bg-gradient-to-br from-[#1A1A1A] to-[#232323] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Professional Image */}
            <div className="order-1 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#CCC1BE]/20 to-[#CCC1BE]/5 rounded-2xl blur-lg"></div>
                <img 
                  src="/Smartfitter Images/bigstock-Interior-of-modern-boardroom-w-122609693-min 2.png" 
                  alt="Modern Executive Boardroom" 
                  className="relative w-full h-96 md:h-[500px] object-cover rounded-xl shadow-xl"
                />
                <div className="absolute top-4 right-4 bg-[#CCC1BE] text-black px-3 py-1 rounded-full text-xs font-bold">
                  Executive Environment
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="order-2 lg:order-2">
              <div className="mb-8">
                <span className="inline-block bg-[#CCC1BE]/20 text-[#CCC1BE] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  WHO WE ARE
                </span>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#CCC1BE] to-[#E5E7EB] bg-clip-text text-transparent mb-6 leading-tight">
                  Excellence Meets Opportunity
                </h3>
                <p className="text-[#E5E7EB]/80 text-lg leading-relaxed mb-8">
                  Our modern facilities and executive environment foster the highest levels of professional development. We bring unparalleled experience from Business, Education & Construction Management at the highest levels.
                </p>
              </div>
              
              {/* Company Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="text-center p-3 bg-[#232323]/50 rounded-xl border border-[#CCC1BE]/20">
                  <div className="text-xl font-bold text-[#CCC1BE] mb-1">40+</div>
                  <div className="text-[#E5E7EB]/70 text-xs">Years</div>
                </div>
                <div className="text-center p-3 bg-[#232323]/50 rounded-xl border border-[#CCC1BE]/20">
                  <div className="text-xl font-bold text-[#CCC1BE] mb-1">50+</div>
                  <div className="text-[#E5E7EB]/70 text-xs">Countries</div>
                </div>
                <div className="text-center p-3 bg-[#232323]/50 rounded-xl border border-[#CCC1BE]/20">
                  <div className="text-xl font-bold text-[#CCC1BE] mb-1">10k+</div>
                  <div className="text-[#E5E7EB]/70 text-xs">Executives</div>
                </div>
              </div>
              
              {/* Key Strengths */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#CCC1BE] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#E5E7EB]/90 text-sm">Four decades of business excellence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#CCC1BE] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#E5E7EB]/90 text-sm">Revolutionary education methodologies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#CCC1BE] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#E5E7EB]/90 text-sm">Global executive network access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transform Your Career Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image - Top in mobile, Right in desktop */}
            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-2xl group">
                <img 
                  src="/Smartfitter Images/business-team-portrait-people-smile-in-profession-2023-11-27-04-53-53-utc.png" 
                  alt="Professional Business Team" 
                  className="w-full h-96 md:h-[500px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 bg-[#CCC1BE] text-black px-4 py-2 rounded-full text-sm font-bold">
                  Career Transformation
                </div>
              </div>
            </div>
            
            {/* Content - Bottom in mobile, Left in desktop */}
            <div className="order-2 lg:order-1">
              <div className="mb-8">
                <span className="inline-block bg-[#CCC1BE]/20 text-[#CCC1BE] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  CAREER TRANSFORMATION
                </span>
                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#CCC1BE] to-[#E5E7EB] bg-clip-text text-transparent mb-6 leading-tight">
                  Transform Your Career
                </h3>
                <p className="text-[#E5E7EB]/80 text-lg leading-relaxed mb-8">
                  Join our exclusive network of global executives and unlock unprecedented opportunities in the international business world. Our comprehensive program transforms careers at the highest level.
                </p>
              </div>
              
              
              {/* Key Benefits Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Card 1: Personalized Career Development Plan */}
                <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#CCC1BE]/20 hover:-translate-y-2 overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#CCC1BE]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#CCC1BE]/5 rounded-full blur-3xl group-hover:bg-[#CCC1BE]/10 transition-colors duration-700"></div>
                  <CardContent className="relative p-6 text-center">
                    <div className="bg-gradient-to-br from-[#CCC1BE] to-[#CCC1BE]/80 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 group-hover:-translate-y-1 transition-transform duration-500 shadow-lg group-hover:shadow-[#CCC1BE]/30">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#000" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#E5E7EB] mb-3 group-hover:text-[#CCC1BE] transition-colors duration-300">Personalized Career Development Plan</h3>
                    <p className="text-[#E5E7EB]/70 text-sm leading-relaxed group-hover:text-[#E5E7EB]/90 transition-colors duration-300">
                      Tailored roadmap to executive success
                    </p>
                  </CardContent>
                </Card>

                {/* Card 2: 1-on-1 Mentorship Sessions */}
                <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#CCC1BE]/20 hover:-translate-y-2 overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#CCC1BE]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#CCC1BE]/5 rounded-full blur-3xl group-hover:bg-[#CCC1BE]/10 transition-colors duration-700"></div>
                  <CardContent className="relative p-6 text-center">
                    <div className="bg-gradient-to-br from-[#CCC1BE] to-[#CCC1BE]/80 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 group-hover:-translate-y-1 transition-transform duration-500 shadow-lg group-hover:shadow-[#CCC1BE]/30">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#000" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#E5E7EB] mb-3 group-hover:text-[#CCC1BE] transition-colors duration-300">1-on-1 Mentorship Sessions</h3>
                    <p className="text-[#E5E7EB]/70 text-sm leading-relaxed group-hover:text-[#E5E7EB]/90 transition-colors duration-300">
                      Direct guidance from industry experts
                    </p>
                  </CardContent>
                </Card>

                {/* Card 3: Access to Executive Network */}
                <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#CCC1BE]/20 hover:-translate-y-2 overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#CCC1BE]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#CCC1BE]/5 rounded-full blur-3xl group-hover:bg-[#CCC1BE]/10 transition-colors duration-700"></div>
                  <CardContent className="relative p-6 text-center">
                    <div className="bg-gradient-to-br from-[#CCC1BE] to-[#CCC1BE]/80 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 group-hover:-translate-y-1 transition-transform duration-500 shadow-lg group-hover:shadow-[#CCC1BE]/30">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#000" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#E5E7EB] mb-3 group-hover:text-[#CCC1BE] transition-colors duration-300">Access to Executive Network</h3>
                    <p className="text-[#E5E7EB]/70 text-sm leading-relaxed group-hover:text-[#E5E7EB]/90 transition-colors duration-300">
                      Connect with global business leaders
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R20K Investment Includes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Executive Investment Image */}
            <div className="order-1 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl group">
                <img 
                  src="/Smartfitter Images/leadership-meeting-and-planning-with-a-black-man-2023-11-27-04-52-25-utc.png" 
                  alt="Executive Investment Planning" 
                  className="w-full h-96 md:h-[500px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 bg-[#CCC1BE] text-black px-3 py-1 rounded-full text-xs font-bold">
                  Executive Investment
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="order-2 lg:order-2">
              <div className="mb-8">
                <span className="inline-block bg-[#CCC1BE]/20 text-[#CCC1BE] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  R20K INVESTMENT
                </span>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#CCC1BE] to-[#E5E7EB] bg-clip-text text-transparent mb-6 leading-tight">
                  Investment Includes
                </h3>
                <p className="text-[#E5E7EB]/80 text-lg leading-relaxed mb-8">
                  Everything you need to become an international executive. Our comprehensive program provides unparalleled access to global business networks and executive development.
                </p>
              </div>
              
              {/* Investment Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="text-center p-3 bg-[#232323]/50 rounded-xl border border-[#CCC1BE]/20">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-xl font-bold text-[#CCC1BE] mb-1">12</div>
                  <div className="text-[#E5E7EB]/70 text-xs leading-tight">Months Program</div>
                </div>
                <div className="text-center p-3 bg-[#232323]/50 rounded-xl border border-[#CCC1BE]/20">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-xl font-bold text-[#CCC1BE] mb-1">24/7</div>
                  <div className="text-[#E5E7EB]/70 text-xs leading-tight">Support Access</div>
                </div>
                <div className="text-center p-3 bg-[#232323]/50 rounded-xl border border-[#CCC1BE]/20">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-xl font-bold text-[#CCC1BE] mb-1">100%</div>
                  <div className="text-[#E5E7EB]/70 text-xs leading-tight">Success Rate</div>
                </div>
              </div>
              
              {/* Key Benefits */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#CCC1BE] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#E5E7EB]/90 text-sm">Complete executive transformation program</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#CCC1BE] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#E5E7EB]/90 text-sm">Global business network access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#CCC1BE] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#E5E7EB]/90 text-sm">Lifetime mentorship and support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Path Options */}
      <section className="py-16 bg-[#232323]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            {/* Path Options Image and Content */}
            <div>
              <div className="relative overflow-hidden rounded-2xl group mb-8">
                <img 
                  src="/Smartfitter Images/happy-professional-and-face-of-business-man-in-of-2023-11-27-05-05-01-utc.png" 
                  alt="Your Path to Success" 
                  className="w-full h-96 md:h-[500px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 bg-[#CCC1BE] text-black px-3 py-1 rounded-full text-xs font-bold">
                  Path Options
                </div>
              </div>
              
              <div className="mb-8">
                <span className="inline-block bg-[#CCC1BE]/20 text-[#CCC1BE] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  YOUR PATH OPTIONS
                </span>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#CCC1BE] to-[#E5E7EB] bg-clip-text text-transparent mb-6 leading-tight">
                  Your Path Options
                </h3>
                <p className="text-[#E5E7EB]/80 text-lg leading-relaxed mb-8">
                  Choose your journey to international executive success. Each path is designed to maximize your potential and accelerate your career transformation.
                </p>
              </div>
            </div>
            
            {/* Path Option Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Career Path */}
              <Card className="bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#CCC1BE]/50 transition-colors group">
                <CardContent className="p-6 text-center">
                  <div className="bg-[#CCC1BE]/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-[#CCC1BE]/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#E5E7EB] mb-4">Career Path</h3>
                  <p className="text-[#E5E7EB]/70 text-sm">Advance your corporate career globally with strategic positioning and executive training</p>
                </CardContent>
              </Card>
              
              {/* Business Path */}
              <Card className="bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#CCC1BE]/50 transition-colors group">
                <CardContent className="p-6 text-center">
                  <div className="bg-[#CCC1BE]/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-[#CCC1BE]/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#E5E7EB] mb-4">Business Path</h3>
                  <p className="text-[#E5E7EB]/70 text-sm">Start and scale your own venture with international partnerships and business development</p>
                </CardContent>
              </Card>
              
              {/* Education Path */}
              <Card className="bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#CCC1BE]/50 transition-colors group">
                <CardContent className="p-6 text-center">
                  <div className="bg-[#CCC1BE]/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-[#CCC1BE]/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#E5E7EB] mb-4">Education Path</h3>
                  <p className="text-[#E5E7EB]/70 text-sm">Further your executive education with advanced certifications and leadership programs</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story - Card Style */}
      <section className="py-16 bg-gradient-to-br from-[#232323] to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-[#CCC1BE]/20 text-[#CCC1BE] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              SUCCESS STORIES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#CCC1BE] to-[#E5E7EB] bg-clip-text text-transparent mb-4">
              Your Success Story Starts Here
            </h2>
            <p className="text-lg text-[#E5E7EB]/80">
              Join executives who've transformed their careers and achieved extraordinary results
            </p>
          </div>
          
          {/* Main Success Card */}
          <div className="mb-12">
            <Card className="group relative bg-gradient-to-br from-[#1A1A1A] via-[#232323] to-[#1A1A1A] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#CCC1BE]/15 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#CCC1BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative p-4">
                <div className="space-y-8">
                  {/* Image */}
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img 
                        src="/Smartfitter Images/happy-black-woman-leadership-or-business-leader-i-2023-11-27-05-34-13-utc.png" 
                        alt="Successful Business Leader" 
                        className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 bg-[#CCC1BE] text-black px-3 py-1 rounded-full text-xs font-bold">
                        Success Team
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#E5E7EB] mb-4 group-hover:text-[#CCC1BE] transition-colors duration-300">
                      Transform Your Career with Our Proven System
                    </h3>
                    <p className="text-[#E5E7EB]/80 leading-relaxed mb-6">
                      Join executives who've increased their earning potential by 
                      <span className="text-[#CCC1BE] font-bold text-xl mx-1">300%</span> 
                      within the first year.
                    </p>
                    
                    {/* Enhanced Stats Display */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {/* 98% Success Rate */}
                      <div className="relative group">
                        <div className="relative bg-[#1A1A1A] p-4 rounded-xl border border-[#CCC1BE]/20 group-hover:border-[#CCC1BE]/40 shadow-lg transition-all duration-300 text-center">
                          <div className="bg-[#232323] p-2 rounded-full flex items-center justify-center mb-2 mx-auto w-10 h-10 group-hover:rotate-12 transition-transform duration-300">
                            <svg className="w-5 h-5 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-xl font-black text-[#CCC1BE] group-hover:scale-110 transition-transform duration-300 mb-1">98%</div>
                          <div className="text-[#E5E7EB] font-medium text-xs">Success Rate</div>
                        </div>
                      </div>
                      
                      {/* 6M Average Salary */}
                      <div className="relative group">
                        <div className="relative bg-[#1A1A1A] p-4 rounded-xl border border-[#CCC1BE]/20 group-hover:border-[#CCC1BE]/40 shadow-lg transition-all duration-300 text-center">
                          <div className="bg-[#232323] p-2 rounded-full flex items-center justify-center mb-2 mx-auto w-10 h-10 group-hover:rotate-12 transition-transform duration-300">
                            <svg className="w-5 h-5 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-xl font-black text-[#CCC1BE] group-hover:scale-110 transition-transform duration-300 mb-1">6M</div>
                          <div className="text-[#E5E7EB] font-medium text-xs">Average Salary</div>
                        </div>
                      </div>
                      
                      {/* 40+ Years */}
                      <div className="relative group">
                        <div className="relative bg-[#1A1A1A] p-4 rounded-xl border border-[#CCC1BE]/20 group-hover:border-[#CCC1BE]/40 shadow-lg transition-all duration-300 text-center">
                          <div className="bg-[#232323] p-2 rounded-full flex items-center justify-center mb-2 mx-auto w-10 h-10 group-hover:rotate-12 transition-transform duration-300">
                            <svg className="w-5 h-5 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="text-xl font-black text-[#CCC1BE] group-hover:scale-110 transition-transform duration-300 mb-1">40+</div>
                          <div className="text-[#E5E7EB] font-medium text-xs">Years</div>
                        </div>
                      </div>
                      
                      {/* 24/7 Support */}
                      <div className="relative group">
                        <div className="relative bg-[#1A1A1A] p-4 rounded-xl border border-[#CCC1BE]/20 group-hover:border-[#CCC1BE]/40 shadow-lg transition-all duration-300 text-center">
                          <div className="bg-[#232323] p-2 rounded-full flex items-center justify-center mb-2 mx-auto w-10 h-10 group-hover:rotate-12 transition-transform duration-300">
                            <svg className="w-5 h-5 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-xl font-black text-[#CCC1BE] group-hover:scale-110 transition-transform duration-300 mb-1">24/7</div>
                          <div className="text-[#E5E7EB] font-medium text-xs">Global Support</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Key Benefits */}
                    <div className="space-y-2">
                      <div className="flex items-center text-[#E5E7EB]/90 text-sm">
                        <div className="w-4 h-4 bg-[#CCC1BE] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Proven system with measurable results
                      </div>
                      <div className="flex items-center text-[#E5E7EB]/90 text-sm">
                        <div className="w-4 h-4 bg-[#CCC1BE] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Join successful executives worldwide
                      </div>
                      <div className="flex items-center text-[#E5E7EB]/90 text-sm">
                        <div className="w-4 h-4 bg-[#CCC1BE] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Fast-track your career transformation
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Bottom Stats Row */}
          <div className="space-y-4">
            <Card className="bg-[#1A1A1A] border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-colors group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#CCC1BE]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#CCC1BE]/30 group-hover:rotate-12 transition-all duration-300">
                  <svg className="w-6 h-6 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-2">Career Growth</h3>
                <p className="text-[#E5E7EB]/70 text-sm">Accelerate your professional development</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A] border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-colors group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#CCC1BE]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#CCC1BE]/30 group-hover:rotate-12 transition-all duration-300">
                  <svg className="w-6 h-6 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-2">Global Network</h3>
                <p className="text-[#E5E7EB]/70 text-sm">Connect with industry leaders worldwide</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A] border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-colors group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#CCC1BE]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#CCC1BE]/30 group-hover:rotate-12 transition-all duration-300">
                  <svg className="w-6 h-6 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-2">Proven Results</h3>
                <p className="text-[#E5E7EB]/70 text-sm">Track record of executive success</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Watch Our Videos Section */}
      <section className="py-16 bg-gradient-to-br from-[#232323] to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#CCC1BE] to-[#E5E7EB] bg-clip-text text-transparent mb-4">Watch Our Videos</h2>
            <p className="text-lg text-[#E5E7EB]/80">Learn more about SmartFitter and our success stories</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video 1 - SmartFitter Introduction */}
            <Card className="group relative bg-gradient-to-br from-[#1A1A1A] via-[#232323] to-[#1A1A1A] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#CCC1BE]/15 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#CCC1BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative p-6">
                <div className="aspect-video bg-[#000] rounded-lg mb-6 overflow-hidden shadow-lg relative">
                <iframe
                  src="https://www.youtube.com/embed/dBTiDgSUtAM?rel=0&modestbranding=1&controls=1"
                  title="SmartFitter Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full absolute inset-0"
                ></iframe>
              </div>
                <h3 className="text-2xl font-bold text-[#E5E7EB] mb-3 group-hover:text-[#CCC1BE] transition-colors duration-300">SmartFitter Introduction</h3>
                <p className="text-[#E5E7EB]/80 mb-4 leading-relaxed group-hover:text-[#E5E7EB]/95 transition-colors duration-300">
                  Country Living | Digital Business Partnership - Discover how SmartFitter transforms careers globally.
                </p>
                <div className="flex items-center text-[#CCC1BE] text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>Watch and learn about our executive program</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Video 2 - Success Stories */}
            <Card className="group relative bg-gradient-to-br from-[#1A1A1A] via-[#232323] to-[#1A1A1A] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#CCC1BE]/15 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#CCC1BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative p-6">
                <div className="aspect-video bg-[#000] rounded-lg mb-6 overflow-hidden shadow-lg relative">
                <iframe
                  src="https://www.youtube.com/embed/nVAvRLs07zc?rel=0&modestbranding=1&controls=1"
                  title="Success Stories"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full absolute inset-0"
                ></iframe>
              </div>
                <h3 className="text-2xl font-bold text-[#E5E7EB] mb-3 group-hover:text-[#CCC1BE] transition-colors duration-300">Success Stories</h3>
                <p className="text-[#E5E7EB]/80 mb-4 leading-relaxed group-hover:text-[#E5E7EB]/95 transition-colors duration-300">
                  Executive B2B Opportunity - Real stories from executives who transformed their careers with SmartFitter.
                </p>
                <div className="flex items-center text-[#CCC1BE] text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>Hear from successful executives in our network</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories Testimonials */}
      <section className="py-16 bg-gradient-to-br from-[#1A1A1A] to-[#232323]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#CCC1BE] to-[#E5E7EB] bg-clip-text text-transparent mb-4">Success Stories</h2>
            <p className="text-lg text-[#E5E7EB]/80">Hear from executives who transformed their careers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Michael Rodriguez - Business Leader */}
            <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#CCC1BE]/15 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#CCC1BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <img 
                      src="/Smartfitter Images/arms-crossed-portrait-and-business-man-in-city-fo-2023-11-27-05-21-35-utc.png" 
                      alt="Michael R. - CEO" 
                      className="w-20 h-20 rounded-full object-cover border-3 border-[#CCC1BE]/30 group-hover:border-[#CCC1BE]/60 transition-colors duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-[#CCC1BE] text-black rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#E5E7EB] mb-1 group-hover:text-[#CCC1BE] transition-colors duration-300">Michael Rodriguez</h3>
                  <p className="text-[#CCC1BE] text-sm mb-1">CEO, TechVision Solutions</p>
                  <p className="text-[#E5E7EB]/60 text-xs">New York, USA</p>
                </div>
                <div className="relative">
                  <svg className="absolute -top-2 -left-2 w-6 h-6 text-[#CCC1BE]/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                  <p className="text-[#E5E7EB]/90 italic leading-relaxed pl-4 group-hover:text-[#E5E7EB] transition-colors duration-300">
                    "SmartFitter didn't just change my career—it revolutionized my entire approach to business. Within 8 months, I went from middle management to CEO of a $50M company. The network and mentorship are unparalleled."
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#CCC1BE]/20">
                  <div className="flex text-[#CCC1BE] text-xs">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-[#E5E7EB]/60 text-xs">300% salary increase</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Sarah Chen - Global Operations */}
            <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#CCC1BE]/15 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#CCC1BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <img 
                      src="/Smartfitter Images/asian-woman-face-and-business-meeting-in-office-f-2023-11-27-05-22-40-utc.png" 
                      alt="Sarah L. - Global Operations Director" 
                      className="w-20 h-20 rounded-full object-cover border-3 border-[#CCC1BE]/30 group-hover:border-[#CCC1BE]/60 transition-colors duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-[#CCC1BE] text-black rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#E5E7EB] mb-1 group-hover:text-[#CCC1BE] transition-colors duration-300">Sarah Chen</h3>
                  <p className="text-[#CCC1BE] text-sm mb-1">Global Operations Director</p>
                  <p className="text-[#E5E7EB]/60 text-xs">Singapore</p>
                </div>
                <div className="relative">
                  <svg className="absolute -top-2 -left-2 w-6 h-6 text-[#CCC1BE]/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                  <p className="text-[#E5E7EB]/90 italic leading-relaxed pl-4 group-hover:text-[#E5E7EB] transition-colors duration-300">
                    "The global network opened doors across 15 countries. From regional manager to directing operations across Asia-Pacific—SmartFitter's mentorship and connections made it possible. My earning potential increased by 250%."
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#CCC1BE]/20">
                  <div className="flex text-[#CCC1BE] text-xs">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-[#E5E7EB]/60 text-xs">15 countries managed</span>
                </div>
              </CardContent>
            </Card>
            
            {/* David Kumar - Investment Banking */}
            <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#CCC1BE]/15 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#CCC1BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <img 
                      src="/Smartfitter Images/portrait-of-a-confident-mature-businessman-standin-2023-11-27-05-26-38-utc.png" 
                      alt="David K. - Investment Banking Executive" 
                      className="w-20 h-20 rounded-full object-cover border-3 border-[#CCC1BE]/30 group-hover:border-[#CCC1BE]/60 transition-colors duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-[#CCC1BE] text-black rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#E5E7EB] mb-1 group-hover:text-[#CCC1BE] transition-colors duration-300">David Kumar</h3>
                  <p className="text-[#CCC1BE] text-sm mb-1">Managing Director, Investment Banking</p>
                  <p className="text-[#E5E7EB]/60 text-xs">London, UK</p>
                </div>
                <div className="relative">
                  <svg className="absolute -top-2 -left-2 w-6 h-6 text-[#CCC1BE]/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                  <p className="text-[#E5E7EB]/90 italic leading-relaxed pl-4 group-hover:text-[#E5E7EB] transition-colors duration-300">
                    "SmartFitter's executive network in finance is extraordinary. The program connected me with C-suite executives who became mentors and eventually business partners. Now I manage a $2B portfolio."
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#CCC1BE]/20">
                  <div className="flex text-[#CCC1BE] text-xs">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-[#E5E7EB]/60 text-xs">$2B portfolio managed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Excellence is Our Standard */}
      <section className="py-16 bg-gradient-to-br from-[#1A1A1A] to-[#232323]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            {/* Content First */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#CCC1BE] to-[#E5E7EB] bg-clip-text text-transparent mb-6">
                Excellence is Our Standard
              </h3>
              <p className="text-[#E5E7EB]/80 text-lg leading-relaxed mb-8">
                Join the elite network of executives who demand nothing less than extraordinary results. Our proven methodology has transformed careers across every major industry worldwide.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {/* 98% Success Rate */}
                <div className="relative group">
                  <div className="relative bg-[#1A1A1A] p-4 rounded-xl border border-[#CCC1BE]/20 group-hover:border-[#CCC1BE]/40 shadow-lg transition-all duration-300 text-center">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#CCC1BE]/5 rounded-full blur-2xl opacity-60"></div>
                    <div className="bg-[#232323] p-2 rounded-full flex items-center justify-center mb-2 mx-auto w-10 h-10 group-hover:rotate-12 transition-transform duration-300">
                      <svg className="w-5 h-5 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-xl font-black text-[#CCC1BE] group-hover:scale-110 transition-transform duration-300 mb-1">98%</div>
                    <div className="text-[#E5E7EB] font-medium text-xs">Success Rate</div>
                  </div>
                </div>
                
                {/* 6M Average Salary */}
                <div className="relative group">
                  <div className="relative bg-[#1A1A1A] p-4 rounded-xl border border-[#CCC1BE]/20 group-hover:border-[#CCC1BE]/40 shadow-lg transition-all duration-300 text-center">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#CCC1BE]/5 rounded-full blur-2xl opacity-60"></div>
                    <div className="bg-[#232323] p-2 rounded-full flex items-center justify-center mb-2 mx-auto w-10 h-10 group-hover:rotate-12 transition-transform duration-300">
                      <svg className="w-5 h-5 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-xl font-black text-[#CCC1BE] group-hover:scale-110 transition-transform duration-300 mb-1">6M</div>
                    <div className="text-[#E5E7EB] font-medium text-xs">Average Salary</div>
                  </div>
                </div>
                
                {/* 40+ Years */}
                <div className="relative group">
                  <div className="relative bg-[#1A1A1A] p-4 rounded-xl border border-[#CCC1BE]/20 group-hover:border-[#CCC1BE]/40 shadow-lg transition-all duration-300 text-center">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#CCC1BE]/5 rounded-full blur-2xl opacity-60"></div>
                    <div className="bg-[#232323] p-2 rounded-full flex items-center justify-center mb-2 mx-auto w-10 h-10 group-hover:rotate-12 transition-transform duration-300">
                      <svg className="w-5 h-5 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-xl font-black text-[#CCC1BE] group-hover:scale-110 transition-transform duration-300 mb-1">40+</div>
                    <div className="text-[#E5E7EB] font-medium text-xs">Years</div>
                  </div>
                </div>
                
                {/* 24/7 Support */}
                <div className="relative group">
                  <div className="relative bg-[#1A1A1A] p-4 rounded-xl border border-[#CCC1BE]/20 group-hover:border-[#CCC1BE]/40 shadow-lg transition-all duration-300 text-center">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#CCC1BE]/5 rounded-full blur-2xl opacity-60"></div>
                    <div className="bg-[#232323] p-2 rounded-full flex items-center justify-center mb-2 mx-auto w-10 h-10 group-hover:rotate-12 transition-transform duration-300">
                      <svg className="w-5 h-5 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-xl font-black text-[#CCC1BE] group-hover:scale-110 transition-transform duration-300 mb-1">24/7</div>
                    <div className="text-[#E5E7EB] font-medium text-xs">Global Support</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Executive Team Image */}
            <div>
              <div className="relative">
                <img 
                  src="/Smartfitter Images/night-office-and-business-meeting-women-with-team-2023-11-27-04-59-55-utc.png" 
                  alt="Executive Team Meeting" 
                  className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#CCC1BE]/20 to-transparent rounded-2xl"></div>
                <div className="absolute top-4 right-4 bg-[#CCC1BE] text-black px-3 py-1 rounded-full text-xs font-bold">
                  Executive Level
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#232323]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#CCC1BE] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-[#E5E7EB]/80">Get answers to common questions about our program</p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                question: "How long is the program?",
                answer: "The program is designed as an ongoing journey with initial intensive training over 3-6 months, followed by continuous support and development opportunities. You'll see results from day one with our proven system."
              },
              {
                question: "What support is included?",
                answer: "You receive 1-on-1 mentorship sessions, access to our global executive network, personalized career development planning, ongoing training resources, and 24/7 support from our team of experts."
              },
              {
                question: "How is the investment structured?",
                answer: "The R20k investment covers your complete setup including business registration, professional website development, comprehensive training materials, and first year of platform access. No hidden fees or ongoing costs."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-[#1A1A1A] border-[#2A2A2A]">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-[#2A2A2A]/50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-[#E5E7EB]">{faq.question}</h3>
                    <svg 
                      className={`w-5 h-5 text-[#CCC1BE] transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-[#E5E7EB]/80 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Opportunity - Final Call to Action */}
      <section className="py-16 relative overflow-hidden bg-[#1D1D1D]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#232323] to-[#1A1A1A] opacity-80"></div>
        
        {/* Background glow elements */}
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#CCC1BE]/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#CCC1BE]/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-40 right-20 w-80 h-80 bg-[#CCC1BE]/5 rounded-full blur-3xl"></div>
        
        {/* Content container */}
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center relative z-20">
            <span className="inline-block bg-[#CCC1BE]/20 text-[#CCC1BE] px-6 py-2 rounded-full text-sm font-semibold mb-8">
              EXECUTIVE OPPORTUNITY
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#CCC1BE] via-[#E5E7EB] to-[#CCC1BE] bg-clip-text text-transparent mb-8">
              Ready to Transform Your Career?
            </h2>
            
            <p className="text-lg text-[#E5E7EB]/80 mb-10 leading-relaxed">
              Join thousands of successful executives who have transformed their careers with SmartFitter. Start earning R100k per month while building your international executive presence.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <Button 
                onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                className="flex-1 bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-black font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-[#CCC1BE]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Your Session Now
                </span>
              </Button>
              
              <Button 
                onClick={() => loginWithRedirect({ screen_hint: 'signup', connection: 'google-oauth2' })}
                className="flex-1 bg-[#FFFFFF] hover:bg-[#F5F5F5] text-[#000000] border-none flex items-center justify-center space-x-3 py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Sign Up with Google</span>
              </Button>
            </div>
            
            <div className="mt-10 text-[#E5E7EB]/60 text-sm">
              Join our network of over 5,000+ international executives worldwide
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="pt-16 pb-8 border-t border-[#2A2A2A] relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#CCC1BE]/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 top-10 w-40 h-40 bg-[#CCC1BE]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Logo and description */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <img 
                  src="/SmartFitter Assets logos /SmartFitter Icon no wings.svg" 
                  alt="SmartFitter Logo" 
                  className="h-10 w-auto mr-3" 
                />
                <span className="text-xl font-bold bg-gradient-to-r from-[#CCC1BE] to-[#E5E7EB] bg-clip-text text-transparent">SmartFitter</span>
              </div>
              <p className="text-[#E5E7EB]/70 mb-6">
                Transform your career with our exclusive executive coaching and networking platform. Join industry leaders worldwide.
              </p>
              <div className="mb-8">
                <Button 
                  onClick={() => loginWithRedirect({ screen_hint: 'signup', connection: 'google-oauth2' })}
                  className="bg-white hover:bg-gray-100 text-black flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Sign Up with Google</span>
                </Button>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-[#CCC1BE] font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-[#E5E7EB]/70 hover:text-[#CCC1BE] transition-colors duration-300">Home</Link></li>
                <li><Link to="/about" className="text-[#E5E7EB]/70 hover:text-[#CCC1BE] transition-colors duration-300">About Us</Link></li>
                <li><Link to="/faq" className="text-[#E5E7EB]/70 hover:text-[#CCC1BE] transition-colors duration-300">FAQ</Link></li>
                <li><Link to="/book" className="text-[#E5E7EB]/70 hover:text-[#CCC1BE] transition-colors duration-300">Book a Session</Link></li>
              </ul>
            </div>
            
            {/* Legal Links */}
            <div>
              <h4 className="text-[#CCC1BE] font-semibold mb-4 text-lg">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/terms" className="text-[#E5E7EB]/70 hover:text-[#CCC1BE] transition-colors duration-300">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-[#E5E7EB]/70 hover:text-[#CCC1BE] transition-colors duration-300">Privacy Policy</Link></li>
                <li><Link to="/nda" className="text-[#E5E7EB]/70 hover:text-[#CCC1BE] transition-colors duration-300">NDA</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="border-t border-[#2A2A2A] mt-12 pt-8 flex flex-col items-center space-y-4">
            <p className="text-[#E5E7EB]/50 text-sm text-center">© 2025 SmartFitter. All rights reserved.</p>
            
            <div className="flex space-x-4 items-center">
              {/* Social Icons */}
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-[#232323] hover:bg-[#2A2A2A] transition-colors duration-300" aria-label="LinkedIn">
                <svg className="w-5 h-5 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-[#232323] hover:bg-[#2A2A2A] transition-colors duration-300" aria-label="Twitter">
                <svg className="w-5 h-5 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-[#232323] hover:bg-[#2A2A2A] transition-colors duration-300" aria-label="Instagram">
                <svg className="w-5 h-5 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
