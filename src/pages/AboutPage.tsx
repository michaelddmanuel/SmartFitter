// No need for Link import in this page
import { useAuth0 } from '@auth0/auth0-react';

// Import Shadcn UI Components
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const AboutPage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  
  return (
    <div className="space-y-10 py-6">
      {/* Hero Section */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-center">
          About <span className="text-primary">SmartFitter</span>
        </h1>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mt-6">
          SmartFitter is a comprehensive fitness platform designed to help you achieve your health and wellness goals through personalized guidance and expert support.
        </p>
      </div>
      
      {/* Our Mission */}
      <Card className="border-primary/20 bg-card/50">
        <CardHeader>
          <CardTitle className="text-center">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground">
            At SmartFitter, we're committed to revolutionizing the fitness industry by making personalized fitness accessible to everyone. We believe that everyone deserves a fitness program tailored to their unique body, goals, and lifestyle.
          </p>
        </CardContent>
      </Card>
      
      {/* Tabs Section */}
      <Tabs defaultValue="platform" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="platform">Our Platform</TabsTrigger>
          <TabsTrigger value="team">Our Team</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
        </TabsList>
        
        <TabsContent value="platform" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <CardTitle>Personalized Fitness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every fitness plan on SmartFitter is tailor-made to match your specific body type, fitness level, and personal goals.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <CardTitle>Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Work directly with certified fitness professionals who provide expert advice and guidance throughout your fitness journey.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track your fitness journey with detailed analytics and visualizations that show your improvements over time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join a supportive community of fitness enthusiasts who motivate and inspire each other to achieve their goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <CardTitle>Certified Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team consists of certified fitness trainers, nutritionists, and wellness experts with years of experience in the fitness industry.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <CardTitle>Tech Innovators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our tech team combines fitness expertise with cutting-edge technology to create a platform that delivers personalized fitness solutions.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-center text-muted-foreground mt-6">
            We're passionate about helping people achieve their fitness goals and live healthier lives.
          </p>
        </TabsContent>
        
        <TabsContent value="technology" className="space-y-6">
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Built with Modern Technologies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-card/80 border border-border p-4 rounded-lg hover:bg-card transition-colors text-center">
                <div className="font-medium">React 19</div>
                <div className="text-muted-foreground text-sm">UI Framework</div>
              </div>
              <div className="bg-card/80 border border-border p-4 rounded-lg hover:bg-card transition-colors text-center">
                <div className="font-medium">TypeScript</div>
                <div className="text-muted-foreground text-sm">Type Safety</div>
              </div>
              <div className="bg-card/80 border border-border p-4 rounded-lg hover:bg-card transition-colors text-center">
                <div className="font-medium">Tailwind CSS</div>
                <div className="text-muted-foreground text-sm">Styling</div>
              </div>
              <div className="bg-card/80 border border-border p-4 rounded-lg hover:bg-card transition-colors text-center">
                <div className="font-medium">Auth0</div>
                <div className="text-muted-foreground text-sm">Authentication</div>
              </div>
              <div className="bg-card/80 border border-border p-4 rounded-lg hover:bg-card transition-colors text-center">
                <div className="font-medium">Shadcn/UI</div>
                <div className="text-muted-foreground text-sm">Component Library</div>
              </div>
              <div className="bg-card/80 border border-border p-4 rounded-lg hover:bg-card transition-colors text-center">
                <div className="font-medium">Vite</div>
                <div className="text-muted-foreground text-sm">Build Tool</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center space-y-4 mt-12">
          <h2 className="text-2xl font-semibold">Ready to Start Your Fitness Journey?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join SmartFitter today and experience personalized fitness like never before.
          </p>
          <div className="pt-4">
            <Button 
              onClick={() => loginWithRedirect()}
              className="bg-primary hover:bg-primary/90"
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
