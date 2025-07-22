const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Middleware to check admin role
const checkAdminRole = async (req, res, next) => {
  try {
    const auth0UserId = req.auth.sub;
    
    // Query the user's profile to check for admin role
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('auth0_user_id', auth0UserId)
      .single();
      
    if (error || !data) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (!data.is_admin) {
      return res.status(403).json({ message: 'Admin privileges required' });
    }
    
    next();
  } catch (error) {
    console.error('Error checking admin role:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Apply admin role check to all admin routes
router.use(checkAdminRole);

/**
 * GET /api/admin/users
 * Get list of all users for admin management
 */
router.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Error fetching users' });
    }
    
    return res.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/admin/users/:userId/approve
 * Approve a user after their booking to change status from 'booked_session' to 'accepted'
 */
router.post('/users/:userId/approve', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Update user status to 'accepted'
    const { data, error } = await supabase
      .from('profiles')
      .update({ user_status: 'accepted' })
      .eq('auth0_user_id', userId)
      .select();
      
    if (error) {
      console.error('Error approving user:', error);
      return res.status(500).json({ message: 'Error approving user' });
    }
    
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.json({
      message: 'User approved successfully',
      user: data[0]
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/admin/documents
 * Get all documents for admin management
 */
router.get('/documents', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('document_type', { ascending: true })
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching documents:', error);
      return res.status(500).json({ message: 'Error fetching documents' });
    }
    
    return res.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/admin/documents
 * Create a new document
 */
router.post('/documents', async (req, res) => {
  try {
    const { document_type, version, title, content_markdown, is_active } = req.body;
    
    // Validate required fields
    if (!document_type || !version || !title || !content_markdown) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // If the new document is active, deactivate all other documents of the same type
    if (is_active) {
      const { error: updateError } = await supabase
        .from('documents')
        .update({ is_active: false })
        .eq('document_type', document_type)
        .eq('is_active', true);
        
      if (updateError) {
        console.error('Error deactivating existing documents:', updateError);
        return res.status(500).json({ message: 'Error deactivating existing documents' });
      }
    }
    
    // Create the new document
    const { data, error } = await supabase
      .from('documents')
      .insert({
        document_type,
        version,
        title,
        content_markdown,
        is_active: is_active === undefined ? true : is_active
      })
      .select();
      
    if (error) {
      console.error('Error creating document:', error);
      return res.status(500).json({ message: 'Error creating document' });
    }
    
    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUT /api/admin/documents/:id
 * Update an existing document
 */
router.put('/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content_markdown, is_active } = req.body;
    
    // Get the existing document to check its type
    const { data: existingDoc, error: fetchError } = await supabase
      .from('documents')
      .select('document_type')
      .eq('id', id)
      .single();
      
    if (fetchError || !existingDoc) {
      console.error('Error fetching document:', fetchError);
      return res.status(404).json({ message: 'Document not found' });
    }
    
    // If activating this document, deactivate all others of the same type
    if (is_active) {
      const { error: updateError } = await supabase
        .from('documents')
        .update({ is_active: false })
        .eq('document_type', existingDoc.document_type)
        .eq('is_active', true)
        .neq('id', id);
        
      if (updateError) {
        console.error('Error deactivating existing documents:', updateError);
        return res.status(500).json({ message: 'Error deactivating existing documents' });
      }
    }
    
    // Update the document
    const { data, error } = await supabase
      .from('documents')
      .update({
        title: title,
        content_markdown: content_markdown,
        is_active: is_active
      })
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Error updating document:', error);
      return res.status(500).json({ message: 'Error updating document' });
    }
    
    return res.json(data[0]);
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
