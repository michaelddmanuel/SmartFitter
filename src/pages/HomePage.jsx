import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useProfile } from '../context/ProfileContext';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth0();
  const { profile } = useProfile();

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col">

      {/* Main Content */}
      <main className="flex-1 px-4 space-y-6 overflow-y-auto">
        {/* Profile Card - Only show if authenticated */}
        {isAuthenticated && (
          <Card className="mt-6 border-border/40 bg-card/70">
            <CardContent className="pt-6 px-4">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2 overflow-hidden">
                  {user?.picture ? (
                    <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  {profile?.full_name || user?.name || 'SmartFitter Member'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {profile?.digital_card_tagline || 'Executive Partner'}
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="text-foreground">{profile?.phone_number || '081 752 2393'}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-foreground">{user?.email || 'contact@smartfitter.com'}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <span className="text-foreground">www.smartfitter.com</span>
                </div>
              </div>
              
              {/* Video Links */}
              <div className="space-y-3">
                <h3 className="font-medium text-foreground">Watch Our Videos</h3>
                <a href="#" className="flex items-center space-x-2 bg-card/80 border border-border/20 p-3 rounded-md">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  <span className="text-sm text-foreground">SmartFitter Introduction</span>
                </a>
                <a href="#" className="flex items-center space-x-2 bg-card/80 border border-border/20 p-3 rounded-md">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  <span className="text-sm text-foreground">Success Stories</span>
                </a>
              </div>

              <Button className="w-full mt-4 bg-muted text-foreground hover:bg-muted/80">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186z" />
                </svg>
                Share Profile
              </Button>
            </CardContent>
          </Card>
        )}
        
        {/* Hero Section */}
        <section className="pt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-6">
            BECOME AN<br />INTERNATIONAL<br />EXECUTIVE
          </h1>
          
          <div className="w-full h-48 md:h-64 bg-muted/30 rounded-lg mb-6 overflow-hidden">
            <img 
              src="/SmartFitter Assets Images /business executive.jpeg" 
              alt="Business Executive" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <Card className="border-border/40 bg-card/70 mb-6">
            <CardContent className="p-4">
              <h2 className="text-xl font-bold text-primary mb-2">R20k INVESTMENT</h2>
              <p className="text-sm text-muted-foreground">
                Get your own registered business, professional website, and comprehensive training package
              </p>
            </CardContent>
          </Card>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              We take you to Executive International Level:
            </h2>
            
            <div className="space-y-3 mt-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <span className="text-foreground">Career Path</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 01-.75.75h-.75m-6-1.5H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                </div>
                <span className="text-foreground">Business Path</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <span className="text-foreground">Education Path</span>
              </div>
            </div>
          </div>
          
          {/* Earnings Card */}
          <Card className="border-border/40 bg-card/70 mb-8">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium text-foreground">Monthly Earnings</h3>
                <span className="text-2xl font-bold text-primary">R100k+</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Starting from day one while receiving local training
              </p>
            </CardContent>
          </Card>
          
          {/* CTA Button */}
          <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
            Start Your Journey
          </Button>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
