import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Import Shadcn UI Components
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const HomePage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  
  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-amber-400 to-primary/80">
          Welcome to SmartFitter
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your personalized fitness journey starts here. SmartFitter provides tailored workout plans, expert guidance, and a supportive community.
        </p>
        {!isAuthenticated && (
          <div className="pt-4">
            <Button 
              onClick={() => loginWithRedirect()}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto"
              size="lg"
            >
              Get Started Today
            </Button>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-primary/20 bg-card transition-all hover:border-primary/50 hover:shadow-md">
          <CardHeader>
            <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <CardTitle>Personalized Plans</CardTitle>
            <CardDescription>
              Custom fitness programs designed for your unique needs and goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our AI-driven algorithm creates a workout and nutrition plan tailored to your body type, fitness level, and personal goals.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-card transition-all hover:border-primary/50 hover:shadow-md">
          <CardHeader>
            <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <CardTitle>Expert Consultation</CardTitle>
            <CardDescription>
              One-on-one sessions with certified fitness professionals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Get professional guidance from our team of certified trainers, nutritionists, and health experts to optimize your fitness journey.
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card transition-all hover:border-primary/50 hover:shadow-md">
          <CardHeader>
            <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <CardTitle>Community Support</CardTitle>
            <CardDescription>
              Join a community of like-minded fitness enthusiasts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Connect with other members, share experiences, participate in challenges, and stay motivated throughout your fitness journey.
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* How It Works Section */}
      <div className="pt-8">
        <h2 className="text-2xl font-semibold mb-8 text-center">How It Works</h2>
        
        <ol className="relative border-l border-border ml-3 space-y-10">
          <li className="mb-6 ml-8">
            <span className="absolute flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full -left-5 ring-4 ring-background">
              <span className="text-primary font-bold">1</span>
            </span>
            <h3 className="font-medium text-xl mb-2">Sign Up & Complete Profile</h3>
            <p className="text-muted-foreground">Create your account and tell us about your fitness background, goals, and preferences.</p>
          </li>
          
          <li className="mb-6 ml-8">
            <span className="absolute flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full -left-5 ring-4 ring-background">
              <span className="text-primary font-bold">2</span>
            </span>
            <h3 className="font-medium text-xl mb-2">Schedule Consultation</h3>
            <p className="text-muted-foreground">Book a one-on-one session with our fitness experts to discuss your specific needs.</p>
          </li>
          
          <li className="mb-6 ml-8">
            <span className="absolute flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full -left-5 ring-4 ring-background">
              <span className="text-primary font-bold">3</span>
            </span>
            <h3 className="font-medium text-xl mb-2">Receive Your Custom Plan</h3>
            <p className="text-muted-foreground">Get a personalized fitness program designed specifically for your body and goals.</p>
          </li>
          
          <li className="ml-8">
            <span className="absolute flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full -left-5 ring-4 ring-background">
              <span className="text-primary font-bold">4</span>
            </span>
            <h3 className="font-medium text-xl mb-2">Track Progress & Adapt</h3>
            <p className="text-muted-foreground">Monitor your results and adjust your program as needed for continued success.</p>
          </li>
        </ol>
      </div>
      
      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center space-y-4 mt-12">
          <h2 className="text-2xl font-semibold">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join SmartFitter today and take the first step toward achieving your fitness goals with personalized guidance and support.
          </p>
          <div className="pt-4 flex gap-4 justify-center">
            <Button 
              onClick={() => loginWithRedirect()}
              className="bg-primary hover:bg-primary/90"
            >
              Sign Up Now
            </Button>
            <Button 
              variant="outline" 
              asChild
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
