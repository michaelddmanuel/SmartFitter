import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { adminAPI } from '../services/api';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const AdminDashboardPage = () => {
  const { profile } = useProfile();
  
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch users and documents when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (activeTab === 'users') {
          const usersData = await adminAPI.getUsers();
          setUsers(usersData);
        } else if (activeTab === 'documents') {
          const documentsData = await adminAPI.getDocuments();
          setDocuments(documentsData);
        }
      } catch (err) {
        console.error(`Error fetching ${activeTab}:`, err);
        setError(`Failed to load ${activeTab}. Please try again.`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleApproveUser = async (userId) => {
    try {
      await adminAPI.approveUser(userId);
      
      // Update the user in the list
      setUsers(users.map(user => {
        if (user.auth0_user_id === userId) {
          return { ...user, user_status: 'accepted' };
        }
        return user;
      }));
    } catch (err) {
      console.error('Error approving user:', err);
      setError('Failed to approve user. Please try again.');
    }
  };
  
  // Get status badge color based on user status
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'prospect':
        return 'bg-[#CCC1BE]/20 text-[#CCC1BE]';
      case 'nda_signed':
        return 'bg-blue-500/20 text-blue-400';
      case 'booked_session':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'accepted':
        return 'bg-green-500/20 text-green-400';
      case 'member_contract_signed':
        return 'bg-purple-500/20 text-purple-400';
      case 'active_member':
        return 'bg-[#CCC1BE]/30 text-[#CCC1BE]';
      case 'rejected':
        return 'bg-red-500/20 text-red-400';
      case 'disabled':
        return 'bg-[#E5E7EB]/20 text-[#E5E7EB]/50';
      default:
        return 'bg-[#CCC1BE]/20 text-[#CCC1BE]';
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col text-[#E5E7EB]">
      {/* Header */}
      <header className="border-b border-[#2A2A2A] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#CCC1BE]">Admin Dashboard</h1>
              <p className="text-[#E5E7EB]/70 mt-1">Manage users, documents and system settings</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-[#CCC1BE]/20 text-[#CCC1BE] px-4 py-2 rounded-lg font-medium text-sm border border-[#CCC1BE]/30">
                Admin Mode
              </div>
              <img 
                src="/SmartFitter Assets logos /SmartFitter Icon no wings.svg" 
                alt="SmartFitter Logo" 
                className="h-10" 
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto py-6 space-y-12">
          
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-[#E5E7EB]">
              Welcome, {profile?.full_name || 'Admin'}!
            </h2>
            <p className="text-[#E5E7EB]/70 text-lg max-w-2xl mx-auto">
              Your journey to becoming an influential executive starts here.
            </p>
          </div>

          {/* Access Denied Message */}
          {!profile?.is_admin && (
            <Card className="bg-red-900/20 border-red-500/30">
              <CardContent className="p-8 text-center">
                <div className="bg-red-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-red-400 mb-2">Access Denied</h3>
                <p className="text-red-300/80">You do not have admin privileges. Please contact the system administrator.</p>
              </CardContent>
            </Card>
          )}
          
          {/* Error Message */}
          {error && (
            <Card className="bg-red-900/20 border-red-500/30 mb-8">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-red-500/20 rounded-full p-2">
                      <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-red-300/80">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Admin Dashboard Content */}
          {profile?.is_admin && (
            <div className="space-y-12">
              
              {/* Dashboard Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#232323] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="bg-[#CCC1BE]/20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                      <svg className="h-8 w-8 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#E5E7EB] mb-2">{users.length}</h3>
                    <p className="text-[#E5E7EB]/70">Total Users</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#232323] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="bg-green-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                      <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#E5E7EB] mb-2">{users.filter(u => u.user_status === 'active_member').length}</h3>
                    <p className="text-[#E5E7EB]/70">Active Members</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#232323] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="bg-yellow-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                      <svg className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#E5E7EB] mb-2">{users.filter(u => u.user_status === 'booked_session').length}</h3>
                    <p className="text-[#E5E7EB]/70">Pending Reviews</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-semibold text-[#CCC1BE]">Admin Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-[#232323] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all cursor-pointer group" onClick={() => handleTabChange('users')}>
                    <CardContent className="p-8 text-center">
                      <div className="bg-[#CCC1BE]/20 rounded-full p-6 w-20 h-20 mx-auto mb-4 group-hover:bg-[#CCC1BE]/30 transition-colors">
                        <svg className="h-8 w-8 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold text-[#E5E7EB] mb-2">Manage Users</h4>
                      <p className="text-[#E5E7EB]/70 mb-4">Review user applications, approve members, and manage user statuses</p>
                      <div className="text-[#CCC1BE] font-medium group-hover:text-[#CCC1BE]/80">View Users →</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#232323] border-[#2A2A2A] hover:border-[#CCC1BE]/30 transition-all cursor-pointer group" onClick={() => handleTabChange('documents')}>
                    <CardContent className="p-8 text-center">
                      <div className="bg-[#CCC1BE]/20 rounded-full p-6 w-20 h-20 mx-auto mb-4 group-hover:bg-[#CCC1BE]/30 transition-colors">
                        <svg className="h-8 w-8 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold text-[#E5E7EB] mb-2">Manage Documents</h4>
                      <p className="text-[#E5E7EB]/70 mb-4">Control document versions, activate/deactivate legal documents</p>
                      <div className="text-[#CCC1BE] font-medium group-hover:text-[#CCC1BE]/80">View Documents →</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Data Tables Section */}
              <Card className="bg-[#232323] border-[#2A2A2A] overflow-hidden">
                <div className="border-b border-[#2A2A2A] p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-[#CCC1BE]">System Management</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleTabChange('users')}
                        className={`py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                          activeTab === 'users'
                            ? 'bg-[#CCC1BE] text-[#1A1A1A]'
                            : 'bg-[#2A2A2A] text-[#E5E7EB]/70 hover:text-[#E5E7EB]'
                        }`}
                      >
                        Users ({users.length})
                      </button>
                      <button
                        onClick={() => handleTabChange('documents')}
                        className={`py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                          activeTab === 'documents'
                            ? 'bg-[#CCC1BE] text-[#1A1A1A]'
                            : 'bg-[#2A2A2A] text-[#E5E7EB]/70 hover:text-[#E5E7EB]'
                        }`}
                      >
                        Documents ({documents.length})
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tab Content */}
                <CardContent className="p-0">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CCC1BE]"></div>
                      <span className="ml-3 text-[#E5E7EB]/70">Loading {activeTab}...</span>
                    </div>
                  ) : (
                    <>
                      {/* Users Tab */}
                      {activeTab === 'users' && (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-[#2A2A2A]">
                            <thead className="bg-[#1A1A1A]">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB]/70 uppercase tracking-wider">
                                  User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB]/70 uppercase tracking-wider">
                                  Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB]/70 uppercase tracking-wider">
                                  Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB]/70 uppercase tracking-wider">
                                  Joined
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB]/70 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-[#232323] divide-y divide-[#2A2A2A]">
                              {users.map((user) => (
                                <tr key={user.auth0_user_id} className="hover:bg-[#2A2A2A]/50 transition-colors">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="h-10 w-10 rounded-full bg-[#CCC1BE]/20 flex items-center justify-center mr-4">
                                        <span className="text-sm text-[#CCC1BE]">
                                          {user.full_name?.charAt(0) || user.email?.charAt(0) || '?'}
                                        </span>
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium text-[#E5E7EB]">
                                          {user.full_name || 'No name'}
                                        </div>
                                        <div className="text-sm text-[#E5E7EB]/70">{user.email}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(user.user_status)}`}>
                                      {user.user_status?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E5E7EB]/70">
                                    {user.phone_number || 'Not provided'}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E5E7EB]/70">
                                    {formatDate(user.created_at)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-3">
                                      <Button
                                        onClick={() => handleApproveUser(user.auth0_user_id)}
                                        disabled={user.user_status === 'accepted'}
                                        className="bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-[#1A1A1A] font-medium text-xs px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                      >
                                        {user.user_status === 'accepted' ? 'Approved' : 'Approve'}
                                      </Button>
                                      <button className="text-[#E5E7EB]/70 hover:text-[#CCC1BE] transition-colors">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {users.length === 0 && (
                            <div className="text-center py-12">
                              <svg className="mx-auto h-12 w-12 text-[#E5E7EB]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                              </svg>
                              <h3 className="mt-2 text-sm font-medium text-[#E5E7EB]/70">No users found</h3>
                              <p className="mt-1 text-sm text-[#E5E7EB]/50">Users will appear here once they register.</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Documents Tab */}
                      {activeTab === 'documents' && (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-[#2A2A2A]">
                            <thead className="bg-[#1A1A1A]">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB]/70 uppercase tracking-wider">
                                  Document
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB]/70 uppercase tracking-wider">
                                  Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB]/70 uppercase tracking-wider">
                                  Version
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB]/70 uppercase tracking-wider">
                                  Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB]/70 uppercase tracking-wider">
                                  Created
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB]/70 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-[#232323] divide-y divide-[#2A2A2A]">
                              {documents.map((document) => (
                                <tr key={document.id} className="hover:bg-[#2A2A2A]/50 transition-colors">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-[#E5E7EB]">{document.title}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E5E7EB]/70">
                                    {document.document_type}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E5E7EB]/70">
                                    {document.version}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      document.is_active ? 'bg-green-500/20 text-green-400' : 'bg-[#E5E7EB]/20 text-[#E5E7EB]/70'
                                    }`}>
                                      {document.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E5E7EB]/70">
                                    {formatDate(document.created_at)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-3">
                                      <button className="text-[#CCC1BE] hover:text-[#CCC1BE]/80 transition-colors">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                      </button>
                                      <button className={`transition-colors ${
                                        document.is_active ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'
                                      }`}>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          {document.is_active ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          )}
                                        </svg>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {documents.length === 0 && (
                            <div className="text-center py-12">
                              <svg className="mx-auto h-12 w-12 text-[#E5E7EB]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <h3 className="mt-2 text-sm font-medium text-[#E5E7EB]/70">No documents found</h3>
                              <p className="mt-1 text-sm text-[#E5E7EB]/50">Documents will appear here once they are created.</p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Admin Information & CTA */}
              <div className="text-center space-y-8">
                <Card className="bg-[#CCC1BE]/10 border-[#CCC1BE]/30">
                  <CardContent className="p-8">
                    <div className="max-w-2xl mx-auto">
                      <div className="bg-[#CCC1BE]/20 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                        <svg className="h-8 w-8 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-[#CCC1BE] mb-4">Admin Dashboard</h3>
                      <p className="text-[#E5E7EB]/70 mb-6">
                        As an administrator, you have full access to manage users, documents, and system settings. 
                        All administrative actions are logged and audited for security purposes.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="h-4 w-4 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[#E5E7EB]/80">User Management</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="h-4 w-4 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[#E5E7EB]/80">Document Control</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="h-4 w-4 text-[#CCC1BE]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[#E5E7EB]/80">System Analytics</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#E5E7EB]">Ready to Manage Your System?</h3>
                  <p className="text-[#E5E7EB]/70 max-w-md mx-auto">Start by reviewing user applications or managing system documents.</p>
                  <Button 
                    onClick={() => handleTabChange('users')}
                    className="bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-[#1A1A1A] font-semibold py-3 px-8 rounded-lg text-lg"
                  >
                    Review User Applications
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Footer Links */}
          <div className="mt-16 pt-8 border-t border-[#2A2A2A] flex flex-wrap justify-center gap-6 text-sm text-[#E5E7EB]/60">
            <Link to="/" className="hover:text-[#CCC1BE] transition-colors">Home</Link>
            <Link to="/profile" className="hover:text-[#CCC1BE] transition-colors">Profile</Link>
            <Link to="/contacts" className="hover:text-[#CCC1BE] transition-colors">Contacts</Link>
            <Link to="/terms" className="hover:text-[#CCC1BE] transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-[#CCC1BE] transition-colors">Privacy</Link>
            <a href="https://smartfitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#CCC1BE] transition-colors">SmartFitter.com</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
