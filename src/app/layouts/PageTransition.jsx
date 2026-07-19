import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { KineticTextLoader } from '../../components/ui/kinetic-text-loader';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isNavigating) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050608] flex items-center justify-center">
        <KineticTextLoader text="Loading" />
      </div>
    );
  }

  return <>{children}</>;
};

export default PageTransition;
