import React, { useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useProfile } from '../context/ProfileContext';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import QRCodeStyling from 'qr-code-styling';

const BusinessCardPage = () => {
  console.log('BusinessCardPage component rendered');
  const { isAuthenticated, user } = useAuth0();
  const { profile } = useProfile();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [editForm, setEditForm] = useState({
    full_name: profile?.full_name || user?.name || '',
    tagline: profile?.digital_card_tagline || 'Executive Partner',
    phone_number: profile?.phone_number || '081 752 2393',
    email: user?.email || '',
    website: 'www.smartfitter.com',
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: ''
  });

  // Generate account code based on user initials
  const generateAccountCode = () => {
    const name = profile?.full_name || user?.name || 'SmartFitter Member';
    const initials = name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
    const randomCode = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `SF-${initials}00-${randomCode}`;
  };

  const accountCode = generateAccountCode();

  // Simple QR Code with Logo (State-based)
  const [qrSvg, setQrSvg] = useState('');
  const [isQrLoading, setIsQrLoading] = useState(true);

  // Generate QR code with logo
  React.useEffect(() => {
    const generateQR = async () => {
      try {
        console.log('Generating QR code with logo...');
        setIsQrLoading(true);
        
        const qrCode = new QRCodeStyling({
          width: 200,
          height: 200,
          type: "svg",
          data: "https://smartfitter.vercel.app/",
          margin: 8,
          qrOptions: {
            errorCorrectionLevel: "H",
            typeNumber: 0,
            mode: "Byte"
          },
          dotsOptions: {
            color: "#ffffff",
            type: "dots"
          },
          backgroundOptions: {
            color: "transparent"
          },
          cornersSquareOptions: {
            type: "extra-rounded",
            color: "#ffffff"
          },
          cornersDotOptions: {
            type: "dot",
            color: "#ffffff"
          },
          image: `/SmartFitter Assets logos /SmartFitter Logo Icon only.svg?v=${Date.now()}`,
          imageOptions: {
            crossOrigin: "anonymous",
            margin: 8,
            imageSize: 0.4,
            hideBackgroundDots: true
          }
        });
        
        // Get SVG as string
        const svgString = await qrCode.getRawData('svg');
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);
        
        setQrSvg(svgUrl);
        setIsQrLoading(false);
        console.log('QR with logo generated successfully');
        
      } catch (err) {
        console.error('QR generation error:', err);
        // Fallback to simple QR without logo
        try {
          const dataUrl = await QRCode.toDataURL('https://smartfitter.vercel.app/', {
            width: 200,
            margin: 0,
            color: {
              dark: '#ffffff',
              light: 'transparent'
            },
            errorCorrectionLevel: 'H'
          });
          setQrSvg(dataUrl);
        } catch (fallbackErr) {
          console.error('Fallback QR generation failed:', fallbackErr);
        }
        setIsQrLoading(false);
      }
    };
    
    generateQR();
  }, []);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // Here you would typically save to your backend/profile context
    console.log('Saving profile updates:', editForm);
    setShowEditModal(false);
  };

  const shareViaWhatsApp = () => {
    const message = `Check out my SmartFitter Business Card!\n\nName: ${editForm.full_name}\nTitle: ${editForm.tagline}\nPhone: ${editForm.phone_number}\nEmail: ${editForm.email}\nAccount: ${accountCode}\n\nJoin SmartFitter: ${editForm.website}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = `${editForm.full_name} - SmartFitter Business Card`;
    const body = `Hi,\n\nI'd like to share my SmartFitter Business Card with you:\n\nName: ${editForm.full_name}\nTitle: ${editForm.tagline}\nPhone: ${editForm.phone_number}\nEmail: ${editForm.email}\nWebsite: ${editForm.website}\nAccount Code: ${accountCode}\n\nBest regards,\n${editForm.full_name}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const copyToClipboard = async () => {
    const cardData = `${editForm.full_name}\n${editForm.tagline}\nPhone: ${editForm.phone_number}\nEmail: ${editForm.email}\nWebsite: ${editForm.website}\nAccount: ${accountCode}`;
    try {
      await navigator.clipboard.writeText(cardData);
      alert('Business card details copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col">
      {/* Header Background Element */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#232323] to-transparent z-0"></div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 md:py-16 overflow-y-auto relative z-10 max-w-4xl mx-auto w-full">
        {/* Page Title */}
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-[#CCC1BE] tracking-tight mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          BUSINESS CARD
        </motion.h1>
        
        {/* Profile Card - Only show if authenticated */}
        {isAuthenticated && (
          <motion.div
            className="mb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-[#232323] via-[#2A2A2A] to-[#232323] border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/30 transition-all duration-300 shadow-xl">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#CCC1BE]/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#CCC1BE]/10 rounded-full blur-2xl"></div>
              
              <CardContent className="pt-8 px-6 relative z-10">
                {/* Executive Business Card Header */}
                <motion.div 
                  className="relative mb-8 group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Premium Card Background */}
                  <div className="relative bg-gradient-to-br from-[#2A2A2A] via-[#232323] to-[#1A1A1A] rounded-2xl p-8 border border-[#CCC1BE]/30 shadow-2xl shadow-[#CCC1BE]/5 overflow-hidden">
                    {/* SmartFitter Wing Logo - Top Left Corner */}
                    <div className="absolute top-6 left-6 z-20">
                      <div className="relative group/logo">
                        <img 
                          src="/SmartFitter Assets logos /SmartFitter Logo Icon only.svg" 
                          alt="SmartFitter Wing Logo" 
                          className="w-20 h-20 object-contain opacity-60 group-hover/logo:opacity-80 transition-all duration-300 group-hover:scale-105"
                        />
                        {/* Logo Glow Effect */}
                        <div className="absolute inset-0 bg-[#CCC1BE]/20 blur-lg opacity-0 group-hover/logo:opacity-60 transition-opacity duration-300 -z-10"></div>
                      </div>
                    </div>
                    

                    
                    {/* Share Button - Bottom Right */}
                    <div className="absolute bottom-4 right-4 z-20">
                      <button 
                        onClick={handleShare}
                        className="relative group/share flex items-center space-x-2 bg-[#CCC1BE]/10 backdrop-blur-sm border border-[#CCC1BE]/20 hover:border-[#CCC1BE]/40 rounded-full px-3 py-2 transition-all duration-300 hover:scale-105 shadow-lg shadow-[#CCC1BE]/10 hover:shadow-[#CCC1BE]/20"
                        title="Share Business Card"
                      >
                        {/* Share Icon */}
                        <svg 
                          className="w-4 h-4 text-[#CCC1BE] group-hover/share:text-[#CCC1BE]/90 transition-colors duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                        <span className="text-[#CCC1BE]/70 text-xs font-medium tracking-wide group-hover/share:text-[#CCC1BE] transition-colors duration-300">SHARE</span>
                        
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-[#CCC1BE]/20 rounded-full blur-md opacity-0 group-hover/share:opacity-100 transition-opacity duration-300 -z-10"></div>
                      </button>
                    </div>
                    
                    {/* Luxury Pattern Overlay */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#CCC1BE]/20 via-transparent to-[#CCC1BE]/10"></div>
                      <div className="absolute top-4 right-4 w-32 h-32 bg-[#CCC1BE]/5 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-4 left-4 w-24 h-24 bg-[#CCC1BE]/5 rounded-full blur-2xl"></div>
                    </div>
                    
                    {/* Premium Border Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#CCC1BE] to-transparent opacity-60"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#CCC1BE] to-transparent opacity-60"></div>
                    
                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* Executive Profile Picture */}
                      <div className="relative mb-6 group/avatar">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#CCC1BE] via-[#CCC1BE]/80 to-[#CCC1BE]/60 p-1.5 shadow-2xl shadow-[#CCC1BE]/20 group-hover:shadow-[#CCC1BE]/30 transition-all duration-500">
                          <div className="w-full h-full rounded-full overflow-hidden bg-[#1A1A1A] border-2 border-[#1A1A1A] group-hover/avatar:border-[#CCC1BE]/20 transition-all duration-300">
                            {user?.picture ? (
                              <img 
                                src={user.picture} 
                                alt={user.name} 
                                className="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform duration-500" 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-12 h-12 group-hover/avatar:scale-110 transition-transform duration-300">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Elegant Ring Animation */}
                        <div className="absolute inset-0 rounded-full border-2 border-[#CCC1BE]/20 group-hover:border-[#CCC1BE]/40 group-hover:scale-110 transition-all duration-500"></div>
                        <div className="absolute inset-0 rounded-full border border-[#CCC1BE]/10 group-hover:border-[#CCC1BE]/30 group-hover:scale-125 transition-all duration-700 delay-100"></div>
                      </div>
                      
                      {/* Executive Name & Title */}
                      <div className="space-y-3 mb-4">
                        <h2 className="text-3xl font-bold text-[#E5E7EB] tracking-wide group-hover:text-[#CCC1BE] transition-colors duration-300">
                          {editForm.full_name}
                        </h2>
                        
                        <div className="relative">
                          <p className="text-xl text-[#CCC1BE] font-light tracking-wider uppercase text-center group-hover:text-[#CCC1BE]/90 transition-colors duration-300">
                            {editForm.tagline}
                          </p>
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#CCC1BE] to-transparent opacity-60 group-hover:w-24 group-hover:opacity-100 transition-all duration-500"></div>
                        </div>
                      </div>
                      
                      {/* Premium Account Code */}
                      <div className="relative">
                        <div className="bg-gradient-to-r from-[#CCC1BE]/10 via-[#CCC1BE]/20 to-[#CCC1BE]/10 px-6 py-3 rounded-full border border-[#CCC1BE]/30 group-hover:border-[#CCC1BE]/50 transition-all duration-300">
                          <p className="text-sm text-[#CCC1BE] font-mono tracking-widest group-hover:tracking-wider transition-all duration-300">
                            {accountCode}
                          </p>
                        </div>
                        
                        {/* Subtle Glow Effect */}
                        <div className="absolute inset-0 bg-[#CCC1BE]/5 rounded-full blur-xl group-hover:bg-[#CCC1BE]/10 transition-all duration-500"></div>
                      </div>
                      
                      {/* Executive Accent Line */}
                      <div className="mt-6 w-full max-w-xs mx-auto">
                        <div className="h-px bg-gradient-to-r from-transparent via-[#CCC1BE]/40 to-transparent group-hover:via-[#CCC1BE]/60 transition-all duration-500"></div>
                      </div>
                      
                      {/* Centered SmartFitter Brand */}
                      <div className="mt-4 flex items-center justify-center opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                        <span className="text-[#CCC1BE]/50 text-xs font-light tracking-[0.1em]">SmartFitter App © 2025</span>
                      </div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#CCC1BE]/5 via-transparent to-[#CCC1BE]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Premium Shadow Enhancement */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#CCC1BE]/10 via-transparent to-[#CCC1BE]/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
                </motion.div>

                {/* Executive Contact Information */}
                <motion.div className="space-y-4 mb-6" variants={itemVariants}>
                  <div className="bg-[#1A1A1A]/60 backdrop-blur-sm border border-[#CCC1BE]/10 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-[#CCC1BE] mb-3">Contact Information</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-[#CCC1BE]/10 rounded-md flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                        </div>
                        <span className="text-[#E5E7EB]/90">{editForm.phone_number}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-[#CCC1BE]/10 rounded-md flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                        </div>
                        <span className="text-[#E5E7EB]/90">{editForm.email}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-[#CCC1BE]/10 rounded-md flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                          </svg>
                        </div>
                        <span className="text-[#E5E7EB]/90">{editForm.website}</span>
                      </div>
                    </div>
                    
                    {/* Social Media Links */}
                    {(editForm.linkedin || editForm.twitter || editForm.instagram || editForm.facebook) && (
                      <div className="mt-4 pt-4 border-t border-[#CCC1BE]/10">
                        <h4 className="text-sm font-medium text-[#CCC1BE] mb-3">Social Media</h4>
                        <div className="flex flex-wrap gap-3">
                          {editForm.linkedin && (
                            <a href={editForm.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-[#0077B5]/10 border border-[#0077B5]/20 px-3 py-2 rounded-lg hover:bg-[#0077B5]/20 transition-colors">
                              <svg className="w-4 h-4 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                              <span className="text-xs text-[#E5E7EB]">LinkedIn</span>
                            </a>
                          )}
                          {editForm.twitter && (
                            <a href={editForm.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 px-3 py-2 rounded-lg hover:bg-[#1DA1F2]/20 transition-colors">
                              <svg className="w-4 h-4 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                              <span className="text-xs text-[#E5E7EB]">Twitter</span>
                            </a>
                          )}
                          {editForm.instagram && (
                            <a href={editForm.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-[#E4405F]/10 border border-[#E4405F]/20 px-3 py-2 rounded-lg hover:bg-[#E4405F]/20 transition-colors">
                              <svg className="w-4 h-4 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                              </svg>
                              <span className="text-xs text-[#E5E7EB]">Instagram</span>
                            </a>
                          )}
                          {editForm.facebook && (
                            <a href={editForm.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-[#1877F2]/10 border border-[#1877F2]/20 px-3 py-2 rounded-lg hover:bg-[#1877F2]/20 transition-colors">
                              <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                              </svg>
                              <span className="text-xs text-[#E5E7EB]">Facebook</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
                
                {/* Video Links */}
                <motion.div className="mb-6" variants={itemVariants}>
                  <h3 className="text-lg font-medium text-[#CCC1BE] mb-3">Watch Our Videos</h3>
                  <div className="space-y-3">
                    <a 
                      href="#" 
                      className="group flex items-center space-x-3 bg-[#1A1A1A]/60 backdrop-blur-sm border border-[#CCC1BE]/10 p-4 rounded-lg transition-all duration-300 hover:border-[#CCC1BE]/30 hover:bg-[#1A1A1A]/80"
                    >
                      <div className="w-10 h-10 bg-red-600/90 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[#E5E7EB] font-medium group-hover:text-[#CCC1BE] transition-colors duration-300">SmartFitter Introduction</span>
                        <p className="text-xs text-[#E5E7EB]/50 mt-1">Learn about our executive program</p>
                      </div>
                    </a>
                    
                    <a 
                      href="#" 
                      className="group flex items-center space-x-3 bg-[#1A1A1A]/60 backdrop-blur-sm border border-[#CCC1BE]/10 p-4 rounded-lg transition-all duration-300 hover:border-[#CCC1BE]/30 hover:bg-[#1A1A1A]/80"
                    >
                      <div className="w-10 h-10 bg-red-600/90 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[#E5E7EB] font-medium group-hover:text-[#CCC1BE] transition-colors duration-300">Success Stories</span>
                        <p className="text-xs text-[#E5E7EB]/50 mt-1">Hear from our global executives</p>
                      </div>
                    </a>
                  </div>
                </motion.div>
                {/* QR Code Section */}
                <motion.div className="mb-6" variants={itemVariants}>
                  <h3 className="text-lg font-medium text-[#CCC1BE] mb-6 text-center">SmartFitter QR Code</h3>
                  <div className="flex flex-col items-center">
                    {/* Wing-shaped QR code container */}
                    <div className="relative flex flex-col items-center">
                      {/* Wing-shaped outer container */}
                      <div 
                        className="relative w-[220px] h-[220px] flex items-center justify-center transform rotate-45 transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)',
                          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                        }}
                      >
                        {/* QR code filling the wing shape */}
                        <div className="w-[200px] h-[200px] transform -rotate-45 flex items-center justify-center overflow-hidden">
                          {isQrLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          ) : qrSvg ? (
                            <img 
                              src={qrSvg} 
                              alt="SmartFitter QR Code with Logo" 
                              className="w-full h-full object-contain"
                              style={{
                                filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))'
                              }}
                            />
                          ) : (
                            <div className="text-white text-xs text-center">QR Error</div>
                          )}
                        </div>
                      </div>
                      <div className="text-center mt-4 text-sm text-[#E5E7EB]/80 font-medium">
                        Scan to visit SmartFitter
                      </div>
                    </div>
                    <p className="text-sm text-[#E5E7EB]/70 text-center mt-4">
                      Scan to visit SmartFitter App
                    </p>
                  </div>
                </motion.div>
                
                {/* Action Buttons */}
                <motion.div className="space-y-3" variants={itemVariants}>
                  <Button 
                    onClick={handleShare}
                    className="w-full bg-gradient-to-r from-[#CCC1BE] to-[#CCC1BE]/80 text-black hover:from-[#CCC1BE]/90 hover:to-[#CCC1BE]/70 font-medium py-4 text-lg rounded-lg flex items-center justify-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186z" />
                    </svg>
                    <span>Share Business Card</span>
                  </Button>
                  
                  <Button 
                    onClick={handleEdit}
                    variant="outline"
                    className="w-full border-[#CCC1BE]/30 text-[#CCC1BE] hover:bg-[#CCC1BE]/10 hover:border-[#CCC1BE]/50 font-medium py-4 text-lg rounded-lg flex items-center justify-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <span>Edit Business Card</span>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* Promotional Content */}
        <section className="pt-4">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-[#CCC1BE] tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            BECOME AN<br />INTERNATIONAL<br />EXECUTIVE
          </motion.h1>
          
          <motion.div 
            className="w-full h-64 md:h-80 bg-[#1A1A1A]/50 rounded-2xl mb-8 overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent z-10"></div>
            <img 
              src="/SmartFitter Assets Images /business executive.jpeg" 
              alt="Business Executive" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border border-[#CCC1BE]/20 overflow-hidden relative mb-8">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#CCC1BE]/10 rounded-full blur-xl"></div>
              <CardContent className="p-6 relative z-10">
                <h2 className="text-2xl font-bold text-[#CCC1BE] mb-3">R20k INVESTMENT</h2>
                <p className="text-[#E5E7EB]/80 leading-relaxed">
                  Get your own registered business, professional website, and comprehensive training package designed for aspiring global executives.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-[#E5E7EB] mb-4">
              We take you to Executive International Level:
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-[#1A1A1A]/60 backdrop-blur-sm border border-[#CCC1BE]/10 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#CCC1BE]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#CCC1BE] font-medium">Career Path</h3>
                  <p className="text-sm text-[#E5E7EB]/70 mt-1">Fast-track your executive career with our proven development system</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-[#1A1A1A]/60 backdrop-blur-sm border border-[#CCC1BE]/10 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#CCC1BE]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 01-.75.75h-.75m-6-1.5H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#CCC1BE] font-medium">Business Path</h3>
                  <p className="text-sm text-[#E5E7EB]/70 mt-1">Build your international business empire with strategic partnerships</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 bg-[#1A1A1A]/60 backdrop-blur-sm border border-[#CCC1BE]/10 p-4 rounded-lg">
                <div className="w-12 h-12 bg-[#CCC1BE]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CCC1BE" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#CCC1BE] font-medium">Education Path</h3>
                  <p className="text-sm text-[#E5E7EB]/70 mt-1">Access exclusive education resources and global business training</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Earnings Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-[#232323] to-[#1A1A1A] border border-[#CCC1BE]/20 overflow-hidden relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#CCC1BE]/10 rounded-full blur-2xl"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium text-[#E5E7EB]">Monthly Earnings</h3>
                  <span className="text-2xl font-bold text-[#CCC1BE]">R100k+</span>
                </div>
                <p className="text-sm text-[#E5E7EB]/70 mt-2">
                  Starting from day one while receiving local training
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button className="w-full bg-gradient-to-r from-[#CCC1BE] to-[#CCC1BE]/80 text-black hover:from-[#CCC1BE]/90 hover:to-[#CCC1BE]/70 font-medium py-6 text-lg rounded-lg">
              Start Your Executive Journey
            </Button>
          </motion.div>
        </section>
      </main>
      
      {/* Share Modal */}
      {showShareModal && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setShowShareModal(false)}
        >
          <motion.div 
            className="bg-[#232323] border border-[#CCC1BE]/20 rounded-2xl p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#CCC1BE]">Share Business Card</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-[#E5E7EB]/70 hover:text-[#CCC1BE] hover:bg-[#CCC1BE]/10 rounded-full p-1 transition-all duration-150 hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={shareViaWhatsApp}
                className="w-full flex items-center space-x-3 bg-[#1A1A1A]/60 border border-[#CCC1BE]/10 p-4 rounded-lg hover:border-[#CCC1BE]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                  </svg>
                </div>
                <span className="text-[#E5E7EB] font-medium">Share via WhatsApp</span>
              </button>
              
              <button 
                onClick={shareViaEmail}
                className="w-full flex items-center space-x-3 bg-[#1A1A1A]/60 border border-[#CCC1BE]/10 p-4 rounded-lg hover:border-[#CCC1BE]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <span className="text-[#E5E7EB] font-medium">Share via Email</span>
              </button>
              
              <button 
                onClick={copyToClipboard}
                className="w-full flex items-center space-x-3 bg-[#1A1A1A]/60 border border-[#CCC1BE]/10 p-4 rounded-lg hover:border-[#CCC1BE]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#CCC1BE]/20 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#CCC1BE]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                </div>
                <span className="text-[#E5E7EB] font-medium">Copy to Clipboard</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-[#232323] border border-[#CCC1BE]/20 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#CCC1BE]">Edit Business Card</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-[#E5E7EB]/70 hover:text-[#CCC1BE] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#CCC1BE] mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={editForm.full_name}
                    onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                    className="w-full bg-[#1A1A1A]/60 border border-[#CCC1BE]/20 rounded-lg px-4 py-3 text-[#E5E7EB] focus:border-[#CCC1BE]/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#CCC1BE] mb-2">Tagline</label>
                  <input 
                    type="text" 
                    value={editForm.tagline}
                    onChange={(e) => setEditForm({...editForm, tagline: e.target.value})}
                    className="w-full bg-[#1A1A1A]/60 border border-[#CCC1BE]/20 rounded-lg px-4 py-3 text-[#E5E7EB] focus:border-[#CCC1BE]/50 focus:outline-none"
                  />
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#CCC1BE] mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={editForm.phone_number}
                    onChange={(e) => setEditForm({...editForm, phone_number: e.target.value})}
                    className="w-full bg-[#1A1A1A]/60 border border-[#CCC1BE]/20 rounded-lg px-4 py-3 text-[#E5E7EB] focus:border-[#CCC1BE]/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#CCC1BE] mb-2">Email</label>
                  <input 
                    type="email" 
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full bg-[#1A1A1A]/60 border border-[#CCC1BE]/20 rounded-lg px-4 py-3 text-[#E5E7EB] focus:border-[#CCC1BE]/50 focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#CCC1BE] mb-2">Website</label>
                <input 
                  type="url" 
                  value={editForm.website}
                  onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                  className="w-full bg-[#1A1A1A]/60 border border-[#CCC1BE]/20 rounded-lg px-4 py-3 text-[#E5E7EB] focus:border-[#CCC1BE]/50 focus:outline-none"
                />
              </div>
              
              {/* Social Media */}
              <div>
                <h4 className="text-lg font-medium text-[#CCC1BE] mb-3">Social Media</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#CCC1BE] mb-2">LinkedIn</label>
                    <input 
                      type="url" 
                      value={editForm.linkedin}
                      onChange={(e) => setEditForm({...editForm, linkedin: e.target.value})}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full bg-[#1A1A1A]/60 border border-[#CCC1BE]/20 rounded-lg px-4 py-3 text-[#E5E7EB] focus:border-[#CCC1BE]/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#CCC1BE] mb-2">Twitter</label>
                    <input 
                      type="url" 
                      value={editForm.twitter}
                      onChange={(e) => setEditForm({...editForm, twitter: e.target.value})}
                      placeholder="https://twitter.com/username"
                      className="w-full bg-[#1A1A1A]/60 border border-[#CCC1BE]/20 rounded-lg px-4 py-3 text-[#E5E7EB] focus:border-[#CCC1BE]/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#CCC1BE] mb-2">Instagram</label>
                    <input 
                      type="url" 
                      value={editForm.instagram}
                      onChange={(e) => setEditForm({...editForm, instagram: e.target.value})}
                      placeholder="https://instagram.com/username"
                      className="w-full bg-[#1A1A1A]/60 border border-[#CCC1BE]/20 rounded-lg px-4 py-3 text-[#E5E7EB] focus:border-[#CCC1BE]/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#CCC1BE] mb-2">Facebook</label>
                    <input 
                      type="url" 
                      value={editForm.facebook}
                      onChange={(e) => setEditForm({...editForm, facebook: e.target.value})}
                      placeholder="https://facebook.com/username"
                      className="w-full bg-[#1A1A1A]/60 border border-[#CCC1BE]/20 rounded-lg px-4 py-3 text-[#E5E7EB] focus:border-[#CCC1BE]/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={() => setShowEditModal(false)}
                  variant="outline"
                  className="flex-1 border-[#CCC1BE]/30 text-[#CCC1BE] hover:bg-[#CCC1BE]/10"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveEdit}
                  className="flex-1 bg-gradient-to-r from-[#CCC1BE] to-[#CCC1BE]/80 text-black hover:from-[#CCC1BE]/90 hover:to-[#CCC1BE]/70"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BusinessCardPage;
