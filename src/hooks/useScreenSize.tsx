import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState('sm');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;

      if (width >= 1536) {
        setScreenSize('2xl');
      } else if (width >= 1280) {
        setScreenSize('xl');
      } else if (width >= 1024) {
        setScreenSize('lg');
      } else if (width >= 768) {
        setScreenSize('md');
      } else {
        setScreenSize('sm');
      }
    };

    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
};

export default useScreenSize;