require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Import route handlers
const usersRoutes = require('./routes/users');
const documentsRoutes = require('./routes/documents');
const calendarRoutes = require('./routes/calendar');
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Auth0 JWT validation middleware
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.VITE_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: 'https://smartfitter-api.com',
  issuer: `https://${process.env.VITE_AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/users', checkJwt, usersRoutes);
app.use('/api/documents', checkJwt, documentsRoutes);
app.use('/api/calendar', checkJwt, calendarRoutes);
app.use('/api/admin', checkJwt, adminRoutes);
app.use('/api/public', publicRoutes); // No JWT check for public endpoints

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid or missing token' });
  }
  
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`SmartFitter API running on port ${PORT}`);
});
