const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

/**
 * GET /api/users/profile
 * Fetches the current user's profile from our database
 */
router.get('/profile', async (req, res) => {
  try {
    // Extract user ID from Auth0 token
    const auth0UserId = req.auth.sub;

    // Query the database for user profile
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('auth0_user_id', auth0UserId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return res.status(500).json({ message: 'Error fetching profile' });
    }

    if (!data) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/users/profile
 * Creates or updates a user profile in our database, linking it to the Auth0 user ID
 */
router.post('/profile', async (req, res) => {
  try {
    // Extract user ID from Auth0 token
    const auth0UserId = req.auth.sub;
    
    // Get user info from request body
    const { email, full_name, avatar_url, phone_number } = req.body;
    
    // Check for referral slug in the request
    const { ref } = req.body;
    let referred_by_user_id = null;
    
    // If a referral code was provided, look up the referring user
    if (ref) {
      const { data: referrer } = await supabase
        .from('profiles')
        .select('auth0_user_id')
        .eq('unique_share_slug', ref)
        .single();
        
      if (referrer) {
        referred_by_user_id = referrer.auth0_user_id;
      }
    }

    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('auth0_user_id', auth0UserId)
      .single();

    if (existingProfile) {
      // Update existing profile
      const { data, error } = await supabase
        .from('profiles')
        .update({
          email: email || existingProfile.email,
          full_name: full_name || existingProfile.full_name,
          avatar_url: avatar_url || existingProfile.avatar_url,
          phone_number: phone_number || existingProfile.phone_number,
          updated_at: new Date().toISOString()
        })
        .eq('auth0_user_id', auth0UserId)
        .select();

      if (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: 'Error updating profile' });
      }

      return res.json(data[0]);
    } else {
      // Create new profile
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          auth0_user_id,
          email,
          full_name,
          avatar_url,
          phone_number,
          referred_by_user_id,
          // Generate a random slug for sharing
          unique_share_slug: Math.random().toString(36).substring(2, 10)
        })
        .select();

      if (error) {
        console.error('Error creating profile:', error);
        return res.status(500).json({ message: 'Error creating profile' });
      }

      return res.status(201).json(data[0]);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
