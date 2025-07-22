import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { FcGoogle } from 'react-icons/fc';
import { Loader2 } from 'lucide-react';

const LoginForm = ({ onSuccess }) => {
  const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Use Auth0's Universal Login with custom parameters
      await loginWithRedirect({
        authorizationParams: {
          connection: 'Username-Password-Authentication',
          login_hint: email,
          redirect_uri: window.location.origin,
          scope: 'openid profile email',
          ui_locales: 'en',
          // Add any additional parameters you need
        },
        // This will pre-fill the email field in the Auth0 Universal Login
        login_hint: email,
      });
      
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to log in. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection: 'google-oauth2',
          redirect_uri: window.location.origin,
          scope: 'openid profile email',
          // Add any additional parameters needed for Google login
          access_type: 'offline',
          prompt: 'select_account',
        },
      });
    } catch (err) {
      console.error('Google login error:', err);
      setError('Failed to login with Google. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="text-muted-foreground">Enter your credentials to access your account</p>
      </div>

      {error && (
        <div className="bg-destructive/15 p-3 rounded-md text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              className="text-sm text-primary hover:underline"
              onClick={() => {
                // Handle forgot password
                loginWithRedirect({
                  screen_hint: 'forgot_password',
                });
              }}
            >
              Forgot password?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        className="w-full flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <FcGoogle className="h-5 w-5" />
        <span>Google</span>
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <button
          type="button"
          className="text-primary hover:underline"
          onClick={() => {
            loginWithRedirect({
              screen_hint: 'signup',
              connection: 'Username-Password-Authentication',
            });
          }}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
