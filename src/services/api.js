/**
 * API service for SmartFitter application
 * Handles communication between frontend and backend
 */

/**
 * Get auth token from Auth0
 * @returns {Promise<string>} The access token
 */
const getAccessToken = async () => {
  // This will be implemented with Auth0 integration
  // For now, this is a placeholder
  return localStorage.getItem('auth_token');
};

/**
 * Base API fetch with authentication
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} API response
 */
const apiFetch = async (endpoint, options = {}) => {
  const token = await getAccessToken();
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const url = `${apiUrl}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };
  
  const config = {
    ...options,
    headers
  };
  
  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An unknown error occurred'
    }));
    throw new Error(error.message || `API Error: ${response.status}`);
  }
  
  return response.json();
};

/**
 * User profile API methods
 */
export const userAPI = {
  /**
   * Get the current user's profile
   * @returns {Promise<Object>} User profile
   */
  getProfile: async () => {
    return apiFetch('/api/users/profile');
  },
  
  /**
   * Create or update user profile
   * @param {Object} profileData - User profile data
   * @returns {Promise<Object>} Updated profile
   */
  updateProfile: async (profileData) => {
    return apiFetch('/api/users/profile', {
      method: 'POST',
      body: JSON.stringify(profileData)
    });
  },
};

/**
 * Documents API methods
 */
export const documentAPI = {
  /**
   * Get document by type (nda, member_contract)
   * @param {string} type - Document type
   * @returns {Promise<Object>} Document data
   */
  getDocument: async (type) => {
    return apiFetch(`/api/documents/${type}`);
  },
  
  /**
   * Sign a document
   * @param {number} documentId - Document ID
   * @param {string} documentType - Document type (nda, member_contract)
   * @returns {Promise<Object>} Signature confirmation
   */
  signDocument: async (documentId, documentType) => {
    return apiFetch('/api/documents/sign', {
      method: 'POST',
      body: JSON.stringify({ documentId, documentType })
    });
  },
};

/**
 * Calendar API methods
 */
export const calendarAPI = {
  /**
   * Get available booking slots
   * @param {string} startDate - Start date in ISO format
   * @param {string} endDate - End date in ISO format
   * @returns {Promise<Array>} Available time slots
   */
  getAvailability: async (startDate, endDate) => {
    return apiFetch(`/api/calendar/availability?startDate=${startDate}&endDate=${endDate}`);
  },
  
  /**
   * Book a session
   * @param {string} startTime - Start time in ISO format
   * @param {string} endTime - End time in ISO format
   * @returns {Promise<Object>} Booking confirmation
   */
  bookSession: async (startTime, endTime) => {
    return apiFetch('/api/calendar/book', {
      method: 'POST',
      body: JSON.stringify({ startTime, endTime })
    });
  },
};

/**
 * Public API methods (no authentication required)
 */
export const publicAPI = {
  /**
   * Get public profile by slug
   * @param {string} slug - Profile unique share slug
   * @returns {Promise<Object>} Public profile data
   */
  getPublicProfile: async (slug) => {
    return apiFetch(`/api/public/profile/${slug}`);
  },
};

/**
 * Admin API methods
 */
export const adminAPI = {
  /**
   * Get all users
   * @returns {Promise<Array>} All users
   */
  getUsers: async () => {
    return apiFetch('/api/admin/users');
  },
  
  /**
   * Approve a user
   * @param {string} userId - Auth0 user ID
   * @returns {Promise<Object>} Updated user
   */
  approveUser: async (userId) => {
    return apiFetch(`/api/admin/users/${userId}/approve`, {
      method: 'POST'
    });
  },
  
  /**
   * Get all documents
   * @returns {Promise<Array>} All documents
   */
  getDocuments: async () => {
    return apiFetch('/api/admin/documents');
  },
  
  /**
   * Create a new document
   * @param {Object} documentData - Document data
   * @returns {Promise<Object>} Created document
   */
  createDocument: async (documentData) => {
    return apiFetch('/api/admin/documents', {
      method: 'POST',
      body: JSON.stringify(documentData)
    });
  },
  
  /**
   * Update a document
   * @param {number} id - Document ID
   * @param {Object} documentData - Updated document data
   * @returns {Promise<Object>} Updated document
   */
  updateDocument: async (id, documentData) => {
    return apiFetch(`/api/admin/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(documentData)
    });
  },
};
