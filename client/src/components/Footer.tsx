import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto text-center text-xs text-gray-500 pt-6 border-t">
      <p>Supported by Fundacja Drugi Dom</p>
      <img 
        src="/drugi-dom-logo.png" 
        alt="Mój Drugi Dom logo" 
        className="w-12 h-auto mx-auto mt-2" 
      />
    </footer>
  );
};

export default Footer;
