import React from 'react';
import { FiBell } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <FiBell size={24} />
          <h1>Remind Me Later</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;