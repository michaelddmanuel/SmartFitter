const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

/**
 * GET /api/documents/:type
 * Get the active document of a specific type (nda or member_contract)
 */
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    
    // Validate document type
    if (!['nda', 'member_contract'].includes(type)) {
      return res.status(400).json({ message: 'Invalid document type' });
    }

    // Get the active document of the specified type
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('document_type', type)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching document:', error);
      return res.status(500).json({ message: 'Error fetching document' });
    }

    if (!data) {
      return res.status(404).json({ message: 'Document not found' });
    }

    return res.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/documents/sign
 * Record a document signature in the database
 */
router.post('/sign', async (req, res) => {
  try {
    // Extract user ID from Auth0 token
    const auth0UserId = req.auth.sub;
    
    // Get document ID from request body
    const { documentId, documentType } = req.body;
    
    if (!documentId || !documentType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Start a Supabase transaction
    const { error: transactionError } = await supabase.rpc('begin');
    
    if (transactionError) {
      console.error('Error starting transaction:', transactionError);
      return res.status(500).json({ message: 'Error processing signature' });
    }
    
    try {
      // Record the signature
      const { data: signature, error: signatureError } = await supabase
        .from('document_signatures')
        .insert({
          auth0_user_id: auth0UserId,
          document_id: documentId,
        })
        .select();

      if (signatureError) {
        await supabase.rpc('rollback');
        console.error('Error recording signature:', signatureError);
        return res.status(500).json({ message: 'Error recording signature' });
      }

      // Get the document to find the version
      const { data: document } = await supabase
        .from('documents')
        .select('version')
        .eq('id', documentId)
        .single();

      // Update user profile status based on document type
      let newStatus;
      let versionField;
      
      if (documentType === 'nda') {
        newStatus = 'nda_signed';
        versionField = 'nda_document_version_signed';
      } else if (documentType === 'member_contract') {
        newStatus = 'member_contract_signed';
        versionField = 'member_contract_document_version_signed';
      }

      // Update the user's status and document version signed
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          user_status: newStatus,
          [versionField]: document.version
        })
        .eq('auth0_user_id', auth0UserId);

      if (updateError) {
        await supabase.rpc('rollback');
        console.error('Error updating profile status:', updateError);
        return res.status(500).json({ message: 'Error updating profile status' });
      }

      // Commit the transaction
      await supabase.rpc('commit');

      return res.status(201).json({
        message: 'Document signed successfully',
        signature: signature[0]
      });
    } catch (error) {
      await supabase.rpc('rollback');
      throw error;
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
