import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [displayLocation, setDisplayLocation] = useState(useLocation());
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const location = useLocation();

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  const handleTransitionEnd = () => {
    if (transitionStage === 'fadeOut') {
      setDisplayLocation(location);
      setTransitionStage('fadeIn');
    }
  };

  const getPageTransform = () => {
    if (transitionStage === 'fadeOut') {
      return 'translateX(-50px)';
    }
    
    return 'translateX(0)';
  };

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      style={{
        opacity: transitionStage === 'fadeOut' ? 0 : 1,
        transform: getPageTransform(),
        transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
        minHeight: '100vh',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;