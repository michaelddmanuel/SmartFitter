import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useProfile } from '../context/ProfileContext';
import { Link } from 'react-router-dom';

const HomePageNew = () => {
  const { isAuthenticated, user } = useAuth0();
  const { profile } = useProfile();

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col pb-6">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-[#E5E7EB]">LOGO</span>
        </div>
        <button className="text-[#E5E7EB]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 space-y-6 overflow-y-auto">
        {/* Welcome Section */}
        <section className="pt-4 pb-2">
          <h2 className="text-lg text-[#E5E7EB]">Welcome, {user?.given_name || user?.name?.split(' ')[0] || 'John'}!</h2>
          <p className="text-sm text-[#CCC1BE]/70">Your journey to becoming an international executive starts here.</p>
        </section>

        {/* Video Section */}
        <section className="space-y-4">
          <div className="bg-[#232323] p-4 rounded-lg relative">
            <div className="aspect-video flex items-center justify-center bg-[#2A2A2A] rounded-md mb-2">
              <div className="w-12 h-12 bg-[#CCC1BE]/80 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1A1A1A" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              </div>
            </div>
            <h3 className="text-[#E5E7EB] font-medium">SmartFitter Introduction</h3>
            <p className="text-xs text-[#CCC1BE]/70">Learn about our mission and vision</p>
          </div>
          
          <div className="bg-[#232323] p-4 rounded-lg relative">
            <div className="aspect-video flex items-center justify-center bg-[#2A2A2A] rounded-md mb-2">
              <div className="w-12 h-12 bg-[#CCC1BE]/80 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1A1A1A" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              </div>
            </div>
            <h3 className="text-[#E5E7EB] font-medium">Success Stories</h3>
            <p className="text-xs text-[#CCC1BE]/70">Hear from our members</p>
          </div>
        </section>
        
        {/* Investment Features */}
        <section className="pt-2">
          <h3 className="text-[#E5E7EB] font-medium mb-2">R20K Investment Includes</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 mt-0.5 rounded-full border border-[#CCC1BE] flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-[#CCC1BE] rounded-full"></div>
              </div>
              <p className="text-sm text-[#E5E7EB]">Full access to our executive network</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 mt-0.5 rounded-full border border-[#CCC1BE] flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-[#CCC1BE] rounded-full"></div>
              </div>
              <p className="text-sm text-[#E5E7EB]">Personalized career development plan</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 mt-0.5 rounded-full border border-[#CCC1BE] flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-[#CCC1BE] rounded-full"></div>
              </div>
              <p className="text-sm text-[#E5E7EB]">Monthly mentorship sessions</p>
            </div>
          </div>
        </section>

        {/* Path Options */}
        <section className="pt-2">
          <h3 className="text-[#E5E7EB] font-medium mb-3">Your Path Options</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 bg-[#232323] p-3 rounded-lg">
              <div className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[#E5E7EB] font-medium">Career Path</h4>
                <p className="text-xs text-[#CCC1BE]/70">Advance your corporate career</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-[#232323] p-3 rounded-lg">
              <div className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 01-.75.75h-.75m-6-1.5H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[#E5E7EB] font-medium">Business Path</h4>
                <p className="text-xs text-[#CCC1BE]/70">Build and scale your own venture</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-[#232323] p-3 rounded-lg">
              <div className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <div>
                <h4 className="text-[#E5E7EB] font-medium">Education Path</h4>
                <p className="text-xs text-[#CCC1BE]/70">Enhance your executive education</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="pt-4">
          <h3 className="text-[#E5E7EB] font-medium mb-3">Member Testimonials</h3>
          
          <div className="space-y-3">
            <div className="bg-[#232323] p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#2A2A2A] overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-[#CCC1BE] text-xs">MS</div>
                </div>
                <div>
                  <h4 className="text-sm text-[#E5E7EB]">Michael S.</h4>
                  <p className="text-xs text-[#CCC1BE]/60">CEO, Tech Startup</p>
                </div>
              </div>
              <p className="text-sm text-[#CCC1BE]/70">"The network and opportunities provided were invaluable to my career growth."</p>
            </div>
            
            <div className="bg-[#232323] p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#2A2A2A] overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-[#CCC1BE] text-xs">SL</div>
                </div>
                <div>
                  <h4 className="text-sm text-[#E5E7EB]">Sarah L.</h4>
                  <p className="text-xs text-[#CCC1BE]/60">Operations Director</p>
                </div>
              </div>
              <p className="text-sm text-[#CCC1BE]/70">"The mentorship and guidance helped me secure my dream role."</p>
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="pt-4">
          <h3 className="text-[#E5E7EB] font-medium mb-3">Frequently Asked Questions</h3>
          
          <div className="space-y-3">
            <div className="bg-[#232323] p-3 rounded-lg">
              <h4 className="text-sm text-[#E5E7EB] mb-1">How long is the program?</h4>
              <p className="text-xs text-[#CCC1BE]/70">The program runs for 12 months with monthly sessions and ongoing support.</p>
            </div>
            
            <div className="bg-[#232323] p-3 rounded-lg">
              <h4 className="text-sm text-[#E5E7EB] mb-1">What support is included?</h4>
              <p className="text-xs text-[#CCC1BE]/70">You get 1:1 mentoring, group sessions, and network access.</p>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="pt-6 pb-8">
          <h3 className="text-center text-[#E5E7EB] font-medium mb-3">Ready to Start Your Journey?</h3>
          
          <Link to="/book">
            <Button className="w-full bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-[#1A1A1A] py-2 h-auto">
              Book Discovery Session
            </Button>
          </Link>
        </section>

        {/* Footer Navigation */}
        <footer className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#2A2A2A] py-2 px-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span className="text-[#CCC1BE] text-xs">Home</span>
            </div>
            
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE/60" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
              <span className="text-[#CCC1BE]/60 text-xs">Stats</span>
            </div>
            
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE/60" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg>
              <span className="text-[#CCC1BE]/60 text-xs">Refer</span>
            </div>
            
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE/60" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <span className="text-[#CCC1BE]/60 text-xs">Settings</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomePageNew;
