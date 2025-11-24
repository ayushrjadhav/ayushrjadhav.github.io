import React from 'react';

const Divider = ({ color = '#b0b0b0' }) => {
  return (
    <hr style={{ borderTop: `1px solid ${color}`, width: '80%', margin: '2rem auto' }} />
  );
};

export default Divider;