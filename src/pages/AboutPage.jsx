import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import NavigationPublic from '../components/NavigationPublic';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';

const AboutPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] overflow-x-hidden">
      {/* Navigation */}
      <NavigationPublic />
      
      {/* Hero Section - Mission Statement */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/Smartfitter Images/leadership-meeting-and-planning-with-a-black-man-2023-11-27-04-52-25-utc.png" 
            alt="Global leaders collaborating" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-[#E5E7EB] leading-tight">
            Building the Next Generation<br/>
            of Global Leaders
          </h1>
          
          <p className="text-xl md:text-2xl text-[#E5E7EB]/90 leading-relaxed max-w-3xl mx-auto">
            We are a curated community of international executives committed to fostering excellence, 
            creating unprecedented opportunities, and driving meaningful growth for professionals worldwide.
          </p>
        </div>
      </section>

      {/* Company History Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#CCC1BE] mb-6">Our Journey</h2>
            <p className="text-xl text-[#E5E7EB]/80 max-w-3xl mx-auto">
              Four decades of excellence in business, education, and construction management at the highest levels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] p-8 rounded-xl border border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#E5E7EB] mb-4">1980s - Foundation</h3>
                <p className="text-[#E5E7EB]/80 leading-relaxed">
                  Started with a vision to bridge the gap between traditional business practices and innovative educational approaches.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] p-8 rounded-xl border border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#E5E7EB] mb-4">2000s - Expansion</h3>
                <p className="text-[#E5E7EB]/80 leading-relaxed">
                  Expanded globally, establishing partnerships with leading institutions and corporations worldwide.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] p-8 rounded-xl border border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#E5E7EB] mb-4">2020s - Innovation</h3>
                <p className="text-[#E5E7EB]/80 leading-relaxed">
                  Launched our revolutionary high-tech educational platform, transforming how professionals learn and grow.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/Smartfitter Images/business-team-portrait-people-smile-in-profession-2023-11-27-04-53-53-utc.png" 
                alt="Professional business team collaboration" 
                className="w-full h-96 object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Core Philosophy Section */}
      <section className="py-20 px-6 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#CCC1BE] mb-6">Our Core Philosophy</h2>
            <p className="text-xl text-[#E5E7EB]/80 max-w-3xl mx-auto">
              Built on four foundational pillars that drive everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-[#CCC1BE]/10 rounded-full flex items-center justify-center group-hover:bg-[#CCC1BE]/20 transition-colors">
                  <svg className="w-8 h-8 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-4">Excellence</h3>
                <p className="text-[#E5E7EB]/70 leading-relaxed">
                  Four decades of proven expertise in business, education, and construction management.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-[#CCC1BE]/10 rounded-full flex items-center justify-center group-hover:bg-[#CCC1BE]/20 transition-colors">
                  <svg className="w-8 h-8 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-4">Innovation</h3>
                <p className="text-[#E5E7EB]/70 leading-relaxed">
                  Revolutionary high-tech educational platform transforming professional development.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-[#CCC1BE]/10 rounded-full flex items-center justify-center group-hover:bg-[#CCC1BE]/20 transition-colors">
                  <svg className="w-8 h-8 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-4">Growth</h3>
                <p className="text-[#E5E7EB]/70 leading-relaxed">
                  Fostering unprecedented opportunities for professional and personal development.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-[#CCC1BE]/10 rounded-full flex items-center justify-center group-hover:bg-[#CCC1BE]/20 transition-colors">
                  <svg className="w-8 h-8 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-4">Impact</h3>
                <p className="text-[#E5E7EB]/70 leading-relaxed">
                  Creating meaningful change in communities through education and opportunity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
        
      {/* Impact Metrics Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#CCC1BE] mb-6">Our Global Impact</h2>
            <p className="text-xl text-[#E5E7EB]/80 max-w-3xl mx-auto">
              Transforming lives and communities through education and opportunity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all duration-300 text-center group">
              <CardContent className="p-8">
                <div className="text-5xl md:text-6xl font-bold text-[#CCC1BE] mb-4 group-hover:scale-110 transition-transform">60K+</div>
                <h3 className="text-xl font-semibold text-[#E5E7EB] mb-2">Years of Education</h3>
                <p className="text-[#E5E7EB]/70">Collective educational experience delivered to professionals worldwide</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all duration-300 text-center group">
              <CardContent className="p-8">
                <div className="text-5xl md:text-6xl font-bold text-[#CCC1BE] mb-4 group-hover:scale-110 transition-transform">R2B+</div>
                <h3 className="text-xl font-semibold text-[#E5E7EB] mb-2">Worth of Education</h3>
                <p className="text-[#E5E7EB]/70">Total value of educational resources and opportunities provided</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all duration-300 text-center group">
              <CardContent className="p-8">
                <div className="text-5xl md:text-6xl font-bold text-[#CCC1BE] mb-4 group-hover:scale-110 transition-transform">20K+</div>
                <h3 className="text-xl font-semibold text-[#E5E7EB] mb-2">Courses Available</h3>
                <p className="text-[#E5E7EB]/70">Comprehensive curriculum covering every aspect of professional development</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
        
      {/* Leadership Team Section */}
      <section className="py-20 px-6 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#CCC1BE] mb-6">Leadership Team</h2>
            <p className="text-xl text-[#E5E7EB]/80 max-w-3xl mx-auto">
              Visionary leaders with decades of experience driving innovation and excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-6 border-2 border-[#CCC1BE]/20 group-hover:border-[#CCC1BE]/50 transition-colors">
                  <AvatarImage src="/api/placeholder/150/150" alt="CEO" />
                  <AvatarFallback className="bg-[#CCC1BE]/10 text-[#CCC1BE] text-xl font-bold">CEO</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-2">Chief Executive Officer</h3>
                <p className="text-[#CCC1BE] mb-4">Visionary Leadership</p>
                <p className="text-[#E5E7EB]/70 text-sm leading-relaxed">
                  Leading the organization with four decades of experience in business transformation and educational innovation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-6 border-2 border-[#CCC1BE]/20 group-hover:border-[#CCC1BE]/50 transition-colors">
                  <AvatarImage src="/api/placeholder/150/150" alt="CTO" />
                  <AvatarFallback className="bg-[#CCC1BE]/10 text-[#CCC1BE] text-xl font-bold">CTO</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-2">Chief Technology Officer</h3>
                <p className="text-[#CCC1BE] mb-4">Innovation Pioneer</p>
                <p className="text-[#E5E7EB]/70 text-sm leading-relaxed">
                  Driving technological advancement and platform development with expertise in educational technology.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-6 border-2 border-[#CCC1BE]/20 group-hover:border-[#CCC1BE]/50 transition-colors">
                  <AvatarImage src="/api/placeholder/150/150" alt="COO" />
                  <AvatarFallback className="bg-[#CCC1BE]/10 text-[#CCC1BE] text-xl font-bold">COO</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-[#E5E7EB] mb-2">Chief Operating Officer</h3>
                <p className="text-[#CCC1BE] mb-4">Operational Excellence</p>
                <p className="text-[#E5E7EB]/70 text-sm leading-relaxed">
                  Ensuring seamless operations and member experience across all platforms and services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="w-20 h-20 mx-auto mb-8 bg-[#CCC1BE]/10 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#CCC1BE] mb-6">Saving Lives Through Education</h2>
            <p className="text-xl text-[#E5E7EB]/80 leading-relaxed max-w-3xl mx-auto mb-12">
              By providing education and opportunities, we're combating social issues and creating real change in communities worldwide. Every professional we empower becomes a catalyst for positive transformation.
            </p>
          </div>
          
          {/* QR Code */}
          <div className="mb-12">
            <div className="bg-white p-6 rounded-xl inline-block shadow-2xl">
              <div className="w-40 h-40 bg-black flex items-center justify-center text-white text-sm font-mono">
                QR CODE<br/>PLACEHOLDER
              </div>
            </div>
            <p className="text-[#E5E7EB]/60 mt-4">Scan to learn more about our mission</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-6">
            Ready to Join Our Mission?
          </h2>
          <p className="text-xl text-[#E5E7EB]/80 mb-12 max-w-2xl mx-auto">
            Become part of a global community of leaders committed to excellence, innovation, and meaningful impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={() => loginWithRedirect()}
              className="bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-black font-semibold py-4 px-8 text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Join Our Community
            </Button>
            
            <Link to="/">
              <Button 
                variant="outline" 
                className="border-[#CCC1BE] text-[#CCC1BE] hover:bg-[#CCC1BE] hover:text-black py-4 px-8 text-lg rounded-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
