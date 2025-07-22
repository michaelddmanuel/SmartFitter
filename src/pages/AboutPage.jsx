import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#CCC1BE] tracking-tight">
            WHO WE ARE
          </h1>
        </header>
        
        {/* Hero Image */}
        <div className="w-full h-64 md:h-80 bg-[#2A2A2A] rounded-lg overflow-hidden">
          <img 
            src="/SmartFitter Assets Images /networking event.jpeg" 
            alt="Business meeting with professionals around a conference table" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Four Decades of Excellence */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="text-[#CCC1BE]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#E5E7EB]">Four Decades of Excellence</h2>
          </div>
          <p className="text-[#E5E7EB]/80 leading-relaxed">
            We bring extensive experience from Business, Education & Construction Management Arenas at the highest levels.
          </p>
        </section>
        
        {/* Revolutionary Education */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="text-[#CCC1BE]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#E5E7EB]">Revolutionary Education</h2>
          </div>
          <p className="text-[#E5E7EB]/80 leading-relaxed">
            Our highly disruptive, "High Tech" Educational Product is the result of decades of expertise.
          </p>
        </section>
        
        {/* Our Impact Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-[#CCC1BE]">Our Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 60,000 Years of Education */}
            <Card className="bg-[#232323] border-[#2A2A2A] text-center">
              <CardContent className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-2">60,000</div>
                <p className="text-[#E5E7EB]/70 text-sm">Years of Education</p>
              </CardContent>
            </Card>
            
            {/* R2B Worth of Education */}
            <Card className="bg-[#232323] border-[#2A2A2A] text-center">
              <CardContent className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-2">R2B</div>
                <p className="text-[#E5E7EB]/70 text-sm">Worth of Education</p>
              </CardContent>
            </Card>
            
            {/* 20,000 Courses Available */}
            <Card className="bg-[#232323] border-[#2A2A2A] text-center">
              <CardContent className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-2">20,000</div>
                <p className="text-[#E5E7EB]/70 text-sm">Courses Available</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Save Lives Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="text-[#CCC1BE]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#E5E7EB]">Save Lives</h2>
          </div>
          <p className="text-[#E5E7EB]/80 leading-relaxed">
            By providing education and opportunities, we're combating social issues and creating real change in communities.
          </p>
        </section>
        
        {/* QR Code Section */}
        <section className="flex flex-col items-center space-y-6 py-8">
          <div className="bg-white p-4 rounded-lg">
            {/* QR Code placeholder - you can replace this with an actual QR code component */}
            <div className="w-32 h-32 bg-black flex items-center justify-center text-white text-xs">
              QR CODE
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <div className="flex flex-col items-center space-y-6 py-8">
          <Link to="/" className="w-full max-w-md">
            <Button className="w-full bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-black font-semibold py-4 text-lg rounded-lg">
              Join Our Mission
            </Button>
          </Link>
        </div>
        
        {/* Footer Navigation */}
        <footer className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#2A2A2A] py-2 px-6 md:hidden">
          <div className="flex justify-between items-center">
            <Link to="/home" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE/60" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span className="text-[#CCC1BE]/60 text-xs">Home</span>
            </Link>
            
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <span className="text-[#CCC1BE] text-xs">About</span>
            </div>
            
            <Link to="/profile" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE/60" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <span className="text-[#CCC1BE]/60 text-xs">Profile</span>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
