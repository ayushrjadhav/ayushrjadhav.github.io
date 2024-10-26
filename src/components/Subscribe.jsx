import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const Subscribe = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f9f9f9',  // Light background to distinguish the section
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
  };

  const inputStyle = {
    borderTopLeftRadius: '25px',
    borderBottomLeftRadius: '25px',
    borderRight: 'none',
    padding: '0.75rem',
    fontSize: '1rem',
  };

  const buttonStyle = {
    borderTopRightRadius: '25px',
    borderBottomRightRadius: '25px',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1a237e', // Deep blue color for button
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
  };

  return (
    <div style={containerStyle}>
      <p>Enter your email to receive the latest updates.</p>
      <InputGroup className="mb-3" style={{ maxWidth: '400px', width: '100%' }}>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          style={inputStyle}
          aria-label="Email"
        />
        <Button style={buttonStyle} variant="primary">Sign Up</Button>
      </InputGroup>
    </div>
  );
};

export default Subscribe;
