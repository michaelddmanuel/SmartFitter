import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useProfile } from '../context/ProfileContext';
import { motion } from 'framer-motion';

const MemberDashboard = () => {
  const { user } = useAuth0();
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState('overview');

  // Generate account code based on user initials
  const generateAccountCode = () => {
    const name = profile?.full_name || user?.name || 'SmartFitter Member';
    const initials = name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
    const randomCode = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `SF-${initials}00-${randomCode}`;
  };

  const accountCode = generateAccountCode();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const tabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      id: 'earnings', 
      label: 'Earnings', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    { 
      id: 'training', 
      label: 'Training', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    { 
      id: 'network', 
      label: 'Network', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] overflow-x-hidden">
      {/* Hero Section */}
      <section className="text-center pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-4 leading-tight">
              MEMBER<br/>
              DASHBOARD
            </h1>
            <p className="text-lg text-[#E5E7EB]/70 mb-8 leading-relaxed">
              Welcome back, {profile?.full_name || user?.name || 'SmartFitter Member'}
            </p>
          </motion.div>

          {/* Quick Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#CCC1BE]/15 hover:-translate-y-2 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-[#CCC1BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#CCC1BE]/10 rounded-full blur-2xl group-hover:bg-[#CCC1BE]/20 transition-colors duration-500"></div>
                <CardContent className="relative p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#CCC1BE] to-[#CCC1BE]/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-1 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#E5E7EB] mb-2">Account Code</h3>
                  <p className="text-2xl font-bold text-[#CCC1BE] mb-2">{accountCode}</p>
                  <p className="text-sm text-[#E5E7EB]/60">Member ID</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#CCC1BE]/15 hover:-translate-y-2 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-[#CCC1BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#CCC1BE]/10 rounded-full blur-2xl group-hover:bg-[#CCC1BE]/20 transition-colors duration-500"></div>
                <CardContent className="relative p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#CCC1BE] to-[#CCC1BE]/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-1 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#E5E7EB] mb-2">Monthly Earnings</h3>
                  <p className="text-2xl font-bold text-[#CCC1BE] mb-2">R15,750</p>
                  <p className="text-sm text-[#CCC1BE]/70">+12% from last month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#CCC1BE]/15 hover:-translate-y-2 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-[#CCC1BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#CCC1BE]/10 rounded-full blur-2xl group-hover:bg-[#CCC1BE]/20 transition-colors duration-500"></div>
                <CardContent className="relative p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#CCC1BE] to-[#CCC1BE]/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-1 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#E5E7EB] mb-2">Status</h3>
                  <p className="text-2xl font-bold text-[#CCC1BE] mb-2">Executive</p>
                  <p className="text-sm text-[#E5E7EB]/60">Premium Member</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#CCC1BE]/15 hover:-translate-y-2 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-[#CCC1BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#CCC1BE]/10 rounded-full blur-2xl group-hover:bg-[#CCC1BE]/20 transition-colors duration-500"></div>
                <CardContent className="relative p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#CCC1BE] to-[#CCC1BE]/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-1 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#E5E7EB] mb-2">Network Size</h3>
                  <p className="text-2xl font-bold text-[#CCC1BE] mb-2">24</p>
                  <p className="text-sm text-[#CCC1BE]/70">3 new this week</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#CCC1BE] text-black hover:bg-[#CCC1BE]/90'
                    : 'bg-[#232323] text-[#E5E7EB]/70 hover:bg-[#2A2A2A] hover:text-[#CCC1BE] border border-[#CCC1BE]/20'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border border-[#CCC1BE]/20">
                  <CardHeader>
                    <CardTitle className="text-[#CCC1BE]">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: 'Completed Leadership Training', time: '2 hours ago', type: 'training' },
                        { action: 'New member joined your network', time: '1 day ago', type: 'network' },
                        { action: 'Monthly commission received', time: '3 days ago', type: 'earnings' },
                        { action: 'Profile updated successfully', time: '1 week ago', type: 'profile' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-[#1A1A1A]/50 rounded-lg hover:bg-[#1A1A1A]/70 transition-colors duration-300">
                          <div className="w-2 h-2 bg-[#CCC1BE] rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-[#E5E7EB] text-sm">{activity.action}</p>
                            <p className="text-[#E5E7EB]/50 text-xs">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="group relative bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#CCC1BE]/15 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#CCC1BE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader>
                    <CardTitle className="text-[#CCC1BE] flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { title: 'Update Profile', desc: 'Keep your information current', icon: 'user' },
                        { title: 'Invite Member', desc: 'Grow your network', icon: 'plus' },
                        { title: 'View Reports', desc: 'Check your performance', icon: 'chart' },
                        { title: 'Contact Support', desc: 'Get help when needed', icon: 'help' }
                      ].map((action, index) => (
                        <Button
                          key={index}
                          className="flex items-center justify-between p-4 h-auto bg-[#1A1A1A]/50 hover:bg-[#CCC1BE]/10 text-left border border-[#CCC1BE]/10 hover:border-[#CCC1BE]/30 transition-all duration-300"
                        >
                          <div>
                            <p className="text-[#E5E7EB] font-medium">{action.title}</p>
                            <p className="text-[#E5E7EB]/60 text-sm">{action.desc}</p>
                          </div>
                          <svg className="w-5 h-5 text-[#CCC1BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border border-[#CCC1BE]/20">
                    <CardHeader>
                      <CardTitle className="text-[#CCC1BE]">Earnings Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-[#1A1A1A]/50 rounded-lg flex items-center justify-center">
                        <p className="text-[#E5E7EB]/50">Earnings Chart Placeholder</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border border-[#CCC1BE]/20">
                    <CardHeader>
                      <CardTitle className="text-[#CCC1BE]">This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-[#E5E7EB]/70">Total Earnings</p>
                          <p className="text-2xl font-bold text-green-400">R15,750</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#E5E7EB]/70">Commissions</p>
                          <p className="text-xl font-semibold text-[#CCC1BE]">R12,500</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#E5E7EB]/70">Bonuses</p>
                          <p className="text-xl font-semibold text-[#CCC1BE]">R3,250</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'training' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border border-[#CCC1BE]/20">
                  <CardHeader>
                    <CardTitle className="text-[#CCC1BE]">Current Training</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-[#1A1A1A]/50 rounded-lg">
                        <h3 className="font-semibold text-[#CCC1BE] mb-2">Executive Leadership</h3>
                        <div className="w-full bg-[#2A2A2A] rounded-full h-2 mb-2">
                          <div className="bg-[#CCC1BE] h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                        <p className="text-sm text-[#E5E7EB]/70">75% Complete</p>
                      </div>
                      <div className="p-4 bg-[#1A1A1A]/50 rounded-lg">
                        <h3 className="font-semibold text-[#CCC1BE] mb-2">Business Strategy</h3>
                        <div className="w-full bg-[#2A2A2A] rounded-full h-2 mb-2">
                          <div className="bg-[#CCC1BE] h-2 rounded-full" style={{width: '45%'}}></div>
                        </div>
                        <p className="text-sm text-[#E5E7EB]/70">45% Complete</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border border-[#CCC1BE]/20">
                  <CardHeader>
                    <CardTitle className="text-[#CCC1BE]">Available Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-[#1A1A1A]/50 rounded-lg flex justify-between items-center">
                        <span className="text-sm">International Marketing</span>
                        <Button size="sm" variant="outline" className="border-[#CCC1BE]/30 text-[#CCC1BE]">
                          Start
                        </Button>
                      </div>
                      <div className="p-3 bg-[#1A1A1A]/50 rounded-lg flex justify-between items-center">
                        <span className="text-sm">Financial Management</span>
                        <Button size="sm" variant="outline" className="border-[#CCC1BE]/30 text-[#CCC1BE]">
                          Start
                        </Button>
                      </div>
                      <div className="p-3 bg-[#1A1A1A]/50 rounded-lg flex justify-between items-center">
                        <span className="text-sm">Global Networking</span>
                        <Button size="sm" variant="outline" className="border-[#CCC1BE]/30 text-[#CCC1BE]">
                          Start
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'network' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border border-[#CCC1BE]/20">
                    <CardHeader>
                      <CardTitle className="text-[#CCC1BE]">Your Network</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1,2,3,4].map((member) => (
                          <div key={member} className="p-4 bg-[#1A1A1A]/50 rounded-lg">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-10 h-10 bg-[#CCC1BE]/20 rounded-full flex items-center justify-center">
                                <span className="text-[#CCC1BE] font-semibold">M{member}</span>
                              </div>
                              <div>
                                <p className="font-medium text-[#E5E7EB]">Member {member}</p>
                                <p className="text-xs text-[#E5E7EB]/50">Joined 2 weeks ago</p>
                              </div>
                            </div>
                            <div className="text-sm text-[#E5E7EB]/70">
                              <p>Status: Active</p>
                              <p>Level: Executive Partner</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border border-[#CCC1BE]/20">
                    <CardHeader>
                      <CardTitle className="text-[#CCC1BE]">Network Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-[#E5E7EB]/70">Total Members</p>
                          <p className="text-2xl font-bold text-[#CCC1BE]">24</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#E5E7EB]/70">Active This Month</p>
                          <p className="text-xl font-semibold text-green-400">18</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#E5E7EB]/70">New This Week</p>
                          <p className="text-xl font-semibold text-blue-400">3</p>
                        </div>
                        <Button className="w-full bg-[#CCC1BE] hover:bg-[#CCC1BE]/90 text-black font-medium mt-4">
                          Invite New Member
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MemberDashboard;
