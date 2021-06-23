import React, { useState, useEffect } from 'react';

import Logo from './Logo';
import Searchbar from './Searchbar';
import CreateButton from './CreateButton';

import './styles.css';

const Navbar:React.FC = () => {
  const [isOnTop, setIsOnTop] = useState<boolean>(true);

  const handleScroll = () => setIsOnTop(!(window.pageYOffset > 0));

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${!isOnTop ? 'scroll' : ''}`}>
      <Logo />
      <div className="right-menu">
        <Searchbar />
        <CreateButton />
      </div>
    </nav>
  )
};

export default Navbar;
