import React, { useEffect } from 'react';

/**
 * A utility component that hides all debug panels in the application
 * This component doesn't render anything visible but applies styling to hide debug panels
 */
const DebugHider = () => {
  // Apply CSS on mount to hide all elements with debug info
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    
    // Add CSS rules to hide debug panels
    styleElement.textContent = `
      /* Hide any element with Debug Info in its text */
      div:has(h3:contains('Debug Info')),
      div.fixed.top-0.right-0.bg-black\\/80,
      /* Generic debug panel classes */
      .debug-panel, 
      .debug-overlay,
      .debug-info {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    
    // Add the style element to the document head
    document.head.appendChild(styleElement);
    
    // Clean up function to remove the style element when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default DebugHider;
