import React from 'react';

const Footer: React.FC = () => (
  <footer
    style={{
      width: '100%',
      background: '#0F172A',
      padding: '24px 32px',
      textAlign: 'center',
      fontSize: '0.8rem',
      color: 'rgba(255,255,255,0.4)',
      fontFamily: 'inherit',
    }}
  >
    © {new Date().getFullYear()} Fabio Pernía. All rights reserved.
  </footer>
);

export default Footer;
