import React from 'react';
import { Container, Button } from 'react-bootstrap';



const Hero = () => {
  const heroStyle = {
    width: '100vw',
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to right, rgba(26, 35, 126, 0.8), rgba(41, 121, 255, 0.8))',
    color: 'white',
    textAlign: 'center',
    padding: '3rem 1rem',
  };

  const h1Style = {
    color: 'white', // Bright Coral color
  };

  const buttonStyle = {
    backgroundColor: 'white',
    color: '#1a237e', // Deep blue color for text
    border: 'none',
    fontWeight: 'bold',
    padding: '0.6rem 1.5rem',
    borderRadius: '25px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#ffd54f'; // Light yellow hover color
    e.target.style.color = '#1a237e';
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#1a237e';
  };

  return (
    <Container fluid style={heroStyle} className="p-0 hero-background">
      <h1 style={h1Style}>Hi, I'm Ayush</h1>
      <p>Welcome to my portfolio, where I share my projects, passions, and insights!</p>
      <Button
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="mt-3"
      >
        Explore My Work
      </Button>
    </Container>
  );
};

export default Hero;
