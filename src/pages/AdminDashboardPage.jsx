import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { adminAPI } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Switch } from '../components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { motion } from 'framer-motion';

const AdminDashboardPage = () => {
  const { profile } = useProfile();
  
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Enhanced dashboard state
  const [systemStatus, setSystemStatus] = useState({
    database: true,
    emailService: true,
    pauseSignups: false,
  });
  
  // Search and filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  
  // Mock data - Enhanced with detailed user profiles
  const allUsers = [
    { 
      id: '1', 
      name: 'Sarah Johnson', 
      email: 'sarah.johnson@example.com',
      status: 'pending_approval',
      referredBy: 'Michael Davis', 
      waitingTime: '3 days',
      joinDate: '2024-01-15',
      phone: '+1 (555) 123-4567',
      company: 'Tech Innovations Inc.',
      position: 'Senior Marketing Manager',
      bio: 'Experienced marketing professional looking to expand network and grow business connections.'
    },
    { 
      id: '2', 
      name: 'David Chen', 
      email: 'david.chen@example.com',
      status: 'pending_approval',
      referredBy: 'Lisa Anderson', 
      waitingTime: '5 days',
      joinDate: '2024-01-10',
      phone: '+1 (555) 234-5678',
      company: 'Global Solutions LLC',
      position: 'Product Director',
      bio: 'Product leader with 10+ years experience in scaling tech products and building teams.'
    },
    { 
      id: '3', 
      name: 'Emma Wilson', 
      email: 'emma.wilson@example.com',
      status: 'pending_approval',
      referredBy: 'John Smith', 
      waitingTime: '1 week',
      joinDate: '2024-01-05',
      phone: '+1 (555) 345-6789',
      company: 'Creative Agency Co.',
      position: 'Creative Director',
      bio: 'Award-winning creative director specializing in brand strategy and digital experiences.'
    },
    { 
      id: '4', 
      name: 'Michael Rodriguez', 
      email: 'michael.rodriguez@example.com',
      status: 'active_member',
      referredBy: 'Sarah Miller', 
      waitingTime: null,
      joinDate: '2023-12-20',
      phone: '+1 (555) 456-7890',
      company: 'Finance Pro Group',
      position: 'Investment Manager',
      bio: 'Investment professional focused on growth strategies and portfolio management.'
    },
    { 
      id: '5', 
      name: 'Jessica Park', 
      email: 'jessica.park@example.com',
      status: 'booked_session',
      referredBy: 'Robert Taylor', 
      waitingTime: null,
      joinDate: '2024-01-12',
      phone: '+1 (555) 567-8901',
      company: 'Healthcare Solutions',
      position: 'Operations Manager',
      bio: 'Healthcare operations expert with focus on process optimization and team leadership.'
    },
    { 
      id: '6', 
      name: 'Alex Thompson', 
      email: 'alex.thompson@example.com',
      status: 'rejected',
      referredBy: 'Emma Wilson', 
      waitingTime: null,
      joinDate: '2024-01-08',
      phone: '+1 (555) 678-9012',
      company: 'Startup Ventures',
      position: 'Founder',
      bio: 'Serial entrepreneur with multiple successful exits in the tech industry.'
    },
    { 
      id: '7', 
      name: 'Rachel Martinez', 
      email: 'rachel.martinez@example.com',
      status: 'active_member',
      referredBy: 'Michael Davis', 
      waitingTime: null,
      joinDate: '2023-11-15',
      phone: '+1 (555) 789-0123',
      company: 'Digital Marketing Pro',
      position: 'VP of Marketing',
      bio: 'Digital marketing expert with 12+ years experience in brand building and customer acquisition.'
    },
    { 
      id: '8', 
      name: 'James Wilson', 
      email: 'james.wilson@example.com',
      status: 'active_member',
      referredBy: 'Lisa Anderson', 
      waitingTime: null,
      joinDate: '2023-10-22',
      phone: '+1 (555) 890-1234',
      company: 'Tech Solutions Inc',
      position: 'CTO',
      bio: 'Technology leader specializing in cloud architecture and scalable systems development.'
    },
    { 
      id: '9', 
      name: 'Maria Garcia', 
      email: 'maria.garcia@example.com',
      status: 'active_member',
      referredBy: 'John Smith', 
      waitingTime: null,
      joinDate: '2023-12-05',
      phone: '+1 (555) 901-2345',
      company: 'Consulting Partners LLC',
      position: 'Senior Consultant',
      bio: 'Business consultant focused on operational excellence and strategic planning for growth companies.'
    },
    { 
      id: '10', 
      name: 'Kevin Chang', 
      email: 'kevin.chang@example.com',
      status: 'active_member',
      referredBy: 'Sarah Miller', 
      waitingTime: null,
      joinDate: '2023-09-18',
      phone: '+1 (555) 012-3456',
      company: 'Financial Advisors Group',
      position: 'Senior Financial Advisor',
      bio: 'Wealth management specialist helping high-net-worth individuals achieve their financial goals.'
    }
  ];
  
  const pendingApprovals = allUsers.filter(user => user.status === 'pending_approval');
  
  const topPerformers = [
    { rank: 1, name: 'Michael Davis', referrals: 12 },
    { rank: 2, name: 'Lisa Anderson', referrals: 8 },
    { rank: 3, name: 'John Smith', referrals: 6 }
  ];
  
  // Calculate real metrics from user data
  const platformMetrics = {
    totalPending: allUsers.filter(user => user.status === 'pending_approval').length,
    newSignups: allUsers.length, // Total users in system
    activeMembers: allUsers.filter(user => user.status === 'active_member').length,
    bookedSessions: allUsers.filter(user => user.status === 'booked_session').length,
    rejectedUsers: allUsers.filter(user => user.status === 'rejected').length
  };
  
  // Get existing members for display
  const existingMembers = allUsers.filter(user => user.status === 'active_member');
  const filteredExistingMembers = existingMembers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [usersResponse, documentsResponse] = await Promise.all([
          adminAPI.getAllUsers(),
          adminAPI.getAllDocuments()
        ]);
        setUsers(usersResponse.data || []);
        setDocuments(documentsResponse.data || []);
      } catch (err) {
        setError('Failed to load admin data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (profile?.is_admin) {
      fetchData();
    }
  }, [profile]);

  const handleApproveUser = async (userId) => {
    try {
      await adminAPI.approveUser(userId);
    } catch (err) {
      setError('Failed to approve user');
    }
  };
  
  const handleSystemToggle = (setting, value) => {
    setSystemStatus(prev => ({ ...prev, [setting]: value }));
  };
  
  // Search and filter functions
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const filteredPendingApprovals = pendingApprovals.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.referredBy.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setIsProfileDialogOpen(true);
  };
  
  const handleApproveFromProfile = async (userId) => {
    await handleApproveUser(userId);
    setIsProfileDialogOpen(false);
    setSelectedUser(null);
  };
  
  const handleRejectFromProfile = async (userId) => {
    // In a real app, this would call an API to reject the user
    console.log('Rejecting user:', userId);
    setIsProfileDialogOpen(false);
    setSelectedUser(null);
  };
  
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending_approval': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'active_member': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'booked_session': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending_approval': return 'Pending Approval';
      case 'active_member': return 'Active Member';
      case 'booked_session': return 'Booked Session';
      case 'rejected': return 'Rejected';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col text-[#E5E7EB]">
      {/* Header */}
      <header className="border-b border-[#2A2A2A] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#CCC1BE]">Admin Dashboard</h1>
              <p className="text-[#E5E7EB]/70 mt-1">Command Center - Monitor, Manage, Control</p>
            </div>
            <div className="bg-[#CCC1BE]/20 text-[#CCC1BE] px-4 py-2 rounded-lg font-medium text-sm border border-[#CCC1BE]/30">
              Admin Mode
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Welcome Section */}
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[#E5E7EB]">Admin Command Center</h2>
            <p className="text-[#E5E7EB]/70 text-lg max-w-2xl mx-auto">
              Monitor platform health, manage approvals, and oversee system operations
            </p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <Card className="bg-red-900/20 border-red-500/30">
              <CardContent className="p-6">
                <p className="text-red-300/80">{error}</p>
              </CardContent>
            </Card>
          )}
          
          {/* Admin Content - Full Access Granted */}
          {true && (
            <div className="space-y-8">
              
              {/* User Search Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                <Card className="bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20">
                  <CardHeader>
                    <CardTitle className="text-[#CCC1BE] flex items-center space-x-2">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span>User Search & Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Search Controls */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Search by name, email, or company..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="bg-[#1A1A1A]/50 border-[#2A2A2A] text-[#E5E7EB] placeholder:text-[#E5E7EB]/50"
                        />
                      </div>
                      <div className="w-full md:w-48">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="bg-[#1A1A1A]/50 border-[#2A2A2A] text-[#E5E7EB]">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#232323] border-[#2A2A2A]">
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="pending_approval">Pending Approval</SelectItem>
                            <SelectItem value="active_member">Active Members</SelectItem>
                            <SelectItem value="booked_session">Booked Session</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Search Results */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {filteredUsers.length === 0 ? (
                        <div className="text-center py-8 text-[#E5E7EB]/60">
                          <svg className="w-12 h-12 mx-auto mb-4 text-[#E5E7EB]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5" />
                          </svg>
                          <p>No users found matching your search criteria</p>
                        </div>
                      ) : (
                        filteredUsers.map((user) => (
                          <div key={user.id} className="flex items-center justify-between p-4 bg-[#1A1A1A]/50 rounded-lg hover:bg-[#1A1A1A]/70 transition-colors duration-300">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-[#CCC1BE]/20 text-[#CCC1BE]">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-[#E5E7EB]">{user.name}</p>
                                <p className="text-sm text-[#E5E7EB]/60">{user.email}</p>
                                <p className="text-xs text-[#E5E7EB]/40">{user.company} • {user.position}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge className={getStatusBadgeColor(user.status)}>
                                {getStatusLabel(user.status)}
                              </Badge>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-[#CCC1BE] hover:bg-[#CCC1BE]/10"
                                onClick={() => handleViewProfile(user)}
                              >
                                View Profile
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
              
              {/* Priority Action Queue */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-[#CCC1BE] flex items-center space-x-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Priority Action Queue</span>
                      </CardTitle>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        {platformMetrics.totalPending} Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="relative space-y-4">
                    {filteredPendingApprovals.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-[#1A1A1A]/50 rounded-lg hover:bg-[#1A1A1A]/70 transition-colors duration-300">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-[#CCC1BE]/20 text-[#CCC1BE]">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-[#E5E7EB]">{user.name}</p>
                            <p className="text-sm text-[#E5E7EB]/60">Referred by: {user.referredBy}</p>
                            <p className="text-xs text-[#E5E7EB]/40">Waiting: {user.waitingTime}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="text-[#CCC1BE] hover:bg-[#CCC1BE]/10"
                            onClick={() => handleViewProfile(user)}
                          >
                            View Profile
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleApproveUser(user.id)}
                          >
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" className="bg-red-600 hover:bg-red-700">
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                    {filteredPendingApprovals.length === 0 && (
                      <div className="text-center py-8 text-[#E5E7EB]/60">
                        <p>No pending approvals found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.section>

              {/* Platform Health & System Controls */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Platform Metrics */}
                <Card className="bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20">
                  <CardHeader>
                    <CardTitle className="text-[#CCC1BE]">Platform Health</CardTitle>
                  </CardHeader>
                  <CardContent className="relative space-y-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-[#1A1A1A]/50 rounded-lg hover:bg-[#1A1A1A]/70 transition-colors">
                        <p className="text-2xl font-bold text-blue-400">{platformMetrics.newSignups}</p>
                        <p className="text-sm text-[#E5E7EB]/60">Total Users</p>
                      </div>
                      <div className="text-center p-3 bg-[#1A1A1A]/50 rounded-lg hover:bg-[#1A1A1A]/70 transition-colors">
                        <p className="text-2xl font-bold text-green-400">{platformMetrics.activeMembers}</p>
                        <p className="text-sm text-[#E5E7EB]/60">Active Members</p>
                      </div>
                      <div className="text-center p-3 bg-[#1A1A1A]/50 rounded-lg hover:bg-[#1A1A1A]/70 transition-colors">
                        <p className="text-2xl font-bold text-yellow-400">{platformMetrics.totalPending}</p>
                        <p className="text-sm text-[#E5E7EB]/60">Pending Approval</p>
                      </div>
                      <div className="text-center p-3 bg-[#1A1A1A]/50 rounded-lg hover:bg-[#1A1A1A]/70 transition-colors">
                        <p className="text-2xl font-bold text-purple-400">{platformMetrics.bookedSessions}</p>
                        <p className="text-sm text-[#E5E7EB]/60">Booked Sessions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* System Controls */}
                <Card className="bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20">
                  <CardHeader>
                    <CardTitle className="text-[#CCC1BE]">System Controls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-[#1A1A1A]/50 rounded-lg">
                        <span className="text-[#E5E7EB]">Database</span>
                        <Switch 
                          checked={systemStatus.database}
                          onCheckedChange={(checked) => handleSystemToggle('database', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[#1A1A1A]/50 rounded-lg">
                        <span className="text-[#E5E7EB]">Email Service</span>
                        <Switch 
                          checked={systemStatus.emailService}
                          onCheckedChange={(checked) => handleSystemToggle('emailService', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.section>

              {/* Top Performers */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20">
                  <CardHeader>
                    <CardTitle className="text-[#CCC1BE]">Top Performing Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topPerformers.map((performer) => (
                        <div key={performer.rank} className="flex items-center justify-between p-4 bg-[#1A1A1A]/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              performer.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                              performer.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                              'bg-orange-500/20 text-orange-400'
                            }`}>
                              {performer.rank}
                            </div>
                            <div>
                              <p className="font-medium text-[#E5E7EB]">{performer.name}</p>
                              <p className="text-sm text-[#E5E7EB]/60">{performer.referrals} referrals</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-[#CCC1BE]">
                            View Profile
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.section>

              {/* Existing Members Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-[#CCC1BE] flex items-center space-x-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Existing Members</span>
                      </CardTitle>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {platformMetrics.activeMembers} Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Members List */}
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {filteredExistingMembers.length === 0 ? (
                        <div className="text-center py-8 text-[#E5E7EB]/60">
                          <svg className="w-12 h-12 mx-auto mb-4 text-[#E5E7EB]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <p>No active members found matching your search</p>
                        </div>
                      ) : (
                        filteredExistingMembers.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-4 bg-[#1A1A1A]/50 rounded-lg hover:bg-[#1A1A1A]/70 transition-colors duration-300">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-[#CCC1BE]/20 text-[#CCC1BE]">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-[#E5E7EB]">{member.name}</p>
                                <p className="text-sm text-[#E5E7EB]/60">{member.email}</p>
                                <p className="text-xs text-[#E5E7EB]/40">{member.company} • {member.position}</p>
                                <p className="text-xs text-[#E5E7EB]/30">Member since: {member.joinDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                Active
                              </Badge>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-[#CCC1BE] hover:bg-[#CCC1BE]/10"
                                onClick={() => handleViewProfile(member)}
                              >
                                View Profile
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    {/* Show All Members Button */}
                    {existingMembers.length > 5 && (
                      <div className="pt-4 border-t border-[#2A2A2A]">
                        <Button variant="ghost" className="w-full text-[#CCC1BE] hover:bg-[#CCC1BE]/10">
                          View All {platformMetrics.activeMembers} Members →
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.section>

            </div>
          )}

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-[#2A2A2A] flex justify-center gap-6 text-sm text-[#E5E7EB]/60">
            <Link to="/" className="hover:text-[#CCC1BE] transition-colors">Home</Link>
            <Link to="/profile" className="hover:text-[#CCC1BE] transition-colors">Profile</Link>
            <Link to="/dashboard" className="hover:text-[#CCC1BE] transition-colors">Member Dashboard</Link>
          </div>
        </div>
        
        {/* User Profile Dialog */}
        <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
          <DialogContent className="bg-[#232323] border-[#2A2A2A] text-[#E5E7EB] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[#CCC1BE] text-xl">User Profile</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                {/* User Header */}
                <div className="flex items-center space-x-4 p-4 bg-[#1A1A1A]/50 rounded-lg">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-[#CCC1BE]/20 text-[#CCC1BE] text-xl">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#E5E7EB]">{selectedUser.name}</h3>
                    <p className="text-[#E5E7EB]/60">{selectedUser.position}</p>
                    <p className="text-[#E5E7EB]/60">{selectedUser.company}</p>
                    <Badge className={getStatusBadgeColor(selectedUser.status)} >
                      {getStatusLabel(selectedUser.status)}
                    </Badge>
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#CCC1BE]">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{selectedUser.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{selectedUser.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h6m-6 0l-.5 9A2 2 0 007.5 18h9a2 2 0 002-1.5L18.5 7H5.5l-.5 9A2 2 0 007 18h10a2 2 0 002-2V8" />
                        </svg>
                        <span>Joined: {selectedUser.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#CCC1BE]">Referral Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Referred by: {selectedUser.referredBy}</span>
                      </div>
                      {selectedUser.waitingTime && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Waiting: {selectedUser.waitingTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Bio */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#CCC1BE]">Bio</h4>
                  <p className="text-sm text-[#E5E7EB]/80 bg-[#1A1A1A]/50 p-4 rounded-lg">
                    {selectedUser.bio}
                  </p>
                </div>
                
                {/* Action Buttons */}
                {selectedUser.status === 'pending_approval' && (
                  <div className="flex justify-end space-x-3 pt-4 border-t border-[#2A2A2A]">
                    <Button 
                      variant="destructive" 
                      onClick={() => handleRejectFromProfile(selectedUser.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Reject Application
                    </Button>
                    <Button 
                      onClick={() => handleApproveFromProfile(selectedUser.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Approve User
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
