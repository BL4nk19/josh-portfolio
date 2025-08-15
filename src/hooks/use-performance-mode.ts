import { useState, useEffect } from 'react';

export const usePerformanceMode = () => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleInteractionStart = () => {
      setIsInteracting(true);
      setPerformanceMode(true);
      
      // Clear existing timeout
      if (timeout) clearTimeout(timeout);
      
      // Reset to normal mode after interaction
      timeout = setTimeout(() => {
        setIsInteracting(false);
        setPerformanceMode(false);
      }, 2000); // 2 second cooldown
    };

    const handleInteractionEnd = () => {
      // Keep performance mode active for a bit to ensure smooth transitions
      setTimeout(() => {
        if (!isInteracting) {
          setPerformanceMode(false);
        }
      }, 1000);
    };

    // Listen for user interactions
    const events = ['mousedown', 'mousemove', 'scroll', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleInteractionStart, { passive: true });
    });

    // Listen for interaction end
    document.addEventListener('mouseup', handleInteractionEnd, { passive: true });
    document.addEventListener('touchend', handleInteractionEnd, { passive: true });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteractionStart);
      });
      document.removeEventListener('mouseup', handleInteractionEnd);
      document.removeEventListener('touchend', handleInteractionEnd);
      if (timeout) clearTimeout(timeout);
    };
  }, [isInteracting]);

  return { performanceMode, isInteracting };
};
