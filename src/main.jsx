import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';
import DebugHider from './components/DebugHider';

// Get Auth0 credentials from environment variables
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const scope = import.meta.env.VITE_AUTH0_SCOPE;
const callbackUrl = import.meta.env.VITE_AUTH0_CALLBACK_URL || window.location.origin;
const logoutUrl = import.meta.env.VITE_AUTH0_LOGOUT_URL || window.location.origin;

// Validate required environment variables
if (!domain || !clientId) {
  throw new Error('Missing required Auth0 configuration. Please check your .env file.');
}

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('Auth0 Configuration:', {
    domain,
    clientId: '***', // Never log actual client ID
    audience,
    scope,
    callbackUrl,
    logoutUrl
  });
}

// Configure Auth0 with recommended settings for SPA
const auth0Config = {
  domain,
  clientId,
  authorizationParams: {
    redirect_uri: callbackUrl,
    audience,
    scope,
    connection: 'Username-Password-Authentication',
  },
  // Use local storage for token storage
  cacheLocation: 'localstorage',
  // Enable refresh tokens
  useRefreshTokens: true,
  // Important for SPA security
  sessionCheckExpiryDays: 1,
  // Required for Auth0 SPA SDK
  useRefreshTokensFallback: false,
  // Enable debug mode for development
  enableDebug: import.meta.env.DEV,
  // Configure logout URL
  logoutParams: {
    returnTo: logoutUrl,
  },
  // Disable legacy authentication methods
  legacySameSiteCookie: false,
  // Configure the token refresh behavior
  authorizeTimeoutInSeconds: 60,
  // Enable the new transaction manager
  useCookiesForTransactions: true,
  // Use form data for token requests
  useFormData: true
};

// Debug logging (only in development)
if (import.meta.env.DEV) {
  console.log('Auth0 Configuration:', {
    domain: auth0Config.domain,
    clientId: '***', // Redacted for security
    authorizationParams: {
      ...auth0Config.authorizationParams,
      redirect_uri: auth0Config.authorizationParams.redirect_uri,
      audience: auth0Config.authorizationParams.audience,
      scope: auth0Config.authorizationParams.scope,
    },
    cacheLocation: auth0Config.cacheLocation,
    useRefreshTokens: auth0Config.useRefreshTokens,
    cookieDomain: auth0Config.cookieDomain,
    useCookiesForTransactions: auth0Config.useCookiesForTransactions,
    useFormData: auth0Config.useFormData
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: callbackUrl,
        audience: audience,
        scope: scope,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      useRefreshTokensFallback={false}
      onRedirectCallback={(appState) => {
        // Handle the redirect after login
        if (appState?.returnTo) {
          window.history.replaceState({}, document.title, appState.returnTo);
        }
      }}
      // Enable debug mode in development
      {...(import.meta.env.DEV ? { debug: true } : {})}
      // Configure logout URL
      logoutParams={{
        returnTo: logoutUrl,
      }}
    >
      <DebugHider />
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
