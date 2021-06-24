import React, { useState, useEffect } from 'react';

import Logo from './Logo';
import Searchbar from './Searchbar';
import CreateButton from './CreateButton';

import './styles.css';

const Navbar:React.FC<{ openModal(): void }> = ({ openModal }) => {
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
        <CreateButton openModal={openModal} />
      </div>
    </nav>
  )
};

export default Navbar;
