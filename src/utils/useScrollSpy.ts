import { useState, useEffect, useCallback } from 'react';

const useScrollSpy = (ref?:any) => {
  const [isOnTop, setIsOnTop] = useState<boolean>(true);

  const handleScroll = useCallback(() => {
    setIsOnTop(!!ref?.current ? !(ref.current.scrollTop > 0) : !(window.pageYOffset > 0));
  }, [ref]);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [handleScroll]);

  return isOnTop;
}

export default useScrollSpy;
