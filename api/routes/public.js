const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

/**
 * GET /api/public/profile/:slug
 * Get a public profile by its unique share slug - No authentication required
 */
router.get('/profile/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    if (!slug) {
      return res.status(400).json({ message: 'Profile slug is required' });
    }
    
    // Get the public profile data
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        full_name,
        avatar_url,
        digital_card_tagline,
        unique_share_slug
      `)
      .eq('unique_share_slug', slug)
      .eq('user_status', 'active_member')
      .single();
      
    if (error || !data) {
      console.error('Error fetching public profile:', error);
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    return res.json({
      profile: data,
      referral_code: slug
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
