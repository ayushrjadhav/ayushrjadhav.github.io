import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="text-center py-4" style={{ backgroundColor: '#1a237e', color: 'white' }}>
      <p>© 2023 Ayush Jadhav. All Rights Reserved.</p>
      <div style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
        <a
          href="https://github.com/ayushrjadhav"
          style={{ color: 'white', margin: '0 10px' }}
          target="_blank"  // Opens in a new tab
          rel="noopener noreferrer"  // Security improvement
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/ayush-jadhav-227590227/"
          style={{ color: 'white', margin: '0 10px' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.instagram.com/ayush_jadhav14/"
          style={{ color: 'white', margin: '0 10px' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default Footer;

